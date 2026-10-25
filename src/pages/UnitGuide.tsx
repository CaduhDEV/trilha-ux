import { ArrowLeft, ChevronDown, Lock } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { Markdown } from '../components/Markdown'
import { KIND_LABEL, KindIcon } from '../components/ui'
import { course } from '../content'
import type { LessonItem } from '../content/types'
import { useData } from '../context/AppContext'
import { itemHref } from '../lib/routes'
import { ResourceList } from './LessonPage'

export default function UnitGuide() {
  const { unitId = '' } = useParams()
  const unit = course.unitById.get(unitId)
  const { d } = useData()
  const [open, setOpen] = useState<string | null>(null)
  if (!unit) return <Navigate to="/" replace />
  const mod = course.moduleById.get(unit.moduleId)!
  const lessons = unit.items.filter((i): i is LessonItem => i.kind === 'lesson')
  const cards = lessons.flatMap((l) => l.flashcards)
  const resources = [...unit.resources, ...lessons.flatMap((l) => l.resources)]
  const seen = new Set<string>()
  const uniqueResources = resources.filter((r) => (seen.has(r.title) ? false : (seen.add(r.title), true)))

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm font-extrabold uppercase text-muted hover:text-ink">
        <ArrowLeft size={18} /> Trilha
      </Link>
      <div className="rounded-3xl p-6 text-white" style={{ background: mod.color, boxShadow: `0 6px 0 ${mod.colorDark}` }}>
        <div className="text-sm font-extrabold uppercase tracking-wide text-white/80">
          Guia · Semana {unit.number} · Módulo {mod.number}
        </div>
        <h1 className="mt-1 text-2xl font-black">{unit.title}</h1>
        <p className="mt-1 font-semibold text-white/90">{unit.goal}</p>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-black">Etapas da semana</h2>
      <ul className="card divide-y-2 divide-line">
        {unit.items.map((item) => {
          const done = d.completed.has(item.id)
          const unlocked = d.isUnlocked(item.id)
          const inner = (
            <>
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                style={{
                  background: done ? 'var(--ok)' : unlocked ? mod.color : 'var(--locked)',
                  color: done || unlocked ? '#fff' : 'var(--locked-ink)',
                }}
              >
                {unlocked ? <KindIcon kind={item.kind} size={20} /> : <Lock size={18} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-black">{item.title}</span>
                <span className="block text-sm font-semibold text-muted">
                  {KIND_LABEL[item.kind]} · {item.summary}
                </span>
              </span>
              {done && <span className="chip shrink-0 bg-ok-soft text-ok-ink">feito</span>}
            </>
          )
          return (
            <li key={item.id}>
              {/* etapa bloqueada não é link: antes era um <a href="#"> que ainda recebia foco pelo teclado */}
              {unlocked ? (
                <Link to={itemHref(item)} className="flex items-center gap-3 p-4 hover:bg-surface-2">
                  {inner}
                </Link>
              ) : (
                <div className="flex items-center gap-3 p-4 opacity-60">
                  {inner}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {cards.length > 0 && (
        <>
          <h2 className="mb-3 mt-8 text-xl font-black">Conceitos-chave</h2>
          <dl className="card divide-y-2 divide-line">
            {cards.map((c) => (
              <div key={c.id} className="p-4">
                <dt className="font-black" style={{ color: mod.color }}>
                  {c.front}
                </dt>
                <dd className="mt-1 font-semibold">{c.back}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      <h2 className="mb-3 mt-8 text-xl font-black">Reler a teoria</h2>
      <div className="flex flex-col gap-3">
        {lessons.map((l) => {
          const isOpen = open === l.id
          return (
            <section key={l.id} className="card overflow-hidden">
              <button className="flex w-full items-center gap-3 p-4 text-left" onClick={() => setOpen(isOpen ? null : l.id)} aria-expanded={isOpen}>
                <span className="min-w-0 flex-1">
                  <span className="block font-black">{l.title}</span>
                  <span className="block text-sm font-semibold text-muted">{l.summary}</span>
                </span>
                <ChevronDown className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="flex flex-col gap-6 border-t-2 border-line p-5">
                  {l.steps
                    .filter((s) => s.kind === 'card')
                    .map((s, i) => (
                      <Markdown key={i}>{(s as { md: string }).md}</Markdown>
                    ))}
                </div>
              )}
            </section>
          )
        })}
      </div>

      {uniqueResources.length > 0 && <ResourceList resources={uniqueResources} title="Materiais recomendados" />}
    </div>
  )
}
