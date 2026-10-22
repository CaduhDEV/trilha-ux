import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { course } from '../content'
import { useData } from '../context/AppContext'

const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

export default function Glossary() {
  const { d } = useData()
  const [q, setQ] = useState('')
  const [onlyMine, setOnlyMine] = useState(false)

  const entries = useMemo(() => {
    const seen = new Set<string>()
    return course.flashcards
      .filter((f) => (seen.has(norm(f.front)) ? false : (seen.add(norm(f.front)), true)))
      .sort((a, b) => norm(a.front).localeCompare(norm(b.front)))
  }, [])

  const filtered = entries.filter((f) => {
    if (onlyMine && !d.cards.has(f.id)) return false
    if (!q.trim()) return true
    const n = norm(q.trim())
    return norm(f.front).includes(n) || norm(f.back).includes(n)
  })

  const groups = new Map<string, typeof filtered>()
  for (const f of filtered) {
    const letter = norm(f.front)[0]?.toUpperCase() ?? '#'
    const key = /[A-Z]/.test(letter) ? letter : '#'
    groups.set(key, [...(groups.get(key) ?? []), f])
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-black">Glossário de UX</h1>
      <p className="mt-1 font-semibold text-muted">{entries.length} termos que você vai dominar ao longo da trilha.</p>

      <div className="sticky top-16 z-10 -mx-4 mt-6 bg-bg px-4 py-2 lg:top-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
          <input className="field pl-12" placeholder="Buscar termo…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar termo" />
        </div>
        <label className="mt-2 flex items-center gap-2 text-sm font-bold text-muted">
          <input type="checkbox" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)} className="h-4 w-4 accent-[var(--brand)]" />
          Só os que eu já estudei
        </label>
      </div>

      {filtered.length === 0 && <p className="mt-10 text-center font-bold text-muted">Nenhum termo encontrado.</p>}

      {[...groups.entries()].map(([letter, list]) => (
        <section key={letter} className="mt-6">
          <h2 className="mb-2 text-sm font-black text-brand-ink">{letter}</h2>
          <dl className="card divide-y-2 divide-line">
            {list.map((f) => {
              const lesson = course.byId.get(f.lessonId)
              return (
                <div key={f.id} className="p-4">
                  <dt className="flex items-baseline justify-between gap-3">
                    <span className="font-black">{f.front}</span>
                    {d.cards.has(f.id) && <span className="chip shrink-0 bg-ok-soft text-ok-ink">estudado</span>}
                  </dt>
                  <dd className="mt-1 font-semibold">{f.back}</dd>
                  {lesson && <dd className="mt-1 text-xs font-bold text-muted">Lição: {lesson.title}</dd>}
                </div>
              )
            })}
          </dl>
        </section>
      ))}
    </div>
  )
}
