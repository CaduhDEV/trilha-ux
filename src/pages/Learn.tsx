import { BookOpen, Check, Lock, Trophy } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router'
import { Mascot } from '../components/Mascot'
import { KIND_LABEL, KindIcon, ProgressBar } from '../components/ui'
import { course } from '../content'
import type { Module, PathItem, Unit } from '../content/types'
import { useData } from '../context/AppContext'
import { itemHref } from '../lib/routes'

const OFFSETS = [0, 44, 72, 44, 0, -44, -72, -44]

export default function Learn() {
  const { data, d } = useData()
  const [openId, setOpenId] = useState<string | null>(null)
  const scrolled = useRef(false)

  const currentId = d.current?.id
  useEffect(() => {
    if (scrolled.current || !currentId) return
    scrolled.current = true
    document.getElementById(`node-${currentId}`)?.scrollIntoView({ block: 'center' })
  }, [currentId])

  useEffect(() => {
    if (!openId) return
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-node]')) setOpenId(null)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [openId])

  const first = data.profile.display_name.split(' ')[0]
  const graduated = d.modulesDone.length === course.modules.length

  return (
    <div className="mx-auto max-w-xl">
      {d.current && (
        <div className="card mb-8 flex items-center gap-4 p-4">
          <Mascot mood="happy" size={64} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold text-muted">
              {d.doneToday ? `Boa, ${first}! Bora mais um?` : `Oi, ${first}! Seu próximo passo:`}
            </div>
            <div className="truncate text-lg font-black">{d.current.title}</div>
          </div>
          <Link to={itemHref(d.current)} className="btn btn-ok shrink-0">
            Continuar
          </Link>
        </div>
      )}

      {course.modules.map((m) => (
        <ModuleSection key={m.id} module={m} openId={openId} setOpenId={setOpenId} />
      ))}

      <div className="mt-6 flex flex-col items-center gap-3 pb-10 text-center">
        <div
          className={`grid h-24 w-24 place-items-center rounded-full ${graduated ? 'bg-gold text-[#3b2600]' : 'bg-locked text-locked-ink'}`}
          style={{ boxShadow: `0 7px 0 ${graduated ? 'var(--gold-dark)' : 'var(--locked-dark)'}` }}
        >
          <Trophy size={44} strokeWidth={2.5} />
        </div>
        <div className="text-xl font-black">Formatura</div>
        <p className="max-w-xs text-sm font-semibold text-muted">
          {graduated
            ? 'Você concluiu a trilha inteira. Parabéns, UX designer! 🎓'
            : 'Conclua os 6 módulos para receber o certificado final.'}
        </p>
        {graduated && (
          <Link to="/certificado/final" className="btn btn-gold">
            Ver certificado
          </Link>
        )}
      </div>
    </div>
  )
}

function ModuleSection({
  module: m,
  openId,
  setOpenId,
}: {
  module: Module
  openId: string | null
  setOpenId: (id: string | null) => void
}) {
  const { d } = useData()
  const done = m.items.filter((i) => d.completed.has(i.id)).length
  const finished = d.modulesDone.includes(m.number)
  const examItems = [m.exam, m.project]
  return (
    <section className="mb-10">
      <div className="mb-8 rounded-3xl p-6 text-white" style={{ background: m.color, boxShadow: `0 6px 0 ${m.colorDark}` }}>
        <div className="text-sm font-extrabold uppercase tracking-wide text-white/80">
          Módulo {m.number} · mês {m.number}
        </div>
        <h2 className="mt-1 text-2xl font-black leading-tight">{m.title}</h2>
        <p className="mt-1 font-semibold text-white/90">{m.tagline}</p>
        <div className="mt-4 flex items-center gap-3">
          <ProgressBar value={done / m.items.length} color="#fff" className="!bg-black/20" height={12} />
          <span className="shrink-0 text-sm font-black">
            {done}/{m.items.length}
          </span>
        </div>
        {finished && (
          <Link to={`/certificado/${m.id}`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-3 py-1.5 text-sm font-black">
            🏅 Certificado: {m.badge}
          </Link>
        )}
      </div>

      {m.units.map((u, ui) => (
        <UnitSection key={u.id} unit={u} module={m} mascotSide={ui % 2 === 0 ? 'right' : 'left'} openId={openId} setOpenId={setOpenId} />
      ))}

      <div className="relative mt-2 rounded-3xl border-2 border-dashed p-5" style={{ borderColor: m.color }}>
        <div className="mb-4 text-center text-sm font-extrabold uppercase tracking-wide" style={{ color: m.color }}>
          Fechamento do módulo {m.number}
        </div>
        <div className="flex flex-col items-center gap-8">
          {examItems.map((item, i) => (
            <PathNode key={item.id} item={item} module={m} offset={i === 0 ? -40 : 40} openId={openId} setOpenId={setOpenId} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UnitSection({
  unit: u,
  module: m,
  mascotSide,
  openId,
  setOpenId,
}: {
  unit: Unit
  module: Module
  mascotSide: 'left' | 'right'
  openId: string | null
  setOpenId: (id: string | null) => void
}) {
  const { d } = useData()
  const allDone = u.items.every((i) => d.completed.has(i.id))
  return (
    <div className="mb-10">
      <div
        className="sticky top-16 z-10 mb-8 flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-white lg:top-4"
        style={{ background: m.color, boxShadow: `0 4px 0 ${m.colorDark}` }}
      >
        <div className="min-w-0">
          <div className="text-xs font-extrabold uppercase tracking-wide text-white/80">
            Semana {u.number} {allDone && '· concluída ✓'}
          </div>
          <div className="truncate text-lg font-black">{u.title}</div>
        </div>
        <Link
          to={`/guia/${u.id}`}
          className="flex shrink-0 items-center gap-2 rounded-xl border-2 border-white/30 px-3 py-2 text-xs font-extrabold uppercase hover:bg-white/10"
        >
          <BookOpen size={18} /> Guia
        </Link>
      </div>
      <div className="relative flex flex-col items-center gap-7">
        {u.items.map((item, i) => (
          <PathNode key={item.id} item={item} module={m} offset={OFFSETS[i % OFFSETS.length]} openId={openId} setOpenId={setOpenId} />
        ))}
        <Mascot
          mood={allDone ? 'party' : 'think'}
          size={88}
          className={`pointer-events-none absolute top-24 hidden opacity-90 sm:block ${mascotSide === 'right' ? 'right-2' : 'left-2'}`}
        />
      </div>
    </div>
  )
}

function PathNode({
  item,
  module: m,
  offset,
  openId,
  setOpenId,
}: {
  item: PathItem
  module: Module
  offset: number
  openId: string | null
  setOpenId: (id: string | null) => void
}) {
  const { d } = useData()
  const navigate = useNavigate()
  const done = d.completed.has(item.id)
  const unlocked = d.isUnlocked(item.id)
  const current = d.current?.id === item.id
  const big = item.kind !== 'lesson'
  const size = big ? 82 : 72
  const open = openId === item.id
  const sub = d.submissions.get(item.id)

  const gold = item.kind === 'exam' || item.kind === 'project'
  const bg = done ? (gold ? 'var(--gold)' : m.color) : unlocked ? m.color : 'var(--locked)'
  const shadow = done ? (gold ? 'var(--gold-dark)' : m.colorDark) : unlocked ? m.colorDark : 'var(--locked-dark)'

  return (
    <div id={`node-${item.id}`} data-node className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {current && !open && (
        <div
          className="animate-bob absolute -top-11 z-[5] whitespace-nowrap rounded-xl border-2 border-line bg-surface px-3 py-1.5 text-sm font-black uppercase"
          style={{ color: m.color }}
        >
          Começar
          <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-line bg-surface" />
        </div>
      )}
      <button
        aria-label={`${KIND_LABEL[item.kind]}: ${item.title}${done ? ' (concluída)' : unlocked ? '' : ' (bloqueada)'}`}
        onClick={() => setOpenId(open ? null : item.id)}
        className={`grid place-items-center rounded-full transition-transform active:translate-y-1.5 ${current ? 'animate-[ring_1.6s_ease-out_infinite]' : ''}`}
        style={
          {
            width: size,
            height: size,
            background: bg,
            color: done && gold ? '#3b2600' : unlocked || done ? '#fff' : 'var(--locked-ink)',
            boxShadow: `0 7px 0 ${shadow}`,
            '--node-color': m.color,
          } as CSSProperties
        }
      >
        {done && item.kind === 'lesson' ? (
          <Check size={34} strokeWidth={4} />
        ) : !unlocked ? (
          <Lock size={28} strokeWidth={2.8} />
        ) : (
          <KindIcon kind={item.kind} size={big ? 36 : 30} />
        )}
      </button>
      {big && (
        <div className="mt-3 max-w-40 text-center text-xs font-black uppercase tracking-wide text-muted">{KIND_LABEL[item.kind]}</div>
      )}

      {open && (
        <div
          className="absolute top-full z-20 mt-4 w-72 max-w-[calc(100vw-32px)]"
          style={{ left: '50%', transform: `translateX(calc(-50% - ${offset}px))` }}
        >
        <div
          className="animate-pop relative rounded-2xl p-4 shadow-xl"
          style={{ background: unlocked ? m.color : 'var(--surface-2)', color: unlocked ? '#fff' : 'var(--ink)' }}
        >
          <span
            className="absolute -top-2 h-4 w-4 -translate-x-1/2 rotate-45"
            style={{ left: `calc(50% + ${offset}px)`, background: unlocked ? m.color : 'var(--surface-2)' }}
          />
          <div className="text-xs font-extrabold uppercase tracking-wide opacity-80">
            {KIND_LABEL[item.kind]} · {item.minutes} min · +{item.xp} XP
          </div>
          <div className="mt-1 text-lg font-black leading-snug">{item.title}</div>
          <p className="mt-1 text-sm font-semibold opacity-90">{item.summary}</p>
          {sub && sub.status !== 'rascunho' && (
            <div className="mt-2 text-xs font-black uppercase opacity-90">
              Entrega: {sub.status === 'aprovado' ? '✅ aprovada' : sub.status === 'refazer' ? '🔁 pediram ajustes' : '📨 enviada'}
            </div>
          )}
          {unlocked ? (
            <button
              className="btn mt-4 w-full bg-white"
              style={{ color: m.color, '--btn-shadow': 'rgba(0,0,0,.2)' } as CSSProperties}
              onClick={() => navigate(itemHref(item))}
            >
              {done ? (item.kind === 'practice' || item.kind === 'project' ? 'Ver entrega' : 'Refazer (+5 XP)') : `Começar +${item.xp} XP`}
            </button>
          ) : (
            <p className="mt-3 text-sm font-bold text-muted">Conclua as etapas anteriores para desbloquear.</p>
          )}
        </div>
        </div>
      )}
    </div>
  )
}
