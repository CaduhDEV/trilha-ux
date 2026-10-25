import { Brain, Dumbbell, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { MascotSays } from '../components/Mascot'
import { ProgressBar, SectionTitle } from '../components/ui'
import { course } from '../content'
import { useData } from '../context/AppContext'
import { addDays, today } from '../lib/dates'

export default function Review() {
  const { d } = useData()
  const t = today()
  const cards = [...d.cards.values()].filter((c) => course.flashcardById.has(c.card_id))
  const mastered = cards.filter((c) => c.interval_days >= 21).length
  const week = cards.filter((c) => c.due_date > t && c.due_date <= addDays(t, 7)).length
  const lessonsDone = course.items.filter((i) => i.kind === 'lesson' && d.completed.has(i.id)).length

  // Lições com mais erros recentes
  const weak = new Map<string, number>()
  for (const [exId, n] of d.misses) {
    const owner = course.exerciseById.get(exId)
    if (owner) weak.set(owner.itemId, (weak.get(owner.itemId) ?? 0) + n)
  }
  const weakest = [...weak.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, n]) => ({ item: course.byId.get(id)!, n }))
    .filter((x) => x.item)

  return (
    <div className="mx-auto max-w-2xl">
      <MascotSays mood="think" className="mb-8">
        Revisar no tempo certo é o segredo para não esquecer. Poucos minutos por dia já fazem diferença!
      </MascotSays>

      <section className="card p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white">
            <Brain size={30} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black">Cartões de revisão espaçada</h2>
            <p className="mt-1 font-semibold text-muted">
              Cada lição adiciona conceitos-chave. O app calcula o melhor dia para você rever cada um (algoritmo SM-2, o mesmo princípio do Anki).
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-surface-2 p-3">
            <div className="text-2xl font-black text-bad-ink">{d.dueCards.length}</div>
            <div className="text-xs font-extrabold uppercase text-muted">para hoje</div>
          </div>
          <div className="rounded-2xl bg-surface-2 p-3">
            <div className="text-2xl font-black text-sky">{week}</div>
            <div className="text-xs font-extrabold uppercase text-muted">próx. 7 dias</div>
          </div>
          <div className="rounded-2xl bg-surface-2 p-3">
            <div className="text-2xl font-black text-ok-ink">{mastered}</div>
            <div className="text-xs font-extrabold uppercase text-muted">dominados</div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/revisar/cartoes"
            className={`btn flex-1 ${d.dueCards.length ? 'btn-primary' : 'btn-ghost pointer-events-none opacity-60'}`}
            aria-disabled={!d.dueCards.length}
            tabIndex={d.dueCards.length ? undefined : -1}
          >
            {d.dueCards.length
              ? `Revisar ${d.dueCards.length} ${d.dueCards.length === 1 ? 'cartão' : 'cartões'}`
              : 'Nada para hoje 🎉'}
          </Link>
          {cards.length > 0 && (
            <Link to="/revisar/cartoes?adiantar=1" className="btn btn-ghost flex-1">
              <Sparkles size={18} /> Adiantar revisão
            </Link>
          )}
        </div>
      </section>

      <section className="card mt-6 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ok text-white">
            <Dumbbell size={30} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black">Treino de fixação</h2>
            <p className="mt-1 font-semibold text-muted">
              10 questões sorteadas de tudo o que você já estudou, com prioridade para o que você errou. Ótimo teste de absorção!
            </p>
          </div>
        </div>
        {weakest.length > 0 && (
          <div className="mt-5">
            <div className="mb-2 text-sm font-extrabold uppercase tracking-wide text-muted">Seus pontos de atenção</div>
            <ul className="flex flex-col gap-2">
              {weakest.map(({ item, n }) => (
                <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-surface-2 px-3 py-2 font-bold">
                  <span className="truncate">{item.title}</span>
                  <span className="chip shrink-0 bg-bad-soft text-bad-ink">{n} erro{n > 1 ? 's' : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link
          to="/revisar/treino"
          className={`btn mt-5 w-full ${lessonsDone ? 'btn-ok' : 'btn-ghost pointer-events-none opacity-60'}`}
          aria-disabled={!lessonsDone}
          tabIndex={lessonsDone ? undefined : -1}
        >
          {lessonsDone ? 'Começar treino (+10 XP)' : 'Conclua uma lição primeiro'}
        </Link>
      </section>

      <section className="mt-8">
        <SectionTitle>Força da memória por módulo</SectionTitle>
        <div className="card divide-y-2 divide-line">
          {course.modules.map((m) => {
            const ids = new Set(course.flashcards.filter((f) => f.id.startsWith(`${m.id}-`)).map((f) => f.id))
            const mine = cards.filter((c) => ids.has(c.card_id))
            const strong = mine.filter((c) => c.interval_days >= 7).length
            return (
              <div key={m.id} className="flex items-center gap-3 p-4 sm:gap-4">
                <div className="w-28 shrink-0 text-sm font-black leading-tight sm:w-44">
                  <span style={{ color: m.color }}>M{m.number}</span> {m.title}
                </div>
                <ProgressBar value={mine.length ? strong / mine.length : 0} color={m.color} height={12} />
                <span className="w-12 shrink-0 text-right text-sm font-bold text-muted sm:w-16">
                  {mine.length ? `${strong}/${mine.length}` : '—'}
                </span>
              </div>
            )
          })}
        </div>
        <p className="mt-2 text-xs font-semibold text-muted">“Forte” = cartão que você lembra bem há pelo menos 7 dias.</p>
      </section>
    </div>
  )
}
