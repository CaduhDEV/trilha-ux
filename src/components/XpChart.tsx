import { useState } from 'react'
import { addDays, formatShort, today, weekdayShort } from '../lib/dates'

/** XP por dia nos últimos N dias, com a linha da meta diária. */
export function XpChart({ byDay, goal, days = 14 }: { byDay: Map<string, number>; goal: number; days?: number }) {
  const t = today()
  const series = Array.from({ length: days }, (_, i) => {
    const date = addDays(t, i - days + 1)
    return { date, xp: byDay.get(date) ?? 0 }
  })
  const max = Math.max(goal * 1.25, ...series.map((s) => s.xp), 10)
  const H = 140
  const [hover, setHover] = useState<number | null>(null)

  return (
    <figure>
      <div className="relative" style={{ height: H + 26 }}>
        {/* linha da meta */}
        <div className="absolute inset-x-0 border-t-2 border-dashed border-line-strong" style={{ bottom: 26 + (goal / max) * H }}>
          <span className="absolute -top-5 right-0 bg-surface pl-1 text-[11px] font-extrabold uppercase text-muted">meta {goal} XP</span>
        </div>
        <div className="absolute inset-x-0 bottom-[26px] border-t-2 border-line" />
        <div className="absolute inset-0 flex items-end gap-[2px]">
          {series.map((s, i) => {
            const isToday = s.date === t
            const hit = s.xp >= goal
            return (
              <div
                key={s.date}
                className="relative flex h-full flex-1 flex-col items-center justify-end"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                aria-label={`${formatShort(s.date)}: ${s.xp} XP`}
              >
                {hover === i && (
                  <div className="pointer-events-none absolute z-10 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-xs font-bold text-surface" style={{ bottom: 32 + (s.xp / max) * H }}>
                    {weekdayShort(s.date)}, {formatShort(s.date)} · {s.xp} XP
                  </div>
                )}
                {isToday && s.xp > 0 && hover !== i && (
                  <span className="mb-1 text-xs font-black text-ink">{s.xp}</span>
                )}
                <div
                  className="w-full max-w-7 rounded-t-[4px] transition-[height]"
                  style={{
                    height: Math.max(s.xp ? 4 : 0, (s.xp / max) * H),
                    background: hit ? 'var(--gold)' : 'var(--brand)',
                    opacity: hover === null || hover === i ? 1 : 0.55,
                  }}
                />
                <span className={`mt-1.5 h-[18px] text-[10px] font-extrabold uppercase ${isToday ? 'text-ink' : 'text-muted'}`}>
                  {weekdayShort(s.date).slice(0, 3)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <figcaption className="mt-2 flex gap-4 text-xs font-bold text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-gold" /> bateu a meta
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand" /> abaixo da meta
        </span>
      </figcaption>
      <table className="sr-only">
        <caption>XP por dia</caption>
        <tbody>
          {series.map((s) => (
            <tr key={s.date}>
              <th>{formatShort(s.date)}</th>
              <td>{s.xp} XP</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
