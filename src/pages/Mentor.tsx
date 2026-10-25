import { CircleCheck, ExternalLink, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { MascotSays } from '../components/Mascot'
import { ProgressBar, SectionTitle, Spinner } from '../components/ui'
import { course } from '../content'
import type { PracticeItem } from '../content/types'
import { useData } from '../context/AppContext'
import { formatShort } from '../lib/dates'
import { store } from '../lib/store'
import type { ItemProgress, StudentOverview, SubmissionForReview, SubmissionStatus } from '../lib/types'

export default function Mentor() {
  const { data, notify } = useData()
  const [students, setStudents] = useState<StudentOverview[] | null>(null)
  const [subs, setSubs] = useState<SubmissionForReview[] | null>(null)
  const [filter, setFilter] = useState<'pendentes' | 'todas'>('pendentes')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, ItemProgress[]>>({})

  const load = useCallback(async () => {
    try {
      const [s, sub] = await Promise.all([store.mentorOverview(), store.submissionsForReview()])
      setStudents(s)
      setSubs(sub)
    } catch (e) {
      notify({ kind: 'error', title: 'Erro ao carregar a mentoria', body: e instanceof Error ? e.message : undefined })
    }
  }, [notify])

  useEffect(() => {
    void load()
  }, [load])

  if (data.profile.role !== 'mentor') return <Navigate to="/" replace />

  const toggle = async (id: string) => {
    setExpanded(expanded === id ? null : id)
    if (!progress[id]) {
      const p = await store.studentProgress(id)
      setProgress((prev) => ({ ...prev, [id]: p }))
    }
  }

  const shown = (subs ?? []).filter((s) => filter === 'todas' || s.status === 'enviado')

  return (
    <div className="mx-auto max-w-3xl">
      <MascotSays mood="wink" className="mb-8">
        Painel de mentoria: acompanhe o progresso e dê feedback nas entregas. Feedback rápido mantém a motivação lá em cima!
      </MascotSays>

      <SectionTitle>Alunas(os)</SectionTitle>
      {!students ? (
        <Spinner />
      ) : students.length === 0 ? (
        <p className="card p-5 font-semibold text-muted">Ninguém cadastrado ainda.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {students.map((s) => {
            const pct = s.completed_items / course.items.length
            const open = expanded === s.user_id
            const done = new Set((progress[s.user_id] ?? []).map((p) => p.item_id))
            return (
              <div key={s.user_id} className="card overflow-hidden">
                <button className="flex w-full flex-wrap items-center gap-4 p-4 text-left" onClick={() => toggle(s.user_id)} aria-expanded={open}>
                  <div className="min-w-0 flex-1">
                    <div className="font-black">{s.display_name}</div>
                    <div className="text-sm font-semibold text-muted">
                      Início {formatShort(s.start_date)} · última atividade {s.last_active ? formatShort(s.last_active) : '—'}
                    </div>
                    <ProgressBar value={pct} height={10} className="mt-2" />
                  </div>
                  <div className="flex gap-4 text-center text-sm font-bold">
                    <div>
                      <div className="text-lg font-black">{Math.round(pct * 100)}%</div>
                      <div className="text-muted">trilha</div>
                    </div>
                    <div>
                      <div className="text-lg font-black">{s.xp_7d}</div>
                      <div className="text-muted">XP 7d</div>
                    </div>
                    <div>
                      <div className={`text-lg font-black ${s.pending_submissions ? 'text-bad-ink' : ''}`}>{s.pending_submissions}</div>
                      <div className="text-muted">a revisar</div>
                    </div>
                  </div>
                </button>
                {open && (
                  <div className="border-t-2 border-line p-4">
                    {course.modules.map((m) => {
                      const n = m.items.filter((i) => done.has(i.id)).length
                      return (
                        <div key={m.id} className="flex items-center gap-3 py-1.5">
                          <span className="w-28 shrink-0 truncate text-sm font-black sm:w-40">
                            M{m.number} · {m.title}
                          </span>
                          <ProgressBar value={n / m.items.length} color={m.color} height={10} />
                          <span className="w-10 shrink-0 text-right text-xs font-bold text-muted sm:w-14">
                            {n}/{m.items.length}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-10">
        <SectionTitle
          aside={
            <div className="flex gap-2">
              {(['pendentes', 'todas'] as const).map((f) => (
                <button
                  key={f}
                  className={`chip border-2 px-3 py-1 ${filter === f ? 'border-sky bg-sky/10 text-sky' : 'border-line text-muted'}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          Entregas
        </SectionTitle>
        {!subs ? (
          <Spinner />
        ) : shown.length === 0 ? (
          <p className="card p-5 font-semibold text-muted">Nenhuma entrega {filter === 'pendentes' ? 'aguardando revisão' : 'ainda'}. 🎉</p>
        ) : (
          <div className="flex flex-col gap-4">
            {shown.map((s) => (
              <SubmissionCard key={s.id} sub={s} onDone={load} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SubmissionCard({ sub, onDone }: { sub: SubmissionForReview; onDone: () => Promise<void> }) {
  const { notify } = useData()
  const item = course.byId.get(sub.practice_id) as PracticeItem | undefined
  const [feedback, setFeedback] = useState(sub.mentor_feedback ?? '')
  const [busy, setBusy] = useState(false)

  const send = async (status: SubmissionStatus) => {
    setBusy(true)
    try {
      await store.reviewSubmission(sub.id, status, feedback.trim())
      notify({ kind: 'info', title: status === 'aprovado' ? 'Entrega aprovada' : 'Ajustes solicitados', icon: '📨' })
      await onDone()
    } catch (e) {
      notify({ kind: 'error', title: 'Não consegui salvar', body: e instanceof Error ? e.message : undefined })
    } finally {
      setBusy(false)
    }
  }

  const badge: Record<SubmissionStatus, string> = {
    rascunho: 'bg-surface-2 text-muted',
    enviado: 'bg-sky/15 text-sky',
    aprovado: 'bg-ok-soft text-ok-ink',
    refazer: 'bg-gold-soft text-gold-ink',
  }

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs font-extrabold uppercase text-muted">{sub.display_name}</div>
          <div className="text-lg font-black">{item?.title ?? sub.practice_id}</div>
        </div>
        <span className={`chip ${badge[sub.status]}`}>{sub.status}</span>
      </div>
      {sub.link && (
        <a href={sub.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-bold text-sky underline">
          Abrir entrega <ExternalLink size={16} />
        </a>
      )}
      {sub.notes && <p className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-surface-2 p-3 font-semibold">“{sub.notes}”</p>}
      {item && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-extrabold uppercase text-muted">
            Autoavaliação ({sub.rubric.filter(Boolean).length}/{item.def.rubric.length})
          </summary>
          <ul className="mt-2 flex flex-col gap-1 text-sm font-semibold">
            {item.def.rubric.map((r, i) => (
              <li key={r} className={sub.rubric[i] ? 'text-ok-ink' : 'text-muted line-through'}>
                {sub.rubric[i] ? '✓' : '✗'} {r}
              </li>
            ))}
          </ul>
        </details>
      )}
      <textarea
        className="field mt-4 min-h-24"
        placeholder="Seu feedback: o que ficou bom, o que melhorar, próximo passo…"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <button className="btn btn-gold flex-1" disabled={busy} onClick={() => send('refazer')}>
          <RotateCcw size={18} /> Pedir ajustes
        </button>
        <button className="btn btn-ok flex-1" disabled={busy} onClick={() => send('aprovado')}>
          <CircleCheck size={18} /> Aprovar
        </button>
      </div>
    </div>
  )
}
