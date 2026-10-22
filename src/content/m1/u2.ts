import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u2: UnitDef = {
  title: 'O processo de design',
  goal: 'Conhecer os processos que designers usam para resolver problemas: Design Thinking, Double Diamond e Lean UX.',
  lessons: [
    {
      title: 'Design Thinking: as 5 etapas',
      summary: 'Empatizar, definir, idear, prototipar e testar — e por que não é uma linha reta.',
      minutes: 15,
      steps: [
        `## Um jeito de resolver problemas

**Design Thinking** é uma abordagem para resolver problemas colocando as **pessoas no centro**. Foi popularizada pela consultoria IDEO e pela d.school da Universidade de Stanford.

A ideia central: antes de sair construindo, **entenda profundamente quem tem o problema**, teste ideias rapidamente e aprenda com os erros cedo — quando errar ainda é barato.

::design-thinking

Vamos usar um exemplo durante a lição: **um salão de beleza de bairro quer reduzir as faltas nos agendamentos.**`,
        `## 1. Empatizar

Entender as pessoas envolvidas: o que fazem, sentem, pensam e precisam. **Sem julgar e sem propor solução ainda.**

No salão: conversar com clientes que faltaram, com as profissionais, observar como os agendamentos são feitos hoje (WhatsApp? caderninho? ligação?).

Você pode descobrir, por exemplo, que muita gente falta porque **marcou há 3 semanas e simplesmente esqueceu**.

## 2. Definir

Transformar o que aprendeu num **problema claro e focado**. Exemplo:

> Clientes que agendam com muita antecedência precisam de uma forma de lembrar do horário, porque esquecem e acabam faltando.`,
        mc(
          'O que caracteriza a etapa "Empatizar"?',
          'Entender as pessoas e o contexto delas, sem propor soluções ainda',
          ['Escolher a melhor ideia', 'Construir uma versão de teste', 'Desenhar as telas finais'],
          'Empatizar é ouvir e observar. A tentação de já pensar em solução é grande — segure-a um pouco!',
        ),
        `## 3. Idear

Gerar **muitas** ideias para o problema definido. Quantidade primeiro, qualidade depois. Nada de criticar na hora.

Para o salão: lembrete por WhatsApp, confirmação 1 dia antes, taxa para faltas, lista de espera para preencher horários vagos, agendamento com no máximo 1 semana de antecedência…

## 4. Prototipar

Construir uma **versão simples e barata** da ideia para testar. Pode ser um desenho no papel, telas no Figma ou até uma simulação manual (alguém mandando as mensagens "na mão").

## 5. Testar

Colocar o protótipo na frente de **pessoas reais** e observar. O lembrete funcionou? As pessoas confirmaram? O que confundiu?`,
        order(
          'Coloque as etapas do Design Thinking na ordem:',
          ['Empatizar', 'Definir', 'Idear', 'Prototipar', 'Testar'],
          'Empatizar → Definir → Idear → Prototipar → Testar. Mas lembre: é comum voltar etapas.',
        ),
        scenario(
          'O time do salão fez 20 ideias num quadro e agora quer escolher 2 para testar.',
          'Em que etapa do Design Thinking o time estava ao fazer as 20 ideias?',
          'Idear',
          ['Empatizar', 'Definir', 'Testar'],
          'Gerar muitas alternativas é a etapa de ideação. Depois, as melhores viram protótipos.',
        ),
        `## Não é uma escada, é um ciclo

As etapas **não são sequenciais e rígidas**. No teste você pode descobrir que entendeu o problema errado — e aí volta a empatizar. Ou um protótipo gera ideias novas.

Isso se chama **iterar**: repetir o ciclo, melhorando a cada volta.

> 💡 Errar no protótipo de papel custa minutos. Errar depois que o app foi programado custa meses. Por isso testamos cedo.`,
        tf(
          'No Design Thinking, depois que uma etapa termina, nunca se volta a ela.',
          false,
          'O processo é iterativo: voltar para empatizar ou redefinir o problema é normal e saudável.',
        ),
        fill(
          'Repetir o ciclo de criar, testar e melhorar várias vezes se chama ___.',
          'iterar',
          ['delegar', 'decorar', 'terceirizar'],
          'Iterar é fazer várias rodadas de melhoria, aprendendo com cada teste.',
        ),
        match('Ligue a etapa à atividade do exemplo do salão', [
          ['Empatizar', 'Conversar com clientes que faltaram'],
          ['Definir', 'Escrever: "clientes esquecem horários marcados há muito tempo"'],
          ['Prototipar', 'Simular lembretes mandando mensagens manualmente'],
          ['Testar', 'Ver se quem recebeu lembrete faltou menos'],
        ]),
      ],
      flashcards: [
        ['Design Thinking', 'Abordagem de resolução de problemas centrada nas pessoas, com 5 etapas: empatizar, definir, idear, prototipar e testar.'],
        ['Empatizar', 'Etapa de entender as pessoas, seu contexto e suas necessidades — sem propor soluções.'],
        ['Idear', 'Etapa de gerar muitas ideias para o problema definido, sem julgar na hora.'],
        ['Protótipo', 'Versão simplificada de uma ideia, feita para testar e aprender rápido e barato.'],
        ['Iterar', 'Repetir o ciclo de criar, testar e melhorar várias vezes.'],
      ],
      resources: [
        { title: 'Design Thinking 101 (NN/g)', url: 'https://www.nngroup.com/articles/design-thinking/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Double Diamond: problema certo, solução certa',
      summary: 'Divergir e convergir duas vezes: primeiro no problema, depois na solução.',
      minutes: 15,
      steps: [
        `## O modelo dos dois diamantes

Em 2005, o **Design Council** do Reino Unido estudou como grandes empresas faziam design e encontrou um padrão comum. Ele virou o **Double Diamond** (diamante duplo):

::double-diamond

O primeiro diamante garante que você está resolvendo **o problema certo**. O segundo, que está criando **a solução certa**.`,
        `## Divergir e convergir

Cada diamante tem dois movimentos:

- **Divergir** (abrir): explorar, coletar muita informação, gerar muitas opções.
- **Convergir** (fechar): analisar, escolher, focar.

As quatro fases:

1. **Descobrir** (divergir): pesquisar o problema de forma ampla.
2. **Definir** (convergir): sintetizar e escolher o problema a resolver.
3. **Desenvolver** (divergir): gerar e prototipar várias soluções.
4. **Entregar** (convergir): testar, refinar e lançar a melhor.`,
        order(
          'Ordene as quatro fases do Double Diamond:',
          ['Descobrir', 'Definir', 'Desenvolver', 'Entregar'],
          'Descobrir e Definir formam o diamante do problema; Desenvolver e Entregar, o da solução.',
        ),
        multi(
          'Quais fases do Double Diamond são de DIVERGIR (abrir possibilidades)?',
          ['Descobrir', 'Desenvolver'],
          ['Definir', 'Entregar'],
          'Descobrir e Desenvolver abrem possibilidades. Definir e Entregar fecham, escolhendo o foco.',
        ),
        `## A doença da "solucionite"

O erro mais comum de times sem processo é pular o primeiro diamante: alguém chega com a solução pronta ("vamos fazer um app!") antes de entender o problema.

Exemplo: o salão decide criar um aplicativo próprio. Seis meses depois, descobre que as clientes **não querem baixar mais um app** — elas só precisavam de um lembrete no WhatsApp.

> 💡 Frase para guardar: **"Apaixone-se pelo problema, não pela solução."**`,
        scenario(
          'O diretor de uma clínica chega na reunião dizendo: "Precisamos de um chatbot com inteligência artificial no site!". Ninguém conversou com pacientes ainda.',
          'Qual seria a postura mais alinhada ao Double Diamond?',
          'Investigar primeiro qual problema o chatbot resolveria, conversando com pacientes e analisando dados',
          ['Começar a desenhar o chatbot imediatamente', 'Recusar a ideia porque chatbots são ruins', 'Fazer uma votação no time'],
          'Antes de desenvolver a solução, garanta que entendeu o problema (primeiro diamante). Talvez o chatbot seja ótimo — ou talvez o problema seja outro.',
        ),
        tf(
          'O primeiro diamante do Double Diamond é sobre encontrar o problema certo.',
          true,
          'Sim: o primeiro diamante (Descobrir + Definir) foca no problema; o segundo (Desenvolver + Entregar), na solução.',
        ),
        `## Double Diamond × Design Thinking

São jeitos diferentes de desenhar a mesma ideia:

| Design Thinking | Double Diamond |
|---|---|
| Empatizar | Descobrir |
| Definir | Definir |
| Idear + Prototipar | Desenvolver |
| Testar | Entregar |

Nenhum é "o certo". Empresas adaptam os modelos à sua realidade. O importante é o espírito: **entender antes de resolver, testar antes de investir pesado**.`,
        match('Ligue a fase do Double Diamond à etapa equivalente do Design Thinking', [
          ['Descobrir', 'Empatizar'],
          ['Desenvolver', 'Idear e prototipar'],
          ['Entregar', 'Testar e lançar'],
        ]),
        fill(
          'Apaixone-se pelo ___, não pela solução.',
          'problema',
          ['cliente', 'design', 'chefe'],
          'Quem se apaixona pela solução defende a ideia mesmo quando ela não resolve nada. Quem se apaixona pelo problema muda de ideia quando aprende algo novo.',
        ),
        open(
          'Lembre de uma situação (no trabalho ou na vida) em que alguém pulou direto para a solução sem entender o problema. O que aconteceu?',
          'Isso é muito comum! Reconhecer a "solucionite" nos outros (e em nós mesmos) é um dos primeiros sinais de pensamento de designer.',
        ),
      ],
      flashcards: [
        ['Double Diamond', 'Modelo do Design Council com 4 fases: Descobrir, Definir (problema) e Desenvolver, Entregar (solução).'],
        ['Divergir', 'Abrir possibilidades: explorar, pesquisar, gerar muitas opções.'],
        ['Convergir', 'Fechar possibilidades: analisar, priorizar e escolher um foco.'],
        ['Solucionite', 'Vício de pular direto para a solução sem entender o problema.'],
      ],
      resources: [
        { title: 'The Double Diamond (Design Council)', url: 'https://www.designcouncil.org.uk/our-resources/the-double-diamond/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Design centrado no usuário, Lean UX e o mundo ágil',
      summary: 'Como o design se encaixa no dia a dia de times de tecnologia.',
      minutes: 15,
      steps: [
        `## Design centrado no usuário (UCD)

**UCD** (*User-Centered Design*) é a filosofia por trás de tudo que você está aprendendo. Ela até virou norma internacional (ISO 9241-210). Seus princípios, resumidos:

1. O design se baseia em um **entendimento claro** das pessoas, tarefas e contextos.
2. As pessoas usuárias **participam** do processo.
3. O design é guiado e refinado por **avaliações com pessoas**.
4. O processo é **iterativo**.
5. Considera a **experiência inteira**.
6. O time tem **habilidades diversas**.`,
        tf(
          'No design centrado no usuário, as pessoas usuárias só aparecem no fim, quando o produto já está pronto.',
          false,
          'Pelo contrário: elas participam desde o começo — sendo ouvidas, testando protótipos e validando decisões.',
        ),
        `## Times ágeis

A maioria das empresas de tecnologia trabalha com métodos **ágeis**, como o **Scrum**. Em vez de planejar tudo por um ano e entregar no fim, o trabalho é dividido em ciclos curtos chamados **sprints** (normalmente 2 semanas).

A cada sprint, o time entrega algo funcionando, aprende e ajusta o rumo.

Para design, isso significa: **você raramente vai ter meses para pesquisar**. Precisa aprender a pesquisar e testar de forma rápida e enxuta — e trabalhar um pouco "à frente" do time de desenvolvimento.`,
        fill(
          'No Scrum, o trabalho é dividido em ciclos curtos chamados ___.',
          'sprints',
          ['diamantes', 'personas', 'wireframes'],
          'Sprints são ciclos curtos (geralmente de 1 a 4 semanas) em que o time planeja, constrói e revisa.',
        ),
        `## Lean UX: aprender rápido com hipóteses

**Lean UX** traz o design para o ritmo ágil. Em vez de grandes documentos, trabalha com **hipóteses** que são testadas rapidamente:

> Acreditamos que **[enviar lembrete 1 dia antes]** para **[clientes que agendam com antecedência]** vai **[reduzir faltas]**. Saberemos que funcionou quando **[as faltas caírem 30% em um mês]**.

O ciclo é **Construir → Medir → Aprender**:

1. Construa a menor coisa possível para testar a hipótese (um **MVP**).
2. Meça o que aconteceu.
3. Aprenda e decida: seguir, ajustar ou abandonar.`,
        mc(
          'O que é um MVP (Minimum Viable Product)?',
          'A menor versão do produto que permite testar uma hipótese com pessoas reais',
          ['A versão final e completa do produto', 'Um documento com todas as funcionalidades', 'O produto mais vendido da empresa'],
          'MVP = Produto Mínimo Viável. É o "mínimo" para aprender algo, não um produto mal feito.',
        ),
        order(
          'Ordene o ciclo do Lean:',
          ['Construir', 'Medir', 'Aprender'],
          'Construir algo pequeno, medir o resultado e aprender para o próximo ciclo.',
        ),
        scenario(
          'Um time quer saber se clientes usariam um "plano de assinatura mensal" no salão. Construir o sistema completo levaria 3 meses.',
          'Qual seria uma abordagem no espírito Lean?',
          'Oferecer a assinatura para algumas clientes de forma manual (planilha + Pix) e medir o interesse',
          ['Construir o sistema completo e ver se dá certo', 'Fazer uma pesquisa perguntando se elas gostariam', 'Desistir porque é arriscado'],
          'Um teste manual é um MVP: barato, rápido e mostra comportamento real. Perguntar "você usaria?" é menos confiável que ver as pessoas realmente usando.',
        ),
        `## Processo é mapa, não trilho

Design Thinking, Double Diamond, Lean UX, UCD… Na vida real, nenhum time segue um modelo "de livro". Você vai adaptar:

- Projeto pequeno e urgente? Pesquisa rápida de 2 dias + teste com 5 pessoas.
- Projeto grande e incerto? Mais tempo nos dois diamantes.

O que **não muda**: entender pessoas, definir bem o problema, testar antes de investir e iterar.

> ✅ Numa entrevista de emprego, saber explicar **por que** você escolheu certo processo vale mais do que recitar as etapas.`,
        multi(
          'Quais princípios aparecem em TODOS os processos que vimos?',
          ['Entender as pessoas antes de resolver', 'Testar ideias cedo', 'Iterar'],
          ['Seguir as etapas sempre na mesma ordem, sem exceção', 'Entregar tudo de uma vez só no fim'],
          'Todos compartilham o espírito: pessoas no centro, testar cedo e melhorar em ciclos.',
        ),
        match('Ligue os termos', [
          ['UCD', 'Filosofia de design centrado nas pessoas'],
          ['Sprint', 'Ciclo curto de trabalho no Scrum'],
          ['Hipótese', 'Aposta que será testada e medida'],
          ['MVP', 'Menor versão para testar uma ideia'],
        ]),
      ],
      flashcards: [
        ['UCD (User-Centered Design)', 'Design centrado no usuário: filosofia (e norma ISO 9241-210) em que as pessoas participam e guiam o processo.'],
        ['Scrum / Sprint', 'Método ágil em que o trabalho é dividido em ciclos curtos (sprints), geralmente de 2 semanas.'],
        ['Lean UX', 'Abordagem que trata ideias como hipóteses e as testa rápido, no ciclo Construir → Medir → Aprender.'],
        ['MVP (Produto Mínimo Viável)', 'A menor versão de um produto que permite testar uma hipótese com pessoas reais.'],
        ['Hipótese de design', '"Acreditamos que [ação] para [pessoas] vai [resultado]. Saberemos quando [métrica]."'],
      ],
      resources: [
        { title: 'Lean UX — Jeff Gothelf e Josh Seiden', kind: 'livro', lang: 'pt', note: 'Referência sobre design em times ágeis (leitura opcional, para o mês 5).' },
      ],
    },
  ],
  practices: [
    {
      title: 'Primeiros passos no Figma',
      summary: 'Conheça a interface e crie seu primeiro cartão de perfil com frames, formas e textos.',
      minutes: 120,
      tool: 'figma',
      brief: `## Seu primeiro arquivo no Figma

O **Figma** é a ferramenta mais usada por designers de interface no mundo. Funciona no navegador (ou app para computador), é colaborativo e tem um plano gratuito.

Nesta prática você vai **conhecer a interface** e **criar um cartão de perfil** simples, como os de redes sociais.

### Conhecendo a tela (interface atual do Figma)

| Área | Para que serve |
|---|---|
| **Barra de ferramentas** (embaixo, no centro) | Mover, frame, formas, caneta, texto, comentários |
| **Painel esquerdo** | Páginas e camadas (*layers*) do arquivo |
| **Painel direito** | Propriedades do que está selecionado: tamanho, cor, texto… |
| **Canvas** (centro) | A área infinita onde você desenha |

### Atalhos que você vai usar sempre

- **F** ou **A**: Frame (a "tela" ou prancheta)
- **R**: Retângulo · **O**: Elipse · **T**: Texto
- **V**: Mover/selecionar · **Espaço + arrastar**: andar pelo canvas
- **Ctrl + D**: Duplicar · **Ctrl + G**: Agrupar · **Shift + 1**: Ver tudo

> 💡 No Mac, troque Ctrl por Cmd.`,
      steps: [
        'Entre em [figma.com](https://www.figma.com) e crie um arquivo novo de **Design** (botão "+" ou "New design file"). Renomeie para "Trilha UX — Práticas".',
        'Aperte **F** e, no painel direito, escolha um tamanho de celular (ex.: iPhone 16 ou Android Compact). Isso cria um **frame**.',
        'Dentro do frame, crie um **círculo** (O, segurando Shift para ficar perfeito) de 96×96 para ser a foto de perfil. Pinte de uma cor.',
        'Crie um **texto** (T) com seu nome, tamanho 24, negrito. Embaixo, outro texto com uma frase sua, tamanho 16.',
        'Crie um **retângulo** (R) de 280×48 com cantos arredondados (raio 12) e um texto "Seguir" centralizado em cima dele — seu primeiro botão!',
        'Selecione tudo (exceto o frame) e use os ícones de **alinhamento** no topo do painel direito para centralizar os elementos.',
        'Dê nomes às camadas no painel esquerdo (duplo clique): "Foto", "Nome", "Bio", "Botão".',
        'Exporte o frame como PNG: selecione o frame → painel direito → **Export** → PNG → Export.',
      ],
      deliverable: 'Link do arquivo do Figma (com permissão de visualização) ou o PNG exportado do cartão de perfil.',
      rubric: [
        'Criei um frame no tamanho de um celular',
        'Usei formas (círculo e retângulo) e textos',
        'O botão tem cantos arredondados e texto centralizado',
        'Os elementos estão alinhados ao centro',
        'As camadas têm nomes que fazem sentido',
        'Exportei o resultado ou compartilhei o link',
      ],
      tips: [
        'Errou? Ctrl + Z desfaz. Não tenha medo de explorar os menus.',
        'Segure Shift ao redimensionar para manter a proporção.',
        'Segure Alt (Option no Mac) com um elemento selecionado e passe o mouse sobre outro para ver as distâncias entre eles.',
      ],
      resources: [
        { title: 'Figma — canal oficial no YouTube', url: 'https://www.youtube.com/@Figma', kind: 'video', lang: 'en', note: 'Procure pela playlist "Figma for beginners".' },
        { title: 'Central de ajuda do Figma', url: 'https://help.figma.com/', kind: 'site', lang: 'en' },
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Uma startup lançou um app de receitas após 1 ano de desenvolvimento, sem mostrar a ninguém antes. Ninguém usa.',
      'Qual princípio do processo de design foi ignorado?',
      'Testar ideias cedo com pessoas reais, de forma iterativa',
      ['Usar as cores certas', 'Contratar mais desenvolvedores', 'Fazer mais propaganda'],
      'Sem testes cedo, o time só descobriu que errou depois de investir muito. Protótipos baratos e testes frequentes evitam isso.',
    ),
    mc(
      'Qual destas é uma hipótese bem escrita no formato Lean UX?',
      'Acreditamos que mostrar o preço antes do agendamento para novas clientes vai aumentar os agendamentos; saberemos quando subirem 15%',
      ['Vamos fazer um app bonito', 'As clientes querem um app', 'Precisamos melhorar a experiência'],
      'Uma boa hipótese diz o que vamos fazer, para quem, o resultado esperado e como vamos medir.',
    ),
    tf(
      'Convergir significa reduzir as opções e escolher um foco.',
      true,
      'Isso. Divergir abre; convergir fecha.',
    ),
  ],
}
