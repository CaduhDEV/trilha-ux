import confetti from 'canvas-confetti'
import { ArrowLeft, Check, Clock, ListChecks, MessageSquare, Send, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { Markdown } from '../components/Markdown'
import { KIND_LABEL } from '../components/ui'
import { course } from '../content'
import type { PracticeItem, PracticeTool } from '../content/types'
import { useData } from '../context/AppContext'
import { ResourceList } from './LessonPage'

const TOOL: Record<PracticeTool, { label: string; icon: string }> = {
  figma: { label: 'Figma', icon: '🎨' },
  figjam: { label: 'FigJam', icon: '🟪' },
  papel: { label: 'Papel e caneta', icon: '📝' },
  pesquisa: { label: 'Pesquisa com pessoas', icon: '🎙️' },
  escrita: { label: 'Escrita', icon: '✍️' },
  web: { label: 'Web', icon: '🌐' },
}

export default function PracticePage() {
  const { id = '' } = useParams()
  const item = course.byId.get(id)
  const { d } = useData()
  if (!item || (item.kind !== 'practice' && item.kind !== 'project')) return <Navigate to="/" replace />
  if (!d.isUnlocked(item.id)) return <Navigate to="/" replace />
  return <Practice key={item.id} item={item} />
}

function Practice({ item }: { item: PracticeItem }) {
  const { d, saveSubmission, notify } = useData()
  const sub = d.submissions.get(item.id)
  const def = item.def
  const mod = course.moduleById.get(item.moduleId)!
  const [link, setLink] = useState(sub?.link ?? '')
  const [notes, setNotes] = useState(sub?.notes ?? '')
  const [rubric, setRubric] = useState<boolean[]>(() => def.rubric.map((_, i) => !!sub?.rubric?.[i]))
  const [steps, setSteps] = useState<boolean[]>(() => def.steps.map((_, i) => !!sub?.steps_done?.[i]))
  const [busy, setBusy] = useState(false)
  const done = d.completed.has(item.id)

  const toggleStep = (i: number) => {
    const next = steps.map((v, k) => (k === i ? !v : v))
    setSteps(next)
    void saveSubmission(item, { steps_done: next }).catch(() => undefined)
  }

  const rubricOk = rubric.filter(Boolean).length
  const canSubmit = link.trim().length > 0 && rubricOk >= Math.ceil(def.rubric.length * 0.6)

  async function submit() {
    setBusy(true)
    try {
      const { xp } = await saveSubmission(item, { link: link.trim(), notes: notes.trim() || null, rubric, steps_done: steps }, true)
      if (xp) {
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.7 } })
        notify({ kind: 'xp', title: `Entrega enviada! +${xp} XP`, icon: '🎉' })
      } else notify({ kind: 'info', title: 'Entrega atualizada', icon: '✅' })
    } catch {
      /* o contexto já avisou */
    } finally {
      setBusy(false)
    }
  }

  const status = sub?.status
  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm font-extrabold uppercase text-muted hover:text-ink">
        <ArrowLeft size={18} /> Trilha
      </Link>

      <div className="rounded-3xl p-6 text-white" style={{ background: mod.color, boxShadow: `0 6px 0 ${mod.colorDark}` }}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-white/85">
          <span>{KIND_LABEL[item.kind]}</span>·<span>{TOOL[def.tool].icon} {TOOL[def.tool].label}</span>·
          <span className="flex items-center gap-1">
            <Clock size={14} /> ~{Math.round(def.minutes / 60) >= 1 ? `${Math.round((def.minutes / 60) * 10) / 10} h` : `${def.minutes} min`}
          </span>
          ·
          <span className="flex items-center gap-1">
            <Zap size={14} fill="currentColor" /> {item.xp} XP
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-black leading-tight">{item.title}</h1>
        <p className="mt-1 font-semibold text-white/90">{item.summary}</p>
      </div>

      {status && status !== 'rascunho' && (
        <div
          className={`mt-6 rounded-2xl border-2 p-4 ${
            status === 'aprovado' ? 'border-ok bg-ok-soft' : status === 'refazer' ? 'border-gold bg-gold-soft' : 'border-sky/50 bg-sky/10'
          }`}
        >
          <div className="font-black">
            {status === 'aprovado' ? '✅ Entrega aprovada' : status === 'refazer' ? '🔁 Pediram ajustes' : '📨 Entrega enviada — aguardando revisão'}
          </div>
          {sub?.mentor_feedback && (
            <div className="mt-2 flex gap-2 font-semibold">
              <MessageSquare size={18} className="mt-1 shrink-0" />
              <p className="whitespace-pre-wrap">{sub.mentor_feedback}</p>
            </div>
          )}
        </div>
      )}

      <div className="card mt-6 p-5 sm:p-7">
        <Markdown>{def.brief}</Markdown>
      </div>

      <h2 className="mb-3 mt-8 flex items-center gap-2 text-xl font-black">
        <ListChecks /> Passo a passo
      </h2>
      <ol className="flex flex-col gap-2">
        {def.steps.map((s, i) => (
          <li key={i}>
            <div
              role="checkbox"
              tabIndex={0}
              aria-checked={steps[i]}
              className="option flex cursor-pointer items-start gap-3 text-[15px] font-semibold"
              data-state={steps[i] ? 'correct' : undefined}
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('a')) toggleStep(i)
              }}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  toggleStep(i)
                }
              }}
            >
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 text-xs font-black ${
                  steps[i] ? 'border-ok bg-ok text-white' : 'border-line-strong'
                }`}
              >
                {steps[i] ? <Check size={14} strokeWidth={4} /> : i + 1}
              </span>
              <div className="min-w-0 text-left">
                <Markdown className="!text-[15px]">{s}</Markdown>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {def.tips && def.tips.length > 0 && (
        <div className="mt-6 rounded-2xl bg-brand-soft p-5">
          <div className="mb-2 font-black text-brand-ink">💡 Dicas</div>
          <ul className="list-disc space-y-1 pl-5 font-semibold">
            {def.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 rounded-2xl border-2 border-dashed border-line-strong p-5">
        <div className="text-sm font-extrabold uppercase tracking-wide text-muted">Entregável</div>
        <p className="mt-1 font-bold">{def.deliverable}</p>
      </div>

      {def.resources && def.resources.length > 0 && <ResourceList resources={def.resources} title="Materiais de apoio" />}

      <section className="card mt-8 p-5 sm:p-7">
        <h2 className="text-xl font-black">Autoavaliação</h2>
        <p className="mb-4 mt-1 text-sm font-semibold text-muted">
          Seja honesta(o): marque só o que sua entrega realmente cumpre. Precisa de pelo menos {Math.ceil(def.rubric.length * 0.6)} de{' '}
          {def.rubric.length} para enviar.
        </p>
        <div className="flex flex-col gap-2">
          {def.rubric.map((r, i) => (
            <label key={r} className="flex cursor-pointer items-start gap-3 rounded-xl p-2 font-semibold hover:bg-surface-2">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--ok)]"
                checked={rubric[i]}
                onChange={() => setRubric(rubric.map((v, k) => (k === i ? !v : v)))}
              />
              <span>{r}</span>
            </label>
          ))}
        </div>

        <h3 className="mb-2 mt-6 font-black">Link da entrega</h3>
        <input
          className="field"
          type="url"
          placeholder="https://www.figma.com/design/…"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <p className="mt-1 text-xs font-semibold text-muted">
          No Figma: Compartilhar → "Qualquer pessoa com o link pode ver" → Copiar link. Também vale Google Drive, Notion ou foto.
        </p>

        <h3 className="mb-2 mt-5 font-black">O que você aprendeu / dúvidas (opcional)</h3>
        <textarea
          className="field min-h-28"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="O que foi mais difícil? O que faria diferente?"
        />

        <button className="btn btn-ok mt-5 w-full" disabled={!canSubmit || busy} onClick={submit}>
          <Send size={18} /> {busy ? 'Enviando…' : done ? 'Atualizar entrega' : `Enviar entrega (+${item.xp} XP)`}
        </button>
      </section>
    </div>
  )
}
