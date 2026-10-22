import { ab, fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u1: UnitDef = {
  title: 'Estudos de caso',
  goal: 'Transformar seus projetos em estudos de caso que mostram como você pensa e decide.',
  lessons: [
    {
      title: 'Anatomia de um bom estudo de caso',
      summary: 'A estrutura que recrutadoras esperam: contexto, problema, papel, processo, resultados e aprendizados.',
      minutes: 20,
      steps: [
        `## O estudo de caso é a sua entrevista antes da entrevista

Um **estudo de caso** (*case study*) é a história de um projeto contada do seu ponto de vista: o problema, o que você fez, **por que** fez e o que aconteceu.

Recrutadoras e gestoras costumam passar **poucos minutos** em cada portfólio. Elas querem saber:

1. Você entende **problemas** (e não só telas)?
2. Você toma **decisões** com base em evidências?
3. Você sabe **comunicar** seu raciocínio?
4. Que **papel** você teve?

Um bom estudo de caso responde isso de forma clara e escaneável.`,
        multi(
          'O que recrutadoras querem descobrir num estudo de caso?',
          ['Como você entende problemas', 'Como você toma decisões com base em evidências', 'Qual foi o seu papel no projeto'],
          ['Quantos programas você sabe usar', 'Se suas telas usam as cores da moda'],
          'O estudo de caso é sobre raciocínio e decisões. Ferramentas e estética são secundárias.',
        ),
        `## A estrutura clássica

1. **Título + resumo (TL;DR)**: uma frase do desafio e do resultado. Ex.: "Como reduzimos as faltas em agendamentos de salões de bairro".
2. **Imagem de destaque**: a solução final, bonita, logo no início.
3. **Contexto**: o produto, o público, o cenário.
4. **Problema**: qual dor, com evidência.
5. **Seu papel e restrições**: o que **você** fez, com quem, em quanto tempo, com quais limitações.
6. **Processo**: pesquisa → insights → ideação → solução → testes → iteração. Foque nas **decisões**.
7. **Resultados**: números, aprendizados do teste, impacto.
8. **Aprendizados e próximos passos**: o que faria diferente.`,
        order(
          'Ordene a estrutura de um estudo de caso:',
          ['Título e resumo', 'Contexto e problema', 'Seu papel e restrições', 'Processo e decisões', 'Resultados', 'Aprendizados'],
          'Comece pelo resumo (muita gente só lê isso!) e termine com aprendizados.',
        ),
        `## O método STAR

Para cada decisão importante, um bom formato de narrativa é o **STAR**:

- **S**ituação: o contexto.
- **T**arefa: o que precisava ser feito.
- **A**ção: o que **você** fez (e por quê).
- **R**esultado: o que aconteceu.

Ex.: "Nos testes (**S**), 4 de 5 pessoas não encontravam onde remarcar (**T**). Movi a ação para o card do agendamento e mudei o rótulo para 'Remarcar' (**A**). Na segunda rodada, 5 de 5 concluíram a tarefa em menos de 30 segundos (**R**)."`,
        match('Ligue a letra do STAR ao trecho', [
          ['Situação', '"Nos testes com 5 clientes do salão…"'],
          ['Tarefa', '"…precisávamos que elas conseguissem remarcar sozinhas."'],
          ['Ação', '"Movi a opção para o card e mudei o rótulo."'],
          ['Resultado', '"5 de 5 concluíram em menos de 30 segundos."'],
        ]),
        `## Seja honesta(o) sobre o tipo de projeto

Seus projetos do curso são **projetos conceituais** (ou de estudo) — e isso é totalmente normal para quem está começando. Deixe claro:

> "Projeto conceitual desenvolvido durante minha formação em UX, com pesquisa e testes com pessoas reais."

O que **não** fazer: fingir que foi um projeto para um cliente real, inventar números ou se apropriar de trabalho em grupo como se fosse só seu. Recrutadoras percebem — e a confiança vai embora.

Se o projeto teve pesquisa e testes de verdade, ele **vale muito** mesmo sendo conceitual.`,
        tf(
          'Para impressionar, vale a pena apresentar um projeto de estudo como se fosse um trabalho para um cliente real.',
          false,
          'Honestidade é inegociável. Projetos conceituais com pesquisa real são muito bem vistos — mentiras são descobertas facilmente nas entrevistas.',
        ),
        scenario(
          'O estudo de caso de uma candidata mostra 14 telas lindas, mas não diz qual problema resolvem nem por que foram desenhadas assim.',
          'O que uma gestora provavelmente vai pensar?',
          'Que ela sabe fazer telas, mas não dá para avaliar como pensa e decide',
          ['Que ela é a candidata ideal', 'Que faltaram mais telas', 'Que o problema era óbvio'],
          'Sem contexto e decisões, o portfólio parece de UI apenas — e vagas de UX/produto querem ver raciocínio.',
        ),
        fill(
          'O resumo no início do estudo de caso, com o desafio e o resultado em poucas linhas, é chamado de ___.',
          'TL;DR',
          ['rodapé', 'FAQ', 'changelog'],
          'TL;DR = "too long; didn\'t read". Muita gente só lê essa parte — capriche.',
        ),
      ],
      flashcards: [
        ['Estudo de caso', 'História de um projeto mostrando problema, papel, processo, decisões, resultados e aprendizados.'],
        ['TL;DR (resumo)', 'Resumo curto no início, com o desafio e o resultado.'],
        ['STAR', 'Situação, Tarefa, Ação, Resultado — formato para narrar decisões e experiências.'],
        ['Projeto conceitual', 'Projeto de estudo, sem cliente real; deve ser apresentado como tal.'],
      ],
      resources: [
        { title: 'Bestfolios — portfólios e estudos de caso para inspiração', url: 'https://www.bestfolios.com/', kind: 'site', lang: 'en' },
      ],
    },
    {
      title: 'Storytelling visual no estudo de caso',
      summary: 'Fazer o leitor entender em 2 minutos: hierarquia, imagens do processo, decisões e antes/depois.',
      minutes: 15,
      steps: [
        `## Escaneável primeiro

Lembra que as pessoas escaneiam? Isso vale para quem lê o seu portfólio.

- **Títulos de seção que contam a história**: em vez de "Pesquisa", use "5 entrevistas revelaram que o problema não era o app — era o WhatsApp".
- **Negrito** nas frases-chave.
- **Parágrafos curtos** (2 a 4 linhas).
- **Imagens com legenda** explicando o que mostram.
- Tempo de leitura de **5 a 10 minutos**. Se ficar maior, corte.`,
        ab(
          'Qual abertura de estudo de caso funciona melhor?',
          `<div style="font-weight:900;font-size:14px">Projeto Agenda Bela</div><div style="font-size:11px;color:#6b6880;margin-top:4px;line-height:1.4">Este projeto foi desenvolvido durante o meu curso de UX. Nele, utilizei diversas técnicas como Design Thinking, entrevistas, personas, mapa de empatia, jornada, card sorting, wireframes e protótipos no Figma, passando por todas as etapas…</div>`,
          `<div style="font-weight:900;font-size:14px">Como ajudar manicures a não perder clientes enquanto atendem</div><div style="font-size:11px;color:#6b6880;margin-top:4px;line-height:1.4"><b>Projeto conceitual · 16 semanas · pesquisa e design</b><br/>5 entrevistas revelaram que pedidos chegam durante os atendimentos. Criei um link de agendamento testado em 2 rodadas: sucesso na tarefa de 2/5 → 5/5.</div>`,
          'b',
          'A abertura B diz o problema, o tipo de projeto, o papel e o resultado em segundos. A A lista técnicas sem dizer o que foi resolvido.',
        ),
        `## Mostre o processo — com moderação

Imagens de processo (post-its, sketches, fluxos, fotos de testes) mostram que o trabalho foi **real**. Mas:

- Não despeje **todos** os artefatos. Escolha os que contam a história.
- Mostre **decisões**, não etapas: "Escolhemos o link de agendamento em vez de um app porque 4 de 5 profissionais não queriam baixar nada."
- Use **antes e depois** para mostrar iterações.
- Inclua **citações** reais (anonimizadas) — elas dão voz às pessoas.

## Mostre trade-offs

Gestoras adoram ver que você entende **trade-offs** (o que se ganha e o que se perde em cada escolha): "O lembrete por WhatsApp é mais efetivo, mas tem custo por mensagem — por isso, só enviamos para horários marcados com mais de 3 dias de antecedência."`,
        mc(
          'Qual é o melhor título de seção para um estudo de caso?',
          '"As entrevistas mostraram que as clientes não queriam baixar mais um app"',
          ['"Pesquisa"', '"Etapa 2"', '"Coisas que eu fiz"'],
          'Títulos que contam a história permitem entender o case só escaneando os títulos.',
        ),
        tf(
          'Incluir todos os artefatos produzidos (todas as fotos de post-its, todos os sketches) deixa o estudo de caso mais forte.',
          false,
          'Curadoria é uma habilidade de design. Mostre os artefatos que explicam decisões; o resto vira ruído.',
        ),
        `## Resultados mesmo sem lançamento

Projetos conceituais não têm métricas de negócio, mas têm **resultados de teste**:

- "A taxa de sucesso na tarefa de remarcar subiu de 1/5 para 5/5."
- "A nota SUS foi de 62 para 81 entre a versão 1 e a 2."
- "O tempo médio para agendar caiu de 2 min para 40 s."

E aprendizados honestos: "Se tivesse mais tempo, testaria com profissionais mais velhas, que usam menos tecnologia."`,
        multi(
          'Quais podem ser "resultados" num projeto conceitual?',
          ['Evolução da taxa de sucesso entre versões', 'Mudança na nota SUS', 'Aprendizados e próximos passos'],
          ['Faturamento inventado da empresa', 'Número de downloads imaginário'],
          'Use resultados reais dos seus testes. Números inventados destroem a credibilidade.',
        ),
        scenario(
          'O estudo de caso de um candidato tem 6.000 palavras e leva 30 minutos para ler.',
          'Qual é o problema mais provável?',
          'Pouca gente vai ler até o fim; falta síntese e hierarquia',
          ['Nenhum: quanto mais texto, melhor', 'Falta ainda mais texto', 'Deveria ser em PDF'],
          'Síntese é habilidade de designer. Corte, use títulos e imagens, e deixe o essencial escaneável.',
        ),
        fill(
          'O que se ganha e o que se perde numa escolha de design é chamado de ___.',
          'trade-off',
          ['briefing', 'wireframe', 'handoff'],
          'Mostrar trade-offs revela maturidade: toda decisão tem custo.',
        ),
      ],
      flashcards: [
        ['Títulos que contam a história', 'Títulos de seção que já dizem a descoberta ou decisão, permitindo entender o case escaneando.'],
        ['Trade-off', 'O que se ganha e o que se perde em uma decisão de design.'],
        ['Curadoria de artefatos', 'Mostrar só os artefatos que explicam decisões, não todos os produzidos.'],
      ],
    },
    {
      title: 'Erros comuns em portfólios de iniciantes',
      summary: 'O que faz um portfólio júnior ser descartado — e como evitar.',
      minutes: 15,
      steps: [
        `## Os erros que mais aparecem

1. **Só telas bonitas**, sem problema nem processo.
2. **Processo "receita de bolo"**: listar todas as etapas do Design Thinking com um artefato genérico em cada, sem mostrar **decisões**.
3. **Redesign de marca famosa sem contexto** ("Redesign do Spotify"), sem pesquisa e sem entender as restrições do negócio.
4. **Projetos demais e fracos**: 10 projetos rasos valem menos que **2 ou 3 bem contados**.
5. **Papel pouco claro** em trabalhos em grupo.
6. **Erros de português** e textos descuidados.
7. **Site lento, quebrado no celular** ou com contraste ruim (um portfólio de UX inacessível é irônico 😬).
8. **Links quebrados** e arquivos do Figma sem permissão de acesso.`,
        multi(
          'Quais são erros comuns em portfólios júnior?',
          ['Mostrar só telas, sem problema e processo', 'Ter muitos projetos rasos', 'Não deixar claro o próprio papel'],
          ['Ter 2 ou 3 estudos de caso bem contados', 'Mostrar resultados de testes'],
          'Qualidade e clareza ganham de quantidade.',
        ),
        `## A armadilha da "receita de bolo"

Muitos portfólios iniciantes seguem o roteiro: "Empatizar: fiz persona. Definir: fiz mapa de empatia. Idear: fiz Crazy 8s…". Parece um checklist de curso — e é exatamente isso que a gestora pensa.

Em vez disso, conte o que **cada etapa mudou** no projeto:

- ❌ "Fiz 5 entrevistas e uma persona."
- ✅ "As entrevistas derrubaram nossa hipótese inicial: o problema não era esquecer o horário, era não conseguir **avisar** que ia faltar. Isso mudou o foco da solução."`,
        scenario(
          'O case de uma candidata diz: "Etapa 1: Empatizar. Fiz entrevistas. Etapa 2: Definir. Fiz uma persona. Etapa 3: Idear. Fiz Crazy 8s."',
          'Como melhorar essa narrativa?',
          'Mostrar o que cada etapa revelou e como mudou as decisões do projeto',
          ['Adicionar mais etapas', 'Trocar os nomes das etapas', 'Remover a pesquisa'],
          'O valor está nas descobertas e decisões, não na lista de técnicas usadas.',
        ),
        `## Redesign sem contexto

Redesenhar o app de uma grande empresa (sem acesso a dados, usuários ou restrições) costuma gerar soluções ingênuas — e a gestora sabe que aquele time tem razões que você não conhece.

Se fizer redesign, faça direito:

- Escolha um **problema específico** (não "o app inteiro").
- Faça **pesquisa real** com usuários desse produto.
- Reconheça as **limitações** ("não tenho acesso aos dados internos").

Projetos com **pessoas e problemas reais e próximos** (o salão do bairro, a ONG local) costumam render cases muito mais interessantes.`,
        tf(
          '"Redesign do app do Instagram" feito sem pesquisa e sem foco num problema específico costuma ser um projeto forte para portfólio júnior.',
          false,
          'Sem pesquisa e foco, vira exercício visual. Problemas reais e específicos geram cases mais convincentes.',
        ),
        `## Checklist antes de publicar

- [ ] 2 a 3 estudos de caso com problema, papel, processo, decisões, resultados e aprendizados
- [ ] Imagem de destaque e resumo no início de cada case
- [ ] Títulos que contam a história
- [ ] Revisão de português (peça para alguém ler!)
- [ ] Funciona bem no celular
- [ ] Contraste e textos alternativos ok
- [ ] Links testados (inclusive os do Figma, em janela anônima)
- [ ] Página "Sobre" com sua história e contato`,
        mc(
          'Como garantir que o link do Figma no portfólio está acessível para recrutadoras?',
          'Testar o link numa janela anônima, sem estar logada',
          ['Confiar que funciona porque abre no seu computador', 'Mandar o arquivo .fig por e-mail', 'Colocar o link sem testar'],
          'Logada, você vê tudo. Na janela anônima, você vê o que a recrutadora vai ver.',
        ),
        fill(
          'É melhor ter de 2 a ___ estudos de caso bem contados do que 10 projetos rasos.',
          '3',
          ['20', '50', '1.000'],
          'Qualidade vence quantidade. Quem avalia tem pouco tempo.',
        ),
        open(
          'Escreva o título e o resumo (TL;DR) do estudo de caso do seu projeto principal, em no máximo 3 linhas.',
          'Exemplo: "Agenda Bela — como ajudamos manicures autônomas a não perder clientes enquanto atendem. Pesquisa com 5 profissionais, protótipo testado em 2 rodadas: a taxa de sucesso para agendar subiu de 2/5 para 5/5." Esse resumo vai abrir o seu case.',
        ),
      ],
      flashcards: [
        ['Receita de bolo (portfólio)', 'Listar etapas e técnicas sem mostrar o que cada uma revelou e decidiu.'],
        ['Checklist de portfólio', '2–3 cases, resumo, títulos-história, revisão, celular, acessibilidade, links testados, "Sobre".'],
        ['Redesign sem contexto', 'Redesenhar o app de uma marca famosa sem pesquisa nem foco num problema específico — costuma gerar cases fracos.'],
      ],
      resources: [
        { title: 'UX Design Portfolios: Tips for Junior Designers (NN/g)', url: 'https://www.nngroup.com/articles/ux-design-portfolios/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Escreva o estudo de caso do seu projeto principal',
      summary: 'Transforme os projetos 2, 3, 4 e 5 num estudo de caso completo e escaneável.',
      minutes: 420,
      tool: 'escrita',
      brief: `## O case mais importante do seu portfólio

Você tem material de **quatro meses** de projeto: pesquisa, síntese, ideação, arquitetura, wireframes, UI, testes e iteração. Agora é hora de **editar** — escolher o que conta a melhor história.

### Estrutura

1. **Título + TL;DR** (3 linhas) + **imagem de destaque**.
2. **Contexto e problema** (com evidência da pesquisa).
3. **Meu papel, prazo e restrições** — deixe claro que é um projeto conceitual com pesquisa real.
4. **Pesquisa → insights**: 2 ou 3 insights que mudaram o rumo.
5. **Ideação e decisões**: a solução escolhida e por quê (inclua 1 trade-off).
6. **Solução**: as telas principais, com legendas explicando as decisões.
7. **Testes e iteração**: o que mudou, com antes/depois e números.
8. **Resultados e aprendizados**.

### Onde escrever

Escreva primeiro num documento (Google Docs ou Notion) e monte as imagens no Figma. Na próxima semana, você vai publicar no portfólio.`,
      steps: [
        'Releia todo o material do projeto e liste as 5 decisões mais importantes.',
        'Escreva o título e o TL;DR.',
        'Escreva o rascunho seguindo a estrutura, usando STAR para as decisões principais.',
        'Escolha e prepare as imagens (com legendas): no máximo 10 a 12.',
        'Reescreva os títulos das seções para que contem a história.',
        'Corte 30% do texto. Sério!',
        'Peça para uma pessoa ler e explicar o projeto com as palavras dela. Ajuste o que ela não entendeu.',
        'Revise o português.',
      ],
      deliverable: 'Link do documento com o estudo de caso completo e das imagens preparadas no Figma.',
      rubric: [
        'Tem título, TL;DR e imagem de destaque',
        'O problema está claro e tem evidência',
        'Meu papel e o caráter conceitual do projeto estão explícitos',
        'Os insights mostram como a pesquisa mudou o projeto',
        'As decisões são justificadas (com pelo menos 1 trade-off)',
        'Há antes/depois com resultados de teste',
        'Os títulos das seções contam a história',
        'Uma pessoa leu e entendeu o projeto',
        'O texto foi revisado',
      ],
    },
  ],
  checkpointExtra: [
    mc(
      'Qual é a melhor forma de apresentar um projeto feito durante o curso?',
      'Como projeto conceitual, deixando claro que houve pesquisa e testes com pessoas reais',
      ['Como trabalho para um cliente famoso', 'Sem mencionar que é um projeto de estudo', 'Com números de vendas inventados'],
      'Transparência gera confiança — e pesquisa real valoriza muito o projeto.',
    ),
    scenario(
      'Num trabalho em grupo, uma candidata escreveu "eu fiz toda a pesquisa e todo o design", mas a entrevistadora conversou com outra pessoa do grupo.',
      'Qual é o risco?',
      'Perder a credibilidade: o papel deve ser descrito com honestidade e precisão',
      ['Nenhum: todos fazem isso', 'Ganhar pontos por iniciativa', 'A entrevistadora não vai se importar'],
      'Descreva exatamente o que você fez ("conduzi 3 das 6 entrevistas e liderei a síntese").',
    ),
    tf(
      'Mostrar o que cada etapa do processo revelou e mudou é mais valioso do que listar todas as técnicas usadas.',
      true,
      'Decisões e descobertas mostram raciocínio; listas de técnicas mostram só que você fez um curso.',
    ),
  ],
}
