import confetti from 'canvas-confetti'
import { Brain, Clock, ExternalLink, Target, Zap } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { Mascot } from '../components/Mascot'
import { Session, type SessionResult } from '../components/Session'
import { course } from '../content'
import type { LessonItem, Resource } from '../content/types'
import { useData } from '../context/AppContext'

export default function LessonPage() {
  const { id = '' } = useParams()
  const { d, finishLesson } = useData()
  const navigate = useNavigate()
  const [result, setResult] = useState<(SessionResult & { xp: number; score: number; newCards: number }) | null>(null)
  const item = course.byId.get(id)

  if (!item || item.kind !== 'lesson') return <Navigate to="/" replace />
  if (!d.isUnlocked(item.id)) return <Navigate to="/" replace />

  if (result) return <LessonComplete item={item} result={result} onContinue={() => navigate('/')} />

  return (
    <Session
      key={item.id}
      itemId={item.id}
      steps={item.steps}
      feedback="immediate"
      requeue
      onExit={() => navigate('/')}
      onFinish={async (r) => {
        const out = await finishLesson(item, {
          mistakes: r.mistakes,
          attempts: r.attempts,
          firstTryCorrect: r.firstTryCorrect,
          total: r.total,
        })
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
        setResult({ ...r, ...out })
      }}
    />
  )
}

// fill = fundo do rótulo; label = cor do texto do rótulo; text = cor do valor (todas com contraste AA)
const TONES = {
  gold: { fill: 'var(--gold)', label: '#3b2600', text: 'var(--gold-ink)' },
  ok: { fill: 'var(--ok)', label: '#fff', text: 'var(--ok-ink)' },
  bad: { fill: 'var(--bad)', label: '#fff', text: 'var(--bad-ink)' },
  sky: { fill: '#1A6FD1', label: '#fff', text: 'var(--sky)' },
}

export function StatBox({ label, value, tone, icon }: { label: string; value: string; tone: keyof typeof TONES; icon: ReactNode }) {
  const t = TONES[tone]
  return (
    <div className="overflow-hidden rounded-2xl border-2" style={{ borderColor: t.fill, background: t.fill }}>
      <div className="px-2 py-1 text-center text-xs font-black uppercase tracking-wide" style={{ color: t.label }}>
        {label}
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-xl bg-surface px-3 py-3 text-xl font-black" style={{ color: t.text }}>
        {icon}
        {value}
      </div>
    </div>
  )
}

const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function LessonComplete({
  item,
  result,
  onContinue,
}: {
  item: LessonItem
  result: SessionResult & { xp: number; score: number; newCards: number }
  onContinue: () => void
}) {
  const perfect = result.mistakes === 0
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-4 py-10 text-center">
        <Mascot mood="party" size={130} className="animate-pop" />
        <h1 className="mt-4 text-3xl font-black text-gold-ink">{perfect ? 'Lição perfeita!' : 'Lição concluída!'}</h1>
        <p className="mt-1 font-bold text-muted">{item.title}</p>

        <div className="mt-8 grid w-full grid-cols-3 gap-3">
          <StatBox label="XP" value={`+${result.xp}`} tone="gold" icon={<Zap size={20} fill="currentColor" />} />
          <StatBox label="Precisão" value={`${result.score}%`} tone="ok" icon={<Target size={20} />} />
          <StatBox label="Tempo" value={fmtTime(result.seconds)} tone="sky" icon={<Clock size={20} />} />
        </div>

        {result.newCards > 0 && (
          <div className="card mt-6 flex w-full items-center gap-3 p-4 text-left">
            <Brain className="shrink-0 text-brand" size={30} />
            <p className="font-semibold">
              <b>{result.newCards} novos cartões</b> entraram na sua revisão espaçada. Eles aparecem amanhã para fixar o conteúdo.
            </p>
          </div>
        )}

        {item.resources.length > 0 && <ResourceList resources={item.resources} title="Para ir além (opcional)" />}
      </main>
      <footer className="border-t-2 border-line">
        <div className="mx-auto flex max-w-xl px-4 py-5">
          <button className="btn btn-ok w-full" onClick={onContinue} autoFocus>
            Continuar
          </button>
        </div>
      </footer>
    </div>
  )
}

const KIND_ICON: Record<Resource['kind'], string> = {
  artigo: '📄',
  video: '🎬',
  ferramenta: '🛠️',
  livro: '📕',
  curso: '🎓',
  site: '🌐',
}

export function ResourceList({ resources, title }: { resources: Resource[]; title: string }) {
  return (
    <div className="mt-6 w-full text-left">
      <h2 className="mb-2 font-black">{title}</h2>
      <ul className="flex flex-col gap-2">
        {resources.map((r) => (
          <li key={r.title}>
            {r.url ? (
              <a href={r.url} target="_blank" rel="noreferrer" className="card flex items-start gap-3 p-3 hover:bg-surface-2">
                <span className="text-xl">{KIND_ICON[r.kind]}</span>
                <span className="min-w-0 flex-1">
                  <span className="font-extrabold">{r.title}</span>
                  {r.lang === 'en' && <span className="chip ml-2 bg-surface-2 text-muted">em inglês</span>}
                  {r.note && <span className="block text-sm font-semibold text-muted">{r.note}</span>}
                </span>
                <ExternalLink size={16} className="mt-1 shrink-0 text-muted" />
              </a>
            ) : (
              <div className="card flex items-start gap-3 p-3">
                <span className="text-xl">{KIND_ICON[r.kind]}</span>
                <span>
                  <span className="font-extrabold">{r.title}</span>
                  {r.note && <span className="block text-sm font-semibold text-muted">{r.note}</span>}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
