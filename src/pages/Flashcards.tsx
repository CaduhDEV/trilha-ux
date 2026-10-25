import confetti from 'canvas-confetti'
import { X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Mascot } from '../components/Mascot'
import { ProgressBar, XpIcon } from '../components/ui'
import { course } from '../content'
import { useData } from '../context/AppContext'
import { shuffle } from '../lib/random'
import { previewInterval, type Grade } from '../lib/srs'

const GRADES: { g: Grade; label: string; cls: string; key: string }[] = [
  { g: 'again', label: 'Não lembrei', cls: 'btn-bad', key: '1' },
  { g: 'hard', label: 'Difícil', cls: 'btn-gold', key: '2' },
  { g: 'good', label: 'Bom', cls: 'btn-ok', key: '3' },
  { g: 'easy', label: 'Fácil', cls: 'btn-primary', key: '4' },
]

export default function Flashcards() {
  const { d, reviewCard, finishCardSession } = useData()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const ahead = params.get('adiantar') === '1'

  const initial = useMemo(() => {
    const valid = [...d.cards.values()].filter((c) => course.flashcardById.has(c.card_id))
    if (!ahead) return shuffle(d.dueCards.map((c) => c.card_id)).slice(0, 50)
    return [...valid].sort((a, b) => a.due_date.localeCompare(b.due_date)).slice(0, 15).map((c) => c.card_id)
    // a fila é montada uma vez por sessão
  }, [])
  const [queue, setQueue] = useState<string[]>(initial)
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [retried] = useState(() => new Set<string>())
  const [finished, setFinished] = useState(false)
  const rating = useRef(false)

  const cardId = queue[pos]
  const fc = cardId ? course.flashcardById.get(cardId) : null
  const card = cardId ? d.cards.get(cardId) : null
  const lesson = fc ? course.byId.get(fc.lessonId) : null

  const rate = async (g: Grade) => {
    // evita avaliar o mesmo cartão duas vezes com toque duplo ou tecla repetida
    if (!cardId || rating.current) return
    rating.current = true
    try {
      await rateCard(cardId, g)
    } finally {
      rating.current = false
    }
  }

  const rateCard = async (cardId: string, g: Grade) => {
    await reviewCard(cardId, g)
    setReviewed((n) => n + 1)
    let q = queue
    if (g === 'again' && !retried.has(cardId)) {
      retried.add(cardId)
      q = [...queue, cardId]
      setQueue(q)
    }
    setFlipped(false)
    if (pos + 1 >= q.length) {
      await finishCardSession(reviewed + 1)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      setFinished(true)
    } else setPos(pos + 1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return
      if (!flipped && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault()
        setFlipped(true)
      } else if (flipped) {
        const g = GRADES.find((x) => x.key === e.key)
        if (g) void rate(g.g)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (finished || !fc || !card)
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <Mascot mood={reviewed ? 'party' : 'happy'} size={120} />
        <h1 className="text-2xl font-black sm:text-3xl">{reviewed ? 'Revisão concluída!' : 'Nada para revisar agora'}</h1>
        {reviewed > 0 && (
          <p className="flex items-center gap-1 text-lg font-black text-gold-ink">
            <XpIcon /> +{reviewed} XP · {reviewed} {reviewed === 1 ? 'cartão' : 'cartões'}
          </p>
        )}
        <p className="max-w-sm font-semibold text-muted">
          Os cartões voltam automaticamente no dia certo. Quanto melhor você lembra, mais espaçadas ficam as revisões.
        </p>
        <button className="btn btn-ok mt-4 w-60" onClick={() => navigate('/revisar')}>
          Continuar
        </button>
      </div>
    )

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 pt-5">
        <button onClick={() => navigate('/revisar')} className="text-muted hover:text-ink" aria-label="Sair">
          <X size={28} strokeWidth={2.5} />
        </button>
        <ProgressBar value={pos / queue.length} color="var(--brand)" />
        <span className="shrink-0 text-sm font-black text-muted">
          {pos + 1}/{queue.length}
        </span>
      </header>
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-8">
        <div className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-muted">{lesson?.title}</div>
        <button
          className="card relative min-h-72 w-full p-6 text-center transition-transform sm:p-8"
          onClick={() => setFlipped(true)}
          aria-label={flipped ? 'Resposta' : 'Mostrar resposta'}
        >
          <div className="text-2xl font-black leading-snug">{fc.front}</div>
          {flipped ? (
            <div className="animate-pop mt-6 border-t-2 border-line pt-6 text-lg font-semibold leading-relaxed text-ink">
              {fc.back}
            </div>
          ) : (
            <div className="mt-10 text-sm font-extrabold uppercase tracking-wide text-sky">Toque para ver a resposta</div>
          )}
        </button>
        {!flipped && (
          <p className="mt-4 text-center text-sm font-semibold text-muted">Tente lembrar a resposta antes de virar o cartão.</p>
        )}
      </main>
      <footer className="border-t-2 border-line">
        <div className="mx-auto max-w-xl px-4 py-5">
          {flipped ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {GRADES.map((x) => (
                <button key={x.g} className={`btn ${x.cls} flex-col gap-0 px-2 py-2.5 normal-case`} onClick={() => rate(x.g)}>
                  <span className="text-sm">{x.label}</span>
                  <span className="text-[11px] font-bold opacity-80">{previewInterval(card, x.g)}</span>
                </button>
              ))}
            </div>
          ) : (
            <button className="btn btn-primary w-full" onClick={() => setFlipped(true)}>
              Mostrar resposta
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
