import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u1: UnitDef = {
  title: 'Ideação e priorização',
  goal: 'Gerar muitas ideias para o problema definido e escolher as melhores com critério.',
  lessons: [
    {
      title: 'Técnicas de ideação',
      summary: 'Brainstorming do jeito certo, brainwriting, Crazy 8s, SCAMPER e a pior ideia possível.',
      minutes: 15,
      steps: [
        `## Primeiro quantidade, depois qualidade

Com o problema definido e as perguntas "Como poderíamos…?" em mãos, é hora de **divergir** de novo: gerar **muitas** soluções possíveis.

Por que muitas? Porque a primeira ideia raramente é a melhor. Ela costuma ser a **mais óbvia** — a mesma que todo mundo teria. As ideias interessantes aparecem depois que as óbvias saem da cabeça.

**Regras de uma boa sessão de ideação:**

1. **Não julgue** durante a geração (críticas vêm depois).
2. **Quantidade** importa.
3. **Construa sobre a ideia dos outros** ("sim, e…").
4. Ideias **malucas** são bem-vindas — elas abrem caminhos.
5. **Foco** na pergunta "Como poderíamos…?".`,
        tf(
          'Durante a geração de ideias, é bom criticar cada ideia logo que ela aparece para economizar tempo.',
          false,
          'Criticar na hora inibe as pessoas e mata ideias que poderiam evoluir. Gere primeiro, avalie depois.',
        ),
        `## Brainstorming e brainwriting

O **brainstorming** clássico (todo mundo falando em voz alta) tem um problema: as pessoas mais falantes dominam e as ideias se parecem.

O **brainwriting** resolve isso: cada pessoa escreve ideias **em silêncio**, sozinha, por alguns minutos. Depois, todas são compartilhadas. Funciona melhor para pessoas introvertidas e gera mais variedade.

## Crazy 8s

Técnica popularizada pelo **Design Sprint** do Google:

1. Dobre uma folha A4 em 8 partes.
2. Cronometre **8 minutos**.
3. Desenhe **uma ideia por quadrado** — 1 minuto cada.

A pressão do tempo impede o perfeccionismo e força ideias diferentes. Rabiscos simples bastam!`,
        fill(
          'No Crazy 8s, você desenha 8 ideias em ___ minutos.',
          '8',
          ['30', '60', '2'],
          'Um minuto por ideia: rápido demais para ser perfeccionista, que é justamente a ideia.',
        ),
        mc(
          'Qual a principal vantagem do brainwriting sobre o brainstorming falado?',
          'Todas as pessoas contribuem igualmente, sem que as mais falantes dominem',
          ['É mais rápido de organizar', 'Dispensa ter um problema definido', 'Gera ideias já priorizadas'],
          'Escrever em silêncio dá voz a todo mundo e reduz o efeito de "seguir a primeira ideia dita".',
        ),
        `## SCAMPER

Uma lista de verificação para transformar uma ideia ou solução existente:

| Letra | Pergunta | Exemplo (agendamento) |
|---|---|---|
| **S**ubstituir | O que posso trocar? | Trocar ligação por link de agenda |
| **C**ombinar | O que posso juntar? | Agendar + pagar sinal |
| **A**daptar | O que posso adaptar de outro lugar? | Fila virtual do restaurante |
| **M**odificar | O que posso aumentar ou diminuir? | Lembrete 2 horas antes |
| **P**ropor outro uso | Para que mais serve? | Agenda vira vitrine de serviços |
| **E**liminar | O que posso tirar? | Sem cadastro: só nome e telefone |
| **R**eorganizar | E se invertesse a ordem? | Escolher horário antes do serviço |`,
        match('Ligue o verbo do SCAMPER ao exemplo', [
          ['Eliminar', 'Agendar sem precisar criar conta'],
          ['Combinar', 'Agendar e pagar o sinal no mesmo passo'],
          ['Adaptar', 'Usar a ideia de lista de espera de restaurantes'],
          ['Reorganizar', 'Escolher o horário antes do serviço'],
        ]),
        `## A pior ideia possível

Quando o time trava, peça as **piores ideias possíveis** para o problema: "Como poderíamos fazer as clientes faltarem MAIS?" — ligar às 3 da manhã, esconder o endereço, não confirmar nada…

É divertido, tira a pressão e, ao **inverter** cada ideia ruim, aparecem soluções boas: "esconder o endereço" → "mandar o endereço com link do mapa no lembrete".`,
        scenario(
          'Numa sessão de ideação, o time só consegue pensar em "fazer um app". Todo mundo está travado.',
          'Qual técnica ajudaria a destravar e gerar alternativas?',
          'Pior ideia possível ou SCAMPER, para forçar perspectivas diferentes',
          ['Votar e escolher o app logo', 'Encerrar a reunião', 'Pedir para o chefe decidir'],
          'Técnicas estruturadas quebram o padrão de pensamento e revelam caminhos que não eram óbvios.',
        ),
        open(
          'Pegue uma das suas perguntas "Como poderíamos…?" do projeto e escreva 5 ideias de solução bem diferentes entre si (pelo menos uma maluca).',
          'Repare que as primeiras ideias tendem a ser parecidas. As mais originais costumam aparecer da quarta em diante — por isso quantidade importa.',
        ),
      ],
      flashcards: [
        ['Brainwriting', 'Ideação em que cada pessoa escreve ideias em silêncio antes de compartilhar.'],
        ['Crazy 8s', 'Desenhar 8 ideias em 8 minutos, uma por quadrado de uma folha dobrada.'],
        ['SCAMPER', 'Checklist de ideação: Substituir, Combinar, Adaptar, Modificar, Propor outro uso, Eliminar, Reorganizar.'],
        ['Pior ideia possível', 'Técnica de gerar ideias ruins de propósito e invertê-las para achar boas soluções.'],
      ],
      resources: [
        { title: 'Sprint — Jake Knapp', kind: 'livro', lang: 'pt', note: 'O método Design Sprint do Google, com Crazy 8s e muito mais.' },
      ],
    },
    {
      title: 'Priorizando ideias',
      summary: 'Votação, matriz impacto × esforço, MoSCoW e os três critérios: desejável, viável e factível.',
      minutes: 15,
      steps: [
        `## Hora de convergir

Depois de gerar 30, 50 ideias, é preciso **escolher**. Sem critério, quem decide é a pessoa mais influente — e voltamos ao achismo.

## Votação por pontos (dot voting)

Cada pessoa recebe **3 a 5 votos** (adesivos ou bolinhas no FigJam) e distribui entre as ideias que acha mais promissoras. Pode colocar mais de um voto na mesma ideia.

É rápido, democrático e revela consenso. Cuidado: vote **em silêncio** e ao mesmo tempo, para ninguém ser influenciado.`,
        mc(
          'Como funciona a votação por pontos (dot voting)?',
          'Cada pessoa distribui um número limitado de votos entre as ideias que considera melhores',
          ['O chefe escolhe a ideia final', 'Cada ideia recebe uma nota de 0 a 10 por escrito', 'A ideia mais antiga é escolhida'],
          'Votos limitados obrigam as pessoas a escolher e revelam onde há consenso.',
        ),
        `## Matriz impacto × esforço

Posicione cada ideia em dois eixos: **impacto** (quanto resolve o problema) e **esforço** (quanto custa construir).

::impact-effort

- **Ganhos rápidos** (alto impacto, baixo esforço): faça primeiro!
- **Grandes apostas** (alto impacto, alto esforço): planeje com cuidado.
- **Preenchimento** (baixo impacto, baixo esforço): se sobrar tempo.
- **Evite** (baixo impacto, alto esforço).

O esforço deve ser estimado **com o time de tecnologia** — designers costumam errar essa conta.`,
        scenario(
          'A ideia "enviar lembrete automático por WhatsApp" resolve a maior dor da pesquisa e o time técnico estima 1 semana de trabalho.',
          'Em que quadrante ela fica?',
          'Ganho rápido (alto impacto, baixo esforço)',
          ['Grande aposta', 'Preenchimento', 'Evite'],
          'Alto impacto + baixo esforço = prioridade máxima.',
        ),
        `## MoSCoW

Para definir o **escopo** de uma entrega (o que entra no MVP), classifique cada funcionalidade:

- **M**ust have — **obrigatório**: sem isso, não funciona.
- **S**hould have — **importante**, mas dá para lançar sem.
- **C**ould have — **desejável**, se der tempo.
- **W**on't have (this time) — **fora** desta vez (e tudo bem!).

O "Won't" é tão importante quanto o "Must": deixa explícito o que **não** vamos fazer agora.`,
        match('Classifique as funcionalidades de um MVP de agendamento (MoSCoW)', [
          ['Escolher serviço, dia e horário', 'Must have'],
          ['Lembrete automático', 'Should have'],
          ['Tema escuro', 'Could have'],
          ['Programa de pontos de fidelidade', "Won't have (desta vez)"],
        ]),
        `## Desejável, viável e factível

Uma boa solução fica na interseção de três critérios (modelo da IDEO):

- **Desejável** (pessoas): as pessoas querem e precisam disso? → evidência da pesquisa
- **Viável** (negócio): faz sentido para o negócio? Gera valor, cabe no orçamento?
- **Factível** (tecnologia): dá para construir com a tecnologia e o tempo disponíveis?

Designers defendem o **desejável**, mas precisam conversar sobre os outros dois.`,
        multi(
          'Quais são os três critérios do modelo de inovação da IDEO?',
          ['Desejável', 'Viável', 'Factível'],
          ['Bonito', 'Barato'],
          'Pessoas (desejável), negócio (viável) e tecnologia (factível).',
        ),
        tf(
          'Na priorização MoSCoW, deixar claro o que NÃO será feito agora ("Won\'t have") é tão importante quanto definir o que é obrigatório.',
          true,
          'Isso evita expectativas erradas e protege o time de aumentar o escopo sem perceber.',
        ),
        fill(
          'A estimativa de esforço na matriz impacto × esforço deve ser feita junto com o time de ___.',
          'tecnologia',
          ['marketing', 'jurídico', 'vendas'],
          'Quem constrói sabe quanto custa construir. Estimar sozinha leva a surpresas.',
        ),
      ],
      flashcards: [
        ['Dot voting', 'Votação por pontos: cada pessoa distribui poucos votos entre as ideias.'],
        ['Matriz impacto × esforço', 'Prioriza ideias em 4 quadrantes: ganhos rápidos, grandes apostas, preenchimento, evitar.'],
        ['MoSCoW', 'Priorização de escopo: Must have, Should have, Could have, Won\'t have (desta vez).'],
        ['Desejável, viável, factível', 'Critérios para boas soluções: pessoas querem, faz sentido para o negócio, dá para construir.'],
      ],
      resources: [
        { title: 'Prioritization Matrices (NN/g)', url: 'https://www.nngroup.com/articles/prioritization-matrices/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Storyboards, cenários e user stories',
      summary: 'Contar a solução como uma história antes de desenhar telas.',
      minutes: 15,
      steps: [
        `## Antes das telas, a história

Antes de desenhar telas, vale **contar a solução como uma história**. Isso mostra se a ideia faz sentido **no contexto real** da pessoa — e é ótimo para apresentar para o time.

## Storyboard

Um **storyboard** é uma história em quadrinhos curta (4 a 6 quadros):

1. **Contexto**: quem e onde ("Cláudia está atendendo uma cliente").
2. **Problema**: o que acontece ("chega um pedido de horário e ela não pode responder").
3. **Solução em uso**: como a ideia entra ("a cliente vê os horários livres num link e reserva sozinha").
4. **Resultado**: como a vida melhora ("Cláudia termina o atendimento com o horário já marcado").

Bonequinhos de palito são suficientes! O foco é a **narrativa**, não o desenho.`,
        order(
          'Ordene os quadros de um storyboard:',
          ['Contexto', 'Problema', 'Solução em uso', 'Resultado'],
          'Contexto → problema → solução → resultado: a estrutura básica de qualquer boa história.',
        ),
        tf(
          'Para fazer um storyboard útil, é preciso saber desenhar muito bem.',
          false,
          'Bonequinhos de palito funcionam perfeitamente. O que importa é a história que mostra a solução no contexto.',
        ),
        `## Cenários

Um **cenário** é uma descrição em texto de como uma persona usa a solução numa situação específica:

> "Sábado, 9h. Cláudia está fazendo as unhas de uma cliente quando o celular vibra. É a Marina pedindo horário para a tarde. Cláudia não pode parar, mas o link de agendamento já está na bio do Instagram: Marina vê que às 15h está livre, escolhe 'pé e mão' e confirma. Cláudia só recebe a notificação de 'novo horário' quando termina o atendimento."

Cenários revelam detalhes que telas soltas escondem: **quando** a pessoa usa, **com que atenção**, **interrompida por quê**.`,
        mc(
          'O que um cenário ajuda a revelar?',
          'Como a solução funciona no contexto real de uso da persona',
          ['As cores exatas da interface', 'O código necessário para construir', 'O preço final do produto'],
          'O contexto (atenção limitada, mãos ocupadas, pressa) muda muito o que a interface precisa fazer.',
        ),
        `## User stories

Em times ágeis, o trabalho é organizado em **user stories** — pequenas descrições de funcionalidades do ponto de vista de quem usa:

> **Como** [tipo de pessoa], **quero** [ação], **para** [benefício].

Exemplo: "**Como** cliente, **quero** remarcar meu horário pelo link, **para** não precisar mandar mensagem e esperar resposta."

Elas costumam vir com **critérios de aceite** — condições para considerar a história pronta:

- A cliente vê só horários livres.
- Ao remarcar, a profissional recebe uma notificação.
- O horário antigo fica disponível para outras pessoas.`,
        match('Ligue o formato à sua estrutura', [
          ['User story', 'Como [pessoa], quero [ação], para [benefício]'],
          ['Job story', 'Quando [situação], quero [motivação], para [resultado]'],
          ['Problem statement', '[Pessoa] precisa de [necessidade] porque [insight]'],
          ['Hipótese', 'Acreditamos que [ação] vai [resultado]; saberemos quando [métrica]'],
        ]),
        scenario(
          'O time recebeu a user story "Como cliente, quero receber lembrete, para não esquecer meu horário", mas cada dev entendeu uma coisa diferente sobre quando o lembrete deve chegar.',
          'O que estava faltando?',
          'Critérios de aceite claros (ex.: "lembrete enviado 24 h e 2 h antes, com opção de confirmar ou remarcar")',
          ['Uma persona mais detalhada', 'Mais cores no protótipo', 'Um nome mais curto para a story'],
          'Critérios de aceite definem quando a história está pronta e evitam interpretações diferentes.',
        ),
        fill(
          'As condições que definem quando uma user story está pronta são chamadas de critérios de ___.',
          'aceite',
          ['sucesso', 'beleza', 'venda'],
          'Critérios de aceite alinham design, desenvolvimento e QA sobre o comportamento esperado.',
        ),
      ],
      flashcards: [
        ['Storyboard', 'História em quadrinhos curta mostrando contexto, problema, solução em uso e resultado.'],
        ['Cenário', 'Narrativa em texto de como uma persona usa a solução numa situação específica.'],
        ['User story', '"Como [pessoa], quero [ação], para [benefício]." Unidade de trabalho em times ágeis.'],
        ['Critérios de aceite', 'Condições que definem quando uma user story está pronta.'],
      ],
      resources: [
        { title: 'Storyboards Help Visualize UX Ideas (NN/g)', url: 'https://www.nngroup.com/articles/storyboards-visualize-ideas/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Crazy 8s, priorização e storyboard',
      summary: 'Gere ideias para o seu projeto, escolha as melhores com critério e conte a solução numa história.',
      minutes: 180,
      tool: 'papel',
      brief: `## Da pergunta à solução escolhida

Use a pergunta **"Como poderíamos…?"** priorizada no seu dossiê de pesquisa.

### Etapas

1. **Crazy 8s (2 rodadas)**: duas folhas, 8 ideias cada, 8 minutos por folha. Na segunda rodada, tente ideias bem diferentes da primeira.
2. **Seleção**: escolha as 3 ideias mais promissoras e redesenhe cada uma com um pouco mais de detalhe.
3. **Priorização**: posicione as ideias (todas as 16, se possível) numa **matriz impacto × esforço** no FigJam.
4. **MoSCoW**: liste as funcionalidades da solução escolhida e classifique-as.
5. **Storyboard**: desenhe a solução escolhida em 6 quadros.
6. **User stories**: escreva 5 user stories com critérios de aceite para as funcionalidades "Must".

> 💡 Se conseguir, faça o Crazy 8s com outra pessoa e depois vote junto (dot voting).`,
      steps: [
        'Faça 2 rodadas de Crazy 8s no papel (16 ideias) e fotografe as folhas.',
        'Escolha 3 ideias e redesenhe cada uma com mais detalhe.',
        'No FigJam, monte a matriz impacto × esforço com as ideias.',
        'Escolha a solução e liste suas funcionalidades usando MoSCoW.',
        'Desenhe um storyboard de 6 quadros da solução em uso.',
        'Escreva 5 user stories com critérios de aceite.',
        'Escreva um parágrafo justificando a escolha com base na pesquisa (desejável), no negócio (viável) e na construção (factível).',
      ],
      deliverable: 'Link do FigJam com fotos dos Crazy 8s, matriz, MoSCoW, storyboard, user stories e justificativa.',
      rubric: [
        'Gerei pelo menos 16 ideias em 2 rodadas',
        'As ideias são variadas (não 16 versões da mesma coisa)',
        'Posicionei as ideias na matriz impacto × esforço',
        'Classifiquei as funcionalidades com MoSCoW, incluindo o "Won\'t"',
        'O storyboard tem contexto, problema, solução e resultado',
        'Escrevi 5 user stories com critérios de aceite',
        'Justifiquei a escolha com os 3 critérios (desejável, viável, factível)',
      ],
    },
  ],
  checkpointExtra: [
    mc(
      'Em qual momento do Double Diamond a ideação acontece?',
      'Desenvolver (divergir no segundo diamante)',
      ['Descobrir', 'Definir', 'Entregar'],
      'Depois de definir o problema, o segundo diamante começa abrindo possibilidades de solução.',
    ),
    scenario(
      'Depois de uma sessão com 40 ideias, o diretor diz: "Vamos fazer a minha, que é a melhor."',
      'O que a designer pode propor para decidir com mais critério?',
      'Votação silenciosa e uma matriz impacto × esforço com base na pesquisa',
      ['Concordar para evitar conflito', 'Fazer todas as 40 ideias', 'Cancelar o projeto'],
      'Critérios explícitos tiram a decisão do campo da opinião pessoal — sem precisar confrontar ninguém.',
    ),
    tf(
      'A primeira ideia que surge costuma ser a mais óbvia, e não necessariamente a melhor.',
      true,
      'Por isso gerar muitas ideias antes de escolher faz tanta diferença.',
    ),
  ],
}
