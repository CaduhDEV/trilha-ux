import confetti from 'canvas-confetti'
import { CircleCheck, Target, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Mascot } from '../components/Mascot'
import { Session, type SessionResult } from '../components/Session'
import { course } from '../content'
import type { Exercise, Step } from '../content/types'
import { useData } from '../context/AppContext'
import { weightedSample } from '../lib/random'
import { StatBox } from './LessonPage'
import { ReviewList } from './QuizPage'

export default function Training() {
  const { d, finishTraining } = useData()
  const navigate = useNavigate()
  const [result, setResult] = useState<(SessionResult & { xp: number }) | null>(null)

  const steps: Step[] = useMemo(() => {
    const pool: Exercise[] = []
    for (const item of course.items) {
      if (item.kind !== 'lesson' || !d.completed.has(item.id)) continue
      for (const s of item.steps) if (s.kind === 'exercise' && s.exercise.type !== 'open') pool.push(s.exercise)
    }
    return weightedSample(pool, 10, (e) => 1 + 3 * (d.misses.get(e.id) ?? 0)).map((exercise) => ({ kind: 'exercise' as const, exercise }))
    // sorteio fixo durante a sessão
  }, [])

  if (!steps.length) return <Navigate to="/revisar" replace />

  if (result) {
    const score = result.total ? Math.round((100 * result.firstTryCorrect) / result.total) : 0
    return (
      <div className="flex min-h-dvh flex-col">
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
          <div className="flex flex-col items-center text-center">
            <Mascot mood="party" size={120} />
            <h1 className="mt-4 text-3xl font-black text-gold-ink">Treino concluído!</h1>
            <p className="mt-1 font-bold text-muted">
              {score >= 80 ? 'Sua retenção está ótima.' : score >= 60 ? 'Bom! Alguns pontos ainda precisam de reforço.' : 'Vale reler os guias das semanas com mais erros.'}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <StatBox label="Retenção" value={`${score}%`} tone="ok" icon={<Target size={20} />} />
            <StatBox label="Acertos" value={`${result.firstTryCorrect}/${result.total}`} tone="sky" icon={<CircleCheck size={20} />} />
            <StatBox label="XP" value={`+${result.xp}`} tone="gold" icon={<Zap size={20} fill="currentColor" />} />
          </div>
          <ReviewList entries={result.review} />
        </main>
        <footer className="sticky bottom-0 border-t-2 border-line bg-bg">
          <div className="mx-auto max-w-2xl px-4 py-5">
            <button className="btn btn-ok w-full" onClick={() => navigate('/revisar')}>
              Continuar
            </button>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <Session
      itemId="treino"
      steps={steps}
      feedback="immediate"
      requeue
      onExit={() => navigate('/revisar')}
      onFinish={async (r) => {
        const xp = await finishTraining(r.attempts)
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
        setResult({ ...r, xp })
      }}
    />
  )
}
