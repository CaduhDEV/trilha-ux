// Atalhos para escrever exercícios de forma compacta nos arquivos de conteúdo.
import type { ExerciseInput } from './types'

/** Múltipla escolha. A alternativa correta vem primeiro; a ordem é embaralhada na tela. */
export const mc = (prompt: string, correct: string, wrong: string[], explanation: string): ExerciseInput => ({
  type: 'mc',
  prompt,
  correct,
  wrong,
  explanation,
})

/** Múltipla escolha com um cenário (situação) antes da pergunta. */
export const scenario = (
  context: string,
  prompt: string,
  correct: string,
  wrong: string[],
  explanation: string,
): ExerciseInput => ({ type: 'mc', context, prompt, correct, wrong, explanation })

/** Marque todas as corretas. */
export const multi = (prompt: string, correct: string[], wrong: string[], explanation: string): ExerciseInput => ({
  type: 'multi',
  prompt,
  correct,
  wrong,
  explanation,
})

/** Verdadeiro ou falso. */
export const tf = (statement: string, answer: boolean, explanation: string): ExerciseInput => ({
  type: 'tf',
  statement,
  answer,
  explanation,
})

/** Complete a lacuna. Use ___ na frase. */
export const fill = (sentence: string, correct: string, wrong: string[], explanation: string): ExerciseInput => ({
  type: 'fill',
  sentence,
  correct,
  wrong,
  explanation,
})

/** Ligue os pares (termo → definição). */
export const match = (prompt: string, pairs: [string, string][], explanation?: string): ExerciseInput => ({
  type: 'match',
  prompt,
  pairs,
  explanation,
})

/** Coloque na ordem certa. Passe os itens já na ordem correta. */
export const order = (prompt: string, items: string[], explanation: string): ExerciseInput => ({
  type: 'order',
  prompt,
  items,
  explanation,
})

/** Esse contraste passa no WCAG AA? (a resposta é calculada) */
export const contrast = (fg: string, bg: string, opts: { large?: boolean; sample?: string } = {}): ExerciseInput => ({
  type: 'contrast',
  fg,
  bg,
  ...opts,
})

/** Qual das duas telas está melhor? a/b são pequenos trechos de HTML com estilo inline. */
export const ab = (prompt: string, a: string, b: string, correct: 'a' | 'b', explanation: string): ExerciseInput => ({
  type: 'ab',
  prompt,
  a,
  b,
  correct,
  explanation,
})

/** Reflexão aberta — não tem certo/errado, fica salva para a pessoa (e mentor) reler. */
export const open = (prompt: string, guidance: string): ExerciseInput => ({ type: 'open', prompt, guidance })
