import { contrast, mc, multi, scenario, tf } from '../helpers'
import type { ModuleDef } from '../types'
import { u1 } from './u1'
import { u2 } from './u2'
import { u3 } from './u3'
import { u4 } from './u4'

export const m4: ModuleDef = {
  title: 'Design de interface (UI)',
  tagline: 'Dar forma visual clara, bonita e acessível',
  description:
    'Você vai aprender a criar interfaces visualmente claras: hierarquia, espaço, grids, tipografia, cor e contraste acessível. Depois, vai construir componentes com variantes e Auto Layout no Figma e montar o mini design system do seu projeto.',
  color: '#D1306F',
  colorDark: '#A5205A',
  badge: 'Designer de interface',
  outcomes: [
    'Criar hierarquia visual com tamanho, peso, cor e espaço',
    'Usar grids de colunas e a escala de 8 pontos',
    'Montar escalas tipográficas e paletas de cor funcionais',
    'Garantir contraste e uso de cor acessíveis (WCAG 2.2 AA)',
    'Construir componentes com variantes e Auto Layout no Figma',
    'Organizar um mini design system com tokens e documentação',
  ],
  units: [u1, u2, u3, u4],
  project: {
    title: 'Projeto 4: interface em alta fidelidade',
    summary: 'Transforme os wireframes testados em telas de alta fidelidade usando o seu mini design system.',
    minutes: 600,
    tool: 'figma',
    brief: `## Do esqueleto à pele

Agora os wireframes testados no mês 3 ganham **forma visual final**, construída **inteiramente com o seu design system**.

### O que entregar

1. **Telas em alta fidelidade** de todo o fluxo principal (5 a 8 telas), para celular.
2. **Estados**: vazio, carregando, erro e sucesso nas telas em que fazem sentido.
3. **Uma tela responsiva**: a tela mais importante também em versão desktop ou tablet.
4. **Protótipo de alta fidelidade** do fluxo principal (vamos aprofundar animações no mês 5).
5. **Notas de decisão**: 5 decisões visuais justificadas ("o preço tem 20px semibold porque é a informação que define a escolha, segundo a pesquisa").
6. **Checklist de acessibilidade**: contraste, áreas de toque, foco, ícones com rótulo, não depender só de cor.

### Regras

- Use **só componentes e variáveis** do seu design system. Se precisar de algo novo, crie no design system primeiro.
- Todos os espaçamentos na escala de 8.
- Conteúdo realista (nomes, preços, horários plausíveis).`,
    steps: [
      'Revise o design system e crie os componentes que ainda faltam para o fluxo.',
      'Monte as telas de alta fidelidade do fluxo principal com Auto Layout e componentes.',
      'Desenhe os estados vazio, carregando, erro e sucesso.',
      'Adapte a tela mais importante para desktop ou tablet usando o grid de 12 ou 8 colunas.',
      'Conecte o protótipo de alta fidelidade.',
      'Escreva as 5 notas de decisão visual.',
      'Rode o checklist de acessibilidade e corrija o que falhar.',
      'Peça feedback de 2 pessoas (uma do público e uma que entenda de design, se possível) e ajuste.',
    ],
    deliverable: 'Link do Figma com as telas hi-fi, estados, versão responsiva, protótipo, notas de decisão e checklist de acessibilidade.',
    rubric: [
      'As telas cobrem todo o fluxo principal em alta fidelidade',
      'Usei apenas componentes e variáveis do design system',
      'A hierarquia visual de cada tela é clara (teste de apertar os olhos)',
      'Os espaçamentos seguem a escala de 8',
      'Projetei os estados vazio, carregando, erro e sucesso',
      'Fiz uma versão responsiva da tela principal',
      'O protótipo hi-fi navega pelo fluxo',
      'Justifiquei 5 decisões visuais',
      'Passei no checklist de acessibilidade (contraste AA, toque, foco, rótulos)',
    ],
    tips: [
      'Coloque as telas lado a lado e compare: botões, títulos e espaços devem parecer da mesma família.',
      'Antes de achar que "falta algo", experimente remover algo.',
    ],
  },
  examExtra: [
    contrast('#6B6880', '#FFFFFF'),
    scenario(
      'Na tela de confirmação de pagamento, o título, o valor, os detalhes e três botões têm o mesmo tamanho e peso.',
      'Qual é a principal correção?',
      'Criar hierarquia: valor e título em destaque, detalhes em texto secundário e um único botão primário',
      ['Trocar a fonte por uma serifada', 'Deixar todos os textos em maiúsculas', 'Adicionar mais um botão'],
      'Sem hierarquia, a pessoa não sabe onde olhar nem o que fazer.',
    ),
    multi(
      'Quais escolhas estão de acordo com as boas práticas de UI?',
      ['Corpo de texto em 16px com entrelinha de ~1,5', 'Um botão primário por tela', 'Espaçamentos múltiplos de 8'],
      ['Cinco famílias de fontes', 'Status indicado apenas por cor', 'Área de toque de 20×20px'],
      'Legibilidade, foco e consistência são a base de uma boa interface.',
    ),
    mc(
      'Em qual nível do Atomic Design fica um campo de busca (campo + botão)?',
      'Molécula',
      ['Átomo', 'Template', 'Página'],
      'É um grupo simples de átomos com uma função.',
    ),
    tf(
      'Com Auto Layout, o comportamento "Fill container" faz o elemento ocupar todo o espaço disponível no frame pai.',
      true,
      'Hug abraça o conteúdo, Fixed é fixo e Fill preenche.',
    ),
    scenario(
      'Um app mostra o saldo em verde quando positivo e em vermelho quando negativo, sem sinal de + ou −.',
      'Quem é prejudicado e como corrigir?',
      'Pessoas daltônicas; incluir o sinal (+/−) ou texto além da cor',
      ['Ninguém; cores são universais', 'Pessoas idosas; aumentar o saldo', 'Pessoas com pressa; remover as cores'],
      'A cor não pode ser o único meio de transmitir informação (WCAG 1.4.1).',
    ),
  ],
}
