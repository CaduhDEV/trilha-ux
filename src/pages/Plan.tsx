import { Check, ChevronDown, Lock, Printer } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { KIND_LABEL, KindIcon, ProgressBar } from '../components/ui'
import { course } from '../content'
import { useData } from '../context/AppContext'
import { addDays, daysBetween, formatLong, formatShort, today, WEEKDAYS } from '../lib/dates'
import { itemHref } from '../lib/routes'

const ROUTINE = [
  { day: 1, what: 'Lição 1 da semana + cartões de revisão', time: '30–45 min' },
  { day: 2, what: 'Lição 2 + cartões de revisão', time: '30–45 min' },
  { day: 3, what: 'Lição 3 + cartões de revisão', time: '30–45 min' },
  { day: 4, what: 'Prática no Figma/FigJam', time: '1–2 h' },
  { day: 5, what: 'Terminar a prática + materiais "Para ir além"', time: '1 h' },
  { day: 6, what: 'Checkpoint + treino de fixação + projeto do mês', time: '1–2 h' },
  { day: 0, what: 'Descanso (ou só os cartões, 5 min)', time: '—' },
]

export default function Plan() {
  const { data, d } = useData()
  const start = data.profile.start_date
  const t = today()
  const weekNow = Math.max(1, Math.floor(daysBetween(start, t) / 7) + 1)
  const currentUnit = d.current?.unitId ? course.unitById.get(d.current.unitId) : null
  const currentWeek = currentUnit?.number ?? (d.current ? course.units.length : course.units.length + 1)
  const diff = currentWeek - Math.min(weekNow, course.units.length)
  const totalItems = course.items.length
  const end = addDays(start, (course.units.length + 2) * 7 - 1)
  const [open, setOpen] = useState<string | null>(course.modules.find((m) => m.units.some((u) => u.number === currentWeek))?.id ?? 'm1')

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">Plano de estudos</h1>
          <p className="mt-1 font-semibold text-muted">
            {formatLong(start)} → {formatLong(end)} · {course.units.length} semanas de conteúdo + 2 de folga
          </p>
        </div>
        <button className="btn btn-ghost no-print shrink-0 px-3" onClick={() => window.print()} aria-label="Imprimir plano">
          <Printer size={18} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <div className="card p-4">
          <div className="text-xs font-extrabold uppercase text-muted">Semana do calendário</div>
          <div className="text-3xl font-black">{Math.min(weekNow, 26)}<span className="text-lg text-muted">/26</span></div>
        </div>
        <div className="card p-4">
          <div className="text-xs font-extrabold uppercase text-muted">Você está na semana</div>
          <div className="text-3xl font-black">{Math.min(currentWeek, course.units.length)}<span className="text-lg text-muted">/{course.units.length}</span></div>
        </div>
        <div className={`card col-span-2 p-4 sm:col-span-1 ${diff >= 0 ? 'border-ok' : diff >= -1 ? 'border-gold' : 'border-bad'}`}>
          <div className="text-xs font-extrabold uppercase text-muted">Ritmo</div>
          <div className={`text-xl font-black ${diff >= 0 ? 'text-ok-ink' : diff >= -1 ? 'text-gold-ink' : 'text-bad-ink'}`}>
            {diff > 0 ? `Adiantada(o) ${diff} sem.` : diff === 0 ? 'No ritmo certo ✓' : `${-diff} sem. atrás`}
          </div>
          {diff < -1 && <div className="text-xs font-bold text-muted">Use as 2 semanas de folga para recuperar.</div>}
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar value={d.completed.size / totalItems} />
        <div className="mt-1 text-sm font-bold text-muted">
          {d.completed.size} de {totalItems} etapas concluídas ({Math.round((100 * d.completed.size) / totalItems)}%)
        </div>
      </div>

      <section className="card mt-8 p-5">
        <h2 className="text-lg font-black">Rotina semanal sugerida (~8–10 h/semana)</h2>
        <ul className="mt-3 divide-y-2 divide-line">
          {ROUTINE.map((r) => {
            const studying = data.profile.study_days.includes(r.day)
            return (
              <li key={r.day} className={`flex items-center gap-3 py-2.5 ${studying ? '' : 'opacity-50'}`}>
                <span className={`w-12 shrink-0 rounded-lg py-1 text-center text-sm font-black ${studying ? 'bg-brand-soft text-brand-ink' : 'bg-surface-2'}`}>
                  {WEEKDAYS[r.day]}
                </span>
                <span className="flex-1 font-semibold">{r.what}</span>
                <span className="shrink-0 text-sm font-bold text-muted">{r.time}</span>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-sm font-semibold text-muted">
          Dica: estudar um pouco todo dia rende mais do que muitas horas de uma vez só. A sequência 🔥 ajuda a manter o hábito.
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-4">
        {course.modules.map((m) => {
          const isOpen = open === m.id
          const done = m.items.filter((i) => d.completed.has(i.id)).length
          const first = m.units[0].number
          const last = m.units.at(-1)!.number
          return (
            <section key={m.id} className="card overflow-hidden">
              <button className="flex w-full items-center gap-4 p-5 text-left" onClick={() => setOpen(isOpen ? null : m.id)} aria-expanded={isOpen}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl font-black text-white" style={{ background: m.color }}>
                  {m.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-extrabold uppercase text-muted">
                    Mês {m.number} · semanas {first}–{last} · {formatShort(addDays(start, (first - 1) * 7))} a{' '}
                    {formatShort(addDays(start, last * 7 - 1))}
                  </span>
                  <span className="block text-lg font-black">{m.title}</span>
                  <span className="mt-1 block">
                    <ProgressBar value={done / m.items.length} color={m.color} height={8} />
                  </span>
                </span>
                <ChevronDown className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="border-t-2 border-line px-5 pb-5">
                  <p className="mt-4 font-semibold">{m.description}</p>
                  <div className="mt-4 rounded-2xl bg-surface-2 p-4">
                    <div className="mb-2 text-sm font-black uppercase text-muted">Ao final do mês você vai saber</div>
                    <ul className="list-disc space-y-1 pl-5 font-semibold">
                      {m.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                  {m.units.map((u) => (
                    <div key={u.id} className="mt-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-black">
                          Semana {u.number}: {u.title}
                        </h3>
                        <span className="shrink-0 text-xs font-bold text-muted">
                          {formatShort(addDays(start, (u.number - 1) * 7))}–{formatShort(addDays(start, u.number * 7 - 1))}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-muted">{u.goal}</p>
                      <ItemList ids={u.items.map((i) => i.id)} />
                      <Link to={`/guia/${u.id}`} className="mt-2 inline-block text-sm font-extrabold uppercase text-sky">
                        Guia da semana →
                      </Link>
                    </div>
                  ))}
                  <div className="mt-5">
                    <h3 className="font-black">Fechamento do mês</h3>
                    <ItemList ids={[m.exam.id, m.project.id]} />
                  </div>
                </div>
              )}
            </section>
          )
        })}
        <section className="card p-5">
          <div className="text-xs font-extrabold uppercase text-muted">
            Semanas 25–26 · {formatShort(addDays(start, 24 * 7))} a {formatShort(end)}
          </div>
          <h3 className="text-lg font-black">Folga, recuperação e formatura 🎓</h3>
          <p className="mt-1 font-semibold text-muted">
            Duas semanas de margem para imprevistos, refinar o portfólio e começar a se candidatar às vagas.
          </p>
        </section>
      </div>
    </div>
  )
}

function ItemList({ ids }: { ids: string[] }) {
  const { d } = useData()
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {ids.map((id) => {
        const item = course.byId.get(id)!
        const done = d.completed.has(id)
        const unlocked = d.isUnlocked(id)
        const inner = (
          <>
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${done ? 'bg-ok text-white' : unlocked ? 'bg-brand-soft text-brand-ink' : 'bg-locked text-locked-ink'}`}
            >
              {done ? <Check size={16} strokeWidth={3.5} /> : unlocked ? <KindIcon kind={item.kind} size={16} /> : <Lock size={14} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold leading-snug">{item.title}</span>
              <span className="block text-xs font-bold text-muted">
                {KIND_LABEL[item.kind]} · {item.minutes >= 60 ? `${Math.round(item.minutes / 6) / 10} h` : `${item.minutes} min`}
              </span>
            </span>
          </>
        )
        return (
          <li key={id}>
            {unlocked ? (
              <Link to={itemHref(item)} className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-surface-2">
                {inner}
              </Link>
            ) : (
              <div className="flex items-center gap-3 rounded-xl p-1.5 opacity-70">{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
