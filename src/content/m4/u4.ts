import { ab, fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

const icon = (glyph: string, label?: string) =>
  `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;font-weight:700;color:#3d3a4f"><div style="font-size:18px">${glyph}</div>${label ?? ''}</div>`

export const u4: UnitDef = {
  title: 'Design systems, plataformas e ícones',
  goal: 'Entender design systems e tokens, as regras de cada plataforma e o uso de ícones e imagens.',
  lessons: [
    {
      title: 'Design systems e design tokens',
      summary: 'O que é um design system, exemplos famosos (inclusive do gov.br) e tokens.',
      minutes: 20,
      steps: [
        `## Mais que uma biblioteca de componentes

Um **design system** é o conjunto de **padrões, componentes, regras e documentação** que permite a um time criar produtos consistentes em escala. Ele inclui:

- **Fundamentos**: cores, tipografia, espaçamentos, grids, ícones, sombras, movimento.
- **Componentes**: botões, campos, cards… com variantes e estados.
- **Padrões**: como resolver problemas recorrentes (formulários, mensagens de erro, estados vazios).
- **Documentação**: quando usar, quando **não** usar, acessibilidade, exemplos.
- **Governança**: quem mantém, como propor mudanças, versões.

E existe **em dois lugares**: no Figma (para designers) e no código (para devs). Os dois precisam andar juntos.`,
        multi(
          'O que costuma fazer parte de um design system?',
          ['Componentes com variantes e estados', 'Documentação de uso', 'Fundamentos como cores e tipografia', 'Regras de governança'],
          ['As personas do produto'],
          'Personas pertencem à pesquisa de um produto, não ao design system.',
        ),
        `## Exemplos para estudar

- **Material Design 3** (Google) — a base de muitos apps Android.
- **Human Interface Guidelines** (Apple) — o guia oficial de iOS e macOS.
- **Carbon** (IBM), **Polaris** (Shopify), **Atlassian Design System**.
- **Padrão Digital de Governo — gov.br Design System**: o design system do governo federal brasileiro, aberto e documentado em português. Ótimo para estudar acessibilidade e serviços públicos.

Visitar esses sites é um curso gratuito de UI: veja como eles documentam cada componente.`,
        `## Design tokens

**Tokens** são decisões de design guardadas como **variáveis com nome**: em vez de "#7C4DFF", usamos "cor-primária".

Eles costumam ter camadas:

- **Primitivos (globais)**: o valor bruto. "roxo-500 = #7C4DFF", "espaço-4 = 16px".
- **Semânticos (de uso)**: o significado. "cor-ação-primária = roxo-500", "cor-texto-erro = vermelho-700".
- **De componente** (opcional): "botão-fundo = cor-ação-primária".

Por que isso importa? Para criar um **modo escuro**, você só troca o valor de "cor-fundo" — e tudo se atualiza. Para mudar a marca, troca os primitivos.

No Figma, tokens são criados com **variáveis** (e modos, como claro/escuro). No código, viram variáveis CSS ou constantes.`,
        match('Ligue o tipo de token ao exemplo', [
          ['Primitivo', 'roxo-500 = #7C4DFF'],
          ['Semântico', 'cor-ação-primária = roxo-500'],
          ['De componente', 'botão-primário-fundo = cor-ação-primária'],
        ]),
        scenario(
          'Uma empresa decidiu lançar o modo escuro do app. No design system, todas as cores foram aplicadas direto pelo código hexadecimal em cada componente.',
          'O que teria facilitado essa mudança?',
          'Usar tokens semânticos (ex.: cor-fundo, cor-texto) com valores diferentes para cada modo',
          ['Usar mais cores diferentes', 'Desenhar cada tela de novo à mão', 'Remover as cores do app'],
          'Com tokens semânticos, o modo escuro é "só" trocar valores — os componentes continuam iguais.',
        ),
        tf(
          'Um design system precisa existir apenas no Figma; o código pode seguir seu próprio caminho.',
          false,
          'Design system de verdade conecta design e código. Se os dois divergirem, a consistência some.',
        ),
        mc(
          'Por que a documentação ("quando usar e quando não usar") é tão importante num design system?',
          'Porque componentes sem orientação são usados de jeitos diferentes e a consistência se perde',
          ['Porque deixa o arquivo do Figma mais pesado', 'Porque substitui os testes com usuários', 'Porque é exigida por lei'],
          'Um botão bem desenhado usado no lugar errado continua sendo um problema. A documentação ensina o uso certo.',
        ),
        fill(
          'O design system do governo federal brasileiro é o Padrão Digital de Governo, conhecido como ___ Design System.',
          'gov.br',
          ['SUS', 'Serpro', 'Brasil.io'],
          'É aberto, em português e com forte foco em acessibilidade.',
        ),
      ],
      flashcards: [
        ['Design system', 'Conjunto de fundamentos, componentes, padrões, documentação e governança para criar produtos consistentes.'],
        ['Design tokens', 'Decisões de design guardadas como variáveis nomeadas (cores, espaços, fontes).'],
        ['Token primitivo vs. semântico', 'Primitivo = valor bruto (roxo-500). Semântico = significado de uso (cor-ação-primária).'],
        ['gov.br Design System', 'Design system do governo federal brasileiro, aberto e com foco em acessibilidade.'],
      ],
      resources: [
        { title: 'Padrão Digital de Governo — gov.br Design System', url: 'https://www.gov.br/ds/', kind: 'site', lang: 'pt' },
        { title: 'Material Design 3', url: 'https://m3.material.io/', kind: 'site', lang: 'en' },
        { title: 'Human Interface Guidelines (Apple)', url: 'https://developer.apple.com/design/human-interface-guidelines/', kind: 'site', lang: 'en' },
      ],
    },
    {
      title: 'Plataformas: iOS, Android e web',
      summary: 'Áreas de toque, padrões de navegação, fontes do sistema e o modo escuro.',
      minutes: 15,
      steps: [
        `## Cada plataforma tem seu sotaque

Pessoas que usam iPhone estão acostumadas com os padrões da Apple; as de Android, com os do Google. Respeitar as convenções de cada plataforma é a Lei de Jakob em ação.

| | iOS (Apple) | Android (Google) |
|---|---|---|
| Guia | Human Interface Guidelines | Material Design 3 |
| Fonte do sistema | SF Pro | Roboto |
| Unidade | pt (pontos) | dp (density-independent pixels) |
| Navegação principal | Tab bar inferior | Navigation bar inferior |
| Voltar | Botão no canto superior esquerdo e gesto da borda | Botão/gesto de voltar do sistema |

Na prática, muitos apps usam um design **único** para as duas plataformas, mas respeitam diferenças importantes (como o voltar e componentes nativos como seletores de data).`,
        `## Áreas de toque

Dedos não são cursores de mouse. Uma área de toque pequena gera erros (e raiva).

::touch-target

- **iOS**: mínimo recomendado de **44×44 pt**.
- **Android**: **48×48 dp**.
- **WCAG 2.2** (critério 2.5.8, nível AA): mínimo de **24×24 px** para alvos (ou espaço suficiente ao redor).

Um ícone pode ser pequeno visualmente (24px) e ter uma **área de toque** maior ao redor (48px).`,
        mc(
          'Qual é a área de toque mínima recomendada pelo Material Design (Android)?',
          '48×48 dp',
          ['12×12 dp', '24×24 dp', '100×100 dp'],
          'O Android recomenda 48dp; a Apple, 44pt. O ícone pode ser menor, desde que a área tocável seja grande.',
        ),
        `## Outras diferenças que importam

- **Áreas seguras** (*safe areas*): o "notch", a barra de status e a barra de gestos inferior não podem esconder conteúdo importante.
- **Polegar**: em celulares grandes, o topo da tela é difícil de alcançar. Ações frequentes ficam **embaixo** (barra inferior, botões fixos no rodapé, bottom sheets).
- **Web**: hover existe no desktop, mas **não** no celular. Nunca esconda algo importante atrás de um hover.
- **Modo escuro**: não é só inverter cores. Use fundos cinza-escuro (não preto puro), reduza a saturação das cores e cuide do contraste de novo.`,
        tf(
          'Esconder informações importantes em um efeito de hover funciona bem tanto no desktop quanto no celular.',
          false,
          'Telas de toque não têm hover. O que só aparece com o mouse em cima fica inacessível no celular.',
        ),
        scenario(
          'Num app de agendamento, o botão "Confirmar" fica no topo direito da tela, num celular grande. Muitas pessoas usam o app com uma mão só.',
          'Qual melhoria considera melhor a ergonomia?',
          'Colocar o botão "Confirmar" na parte de baixo da tela, ao alcance do polegar',
          ['Diminuir o botão', 'Mover o botão para o topo esquerdo', 'Trocar o botão por um link de texto'],
          'A zona confortável do polegar fica na parte inferior e central da tela.',
        ),
        multi(
          'Quais cuidados valem para o modo escuro?',
          ['Usar fundos cinza-escuro em vez de preto puro', 'Revisar o contraste de todos os textos', 'Reduzir a saturação de cores muito vibrantes'],
          ['Apenas inverter todas as cores automaticamente', 'Manter as mesmas sombras fortes do modo claro'],
          'Modo escuro é um tema próprio, com decisões próprias — tokens semânticos ajudam muito.',
        ),
        match('Ligue a plataforma à recomendação de área de toque', [
          ['iOS', '44×44 pt'],
          ['Android', '48×48 dp'],
          ['WCAG 2.2 (AA)', 'Mínimo de 24×24 px'],
        ]),
        fill(
          'A fonte do sistema do iOS é a SF Pro, e a do Android é a ___.',
          'Roboto',
          ['Arial', 'Comic Sans', 'Helvetica'],
          'Usar as fontes do sistema dá sensação nativa e carrega mais rápido.',
        ),
      ],
      flashcards: [
        ['Área de toque mínima', 'iOS 44×44 pt; Android 48×48 dp; WCAG 2.2 AA (2.5.8): 24×24 px.'],
        ['Safe area', 'Área da tela livre de notch, barra de status e barra de gestos, onde o conteúdo importante deve ficar.'],
        ['Zona do polegar', 'Região inferior e central da tela, mais fácil de alcançar com uma mão.'],
        ['Modo escuro', 'Tema próprio: fundos cinza-escuro, saturação menor e contraste revisado — não é só inverter cores.'],
      ],
      resources: [
        { title: 'Touch Targets on Touchscreens (NN/g)', url: 'https://www.nngroup.com/articles/touch-target-size/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Ícones e imagens',
      summary: 'Ícones consistentes e com rótulo, bibliotecas gratuitas, fotos, ilustrações e texto alternativo.',
      minutes: 15,
      steps: [
        `## Ícones: menos universais do que parecem

Poucos ícones são entendidos por **todo mundo**: casa (início), lupa (busca), lixeira (excluir), engrenagem (configurações). A maioria é **ambígua** — um coração é "curtir", "favoritar" ou "saúde"?

**Regra de ouro**: na dúvida, coloque **rótulo de texto** junto do ícone. Ícone + texto é mais rápido de entender do que só ícone.`,
        ab(
          'Qual barra de navegação é mais fácil de entender?',
          `<div style="display:flex;justify-content:space-around;padding:6px 0">${icon('⌂')}${icon('▦')}${icon('✂')}${icon('◔')}</div>`,
          `<div style="display:flex;justify-content:space-around;padding:6px 0">${icon('⌂', 'Início')}${icon('▦', 'Agenda')}${icon('✂', 'Serviços')}${icon('◔', 'Perfil')}</div>`,
          'b',
          'Rótulos eliminam a adivinhação. Só ícones obrigam a pessoa a decorar ou testar cada um.',
        ),
        `## Consistência de ícones

- Use **uma única família** de ícones (mesmo estilo, mesma espessura de traço, mesmos cantos).
- Escolha um estilo: **contorno** (*outline*) ou **preenchido** (*filled*). Um truque comum: contorno para o estado normal, preenchido para o ativo.
- Tamanhos padronizados: **16, 20, 24px** (24 é o mais comum).
- Alinhe os ícones ao texto (centralizados verticalmente).

**Bibliotecas gratuitas**: Material Symbols (Google), Phosphor, Lucide, Heroicons, Tabler. No Figma, o plugin **Iconify** dá acesso a milhares.`,
        multi(
          'Quais práticas deixam a iconografia consistente?',
          ['Usar uma única família de ícones', 'Padronizar tamanhos (ex.: 24px)', 'Manter a mesma espessura de traço'],
          ['Misturar ícones de 4 bibliotecas diferentes', 'Usar tamanhos diferentes em cada tela'],
          'Consistência visual passa cuidado e facilita o reconhecimento.',
        ),
        tf(
          'Ícones como coração e estrela são universalmente entendidos e dispensam rótulo.',
          false,
          'Coração pode significar curtir, favoritar ou saúde; estrela pode ser favoritar ou avaliar. Rótulos evitam a ambiguidade.',
        ),
        `## Imagens

- **Fotos reais** do serviço e das pessoas geram mais confiança que bancos de imagem genéricos (aquela "equipe sorrindo apontando para um notebook" 😅).
- **Ilustrações** ajudam em estados vazios, onboarding e conceitos abstratos — mantenha um estilo único.
- Mantenha **proporções consistentes** (1:1, 4:3, 16:9) para listas e cards.
- **Otimize o peso**: imagens pesadas deixam o app lento (lembra do limite de Doherty?).
- Cuidado com **texto sobre imagem**: use sobreposição escura (ou clara) para garantir contraste.

## Texto alternativo (alt text)

Pessoas cegas usam **leitores de tela**, que leem um **texto alternativo** das imagens. Designers devem indicar:

- Imagens **informativas**: descrição do que importa ("Foto do resultado: unhas vermelhas com francesinha").
- Imagens **decorativas**: marcadas como decorativas, para o leitor ignorar.`,
        scenario(
          'Num card de serviço, o preço aparece em texto branco sobre uma foto clara de esmaltes. Em algumas fotos, o preço fica ilegível.',
          'Qual solução garante a legibilidade?',
          'Aplicar uma sobreposição escura (ou gradiente) atrás do texto, ou tirar o texto de cima da foto',
          ['Usar fonte mais fina', 'Escolher fotos ainda mais claras', 'Deixar como está'],
          'Texto sobre imagem precisa de contraste garantido em qualquer foto.',
        ),
        match('Ligue a imagem ao tratamento de texto alternativo', [
          ['Foto do resultado de um corte de cabelo', 'Descrever o que aparece'],
          ['Ondinha decorativa no fundo do cabeçalho', 'Marcar como decorativa'],
          ['Ícone de lupa sem texto num botão', 'Rótulo acessível "Buscar"'],
        ]),
        fill(
          'Pessoas cegas usam ___ de tela, que leem o texto alternativo das imagens.',
          'leitores',
          ['ampliadores', 'projetores', 'scanners'],
          'Leitores de tela (como VoiceOver no iPhone e TalkBack no Android) dependem de rótulos e textos alternativos.',
        ),
        open(
          'Abra seu app de banco ou de mensagens e encontre um ícone sem rótulo que você não tem certeza do que faz. Qual é? O que você acha que ele faz?',
          'Repare quantas vezes a gente "aprende" ícones por tentativa e erro. Para quem tem menos familiaridade com tecnologia, isso é uma barreira real.',
        ),
      ],
      flashcards: [
        ['Ícone + rótulo', 'Combinar ícone com texto torna o significado claro e mais rápido de reconhecer.'],
        ['Família de ícones', 'Conjunto com o mesmo estilo e espessura de traço; use apenas uma por produto.'],
        ['Texto alternativo (alt text)', 'Descrição de uma imagem lida por leitores de tela; imagens decorativas devem ser marcadas como tal.'],
        ['Leitor de tela', 'Tecnologia assistiva que lê a interface em voz alta (VoiceOver, TalkBack, NVDA).'],
      ],
      resources: [
        { title: 'Material Symbols (Google)', url: 'https://fonts.google.com/icons', kind: 'ferramenta' },
        { title: 'Phosphor Icons', url: 'https://phosphoricons.com/', kind: 'ferramenta' },
        { title: 'Icon Usability (NN/g)', url: 'https://www.nngroup.com/articles/icon-usability/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'O mini design system do seu projeto',
      summary: 'Junte fundamentos e componentes numa biblioteca organizada e documentada.',
      minutes: 300,
      tool: 'figma',
      brief: `## Seu primeiro design system

Reúna tudo o que você criou neste mês num **mini design system** do seu projeto.

### Estrutura sugerida (páginas no Figma)

1. **Capa**: nome do projeto, versão, data.
2. **Fundamentos**: cores (tokens primitivos e semânticos como variáveis, com modo claro e, se quiser, escuro), tipografia, espaçamentos (escala de 8), raios de borda, sombras, ícones.
3. **Componentes** (no mínimo 6): botão, campo de texto, card de serviço, item de lista, barra de navegação inferior, chip/tag. Cada um com variantes e estados.
4. **Documentação**: para cada componente, uma nota curta com **quando usar**, **quando não usar** e **cuidados de acessibilidade** (contraste, área de toque, foco).

### Desafio extra

Crie um **modo escuro** usando modos de variáveis no Figma e aplique em uma tela.`,
      steps: [
        'Organize o arquivo em páginas: Capa, Fundamentos, Componentes, Documentação.',
        'Transforme as cores em variáveis com tokens primitivos e semânticos.',
        'Documente a escala de espaçamento, raios e sombras.',
        'Escolha uma família de ícones e documente tamanhos e estilo.',
        'Garanta pelo menos 6 componentes com variantes e estados.',
        'Escreva a documentação de uso e acessibilidade de cada componente.',
        'Verifique áreas de toque (mín. 44–48) e contraste dos componentes.',
        'Desafio extra: modo escuro com modos de variáveis.',
      ],
      deliverable: 'Link do Figma com o mini design system (fundamentos, 6+ componentes e documentação).',
      rubric: [
        'Os fundamentos estão documentados (cor, tipografia, espaço, raio, ícones)',
        'As cores estão como variáveis com tokens semânticos',
        'Há pelo menos 6 componentes com variantes e estados',
        'Cada componente tem documentação de uso',
        'Considerei acessibilidade (contraste, foco, área de toque)',
        'Os ícones vêm de uma única família',
        'O arquivo está organizado e com nomes claros',
      ],
    },
  ],
  checkpointExtra: [
    mc(
      'Qual é a principal vantagem de usar tokens semânticos como "cor-texto-erro"?',
      'Mudar valores (tema, modo escuro, marca) sem alterar cada componente',
      ['Deixar os nomes das cores mais bonitos', 'Reduzir o número de telas', 'Dispensar testes de contraste'],
      'Tokens semânticos separam o significado do valor, facilitando mudanças em escala.',
    ),
    scenario(
      'Na barra inferior de um app, os ícones de "Agenda" e "Histórico" são muito parecidos e não têm rótulo.',
      'Qual é a melhor solução?',
      'Adicionar rótulos de texto abaixo dos ícones',
      ['Deixar os ícones maiores', 'Trocar as cores dos ícones', 'Adicionar uma animação'],
      'Rótulos resolvem a ambiguidade de forma simples e acessível.',
    ),
    tf(
      'No modo escuro, o ideal é usar preto puro (#000000) em todos os fundos.',
      false,
      'Fundos cinza-escuro reduzem o cansaço visual e permitem mostrar elevação com tons diferentes.',
    ),
  ],
}
