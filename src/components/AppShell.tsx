import { Brain, CalendarDays, Flame, House, Library, User, Users } from 'lucide-react'
import { NavLink, Outlet, Link } from 'react-router'
import { useData } from '../context/AppContext'
import { course } from '../content'
import { store } from '../lib/store'
import { Mascot } from './Mascot'
import { ProgressBar, XpIcon } from './ui'

function useNav() {
  const { data, d } = useData()
  const items = [
    { to: '/', label: 'Aprender', icon: House, end: true },
    { to: '/revisar', label: 'Revisar', icon: Brain, badge: d.dueCards.length || undefined },
    { to: '/plano', label: 'Plano', icon: CalendarDays },
    { to: '/glossario', label: 'Glossário', icon: Library },
    { to: '/perfil', label: 'Perfil', icon: User },
  ]
  if (data.profile.role === 'mentor') items.push({ to: '/mentor', label: 'Mentoria', icon: Users })
  return items
}

export function AppShell() {
  const nav = useNav()
  return (
    <div className="min-h-dvh">
      {/* Barra lateral (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r-2 border-line bg-bg px-4 py-6 lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-3">
          <Mascot size={40} />
          <span className="text-2xl font-black tracking-tight text-brand-ink">trilha ux</span>
        </Link>
        <nav className="flex flex-col gap-1.5">
          {nav.map(({ to, label, icon: Icon, badge, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl border-2 px-3 py-2.5 text-sm font-extrabold uppercase tracking-wide transition-colors ${
                  isActive ? 'border-sky/60 bg-sky/10 text-sky' : 'border-transparent text-muted hover:bg-surface-2'
                }`
              }
            >
              <Icon size={26} strokeWidth={2.3} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {badge ? <span className="chip bg-bad text-white">{badge}</span> : null}
            </NavLink>
          ))}
        </nav>
        {/* Entre lg e xl a coluna da direita some; sem isso sequência e XP ficariam invisíveis */}
        <div className="mt-6 flex justify-center rounded-2xl border-2 border-line py-2.5 xl:hidden">
          <TopStats />
        </div>
        {store.mode === 'demo' && (
          <div className="mt-auto rounded-2xl bg-gold-soft p-3 text-xs font-bold text-gold-ink">
            Modo demonstração: o progresso fica salvo só neste navegador. Configure o Supabase para usar de verdade.
          </div>
        )}
      </aside>

      {/* Topo (mobile) */}
      <header className="sticky top-0 z-30 border-b-2 border-line bg-bg/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Mascot size={30} />
            <span className="text-lg font-black text-brand-ink">trilha ux</span>
          </Link>
          <TopStats />
        </div>
      </header>

      <div className="lg:pl-60">
        <div className="mx-auto flex max-w-6xl gap-10 px-4 pb-28 pt-6 lg:px-8 lg:pb-12">
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
          <RightRail />
        </div>
      </div>

      {/* Navegação inferior (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-line bg-bg lg:hidden">
        <div className="mx-auto flex max-w-2xl justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {nav.map(({ to, label, icon: Icon, badge, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              aria-label={label}
              className={({ isActive }) =>
                `relative flex min-w-0 flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-extrabold ${isActive ? 'text-sky' : 'text-muted'}`
              }
            >
              <Icon size={24} strokeWidth={2.3} />
              <span className="max-w-full truncate">{label}</span>
              {badge ? (
                <span className="absolute right-[22%] top-1 rounded-full bg-bad px-1.5 text-[10px] font-black text-white">
                  {badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

/** Explica a sequência no tooltip/leitor de tela — o ícone sozinho não diz o que é */
function streakHint(streak: number, doneToday: boolean) {
  const days = `${streak} ${streak === 1 ? 'dia seguido' : 'dias seguidos'} de estudo`
  return doneToday ? `${days}. Hoje já conta!` : `${days}. Estude hoje para manter a sequência.`
}

/** Sequência 🔥 e XP ⚡ com rótulo visível ("3 dias", "120 XP") */
function TopStats() {
  const { d } = useData()
  return (
    <div className="flex items-center gap-4 font-black">
      <Link
        to="/perfil"
        className={`flex items-center gap-1 ${d.doneToday ? 'text-fire' : 'text-locked-ink'}`}
        title={streakHint(d.streak, d.doneToday)}
        aria-label={streakHint(d.streak, d.doneToday)}
      >
        <Flame size={20} fill="currentColor" className="shrink-0" />
        <span className="whitespace-nowrap">
          {d.streak} <span className="text-xs font-extrabold">{d.streak === 1 ? 'dia' : 'dias'}</span>
        </span>
      </Link>
      <Link to="/perfil" className="flex items-center gap-1 text-gold-ink" title="XP total: pontos ganhos estudando" aria-label={`${d.totalXp} XP no total`}>
        <XpIcon size={20} className="shrink-0" />
        <span className="whitespace-nowrap">
          {d.totalXp} <span className="text-xs font-extrabold">XP</span>
        </span>
      </Link>
    </div>
  )
}

function RightRail() {
  const { data, d } = useData()
  const goal = data.profile.daily_goal_xp
  const current = d.current
  const unit = current?.unitId ? course.unitById.get(current.unitId) : null
  const unitDone = unit ? unit.items.filter((i) => d.completed.has(i.id)).length : 0

  return (
    <aside className="sticky top-6 hidden h-fit w-80 shrink-0 flex-col gap-4 xl:flex">
      <div className="grid grid-cols-3 rounded-3xl border-2 border-line px-2 py-3 text-center">
        <div className={d.doneToday ? 'text-fire' : 'text-locked-ink'} title={streakHint(d.streak, d.doneToday)}>
          <div className="flex items-center justify-center gap-1 text-lg font-black">
            <Flame size={22} fill="currentColor" /> {d.streak}
          </div>
          <div className="text-[11px] font-extrabold uppercase text-muted">{d.streak === 1 ? 'dia seguido' : 'dias seguidos'}</div>
        </div>
        <div className="text-gold-ink" title="Pontos ganhos estudando">
          <div className="flex items-center justify-center gap-1 text-lg font-black">
            <XpIcon size={22} /> {d.totalXp}
          </div>
          <div className="text-[11px] font-extrabold uppercase text-muted">XP total</div>
        </div>
        <div className="text-brand-ink">
          <div className="flex items-center justify-center text-lg font-black">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-sm text-white">{d.level.level}</span>
          </div>
          <div className="text-[11px] font-extrabold uppercase text-muted">nível</div>
        </div>
      </div>
      {!d.doneToday && d.streak > 0 && (
        <p className="-mt-2 text-center text-xs font-bold text-muted">Estude hoje para não perder a sequência de {d.streak} 🔥</p>
      )}

      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-black">Meta diária</h3>
          <Link to="/perfil" className="text-sm font-extrabold uppercase text-sky">
            Editar
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <XpIcon size={34} className="shrink-0 text-gold" />
          <div className="flex-1">
            <ProgressBar value={d.todayXp / goal} color="var(--gold)" />
            <div className="mt-1.5 text-sm font-bold text-muted">
              {Math.min(d.todayXp, goal)} / {goal} XP {d.todayXp >= goal && '— meta batida! 🎉'}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="mb-1 font-black">Revisão espaçada</h3>
        <p className="mb-4 text-sm font-semibold text-muted">
          {d.dueCards.length
            ? `${d.dueCards.length} ${d.dueCards.length === 1 ? 'cartão espera' : 'cartões esperam'} por você hoje.`
            : 'Nada pendente hoje. Seus cartões novos aparecem amanhã.'}
        </p>
        <Link to="/revisar" className={`btn w-full ${d.dueCards.length ? 'btn-primary' : 'btn-ghost'}`}>
          <Brain size={18} /> Revisar
        </Link>
      </div>

      {unit && (
        <div className="card p-5">
          <div className="mb-1 text-xs font-extrabold uppercase tracking-wide text-muted">Semana {unit.number} de 24</div>
          <h3 className="font-black">{unit.title}</h3>
          <p className="mb-3 mt-1 text-sm font-semibold text-muted">{unit.goal}</p>
          <ProgressBar value={unitDone / unit.items.length} />
          <div className="mt-1.5 text-sm font-bold text-muted">
            {unitDone} de {unit.items.length} etapas
          </div>
        </div>
      )}
    </aside>
  )
}
