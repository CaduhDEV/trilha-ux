import { addDays, today } from './dates'
import type { XpEvent } from './types'

// ---------------------------------------------------------------------
// XP por dia, sequência (streak) e nível
// ---------------------------------------------------------------------

export function xpByDay(events: XpEvent[]): Map<string, number> {
  const map = new Map<string, number>()
  for (const e of events) map.set(e.local_date, (map.get(e.local_date) ?? 0) + e.xp)
  return map
}

/** Dias seguidos com estudo. Se hoje ainda não teve estudo, a sequência de ontem continua valendo. */
export function computeStreak(byDay: Map<string, number>, ref = today()): { streak: number; doneToday: boolean } {
  const doneToday = (byDay.get(ref) ?? 0) > 0
  let day = doneToday ? ref : addDays(ref, -1)
  let streak = 0
  while ((byDay.get(day) ?? 0) > 0) {
    streak++
    day = addDays(day, -1)
  }
  return { streak, doneToday }
}

export function longestStreak(byDay: Map<string, number>): number {
  const days = [...byDay.entries()].filter(([, xp]) => xp > 0).map(([d]) => d).sort()
  let best = 0
  let run = 0
  let prev: string | null = null
  for (const d of days) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1
    best = Math.max(best, run)
    prev = d
  }
  return best
}

/** Nível n exige 100 · n·(n−1)/2 XP: 0, 100, 300, 600, 1000… */
export function levelFromXp(xp: number) {
  let level = 1
  while (100 * ((level * (level + 1)) / 2) <= xp) level++
  const floor = 100 * (((level - 1) * level) / 2)
  const ceil = 100 * ((level * (level + 1)) / 2)
  return { level, floor, ceil, progress: (xp - floor) / (ceil - floor) }
}

// ---------------------------------------------------------------------
// Conquistas
// ---------------------------------------------------------------------

export interface AchievementDef {
  id: string
  title: string
  description: string
  icon: string
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'primeiro-passo', title: 'Primeiro passo', description: 'Concluiu a primeira lição', icon: '🚀' },
  { id: 'sem-erros', title: 'Precisão cirúrgica', description: 'Terminou uma lição sem nenhum erro', icon: '🎯' },
  { id: 'mao-na-massa', title: 'Mão na massa', description: 'Enviou a primeira prática', icon: '✏️' },
  { id: 'fixou', title: 'Fixou!', description: 'Passou no primeiro checkpoint', icon: '📌' },
  { id: 'streak-3', title: 'Esquentando', description: '3 dias seguidos de estudo', icon: '🔥' },
  { id: 'streak-7', title: 'Semana completa', description: '7 dias seguidos de estudo', icon: '📅' },
  { id: 'streak-30', title: 'Hábito formado', description: '30 dias seguidos de estudo', icon: '💪' },
  { id: 'streak-100', title: 'Imparável', description: '100 dias seguidos de estudo', icon: '⚡' },
  { id: 'meta-7', title: 'Meta batida', description: 'Bateu a meta diária em 7 dias', icon: '🏁' },
  { id: 'meta-60', title: 'Disciplina de ouro', description: 'Bateu a meta diária em 60 dias', icon: '🥇' },
  { id: 'xp-500', title: 'Meio milhar', description: 'Juntou 500 XP', icon: '⭐' },
  { id: 'xp-2000', title: 'Dedicação total', description: 'Juntou 2.000 XP', icon: '🌟' },
  { id: 'xp-5000', title: 'Lenda da trilha', description: 'Juntou 5.000 XP', icon: '💎' },
  { id: 'cards-50', title: 'Memória afiada', description: 'Fez 50 revisões de cartões', icon: '🧠' },
  { id: 'cards-500', title: 'Biblioteca ambulante', description: 'Fez 500 revisões de cartões', icon: '📚' },
  { id: 'gabaritou', title: 'Gabaritou', description: 'Tirou 100% em uma prova de módulo', icon: '🏆' },
  { id: 'modulo-1', title: 'Fundamentos', description: 'Concluiu o módulo 1', icon: '🧭' },
  { id: 'modulo-2', title: 'Pesquisa', description: 'Concluiu o módulo 2', icon: '🔎' },
  { id: 'modulo-3', title: 'Estrutura', description: 'Concluiu o módulo 3', icon: '🗺️' },
  { id: 'modulo-4', title: 'Interface', description: 'Concluiu o módulo 4', icon: '🎨' },
  { id: 'modulo-5', title: 'Validação', description: 'Concluiu o módulo 5', icon: '🧪' },
  { id: 'modulo-6', title: 'UX Designer', description: 'Concluiu o curso inteiro!', icon: '🎓' },
]

export const achievementById = new Map(ACHIEVEMENTS.map((a) => [a.id, a]))

export interface AchievementFacts {
  lessonsDone: number
  perfectLesson: boolean
  practicesSent: number
  checkpointsPassed: number
  streak: number
  goalDays: number
  totalXp: number
  cardReviews: number
  perfectExam: boolean
  modulesDone: number[]
}

export function earnedAchievements(f: AchievementFacts): string[] {
  const out: string[] = []
  if (f.lessonsDone >= 1) out.push('primeiro-passo')
  if (f.perfectLesson) out.push('sem-erros')
  if (f.practicesSent >= 1) out.push('mao-na-massa')
  if (f.checkpointsPassed >= 1) out.push('fixou')
  for (const n of [3, 7, 30, 100]) if (f.streak >= n) out.push(`streak-${n}`)
  if (f.goalDays >= 7) out.push('meta-7')
  if (f.goalDays >= 60) out.push('meta-60')
  for (const n of [500, 2000, 5000]) if (f.totalXp >= n) out.push(`xp-${n}`)
  if (f.cardReviews >= 50) out.push('cards-50')
  if (f.cardReviews >= 500) out.push('cards-500')
  if (f.perfectExam) out.push('gabaritou')
  for (const m of f.modulesDone) out.push(`modulo-${m}`)
  return out
}

export const DAILY_GOALS = [
  { xp: 20, label: 'Leve', minutes: '15 min/dia', hint: 'Para semanas corridas' },
  { xp: 30, label: 'Regular', minutes: '30 min/dia', hint: 'Ritmo mínimo para 6 meses' },
  { xp: 50, label: 'Séria', minutes: '1 h/dia', hint: 'Recomendado para o curso' },
  { xp: 80, label: 'Intensa', minutes: '1h30+/dia', hint: 'Para acelerar' },
]
