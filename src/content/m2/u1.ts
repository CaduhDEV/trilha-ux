import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u1: UnitDef = {
  title: 'Fundamentos da pesquisa com usuários',
  goal: 'Entender por que e como pesquisar, escolher o método certo, planejar e pesquisar com ética.',
  lessons: [
    {
      title: 'Por que pesquisar — e os tipos de pesquisa',
      summary: '"Você não é o usuário", pesquisa qualitativa × quantitativa, atitudinal × comportamental.',
      minutes: 15,
      steps: [
        `## Você não é o usuário

A frase mais repetida em UX: **você não é o usuário**. Mesmo que você use o produto, você sabe demais sobre ele, tem outra idade, outro contexto, outras habilidades.

Sem pesquisa, decisões são tomadas por **achismo**: a opinião de quem fala mais alto na reunião (às vezes chamada de **HiPPO** — *highest paid person's opinion*, a opinião de quem ganha mais).

Pesquisa troca "eu acho" por **"nós vimos"**. Ela reduz o risco de gastar meses construindo a coisa errada.`,
        tf(
          'Se a designer usa o próprio produto todo dia, ela não precisa pesquisar com outros usuários.',
          false,
          'Quem cria o produto conhece demais seus detalhes e tem um contexto diferente. Isso cria pontos cegos que só pesquisa com pessoas reais revela.',
        ),
        `## Qualitativa × quantitativa

- **Qualitativa**: responde **por quê** e **como**. Poucos participantes, muita profundidade. Ex.: entrevistas, observação, testes de usabilidade.
- **Quantitativa**: responde **quanto**, **quantos**, **com que frequência**. Muitos participantes, números. Ex.: questionários, analytics, testes A/B.

Uma não é melhor que a outra: elas se **completam**. O analytics mostra que 60% desistem na tela de pagamento (quanto); entrevistas mostram que é porque o frete aparece só no final (por quê).`,
        match('Ligue a pergunta ao tipo de pesquisa mais adequado', [
          ['Quantas pessoas abandonam o cadastro?', 'Quantitativa'],
          ['Por que as pessoas abandonam o cadastro?', 'Qualitativa'],
          ['Qual % de clientes usa o app à noite?', 'Quantitativa'],
          ['Como as pessoas organizam a rotina de cuidados?', 'Qualitativa'],
        ]),
        `## O que dizem × o que fazem

- **Atitudinal**: o que as pessoas **dizem** — opiniões, crenças, preferências (entrevistas, questionários).
- **Comportamental**: o que as pessoas **fazem** — ações reais (observação, testes, analytics).

Atenção: o que as pessoas dizem e o que fazem **muitas vezes não batem**. Todo mundo "vai começar a academia segunda-feira". 😅 Por isso, sempre que possível, **observe comportamento**.

::research-quadrant`,
        scenario(
          'Num questionário, 80% das clientes de um salão disseram que "com certeza" usariam um app de agendamento. Depois do lançamento, só 10% usaram.',
          'O que essa diferença ilustra?',
          'A diferença entre o que as pessoas dizem (atitudinal) e o que fazem (comportamental)',
          ['Que questionários são sempre inúteis', 'Que o app tinha cores erradas', 'Que as clientes mentiram de propósito'],
          'Pessoas são otimistas sobre o próprio comportamento futuro. Pesquisas sobre comportamento real (o que já fazem hoje) são mais confiáveis.',
        ),
        `## Generativa × avaliativa

- **Generativa (exploratória)**: para **descobrir** problemas e oportunidades. Você ainda não tem solução. Ex.: entrevistas para entender como as pessoas agendam serviços hoje.
- **Avaliativa**: para **avaliar** uma solução existente ou proposta. Ex.: teste de usabilidade de um protótipo.

E ainda:

- **Primária**: você coleta os dados direto com as pessoas.
- **Secundária (desk research)**: você usa dados que já existem — relatórios, artigos, pesquisas de mercado, IBGE, avaliações na loja de apps.

> 💡 Comece **sempre** pela desk research: é barata e evita perguntar o que já se sabe.`,
        fill(
          'Pesquisar dados que já existem (relatórios, artigos, avaliações na loja de apps) se chama pesquisa secundária ou ___.',
          'desk research',
          ['teste A/B', 'card sorting', 'guerrilha'],
          'Desk research é o ponto de partida mais barato: leia o que já existe antes de ir a campo.',
        ),
        multi(
          'Quais destas são pesquisas avaliativas?',
          ['Teste de usabilidade de um protótipo', 'Avaliação heurística do app atual'],
          ['Entrevistas para entender como as pessoas cozinham em casa', 'Observar a rotina de uma manicure para descobrir oportunidades'],
          'Avaliativa avalia uma solução. Entender rotinas e descobrir oportunidades é pesquisa generativa.',
        ),
        open(
          'Pense numa decisão de produto que você viu ser tomada "no achismo" (pode ser em qualquer área: uma loja, um serviço público, um app). Que pesquisa simples teria ajudado?',
          'Muitas vezes, 5 conversas com pessoas reais bastam para mudar uma decisão. Pesquisa não precisa ser cara nem demorada para ser útil.',
        ),
      ],
      flashcards: [
        ['"Você não é o usuário"', 'Princípio de que quem cria o produto tem pontos cegos e não pode decidir só com base na própria experiência.'],
        ['Pesquisa qualitativa', 'Responde "por quê" e "como", com poucos participantes e muita profundidade.'],
        ['Pesquisa quantitativa', 'Responde "quanto" e "quantos", com muitos participantes e dados numéricos.'],
        ['Atitudinal vs. comportamental', 'Atitudinal = o que as pessoas dizem. Comportamental = o que as pessoas fazem.'],
        ['Pesquisa generativa', 'Pesquisa para descobrir problemas e oportunidades, antes de existir uma solução.'],
        ['Desk research', 'Pesquisa secundária: usar dados que já existem (relatórios, artigos, avaliações).'],
      ],
      resources: [
        { title: 'When to Use Which User-Experience Research Methods (NN/g)', url: 'https://www.nngroup.com/articles/which-ux-research-methods/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Escolhendo o método e escrevendo um plano de pesquisa',
      summary: 'Qual método para qual pergunta, e o plano que alinha todo mundo antes de ir a campo.',
      minutes: 20,
      steps: [
        `## A pergunta escolhe o método

Não comece pelo método ("vamos fazer um questionário!"). Comece pela **pergunta que você precisa responder**.

| Se você quer saber… | Método comum |
|---|---|
| Como as pessoas fazem algo hoje e por quê | **Entrevista** |
| O que elas realmente fazem no ambiente delas | **Observação / pesquisa contextual** |
| Comportamentos ao longo de dias ou semanas | **Estudo de diário** |
| Quantas pessoas pensam ou fazem algo | **Questionário** |
| Se conseguem usar uma solução | **Teste de usabilidade** |
| Como agrupam e nomeiam conteúdos | **Card sorting** |
| O que fazem no produto, em escala | **Analytics** |
| O que já se sabe e o que concorrentes fazem | **Desk research / benchmarking** |`,
        match('Ligue a pergunta ao método', [
          ['"Elas conseguem remarcar um horário no protótipo?"', 'Teste de usabilidade'],
          ['"Como manicures organizam a agenda hoje?"', 'Entrevista ou observação'],
          ['"Quantas clientes preferem ser lembradas por WhatsApp?"', 'Questionário'],
          ['"Como as pessoas agrupariam os serviços do salão?"', 'Card sorting'],
        ]),
        `## Observação e pesquisa contextual

A **pesquisa contextual** (*contextual inquiry*) é ir até o **ambiente real** da pessoa e observá-la fazendo a tarefa, fazendo perguntas no momento.

Exemplo: passar uma manhã no salão vendo a recepcionista atender o telefone, anotar no caderno, responder WhatsApp e lidar com clientes ao mesmo tempo. Você vai ver coisas que **ninguém lembraria de contar** numa entrevista: os post-its na parede, a cliente que liga três vezes, o caderno que fica molhado.

O modelo é o de **mestre e aprendiz**: a pessoa é a especialista na própria rotina; você está lá para aprender.`,
        scenario(
          'Você quer entender por que as atendentes de uma clínica demoram tanto para marcar consultas. Nas entrevistas, elas dizem que "é tudo tranquilo".',
          'Qual método revelaria melhor o que acontece de verdade?',
          'Observar as atendentes no ambiente de trabalho real (pesquisa contextual)',
          ['Mandar um questionário perguntando se é tranquilo', 'Fazer mais entrevistas iguais', 'Olhar apenas o site da clínica'],
          'O que as pessoas fazem nem sempre é o que dizem. Observar no contexto revela atalhos, gambiarras e dificuldades que viraram rotina.',
        ),
        `## O plano de pesquisa

Antes de ir a campo, escreva um **plano de pesquisa** de 1 a 2 páginas. Ele alinha o time e evita pesquisa sem foco.

1. **Contexto**: qual é a situação e por que pesquisar agora?
2. **Objetivo**: o que queremos aprender (1 frase).
3. **Perguntas de pesquisa**: 3 a 5 perguntas que queremos responder (não são as perguntas da entrevista!).
4. **Hipóteses**: o que achamos hoje (para confirmar ou derrubar).
5. **Método**: qual e por quê.
6. **Participantes**: perfil, critérios, quantidade.
7. **Roteiro**: o guia da sessão.
8. **Cronograma e entregáveis**: quando e o que será entregue.`,
        order(
          'Ordene as primeiras partes de um plano de pesquisa:',
          ['Contexto', 'Objetivo', 'Perguntas de pesquisa', 'Método', 'Participantes'],
          'Primeiro o porquê (contexto e objetivo), depois o que queremos saber, e só então como (método) e com quem (participantes).',
        ),
        tf(
          '"Perguntas de pesquisa" e "perguntas do roteiro de entrevista" são a mesma coisa.',
          false,
          'Perguntas de pesquisa são o que o TIME quer descobrir ("Por que clientes faltam?"). As perguntas do roteiro são o que você pergunta à PESSOA ("Conte da última vez que você precisou desmarcar um horário").',
        ),
        `## Quantas pessoas?

- **Entrevistas e testes qualitativos**: geralmente **5 a 8 pessoas por perfil**. A partir de certo ponto, as respostas começam a se repetir — isso se chama **saturação**.
- **Questionários**: dezenas a centenas, dependendo da precisão desejada.

E tempo? Uma pesquisa enxuta de entrevistas pode ser feita em **1 a 2 semanas**: 2–3 dias para recrutar, 3–4 dias de entrevistas, 2–3 dias de síntese.`,
        mc(
          'O que é "saturação" em pesquisa qualitativa?',
          'O ponto em que novas entrevistas param de trazer informações novas',
          ['Quando a pesquisadora fica cansada', 'Quando o questionário atinge 1.000 respostas', 'Quando há perguntas demais no roteiro'],
          'Ao perceber que as respostas estão se repetindo, você atingiu saturação — sinal de que tem material suficiente para aquele perfil.',
        ),
        fill(
          'Em pesquisas qualitativas, uma quantidade comum é de 5 a ___ pessoas por perfil.',
          '8',
          ['50', '200', '1.000'],
          '5 a 8 por perfil costuma revelar os principais padrões. Mais que isso, as respostas tendem a se repetir.',
        ),
      ],
      flashcards: [
        ['Pesquisa contextual', 'Observar e conversar com a pessoa no ambiente real enquanto ela faz a tarefa (modelo mestre-aprendiz).'],
        ['Estudo de diário', 'Participantes registram experiências ao longo de dias ou semanas.'],
        ['Plano de pesquisa', 'Documento com contexto, objetivo, perguntas, hipóteses, método, participantes, roteiro e cronograma.'],
        ['Perguntas de pesquisa', 'O que o time quer descobrir — diferente das perguntas feitas às pessoas no roteiro.'],
        ['Saturação', 'Quando novas sessões de pesquisa param de trazer informações novas.'],
      ],
      resources: [
        { title: 'Contextual Inquiry (NN/g)', url: 'https://www.nngroup.com/articles/contextual-inquiry/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Ética, LGPD e vieses na pesquisa',
      summary: 'Consentimento, proteção de dados e as armadilhas que distorcem o que você descobre.',
      minutes: 15,
      steps: [
        `## Pesquisa é com gente: ética primeiro

Toda pesquisa com pessoas envolve **responsabilidade**. Regras básicas:

- **Consentimento informado**: a pessoa sabe o objetivo, o que vai acontecer, que pode parar quando quiser — e concorda (por escrito, de preferência). É comum usar um **termo de consentimento**.
- **Gravação só com autorização** explícita.
- **Respeito**: a pessoa nunca está sendo testada. *O produto* é que está.
- **Incentivo justo**: agradecer o tempo (vale-presente, desconto, um café) é boa prática.
- **Vulnerabilidade**: cuidado redobrado com crianças, pessoas em situação de vulnerabilidade e temas sensíveis.`,
        tf(
          'Durante um teste, devemos deixar claro que estamos avaliando o produto, e não a pessoa.',
          true,
          'Isso reduz a ansiedade e deixa a pessoa mais à vontade para mostrar dificuldades — que é exatamente o que queremos ver.',
        ),
        `## LGPD na pesquisa

A **LGPD** (Lei Geral de Proteção de Dados, Lei 13.709/2018) regula o uso de dados pessoais no Brasil. Na prática da pesquisa:

- **Finalidade**: colete dados só para o objetivo da pesquisa, informado à pessoa.
- **Necessidade (minimização)**: colete **só o necessário**. Precisa mesmo do CPF? Do endereço completo?
- **Segurança**: guarde gravações e anotações em local protegido e com acesso restrito.
- **Anonimização**: em relatórios, use "Participante 3, 34 anos, manicure" em vez do nome real.
- **Direitos**: a pessoa pode pedir para apagar seus dados.`,
        multi(
          'Quais práticas estão alinhadas à LGPD numa pesquisa?',
          ['Coletar só os dados necessários para o objetivo', 'Anonimizar participantes no relatório', 'Guardar gravações com acesso restrito'],
          ['Pedir CPF e RG de todos "por precaução"', 'Compartilhar as gravações no grupo da empresa sem autorização'],
          'Finalidade, minimização e segurança são princípios centrais da LGPD.',
        ),
        `## Os vieses que atrapalham a pesquisa

**Viés** é uma distorção que nos leva a conclusões erradas. Os mais comuns:

- **Viés de confirmação**: prestar atenção só no que confirma o que você já acreditava.
- **Perguntas indutivas**: perguntas que sugerem a resposta. ❌ "Você não acha que seria ótimo receber lembretes?" ✅ "Como você lembra dos seus compromissos?"
- **Desejabilidade social**: as pessoas respondem o que parece "certo" ou agradável para você.
- **Efeito do observador (Hawthorne)**: as pessoas mudam o comportamento quando sabem que estão sendo observadas.
- **Viés do falso consenso**: achar que todo mundo pensa como você ("ninguém usa e-mail hoje em dia").`,
        scenario(
          'Durante uma entrevista, a designer pergunta: "Você concorda que o nosso novo app é muito mais fácil que ligar para o salão?"',
          'Qual o problema dessa pergunta?',
          'É uma pergunta indutiva: sugere a resposta e favorece a concordância',
          ['É curta demais', 'Não fala de preço', 'Deveria ser feita por escrito'],
          'Perguntas indutivas contaminam os dados. Prefira algo neutro como "Como foi a sua experiência para marcar o horário?".',
        ),
        match('Ligue o viés à situação', [
          ['Viés de confirmação', 'Anotar só as falas que apoiam a sua ideia'],
          ['Desejabilidade social', 'Dizer que lê todos os termos de uso'],
          ['Efeito do observador', 'Agir de forma mais "certinha" por saber que está sendo observado'],
          ['Falso consenso', 'Achar que todo mundo usa o celular como você'],
        ]),
        `## Como reduzir os vieses

- Escreva o roteiro com **perguntas abertas e neutras** e peça para alguém revisar.
- Pergunte sobre **comportamento passado e concreto** ("Conte da última vez que…") em vez de opiniões sobre o futuro.
- Deixe claro que **não existe resposta certa** e que você não criou o produto (mesmo que tenha criado 😉).
- Registre **tudo**, inclusive o que contradiz suas hipóteses.
- Faça a síntese **em grupo** — outras pessoas enxergam o que você não vê.`,
        fill(
          'Para reduzir vieses, prefira perguntar sobre comportamentos ___ e concretos, em vez de opiniões sobre o futuro.',
          'passados',
          ['futuros', 'imaginários', 'ideais'],
          '"Conte da última vez que você…" traz fatos. "Você usaria…?" traz otimismo e adivinhação.',
        ),
        open(
          'Reescreva esta pergunta indutiva de forma neutra: "Você não acha chato ter que ligar para marcar horário?"',
          'Uma versão neutra seria algo como: "Como você costuma marcar seus horários?" ou "Conte como foi a última vez que você marcou um horário." Repare que a versão neutra não sugere que ligar é chato — deixa a pessoa contar.',
        ),
      ],
      flashcards: [
        ['Termo de consentimento', 'Documento em que a pessoa concorda em participar da pesquisa, sabendo o objetivo, o uso dos dados e que pode desistir.'],
        ['LGPD', 'Lei Geral de Proteção de Dados (Lei 13.709/2018). Princípios: finalidade, necessidade (minimização), segurança, transparência.'],
        ['Viés de confirmação', 'Tendência de notar e valorizar só o que confirma o que já acreditamos.'],
        ['Pergunta indutiva', 'Pergunta que sugere a resposta ("Você não acha que…?"). Deve ser evitada.'],
        ['Desejabilidade social', 'Tendência de responder o que parece socialmente correto, e não o que realmente se faz.'],
        ['Efeito Hawthorne', 'As pessoas mudam o comportamento quando sabem que estão sendo observadas.'],
      ],
      resources: [
        { title: 'Lei Geral de Proteção de Dados (texto da lei)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm', kind: 'site', lang: 'pt' },
      ],
    },
  ],
  practices: [
    {
      title: 'Escolha seu projeto e escreva o plano de pesquisa',
      summary: 'Defina o tema do projeto que vai acompanhar você até o mês 5 e planeje a pesquisa.',
      minutes: 120,
      tool: 'escrita',
      brief: `## O projeto da trilha

A partir de agora, você vai trabalhar num **projeto contínuo**, do problema até o protótipo testado. É ele que vai virar o **estudo de caso principal** do seu portfólio.

### Escolha um tema (ou proponha o seu)

| Tema | Contexto |
|---|---|
| **Agenda Bela** (sugerido) | Agendamento para salões de beleza e profissionais autônomas de bairro (manicures, cabeleireiras, designers de sobrancelha) |
| **Patas** | Adoção responsável de animais para pequenas ONGs e protetores independentes |
| **Feira em Casa** | Pedidos de feirantes e pequenos produtores para clientes do bairro |
| **Seu tema** | Algo que você conhece bem e onde há pessoas acessíveis para entrevistar |

> 💡 Escolha um tema em que você **consiga conversar com pessoas reais** perto de você. Isso vale mais que um tema "da moda".

### Template do plano

Use os 8 blocos que você aprendeu: contexto, objetivo, perguntas de pesquisa, hipóteses, método, participantes, roteiro (pode ficar para a próxima semana), cronograma.`,
      steps: [
        'Escolha o tema do projeto e escreva, em 3 linhas, por que escolheu.',
        'Faça 30 minutos de **desk research**: busque notícias, dados e avaliações de apps parecidos na loja de aplicativos. Anote 5 descobertas.',
        'Escreva o **contexto** e o **objetivo** da pesquisa (1 frase).',
        'Escreva de **3 a 5 perguntas de pesquisa** (o que você quer descobrir).',
        'Liste **3 hipóteses** ("Acreditamos que…").',
        'Defina o **método** (entrevistas, nesta trilha) e o **perfil de participantes**: quem, quantos (mínimo 5), critérios de inclusão.',
        'Monte um **cronograma** para as próximas 2 semanas.',
      ],
      deliverable: 'Link do documento com o tema escolhido, desk research e o plano de pesquisa completo.',
      rubric: [
        'Escolhi um tema com pessoas reais acessíveis',
        'Fiz desk research e anotei pelo menos 5 descobertas',
        'O objetivo cabe em uma frase clara',
        'Escrevi de 3 a 5 perguntas de pesquisa (não são perguntas de roteiro)',
        'Listei 3 hipóteses testáveis',
        'Defini perfil, quantidade e critérios dos participantes',
        'Montei um cronograma realista',
      ],
      tips: [
        'Avaliações de 1 e 2 estrelas na loja de apps são uma mina de ouro de problemas reais.',
        'Mantenha o escopo pequeno: um público e uma necessidade principal.',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'O time quer saber "por que tantas pessoas desistem de adotar um pet depois de preencher o formulário?".',
      'Qual combinação de métodos responde melhor a essa pergunta?',
      'Analytics para ver onde desistem + entrevistas para entender o porquê',
      ['Só um questionário com nota de 0 a 10', 'Só olhar os concorrentes', 'Só uma avaliação heurística'],
      'Quantitativo (onde e quantos) + qualitativo (por quê) é a combinação mais poderosa.',
    ),
    mc(
      'Qual destas é uma boa pergunta de pesquisa (do time)?',
      'Como profissionais autônomas de beleza organizam seus agendamentos hoje?',
      ['Você gosta de aplicativos?', 'Qual cor você prefere para o botão?', 'Você usaria nosso app?'],
      'Uma pergunta de pesquisa orienta o estudo e é aberta. As outras são perguntas fracas de roteiro (fechadas, sobre opinião ou futuro).',
    ),
    tf(
      'Em relatórios de pesquisa, é boa prática anonimizar os participantes.',
      true,
      'Proteger a identidade é ético e está alinhado à LGPD.',
    ),
  ],
}
