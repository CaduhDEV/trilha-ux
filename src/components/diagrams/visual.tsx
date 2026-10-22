import { useState } from 'react'
import { contrastRatio, formatRatio, passesAA, passesAAA } from '../../lib/contrast'
import { Figure, Muted, T } from './Figure'

export function Gestalt() {
  const dot = (cx: number, cy: number, fill = 'var(--brand)', key?: string | number) => (
    <circle key={key ?? `${cx}-${cy}`} cx={cx} cy={cy} r={7} fill={fill} />
  )
  return (
    <Figure caption="Princípios da Gestalt: o cérebro agrupa elementos por proximidade, semelhança, região comum e completa formas.">
      <svg viewBox="0 0 520 170" className="mx-auto w-full max-w-xl">
        {/* Proximidade */}
        <g>
          {[0, 1, 2].flatMap((r) => [0, 1].map((c) => dot(20 + c * 20, 30 + r * 22)))}
          {[0, 1, 2].flatMap((r) => [0, 1].map((c) => dot(85 + c * 20, 30 + r * 22)))}
          <text x={72} y={135} {...T} fontSize={13}>Proximidade</text>
          <text x={72} y={153} {...Muted} fontSize={11}>2 grupos</text>
        </g>
        {/* Semelhança */}
        <g transform="translate(135 0)">
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2, 3].map((c) =>
              c % 2 === 0 ? (
                dot(15 + c * 25, 30 + r * 22, 'var(--brand)', `${r}${c}`)
              ) : (
                <rect key={`${r}${c}`} x={8 + c * 25} y={23 + r * 22} width={14} height={14} rx={2} fill="var(--gold)" />
              ),
            ),
          )}
          <text x={52} y={135} {...T} fontSize={13}>Semelhança</text>
          <text x={52} y={153} {...Muted} fontSize={11}>colunas, não linhas</text>
        </g>
        {/* Região comum */}
        <g transform="translate(265 0)">
          <rect x={4} y={16} width={52} height={88} rx={12} fill="none" stroke="var(--sky)" strokeWidth={2.5} />
          {[0, 1, 2].map((r) => dot(30, 38 + r * 22, 'var(--brand)', `a${r}`))}
          {[0, 1, 2].map((r) => dot(80, 38 + r * 22, 'var(--brand)', `b${r}`))}
          <text x={52} y={135} {...T} fontSize={13}>Região comum</text>
          <text x={52} y={153} {...Muted} fontSize={11}>a borda une</text>
        </g>
        {/* Fechamento */}
        <g transform="translate(400 0)">
          <path d="M60 22 A38 38 0 0 1 96 50" fill="none" stroke="var(--brand)" strokeWidth={7} strokeLinecap="round" />
          <path d="M96 72 A38 38 0 0 1 60 98" fill="none" stroke="var(--brand)" strokeWidth={7} strokeLinecap="round" />
          <path d="M40 96 A38 38 0 0 1 24 50" fill="none" stroke="var(--brand)" strokeWidth={7} strokeLinecap="round" />
          <text x={60} y={135} {...T} fontSize={13}>Fechamento</text>
          <text x={60} y={153} {...Muted} fontSize={11}>vemos um círculo</text>
        </g>
      </svg>
    </Figure>
  )
}

const MockCard = ({ good }: { good: boolean }) => (
  <div
    className="rounded-2xl border border-black/10 bg-white text-[#1f1b2e] shadow-sm"
    style={{ padding: good ? 16 : 10, fontFamily: 'Nunito, sans-serif' }}
  >
    <div className="mb-2 h-20 rounded-xl" style={{ background: 'linear-gradient(135deg,#ffd1e3,#c9b8ff)' }} />
    <div style={{ fontSize: good ? 18 : 14, fontWeight: good ? 900 : 600 }}>Corte + escova</div>
    <div style={{ fontSize: good ? 13 : 14, color: good ? '#6b6880' : '#1f1b2e', fontWeight: 600, marginTop: good ? 2 : 0 }}>
      Studio Bela · 1,2 km · ★ 4,8
    </div>
    <div style={{ fontSize: good ? 20 : 14, fontWeight: good ? 900 : 600, marginTop: good ? 10 : 2, color: good ? '#1f1b2e' : '#1f1b2e' }}>
      R$ 89
    </div>
    <div
      style={{
        marginTop: good ? 12 : 4,
        background: good ? '#7c4dff' : 'transparent',
        color: good ? '#fff' : '#1f1b2e',
        border: good ? 'none' : '1px solid #ccc',
        borderRadius: 12,
        padding: good ? '10px 0' : '4px 0',
        textAlign: 'center',
        fontWeight: good ? 900 : 600,
        fontSize: 14,
      }}
    >
      Agendar
    </div>
  </div>
)

export function Hierarchy() {
  return (
    <Figure caption="Mesmo conteúdo, hierarquias diferentes. Tamanho, peso, cor e espaço dizem o que é mais importante.">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
        <div>
          <div className="mb-2 text-center text-sm font-black text-bad-ink">✗ Tudo igual</div>
          <MockCard good={false} />
        </div>
        <div>
          <div className="mb-2 text-center text-sm font-black text-ok-ink">✓ Com hierarquia</div>
          <MockCard good />
        </div>
      </div>
    </Figure>
  )
}

export function Grid8pt() {
  const scale = [4, 8, 12, 16, 24, 32, 48, 64]
  return (
    <Figure caption="Escala de espaçamento baseada em 8 (com 4 para ajustes finos). Use sempre valores da escala.">
      <div className="mx-auto flex max-w-md flex-col gap-1.5">
        {scale.map((s) => (
          <div key={s} className="flex items-center gap-3">
            <span className="w-10 text-right text-sm font-black text-muted">{s}</span>
            <div className="h-5 rounded bg-brand/80" style={{ width: s * 4 }} />
            {s === 8 && <span className="text-xs font-bold text-muted">← unidade base</span>}
          </div>
        ))}
      </div>
    </Figure>
  )
}

export function TypeScale() {
  const sizes = [
    { px: 12, name: 'Legenda' },
    { px: 14, name: 'Texto pequeno' },
    { px: 16, name: 'Texto (corpo)' },
    { px: 20, name: 'Subtítulo' },
    { px: 25, name: 'Título 3' },
    { px: 31, name: 'Título 2' },
    { px: 39, name: 'Título 1' },
  ]
  return (
    <Figure caption="Escala tipográfica com razão 1,25 (terça maior) a partir de 16 px.">
      <div className="mx-auto flex max-w-lg flex-col gap-1">
        {sizes.map((s) => (
          <div key={s.px} className="flex items-baseline gap-3 border-b border-line pb-1">
            <span className="w-10 shrink-0 text-right text-xs font-black text-muted">{s.px}</span>
            <span className="truncate font-extrabold" style={{ fontSize: s.px, lineHeight: 1.25 }}>
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </Figure>
  )
}

export function Color603010() {
  return (
    <Figure caption="Regra 60-30-10: 60% cor dominante (neutra), 30% secundária, 10% de destaque para o que importa.">
      <div className="mx-auto max-w-md">
        <div className="flex h-10 overflow-hidden rounded-xl text-xs font-black">
          <div className="grid place-items-center bg-[#f4f1ea] text-[#5a5346]" style={{ width: '60%' }}>60% fundo</div>
          <div className="grid place-items-center bg-[#2f3a56] text-white" style={{ width: '30%' }}>30%</div>
          <div className="grid place-items-center bg-[#c2410c] text-white" style={{ width: '10%' }}>10%</div>
        </div>
        <div className="mx-auto mt-4 w-56 rounded-2xl bg-[#f4f1ea] p-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
          <div className="rounded-xl bg-[#2f3a56] p-3 text-white">
            <div className="text-xs font-bold opacity-80">Próximo horário</div>
            <div className="text-lg font-black">Sáb, 10:30</div>
          </div>
          <div className="mt-2 h-2 w-3/4 rounded bg-[#d9d3c6]" />
          <div className="mt-1.5 h-2 w-1/2 rounded bg-[#d9d3c6]" />
          <div className="mt-3 rounded-lg bg-[#c2410c] py-2 text-center text-sm font-black text-white">Confirmar</div>
        </div>
      </div>
    </Figure>
  )
}

export function ColorHarmony() {
  const hues = Array.from({ length: 12 }, (_, i) => i * 30)
  const R = 70
  const pos = (h: number, r = R) => [100 + r * Math.cos(((h - 90) * Math.PI) / 180), 100 + r * Math.sin(((h - 90) * Math.PI) / 180)] as const
  const sets = [
    { name: 'Complementar', hs: [260, 80] },
    { name: 'Análoga', hs: [230, 260, 290] },
    { name: 'Tríade', hs: [260, 20, 140] },
  ]
  return (
    <Figure caption="Harmonias no círculo cromático: complementar (opostas), análoga (vizinhas) e tríade (equidistantes).">
      <div className="flex flex-wrap justify-center gap-4">
        {sets.map((s) => (
          <div key={s.name} className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="h-32 w-32">
              {hues.map((h) => {
                const [x, y] = pos(h)
                return <circle key={h} cx={x} cy={y} r={16} fill={`hsl(${h} 80% 60%)`} opacity={s.hs.includes(h) ? 1 : 0.25} />
              })}
              <polygon
                points={s.hs.map((h) => pos(h, R).join(',')).join(' ')}
                fill="none"
                stroke="var(--ink)"
                strokeWidth={2.5}
              />
            </svg>
            <span className="text-sm font-black">{s.name}</span>
          </div>
        ))}
      </div>
    </Figure>
  )
}

const Badge = ({ ok, label }: { ok: boolean; label: string }) => (
  <span className={`chip ${ok ? 'bg-ok-soft text-ok-ink' : 'bg-bad-soft text-bad-ink'}`}>
    {ok ? '✓' : '✗'} {label}
  </span>
)

export function ContrastChecker() {
  const [fg, setFg] = useState('#7C4DFF')
  const [bg, setBg] = useState('#FFFFFF')
  const r = contrastRatio(fg, bg)
  return (
    <Figure caption="Brinque com as cores: o WCAG pede 4,5:1 para texto normal e 3:1 para texto grande (AA).">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-black/10 p-5" style={{ background: bg, color: fg }}>
          <div className="text-2xl font-black">Texto grande (24 px)</div>
          <div className="mt-1 text-base font-semibold">Texto normal: agende seu horário em poucos toques.</div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold">
          <label className="flex items-center gap-2">
            Texto <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-8 w-10 cursor-pointer rounded" />
          </label>
          <label className="flex items-center gap-2">
            Fundo <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-10 cursor-pointer rounded" />
          </label>
          <span className="ml-auto text-xl font-black">{formatRatio(r)}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge ok={passesAA(r)} label="AA texto normal" />
          <Badge ok={passesAA(r, true)} label="AA texto grande" />
          <Badge ok={passesAAA(r)} label="AAA texto normal" />
        </div>
      </div>
    </Figure>
  )
}

export function Atomic() {
  const steps = [
    {
      name: 'Átomos',
      ex: (
        <div className="flex flex-col items-center gap-1">
          <div className="h-2 w-10 rounded bg-ink/60" />
          <div className="h-4 w-12 rounded border-2 border-line-strong" />
          <div className="h-4 w-10 rounded bg-brand" />
        </div>
      ),
    },
    {
      name: 'Moléculas',
      ex: (
        <div className="flex items-center gap-1 rounded border-2 border-line-strong p-1">
          <div className="h-4 w-10 rounded bg-surface-2" />
          <div className="h-4 w-5 rounded bg-brand" />
        </div>
      ),
    },
    {
      name: 'Organismos',
      ex: (
        <div className="w-20 rounded border-2 border-line-strong p-1">
          <div className="flex items-center justify-between">
            <div className="h-3 w-3 rounded-full bg-brand" />
            <div className="flex items-center gap-0.5 rounded border border-line-strong p-0.5">
              <div className="h-2 w-6 rounded bg-surface-2" />
              <div className="h-2 w-2 rounded bg-brand" />
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Templates',
      ex: (
        <div className="flex h-16 w-12 flex-col gap-1 rounded border-2 border-line-strong p-1">
          <div className="h-2 rounded bg-line-strong" />
          <div className="h-5 rounded border border-dashed border-line-strong" />
          <div className="h-2 rounded border border-dashed border-line-strong" />
        </div>
      ),
    },
    {
      name: 'Páginas',
      ex: (
        <div className="flex h-16 w-12 flex-col gap-1 rounded border-2 border-brand p-1">
          <div className="h-2 rounded bg-brand" />
          <div className="h-5 rounded" style={{ background: 'linear-gradient(135deg,#ffd1e3,#c9b8ff)' }} />
          <div className="h-2 rounded bg-ok" />
        </div>
      ),
    },
  ]
  return (
    <Figure caption="Atomic Design (Brad Frost): peças pequenas se combinam em peças maiores.">
      <div className="flex min-w-[440px] items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.name} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="grid h-20 w-24 place-items-center rounded-xl bg-surface">{s.ex}</div>
              <span className="text-xs font-black">{s.name}</span>
            </div>
            {i < steps.length - 1 && <span className="mx-1 pb-6 font-black text-muted">→</span>}
          </div>
        ))}
      </div>
    </Figure>
  )
}

const SizingDemo = ({ w, label, mode }: { w?: string; label: string; mode: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-full rounded-xl border-2 border-dashed border-sky/60 p-2">
      <div
        className="mx-auto flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-black text-white"
        style={{ width: w }}
      >
        ★ {label}
      </div>
    </div>
    <span className="text-xs font-black">{mode}</span>
  </div>
)

export function AutoLayout() {
  return (
    <Figure caption="Auto Layout: hug abraça o conteúdo, fixed tem tamanho fixo e fill ocupa todo o espaço disponível.">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-3">
        <SizingDemo label="Salvar" mode="Hug (abraçar)" w="fit-content" />
        <SizingDemo label="Salvar" mode="Fixed (120 px)" w="120px" />
        <SizingDemo label="Salvar" mode="Fill (preencher)" w="100%" />
      </div>
      <div className="mx-auto mt-4 flex max-w-xs items-center gap-0 rounded-lg border-2 border-line-strong bg-surface text-xs font-black">
        <span className="bg-gold/30 px-2 py-3">16</span>
        <span className="rounded bg-brand px-2 py-1 text-white">ícone</span>
        <span className="bg-sky/30 px-1 py-3">8</span>
        <span className="rounded bg-brand px-2 py-1 text-white">texto</span>
        <span className="bg-gold/30 px-2 py-3">16</span>
        <span className="ml-auto pr-2 text-muted">padding 16 · gap 8</span>
      </div>
    </Figure>
  )
}

export function TouchTarget() {
  return (
    <Figure caption="Áreas de toque: iOS recomenda 44×44 pt, Android 48×48 dp. O WCAG 2.2 (AA) exige no mínimo 24×24 px.">
      <svg viewBox="0 0 520 170" className="mx-auto w-full max-w-xl">
        <g>
          <rect x={40} y={40} width={88} height={88} rx={14} fill="var(--ok-soft)" stroke="var(--ok)" strokeWidth={2.5} strokeDasharray="6 4" />
          <circle cx={84} cy={84} r={16} fill="var(--ok)" />
          <text x={84} y={150} {...T} fontSize={12} fill="var(--ok-ink)">48 × 48 ✓</text>
        </g>
        <g>
          <rect x={212} y={62} width={44} height={44} rx={10} fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={2.5} strokeDasharray="6 4" />
          <circle cx={234} cy={84} r={10} fill="var(--gold)" />
          <text x={234} y={150} {...T} fontSize={12} fill="var(--gold-ink)">24 × 24 mínimo</text>
        </g>
        <g>
          <rect x={380} y={74} width={20} height={20} rx={4} fill="var(--bad-soft)" stroke="var(--bad)" strokeWidth={2.5} strokeDasharray="4 3" />
          <circle cx={390} cy={84} r={6} fill="var(--bad)" />
          <circle cx={404} cy={92} r={26} fill="var(--ink)" opacity={0.12} />
          <text x={392} y={150} {...T} fontSize={12} fill="var(--bad-ink)">pequeno demais ✗</text>
        </g>
        <text x={260} y={18} {...Muted} fontSize={12}>a ponta do dedo cobre ~ 1 cm²</text>
      </svg>
    </Figure>
  )
}

export function ButtonStates() {
  const states = [
    { name: 'Padrão', style: { background: '#7c4dff', color: '#fff' } },
    { name: 'Hover', style: { background: '#6c3cf0', color: '#fff' } },
    { name: 'Pressionado', style: { background: '#5b2fd6', color: '#fff', transform: 'translateY(2px)' } },
    { name: 'Foco', style: { background: '#7c4dff', color: '#fff', outline: '3px solid #1cb0f6', outlineOffset: 2 } },
    { name: 'Desabilitado', style: { background: '#e3e1ea', color: '#a19db2' } },
    { name: 'Carregando', style: { background: '#7c4dff', color: '#fff', opacity: 0.85 } },
  ]
  return (
    <Figure caption="Um componente tem vários estados. Projete todos — não só o 'padrão'.">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-3">
        {states.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1.5">
            <div className="w-full rounded-xl px-3 py-2 text-center text-sm font-black" style={s.style}>
              {s.name === 'Carregando' ? '◌ Salvando…' : 'Salvar'}
            </div>
            <span className="text-xs font-bold text-muted">{s.name}</span>
          </div>
        ))}
      </div>
    </Figure>
  )
}
