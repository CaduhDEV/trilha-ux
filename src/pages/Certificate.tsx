import { ArrowLeft, Printer } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'
import { Mascot } from '../components/Mascot'
import { course } from '../content'
import { useData } from '../context/AppContext'
import { formatLong, toLocalDate } from '../lib/dates'

export default function Certificate() {
  const { moduleId = '' } = useParams()
  const { data, d } = useData()
  const final = moduleId === 'final'
  const mod = course.moduleById.get(moduleId)

  if (final ? d.modulesDone.length < course.modules.length : !mod || !d.modulesDone.includes(mod.number)) {
    return <Navigate to="/" replace />
  }

  const doneAt = (id: string) => d.progress.get(id)?.completed_at
  const date = final ? doneAt(course.modules.at(-1)!.project.id) : doneAt(mod!.project.id)
  const color = final ? 'var(--brand)' : mod!.color
  const hours = Math.round(
    (final ? course.items : mod!.items).reduce((s, i) => s + i.minutes, 0) / 60,
  )
  const exams = (final ? course.modules : [mod!]).map((m) => d.progress.get(m.exam.id)?.best_score ?? 0)
  const avg = Math.round(exams.reduce((a, b) => a + b, 0) / exams.length)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link to="/perfil" className="inline-flex items-center gap-1 text-sm font-extrabold uppercase text-muted hover:text-ink">
          <ArrowLeft size={18} /> Voltar
        </Link>
        <button className="btn btn-ghost" onClick={() => window.print()}>
          <Printer size={18} /> Imprimir / salvar PDF
        </button>
      </div>
      <div className="relative overflow-hidden rounded-3xl border-[6px] bg-white p-8 text-center text-[#1f1b2e] sm:p-14" style={{ borderColor: color }}>
        <Mascot mood="party" size={90} className="mx-auto" />
        <div className="mt-4 text-sm font-black uppercase tracking-[0.3em]" style={{ color }}>
          Certificado de conclusão
        </div>
        <p className="mt-8 font-semibold text-[#6b6880]">Certificamos que</p>
        <h1 className="mt-2 text-4xl font-black sm:text-5xl">{data.profile.display_name}</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg font-semibold leading-relaxed">
          {final ? (
            <>
              concluiu a <b>Trilha UX completa</b> — do zero a UX designer — com {course.units.length} semanas de teoria, práticas no Figma, 6
              provas e 6 projetos de portfólio.
            </>
          ) : (
            <>
              concluiu o <b>Módulo {mod!.number}: {mod!.title}</b> da Trilha UX, conquistando o título de <b>{mod!.badge}</b>.
            </>
          )}
        </p>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4 text-sm font-bold text-[#6b6880]">
          <div>
            <div className="text-2xl font-black text-[#1f1b2e]">~{hours} h</div>
            carga estimada
          </div>
          <div>
            <div className="text-2xl font-black text-[#1f1b2e]">{avg}%</div>
            {final ? 'média nas provas' : 'nota na prova'}
          </div>
          <div>
            <div className="text-2xl font-black text-[#1f1b2e]">{formatLong(date ? toLocalDate(new Date(date)) : toLocalDate())}</div>
            data
          </div>
        </div>
        {!final && (
          <ul className="mx-auto mt-8 max-w-md text-left text-sm font-semibold text-[#3d3a4f]">
            {mod!.outcomes.map((o) => (
              <li key={o}>✓ {o}</li>
            ))}
          </ul>
        )}
        <div className="mt-10 text-2xl font-black tracking-tight" style={{ color }}>
          trilha ux
        </div>
      </div>
    </div>
  )
}
