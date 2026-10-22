import type { ReactNode } from 'react'

export function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="not-prose rounded-2xl border-2 border-line bg-surface-2 p-4">
      <div className="overflow-x-auto">{children}</div>
      {caption && <figcaption className="mt-3 text-center text-sm font-bold text-muted">{caption}</figcaption>}
    </figure>
  )
}

/** Cores de preenchimento para diagramas com texto branco por cima (todas ≥ 4,5:1 com branco) */
export const C = {
  violet: '#7C4DFF',
  blue: '#1A6FD1',
  amber: '#B45309',
  pink: '#D1306F',
  green: '#15803D',
  red: '#DC2626',
}

/** Propriedades comuns de texto em SVG */
export const T = {
  fill: 'var(--ink)',
  fontFamily: 'inherit',
  fontWeight: 800,
  textAnchor: 'middle' as const,
  dominantBaseline: 'middle' as const,
}

export const Muted = { ...T, fill: 'var(--muted)', fontWeight: 700 }

export function Arrow({ id = 'arrow', color = 'var(--muted)' }: { id?: string; color?: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={color} />
      </marker>
    </defs>
  )
}
