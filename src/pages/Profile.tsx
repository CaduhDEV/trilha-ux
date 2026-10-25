import { Award, BookOpen, Brain, Flame, LogOut, Target } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { ProgressBar, SectionTitle, Stat, XpIcon } from '../components/ui'
import { XpChart } from '../components/XpChart'
import { course } from '../content'
import { useData } from '../context/AppContext'
import { formatLong, WEEKDAYS } from '../lib/dates'
import { ACHIEVEMENTS, DAILY_GOALS, longestStreak } from '../lib/gamification'
import { soundEnabled, setSoundEnabled } from '../lib/sound'
import { store } from '../lib/store'
import type { ProfilePatch, Role } from '../lib/types'

export default function Profile() {
  const { data, d, updateProfile, signOut, user, reload } = useData()
  const p = data.profile
  const unlocked = new Map(data.achievements.map((a) => [a.achievement_id, a.unlocked_at]))
  const lessons = course.items.filter((i) => i.kind === 'lesson')
  const lessonsDone = lessons.filter((l) => d.completed.has(l.id)).length
  const graded = data.attempts.length
  const accuracy = graded ? Math.round((100 * data.attempts.filter((a) => a.correct).length) / graded) : null
  const reviews = data.xpEvents.filter((e) => e.source === 'flashcards').reduce((s, e) => s + e.xp, 0)
  const title = d.modulesDone.length ? course.modules[Math.max(...d.modulesDone) - 1].badge : 'Iniciante curiosa(o)'
  const initials = p.display_name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-4 sm:gap-5">
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand text-2xl font-black text-white sm:h-24 sm:w-24 sm:text-3xl"
          style={{ boxShadow: '0 6px 0 var(--brand-dark)' }}
        >
          {initials || '🙂'}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-black sm:text-3xl">{p.display_name}</h1>
          <div className="truncate font-bold text-muted" title={user.email ?? undefined}>
            {user.email}
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            <span className="chip bg-brand-soft text-brand-ink">🏅 {title}</span>
            <span className="chip bg-surface-2 text-muted">Desde {formatLong(p.created_at.slice(0, 10))}</span>
          </div>
        </div>
      </div>

      <SectionTitle>
        <span className="mt-8 block">Estatísticas</span>
      </SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat icon={<Flame fill="currentColor" />} tone="text-fire" value={d.streak} label="dias seguidos" />
        <Stat icon={<Flame />} tone="text-gold" value={longestStreak(d.byDay)} label="recorde de dias" />
        <Stat icon={<XpIcon />} tone="text-gold" value={d.totalXp} label="XP total" />
        <Stat icon={<BookOpen />} tone="text-brand" value={`${lessonsDone}/${lessons.length}`} label="lições" />
        <Stat icon={<Target />} tone="text-ok" value={accuracy === null ? '—' : `${accuracy}%`} label="acertos" />
        <Stat icon={<Brain />} tone="text-sky" value={reviews} label="revisões" />
      </div>

      <div className="card mt-4 p-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3">
          <span className="font-black">Nível {d.level.level}</span>
          <span className="text-sm font-bold text-muted">
            {d.totalXp - d.level.floor} / {d.level.ceil - d.level.floor} XP para o nível {d.level.level + 1}
          </span>
        </div>
        <ProgressBar value={d.level.progress} color="var(--brand)" />
      </div>

      <div className="card mt-4 p-5">
        <h2 className="mb-4 font-black">XP nos últimos 14 dias</h2>
        <XpChart byDay={d.byDay} goal={p.daily_goal_xp} />
      </div>

      <SectionTitle aside={<span className="text-sm font-bold text-muted">{unlocked.size}/{ACHIEVEMENTS.length}</span>}>
        <span className="mt-8 block">Conquistas</span>
      </SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const at = unlocked.get(a.id)
          return (
            <div key={a.id} className={`card p-4 text-center ${at ? 'border-gold' : 'opacity-50 grayscale'}`} title={a.description}>
              <div className="text-4xl">{a.icon}</div>
              <div className="mt-2 font-black leading-tight">{a.title}</div>
              <div className="mt-1 text-xs font-semibold text-muted">{a.description}</div>
            </div>
          )
        })}
      </div>

      {d.modulesDone.length > 0 && (
        <>
          <SectionTitle>
            <span className="mt-8 block">Certificados</span>
          </SectionTitle>
          <div className="flex flex-col gap-2">
            {d.modulesDone.map((n) => {
              const m = course.modules[n - 1]
              return (
                <Link key={m.id} to={`/certificado/${m.id}`} className="card flex items-center gap-3 p-4 hover:bg-surface-2">
                  <Award style={{ color: m.color }} />
                  <span className="font-black">
                    Módulo {m.number}: {m.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </>
      )}

      <Settings key={p.id + p.daily_goal_xp + p.start_date} onSave={updateProfile} />

      <div className="mt-8 flex flex-col gap-3 pb-6">
        {store.mode === 'demo' && <DemoRoleSwitch role={p.role} onChange={reload} />}
        <button className="btn btn-ghost w-full text-bad-ink" onClick={signOut}>
          <LogOut size={18} /> Sair da conta
        </button>
      </div>
    </div>
  )
}

function Settings({ onSave }: { onSave: (p: ProfilePatch) => Promise<void> }) {
  const { data } = useData()
  const p = data.profile
  const [name, setName] = useState(p.display_name)
  const [sound, setSound] = useState(soundEnabled())
  return (
    <section className="card mt-8 p-5">
      <h2 className="text-xl font-black">Configurações</h2>

      <label className="mt-4 block font-bold">
        Nome
        <input className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => name.trim() && name !== p.display_name && onSave({ display_name: name.trim() })} />
      </label>

      <div className="mt-4 font-bold">Meta diária</div>
      <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DAILY_GOALS.map((g) => (
          <button
            key={g.xp}
            className="option px-2 py-2 text-center text-sm"
            data-state={p.daily_goal_xp === g.xp ? 'selected' : undefined}
            onClick={() => onSave({ daily_goal_xp: g.xp })}
          >
            {g.label}
            <span className="block text-xs opacity-75">{g.xp} XP</span>
          </button>
        ))}
      </div>

      <label className="mt-4 block font-bold">
        Data de início do plano
        <input type="date" className="field mt-1" defaultValue={p.start_date} onChange={(e) => e.target.value && onSave({ start_date: e.target.value })} />
      </label>

      <div className="mt-4 font-bold">Dias de estudo</div>
      <div className="mt-1 flex flex-wrap gap-2">
        {WEEKDAYS.map((w, i) => {
          const on = p.study_days.includes(i)
          return (
            <button
              key={w}
              className="option w-14 px-0 py-2 text-center text-sm"
              data-state={on ? 'selected' : undefined}
              onClick={() => onSave({ study_days: on ? p.study_days.filter((x) => x !== i) : [...p.study_days, i].sort() })}
            >
              {w}
            </button>
          )
        })}
      </div>

      <label className="mt-5 flex items-center justify-between gap-4 font-bold">
        <span>
          Efeitos sonoros
          <span className="block text-sm font-semibold text-muted">Sons curtos ao acertar e errar.</span>
        </span>
        <input
          type="checkbox"
          className="h-6 w-6 accent-[var(--brand)]"
          checked={sound}
          onChange={(e) => {
            setSound(e.target.checked)
            setSoundEnabled(e.target.checked)
          }}
        />
      </label>

      <label className="mt-4 flex items-center justify-between gap-4 font-bold">
        <span>
          Modo livre
          <span className="block text-sm font-semibold text-muted">Desbloqueia todas as etapas (recomendado só para revisar).</span>
        </span>
        <input type="checkbox" className="h-6 w-6 accent-[var(--brand)]" checked={p.free_mode} onChange={(e) => onSave({ free_mode: e.target.checked })} />
      </label>
    </section>
  )
}

function DemoRoleSwitch({ role, onChange }: { role: Role; onChange: () => Promise<void> }) {
  const { user } = useData()
  return (
    <button
      className="btn btn-ghost w-full"
      onClick={async () => {
        // só no modo demonstração: no Supabase o papel é definido via SQL
        await store.updateProfile(user.id, { role: role === 'mentor' ? 'student' : 'mentor' } as ProfilePatch)
        await onChange()
      }}
    >
      {role === 'mentor' ? 'Demo: voltar a ser aluna(o)' : 'Demo: ver como mentor(a)'}
    </button>
  )
}
