// Verificações de consistência do conteúdo do curso.
// Rode com: npm test
import { buildQuiz } from './quizVariants'
import { describe, expect, it } from 'vitest'
import { DIAGRAMS } from '../components/diagrams'
import { course } from '.'
import type { Exercise } from './types'

const lessons = course.items.filter((i) => i.kind === 'lesson')
const allExercises = [...course.exerciseById.values()].map((e) => e.exercise)
const norm = (s: string) => s.trim().toLowerCase()

function problemsOf(e: Exercise): string[] {
  const p: string[] = []
  const dup = (list: string[]) => new Set(list.map(norm)).size !== list.length
  switch (e.type) {
    case 'mc':
      if (e.wrong.length < 2) p.push('menos de 3 alternativas')
      if (dup([e.correct, ...e.wrong])) p.push('alternativas repetidas')
      if (!e.explanation) p.push('sem explicação')
      break
    case 'multi':
      if (!e.correct.length || !e.wrong.length) p.push('precisa de corretas e erradas')
      if (dup([...e.correct, ...e.wrong])) p.push('alternativas repetidas')
      break
    case 'fill':
      if (e.sentence.split('___').length !== 2) p.push('a frase precisa ter exatamente uma lacuna ___')
      if (dup([e.correct, ...e.wrong])) p.push('opções repetidas')
      break
    case 'match':
      if (e.pairs.length < 2) p.push('menos de 2 pares')
      // o lado direito pode repetir (exercícios de classificação), o esquerdo não
      if (dup(e.pairs.map(([l]) => l))) p.push('itens da esquerda repetidos')
      if (new Set(e.pairs.map(([, r]) => r)).size < 2) p.push('todas as respostas iguais')
      break
    case 'order':
      if (e.items.length < 3) p.push('menos de 3 itens')
      if (dup(e.items)) p.push('itens repetidos')
      break
    case 'contrast':
      if (!/^#[0-9a-f]{6}$/i.test(e.fg) || !/^#[0-9a-f]{6}$/i.test(e.bg)) p.push('cor inválida')
      break
    case 'ab':
      if (!e.a.trim() || !e.b.trim() || e.a === e.b) p.push('opções A/B inválidas')
      break
    case 'tf':
    case 'open':
      break
  }
  return p
}

describe('estrutura do curso', () => {
  it('tem 6 módulos e 24 semanas', () => {
    expect(course.modules).toHaveLength(6)
    expect(course.units).toHaveLength(24)
  })

  it('tem ids únicos', () => {
    expect(course.byId.size).toBe(course.items.length)
    expect(course.flashcardById.size).toBe(course.flashcards.length)
  })

  it('cada semana tem lições, prática e checkpoint', () => {
    for (const u of course.units) {
      expect(u.items.filter((i) => i.kind === 'lesson').length, u.id).toBeGreaterThanOrEqual(3)
      expect(u.items.some((i) => i.kind === 'practice'), u.id).toBe(true)
      expect(u.items.at(-1)?.kind, u.id).toBe('checkpoint')
    }
  })

  it('cada lição tem teoria, exercícios e cartões suficientes', () => {
    const weak: string[] = []
    for (const l of lessons) {
      const cards = l.steps.filter((s) => s.kind === 'card').length
      const exercises = l.steps.filter((s) => s.kind === 'exercise').length
      if (cards < 3 || exercises < 6 || l.flashcards.length < 3)
        weak.push(`${l.id}: ${cards} cartões de teoria, ${exercises} exercícios, ${l.flashcards.length} flashcards`)
    }
    expect(weak).toEqual([])
  })

  it('checkpoints e provas têm questões suficientes', () => {
    for (const item of course.items) {
      if (item.kind === 'checkpoint') expect(item.pool.length, item.id).toBeGreaterThanOrEqual(15)
      if (item.kind === 'exam') expect(item.pool.length, item.id).toBeGreaterThanOrEqual(60)
    }
  })

  it('práticas e projetos têm passos e rubrica', () => {
    for (const item of course.items) {
      if (item.kind !== 'practice' && item.kind !== 'project') continue
      expect(item.def.steps.length, item.id).toBeGreaterThanOrEqual(3)
      expect(item.def.rubric.length, item.id).toBeGreaterThanOrEqual(4)
    }
  })
})

describe('qualidade dos exercícios', () => {
  it('nenhum exercício malformado', () => {
    const bad = allExercises.map((e) => ({ id: e.id, problems: problemsOf(e) })).filter((x) => x.problems.length)
    expect(bad).toEqual([])
  })
})

describe('markdown', () => {
  it('todos os diagramas citados existem', () => {
    const missing: string[] = []
    for (const l of lessons)
      for (const s of l.steps)
        if (s.kind === 'card')
          for (const line of s.md.split('\n')) {
            const m = line.trim().match(/^::([a-z0-9-]+)\s*$/)
            if (m && !DIAGRAMS[m[1]]) missing.push(`${l.id}: ${m[1]}`)
          }
    expect(missing).toEqual([])
  })

  it('links de recursos usam https', () => {
    const urls = [
      ...lessons.flatMap((l) => l.resources),
      ...course.items.flatMap((i) => (i.kind === 'practice' || i.kind === 'project' ? (i.def.resources ?? []) : [])),
    ]
      .map((r) => r.url)
      .filter(Boolean)
    for (const u of urls) expect(u, u).toMatch(/^https:\/\//)
  })
})

describe('glossário', () => {
  it('não tem termos duplicados', () => {
    const seen = new Map<string, string>()
    const dups: string[] = []
    for (const f of course.flashcards) {
      const k = norm(f.front)
      if (seen.has(k)) dups.push(`${f.front} (${seen.get(k)} e ${f.lessonId})`)
      else seen.set(k, f.lessonId)
    }
    expect(dups).toEqual([])
  })
})

describe('buildQuiz', () => {
  it('gera o número pedido de questões, com "julgue" sempre tendo ao menos uma correta', () => {
    for (const item of course.items) {
      if (item.kind !== 'checkpoint' && item.kind !== 'exam') continue
      for (let round = 0; round < 5; round++) {
        const qs = buildQuiz(item.pool, item.questionCount, () => 1)
        expect(qs.length).toBeLessThanOrEqual(item.questionCount)
        expect(qs.length).toBeGreaterThanOrEqual(Math.min(item.questionCount, 5))
        expect(new Set(qs.map((q) => q.id)).size).toBe(qs.length)
        for (const q of qs) if (q.type === 'multi') expect(q.correct.length).toBeGreaterThan(0)
      }
    }
  })
})
