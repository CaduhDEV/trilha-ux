import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Mascot, MascotSays } from '../components/Mascot'
import { ProgressBar } from '../components/ui'
import { course } from '../content'
import { useData } from '../context/AppContext'
import { addDays, formatLong, today, WEEKDAYS } from '../lib/dates'
import { DAILY_GOALS } from '../lib/gamification'

const MOTIVATIONS = [
  { id: 'carreira', label: 'Mudar de carreira', icon: '💼' },
  { id: 'renda', label: 'Ter uma renda melhor', icon: '💰' },
  { id: 'remoto', label: 'Trabalhar de casa', icon: '🏡' },
  { id: 'criar', label: 'Criar coisas que ajudam pessoas', icon: '💡' },
  { id: 'curiosidade', label: 'Curiosidade', icon: '✨' },
]

export default function Onboarding() {
  const { data, updateProfile } = useData()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [name, setName] = useState(data.profile.display_name)
  const [motivation, setMotivation] = useState<string | null>(data.profile.motivation)
  const [goal, setGoal] = useState(50)
  const [start, setStart] = useState(today())
  const [days, setDays] = useState<number[]>(data.profile.study_days)

  if (data.profile.onboarded) return <Navigate to="/" replace />

  const totalWeeks = course.units.length
  const steps = [
    {
      say: 'Oi! Eu sou o Pixel e vou te acompanhar nessa trilha. Como posso te chamar?',
      valid: name.trim().length > 0,
      body: (
        <input
          className="field text-lg"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
        />
      ),
    },
    {
      say: `Prazer, ${name.split(' ')[0]}! O que te trouxe até aqui?`,
      valid: !!motivation,
      body: (
        <div className="grid gap-3">
          {MOTIVATIONS.map((m) => (
            <button
              key={m.id}
              className="option flex items-center gap-3"
              data-state={motivation === m.id ? 'selected' : undefined}
              onClick={() => setMotivation(m.id)}
            >
              <span className="text-2xl">{m.icon}</span> {m.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      say: 'Qual vai ser a sua meta diária? Dá pra mudar depois.',
      valid: true,
      body: (
        <div className="grid gap-3">
          {DAILY_GOALS.map((g) => (
            <button
              key={g.xp}
              className="option flex items-center justify-between"
              data-state={goal === g.xp ? 'selected' : undefined}
              onClick={() => setGoal(g.xp)}
            >
              <span>
                <span className="font-black">{g.label}</span>
                <span className="ml-2 text-sm font-semibold opacity-75">{g.hint}</span>
              </span>
              <span className="text-sm">{g.minutes}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      say: 'Quando você começa e em quais dias vai estudar?',
      valid: days.length > 0,
      body: (
        <div className="flex flex-col gap-5">
          <label className="font-bold">
            Data de início
            <input type="date" className="field mt-2" value={start} onChange={(e) => setStart(e.target.value || today())} />
          </label>
          <div>
            <div className="mb-2 font-bold">Dias de estudo</div>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((w, i) => (
                <button
                  key={w}
                  className="option w-14 px-0 text-center"
                  data-state={days.includes(i) ? 'selected' : undefined}
                  onClick={() => setDays(days.includes(i) ? days.filter((d) => d !== i) : [...days, i].sort())}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <p className="rounded-2xl bg-brand-soft p-4 font-semibold">
            São <b>{totalWeeks} semanas</b> de conteúdo + 2 de folga. Começando em {formatLong(start)}, a previsão de formatura é{' '}
            <b>{formatLong(addDays(start, (totalWeeks + 2) * 7))}</b>.
          </p>
        </div>
      ),
    },
    {
      say: 'Última coisa: como a trilha funciona 👇',
      valid: true,
      body: (
        <div className="grid gap-3 font-semibold">
          {[
            ['📖', 'Lições', 'Teoria em cartões curtos + exercícios. Errou? A questão volta no fim.'],
            ['✏️', 'Práticas', 'Mão na massa no Figma/FigJam. Você envia o link e se autoavalia.'],
            ['📌', 'Checkpoints', 'Toda semana termina com um teste rápido de absorção (80% para passar).'],
            ['👑', 'Provas e projetos', 'Cada mês fecha com uma prova (70%) e um projeto para o portfólio.'],
            ['🧠', 'Revisão espaçada', 'Os conceitos voltam em cartões no dia certo para não esquecer.'],
          ].map(([icon, t, d]) => (
            <div key={t} className="card flex gap-3 p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-black">{t}</div>
                <div className="text-sm text-muted">{d}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const s = steps[step]
  const last = step === steps.length - 1

  async function next() {
    if (!last) return setStep(step + 1)
    await updateProfile({
      display_name: name.trim(),
      motivation,
      daily_goal_xp: goal,
      start_date: start,
      study_days: days,
      onboarded: true,
    })
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-2xl items-center gap-4 px-4 pt-6">
        <Mascot size={36} />
        <ProgressBar value={(step + 1) / steps.length} />
      </header>
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8">
        <MascotSays mood={step === 0 ? 'wink' : 'happy'} className="mb-8">
          {s.say}
        </MascotSays>
        <div key={step} className="animate-pop">
          {s.body}
        </div>
      </main>
      <footer className="border-t-2 border-line">
        <div className="mx-auto flex max-w-2xl justify-between gap-3 px-4 py-5">
          <button className="btn btn-ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Voltar
          </button>
          <button className="btn btn-ok min-w-40" onClick={next} disabled={!s.valid}>
            {last ? 'Começar a trilha' : 'Continuar'}
          </button>
        </div>
      </footer>
    </div>
  )
}
