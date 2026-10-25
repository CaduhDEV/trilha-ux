import { Check, Info, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Exercise } from '../../content/types'
import { contrastRatio, passesAA } from '../../lib/contrast'
import { shuffle } from '../../lib/random'
import type { Answer } from './grading'

interface Props<E extends Exercise['type']> {
  ex: Extract<Exercise, { type: E }>
  checked: boolean
  onChange: (a: Answer | null) => void
}

export function ExerciseView({
  exercise,
  checked,
  onChange,
}: {
  exercise: Exercise
  checked: boolean
  onChange: (a: Answer | null) => void
}) {
  switch (exercise.type) {
    case 'mc':
      return <MultipleChoice ex={exercise} checked={checked} onChange={onChange} />
    case 'multi':
      return <MultiSelect ex={exercise} checked={checked} onChange={onChange} />
    case 'tf':
      return <TrueFalse ex={exercise} checked={checked} onChange={onChange} />
    case 'fill':
      return <FillBlank ex={exercise} checked={checked} onChange={onChange} />
    case 'match':
      return <MatchPairs ex={exercise} checked={checked} onChange={onChange} />
    case 'order':
      return <OrderItems ex={exercise} checked={checked} onChange={onChange} />
    case 'contrast':
      return <ContrastQuestion ex={exercise} checked={checked} onChange={onChange} />
    case 'ab':
      return <ABChoice ex={exercise} checked={checked} onChange={onChange} />
    case 'open':
      return <OpenQuestion ex={exercise} checked={checked} onChange={onChange} />
  }
}

// ---------------------------------------------------------------------
// Peças comuns
// ---------------------------------------------------------------------

function Prompt({ kicker, context, children }: { kicker: string; context?: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-ink">{kicker}</div>
      {context && (
        <div className="mb-4 flex gap-3 rounded-2xl border-2 border-line bg-surface-2 p-4 font-semibold leading-relaxed">
          <Info className="mt-0.5 shrink-0 text-sky" size={20} />
          <p>{context}</p>
        </div>
      )}
      <h2 className="text-xl font-black leading-snug sm:text-2xl">{children}</h2>
    </div>
  )
}

function Key({ n }: { n: number }) {
  return (
    <span className="hidden h-7 w-7 shrink-0 place-items-center rounded-lg border-2 border-current/30 text-xs font-black opacity-70 sm:grid">
      {n}
    </span>
  )
}

/** Atalhos 1…9 para escolher alternativas */
function useNumberKeys(count: number, pick: (i: number) => void, disabled: boolean) {
  const pickRef = useRef(pick)
  pickRef.current = pick
  useEffect(() => {
    if (disabled) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT') return
      const n = Number(e.key)
      if (n >= 1 && n <= count) pickRef.current(n - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count, disabled])
}

type OptState = 'selected' | 'correct' | 'wrong' | 'dim' | undefined

// ---------------------------------------------------------------------
// Tipos de exercício
// ---------------------------------------------------------------------

function MultipleChoice({ ex, checked, onChange }: Props<'mc'>) {
  const options = useMemo(() => shuffle([ex.correct, ...ex.wrong]), [ex])
  const [sel, setSel] = useState<string | null>(null)
  const choose = (o: string) => {
    if (checked) return
    setSel(o)
    onChange({ type: 'mc', choice: o })
  }
  useNumberKeys(options.length, (i) => choose(options[i]), checked)
  const state = (o: string): OptState => {
    if (!checked) return sel === o ? 'selected' : undefined
    if (o === ex.correct) return 'correct'
    if (o === sel) return 'wrong'
    return 'dim'
  }
  return (
    <>
      <Prompt kicker={ex.context ? 'Situação' : 'Escolha a resposta certa'} context={ex.context}>
        {ex.prompt}
      </Prompt>
      <div className="grid gap-3">
        {options.map((o, i) => (
          <button key={o} className="option flex items-center gap-3" data-state={state(o)} onClick={() => choose(o)} disabled={checked}>
            <Key n={i + 1} />
            <span>{o}</span>
          </button>
        ))}
      </div>
    </>
  )
}

function MultiSelect({ ex, checked, onChange }: Props<'multi'>) {
  const options = useMemo(() => shuffle([...ex.correct, ...ex.wrong]), [ex])
  const [sel, setSel] = useState<string[]>([])
  const toggle = (o: string) => {
    if (checked) return
    const next = sel.includes(o) ? sel.filter((x) => x !== o) : [...sel, o]
    setSel(next)
    onChange(next.length ? { type: 'multi', choices: next } : null)
  }
  useNumberKeys(options.length, (i) => toggle(options[i]), checked)
  const state = (o: string): OptState => {
    const on = sel.includes(o)
    if (!checked) return on ? 'selected' : undefined
    if (ex.correct.includes(o)) return 'correct'
    return on ? 'wrong' : 'dim'
  }
  return (
    <>
      <Prompt kicker="Marque todas as corretas" context={ex.context}>
        {ex.prompt}
      </Prompt>
      <div className="grid gap-3">
        {options.map((o, i) => {
          const on = sel.includes(o)
          return (
            <button key={o} className="option flex items-center gap-3" data-state={state(o)} onClick={() => toggle(o)} disabled={checked} aria-pressed={on}>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${on ? 'border-current bg-current' : 'border-line-strong'}`}
              >
                {on && <Check size={16} className="text-surface" strokeWidth={4} />}
              </span>
              <span className="flex-1">{o}</span>
              <Key n={i + 1} />
            </button>
          )
        })}
      </div>
    </>
  )
}

function TrueFalse({ ex, checked, onChange }: Props<'tf'>) {
  const [sel, setSel] = useState<boolean | null>(null)
  const choose = (v: boolean) => {
    if (checked) return
    setSel(v)
    onChange({ type: 'tf', value: v })
  }
  useNumberKeys(2, (i) => choose(i === 0), checked)
  const state = (v: boolean): OptState => {
    if (!checked) return sel === v ? 'selected' : undefined
    if (v === ex.answer) return 'correct'
    return sel === v ? 'wrong' : 'dim'
  }
  return (
    <>
      <Prompt kicker="Verdadeiro ou falso?" context={ex.context}>
        {ex.statement}
      </Prompt>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v, i) => (
          <button
            key={String(v)}
            className="option flex flex-col items-center gap-2 py-6 text-lg"
            data-state={state(v)}
            onClick={() => choose(v)}
            disabled={checked}
          >
            {v ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} />}
            {v ? 'Verdadeiro' : 'Falso'}
            <Key n={i + 1} />
          </button>
        ))}
      </div>
    </>
  )
}

function FillBlank({ ex, checked, onChange }: Props<'fill'>) {
  const options = useMemo(() => shuffle([ex.correct, ...ex.wrong]), [ex])
  const [sel, setSel] = useState<string | null>(null)
  const choose = (o: string) => {
    if (checked) return
    const next = sel === o ? null : o
    setSel(next)
    onChange(next ? { type: 'fill', choice: next } : null)
  }
  useNumberKeys(options.length, (i) => choose(options[i]), checked)
  const [before, after = ''] = ex.sentence.split('___')
  const ok = checked && sel === ex.correct
  return (
    <>
      <div className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-ink">Complete a frase</div>
      <p className="mb-8 text-xl font-bold leading-loose sm:text-2xl">
        {before}
        <span
          className={`mx-1 inline-block min-w-24 rounded-xl border-b-4 px-3 text-center align-baseline ${
            !sel
              ? 'border-line-strong text-transparent'
              : checked
                ? ok
                  ? 'border-ok bg-ok-soft text-ok-ink'
                  : 'border-bad bg-bad-soft text-bad-ink'
                : 'border-sky bg-sky/10 text-sky'
          }`}
        >
          {sel ?? '…'}
        </span>
        {after}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((o, i) => (
          <button
            key={o}
            className="option w-auto px-4 py-2"
            data-state={sel === o ? (checked ? (ok ? 'correct' : 'wrong') : 'selected') : checked ? 'dim' : undefined}
            onClick={() => choose(o)}
            disabled={checked}
          >
            <span className="sr-only">{i + 1}. </span>
            {o}
          </button>
        ))}
      </div>
    </>
  )
}

/** Cor de cada par ligado (antes da correção). Sem verde/vermelho/azul para não confundir com certo/errado/selecionado. */
const PAIR_COLORS = ['#7C4DFF', '#B45309', '#D1306F', '#0F766E', '#475569']

interface PairLink {
  /** índice em ex.pairs do cartão da esquerda */
  l: number
  /** índice em ex.pairs do cartão da direita */
  r: number
  /** cor/número do par */
  slot: number
}

/**
 * Ligar pares. A pessoa liga tudo livremente (pode desfazer e trocar) e só
 * descobre o resultado ao verificar, como nos outros exercícios. Trabalha com
 * índices porque o lado direito pode repetir valores (ex.: classificar vários
 * itens como "Qualitativa"): qualquer cartão com o texto certo serve.
 */
function MatchPairs({ ex, checked, onChange }: Props<'match'>) {
  const lefts = useMemo(() => shuffle(ex.pairs.map((_, i) => i)), [ex])
  const rights = useMemo(() => shuffle(ex.pairs.map((_, i) => i)), [ex])
  const [links, setLinks] = useState<PairLink[]>([])
  const [sel, setSel] = useState<{ side: 'L' | 'R'; i: number } | null>(null)
  const total = ex.pairs.length
  const isRight = (k: PairLink) => ex.pairs[k.l][1] === ex.pairs[k.r][1]

  const commit = (next: PairLink[]) => {
    setLinks(next)
    onChange(
      next.length === total
        ? { type: 'match', pairs: next.map((k) => [ex.pairs[k.l][0], ex.pairs[k.r][1]] as [string, string]) }
        : null,
    )
  }

  const tap = (side: 'L' | 'R', i: number) => {
    if (checked) return
    const linked = links.find((k) => (side === 'L' ? k.l : k.r) === i)
    const rest = linked ? links.filter((k) => k !== linked) : links
    if (sel && sel.side !== side) {
      // completa o par com o item já selecionado (se este já tinha par, troca)
      const used = new Set(rest.map((k) => k.slot))
      let slot = linked?.slot ?? 0
      while (!linked && used.has(slot)) slot++
      commit([...rest, { l: side === 'L' ? i : sel.i, r: side === 'R' ? i : sel.i, slot }])
      setSel(null)
    } else if (linked) {
      // tocar num par desfaz a ligação e deixa o item pronto para religar
      commit(rest)
      setSel({ side, i })
    } else {
      setSel(sel?.side === side && sel.i === i ? null : { side, i })
    }
  }

  const card = (side: 'L' | 'R', i: number) => {
    const link = links.find((k) => (side === 'L' ? k.l : k.r) === i)
    const color = link ? PAIR_COLORS[link.slot % PAIR_COLORS.length] : undefined
    const ok = link ? isRight(link) : false
    const selected = sel?.side === side && sel.i === i
    const text = side === 'L' ? ex.pairs[i][0] : ex.pairs[i][1]
    const state: OptState = checked ? (ok ? 'correct' : 'wrong') : selected ? 'selected' : undefined
    return (
      <button
        key={`${side}${i}`}
        className={`option flex min-h-14 items-center gap-2 ${side === 'L' ? 'text-[15px]' : 'text-sm font-semibold'}`}
        data-state={state}
        style={
          !checked && link
            ? {
                borderColor: color,
                background: `color-mix(in oklab, ${color} 14%, var(--surface))`,
                boxShadow: `0 3px 0 ${color}`,
              }
            : undefined
        }
        aria-pressed={selected || !!link}
        aria-label={`${text}${link ? `, par ${link.slot + 1}` : ''}${checked ? (ok ? ', certo' : ', errado') : ''}`}
        onClick={() => tap(side, i)}
        disabled={checked}
      >
        {link && (
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black text-white"
            style={{ background: checked ? (ok ? 'var(--ok)' : 'var(--bad)') : color }}
            aria-hidden
          >
            {/* o número continua após verificar para mostrar o que foi ligado com o quê */}
            {link.slot + 1}
          </span>
        )}
        <span className="min-w-0 flex-1">
          {text}
          {checked && side === 'L' && link && !ok && (
            <span className="mt-1 block text-xs font-extrabold">Par certo: {ex.pairs[i][1]}</span>
          )}
        </span>
      </button>
    )
  }

  const hits = links.filter(isRight).length
  return (
    <>
      <Prompt kicker="Ligue os pares">{ex.prompt}</Prompt>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">{lefts.map((i) => card('L', i))}</div>
        <div className="flex flex-col gap-3">{rights.map((i) => card('R', i))}</div>
      </div>
      <p className="mt-4 text-center text-sm font-bold text-muted" aria-live="polite">
        {checked
          ? `${hits} de ${total} pares certos`
          : links.length === 0
            ? 'Toque num item de um lado e depois no par dele do outro lado.'
            : links.length < total
              ? `${links.length} de ${total} pares ligados · toque num par para desfazer`
              : 'Tudo ligado! Confira e toque em Verificar.'}
      </p>
    </>
  )
}

function OrderItems({ ex, checked, onChange }: Props<'order'>) {
  const initial = useMemo(() => {
    let s = shuffle(ex.items)
    // garante que não comece já na ordem certa
    for (let i = 0; i < 5 && s.join() === ex.items.join(); i++) s = shuffle(ex.items)
    return s
  }, [ex])
  const [placed, setPlaced] = useState<string[]>([])
  const bank = initial.filter((i) => !placed.includes(i))

  const update = (next: string[]) => {
    setPlaced(next)
    onChange(next.length === ex.items.length ? { type: 'order', sequence: next } : null)
  }

  return (
    <>
      <Prompt kicker="Coloque na ordem certa">{ex.prompt}</Prompt>
      <div className="mb-5 flex min-h-24 flex-col gap-2 rounded-2xl border-2 border-dashed border-line-strong p-3">
        {placed.length === 0 && <p className="m-auto text-sm font-bold text-muted">Toque nos itens abaixo, na ordem.</p>}
        {placed.map((p, i) => (
          <button
            key={p}
            className="option flex items-center gap-3 py-2 text-[15px]"
            data-state={checked ? (ex.items[i] === p ? 'correct' : 'wrong') : 'selected'}
            onClick={() => !checked && update(placed.filter((x) => x !== p))}
            disabled={checked}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-current/15 text-sm font-black">{i + 1}</span>
            <span className="text-left">{p}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {bank.map((b) => (
          <button key={b} className="option py-2 text-[15px]" onClick={() => update([...placed, b])} disabled={checked}>
            {b}
          </button>
        ))}
      </div>
    </>
  )
}

function ContrastQuestion({ ex, checked, onChange }: Props<'contrast'>) {
  const [sel, setSel] = useState<boolean | null>(null)
  const truth = passesAA(contrastRatio(ex.fg, ex.bg), ex.large)
  const choose = (v: boolean) => {
    if (checked) return
    setSel(v)
    onChange({ type: 'contrast', passes: v })
  }
  useNumberKeys(2, (i) => choose(i === 0), checked)
  const state = (v: boolean): OptState => {
    if (!checked) return sel === v ? 'selected' : undefined
    if (v === truth) return 'correct'
    return sel === v ? 'wrong' : 'dim'
  }
  return (
    <>
      <Prompt kicker="Acessibilidade de cor">
        Esse {ex.large ? 'texto grande' : 'texto'} passa no contraste mínimo do WCAG AA?
      </Prompt>
      <div className="mb-2 rounded-2xl border border-black/10 p-6 text-center" style={{ background: ex.bg, color: ex.fg }}>
        <span style={{ fontSize: ex.large ? 26 : 16, fontWeight: ex.large ? 800 : 600 }}>
          {ex.sample ?? 'Agende seu horário em poucos toques'}
        </span>
      </div>
      <p className="mb-6 text-center text-sm font-bold text-muted">
        texto {ex.fg.toUpperCase()} · fundo {ex.bg.toUpperCase()}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v, i) => (
          <button
            key={String(v)}
            className="option flex items-center justify-center gap-3"
            data-state={state(v)}
            onClick={() => choose(v)}
            disabled={checked}
          >
            {v ? 'Passa' : 'Não passa'} <Key n={i + 1} />
          </button>
        ))}
      </div>
    </>
  )
}

function ABChoice({ ex, checked, onChange }: Props<'ab'>) {
  const [sel, setSel] = useState<'a' | 'b' | null>(null)
  const choose = (v: 'a' | 'b') => {
    if (checked) return
    setSel(v)
    onChange({ type: 'ab', choice: v })
  }
  useNumberKeys(2, (i) => choose(i === 0 ? 'a' : 'b'), checked)
  const state = (v: 'a' | 'b'): OptState => {
    if (!checked) return sel === v ? 'selected' : undefined
    if (v === ex.correct) return 'correct'
    return sel === v ? 'wrong' : 'dim'
  }
  return (
    <>
      <Prompt kicker="Qual funciona melhor?">{ex.prompt}</Prompt>
      <div className="grid gap-4 sm:grid-cols-2">
        {(['a', 'b'] as const).map((v) => (
          <button key={v} className="option p-3" data-state={state(v)} onClick={() => choose(v)} disabled={checked}>
            <div className="mb-2 text-center text-sm font-black uppercase">Opção {v}</div>
            <div
              className="pointer-events-none overflow-hidden rounded-xl border border-black/10 bg-white p-3 text-left text-[#1f1b2e]"
              style={{ fontFamily: 'Nunito, system-ui, sans-serif', fontWeight: 400 }}
              // conteúdo vem do próprio repositório (src/content), não de usuários
              dangerouslySetInnerHTML={{ __html: v === 'a' ? ex.a : ex.b }}
            />
          </button>
        ))}
      </div>
    </>
  )
}

function OpenQuestion({ ex, checked, onChange }: Props<'open'>) {
  const [text, setText] = useState('')
  return (
    <>
      <Prompt kicker="Reflexão (sem certo ou errado)">{ex.prompt}</Prompt>
      <textarea
        className="field min-h-40 resize-y text-base"
        placeholder="Escreva com suas palavras…"
        value={text}
        disabled={checked}
        onChange={(e) => {
          setText(e.target.value)
          onChange(e.target.value.trim().length >= 15 ? { type: 'open', text: e.target.value.trim() } : null)
        }}
      />
      <p className="mt-2 text-sm font-semibold text-muted">
        Escrever ajuda a fixar. Suas respostas ficam salvas{text.trim().length < 15 ? ' (mínimo de 15 caracteres)' : ''}.
      </p>
    </>
  )
}
