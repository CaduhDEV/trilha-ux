import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u4: UnitDef = {
  title: 'Trabalhando com produto e tecnologia',
  goal: 'Pensar como produto, medir resultados, entregar para desenvolvimento e colaborar com o time.',
  lessons: [
    {
      title: 'Pensamento de produto e métricas',
      summary: 'Discovery e delivery, métricas HEART, funis, OKRs e testes A/B.',
      minutes: 20,
      steps: [
        `## De projeto para produto

Na escola, um projeto tem começo, meio e fim. Num **produto** digital, o trabalho **nunca acaba**: lança, mede, aprende, melhora.

Times de produto trabalham em dois trilhos ao mesmo tempo (*dual track*):

- **Discovery** (descoberta): entender problemas e validar soluções — pesquisa, protótipos, testes. "Estamos construindo a coisa certa?"
- **Delivery** (entrega): construir e lançar com qualidade. "Estamos construindo a coisa do jeito certo?"

Designers atuam nos dois, mas o discovery é onde mais geram valor.`,
        match('Ligue a atividade ao trilho', [
          ['Entrevistar clientes sobre faltas', 'Discovery'],
          ['Testar um protótipo de lembrete', 'Discovery'],
          ['Revisar a implementação do botão com os devs', 'Delivery'],
          ['Lançar a nova tela de agendamento', 'Delivery'],
        ]),
        `## Como saber se deu certo? Métricas

O framework **HEART** (criado no Google) organiza métricas de experiência em cinco categorias:

| | Categoria | Exemplo no app de agendamento |
|---|---|---|
| **H** | Happiness (satisfação) | Nota SUS, avaliação na loja |
| **E** | Engagement (engajamento) | Agendamentos por cliente por mês |
| **A** | Adoption (adoção) | % de novas clientes que agendam pelo app |
| **R** | Retention (retenção) | % que volta a agendar em 60 dias |
| **T** | Task success (sucesso na tarefa) | % que conclui o agendamento sem erro |

Para cada categoria: **Objetivo → Sinal → Métrica** (*Goals, Signals, Metrics*). Ex.: objetivo "agendar ser fácil" → sinal "pessoas concluem sem abandonar" → métrica "taxa de conclusão do fluxo".`,
        match('Ligue a letra do HEART à métrica', [
          ['Happiness', 'Nota média na loja de apps'],
          ['Adoption', '% de clientes novas que fazem o primeiro agendamento'],
          ['Retention', '% de clientes que voltam a agendar em 60 dias'],
          ['Task success', 'Taxa de conclusão do fluxo de agendamento'],
        ]),
        `## Funis

Um **funil** mostra quantas pessoas passam por cada etapa de um fluxo — e onde desistem:

::funnel

O maior "degrau" é onde investigar primeiro (com analytics para o **onde** e pesquisa para o **porquê**). Ferramentas comuns: Google Analytics, Amplitude, Mixpanel; para ver comportamento, mapas de calor e gravações (Hotjar, Microsoft Clarity).

## OKRs e North Star

- **OKR** (*Objectives and Key Results*): objetivo inspirador + resultados-chave mensuráveis. Ex.: "Tornar o agendamento sem esforço" → "Reduzir faltas de 20% para 10%".
- **North Star Metric**: a métrica que melhor representa o valor entregue (ex.: "horários realizados por semana").`,
        scenario(
          'No funil de agendamento, 1.000 pessoas abrem o app, 620 escolhem o serviço, 410 escolhem o horário e apenas 180 confirmam.',
          'Onde a designer deve investigar primeiro?',
          'Na etapa entre escolher o horário e confirmar, que tem a maior queda proporcional',
          ['Na abertura do app', 'Na escolha do serviço', 'Em nenhuma: o funil está ótimo'],
          'De 410 para 180 é a maior perda. Ali há algum obstáculo: pedido de cadastro, pagamento, insegurança…',
        ),
        `## Teste A/B

No **teste A/B**, duas versões (A e B) são mostradas para grupos diferentes de pessoas **ao mesmo tempo**, e mede-se qual performa melhor numa métrica.

- Precisa de **muitas pessoas** para ter significância estatística.
- Testa **uma mudança por vez** (ou você não sabe o que causou a diferença).
- Mostra **o que** funciona melhor, mas não **por quê** — combine com pesquisa qualitativa.

Bom para otimizar (texto de botão, ordem de etapas); ruim para descobrir problemas novos.`,
        tf(
          'Um teste A/B com 30 visitantes é suficiente para decidir com segurança qual versão converte melhor.',
          false,
          'Testes A/B precisam de volume para que a diferença não seja fruto do acaso. Com poucas pessoas, prefira testes qualitativos.',
        ),
        multi(
          'Quais afirmações sobre métricas estão corretas?',
          ['O funil mostra onde as pessoas desistem', 'Analytics mostra o "quê"; pesquisa mostra o "porquê"', 'Um teste A/B deve mudar uma coisa por vez'],
          ['Métricas substituem a pesquisa com usuários', 'Quanto mais métricas, melhor, mesmo sem objetivo'],
          'Métricas precisam de objetivo e são complementadas pela pesquisa.',
        ),
        fill(
          'O framework de métricas do Google com as categorias Happiness, Engagement, Adoption, Retention e Task success se chama ___.',
          'HEART',
          ['POUR', 'CRAP', 'MoSCoW'],
          'HEART organiza métricas de experiência, sempre partindo de objetivos.',
        ),
      ],
      flashcards: [
        ['Discovery vs. delivery', 'Discovery: descobrir o que construir. Delivery: construir e lançar bem.'],
        ['HEART', 'Métricas de experiência: Happiness, Engagement, Adoption, Retention, Task success.'],
        ['Funil', 'Visualização de quantas pessoas passam por cada etapa de um fluxo e onde desistem.'],
        ['OKR', 'Objetivo inspirador + resultados-chave mensuráveis.'],
        ['Teste A/B', 'Comparar duas versões com grupos diferentes, ao mesmo tempo, numa métrica — precisa de volume.'],
      ],
      resources: [
        { title: 'Inspirado — Marty Cagan', kind: 'livro', lang: 'pt', note: 'Clássico sobre como times de produto trabalham.' },
        { title: 'Microsoft Clarity — mapas de calor gratuitos', url: 'https://clarity.microsoft.com/', kind: 'ferramenta' },
      ],
    },
    {
      title: 'Handoff e noções de front-end',
      summary: 'Preparar o arquivo para os devs, especificações, Dev Mode e o básico de HTML e CSS.',
      minutes: 20,
      steps: [
        `## Handoff: a passagem de bastão

**Handoff** é entregar o design para o time de desenvolvimento. Mas atenção: o melhor handoff **não é um evento**, é uma **conversa contínua**. Envolva os devs desde o começo (eles podem dizer cedo o que é difícil de construir).

**Um arquivo pronto para handoff tem:**

- Páginas organizadas: "Pronto para desenvolvimento", "Em andamento", "Arquivo".
- Telas com nomes claros e na ordem do fluxo.
- **Todos os estados**: vazio, carregando, erro, sucesso; estados dos componentes.
- **Casos extremos** (*edge cases*): nome muito longo, lista com 1 item e com 200 itens, sem foto.
- **Anotações** de comportamento: "o lembrete é enviado 24h antes"; animações (duração e curva).
- Uso de **componentes e variáveis** do design system (com os mesmos nomes do código, quando possível).
- **Comportamento responsivo**.`,
        multi(
          'O que deve estar num arquivo pronto para handoff?',
          ['Todos os estados das telas e componentes', 'Casos extremos, como textos muito longos', 'Anotações de comportamento e animação'],
          ['Apenas o estado ideal das telas', 'Camadas com nomes como "Rectangle 237"'],
          'Quanto menos os devs precisarem adivinhar, menos retrabalho.',
        ),
        `## Dev Mode e especificações

O **Dev Mode** do Figma é uma visão feita para desenvolvedores: mostra medidas, espaçamentos, cores e fontes (com os nomes das variáveis), trechos de código e permite marcar telas como **"pronto para desenvolvimento"**.

Mesmo com essas ferramentas, o designer precisa garantir:

- **Consistência**: se o espaçamento é 16 em uma tela e 15 em outra, o dev vai perguntar (ou errar).
- **Exportação de ativos**: ícones em **SVG**; imagens em PNG/JPG/WebP em resoluções 1×, 2×, 3×.
- **Nomes que fazem sentido**.

## Design QA

Depois que a tela é construída, o designer **revisa a implementação** (*design QA*): compara com o design, testa os estados e reporta diferenças com prints. É parte do trabalho!`,
        mc(
          'O que é design QA?',
          'Revisar a implementação construída pelos devs comparando com o design e testando os estados',
          ['Testar o protótipo com usuários', 'Pedir aprovação da diretoria', 'Criar o design system'],
          'A experiência final é a que está no ar — conferir a implementação faz parte do trabalho de design.',
        ),
        `## O básico de como sites são feitos

Você não precisa programar, mas entender o básico melhora muito a conversa com devs.

- **HTML**: a **estrutura** e o significado do conteúdo. Títulos (h1, h2), parágrafos, botões, links, listas, formulários. Usar o elemento certo (um botão de verdade é um botão!) é fundamental para a acessibilidade.
- **CSS**: a **aparência** — cores, fontes, espaçamentos, layout.
- **JavaScript**: o **comportamento** — interações, chamadas ao servidor.

## O box model

No CSS, todo elemento é uma **caixa** com camadas:

- **Conteúdo** (o texto ou a imagem)
- **Padding** (espaço interno)
- **Borda**
- **Margem** (espaço externo, até o próximo elemento)

Soa familiar? É o **Auto Layout**: o padding do Figma é o padding do CSS, e o gap do Auto Layout é o **gap** do **Flexbox**, o sistema de layout do CSS em que o Auto Layout foi inspirado.`,
        order(
          'Ordene as camadas do box model do CSS, de dentro para fora:',
          ['Conteúdo', 'Padding', 'Borda', 'Margem'],
          'Conteúdo → padding → borda → margem. O padding fica dentro da borda; a margem, fora.',
        ),
        match('Ligue a tecnologia ao seu papel', [
          ['HTML', 'Estrutura e significado do conteúdo'],
          ['CSS', 'Aparência e layout'],
          ['JavaScript', 'Comportamento e interações'],
          ['Flexbox', 'Sistema de layout do CSS parecido com o Auto Layout'],
        ]),
        tf(
          'Usar Auto Layout no Figma facilita a implementação, porque ele funciona de forma parecida com o Flexbox do CSS.',
          true,
          'Direção, gap, padding e alinhamento têm equivalentes diretos no Flexbox.',
        ),
        scenario(
          'O dev pergunta: "Se o nome da cliente tiver 40 caracteres, o que acontece no card?". A designer nunca pensou nisso.',
          'O que estava faltando no handoff?',
          'Definir casos extremos, como textos longos (quebra de linha ou reticências)',
          ['Mais cores no card', 'Um nome menor para a cliente', 'Uma persona nova'],
          'Edge cases são onde as interfaces quebram. Projete para o conteúdo real, não só para o exemplo perfeito.',
        ),
        fill(
          'Ícones devem ser exportados preferencialmente no formato ___, que não perde qualidade ao ampliar.',
          'SVG',
          ['JPG', 'GIF', 'BMP'],
          'SVG é vetorial: fica nítido em qualquer tamanho e é leve.',
        ),
      ],
      flashcards: [
        ['Handoff', 'Entrega do design para desenvolvimento — idealmente uma conversa contínua, não um evento.'],
        ['Edge cases (casos extremos)', 'Situações fora do comum: textos longos, listas vazias ou enormes, sem foto.'],
        ['Dev Mode', 'Visão do Figma para devs, com medidas, variáveis, código e status de "pronto para desenvolvimento".'],
        ['Design QA', 'Revisão da implementação comparando com o design.'],
        ['Box model', 'No CSS, cada elemento é uma caixa: conteúdo, padding, borda e margem.'],
        ['HTML / CSS / JavaScript', 'Estrutura / aparência / comportamento de uma página web.'],
      ],
      resources: [
        { title: 'MDN — Aprendendo HTML (em português)', url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content', kind: 'curso', lang: 'pt' },
        { title: 'Flexbox Froggy — jogo para aprender Flexbox', url: 'https://flexboxfroggy.com/#pt-br', kind: 'ferramenta', lang: 'pt', note: 'Divertido e em português. Você vai ver o Auto Layout em todo lugar!' },
      ],
    },
    {
      title: 'Colaboração: rituais ágeis, crítica e stakeholders',
      summary: 'Como trabalhar em time, dar e receber feedback e apresentar seu design.',
      minutes: 15,
      steps: [
        `## Rituais de um time ágil

No Scrum (que você conheceu no mês 1), os rituais mais comuns são:

- **Planning**: o time decide o que vai fazer na sprint.
- **Daily**: reunião curta diária — o que fiz, o que vou fazer, o que está me travando.
- **Review**: o time mostra o que foi feito para stakeholders.
- **Retrospectiva**: o time reflete sobre **como** trabalhou e o que melhorar.

Designers costumam trabalhar **uma ou duas sprints à frente** dos devs, para que o design esteja validado quando chegar a hora de construir.`,
        match('Ligue o ritual ao objetivo', [
          ['Planning', 'Decidir o que será feito na sprint'],
          ['Daily', 'Alinhar rapidamente o dia e os bloqueios'],
          ['Review', 'Mostrar o que foi entregue'],
          ['Retrospectiva', 'Melhorar a forma como o time trabalha'],
        ]),
        `## Design critique: crítica que constrói

Uma **crítica de design** é uma sessão em que colegas analisam um trabalho para **melhorá-lo**. Não é para dizer "gostei" ou "não gostei".

**Ao apresentar:**

1. Contexto: problema, público, objetivo.
2. Onde você está no processo (exploração? quase pronto?).
3. **Que tipo de feedback você quer** ("estou em dúvida se o fluxo de remarcar está claro").

**Ao dar feedback:**

- Conecte ao **objetivo**: "Para quem tem pressa, o botão de confirmar está longe do polegar".
- Faça **perguntas**: "O que levou você a colocar o preço no fim?"
- Seja específico e gentil; critique o trabalho, não a pessoa.
- Formato útil: **"Eu gosto… / Eu me pergunto… / E se…?"**`,
        scenario(
          'Numa crítica de design, um colega diz apenas: "Não gostei dessa tela."',
          'Como transformar isso num feedback útil?',
          'Ligar ao objetivo e ser específico, ex.: "Para a cliente com pressa, o horário está pouco visível; e se ele ficasse no topo?"',
          ['Dizer "gostei" para equilibrar', 'Ignorar o comentário', 'Pedir para ele refazer a tela'],
          'Feedback útil é específico, ligado ao objetivo e sugere caminhos.',
        ),
        `## Receber feedback

- **Escute** antes de defender. Anote.
- Pergunte para **entender** ("Você pode explicar o que te fez pensar isso?").
- Separe **você** do **seu trabalho** — a crítica é ao design.
- Você não precisa aceitar tudo: decida com base em **evidências** (pesquisa, testes, princípios).

## Apresentando para stakeholders

Estrutura que funciona:

1. **Problema e objetivo** (por que estamos aqui).
2. **O que aprendemos** (evidências da pesquisa).
3. **A solução** e as principais decisões.
4. **Evidências** de que funciona (resultados de teste).
5. **Próximos passos** e o que você precisa deles (decisão, aprovação, recursos).

Diante de objeções, volte às **evidências** e ao **objetivo** em comum — não à sua preferência pessoal.`,
        order(
          'Ordene uma apresentação de design para stakeholders:',
          ['Problema e objetivo', 'O que aprendemos com a pesquisa', 'A solução e as decisões', 'Evidências dos testes', 'Próximos passos e pedido'],
          'Contexto primeiro, decisão no fim — com evidências no meio.',
        ),
        tf(
          'Ao receber uma crítica, o ideal é defender imediatamente cada decisão para mostrar segurança.',
          false,
          'Primeiro entenda o feedback. Defender de imediato fecha a conversa e pode esconder um problema real.',
        ),
        mc(
          'Diante da objeção de um diretor ("não gosto desse fluxo"), qual é a melhor resposta?',
          'Perguntar o que o preocupa e trazer as evidências do teste ligadas ao objetivo em comum',
          ['Refazer tudo do jeito que ele quer, sem discutir', 'Dizer que ele não entende de design', 'Ignorar e seguir'],
          'Evidências e objetivos em comum tiram a conversa do campo do gosto pessoal.',
        ),
        fill(
          'Um formato útil de feedback é: "Eu gosto… / Eu me pergunto… / E ___?"',
          'se',
          ['então', 'depois', 'agora'],
          '"E se…?" abre possibilidades em vez de impor soluções.',
        ),
        open(
          'Pense numa crítica que você recebeu (em qualquer área da vida) que te ajudou muito. O que fez ela ser útil?',
          'Geralmente, críticas úteis são específicas, ligadas a um objetivo e feitas com respeito. É exatamente o padrão que você vai praticar (e pedir) no trabalho.',
        ),
      ],
      flashcards: [
        ['Retrospectiva', 'Ritual ágil para refletir sobre como o time trabalhou e o que melhorar.'],
        ['Design critique', 'Sessão de análise de um trabalho para melhorá-lo, ligada aos objetivos.'],
        ['"Eu gosto / Eu me pergunto / E se"', 'Formato de feedback construtivo e aberto.'],
        ['Apresentação para stakeholders', 'Problema → aprendizados → solução → evidências → próximos passos.'],
      ],
      resources: [
        { title: 'Discussing Design — Adam Connor e Aaron Irizarry', kind: 'livro', lang: 'en', note: 'Referência sobre crítica de design.' },
      ],
    },
  ],
  practices: [
    {
      title: 'Arquivo pronto para handoff',
      summary: 'Prepare o seu projeto como se fosse entregar para um time de desenvolvimento de verdade.',
      minutes: 240,
      tool: 'figma',
      brief: `## Pronto para construir

Prepare o arquivo do seu projeto como se ele fosse ser implementado amanhã.

### Checklist

- **Organização**: páginas "Pronto para dev", "Em andamento" e "Arquivo"; capa com status.
- **Telas** nomeadas e em ordem, agrupadas por fluxo (use seções).
- **Estados** de todas as telas e componentes.
- **Edge cases**: pelo menos 3 (texto longo, lista vazia, muitos itens, erro de rede…).
- **Anotações**: comportamentos, regras de negócio, animações (duração e curva), rótulos de acessibilidade.
- **Responsivo**: como as principais telas se comportam em outra largura.
- **Ativos**: ícones prontos para exportar em SVG.
- **Métricas**: 3 métricas HEART que você acompanharia após o lançamento.

### Desafio

Mostre o arquivo para alguém (de preferência alguém que programa) e peça para essa pessoa encontrar 3 coisas que ela precisaria perguntar. Corrija.`,
      steps: [
        'Reorganize as páginas e crie uma capa com status do projeto.',
        'Nomeie e ordene todas as telas por fluxo usando seções.',
        'Garanta que todos os estados e 3 edge cases estão desenhados.',
        'Adicione anotações de comportamento, animação e acessibilidade.',
        'Mostre o comportamento responsivo das telas principais.',
        'Prepare os ícones para exportação em SVG.',
        'Defina 3 métricas HEART (objetivo → sinal → métrica).',
        'Faça o desafio com outra pessoa e corrija o que ela apontou.',
      ],
      deliverable: 'Link do Figma do arquivo pronto para handoff, com a lista de métricas HEART.',
      rubric: [
        'O arquivo está organizado em páginas e seções com nomes claros',
        'Todos os estados estão desenhados',
        'Projetei pelo menos 3 casos extremos',
        'As anotações cobrem comportamento, animação e acessibilidade',
        'Mostrei o comportamento responsivo',
        'Os ícones estão prontos para exportar em SVG',
        'Defini 3 métricas HEART com objetivo, sinal e métrica',
        'Testei o arquivo com outra pessoa e corrigi as dúvidas',
      ],
      resources: [
        { title: 'Guide to Dev Mode (ajuda oficial do Figma)', url: 'https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Depois do lançamento do novo agendamento, a designer quer saber se as clientes voltam a usar o app.',
      'Qual categoria do HEART ela deve acompanhar?',
      'Retention (retenção)',
      ['Happiness', 'Adoption', 'Task success'],
      'Voltar a usar ao longo do tempo é retenção.',
    ),
    mc(
      'Qual é o equivalente do "gap" do Auto Layout no CSS?',
      'A propriedade gap do Flexbox',
      ['A margem do body', 'A cor de fundo', 'A fonte do título'],
      'Auto Layout e Flexbox compartilham os mesmos conceitos: direção, gap, padding e alinhamento.',
    ),
    tf(
      'O trabalho do designer termina quando o arquivo é enviado para os devs.',
      false,
      'Handoff é conversa contínua, e a revisão da implementação (design QA) faz parte do trabalho.',
    ),
  ],
}
