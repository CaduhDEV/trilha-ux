import { C, Figure, Muted, T } from './Figure'

export function ResearchQuadrant() {
  const methods: [string, number, number][] = [
    ['Entrevistas', 95, 70],
    ['Grupo focal', 120, 110],
    ['Estudo de diário', 150, 150],
    ['Questionário', 400, 75],
    ['Card sorting', 300, 120],
    ['Teste de usabilidade', 165, 230],
    ['Observação de campo', 110, 275],
    ['Tree testing', 340, 205],
    ['Analytics', 420, 275],
    ['Teste A/B', 410, 240],
  ]
  return (
    <Figure caption="Mapa de métodos de pesquisa (inspirado no Nielsen Norman Group).">
      <svg viewBox="0 0 520 330" className="mx-auto w-full max-w-xl">
        <rect x={40} y={30} width={460} height={270} rx={14} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={2} />
        <line x1={270} y1={30} x2={270} y2={300} stroke="var(--line-strong)" strokeWidth={2} strokeDasharray="6 5" />
        <line x1={40} y1={165} x2={500} y2={165} stroke="var(--line-strong)" strokeWidth={2} strokeDasharray="6 5" />
        <text x={155} y={16} {...T} fontSize={13} fill="var(--brand-ink)">QUALITATIVO (por quê?)</text>
        <text x={385} y={16} {...T} fontSize={13} fill="var(--sky)">QUANTITATIVO (quanto?)</text>
        <text x={18} y={97} {...T} fontSize={12} transform="rotate(-90 18 97)" fill="var(--gold-ink)">O QUE DIZEM</text>
        <text x={18} y={232} {...T} fontSize={12} transform="rotate(-90 18 232)" fill="var(--ok-ink)">O QUE FAZEM</text>
        {methods.map(([m, x, y]) => (
          <g key={m}>
            <circle cx={x - 6 - m.length * 3.3} cy={y} r={5} fill="var(--brand)" />
            <text x={x} y={y} {...T} fontSize={13} fontWeight={700}>{m}</text>
          </g>
        ))}
        <text x={270} y={318} {...Muted} fontSize={11}>atitudinal = opiniões e percepções · comportamental = ações reais</text>
      </svg>
    </Figure>
  )
}

export function Affinity() {
  const groups = [
    { title: 'Falta de tempo', color: '#ffe48a', notes: ['"Agendo no intervalo"', '"Esqueço de ligar"', '"Fila no WhatsApp"'] },
    { title: 'Medo de errar', color: '#ffc4dd', notes: ['"Não sei o preço"', '"E se cancelarem?"', '"Vergonha de perguntar"'] },
    { title: 'Confiança', color: '#bfe8ff', notes: ['"Vou pela indicação"', '"Quero ver fotos"', '"Leio avaliações"'] },
  ]
  return (
    <Figure caption="Diagrama de afinidade: notas soltas das entrevistas agrupadas por temas que se repetem.">
      <div className="grid min-w-[440px] grid-cols-3 gap-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-xl border-2 border-dashed border-line-strong p-2">
            <div className="mb-2 rounded-lg bg-ink px-2 py-1 text-center text-xs font-black text-surface">{g.title}</div>
            <div className="flex flex-col gap-2">
              {g.notes.map((n, i) => (
                <div
                  key={n}
                  className="rounded-md px-2 py-2 text-xs font-bold text-[#1f1b2e] shadow-sm"
                  style={{ background: g.color, transform: `rotate(${(i - 1) * 1.5}deg)` }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Figure>
  )
}

export function Journey() {
  const phases = ['Descobrir', 'Agendar', 'Esperar', 'Atendimento', 'Depois']
  const mood = [60, 35, 55, 85, 70] // 0 = péssimo, 100 = ótimo
  const emoji = ['🙂', '😣', '😐', '😍', '🙂']
  const pains = ['', 'só por WhatsApp, demora', '', '', 'sem lembrete do retorno']
  const w = 520
  const step = (w - 60) / phases.length
  const pts = mood.map((m, i) => [40 + step * i + step / 2, 200 - m * 1.3] as const)
  return (
    <Figure caption="Mapa de jornada: fases, emoções e pontos de dor de uma pessoa agendando um serviço.">
      <svg viewBox={`0 0 ${w} 250`} className="mx-auto w-full max-w-xl">
        {phases.map((p, i) => (
          <g key={p}>
            <rect x={40 + step * i + 3} y={8} width={step - 6} height={30} rx={8} fill="var(--brand)" />
            <text x={40 + step * i + step / 2} y={23} {...T} fill="#fff" fontSize={12}>{p}</text>
            <line x1={40 + step * i} y1={45} x2={40 + step * i} y2={215} stroke="var(--line)" strokeWidth={1.5} />
          </g>
        ))}
        <text x={18} y={70} {...Muted} fontSize={18}>+</text>
        <text x={18} y={195} {...Muted} fontSize={18}>−</text>
        <polyline
          points={pts.map((p) => p.join(',')).join(' ')}
          fill="none"
          stroke="var(--sky)"
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={15} fill="var(--surface)" stroke="var(--sky)" strokeWidth={2.5} />
            <text x={x} y={y + 1} {...T} fontSize={16}>{emoji[i]}</text>
            {pains[i] && (
              <text x={x} y={232} {...T} fontSize={11} fill="var(--bad-ink)">⚠ {pains[i]}</text>
            )}
          </g>
        ))}
      </svg>
    </Figure>
  )
}

export function EmpathyMap() {
  const q = [
    { t: 'DIZ', c: 'var(--brand-ink)', ex: '"Não tenho tempo de ficar ligando."' },
    { t: 'PENSA', c: 'var(--sky)', ex: '"Será que vão me encaixar hoje?"' },
    { t: 'FAZ', c: 'var(--gold-ink)', ex: 'Manda áudio no WhatsApp às 23h.' },
    { t: 'SENTE', c: 'var(--bad-ink)', ex: 'Ansiedade quando não recebe resposta.' },
  ]
  return (
    <Figure caption="Mapa de empatia: o que a pessoa diz, pensa, faz e sente.">
      <div className="relative mx-auto grid max-w-md grid-cols-2 gap-2">
        {q.map((x) => (
          <div key={x.t} className="rounded-xl border-2 p-3" style={{ borderColor: x.c }}>
            <div className="text-xs font-black" style={{ color: x.c }}>{x.t}</div>
            <div className="mt-1 text-sm font-semibold">{x.ex}</div>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-surface-2 bg-ink text-2xl">
          🙋‍♀️
        </div>
      </div>
    </Figure>
  )
}

export function UsabilityCurve() {
  const pts = Array.from({ length: 16 }, (_, n) => [n, 1 - (1 - 0.31) ** n] as const)
  const X = (n: number) => 50 + n * 28
  const Y = (p: number) => 220 - p * 190
  return (
    <Figure caption="Curva de Nielsen & Landauer: com 5 pessoas você já encontra ~85% dos problemas de usabilidade.">
      <svg viewBox="0 0 520 260" className="mx-auto w-full max-w-xl">
        <line x1={50} y1={220} x2={480} y2={220} stroke="var(--line-strong)" strokeWidth={2} />
        <line x1={50} y1={20} x2={50} y2={220} stroke="var(--line-strong)" strokeWidth={2} />
        {[0, 25, 50, 75, 100].map((p) => (
          <text key={p} x={30} y={Y(p / 100)} {...Muted} fontSize={11}>{p}%</text>
        ))}
        {[0, 5, 10, 15].map((n) => (
          <text key={n} x={X(n)} y={238} {...Muted} fontSize={11}>{n}</text>
        ))}
        <text x={265} y={254} {...Muted} fontSize={11}>pessoas testadas</text>
        <polyline points={pts.map(([n, p]) => `${X(n)},${Y(p)}`).join(' ')} fill="none" stroke="var(--brand)" strokeWidth={3.5} />
        <line x1={X(5)} y1={Y(0.844)} x2={X(5)} y2={220} stroke="var(--ok)" strokeDasharray="5 4" strokeWidth={2} />
        <circle cx={X(5)} cy={Y(0.844)} r={7} fill="var(--ok)" />
        <text x={X(5) + 70} y={Y(0.844) + 22} {...T} fontSize={12} fill="var(--ok-ink)">5 pessoas ≈ 85%</text>
      </svg>
    </Figure>
  )
}

export function ImpactEffort() {
  const q = [
    { t: 'Ganhos rápidos', s: 'faça primeiro', c: C.green },
    { t: 'Grandes apostas', s: 'planeje com calma', c: C.blue },
    { t: 'Preenchimento', s: 'se sobrar tempo', c: C.amber },
    { t: 'Evite', s: 'esforço alto, pouco valor', c: C.red },
  ]
  return (
    <Figure caption="Matriz impacto × esforço para priorizar ideias.">
      <div className="mx-auto flex max-w-md gap-2">
        <div className="flex flex-col items-center justify-between py-2 text-[11px] font-extrabold uppercase text-muted [writing-mode:vertical-rl] rotate-180">
          impacto →
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2">
            {q.map((x) => (
              <div key={x.t} className="rounded-xl p-3 text-white" style={{ background: x.c }}>
                <div className="font-black">{x.t}</div>
                <div className="text-xs font-bold opacity-90">{x.s}</div>
              </div>
            ))}
          </div>
          <div className="mt-1 text-center text-[11px] font-extrabold uppercase text-muted">esforço →</div>
        </div>
      </div>
    </Figure>
  )
}

export function Funnel() {
  const steps = [
    { t: 'Abriram o app', v: 1000 },
    { t: 'Escolheram serviço', v: 620 },
    { t: 'Escolheram horário', v: 410 },
    { t: 'Confirmaram', v: 180 },
  ]
  return (
    <Figure caption="Funil: onde as pessoas desistem? O maior salto (horário → confirmação) é onde investigar primeiro.">
      <div className="mx-auto flex max-w-md flex-col items-center gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s.t}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-black text-white"
            style={{ width: `${40 + (s.v / 1000) * 60}%`, background: i === 3 ? C.red : C.violet }}
          >
            <span>{s.t}</span>
            <span>{s.v}</span>
          </div>
        ))}
      </div>
    </Figure>
  )
}
