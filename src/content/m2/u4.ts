import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u4: UnitDef = {
  title: 'Jornadas, concorrentes e comunicação',
  goal: 'Mapear a jornada do usuário, analisar concorrentes e comunicar a pesquisa de forma convincente.',
  lessons: [
    {
      title: 'Mapa de jornada do usuário',
      summary: 'Fases, ações, pensamentos, emoções, dores e oportunidades — e o blueprint de serviço.',
      minutes: 20,
      steps: [
        `## Enxergando a experiência no tempo

O **mapa de jornada** (*journey map*) mostra, numa linha do tempo, tudo o que uma pessoa vive para atingir um objetivo — **antes, durante e depois** de usar o produto.

::journey

Ele revela **onde** a experiência quebra e **quais momentos** merecem mais atenção. É ótimo para alinhar times que só enxergam "a sua parte" (marketing, atendimento, tecnologia…).`,
        `## As partes de um mapa de jornada

1. **Persona e cenário**: quem e qual objetivo ("Cláudia quer encher a agenda de sábado").
2. **Fases**: grandes etapas (Descobrir → Agendar → Esperar → Ser atendida → Depois).
3. **Ações**: o que a pessoa faz em cada fase.
4. **Pensamentos**: dúvidas e perguntas ("Será que tem horário?").
5. **Emoções**: a curva emocional, do ótimo ao péssimo.
6. **Pontos de contato**: onde a interação acontece (Instagram, WhatsApp, salão…).
7. **Pontos de dor**: os problemas.
8. **Oportunidades**: ideias de melhoria para cada dor.

Importante: o mapa deve ser **baseado em pesquisa**, como a persona.`,
        order(
          'Ordene as fases típicas de uma jornada de agendamento:',
          ['Descobrir o serviço', 'Agendar o horário', 'Esperar o dia', 'Ser atendida', 'Avaliar e voltar'],
          'Uma jornada começa antes do produto (descobrir) e termina depois (avaliar e voltar). Muitas oportunidades estão nas pontas.',
        ),
        match('Ligue o elemento do mapa ao exemplo', [
          ['Ação', 'Manda mensagem no WhatsApp pedindo horário'],
          ['Pensamento', '"Será que ela vai responder hoje?"'],
          ['Ponto de dor', 'Espera 5 horas por uma resposta'],
          ['Oportunidade', 'Mostrar horários livres sem precisar perguntar'],
          ['Ponto de contato', 'Instagram do salão'],
        ]),
        `## Jornada atual × jornada futura

- **Jornada atual** (*as-is*): como a experiência é **hoje**. Serve para encontrar problemas.
- **Jornada futura** (*to-be*): como queremos que **seja**. Serve para alinhar a visão da solução.

Comece **sempre** pela atual: sem entender o hoje, a jornada futura vira desejo.

## Blueprint de serviço

O **blueprint de serviço** vai além da jornada: mostra também o que acontece **nos bastidores** para que a experiência aconteça.

- **Linha de frente** (*frontstage*): o que a cliente vê (a recepcionista, o app).
- **Bastidores** (*backstage*): o que ela não vê (a manicure confere a agenda no caderno, o estoque de esmaltes).
- **Processos de suporte**: sistemas, pagamentos, fornecedores.`,
        mc(
          'O que um blueprint de serviço mostra que um mapa de jornada normalmente não mostra?',
          'Os bastidores e processos internos que sustentam a experiência',
          ['As emoções da pessoa', 'As fases da jornada', 'Os pontos de contato'],
          'A jornada foca no ponto de vista da pessoa usuária; o blueprint conecta isso ao que a organização faz por trás.',
        ),
        fill(
          'Os momentos ou canais em que a pessoa interage com o serviço (app, WhatsApp, balcão) são chamados de pontos de ___.',
          'contato',
          ['dor', 'fuga', 'partida'],
          'Pontos de contato (touchpoints) mostram onde a experiência acontece — e onde pode quebrar.',
        ),
        tf(
          'Um mapa de jornada deve ser criado com base em pesquisa, e não apenas na imaginação do time.',
          true,
          'Assim como personas, jornadas inventadas viram ficção. Use as falas e os comportamentos reais da pesquisa.',
        ),
        scenario(
          'O mapa de jornada mostra que a emoção da cliente despenca na fase "Esperar o dia", porque ela não sabe se o horário continua confirmado.',
          'Qual seria uma boa oportunidade para essa fase?',
          'Enviar uma confirmação e um lembrete com opção de confirmar ou remarcar',
          ['Mudar a cor do logotipo', 'Aumentar o preço do serviço', 'Remover a fase do mapa'],
          'Oportunidades nascem das dores. Aqui, a incerteza pede confirmação e controle.',
        ),
      ],
      flashcards: [
        ['Mapa de jornada', 'Visualização das fases, ações, pensamentos, emoções, dores e oportunidades de uma pessoa ao atingir um objetivo.'],
        ['Ponto de contato (touchpoint)', 'Qualquer momento ou canal em que a pessoa interage com o serviço (app, WhatsApp, loja, e-mail).'],
        ['Ponto de dor', 'Problema ou frustração em um momento da jornada.'],
        ['Jornada atual vs. futura', 'Atual (as-is) = como é hoje. Futura (to-be) = como queremos que seja.'],
        ['Blueprint de serviço', 'Mapa que mostra a experiência da pessoa (frontstage) e os bastidores que a sustentam (backstage).'],
      ],
      resources: [
        { title: 'Journey Mapping 101 (NN/g)', url: 'https://www.nngroup.com/articles/journey-mapping-101/', kind: 'artigo', lang: 'en' },
        { title: 'Service Blueprints: Definition (NN/g)', url: 'https://www.nngroup.com/articles/service-blueprints-definition/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Análise competitiva e benchmarking',
      summary: 'Concorrentes diretos, indiretos e análogos, matriz de comparação e garimpo de avaliações.',
      minutes: 15,
      steps: [
        `## Por que olhar os concorrentes

**Análise competitiva** é estudar produtos que resolvem problemas parecidos para entender:

- O que as pessoas **já estão acostumadas** a ver (Lei de Jakob!)
- O que funciona bem e o que **frustra** os usuários deles
- **Lacunas**: necessidades que ninguém atende bem

**Benchmarking** é usar referências (inclusive de outros mercados) como **parâmetro** de qualidade para um fluxo ou funcionalidade.`,
        `## Tipos de concorrentes

- **Diretos**: mesma solução, mesmo público. (Outros apps de agendamento de beleza.)
- **Indiretos**: solução diferente para o mesmo problema. (WhatsApp, caderninho, Instagram, ligação.)
- **Análogos (inspiração)**: outro mercado, problema parecido. (Como apps de clínicas ou restaurantes lidam com reservas e faltas?)

Os indiretos são os mais esquecidos — e muitas vezes os mais fortes. Para muita manicure, o concorrente do seu app **é o WhatsApp**.`,
        match('Classifique os concorrentes de um app de agendamento para salões', [
          ['Outro app de agendamento de beleza', 'Direto'],
          ['WhatsApp + caderninho', 'Indireto'],
          ['App de reserva de restaurantes', 'Análogo'],
        ]),
        scenario(
          'Uma designer analisou 5 apps de adoção de animais e concluiu que "não há concorrência forte". Ela não considerou os perfis de ONGs no Instagram.',
          'Que tipo de concorrente ficou de fora?',
          'Concorrentes indiretos — que resolvem o mesmo problema de outra forma',
          ['Concorrentes diretos', 'Concorrentes internacionais', 'Fornecedores'],
          'Instagram e grupos de WhatsApp são, hoje, a principal forma de adoção para muita gente. Ignorá-los distorce a análise.',
        ),
        `## A matriz de comparação

Monte uma tabela com os concorrentes nas colunas e critérios nas linhas:

| Critério | App A | App B | WhatsApp |
|---|---|---|---|
| Ver horários livres sem perguntar | ✅ | ✅ | ❌ |
| Lembrete automático | ✅ | ❌ | ❌ |
| Custo para a profissional | R$ 49/mês | Grátis com taxa | Grátis |
| Contato pessoal | ❌ | ❌ | ✅ |
| Nota na loja de apps | 4,1 | 3,2 | — |

Também vale **testar o fluxo principal** de cada concorrente e tirar prints, como numa mini avaliação heurística.`,
        `## Garimpando avaliações

As **avaliações de 1 a 3 estrelas** na Play Store e na App Store (e reclamações em sites de reclamação ao consumidor) são pesquisa secundária gratuita:

- Agrupe por tema (como num diagrama de afinidade).
- Conte frequências ("12 avaliações reclamam de notificações demais").
- Copie falas marcantes.

> ⚠️ Benchmarking é para **aprender**, não para copiar. Copiar a solução de outro sem entender o contexto dele pode trazer os problemas junto.`,
        multi(
          'Quais são bons usos da análise competitiva?',
          ['Entender convenções que os usuários já conhecem', 'Encontrar lacunas que ninguém atende bem', 'Descobrir reclamações frequentes nas avaliações'],
          ['Copiar telas de um concorrente sem adaptar', 'Substituir a pesquisa com usuários'],
          'A análise complementa a pesquisa com usuários; não a substitui.',
        ),
        fill(
          'Usar referências de outros mercados (ex.: reservas de restaurante para inspirar agendamento de salão) é olhar concorrentes ___.',
          'análogos',
          ['diretos', 'falsos', 'locais'],
          'Concorrentes análogos trazem soluções criativas já testadas em outros contextos.',
        ),
        mc(
          'Qual é o maior risco de copiar a solução de um concorrente sem pesquisa?',
          'Trazer junto problemas e decisões que faziam sentido só no contexto dele',
          ['Ficar parecido demais visualmente', 'Gastar menos tempo de design', 'Ter um produto mais rápido'],
          'Você vê a tela, mas não vê os dados, as restrições e os erros por trás dela. Aprenda com referências — e valide no seu contexto.',
        ),
        tf(
          'Avaliações negativas em lojas de aplicativos podem ser usadas como fonte de pesquisa secundária.',
          true,
          'São relatos espontâneos de problemas reais. Basta organizar e contar.',
        ),
      ],
      flashcards: [
        ['Análise competitiva', 'Estudo de produtos que resolvem problemas parecidos para entender convenções, forças, fraquezas e lacunas.'],
        ['Benchmarking', 'Usar referências (inclusive de outros mercados) como parâmetro de qualidade.'],
        ['Concorrente indireto', 'Resolve o mesmo problema com outra solução (ex.: WhatsApp e caderninho para agendar).'],
        ['Concorrente análogo', 'De outro mercado, mas com problema parecido — fonte de inspiração.'],
      ],
      resources: [
        { title: 'Competitive Usability Evaluations (NN/g)', url: 'https://www.nngroup.com/articles/competitive-usability-evaluations/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Comunicando a pesquisa',
      summary: 'Relatórios enxutos, storytelling e como fazer o time agir a partir dos achados.',
      minutes: 15,
      steps: [
        `## Pesquisa que ninguém lê não existe

Uma pesquisa só tem valor se **muda decisões**. Por isso, comunicar é tão importante quanto pesquisar.

Regra de ouro: **adapte ao público**.

- **Diretoria**: 1 página. Principais achados, impacto no negócio, recomendação.
- **Time de produto**: achados com evidências, priorizados, com recomendações acionáveis.
- **Repositório**: tudo documentado para consulta futura.`,
        `## Estrutura de um relatório enxuto

1. **Resumo executivo** (o mais importante primeiro!): 3 a 5 achados principais + recomendações.
2. **Contexto e objetivo**: por que pesquisamos.
3. **Método**: o que fizemos, com quem, quantas pessoas.
4. **Achados**: cada um com **evidência** (falas, números, vídeos curtos) e **severidade/impacto**.
5. **Recomendações** e próximos passos.
6. **Anexos**: roteiro, perfil dos participantes.

Note que é o contrário de um trabalho escolar: a **conclusão vem primeiro**. Muita gente só vai ler o começo.`,
        order(
          'Ordene as seções de um relatório de pesquisa enxuto:',
          ['Resumo executivo', 'Contexto e objetivo', 'Método', 'Achados com evidências', 'Recomendações'],
          'Comece pela conclusão. Quem quiser detalhes continua lendo.',
        ),
        `## Contando histórias com dados

Pessoas lembram de **histórias**, não de tabelas:

- Use **falas reais** e, quando possível, **vídeos curtos** (com autorização). Ver uma pessoa frustrada muda opiniões mais do que qualquer gráfico.
- Apresente a persona como uma pessoa, com contexto e emoções.
- Combine **um número** (escala) com **uma história** (profundidade): "4 de 5 participantes esqueceram um horário no último mês. A Joana perdeu R$ 120 porque…"
- Mostre a jornada para dar uma **visão do todo**.`,
        mc(
          'Qual combinação torna um achado de pesquisa mais convincente?',
          'Um dado de escala combinado com uma história ou fala real',
          ['Só a opinião da designer', 'Um texto longo com todos os detalhes', 'Apenas um gráfico sem contexto'],
          'Números mostram o tamanho; histórias criam empatia. Juntos, convencem.',
        ),
        `## Achados acionáveis

Um achado bom diz **o que fazer com ele**:

- ❌ "As usuárias acharam o processo confuso."
- ✅ "4 de 5 participantes não encontraram onde remarcar porque a opção está dentro de 'Mais'. **Recomendação**: botão 'Remarcar' visível no card do agendamento. **Impacto**: alto (remarcações viram faltas)."

Priorize os achados por **impacto** e **frequência**. Ninguém consegue agir em 40 achados ao mesmo tempo.

## Envolver o time desde o início

A melhor forma de fazer o time acreditar na pesquisa: **convidá-lo para assistir** às entrevistas e participar da síntese. Quem viu com os próprios olhos não precisa ser convencido.`,
        scenario(
          'Depois da pesquisa, a designer apresentou 38 achados com o mesmo peso, em 60 slides. Nada mudou no produto.',
          'O que ela poderia ter feito diferente?',
          'Priorizar poucos achados por impacto, com evidências e recomendações claras, e começar pelo resumo',
          ['Usar slides mais coloridos', 'Apresentar ainda mais achados', 'Enviar só as gravações completas'],
          'Excesso de informação sem prioridade paralisa. Foco, evidência e recomendação geram ação.',
        ),
        multi(
          'Quais práticas aumentam o impacto da pesquisa no time?',
          ['Convidar o time para assistir às entrevistas', 'Começar o relatório pelo resumo executivo', 'Transformar achados em recomendações'],
          ['Esconder os achados que contrariam a opinião do chefe', 'Entregar apenas as transcrições completas'],
          'Transparência, foco e participação do time fazem a pesquisa virar decisão.',
        ),
        fill(
          'Num relatório de pesquisa, o ___ executivo vem primeiro, com os principais achados e recomendações.',
          'resumo',
          ['anexo', 'índice', 'glossário'],
          'Muitas pessoas só leem o começo. Coloque lá o que mais importa.',
        ),
        open(
          'Escreva um achado acionável do seu projeto no formato: [O que vimos] + [evidência] + [recomendação] + [impacto].',
          'Exemplo: "3 de 5 manicures perdem pedidos de horário durante o atendimento (P2: \'quando vejo a mensagem, a cliente já marcou com outra\'). Recomendação: permitir que clientes vejam horários livres e reservem sem esperar resposta. Impacto: alto." Esse formato vai direto para o seu estudo de caso.',
        ),
      ],
      flashcards: [
        ['Resumo executivo', 'Primeira seção do relatório, com os principais achados e recomendações em poucas linhas.'],
        ['Achado acionável', 'Achado com evidência, recomendação clara e impacto — o time sabe o que fazer com ele.'],
        ['Repositório de pesquisa', 'Lugar organizado onde a empresa guarda pesquisas para consulta futura.'],
      ],
      resources: [
        { title: 'Storytelling with Data — Cole Nussbaumer Knaflic', kind: 'livro', lang: 'pt', note: 'Edição em português: "Storytelling com Dados".' },
      ],
    },
  ],
  practices: [
    {
      title: 'Mapa de jornada e análise competitiva',
      summary: 'Mapeie a jornada atual da sua persona e compare 4 concorrentes (incluindo indiretos).',
      minutes: 240,
      tool: 'figjam',
      brief: `## Duas visões do mesmo problema

### Parte 1 — Mapa de jornada atual

Usando as entrevistas, monte a **jornada atual** da sua persona no FigJam ou Figma com as linhas: fases, ações, pensamentos, emoções (curva), pontos de contato, dores e oportunidades.

### Parte 2 — Análise competitiva

Escolha **4 concorrentes**: pelo menos **2 diretos** e **1 indireto** (e, se quiser, 1 análogo).

1. Monte a **matriz de comparação** com 6 a 8 critérios relevantes para a sua persona.
2. Teste o **fluxo principal** de 2 concorrentes diretos, com prints.
3. Leia **20 avaliações negativas** dos concorrentes na loja de apps e agrupe por tema.
4. Escreva 3 **lacunas** (oportunidades que ninguém atende bem).`,
      steps: [
        'Crie a estrutura do mapa de jornada com 4 a 6 fases.',
        'Preencha ações, pensamentos e pontos de contato usando falas e fatos das entrevistas.',
        'Desenhe a curva emocional e marque os 3 maiores pontos de dor.',
        'Escreva uma oportunidade para cada ponto de dor.',
        'Escolha os 4 concorrentes e monte a matriz de comparação.',
        'Teste o fluxo principal de 2 concorrentes diretos e cole os prints com anotações.',
        'Garimpe 20 avaliações negativas, agrupe por tema e conte as frequências.',
        'Escreva 3 lacunas de mercado conectadas às dores da sua persona.',
      ],
      deliverable: 'Link do FigJam/Figma com o mapa de jornada atual e a análise competitiva (matriz, prints, avaliações agrupadas e lacunas).',
      rubric: [
        'A jornada é baseada nas entrevistas (tem falas reais)',
        'A jornada tem fases, ações, pensamentos, emoções, dores e oportunidades',
        'A curva emocional destaca os momentos críticos',
        'Analisei 4 concorrentes, incluindo pelo menos 1 indireto',
        'A matriz tem critérios relevantes para a persona',
        'Testei e documentei o fluxo de 2 concorrentes',
        'Agrupei avaliações negativas por tema com contagem',
        'Identifiquei 3 lacunas ligadas às dores da persona',
      ],
      tips: ['Busque "journey map" na Comunidade do Figma para templates gratuitos de FigJam.'],
    },
  ],
  checkpointExtra: [
    mc(
      'Para que serve principalmente o mapa de jornada atual (as-is)?',
      'Encontrar os pontos de dor e oportunidades na experiência de hoje',
      ['Mostrar como o produto final vai funcionar', 'Definir as cores da marca', 'Calcular o preço do serviço'],
      'A jornada atual revela problemas reais; a futura organiza a visão da solução.',
    ),
    scenario(
      'Uma ONG quer entender por que doadores param de doar depois de 3 meses. O time tem 1 semana.',
      'Qual combinação faz mais sentido?',
      'Olhar os dados de quem cancelou e entrevistar 5 ex-doadores',
      ['Fazer um app novo de doações', 'Criar uma proto-persona e encerrar', 'Só copiar o fluxo de outra ONG'],
      'Dados mostram quem e quando; entrevistas mostram por quê. Dá para fazer em uma semana.',
    ),
    tf(
      'Num relatório para a diretoria, o ideal é começar pelo método detalhado da pesquisa.',
      false,
      'Comece pelo resumo executivo: conclusões e recomendações. O método vem depois para quem quiser os detalhes.',
    ),
  ],
}
