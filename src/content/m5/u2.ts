import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u2: UnitDef = {
  title: 'Testes de usabilidade',
  goal: 'Planejar, conduzir e analisar testes de usabilidade, transformando o que observou em melhorias priorizadas.',
  lessons: [
    {
      title: 'Planejando um teste de usabilidade',
      summary: 'Objetivos, tipos de teste, tarefas realistas, quantas pessoas e o roteiro.',
      minutes: 20,
      steps: [
        `## Observar vale mais que perguntar

No **teste de usabilidade**, pessoas reais tentam realizar **tarefas** num produto ou protótipo enquanto você **observa**. É o método mais importante de UX: mostra o que as pessoas **fazem**, não o que dizem que fariam.

Você já fez testes de guerrilha nos meses anteriores. Agora vamos fazer **com método**.

## Tipos de teste

- **Moderado**: uma pessoa conduz a sessão (ao vivo, presencial ou por vídeo). Permite aprofundar ("o que você esperava aqui?").
- **Não moderado**: a pessoa faz sozinha, guiada por uma ferramenta (ex.: Maze, UXtweak, Lookback), e a sessão é gravada. Escala para muita gente, mas sem aprofundamento.
- **Presencial** × **remoto**.
- **Exploratório** (ideias iniciais), **avaliativo** (a solução funciona?) e **comparativo** (A ou B?).`,
        match('Ligue o tipo de teste à característica', [
          ['Moderado', 'Uma pessoa conduz e pode fazer perguntas na hora'],
          ['Não moderado', 'A participante faz sozinha, guiada por uma ferramenta'],
          ['Comparativo', 'Avalia duas versões diferentes da solução'],
        ]),
        `## Quantas pessoas?

Jakob Nielsen e Tom Landauer mostraram que, num teste qualitativo, **5 pessoas** encontram cerca de **85% dos problemas** de usabilidade:

::usability-curve

A recomendação não é "teste com 5 e pronto", e sim: **teste com 5, corrija, teste com mais 5**. Várias rodadas pequenas rendem mais que uma grande.

Atenção: se o produto tem **públicos muito diferentes** (ex.: clientes e profissionais), teste cerca de 5 de cada.`,
        mc(
          'Segundo Nielsen, por que é melhor fazer 3 rodadas com 5 pessoas do que 1 rodada com 15?',
          'Porque, entre as rodadas, você corrige os problemas e descobre outros que estavam escondidos',
          ['Porque 15 pessoas é ilegal', 'Porque 5 pessoas sempre encontram 100% dos problemas', 'Porque é mais barato pagar menos pessoas'],
          'Iterar entre rodadas pequenas maximiza o aprendizado e o número de problemas resolvidos.',
        ),
        `## Tarefas realistas

As tarefas são o coração do teste. Boas tarefas são:

- **Realistas**, com um **cenário**: "Você quer fazer pé e mão no sábado à tarde, perto do seu trabalho. Use o app para marcar."
- **Acionáveis**: a pessoa sabe quando terminou.
- **Sem dicas**: não use as palavras da interface! Se o botão diz "Agendar", não peça "toque em Agendar". Prefira "marque um horário".
- **Em ordem natural**: da tarefa mais simples para a mais complexa.

Escreva de **3 a 6 tarefas** para uma sessão de 30 a 45 minutos.`,
        scenario(
          'O roteiro de teste diz: "Toque no botão Remarcar e escolha um novo horário."',
          'Qual é o problema dessa tarefa?',
          'Ela entrega o caminho: cita o nome do botão e não testa se a pessoa encontraria a opção sozinha',
          ['É longa demais', 'Deveria pedir para cancelar', 'Não tem problema'],
          'Algo como "Você não vai conseguir ir sábado. Mude seu horário para outro dia" testa de verdade.',
        ),
        tf(
          'Nas tarefas de um teste de usabilidade, devemos usar as mesmas palavras dos botões da interface para não confundir a participante.',
          false,
          'Usar as palavras da interface entrega a resposta. Descreva o objetivo com as palavras da vida real.',
        ),
        `## O plano de teste

1. **Objetivo**: o que queremos aprender (ex.: "as clientes conseguem remarcar sem ajuda?").
2. **Perfil e recrutamento**: quem, quantas pessoas.
3. **Método**: moderado/remoto, duração, ferramenta.
4. **Tarefas e cenários**, com **critério de sucesso** de cada uma.
5. **Métricas**: sucesso, tempo, erros, satisfação.
6. **Roteiro**: introdução, perguntas iniciais, tarefas, perguntas finais.
7. **Piloto**: teste o teste com 1 pessoa antes!`,
        order(
          'Ordene as partes de uma sessão de teste moderado:',
          ['Boas-vindas e consentimento', 'Perguntas iniciais sobre o contexto', 'Tarefas com o protótipo', 'Perguntas finais e questionário', 'Agradecimento'],
          'Começa criando conforto, passa pelas tarefas e termina coletando impressões.',
        ),
        fill(
          'Antes de rodar o teste com as participantes, é importante fazer um teste ___ com uma pessoa para ajustar o roteiro.',
          'piloto',
          ['final', 'A/B', 'cego'],
          'O piloto revela tarefas confusas, problemas no protótipo e o tempo real da sessão.',
        ),
      ],
      flashcards: [
        ['Teste de usabilidade', 'Observar pessoas reais tentando realizar tarefas num produto ou protótipo.'],
        ['Teste moderado vs. não moderado', 'Moderado: alguém conduz ao vivo. Não moderado: a pessoa faz sozinha, guiada por ferramenta.'],
        ['Regra dos 5 usuários', '~5 pessoas encontram ~85% dos problemas; melhor várias rodadas pequenas com iteração.'],
        ['Tarefa de teste', 'Objetivo realista com cenário, sem usar as palavras da interface.'],
      ],
      resources: [
        { title: 'Why You Only Need to Test with 5 Users (NN/g)', url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/', kind: 'artigo', lang: 'en' },
        { title: 'Turn User Goals into Task Scenarios for Usability Testing (NN/g)', url: 'https://www.nngroup.com/articles/task-scenarios-usability-testing/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Conduzindo o teste',
      summary: 'Pensar em voz alta, neutralidade, não ajudar e o que fazer quando a pessoa trava.',
      minutes: 15,
      steps: [
        `## Pensar em voz alta

O protocolo de **pensar em voz alta** (*think aloud*) pede que a participante **diga o que está pensando** enquanto usa o produto: "Estou procurando onde muda o horário… acho que é aqui… ué, não era".

É como ouvir os pensamentos dela. Explique no começo e, se ela ficar em silêncio, lembre com delicadeza: "O que você está pensando agora?"

## A introdução que deixa a pessoa à vontade

> "Hoje vamos testar um protótipo — não você. Não existe resposta errada: se algo for difícil, é exatamente isso que precisamos descobrir. Eu não criei o design, então pode ser sincera. Vou pedir para você pensar em voz alta enquanto usa. Posso gravar a tela e o áudio?"

(Mesmo que você tenha criado, dizer que não criou deixa a pessoa mais livre para criticar.)`,
        mc(
          'Por que pedimos à participante que pense em voz alta?',
          'Para entender o raciocínio, as expectativas e as dúvidas dela enquanto usa o produto',
          ['Para a gravação ficar mais animada', 'Para ela terminar mais rápido', 'Para avaliar a dicção dela'],
          'Os pensamentos verbalizados explicam por que ela faz o que faz — algo que só observar não mostra.',
        ),
        `## A regra mais difícil: não ajudar

Ver alguém travar no seu design dá vontade de ajudar. **Não ajude.** Cada travada é um problema que você só descobriu porque não ajudou.

Se a pessoa perguntar "É aqui?", devolva a pergunta: **"O que você acha?"** ou **"O que você faria se estivesse sozinha?"**

Se ela ficar muito tempo travada e frustrada, você pode encerrar a tarefa com gentileza: "Tudo bem, isso já me ajudou muito. Vamos para a próxima." — e anotar como **falha**.

## Neutralidade

- Nada de "Muito bem!", "Isso!", "Acertou!" — isso sinaliza que existe resposta certa.
- Use reações neutras: "Entendi", "Obrigada", "Hum-hum".
- Cuidado com expressões faciais e suspiros. 😬`,
        scenario(
          'Durante o teste, a participante pergunta: "Para remarcar, eu toco nesses três pontinhos?"',
          'Qual é a melhor resposta da facilitadora?',
          '"O que você acha? O que faria se estivesse sozinha?"',
          ['"Isso, são os três pontinhos!"', '"Não, é no botão de baixo."', '"Pode tocar em qualquer lugar."'],
          'Devolver a pergunta mantém o teste válido e revela o que a pessoa realmente faria.',
        ),
        tf(
          'Elogiar a participante a cada acerto ("Muito bem!") ajuda a manter um teste neutro.',
          false,
          'Elogios indicam que há respostas certas e erradas, mudando o comportamento da participante. Prefira reações neutras.',
        ),
        `## Observar e registrar

- Foque no **comportamento**: onde clicou, onde hesitou, o que procurou, o que ignorou.
- Anote **falas literais** e o **momento** em que aconteceram (para achar no vídeo depois).
- Tenha, se possível, uma **pessoa anotadora** e **convide o time** para assistir (em silêncio!).
- No final: perguntas abertas ("O que foi mais difícil?") e um questionário curto (vamos ver na próxima lição).

> 💡 Opiniões como "eu gostei da cor" valem pouco. Comportamentos como "procurou o botão por 40 segundos" valem muito.`,
        multi(
          'O que vale mais registrar num teste de usabilidade?',
          ['Onde a pessoa hesitou ou errou', 'Falas literais com o momento em que aconteceram', 'O que ela procurou e não encontrou'],
          ['Se ela gostou da cor do botão', 'A sua opinião sobre a inteligência da participante'],
          'Comportamento observado é o dado mais confiável de um teste.',
        ),
        match('Ligue a situação à atitude da facilitadora', [
          ['A participante fica em silêncio', 'Perguntar: "O que você está pensando agora?"'],
          ['A participante pergunta se está certo', 'Devolver: "O que você acha?"'],
          ['A participante está travada há muito tempo', 'Encerrar a tarefa com gentileza e seguir'],
          ['A participante acerta a tarefa', 'Reagir de forma neutra: "Obrigada"'],
        ]),
        fill(
          'O protocolo em que a participante diz o que está pensando enquanto usa o produto se chama "pensar em ___ alta".',
          'voz',
          ['letra', 'nota', 'mente'],
          'Think aloud: um dos métodos mais usados e mais valiosos de UX.',
        ),
        open(
          'Escreva a frase que você vai usar quando uma participante te perguntar "Fiz certo?" durante o teste.',
          'Algo como "Não existe certo ou errado aqui — me conta o que você esperava que acontecesse" mantém a neutralidade e ainda gera informação útil.',
        ),
      ],
      flashcards: [
        ['Pensar em voz alta (think aloud)', 'A participante verbaliza o que pensa enquanto usa o produto.'],
        ['Neutralidade no teste', 'Não ajudar, não elogiar, não induzir; reagir de forma neutra.'],
        ['"O que você acha?"', 'Resposta padrão quando a participante pergunta se está certo — devolve a decisão para ela.'],
      ],
      resources: [
        { title: 'Thinking Aloud: The #1 Usability Tool (NN/g)', url: 'https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Métricas e análise dos resultados',
      summary: 'Sucesso, tempo, erros, SEQ e SUS — e como priorizar o que corrigir.',
      minutes: 20,
      steps: [
        `## Métricas de desempenho

- **Taxa de sucesso**: % de participantes que completaram a tarefa (pode ter "sucesso parcial").
- **Tempo na tarefa**: quanto tempo levaram. Útil para comparar versões.
- **Erros**: quantos caminhos errados, toques em lugares não clicáveis, voltas.
- **Caminho**: foram direto ou se perderam?

Com 5 participantes, os números são **indicativos**, não estatísticos. "4 de 5 não encontraram" é um ótimo sinal de alerta — mas evite dizer "80% dos usuários".`,
        tf(
          'Com 5 participantes, é correto afirmar com confiança estatística que "80% de todos os usuários" não encontram uma função.',
          false,
          'Com amostras pequenas, os números indicam problemas, mas não representam a população. Diga "4 de 5 participantes".',
        ),
        `## Métricas de satisfação

- **SEQ** (*Single Ease Question*): logo após cada tarefa, "De 1 a 7, quão fácil ou difícil foi essa tarefa?". Rápida e útil.
- **SUS** (*System Usability Scale*): questionário de **10 afirmações** com escala de 1 a 5, respondido no fim. Gera uma nota de **0 a 100**.
  - Média de mercado: por volta de **68**.
  - Abaixo de ~50: problemas sérios. Acima de ~80: muito bom.
  - Não é porcentagem! SUS 68 não significa "68% de satisfação".

O SUS é gratuito, muito estudado e ótimo para **comparar versões** do mesmo produto ao longo do tempo.`,
        match('Ligue a métrica ao que ela mede', [
          ['Taxa de sucesso', 'Quantas pessoas completaram a tarefa'],
          ['Tempo na tarefa', 'Quanto tempo levaram para concluir'],
          ['SEQ', 'Quão fácil foi cada tarefa, de 1 a 7'],
          ['SUS', 'Usabilidade geral percebida, de 0 a 100'],
        ]),
        mc(
          'Uma nota SUS de 68 significa:',
          'Usabilidade próxima da média de mercado',
          ['68% das pessoas ficaram satisfeitas', 'O produto é péssimo', '68 pessoas responderam'],
          'O SUS é uma escala de 0 a 100 que não é porcentagem; cerca de 68 é a média.',
        ),
        `## Da observação ao problema priorizado

1. **Junte as anotações** de todas as sessões (uma planilha ou o FigJam).
2. Liste os **problemas**: onde, o quê, quantas participantes tiveram o problema.
3. Classifique a **severidade** (lembra da escala 0–4 de Nielsen?) combinando **frequência**, **impacto** e **persistência**.
4. Para cada problema, uma **recomendação**.
5. **Priorize**: severidade × esforço para corrigir.

Também registre o que **funcionou bem** — para não "consertar" o que não está quebrado.`,
        scenario(
          'No teste, 5 de 5 pessoas não encontraram a opção de remarcar e 1 de 5 achou o ícone de perfil pequeno.',
          'Como priorizar esses problemas?',
          'Remarcar é prioridade máxima (alta frequência e impacto); o ícone é de baixa prioridade',
          ['Os dois têm a mesma prioridade', 'Primeiro o ícone, porque é mais fácil', 'Nenhum: 5 pessoas é pouco'],
          'Frequência e impacto definem a severidade. Um problema que bloqueia todas as participantes vem primeiro.',
        ),
        `## O relatório de teste

Curto e acionável:

1. **Resumo**: objetivo, quem testou, principais achados e recomendações.
2. **Resultados por tarefa**: sucesso, tempo, SEQ.
3. **Problemas priorizados**: severidade, evidência (fala, print, trecho de vídeo), recomendação.
4. **O que funcionou bem**.
5. **Próximos passos**: o que mudar e o que testar na próxima rodada.

Depois: **itere** o protótipo e, se possível, teste de novo. Esse ciclo é a essência do UX.`,
        multi(
          'O que um bom relatório de teste de usabilidade deve conter?',
          ['Problemas priorizados com evidências', 'Recomendações de melhoria', 'O que funcionou bem'],
          ['Nome completo e telefone das participantes', 'Apenas a nota SUS, sem contexto'],
          'Evidências, recomendações e equilíbrio. Dados pessoais não devem aparecer (LGPD).',
        ),
        fill(
          'A média de mercado da nota SUS fica por volta de ___.',
          '68',
          ['10', '100', '50,5'],
          'Use como referência para saber se a usabilidade está abaixo ou acima da média.',
        ),
        order(
          'Ordene o ciclo depois de um teste de usabilidade:',
          ['Consolidar as anotações', 'Listar e classificar os problemas', 'Priorizar e recomendar', 'Iterar o protótipo', 'Testar novamente'],
          'Aprender, priorizar, mudar e validar de novo: o coração do processo de design.',
        ),
      ],
      flashcards: [
        ['Taxa de sucesso', 'Percentual (ou contagem) de participantes que completaram a tarefa.'],
        ['SEQ (Single Ease Question)', 'Pergunta após cada tarefa: de 1 a 7, quão fácil foi?'],
        ['SUS (System Usability Scale)', 'Questionário de 10 itens; nota de 0 a 100, média ~68. Não é porcentagem.'],
        ['Severidade', 'Combinação de frequência, impacto e persistência de um problema de usabilidade.'],
      ],
      resources: [
        { title: 'Measuring U — SUS (Jeff Sauro)', url: 'https://measuringu.com/sus/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Teste de usabilidade com 5 pessoas',
      summary: 'Planeje, conduza e analise um teste de usabilidade completo do seu protótipo.',
      minutes: 420,
      tool: 'pesquisa',
      brief: `## O teste mais importante do curso

Você vai testar o protótipo de alta fidelidade com **5 pessoas do seu público**.

### Plano

- Objetivo, perfil, método (moderado — presencial ou por vídeo com o protótipo do Figma).
- **4 a 5 tarefas** realistas, com cenário e critério de sucesso.
- Métricas: sucesso, tempo aproximado, SEQ após cada tarefa e SUS no final.

### Planilha de registro (uma linha por participante × tarefa)

| Participante | Tarefa | Sucesso (sim/parcial/não) | Tempo | SEQ (1–7) | Observações e falas |
|---|---|---|---|---|---|

### Análise

- Taxa de sucesso por tarefa e média de SEQ.
- Nota SUS média (use uma calculadora de SUS online ou a fórmula).
- Lista de problemas com severidade e recomendação.

> 💡 Peça autorização para gravar a tela: 2 ou 3 trechos curtos de vídeo mostrando um problema valem ouro no seu estudo de caso.`,
      steps: [
        'Escreva o plano de teste (objetivo, perfil, tarefas com cenários, métricas).',
        'Prepare o questionário SUS (Google Forms) e a planilha de registro.',
        'Faça um piloto com 1 pessoa e ajuste tarefas e protótipo.',
        'Conduza o teste com 5 participantes do perfil, com pensar em voz alta.',
        'Registre sucesso, tempo, SEQ e observações de cada tarefa.',
        'Calcule a taxa de sucesso por tarefa, a média de SEQ e a nota SUS.',
        'Liste os problemas com severidade, evidência e recomendação.',
        'Escreva o relatório de 1 a 2 páginas com resumo, resultados, problemas e próximos passos.',
      ],
      deliverable: 'Link do relatório do teste (plano, planilha de registro, métricas, problemas priorizados e próximos passos).',
      rubric: [
        'O plano tem objetivo, perfil, tarefas com cenário e métricas',
        'As tarefas não entregam a resposta (sem palavras da interface)',
        'Fiz um piloto antes',
        'Testei com 5 pessoas do perfil',
        'Mantive a neutralidade e pedi para pensarem em voz alta',
        'Calculei sucesso, SEQ e SUS corretamente',
        'Os problemas estão priorizados por severidade, com evidências',
        'O relatório é curto, claro e tem recomendações',
      ],
      resources: [
        { title: 'Maze — testes não moderados (plano gratuito)', url: 'https://maze.co/', kind: 'ferramenta', lang: 'en' },
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Depois de um teste, o time só olhou a nota SUS (72) e concluiu que "está tudo bem", sem ler as observações.',
      'Qual é o risco?',
      'Ignorar problemas graves em tarefas específicas que a nota geral não mostra',
      ['Nenhum: 72 está acima da média', 'A nota SUS deveria ser porcentagem', 'O time deveria ter usado NPS'],
      'Uma nota geral razoável pode esconder uma tarefa crítica em que quase todos falham.',
    ),
    mc(
      'Qual é uma boa tarefa para um teste de usabilidade de um app de adoção de pets?',
      '"Você mora em apartamento e quer adotar um cachorro de porte pequeno. Encontre um e demonstre interesse."',
      ['"Toque em Filtros, depois em Porte e escolha Pequeno."', '"Você gosta deste app?"', '"Avalie as cores da tela inicial."'],
      'Tem cenário realista, objetivo claro e não entrega o caminho.',
    ),
    tf(
      'Se a participante travar por muito tempo e ficar frustrada, a facilitadora pode encerrar a tarefa com gentileza e registrar como falha.',
      true,
      'Respeitar a pessoa é mais importante do que forçar o fim da tarefa — e a falha já é o dado de que você precisa.',
    ),
  ],
}
