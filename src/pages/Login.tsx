import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router'
import { Mascot, MascotSays } from '../components/Mascot'
import { course } from '../content'
import { useApp } from '../context/AppContext'
import { store } from '../lib/store'

type Mode = 'entrar' | 'criar' | 'esqueci'

const stats = {
  lessons: course.items.filter((i) => i.kind === 'lesson').length,
  practices: course.items.filter((i) => i.kind === 'practice' || i.kind === 'project').length,
  exercises: course.exerciseById.size,
}

export default function Login() {
  const { user, authReady } = useApp()
  const [mode, setMode] = useState<Mode>('criar')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  if (authReady && user) return <Navigate to="/" replace />

  const demo = store.mode === 'demo'

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setBusy(true)
    try {
      if (mode === 'entrar') await store.signIn(email.trim(), password)
      else if (mode === 'criar') {
        const { needsConfirmation } = await store.signUp(email.trim(), password, name.trim())
        if (needsConfirmation) {
          setInfo('Conta criada! Enviamos um link de confirmação para o seu e-mail. Confirme e depois entre aqui.')
          setMode('entrar')
        }
      } else {
        await store.resetPassword(email.trim())
        setInfo('Se esse e-mail tiver conta, você vai receber um link para criar uma nova senha.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo deu errado. Tente de novo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-brand p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <Mascot size={52} />
          <span className="text-3xl font-black tracking-tight">trilha ux</span>
        </div>
        <div>
          <h1 className="max-w-md text-5xl font-black leading-[1.05]">Do zero a UX designer profissional em 6 meses.</h1>
          <ul className="mt-8 space-y-3 text-lg font-bold text-white/90">
            <li>📚 {stats.lessons} lições curtas com teoria e {stats.exercises} exercícios</li>
            <li>✏️ {stats.practices} práticas e projetos no Figma para o portfólio</li>
            <li>🧠 Repetição espaçada para não esquecer</li>
            <li>🏆 Checkpoints semanais e provas por módulo</li>
          </ul>
        </div>
        <p className="text-sm font-bold text-white/70">Feito com carinho para quem está começando do absoluto zero.</p>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10" />
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <MascotSays mood="happy" size={72}>
              Oi! Bora virar UX designer? 💜
            </MascotSays>
          </div>

          <h2 className="mb-6 text-center text-2xl font-black">
            {mode === 'entrar' ? 'Entrar' : mode === 'criar' ? 'Criar sua conta' : 'Recuperar senha'}
          </h2>

          {demo && (
            <div className="mb-5 rounded-2xl bg-gold-soft p-3 text-sm font-bold text-gold-ink">
              Modo demonstração: sem Supabase configurado, qualquer e-mail e senha funcionam e o progresso fica salvo neste navegador.
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === 'criar' && (
              <input
                className="field"
                placeholder="Como quer ser chamada(o)?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                required
              />
            )}
            <input
              className="field"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            {mode !== 'esqueci' && (
              <input
                className="field"
                type="password"
                placeholder="Senha (mín. 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'criar' ? 'new-password' : 'current-password'}
                minLength={6}
                required
              />
            )}
            {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm font-bold text-bad-ink">{error}</p>}
            {info && <p className="rounded-xl bg-ok-soft px-3 py-2 text-sm font-bold text-ok-ink">{info}</p>}
            <button className="btn btn-primary mt-2" disabled={busy}>
              {busy ? 'Aguarde…' : mode === 'entrar' ? 'Entrar' : mode === 'criar' ? 'Criar conta' : 'Enviar link'}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2 text-sm font-extrabold uppercase tracking-wide">
            {mode !== 'entrar' && (
              <button className="text-sky" onClick={() => setMode('entrar')}>
                Já tenho conta
              </button>
            )}
            {mode !== 'criar' && (
              <button className="text-sky" onClick={() => setMode('criar')}>
                Criar conta nova
              </button>
            )}
            {mode === 'entrar' && !demo && (
              <button className="text-muted" onClick={() => setMode('esqueci')}>
                Esqueci minha senha
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
