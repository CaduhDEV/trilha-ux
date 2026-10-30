// ---------------------------------------------------------------------
// Checkpoints e provas usam o mesmo conteúdo das lições, mas não as
// mesmas perguntas: parte delas vira "julgue as afirmações", juntando
// 3 ou 4 perguntas da lição numa só questão (tudo ou nada). Assim não
// basta reconhecer a alternativa que já foi vista — é preciso saber
// dizer se cada afirmação está certa ou errada.
// ---------------------------------------------------------------------
import { shuffle, weightedSample } from '../lib/random'
import type { Exercise } from './types'

interface Statement {
  text: string
  true: boolean
  explanation: string
}

const clean = (s: string) => s.trim().replace(/\s+/g, ' ')
const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)]

/** Afirmações curtas o bastante para virar opção de "julgue" */
function statementOf(ex: Exercise): Statement | null {
  switch (ex.type) {
    case 'mc': {
      if (ex.context || ex.prompt.length > 140) return null
      const right = Math.random() < 0.5
      const answer = right ? ex.correct : pick(ex.wrong)
      if (answer.length > 120) return null
      return { text: `${clean(ex.prompt)} → ${clean(answer)}`, true: right, explanation: ex.explanation }
    }
    case 'fill': {
      if (!ex.sentence.includes('___')) return null
      const right = Math.random() < 0.5
      const word = right ? ex.correct : pick(ex.wrong)
      return { text: clean(ex.sentence.replace('___', word)), true: right, explanation: ex.explanation }
    }
    case 'tf':
      if (ex.context || ex.statement.length > 220) return null
      return { text: clean(ex.statement), true: ex.answer, explanation: ex.explanation }
    default:
      return null
  }
}

function judge(group: { ex: Exercise; st: Statement }[]): Exercise {
  // garante ao menos uma verdadeira e uma falsa, para não dar para chutar "todas" ou "nenhuma"
  const allSame = group.every((g) => g.st.true === group[0].st.true)
  const flip = allSame ? group.find((g) => g.ex.type !== 'tf') : undefined
  if (flip) flip.st = { ...flip.st, ...redo(flip.ex, !flip.st.true) }
  // só V/F com a mesma resposta: sem como equilibrar, fica valendo "nenhuma" ou "todas"
  if (group.every((g) => !g.st.true)) return group[0].ex
  return {
    // mantém o id da primeira pergunta para os erros contarem no reforço
    id: group[0].ex.id,
    type: 'multi',
    prompt: 'Julgue as afirmações: marque só as que estão corretas.',
    correct: group.filter((g) => g.st.true).map((g) => g.st.text),
    wrong: group.filter((g) => !g.st.true).map((g) => g.st.text),
    explanation: group.map((g) => `${g.st.true ? '✔' : '✘'} ${g.st.explanation}`).join(' '),
  }
}

/** Refaz a afirmação de mc/fill com o valor de verdade pedido */
function redo(ex: Exercise, wantTrue: boolean): Pick<Statement, 'text' | 'true'> {
  if (ex.type === 'mc')
    return { text: `${clean(ex.prompt)} → ${clean(wantTrue ? ex.correct : pick(ex.wrong))}`, true: wantTrue }
  if (ex.type === 'fill')
    return { text: clean(ex.sentence.replace('___', wantTrue ? ex.correct : pick(ex.wrong))), true: wantTrue }
  throw new Error('redo: tipo sem alternativas')
}

/**
 * Sorteia as questões de um checkpoint/prova. Cerca de metade das
 * perguntas simples (múltipla escolha, lacuna, V/F) é agrupada em
 * questões de "julgue", o que puxa mais conteúdo da semana para cada prova.
 */
export function buildQuiz(pool: readonly Exercise[], count: number, weight: (e: Exercise) => number): Exercise[] {
  const ordered = weightedSample(pool, pool.length, weight)
  const out: Exercise[] = []
  const used = new Set<string>()
  for (let i = 0; i < ordered.length && out.length < count; i++) {
    const ex = ordered[i]
    if (used.has(ex.id)) continue
    used.add(ex.id)
    const st = statementOf(ex)
    if (st && Math.random() < 0.55) {
      const size = Math.random() < 0.5 ? 3 : 4
      const group = [{ ex, st }]
      for (let j = i + 1; j < ordered.length && group.length < size; j++) {
        const other = ordered[j]
        if (used.has(other.id)) continue
        const ost = statementOf(other)
        if (!ost) continue
        used.add(other.id)
        group.push({ ex: other, st: ost })
      }
      out.push(group.length >= 3 ? judge(group) : ex)
      if (group.length < 3) group.slice(1).forEach((g) => out.length < count && out.push(g.ex))
    } else out.push(ex)
  }
  return shuffle(out)
}
