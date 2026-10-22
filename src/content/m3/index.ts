import { mc, multi, order, scenario, tf } from '../helpers'
import type { ModuleDef } from '../types'
import { u1 } from './u1'
import { u2 } from './u2'
import { u3 } from './u3'
import { u4 } from './u4'

export const m3: ModuleDef = {
  title: 'Estrutura e interação',
  tagline: 'Da ideia ao protótipo de baixa fidelidade',
  description:
    'Com o problema bem definido, você vai gerar e priorizar ideias, organizar a informação do produto, desenhar fluxos e wireframes e projetar como a interface responde às pessoas. No fim, terá um protótipo navegável testado com gente de verdade.',
  color: '#B45309',
  colorDark: '#8A3F06',
  badge: 'Arquiteta(o) de experiências',
  outcomes: [
    'Conduzir sessões de ideação e priorizar com critérios claros',
    'Organizar conteúdo com card sorting, sitemap e padrões de navegação',
    'Desenhar fluxos de usuário com caminhos de erro e alternativos',
    'Criar wireframes de baixa fidelidade com conteúdo realista',
    'Aplicar princípios de interação, estados e boas práticas de formulários',
    'Montar um protótipo navegável no Figma',
  ],
  units: [u1, u2, u3, u4],
  project: {
    title: 'Projeto 3: fluxo, wireframes e protótipo testado',
    summary: 'Transforme a pesquisa em solução: ideação, arquitetura, fluxo, wireframes e um protótipo lo-fi testado com 3 pessoas.',
    minutes: 600,
    tool: 'figma',
    brief: `## A segunda metade do seu estudo de caso

Este projeto conecta a pesquisa (mês 2) à solução. No fim, você terá um **protótipo de baixa fidelidade testado e iterado**.

### O que entregar (numa página do Figma, organizada em seções)

1. **Do problema à ideia**: a pergunta "Como poderíamos…?" escolhida, fotos dos Crazy 8s, matriz de priorização e a solução escolhida com justificativa.
2. **Escopo**: lista MoSCoW e as user stories principais.
3. **Arquitetura**: resultado do card sorting e o sitemap.
4. **Fluxo**: user flow completo do fluxo principal (com erros e alternativas).
5. **Wireframes**: todas as telas do fluxo principal + estados (vazio, carregando, erro).
6. **Protótipo**: link do protótipo navegável.
7. **Teste de guerrilha**: teste com **3 pessoas** do público (tarefa, observações, problemas encontrados).
8. **Iteração**: o que você mudou depois do teste — com o "antes e depois" de pelo menos 2 telas.
9. **Aprendizados**.

### Teste de guerrilha (versão rápida)

- Dê uma **tarefa** realista: "Imagine que você quer fazer pé e mão no sábado à tarde. Use o app para marcar."
- Peça para a pessoa **pensar em voz alta**.
- **Não ajude**. Observe e anote onde ela hesita, erra ou comenta algo.
- No fim, pergunte: "O que foi mais fácil? E o mais difícil?"`,
    steps: [
      'Organize uma página "Projeto 3" no Figma com as seções sugeridas.',
      'Traga os artefatos de ideação, priorização, escopo e arquitetura das últimas semanas.',
      'Revise o user flow e os wireframes, incluindo os estados.',
      'Garanta que o protótipo navega por todo o fluxo principal.',
      'Teste com 3 pessoas do público e registre tarefa, observações e problemas.',
      'Priorize os problemas e itere os wireframes (pelo menos 2 telas com antes/depois).',
      'Escreva os aprendizados e o que testaria na próxima rodada.',
    ],
    deliverable: 'Link do Figma com a página do Projeto 3 e o link do protótipo navegável.',
    rubric: [
      'A solução escolhida se conecta claramente à pesquisa do mês 2',
      'A priorização usa critérios explícitos',
      'Há sitemap baseado em card sorting',
      'O user flow inclui caminhos de erro e alternativos',
      'Os wireframes cobrem o fluxo principal e os estados importantes',
      'O protótipo navega pelo fluxo inteiro',
      'Testei com 3 pessoas do público sem ajudá-las',
      'Iterei com base no teste e mostrei o antes/depois',
      'A página está organizada e fácil de seguir',
    ],
    tips: [
      'Grave a tela do celular durante o teste (com autorização): trechos curtos vão enriquecer seu estudo de caso.',
      'Não se apegue: se o teste mostrou que algo não funciona, mude sem dó.',
    ],
  },
  examExtra: [
    scenario(
      'O time escolheu construir um "programa de fidelidade com pontos" como primeira entrega, mas a maior dor da pesquisa é a falta de lembretes, que é simples de resolver.',
      'Qual ferramenta ajudaria o time a reavaliar a prioridade?',
      'Matriz impacto × esforço, ligando cada ideia às dores da pesquisa',
      ['Card sorting fechado', 'Mapa de empatia', 'Teste A/B'],
      'A matriz deixa claro que o lembrete é um ganho rápido, enquanto o programa de pontos é uma grande aposta.',
    ),
    order(
      'Ordene as etapas do Módulo 3 como elas costumam acontecer num projeto:',
      ['Ideação e priorização', 'Arquitetura de informação', 'Fluxo de usuário', 'Wireframes', 'Protótipo navegável e teste'],
      'Da ideia à estrutura, ao caminho, às telas e, por fim, ao teste.',
    ),
    multi(
      'Quais são sinais de que um protótipo lo-fi está pronto para teste?',
      ['O fluxo principal pode ser percorrido do início ao fim', 'Há uma tarefa realista definida para o teste', 'O conteúdo é realista'],
      ['As cores finais da marca foram aplicadas', 'Todas as animações foram refinadas'],
      'Para testar o fluxo, basta navegar e ter conteúdo realista. O visual vem depois.',
    ),
    mc(
      'Qual é a diferença entre card sorting e tree testing?',
      'Card sorting ajuda a criar a estrutura; tree testing avalia uma estrutura existente',
      ['São a mesma coisa com nomes diferentes', 'Card sorting avalia cores; tree testing avalia textos', 'Tree testing só funciona no papel'],
      'Um gera (como as pessoas agrupam), o outro valida (se as pessoas encontram).',
    ),
    tf(
      'Uma affordance só é útil se a pessoa percebê-la — por isso os significantes são tão importantes em telas.',
      true,
      'Em interfaces digitais, as possibilidades de ação precisam ser sinalizadas visualmente.',
    ),
    scenario(
      'Ao abrir a tela "Meus pedidos" pela primeira vez, o app mostra apenas o texto "Lista vazia".',
      'Como melhorar esse estado vazio?',
      'Explicar o que vai aparecer ali e oferecer a primeira ação ("Faça seu primeiro pedido")',
      ['Esconder a tela até haver pedidos', 'Mostrar um código de erro', 'Deixar a tela em branco'],
      'Estados vazios são oportunidades de orientar e engajar.',
    ),
  ],
}
