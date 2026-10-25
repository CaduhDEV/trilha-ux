import { describe, expect, it } from 'vitest'
import type { Exercise } from '../../content/types'
import { grade } from './grading'

describe('ligar pares', () => {
  const ex: Exercise = {
    type: 'match',
    id: 'x',
    prompt: 'Classifique',
    pairs: [
      ['Entrevista', 'Qualitativa'],
      ['Questionário', 'Quantitativa'],
      ['Teste de usabilidade', 'Qualitativa'],
    ],
  } as Exercise

  it('está certo quando todos os pares batem, mesmo com respostas repetidas à direita', () => {
    expect(
      grade(ex, {
        type: 'match',
        pairs: [
          ['Teste de usabilidade', 'Qualitativa'],
          ['Entrevista', 'Qualitativa'],
          ['Questionário', 'Quantitativa'],
        ],
      }),
    ).toBe(true)
  })

  it('está errado se um par estiver trocado', () => {
    expect(
      grade(ex, {
        type: 'match',
        pairs: [
          ['Entrevista', 'Quantitativa'],
          ['Questionário', 'Qualitativa'],
          ['Teste de usabilidade', 'Qualitativa'],
        ],
      }),
    ).toBe(false)
  })

  it('está errado se faltar par', () => {
    expect(grade(ex, { type: 'match', pairs: [['Entrevista', 'Qualitativa']] })).toBe(false)
  })
})
