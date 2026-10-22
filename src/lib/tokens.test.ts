// Garante que as cores do próprio app passam no WCAG 2.2 AA — num curso que ensina acessibilidade,
// a interface precisa dar o exemplo.
import { describe, expect, it } from 'vitest'
import { C } from '../components/diagrams/Figure'
import { course } from '../content'
import { contrastRatio, formatRatio } from './contrast'

type Pair = [fg: string, bg: string, min: number]

function check(t: Record<string, string>, pairs: Pair[]) {
  const fails: string[] = []
  for (const [fg, bg, min] of pairs) {
    const a = fg.startsWith('#') ? fg : t[fg]
    const b = bg.startsWith('#') ? bg : t[bg]
    if (!a || !b) {
      fails.push(`token ausente: ${fg} / ${bg}`)
      continue
    }
    const r = contrastRatio(a, b)
    if (r < min) fails.push(`${fg} sobre ${bg}: ${formatRatio(r)} (mínimo ${min}:1)`)
  }
  return fails
}

const TEXT = 4.5

describe('contraste dos tokens de cor', () => {
  it('cores dos módulos aceitam texto branco', () => {
    expect(check({}, course.modules.map((m) => ['#ffffff', m.color, TEXT] as Pair))).toEqual([])
  })
  it('paleta dos diagramas aceita texto branco', () => {
    expect(check({}, Object.values(C).map((c) => ['#ffffff', c, TEXT] as Pair))).toEqual([])
  })
})
