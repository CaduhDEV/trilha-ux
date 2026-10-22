import { Arrow, C, Figure, Muted, T } from './Figure'

export function DoubleDiamond() {
  const half = [
    { x: 85, label: 'Descobrir', sub: 'pesquisar' },
    { x: 195, label: 'Definir', sub: 'sintetizar' },
    { x: 315, label: 'Desenvolver', sub: 'idear e prototipar' },
    { x: 425, label: 'Entregar', sub: 'testar e lançar' },
  ]
  return (
    <Figure caption="Double Diamond (Design Council): primeiro entenda o problema certo, depois construa a solução certa.">
      <svg viewBox="0 0 520 250" className="mx-auto w-full max-w-xl">
        <text x={140} y={18} {...T} fontSize={15} fill="var(--brand-ink)">PROBLEMA</text>
        <text x={370} y={18} {...T} fontSize={15} fill="var(--sky)">SOLUÇÃO</text>
        <polygon points="30,120 140,35 250,120 140,205" fill="var(--brand-soft)" stroke="var(--brand)" strokeWidth={3} />
        <polygon points="260,120 370,35 480,120 370,205" fill="color-mix(in oklab, var(--sky) 15%, transparent)" stroke="var(--sky)" strokeWidth={3} />
        <line x1={140} y1={35} x2={140} y2={205} stroke="var(--brand)" strokeDasharray="5 5" strokeWidth={2} />
        <line x1={370} y1={35} x2={370} y2={205} stroke="var(--sky)" strokeDasharray="5 5" strokeWidth={2} />
        {half.map((h) => (
          <g key={h.label}>
            <text x={h.x} y={112} {...T} fontSize={14}>{h.label}</text>
            <text x={h.x} y={132} {...Muted} fontSize={11}>{h.sub}</text>
          </g>
        ))}
        {['divergir', 'convergir', 'divergir', 'convergir'].map((w, i) => (
          <text key={i} x={half[i].x} y={232} {...Muted} fontSize={12}>
            {i % 2 === 0 ? '◁ ' : ''}{w}{i % 2 === 1 ? ' ▷' : ''}
          </text>
        ))}
      </svg>
    </Figure>
  )
}

export function DesignThinking() {
  const stages = [
    { label: 'Empatizar', color: C.violet },
    { label: 'Definir', color: C.blue },
    { label: 'Idear', color: C.amber },
    { label: 'Prototipar', color: C.pink },
    { label: 'Testar', color: C.green },
  ]
  return (
    <Figure caption="As 5 etapas do Design Thinking (d.school). Não é uma linha reta: você volta etapas sempre que aprende algo novo.">
      <svg viewBox="0 0 520 190" className="mx-auto w-full max-w-xl">
        <Arrow id="dt-arrow" />
        {stages.map((s, i) => {
          const x = 52 + i * 104
          return (
            <g key={s.label}>
              <circle cx={x} cy={70} r={44} fill={s.color} />
              <text x={x} y={70} {...T} fill="#fff" fontSize={13}>{s.label}</text>
              {i < 4 && <line x1={x + 46} y1={70} x2={x + 58} y2={70} stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#dt-arrow)" />}
            </g>
          )
        })}
        <path d="M468 118 Q 260 200 52 118" fill="none" stroke="var(--muted)" strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#dt-arrow)" />
        <text x={260} y={176} {...Muted} fontSize={12}>itere: aprendeu algo no teste? volte!</text>
      </svg>
    </Figure>
  )
}

export function UxPlanes() {
  const planes = [
    { name: 'Superfície', desc: 'visual: cores, tipografia, imagens', color: C.pink },
    { name: 'Esqueleto', desc: 'layout, wireframes, navegação', color: C.amber },
    { name: 'Estrutura', desc: 'arquitetura de informação, fluxos', color: C.green },
    { name: 'Escopo', desc: 'funcionalidades e conteúdos', color: C.blue },
    { name: 'Estratégia', desc: 'objetivos do negócio + necessidades', color: C.violet },
  ]
  return (
    <Figure caption="Os 5 planos da experiência (Jesse James Garrett). Cada camada depende das decisões da camada de baixo.">
      <div className="mx-auto flex max-w-lg gap-3">
        <div className="flex flex-col items-center justify-between py-1 text-xs font-extrabold uppercase text-muted">
          <span>concreto</span>
          <span className="w-0.5 flex-1 bg-line-strong" />
          <span>abstrato</span>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {planes.map((p) => (
            <div key={p.name} className="rounded-xl px-4 py-2.5 text-white" style={{ background: p.color }}>
              <div className="font-black">{p.name}</div>
              <div className="text-sm font-semibold opacity-90">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Figure>
  )
}

export function UxUmbrella() {
  const areas = [
    'Pesquisa com usuários',
    'Arquitetura de informação',
    'Design de interação',
    'Design visual (UI)',
    'UX writing',
    'Acessibilidade',
    'Usabilidade',
    'Estratégia de produto',
  ]
  return (
    <Figure caption="UX é um guarda-chuva: várias disciplinas trabalham juntas para criar uma boa experiência.">
      <div className="mx-auto max-w-lg">
        <div className="mx-auto mb-3 w-fit rounded-t-[80px] rounded-b-xl bg-brand px-10 pb-3 pt-5 text-center font-black text-white">
          ☂ Experiência do Usuário (UX)
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {areas.map((a) => (
            <span key={a} className="rounded-full border-2 border-brand/40 bg-surface px-3 py-1 text-sm font-bold">
              {a}
            </span>
          ))}
        </div>
      </div>
    </Figure>
  )
}

export function Fidelity() {
  const steps = [
    { name: 'Esboço', sub: 'papel, 5 min', lines: 2, color: false, radius: 2 },
    { name: 'Wireframe', sub: 'lo-fi, cinza', lines: 3, color: false, radius: 4 },
    { name: 'Mid-fi', sub: 'estrutura + conteúdo real', lines: 3, color: false, radius: 6 },
    { name: 'Hi-fi', sub: 'visual final', lines: 3, color: true, radius: 8 },
    { name: 'Protótipo', sub: 'clicável', lines: 3, color: true, radius: 8 },
  ]
  return (
    <Figure caption="Fidelidade: quanto mais alta, mais parecido com o produto final — e mais caro de mudar.">
      <div className="flex min-w-[460px] items-end justify-between gap-2">
        {steps.map((s, i) => (
          <div key={s.name} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="flex h-28 w-16 flex-col gap-1.5 border-2 p-1.5"
              style={{
                borderRadius: s.radius + 4,
                borderStyle: i === 0 ? 'dashed' : 'solid',
                borderColor: s.color ? 'var(--brand)' : 'var(--line-strong)',
                background: 'var(--surface)',
              }}
            >
              <div className="h-3 rounded-sm" style={{ background: s.color ? 'var(--brand)' : 'var(--line-strong)' }} />
              <div className="h-8 rounded-sm" style={{ background: s.color ? 'var(--brand-soft)' : 'var(--line)' }} />
              {Array.from({ length: s.lines }).map((_, k) => (
                <div key={k} className="h-1.5 rounded-sm bg-line-strong" style={{ width: `${90 - k * 20}%` }} />
              ))}
              <div
                className="mt-auto h-3 rounded"
                style={{ background: s.color ? 'var(--ok)' : 'var(--line-strong)', outline: i === 4 ? '2px solid var(--gold)' : undefined }}
              />
            </div>
            <div className="text-center">
              <div className="text-sm font-black">{s.name}</div>
              <div className="text-[11px] font-bold text-muted">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Figure>
  )
}
