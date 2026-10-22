import { describe, expect, it } from 'vitest'
import { contrastRatio, passesAA } from './contrast'
import { addDays, daysBetween } from './dates'
import { computeStreak, earnedAchievements, levelFromXp, longestStreak } from './gamification'
import { newCard, review } from './srs'

describe('contraste WCAG', () => {
  it('preto no branco é 21:1', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1)
  })
  it('cinza #767676 no branco passa no AA (limite clássico)', () => {
    expect(passesAA(contrastRatio('#767676', '#FFFFFF'))).toBe(true)
    expect(passesAA(contrastRatio('#777777', '#FFFFFF'))).toBe(false)
  })
})

describe('datas', () => {
  it('soma dias atravessando meses', () => {
    expect(addDays('2026-10-30', 3)).toBe('2026-11-02')
    expect(daysBetween('2026-10-22', '2026-11-05')).toBe(14)
  })
})

describe('sequência (streak)', () => {
  const days = (list: string[]) => new Map(list.map((d) => [d, 10]))
  it('conta dias seguidos até hoje', () => {
    expect(computeStreak(days(['2026-10-20', '2026-10-21', '2026-10-22']), '2026-10-22')).toEqual({ streak: 3, doneToday: true })
  })
  it('mantém a sequência de ontem se hoje ainda não estudou', () => {
    expect(computeStreak(days(['2026-10-20', '2026-10-21']), '2026-10-22')).toEqual({ streak: 2, doneToday: false })
  })
  it('zera se pulou um dia', () => {
    expect(computeStreak(days(['2026-10-19', '2026-10-20']), '2026-10-22').streak).toBe(0)
  })
  it('calcula o recorde', () => {
    expect(longestStreak(days(['2026-10-01', '2026-10-02', '2026-10-05', '2026-10-06', '2026-10-07']))).toBe(3)
  })
})

describe('nível', () => {
  it('nível sobe em 100, 300, 600…', () => {
    expect(levelFromXp(0).level).toBe(1)
    expect(levelFromXp(99).level).toBe(1)
    expect(levelFromXp(100).level).toBe(2)
    expect(levelFromXp(300).level).toBe(3)
  })
})

describe('repetição espaçada (SM-2)', () => {
  it('aumenta o intervalo a cada acerto e reinicia no erro', () => {
    let c = newCard('x')
    c = review(c, 'good')
    expect(c.interval_days).toBe(1)
    c = review(c, 'good')
    expect(c.interval_days).toBe(6)
    c = review(c, 'good')
    expect(c.interval_days).toBeGreaterThan(6)
    c = review(c, 'again')
    expect(c.interval_days).toBe(1)
    expect(c.lapses).toBe(1)
    expect(c.ease).toBeGreaterThanOrEqual(1.3)
  })
})

describe('conquistas', () => {
  it('libera conquistas pelos fatos', () => {
    const got = earnedAchievements({
      lessonsDone: 1,
      perfectLesson: false,
      practicesSent: 0,
      checkpointsPassed: 0,
      streak: 7,
      goalDays: 0,
      totalXp: 600,
      cardReviews: 0,
      perfectExam: false,
      modulesDone: [1],
    })
    expect(got).toEqual(expect.arrayContaining(['primeiro-passo', 'streak-3', 'streak-7', 'xp-500', 'modulo-1']))
    expect(got).not.toContain('streak-30')
  })
})
