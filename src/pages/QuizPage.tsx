import confetti from 'canvas-confetti'
import { CircleCheck, CircleX, ClipboardCheck, Crown, Target, Timer, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { correctAnswerText, explanationOf, promptOf, type Answer } from '../components/exercises/grading'
import { Mascot } from '../components/Mascot'
import { Session, type ReviewEntry, type SessionResult } from '../components/Session'
import { course } from '../content'
import type { QuizItem, Step } from '../content/types'
import { useData } from '../context/AppContext'
import { weightedSample } from '../lib/random'
import { StatBox } from './LessonPage'

type Phase = 'intro' | 'running' | 'result'

export default function QuizPage() {
  const { id = '' } = useParams()
  const item = course.byId.get(id)
  const { d } = useData()
  if (!item || (item.kind !== 'checkpoint' && item.kind !== 'exam')) return <Navigate to="/" replace />
  if (!d.isUnlocked(item.id)) return <Navigate to="/" replace />
  return <Quiz key={item.id} item={item} />
}

function Quiz({ item }: { item: QuizItem }) {
  const { d, finishQuiz } = useData()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('intro')
  const [round, setRound] = useState(0)
  const [result, setResult] = useState<(SessionResult & { score: number; xp: number; passed: boolean }) | null>(null)
  const exam = item.kind === 'exam'
  const best = d.progress.get(item.id)?.best_score ?? null
  const unit = item.unitId ? course.unitById.get(item.unitId) : null

  const steps: Step[] = useMemo(
    () =>
      weightedSample(item.pool, item.questionCount, (e) => 1 + 2 * (d.misses.get(e.id) ?? 0)).map((exercise) => ({
        kind: 'exercise' as const,
        exercise,
      })),
    // novo sorteio a cada tentativa (de propósito não depende de "misses")
    [item, round],
  )

  if (phase === 'running')
    return (
      <Session
        key={round}
        itemId={item.id}
        steps={steps}
        feedback={exam ? 'deferred' : 'immediate'}
        requeue={false}
        timeLimitMin={item.timeLimitMin}
        onExit={() => setPhase('intro')}
        onFinish={async (r) => {
          const score = r.total ? Math.round((100 * r.firstTryCorrect) / r.total) : 0
          const { xp, passed } = await finishQuiz(item, score, r.attempts)
          if (passed) confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } })
          setResult({ ...r, score, xp, passed })
          setPhase('result')
        }}
      />
    )

  if (phase === 'result' && result)
    return (
      <div className="flex min-h-dvh flex-col">
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
          <div className="flex flex-col items-center text-center">
            <Mascot mood={result.passed ? 'party' : 'sad'} size={120} className="animate-pop" />
            <h1 className={`mt-4 text-3xl font-black ${result.passed ? 'text-gold-ink' : 'text-bad-ink'}`}>
              {result.passed ? (exam ? 'Aprovada(o) na prova!' : 'Checkpoint concluído!') : 'Quase lá!'}
            </h1>
            <p className="mt-1 max-w-md font-bold text-muted">
              {result.passed
                ? 'Esse conteúdo está firme na sua cabeça. Pode seguir para a próxima etapa.'
                : `Você precisa de ${item.passScore}% para passar. Revise os erros abaixo${unit ? ' e o guia da semana' : ''} e tente de novo — as questões mudam a cada tentativa.`}
              {result.timedOut && ' (O tempo acabou: questões sem resposta contam como erro.)'}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <StatBox label="Nota" value={`${result.score}%`} tone={result.passed ? 'ok' : 'bad'} icon={<Target size={20} />} />
            <StatBox label="Acertos" value={`${result.firstTryCorrect}/${result.total}`} tone="sky" icon={<CircleCheck size={20} />} />
            <StatBox label="XP" value={`+${result.xp}`} tone="gold" icon={<Zap size={20} fill="currentColor" />} />
          </div>

          <ReviewList entries={result.review} />
        </main>
        <footer className="sticky bottom-0 border-t-2 border-line bg-bg">
          <div className="mx-auto flex max-w-2xl gap-3 px-4 py-5">
            {!result.passed && (
              <button
                className="btn btn-ghost flex-1"
                onClick={() => {
                  setRound((r) => r + 1)
                  setResult(null)
                  setPhase('intro')
                }}
              >
                Tentar de novo
              </button>
            )}
            <button className="btn btn-ok flex-1" onClick={() => navigate('/')}>
              {result.passed ? 'Continuar' : 'Voltar à trilha'}
            </button>
          </div>
        </footer>
      </div>
    )

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-10 text-center">
        <div
          className={`grid h-28 w-28 place-items-center rounded-full ${exam ? 'text-[#3b2600]' : 'text-white'}`}
          style={{ background: exam ? 'var(--gold)' : 'var(--brand)', boxShadow: `0 7px 0 ${exam ? 'var(--gold-dark)' : 'var(--brand-dark)'}` }}
        >
          {exam ? <Crown size={54} strokeWidth={2.4} /> : <ClipboardCheck size={54} strokeWidth={2.4} />}
        </div>
        <h1 className="mt-6 text-3xl font-black">{item.title}</h1>
        <p className="mt-2 font-semibold text-muted">{item.summary}</p>
        <ul className="card mt-8 w-full divide-y-2 divide-line text-left font-bold">
          <li className="flex justify-between p-4">
            <span>Questões</span> <span>{item.questionCount}</span>
          </li>
          <li className="flex justify-between p-4">
            <span>Nota mínima</span> <span>{item.passScore}%</span>
          </li>
          <li className="flex justify-between p-4">
            <span>Tempo</span>
            <span className="flex items-center gap-1">
              {item.timeLimitMin ? (
                <>
                  <Timer size={18} /> {item.timeLimitMin} min
                </>
              ) : (
                'livre'
              )}
            </span>
          </li>
          <li className="flex justify-between p-4">
            <span>Correção</span> <span>{exam ? 'no final' : 'na hora'}</span>
          </li>
          {best !== null && (
            <li className="flex justify-between p-4 text-ok-ink">
              <span>Sua melhor nota</span> <span>{best}%</span>
            </li>
          )}
        </ul>
        <p className="mt-4 text-sm font-semibold text-muted">
          As questões são sorteadas do banco do {exam ? 'módulo' : 'conteúdo da semana'}, com mais chance para os temas em que você já errou.
        </p>
      </main>
      <footer className="border-t-2 border-line">
        <div className="mx-auto flex max-w-lg gap-3 px-4 py-5">
          {unit && (
            <Link to={`/guia/${unit.id}`} className="btn btn-ghost flex-1">
              Revisar guia
            </Link>
          )}
          <button className="btn btn-ok flex-1" onClick={() => setPhase('running')} autoFocus>
            Começar
          </button>
        </div>
      </footer>
    </div>
  )
}

function describe(a: Answer | null): string {
  if (!a) return 'sem resposta'
  switch (a.type) {
    case 'mc':
    case 'fill':
      return a.choice
    case 'multi':
      return a.choices.join(' · ')
    case 'tf':
      return a.value ? 'Verdadeiro' : 'Falso'
    case 'order':
      return a.sequence.map((t, i) => `${i + 1}. ${t}`).join('  ')
    case 'contrast':
      return a.passes ? 'Passa' : 'Não passa'
    case 'ab':
      return `Opção ${a.choice.toUpperCase()}`
    case 'match':
      return `${a.mistakes} erro(s) ao ligar`
    case 'open':
      return a.text
  }
}

export function ReviewList({ entries }: { entries: ReviewEntry[] }) {
  const sorted = [...entries].sort((a, b) => Number(a.correct) - Number(b.correct))
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-black">Correção</h2>
      <ul className="flex flex-col gap-3">
        {sorted.map(({ exercise, correct, answer }) => (
          <li key={exercise.id} className={`card p-4 ${correct ? '' : 'border-bad/50'}`}>
            <div className="flex gap-3">
              {correct ? <CircleCheck className="shrink-0 text-ok" /> : <CircleX className="shrink-0 text-bad" />}
              <div className="min-w-0">
                <p className="font-extrabold">{promptOf(exercise)}</p>
                {!correct && (
                  <>
                    <p className="mt-1 text-sm font-bold text-bad-ink">Sua resposta: {describe(answer)}</p>
                    {correctAnswerText(exercise) && (
                      <p className="text-sm font-bold text-ok-ink">Correta: {correctAnswerText(exercise)}</p>
                    )}
                  </>
                )}
                {explanationOf(exercise) && <p className="mt-1 text-sm font-semibold text-muted">{explanationOf(exercise)}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
