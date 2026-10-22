import { Arrow, Figure, Muted, T } from './Figure'

export function FlowNotation() {
  return (
    <Figure caption="Notação básica de fluxo: início/fim, tela, decisão e setas de ação.">
      <svg viewBox="0 0 520 250" className="mx-auto w-full max-w-xl">
        <Arrow id="fl" />
        <rect x={10} y={20} width={90} height={40} rx={20} fill="var(--ok)" />
        <text x={55} y={40} {...T} fill="#fff" fontSize={13}>Início</text>
        <line x1={100} y1={40} x2={130} y2={40} stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#fl)" />
        <rect x={134} y={18} width={110} height={44} rx={6} fill="var(--surface)" stroke="var(--brand)" strokeWidth={2.5} />
        <text x={189} y={40} {...T} fontSize={13}>Tela de login</text>
        <line x1={244} y1={40} x2={274} y2={40} stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#fl)" />
        <polygon points="340,0 404,40 340,80 276,40" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={2.5} />
        <text x={340} y={34} {...T} fontSize={12}>Senha</text>
        <text x={340} y={49} {...T} fontSize={12}>correta?</text>
        <line x1={404} y1={40} x2={434} y2={40} stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#fl)" />
        <text x={418} y={28} {...Muted} fontSize={11}>sim</text>
        <rect x={438} y={20} width={76} height={40} rx={20} fill="var(--ok)" />
        <text x={476} y={40} {...T} fill="#fff" fontSize={13}>Home</text>
        <line x1={340} y1={80} x2={340} y2={120} stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#fl)" />
        <text x={354} y={100} {...Muted} fontSize={11}>não</text>
        <rect x={276} y={124} width={128} height={44} rx={6} fill="var(--surface)" stroke="var(--bad)" strokeWidth={2.5} />
        <text x={340} y={146} {...T} fontSize={13}>Mensagem de erro</text>
        <path d="M276 146 H189 V66" fill="none" stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#fl)" />
        <text x={232} y={160} {...Muted} fontSize={11}>tentar de novo</text>
        <g transform="translate(0 196)">
          <rect x={10} y={10} width={44} height={22} rx={11} fill="var(--ok)" />
          <text x={100} y={21} {...Muted} fontSize={12}>início / fim</text>
          <rect x={160} y={10} width={44} height={22} rx={4} fill="none" stroke="var(--brand)" strokeWidth={2} />
          <text x={240} y={21} {...Muted} fontSize={12}>tela</text>
          <polygon points="300,6 322,21 300,36 278,21" fill="none" stroke="var(--gold)" strokeWidth={2} />
          <text x={362} y={21} {...Muted} fontSize={12}>decisão</text>
          <line x1={408} y1={21} x2={440} y2={21} stroke="var(--muted)" strokeWidth={2} markerEnd="url(#fl)" />
          <text x={478} y={21} {...Muted} fontSize={12}>ação</text>
        </g>
      </svg>
    </Figure>
  )
}

export function Sitemap() {
  const l2 = [
    { t: 'Serviços', kids: ['Cabelo', 'Unhas', 'Sobrancelha'] },
    { t: 'Agenda', kids: ['Próximos', 'Histórico'] },
    { t: 'Perfil', kids: ['Dados', 'Pagamentos'] },
  ]
  return (
    <Figure caption="Sitemap: a hierarquia de páginas/telas do produto.">
      <div className="mx-auto min-w-[420px] max-w-lg">
        <div className="mx-auto w-fit rounded-lg bg-brand px-5 py-2 font-black text-white">Início</div>
        <div className="mx-auto h-4 w-0.5 bg-line-strong" />
        <div className="mx-[16%] h-0.5 bg-line-strong" />
        <div className="grid grid-cols-3 gap-3">
          {l2.map((n) => (
            <div key={n.t} className="flex flex-col items-center">
              <div className="h-4 w-0.5 bg-line-strong" />
              <div className="w-full rounded-lg border-2 border-brand bg-surface px-2 py-1.5 text-center text-sm font-black">{n.t}</div>
              <div className="mt-2 flex w-full flex-col gap-1.5 border-l-2 border-line-strong pl-2">
                {n.kids.map((k) => (
                  <div key={k} className="rounded-md bg-surface px-2 py-1 text-xs font-bold text-muted">
                    {k}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Figure>
  )
}

export function WireframeExample() {
  const box = 'var(--line-strong)'
  return (
    <Figure caption="Wireframe de baixa fidelidade: só estrutura e hierarquia, sem cor nem estilo. Um X marca imagem.">
      <svg viewBox="0 0 220 400" className="mx-auto h-80">
        <rect x={4} y={4} width={212} height={392} rx={24} fill="var(--surface)" stroke={box} strokeWidth={3} />
        <rect x={20} y={28} width={24} height={24} rx={4} fill={box} />
        <rect x={56} y={34} width={90} height={12} rx={3} fill={box} />
        <rect x={176} y={28} width={24} height={24} rx={12} fill={box} />
        <rect x={20} y={70} width={180} height={34} rx={17} fill="none" stroke={box} strokeWidth={2.5} />
        <text x={50} y={88} {...Muted} fontSize={11} textAnchor="start">Buscar serviço…</text>
        <rect x={20} y={120} width={180} height={90} rx={10} fill="none" stroke={box} strokeWidth={2.5} />
        <line x1={20} y1={120} x2={200} y2={210} stroke={box} strokeWidth={2} />
        <line x1={200} y1={120} x2={20} y2={210} stroke={box} strokeWidth={2} />
        <rect x={20} y={222} width={130} height={12} rx={3} fill={box} />
        <rect x={20} y={242} width={170} height={8} rx={3} fill="var(--line)" />
        <rect x={20} y={256} width={150} height={8} rx={3} fill="var(--line)" />
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={20 + i * 94} y={280} width={86} height={50} rx={8} fill="none" stroke={box} strokeWidth={2.5} />
            <rect x={28 + i * 94} y={290} width={50} height={8} rx={3} fill={box} />
            <rect x={28 + i * 94} y={306} width={36} height={8} rx={3} fill="var(--line)" />
          </g>
        ))}
        <rect x={20} y={344} width={180} height={34} rx={10} fill={box} />
        <text x={110} y={361} {...T} fontSize={12} fill="var(--surface)">Agendar</text>
      </svg>
    </Figure>
  )
}

export function FPattern() {
  return (
    <Figure caption="Padrão em F: em páginas de texto, o olhar varre o topo, desce pela esquerda e faz varreduras curtas.">
      <svg viewBox="0 0 300 260" className="mx-auto w-full max-w-sm">
        <rect x={4} y={4} width={292} height={252} rx={12} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={2} />
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={20} y={24 + i * 22} width={260 - (i % 3) * 30} height={8} rx={3} fill="var(--line)" />
        ))}
        <rect x={16} y={16} width={268} height={26} rx={10} fill="var(--bad)" opacity={0.35} />
        <rect x={16} y={84} width={180} height={24} rx={10} fill="var(--gold)" opacity={0.4} />
        <rect x={16} y={16} width={44} height={230} rx={10} fill="var(--bad)" opacity={0.3} />
      </svg>
    </Figure>
  )
}

export function Fitts() {
  return (
    <Figure caption="Lei de Fitts: alvos maiores e mais próximos são mais rápidos (e fáceis) de atingir.">
      <svg viewBox="0 0 520 200" className="mx-auto w-full max-w-xl">
        <Arrow id="ft" />
        <text x={40} y={100} fontSize={30} textAnchor="middle" dominantBaseline="middle">👆</text>
        <line x1={64} y1={88} x2={455} y2={40} stroke="var(--bad)" strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#ft)" />
        <rect x={462} y={28} width={30} height={22} rx={5} fill="var(--bad)" />
        <text x={330} y={34} {...T} fontSize={12} fill="var(--bad-ink)">longe + pequeno = lento</text>
        <line x1={64} y1={112} x2={150} y2={140} stroke="var(--ok)" strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#ft)" />
        <rect x={156} y={118} width={190} height={56} rx={14} fill="var(--ok)" />
        <text x={251} y={146} {...T} fontSize={14} fill="#fff">Agendar horário</text>
        <text x={430} y={146} {...T} fontSize={12} fill="var(--ok-ink)">perto + grande = rápido</text>
        <text x={260} y={192} {...Muted} fontSize={11}>por isso a ação principal fica grande e ao alcance do polegar</text>
      </svg>
    </Figure>
  )
}

export function Hick() {
  const few = ['Corte', 'Escova', 'Coloração']
  const many = ['Corte fem.', 'Corte masc.', 'Escova', 'Progressiva', 'Hidratação', 'Coloração', 'Luzes', 'Mechas', 'Botox capilar', 'Penteado', 'Corte kids', 'Franja']
  return (
    <Figure caption="Lei de Hick: quanto mais opções, mais tempo para decidir. Agrupe, filtre ou destaque o mais comum.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-center text-sm font-black text-ok-ink">3 opções → decisão rápida</div>
          <div className="flex flex-col gap-1.5">
            {few.map((f) => (
              <div key={f} className="rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-sm font-bold">{f}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-center text-sm font-black text-bad-ink">12 opções → hesitação</div>
          <div className="grid grid-cols-3 gap-1">
            {many.map((f) => (
              <div key={f} className="rounded-md border border-line bg-surface px-1 py-1 text-center text-[10px] font-bold">{f}</div>
            ))}
          </div>
        </div>
      </div>
    </Figure>
  )
}
