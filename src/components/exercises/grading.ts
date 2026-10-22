import type { Exercise } from '../../content/types'
import { contrastRatio, formatRatio, passesAA } from '../../lib/contrast'

export type Answer =
  | { type: 'mc'; choice: string }
  | { type: 'multi'; choices: string[] }
  | { type: 'tf'; value: boolean }
  | { type: 'fill'; choice: string }
  | { type: 'match'; mistakes: number }
  | { type: 'order'; sequence: string[] }
  | { type: 'contrast'; passes: boolean }
  | { type: 'ab'; choice: 'a' | 'b' }
  | { type: 'open'; text: string }

export function grade(ex: Exercise, a: Answer): boolean {
  switch (ex.type) {
    case 'mc':
      return a.type === 'mc' && a.choice === ex.correct
    case 'fill':
      return a.type === 'fill' && a.choice === ex.correct
    case 'multi':
      return (
        a.type === 'multi' &&
        a.choices.length === ex.correct.length &&
        ex.correct.every((c) => a.choices.includes(c))
      )
    case 'tf':
      return a.type === 'tf' && a.value === ex.answer
    case 'match':
      return a.type === 'match' && a.mistakes <= 1
    case 'order':
      return a.type === 'order' && a.sequence.join('\u0000') === ex.items.join('\u0000')
    case 'contrast':
      return a.type === 'contrast' && a.passes === passesAA(contrastRatio(ex.fg, ex.bg), ex.large)
    case 'ab':
      return a.type === 'ab' && a.choice === ex.correct
    case 'open':
      return true
  }
}

export function correctAnswerText(ex: Exercise): string | null {
  switch (ex.type) {
    case 'mc':
    case 'fill':
      return ex.correct
    case 'multi':
      return ex.correct.join(' · ')
    case 'tf':
      return ex.answer ? 'Verdadeiro' : 'Falso'
    case 'order':
      return ex.items.map((t, i) => `${i + 1}. ${t}`).join('  ')
    case 'contrast': {
      const r = contrastRatio(ex.fg, ex.bg)
      return `${passesAA(r, ex.large) ? 'Passa' : 'Não passa'} no AA (contraste ${formatRatio(r)})`
    }
    case 'ab':
      return `Opção ${ex.correct.toUpperCase()}`
    case 'match':
    case 'open':
      return null
  }
}

export function explanationOf(ex: Exercise): string | null {
  if (ex.type === 'contrast') {
    const r = contrastRatio(ex.fg, ex.bg)
    const need = ex.large ? '3:1 (texto grande)' : '4,5:1 (texto normal)'
    return `O contraste entre ${ex.fg} e ${ex.bg} é ${formatRatio(r)}. O mínimo do WCAG AA é ${need}.`
  }
  if (ex.type === 'open') return ex.guidance
  return ex.explanation ?? null
}

/** Texto curto do enunciado (usado em listas de revisão de prova) */
export function promptOf(ex: Exercise): string {
  switch (ex.type) {
    case 'tf':
      return ex.statement
    case 'fill':
      return ex.sentence
    case 'contrast':
      return `Contraste ${ex.fg} sobre ${ex.bg}${ex.large ? ' (texto grande)' : ''} passa no AA?`
    default:
      return ex.prompt
  }
}

const PRAISE = ['Muito bem!', 'Mandou bem!', 'Isso aí!', 'Perfeito!', 'Arrasou!', 'Exato!', 'Certíssimo!']
export const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)]
