import { ab, fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

const navItem = (label: string, active = false) =>
  `<div style="flex:1;text-align:center;font-size:10px;font-weight:800;color:${active ? '#7c4dff' : '#8a8799'}"><div style="width:18px;height:18px;border-radius:5px;margin:0 auto 2px;background:${active ? '#7c4dff' : '#d3cfe1'}"></div>${label}</div>`

export const u2: UnitDef = {
  title: 'Arquitetura de informação',
  goal: 'Organizar conteúdos e funcionalidades para que as pessoas encontrem o que precisam.',
  lessons: [
    {
      title: 'O que é arquitetura de informação',
      summary: 'Organizar, rotular, navegar e buscar — e os esquemas de organização.',
      minutes: 15,
      steps: [
        `## Uma biblioteca sem bibliotecária

Imagine uma biblioteca com 1 milhão de livros, sem nenhuma organização. Os livros estão lá — mas é impossível achar qualquer coisa.

**Arquitetura de informação (AI)** é a arte de **organizar e rotular** conteúdos e funcionalidades para que as pessoas **encontrem** o que precisam e **entendam** onde estão.

Segundo Louis Rosenfeld e Peter Morville (autores do livro clássico da área), a AI tem quatro sistemas:

1. **Organização**: como agrupar e categorizar o conteúdo.
2. **Rotulagem**: que nomes dar às coisas.
3. **Navegação**: como as pessoas se movem pelo produto.
4. **Busca**: como encontram algo digitando.`,
        match('Ligue o sistema da arquitetura de informação à pergunta', [
          ['Organização', 'Como agrupar o conteúdo?'],
          ['Rotulagem', 'Que nome dar a cada coisa?'],
          ['Navegação', 'Como a pessoa se move de um lugar a outro?'],
          ['Busca', 'Como a pessoa encontra algo digitando?'],
        ]),
        `## Esquemas de organização

Há várias formas de organizar a mesma informação:

- **Alfabética**: contatos do celular, glossários.
- **Cronológica**: feed de notícias, histórico de pedidos.
- **Geográfica**: lojas por bairro, clínicas no mapa.
- **Por tópico/assunto**: seções de um jornal (Esportes, Política).
- **Por tarefa**: "Pagar conta", "Segunda via", "Falar com atendimento".
- **Por público**: "Para você", "Para empresas".

A escolha depende de **como as pessoas pensam** sobre o conteúdo (modelo mental!). O pior erro é organizar pelo **organograma da empresa** ("Diretoria de Relacionamento > Gerência de Serviços"), que só faz sentido para quem trabalha lá.`,
        scenario(
          'O site de uma prefeitura organiza o menu por secretarias: "Secretaria de Finanças", "Secretaria de Obras", "Secretaria de Saúde"… O cidadão só quer "emitir a guia do IPTU".',
          'Que esquema de organização seria mais útil para o cidadão?',
          'Por tarefa: "Pagar IPTU", "Marcar consulta", "Pedir poda de árvore"…',
          ['Alfabético por nome das secretarias', 'Cronológico por data de criação', 'Manter por secretaria, mas com ícones'],
          'O cidadão não sabe (nem precisa saber) qual secretaria cuida do quê. Organizar por tarefa segue o modelo mental dele.',
        ),
        `## Rótulos: as palavras importam

Rótulos são os **nomes** dos itens de menu, botões, categorias e links. Um rótulo ruim esconde conteúdo que está bem ali.

Boas práticas:

- Use as **palavras das pessoas** (a pesquisa revela o vocabulário delas).
- Seja **específico**: "Recursos" e "Soluções" não dizem nada.
- Seja **consistente**: se é "Meus agendamentos" num lugar, não vire "Minhas reservas" em outro.
- Evite **siglas e jargão** internos.`,
        tf(
          'Um item de menu chamado "Soluções" é um bom rótulo porque serve para qualquer conteúdo.',
          false,
          'Exatamente por servir para tudo, não diz nada. Rótulos genéricos obrigam a pessoa a clicar para descobrir o que há dentro.',
        ),
        mc(
          'Qual a melhor fonte para escolher os rótulos de um produto?',
          'O vocabulário que as pessoas usuárias usam, descoberto em pesquisa',
          ['Os nomes dos departamentos da empresa', 'Os termos técnicos do time de desenvolvimento', 'Palavras em inglês, por serem mais modernas'],
          'Rótulos funcionam quando correspondem à linguagem de quem usa (heurística 2 de Nielsen!).',
        ),
        multi(
          'Quais são bons esquemas para organizar um app de salão?',
          ['Por tipo de serviço (cabelo, unhas, sobrancelha)', 'Por tarefa (agendar, remarcar, pagar)'],
          ['Pelo nome dos sócios do salão', 'Pela data de contratação das profissionais'],
          'Organize pelo modo como as clientes pensam e pelo que elas querem fazer.',
        ),
        fill(
          'Organizar o site pelo ___ da empresa é um erro comum, porque só faz sentido para quem trabalha lá.',
          'organograma',
          ['logotipo', 'público', 'tema'],
          'Pessoas usuárias não conhecem (nem precisam conhecer) a estrutura interna da organização.',
        ),
      ],
      flashcards: [
        ['Arquitetura de informação (AI)', 'Organizar e rotular conteúdos e funcionalidades para que as pessoas encontrem e entendam o que precisam.'],
        ['Rotulagem', 'Escolha dos nomes de menus, categorias, botões e links.'],
        ['Esquemas de organização', 'Formas de organizar: alfabética, cronológica, geográfica, por tópico, por tarefa, por público.'],
      ],
      resources: [
        { title: 'Information Architecture: Study Guide (NN/g)', url: 'https://www.nngroup.com/articles/ia-study-guide/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Card sorting e tree testing',
      summary: 'Descobrir como as pessoas agrupam o conteúdo — e validar se a estrutura funciona.',
      minutes: 15,
      steps: [
        `## Card sorting

No **card sorting**, as pessoas recebem cartões com itens de conteúdo e os **organizam em grupos** que façam sentido para elas. Revela o **modelo mental** do público.

- **Aberto**: as pessoas criam e nomeiam os grupos. Ótimo para **descobrir** categorias e vocabulário.
- **Fechado**: as categorias já existem e as pessoas só distribuem os cartões. Ótimo para **avaliar** se categorias definidas funcionam.
- **Híbrido**: categorias prontas, mas a pessoa pode criar novas.

Pode ser feito com cartões de papel numa mesa, no FigJam, ou em ferramentas online especializadas.`,
        match('Ligue o tipo de card sorting ao objetivo', [
          ['Aberto', 'Descobrir categorias e o vocabulário das pessoas'],
          ['Fechado', 'Avaliar se categorias já definidas funcionam'],
          ['Híbrido', 'Usar categorias prontas, mas permitir criar novas'],
        ]),
        scenario(
          'Um app de farmácia vai ser criado do zero e o time não sabe como as pessoas agrupariam os 60 tipos de produto.',
          'Qual tipo de card sorting é o mais indicado?',
          'Aberto, para descobrir as categorias que as pessoas criam',
          ['Fechado, com as categorias do fornecedor', 'Nenhum: basta copiar outro app', 'Tree testing'],
          'Sem categorias definidas, o card sorting aberto revela como o público pensa e que nomes usa.',
        ),
        `## Dicas de card sorting

- Use **30 a 60 cartões** (mais que isso cansa).
- Escreva os cartões com **palavras simples**, sem usar os nomes de categorias que você imagina (isso induz).
- Para ver padrões confiáveis em estudos online, recomenda-se em torno de **15 participantes** ou mais. Com poucos participantes presenciais, ele já gera ótimas conversas qualitativas.
- Peça para a pessoa **pensar em voz alta** enquanto organiza: as dúvidas dela são tão valiosas quanto os grupos.`,
        `## Tree testing

O **tree testing** faz o caminho inverso: **avalia** uma estrutura de navegação.

A pessoa recebe uma **árvore** só com os rótulos (sem visual nenhum) e uma tarefa: "Onde você clicaria para **remarcar um horário**?". Ela navega pelos níveis até escolher onde acha que está.

Mede:

- **Taxa de sucesso**: acertou o lugar?
- **Direto ou indireto**: foi direto ou voltou várias vezes?
- **Primeiro clique**: começou pelo caminho certo?

Como não tem visual, o teste mostra se o problema está na **estrutura e nos rótulos** — e não nas cores ou no layout.`,
        mc(
          'O que o tree testing avalia?',
          'Se as pessoas encontram itens numa estrutura de navegação, só com os rótulos',
          ['Se as cores da interface agradam', 'Como as pessoas criam categorias do zero', 'A velocidade de carregamento do site'],
          'Sem visual, ele isola a estrutura e os rótulos: se falhar, é a AI que precisa melhorar.',
        ),
        tf(
          'Card sorting e tree testing podem ser usados juntos: o primeiro para criar a estrutura e o segundo para validá-la.',
          true,
          'É uma combinação clássica: card sorting aberto → proposta de estrutura → tree testing.',
        ),
        multi(
          'Quais são boas práticas de card sorting?',
          ['Escrever cartões com palavras simples', 'Pedir para a pessoa pensar em voz alta', 'Usar uma quantidade razoável de cartões (30 a 60)'],
          ['Usar 300 cartões para cobrir tudo', 'Escrever nos cartões os nomes das categorias que você espera'],
          'Cartões demais cansam e cartões com os nomes das categorias induzem as respostas.',
        ),
        fill(
          'No tree testing, a pessoa navega por uma estrutura que tem apenas ___, sem nenhum visual.',
          'rótulos',
          ['imagens', 'cores', 'vídeos'],
          'Isolar os rótulos e a hierarquia mostra se a estrutura funciona por si só.',
        ),
      ],
      flashcards: [
        ['Card sorting', 'Método em que pessoas agrupam cartões de conteúdo para revelar seu modelo mental.'],
        ['Card sorting aberto vs. fechado', 'Aberto: as pessoas criam e nomeiam grupos. Fechado: distribuem em categorias já definidas.'],
        ['Tree testing', 'Teste que avalia se as pessoas encontram itens numa estrutura de navegação apenas com rótulos.'],
      ],
      resources: [
        { title: 'Card Sorting: Uncover Users\' Mental Models (NN/g)', url: 'https://www.nngroup.com/articles/card-sorting-definition/', kind: 'artigo', lang: 'en' },
        { title: 'Tree Testing (NN/g)', url: 'https://www.nngroup.com/articles/tree-testing/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Sitemaps e padrões de navegação',
      summary: 'Mapear a estrutura do produto e escolher a navegação certa para cada caso.',
      minutes: 15,
      steps: [
        `## Sitemap

O **sitemap** (mapa do site ou do app) é um diagrama que mostra a **hierarquia** de todas as páginas ou telas:

::sitemap

Ele ajuda a:

- Enxergar o **tamanho** do produto
- Planejar a **navegação**
- Alinhar o time sobre **o que existe e onde**
- Planejar o **conteúdo** de cada tela`,
        `## Largura × profundidade

- **Estrutura larga e rasa**: muitos itens no primeiro nível, poucos níveis. Mais fácil de achar, mas pode sobrecarregar (Lei de Hick).
- **Estrutura estreita e profunda**: poucos itens por nível, muitos níveis. Cada escolha é fácil, mas a pessoa clica mais e pode se perder.

Em geral, estruturas **mais largas e rasas** funcionam melhor — desde que os itens estejam bem organizados e rotulados.

## Tipos de navegação

- **Global**: presente em todo o produto (menu principal, barra inferior).
- **Local**: dentro de uma seção (abas de "Próximos" e "Histórico" em Agenda).
- **Contextual**: links dentro do conteúdo ("Veja também", "Agendar este serviço").
- **Utilitária**: funções de apoio (busca, perfil, ajuda, sair).`,
        match('Ligue o tipo de navegação ao exemplo', [
          ['Global', 'Barra inferior com Início, Agenda e Perfil'],
          ['Local', 'Abas "Próximos" e "Histórico" dentro de Agenda'],
          ['Contextual', 'Botão "Agendar este serviço" na página do serviço'],
          ['Utilitária', 'Ícone de busca e de ajuda no topo'],
        ]),
        `## Padrões de navegação no celular

- **Barra inferior (tab bar)**: 3 a 5 destinos principais, sempre visíveis. Ótima para os destinos mais usados — e ao alcance do polegar.
- **Menu hambúrguer** (☰): esconde a navegação num menu lateral. Economiza espaço, mas reduz a **descoberta** (o que está escondido é menos usado).
- **Abas no topo**: para alternar entre visões da mesma seção.
- **Navegação por pilha**: telas que se empilham, com botão "voltar".

Na web: **menu no topo**, **mega menu** para sites grandes, **breadcrumbs** ("Início > Serviços > Unhas") para mostrar onde a pessoa está.`,
        ab(
          'Para um app de agendamento com 4 áreas usadas com frequência, qual navegação é mais adequada?',
          `<div style="height:110px;display:flex;flex-direction:column;justify-content:space-between"><div style="display:flex;align-items:center;gap:8px"><div style="font-size:18px">☰</div><div style="font-weight:800;font-size:13px">Agenda Bela</div></div><div style="font-size:11px;color:#8a8799;text-align:center">(Início, Agenda, Serviços e Perfil escondidos no menu)</div><div></div></div>`,
          `<div style="height:110px;display:flex;flex-direction:column;justify-content:space-between"><div style="font-weight:800;font-size:13px">Agenda Bela</div><div style="display:flex;border-top:1px solid #eee;padding-top:6px">${navItem('Início', true)}${navItem('Agenda')}${navItem('Serviços')}${navItem('Perfil')}</div></div>`,
          'b',
          'Com poucos destinos usados com frequência, a barra inferior os deixa visíveis e ao alcance do polegar. O menu hambúrguer esconde e reduz o uso.',
        ),
        tf(
          'O menu hambúrguer aumenta a descoberta das funcionalidades, porque libera espaço na tela.',
          false,
          'Libera espaço, sim, mas o que está escondido é menos visto e menos usado. Use para itens secundários.',
        ),
        scenario(
          'Num site de loja grande, a pessoa entra direto numa página de produto vinda do Google e não sabe em que parte do site está.',
          'Que padrão de navegação ajuda a se localizar?',
          'Breadcrumbs (Início > Feminino > Calçados > Tênis)',
          ['Menu hambúrguer', 'Carrossel de banners', 'Pop-up de boas-vindas'],
          'Breadcrumbs mostram o caminho até a página atual e permitem subir de nível com um clique.',
        ),
        fill(
          'A barra de navegação inferior de um app deve ter, em geral, de 3 a ___ itens.',
          '5',
          ['10', '2', '12'],
          'Mais que 5 itens deixa os alvos pequenos e a decisão mais lenta. Itens secundários vão para um "Mais" ou para o perfil.',
        ),
        open(
          'Desenhe (no papel) o sitemap de um app que você usa muito. Quantos níveis ele tem? Que tipo de navegação global ele usa?',
          'Reconstruir a estrutura de apps conhecidos treina o olhar para arquitetura. Repare como os mais usados têm poucos destinos principais e níveis rasos.',
        ),
      ],
      flashcards: [
        ['Sitemap', 'Diagrama que mostra a hierarquia de páginas ou telas de um produto.'],
        ['Navegação global', 'Navegação presente em todo o produto, como a barra inferior ou o menu principal.'],
        ['Tab bar', 'Barra de navegação inferior com 3 a 5 destinos principais, comum em apps.'],
        ['Breadcrumbs', 'Trilha de navegação que mostra onde a pessoa está ("Início > Serviços > Unhas").'],
        ['Largura vs. profundidade', 'Estruturas largas e rasas tendem a funcionar melhor que estreitas e profundas.'],
      ],
      resources: [
        { title: 'Hamburger Menus and Hidden Navigation Hurt UX Metrics (NN/g)', url: 'https://www.nngroup.com/articles/hamburger-menus/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Card sorting com 3 pessoas + sitemap',
      summary: 'Descubra como seu público agrupa o conteúdo e transforme isso no sitemap do produto.',
      minutes: 180,
      tool: 'figjam',
      brief: `## Organizando o seu produto

Com a solução escolhida na semana passada, liste **tudo o que o produto vai ter**: funcionalidades e conteúdos (ex.: "agendar horário", "ver preços", "remarcar", "histórico", "endereço do salão", "formas de pagamento"…).

### Parte 1 — Card sorting aberto

- Crie de **20 a 30 cartões** (post-its no FigJam ou papel).
- Com **3 pessoas** do seu público (pode ser por chamada de vídeo, compartilhando o FigJam), peça que agrupem e deem nomes aos grupos, pensando em voz alta.
- Fotografe ou salve o resultado de cada pessoa.

### Parte 2 — Análise

- Compare os 3 resultados: que grupos se repetem? Que nomes as pessoas usaram? Onde houve dúvida?

### Parte 3 — Sitemap

- Desenhe o **sitemap** do produto com base no que aprendeu, indicando a **navegação global** escolhida.`,
      steps: [
        'Liste de 20 a 30 conteúdos e funcionalidades do seu produto em cartões.',
        'Conduza o card sorting aberto com 3 pessoas do perfil, pedindo que pensem em voz alta.',
        'Registre os grupos e nomes criados por cada pessoa.',
        'Compare os resultados e anote: grupos em comum, vocabulário usado, dúvidas.',
        'Desenhe o sitemap do produto no FigJam (2 a 3 níveis).',
        'Defina a navegação global (ex.: tab bar com 4 itens) e justifique.',
        'Anote 2 rótulos que você mudou por causa das palavras usadas pelas participantes.',
      ],
      deliverable: 'Link do FigJam com os 3 card sortings, a análise, o sitemap e a justificativa da navegação.',
      rubric: [
        'Criei de 20 a 30 cartões com linguagem simples',
        'Conduzi o card sorting com 3 pessoas do perfil',
        'Comparei os resultados e identifiquei padrões',
        'O sitemap tem uma hierarquia clara',
        'Escolhi e justifiquei a navegação global',
        'Ajustei rótulos com base no vocabulário das participantes',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Num app de banco, a opção de pedir segunda via do cartão fica em "Serviços > Gestão > Instrumentos de pagamento > Plásticos".',
      'Quais problemas de arquitetura de informação aparecem?',
      'Estrutura profunda demais e rótulos com jargão interno',
      ['Excesso de cores', 'Fonte pequena', 'Falta de animação'],
      'Quatro níveis e termos como "Instrumentos de pagamento" e "Plásticos" escondem uma tarefa comum. Algo como "Cartões > Pedir 2ª via" seria muito mais claro.',
    ),
    mc(
      'Qual método você usaria para VALIDAR se uma nova estrutura de menu funciona, sem interferência do visual?',
      'Tree testing',
      ['Card sorting aberto', 'Mapa de empatia', 'Crazy 8s'],
      'O tree testing usa só os rótulos e a hierarquia para medir se as pessoas encontram o que procuram.',
    ),
    tf(
      'Rótulos devem usar o vocabulário das pessoas usuárias, mesmo que seja diferente dos termos internos da empresa.',
      true,
      'A linguagem de quem usa é o que torna o conteúdo encontrável.',
    ),
  ],
}
