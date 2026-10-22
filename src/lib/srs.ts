// Repetição espaçada — variação do algoritmo SM-2 (SuperMemo / Anki)
import { addDays, today } from './dates'
import type { SrsCard } from './types'

export type Grade = 'again' | 'hard' | 'good' | 'easy'

const QUALITY: Record<Grade, number> = { again: 1, hard: 3, good: 4, easy: 5 }

export function newCard(cardId: string, firstDue = addDays(today(), 1)): SrsCard {
  return {
    card_id: cardId,
    ease: 2.5,
    interval_days: 0,
    repetitions: 0,
    lapses: 0,
    due_date: firstDue,
    last_reviewed_at: null,
  }
}

export function review(card: SrsCard, grade: Grade): SrsCard {
  const q = QUALITY[grade]
  let { ease, interval_days, repetitions, lapses } = card

  if (q < 3) {
    repetitions = 0
    interval_days = 1
    lapses += 1
  } else {
    repetitions += 1
    if (repetitions === 1) interval_days = grade === 'easy' ? 3 : 1
    else if (repetitions === 2) interval_days = grade === 'hard' ? 3 : 6
    else interval_days = Math.round(interval_days * ease * (grade === 'hard' ? 0.8 : grade === 'easy' ? 1.3 : 1))
  }
  ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

  return {
    ...card,
    ease: Math.round(ease * 100) / 100,
    interval_days,
    repetitions,
    lapses,
    due_date: addDays(today(), interval_days),
    last_reviewed_at: new Date().toISOString(),
  }
}

/** Texto curto do próximo intervalo, para mostrar nos botões */
export function previewInterval(card: SrsCard, grade: Grade): string {
  const d = review(card, grade).interval_days
  if (d <= 1) return grade === 'again' ? 'amanhã' : '1 dia'
  if (d < 30) return `${d} dias`
  const months = Math.round(d / 30)
  return months === 1 ? '1 mês' : `${months} meses`
}
