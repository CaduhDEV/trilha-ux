import { BookOpen, CircleCheck, CircleX, Timer, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Exercise, Step } from '../content/types'
import type { Attempt } from '../lib/types'
import { sfx } from '../lib/sound'
import { ExerciseView } from './exercises/ExerciseView'
import { correctAnswerText, explanationOf, grade, praise, type Answer } from './exercises/grading'
import { Markdown } from './Markdown'
import { Mascot } from './Mascot'
import { Modal, ProgressBar } from './ui'

export interface ReviewEntry {
  exercise: Exercise
  correct: boolean
  answer: Answer | null
}

export interface SessionResult {
  attempts: Attempt[]
  mistakes: number
  total: number
  firstTryCorrect: number
  seconds: number
  review: ReviewEntry[]
  timedOut: boolean
}

interface Props {
  itemId: string
  steps: Step[]
  /** immediate = mostra certo/errado na hora; deferred = só no final (provas) */
  feedback: 'immediate' | 'deferred'
  /** Reapresenta no fim os exercícios errados (como no Duolingo) */
  requeue: boolean
  timeLimitMin?: number | null
  onExit: () => void
  onFinish: (r: SessionResult) => void
}

interface QueueEntry {
  step: Step
  key: string
  retry: boolean
}

export function Session({ itemId, steps, feedback, requeue, timeLimitMin, onExit, onFinish }: Props) {
  const [queue, setQueue] = useState<QueueEntry[]>(() => steps.map((step, i) => ({ step, key: `s${i}`, retry: false })))
  const [pos, setPos] = useState(0)
  const [answer, setAnswer] = useState<Answer | null>(null)
  const [checked, setChecked] = useState<{ correct: boolean; praise: string } | null>(null)
  const [exitOpen, setExitOpen] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const startedAt = useRef(Date.now())
  const attempts = useRef<Attempt[]>([])
  const first = useRef(new Map<string, ReviewEntry>())
  const mistakes = useRef(0)
  const finished = useRef(false)

  const entry = queue[pos]
  const total = steps.filter((s) => s.kind === 'exercise').length
  const deadline = timeLimitMin ? startedAt.current + timeLimitMin * 60_000 : null
  const remaining = deadline ? Math.max(0, deadline - now) : null

  const finish = useCallback(
    (timedOut = false) => {
      if (finished.current) return
      finished.current = true
      // Exercícios não respondidos (tempo esgotado) contam como erro
      for (const s of steps) {
        if (s.kind === 'exercise' && !first.current.has(s.exercise.id)) {
          first.current.set(s.exercise.id, { exercise: s.exercise, correct: false, answer: null })
        }
      }
      const review = [...first.current.values()]
      const gradable = review.filter((r) => r.exercise.type !== 'open')
      sfx.finish()
      onFinish({
        attempts: attempts.current,
        mistakes: mistakes.current,
        total: gradable.length,
        firstTryCorrect: gradable.filter((r) => r.correct).length,
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
        review,
        timedOut,
      })
    },
    [steps, onFinish],
  )

  // Cronômetro das provas
  useEffect(() => {
    if (!deadline) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [deadline])
  useEffect(() => {
    if (remaining === 0) finish(true)
  }, [remaining, finish])

  const advance = useCallback(() => {
    setAnswer(null)
    setChecked(null)
    if (pos + 1 >= queue.length) finish()
    else setPos(pos + 1)
  }, [pos, queue.length, finish])

  const record = (ex: Exercise, a: Answer, correct: boolean) => {
    attempts.current.push({
      item_id: itemId,
      exercise_id: ex.id,
      correct,
      answer: a.type === 'open' ? a.text : a,
    })
    if (!first.current.has(ex.id)) first.current.set(ex.id, { exercise: ex, correct, answer: a })
    if (!correct) mistakes.current += 1
  }

  const check = useCallback(() => {
    if (!entry || entry.step.kind !== 'exercise' || !answer) return
    const ex = entry.step.exercise
    const correct = grade(ex, answer)
    record(ex, answer, correct)
    if (feedback === 'deferred') {
      advance()
      return
    }
    if (ex.type !== 'open') (correct ? sfx.correct : sfx.wrong)()
    setChecked({ correct, praise: praise() })
    if (!correct && requeue && !entry.retry) {
      setQueue((q) => [...q, { step: entry.step, key: `${entry.key}-r`, retry: true }])
    }
  }, [entry, answer, feedback, requeue, advance])

  const primary = useCallback(() => {
    if (!entry) return
    if (entry.step.kind === 'card' || checked) advance()
    else check()
  }, [entry, checked, advance, check])

  // Enter = botão principal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || exitOpen) return
      const t = e.target as HTMLElement
      if (t.tagName === 'TEXTAREA' && !(e.ctrlKey || e.metaKey)) return
      if (t.tagName === 'BUTTON' && t.closest('main')) return
      e.preventDefault()
      if (entry?.step.kind === 'exercise' && !checked && !answer) return
      primary()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [primary, entry, checked, answer, exitOpen])

  if (!entry) return null

  const answered = feedback === 'deferred' ? first.current.size : pos
  const progress = feedback === 'deferred' ? answered / Math.max(total, 1) : pos / queue.length
  const isCard = entry.step.kind === 'card'
  const ex = entry.step.kind === 'exercise' ? entry.step.exercise : null
  const correctText = ex && checked && !checked.correct ? correctAnswerText(ex) : null
  const explanation = ex && checked ? explanationOf(ex) : null

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 pt-5">
        <button onClick={() => setExitOpen(true)} className="text-muted hover:text-ink" aria-label="Sair">
          <X size={28} strokeWidth={2.5} />
        </button>
        <ProgressBar value={progress} />
        {remaining !== null && (
          <span className={`flex items-center gap-1 font-black tabular-nums ${remaining < 60_000 ? 'text-bad-ink' : 'text-muted'}`}>
            <Timer size={20} />
            {Math.floor(remaining / 60_000)}:{String(Math.floor((remaining % 60_000) / 1000)).padStart(2, '0')}
          </span>
        )}
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-10 pt-8">
        {entry.retry && !checked && (
          <div className="chip mb-4 bg-gold-soft text-gold-ink">Revendo um erro anterior</div>
        )}
        {isCard ? (
          <div key={entry.key} className="animate-pop">
            <div className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-brand-ink">
              <BookOpen size={18} /> Teoria
            </div>
            <div className="card p-5 sm:p-7">
              <Markdown>{(entry.step as { md: string }).md}</Markdown>
            </div>
          </div>
        ) : (
          <div key={entry.key} className="animate-pop">
            <ExerciseView exercise={ex!} checked={!!checked} onChange={setAnswer} />
          </div>
        )}
      </main>

      <footer
        className={`sticky bottom-0 border-t-2 ${
          checked
            ? checked.correct
              ? 'animate-slide-up border-transparent bg-ok-soft'
              : 'animate-slide-up border-transparent bg-bad-soft'
            : 'border-line bg-bg'
        }`}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center">
          {checked && ex && (
            <div className="flex flex-1 gap-3">
              {ex.type === 'open' ? (
                <Mascot mood="wink" size={48} className="shrink-0" />
              ) : checked.correct ? (
                <CircleCheck size={44} className="shrink-0 text-ok" fill="var(--surface)" />
              ) : (
                <CircleX size={44} className="shrink-0 text-bad" fill="var(--surface)" />
              )}
              <div className="min-w-0">
                <div className={`text-xl font-black ${ex.type === 'open' ? 'text-brand-ink' : checked.correct ? 'text-ok-ink' : 'text-bad-ink'}`}>
                  {ex.type === 'open'
                    ? 'Resposta salva! Compare com:'
                    : checked.correct
                      ? checked.praise
                      : correctText
                        ? 'Resposta correta:'
                        : 'Quase! Vale revisar este ponto.'}
                </div>
                {correctText && <div className="font-extrabold text-bad-ink">{correctText}</div>}
                {explanation && (
                  <p
                    className={`mt-1 text-[15px] font-semibold ${
                      ex.type === 'open' ? 'text-ink' : checked.correct ? 'text-ok-ink' : 'text-bad-ink'
                    }`}
                  >
                    {explanation}
                  </p>
                )}
              </div>
            </div>
          )}
          {!checked && <div className="hidden flex-1 sm:block" />}
          <button
            className={`btn w-full sm:w-44 ${
              checked ? (checked.correct || ex?.type === 'open' ? 'btn-ok' : 'btn-bad') : isCard ? 'btn-primary' : 'btn-ok'
            }`}
            disabled={!isCard && !checked && !answer}
            onClick={primary}
          >
            {isCard || checked ? 'Continuar' : feedback === 'deferred' ? 'Confirmar' : 'Verificar'}
          </button>
        </div>
      </footer>

      <Modal open={exitOpen} onClose={() => setExitOpen(false)} label="Sair da atividade">
        <div className="flex flex-col items-center text-center">
          <Mascot mood="sad" size={90} />
          <h2 className="mt-3 text-xl font-black">Espera, não vá embora!</h2>
          <p className="mt-1 font-semibold text-muted">Se sair agora, o progresso desta atividade será perdido.</p>
          <button className="btn btn-primary mt-6 w-full" onClick={() => setExitOpen(false)}>
            Continuar estudando
          </button>
          <button className="btn mt-3 w-full text-bad-ink" onClick={onExit}>
            Sair
          </button>
        </div>
      </Modal>
    </div>
  )
}
