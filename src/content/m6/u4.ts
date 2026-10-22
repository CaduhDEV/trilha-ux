import { fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u4: UnitDef = {
  title: 'Profissional de UX',
  goal: 'Usar IA com responsabilidade, entender modelos de trabalho e planejar seu crescimento depois da trilha.',
  lessons: [
    {
      title: 'IA no trabalho de UX',
      summary: 'Como designers usam IA em 2026, os limites, os riscos e o que continua sendo humano.',
      minutes: 20,
      steps: [
        `## A IA já faz parte do dia a dia

Em 2026, ferramentas de IA estão presentes em quase todo o fluxo de design:

- **Pesquisa**: transcrever e resumir entrevistas, sugerir agrupamentos para a síntese, rascunhar roteiros.
- **Ideação**: gerar variações de ideias, textos e fluxos para explorar.
- **Design**: gerar telas e protótipos a partir de descrições (no Figma, por exemplo, há recursos de IA como o Figma Make e o agente do Figma), sugerir layouts, nomear camadas.
- **Escrita**: rascunhar microcopy, mensagens de erro e documentação.
- **Prototipação em código**: protótipos funcionais criados a partir de texto, sem programar.

Isso **acelera** muito o trabalho. Mas não substitui o que torna um designer valioso.`,
        multi(
          'Em quais tarefas a IA costuma ajudar designers hoje?',
          ['Resumir transcrições de entrevistas', 'Gerar variações de layouts e textos', 'Criar protótipos a partir de descrições'],
          ['Substituir completamente a conversa com usuários reais', 'Garantir sozinha que um design é acessível e ético'],
          'IA acelera tarefas, mas não substitui pessoas reais nem o julgamento profissional.',
        ),
        `## Os limites (e riscos)

- **Alucinações**: a IA pode inventar dados, citações e "insights" com toda confiança. Sempre confira com a fonte.
- **"Usuários sintéticos"**: respostas geradas por IA **não são** pesquisa com pessoas. Elas reproduzem o óbvio e o estereótipo — exatamente o que a pesquisa existe para desafiar.
- **Vieses**: modelos repetem preconceitos dos dados em que foram treinados.
- **Privacidade e LGPD**: **não envie** gravações, nomes ou dados de participantes para ferramentas sem autorização e sem saber como os dados são usados. O consentimento que você pediu à participante não cobre isso automaticamente.
- **Mesmice**: telas geradas tendem a ser genéricas. A diferenciação vem do entendimento do problema.`,
        scenario(
          'Para economizar tempo, um designer pede a uma IA: "Finja ser 5 manicures e responda às perguntas da minha entrevista." Ele usa as respostas como pesquisa.',
          'Qual é o problema?',
          'Respostas geradas não são dados reais: reproduzem estereótipos e escondem o que só pessoas reais revelam',
          ['Nenhum: é mais rápido e barato', 'Deveria ter pedido 50 manicures', 'O problema é só a formatação'],
          'IA pode ajudar a preparar o roteiro, mas a pesquisa precisa de pessoas de verdade.',
        ),
        tf(
          'Enviar a gravação de uma entrevista para qualquer ferramenta de IA está coberto pelo consentimento que a participante deu para gravar.',
          false,
          'O consentimento é para uma finalidade específica. Usar ferramentas de terceiros exige cuidado com a LGPD e, idealmente, autorização explícita e dados anonimizados.',
        ),
        `## O que continua sendo seu

Com a IA fazendo mais do trabalho "braçal", ganham valor as habilidades que você desenvolveu nesta trilha:

- **Entender pessoas** de verdade (pesquisa, empatia, observação).
- **Definir o problema certo** — a IA responde ao que você pergunta.
- **Julgamento e curadoria**: escolher, entre 50 variações, a que resolve o problema — e explicar por quê.
- **Ética e acessibilidade**: garantir que o produto respeita e inclui.
- **Comunicação e colaboração** com o time e stakeholders.

Pense na IA como uma **assistente rápida e às vezes confusa**: ótima para rascunhos, péssima para decidir sozinha.`,
        mc(
          'Qual habilidade fica MAIS valiosa com o avanço da IA no design?',
          'Definir o problema certo e julgar quais soluções realmente atendem às pessoas',
          ['Desenhar retângulos rapidamente', 'Decorar atalhos de teclado', 'Produzir o maior número de telas'],
          'Quanto mais fácil é gerar soluções, mais valioso é saber qual problema resolver e escolher bem.',
        ),
        match('Ligue o uso de IA à avaliação', [
          ['Rascunhar 10 versões de uma mensagem de erro para revisar', 'Bom uso'],
          ['Usar respostas inventadas como se fossem entrevistas', 'Mau uso'],
          ['Resumir transcrições anonimizadas e conferir com as notas', 'Bom uso'],
          ['Publicar números gerados pela IA sem checar a fonte', 'Mau uso'],
        ]),
        fill(
          'Quando a IA inventa informações com aparência de verdade, chamamos isso de ___.',
          'alucinação',
          ['iteração', 'prototipação', 'heurística'],
          'Por isso, tudo o que a IA produz precisa ser verificado.',
        ),
        open(
          'Escreva uma "regra pessoal" para usar IA no seu trabalho de design (ex.: o que você vai e o que não vai fazer com ela).',
          'Ter regras claras protege você, as participantes da pesquisa e a qualidade do trabalho. Em entrevistas de emprego, falar sobre isso com maturidade é um diferencial.',
        ),
      ],
      flashcards: [
        ['Alucinação (IA)', 'Quando a IA gera informações falsas com aparência de verdade.'],
        ['Usuários sintéticos', 'Respostas de "usuários" geradas por IA — não substituem pesquisa com pessoas reais.'],
        ['IA e LGPD na pesquisa', 'Não enviar dados de participantes a ferramentas sem autorização; anonimizar sempre.'],
        ['Julgamento de design', 'Escolher e justificar a melhor solução entre muitas — habilidade que a IA não substitui.'],
      ],
      resources: [
        { title: 'AI for UX: articles and research (NN/g)', url: 'https://www.nngroup.com/topic/ai/', kind: 'site', lang: 'en' },
      ],
    },
    {
      title: 'Modelos de trabalho e os primeiros 90 dias',
      summary: 'CLT, PJ e freelance, como precificar um projeto e como começar bem no primeiro emprego.',
      minutes: 15,
      steps: [
        `## Modelos de trabalho

- **CLT**: carteira assinada, salário fixo, férias, 13º, FGTS e benefícios. Mais segurança.
- **PJ**: você abre uma empresa e emite nota fiscal para um contratante. Valor bruto maior, mas impostos e "benefícios" por sua conta.
- **Freelance**: projetos avulsos para clientes diversos. Flexível, mas a renda varia e você precisa vender o seu trabalho.

Para formalizar como PJ ou freelancer, **converse com um(a) contador(a)** sobre a melhor forma (as regras mudam e dependem da atividade).

Muita gente começa CLT para **aprender com um time**, e só depois parte para freelas ou PJ.`,
        match('Ligue o modelo de trabalho à característica', [
          ['CLT', 'Férias, 13º e FGTS garantidos'],
          ['PJ', 'Emite nota fiscal e cuida dos próprios impostos'],
          ['Freelance', 'Projetos avulsos para clientes diferentes'],
        ]),
        `## Freelas: o básico para não se dar mal

- Entenda o **problema** antes de dar preço (uma conversa de descoberta).
- Defina o **escopo** por escrito: o que está incluído e o que **não** está. Quantas rodadas de ajuste?
- Prefira **preço por projeto** (baseado em estimativa de horas + valor entregue) a preço por tela.
- Tenha um **contrato simples**, com prazos, pagamentos (ex.: 50% de entrada) e direitos de uso.
- Combine **pesquisa e testes** no escopo — é o que diferencia você de quem "só faz telas".`,
        scenario(
          'Uma cliente pede "só um app simples" por mensagem e quer o preço na hora.',
          'Qual é a postura mais profissional?',
          'Marcar uma conversa para entender o problema, definir escopo por escrito e então enviar uma proposta',
          ['Dar um preço baixo na hora para não perder a cliente', 'Começar a desenhar sem combinar nada', 'Recusar qualquer projeto de app'],
          'Sem escopo, "só um app simples" vira um projeto infinito e mal pago.',
        ),
        `## Os primeiros 90 dias no emprego

**Primeiros 30 dias — aprender:**

- Entenda o produto, o negócio e os usuários (leia pesquisas antigas, assista sessões gravadas, use o produto).
- Conheça as pessoas: PMs, devs, atendimento, outras designers. Pergunte muito.
- Estude o design system e os processos do time.

**30 a 60 dias — contribuir:**

- Pegue uma entrega pequena e faça bem feito.
- Peça feedback cedo e com frequência.

**60 a 90 dias — ganhar autonomia:**

- Proponha uma melhoria baseada em evidência.
- Documente o que aprendeu e ajude quem chegar depois de você.

> 💡 Ninguém espera que uma júnior saiba tudo. Esperam curiosidade, comunicação e evolução.`,
        tf(
          'Nos primeiros dias de um novo emprego, o ideal é propor um redesign completo do produto para mostrar serviço.',
          false,
          'Primeiro entenda o contexto, as pessoas e os motivos das decisões atuais. Contribuições pequenas e bem feitas constroem confiança.',
        ),
        multi(
          'Quais atitudes ajudam nos primeiros 30 dias de trabalho?',
          ['Ler pesquisas antigas e usar o produto', 'Conhecer pessoas de várias áreas', 'Estudar o design system do time'],
          ['Evitar perguntas para parecer experiente', 'Ignorar as decisões anteriores do time'],
          'Aprender o contexto é o melhor investimento do começo.',
        ),
        mc(
          'Por que é comum começar a carreira de UX como CLT num time, antes de partir para freelas?',
          'Porque trabalhar com outras designers, PMs e devs acelera muito o aprendizado',
          ['Porque freelas são proibidos para iniciantes', 'Porque CLT paga sempre mais', 'Porque não existe freela em UX'],
          'Ter referências, revisões e um processo maduro por perto faz você evoluir mais rápido no começo.',
        ),
        fill(
          'Num projeto freelance, definir por escrito o que está incluído e o que não está é definir o ___.',
          'escopo',
          ['layout', 'grid', 'persona'],
          'Escopo claro protege você e a cliente.',
        ),
      ],
      flashcards: [
        ['CLT vs. PJ vs. freelance', 'CLT: vínculo e benefícios. PJ: empresa própria e impostos por sua conta. Freelance: projetos avulsos.'],
        ['Escopo de projeto', 'O que está e o que não está incluído, por escrito, com rodadas de ajuste e prazos.'],
        ['Primeiros 90 dias', 'Aprender (30), contribuir (60), ganhar autonomia (90).'],
      ],
    },
    {
      title: 'Crescimento contínuo',
      summary: 'Níveis de carreira, especializações e o seu plano para os próximos 12 meses.',
      minutes: 15,
      steps: [
        `## Os níveis da carreira

- **Júnior**: executa com orientação, aprende o processo, entrega partes de projetos.
- **Pleno**: conduz projetos de ponta a ponta com autonomia, influencia decisões do time.
- **Sênior**: lidera iniciativas complexas, orienta pessoas, conecta design à estratégia.
- Depois, dois caminhos: **especialista** (staff, principal) ou **gestão** (lead, manager, head de design).

A passagem de júnior para pleno costuma levar de **2 a 3 anos** — depende muito de onde você trabalha e de quanto pratica.`,
        mc(
          'O que costuma diferenciar uma designer pleno de uma júnior?',
          'Conduzir projetos de ponta a ponta com autonomia e influenciar decisões',
          ['Saber mais atalhos do Figma', 'Ter mais seguidores no LinkedIn', 'Trabalhar mais horas por dia'],
          'Autonomia e influência marcam a evolução — não a quantidade de ferramentas.',
        ),
        `## Especializações

Com o tempo, você pode se aprofundar em uma área:

| Especialização | Foco |
|---|---|
| **UX research** | Pesquisa com pessoas, métodos qualitativos e quantitativos |
| **UI / visual design** | Interfaces, marca, ilustração, motion |
| **Interaction design** | Comportamentos, microinterações, protótipos complexos |
| **Content design / UX writing** | Linguagem, conteúdo, voz e tom |
| **Design systems** | Componentes, tokens, governança, ponte com o código |
| **Service design** | Experiências completas, dentro e fora das telas |
| **Acessibilidade** | Inclusão, auditorias, normas |
| **DesignOps** | Processos, ferramentas e operação do time |

Não precisa escolher agora. Repare no que te dá mais energia nos projetos.`,
        match('Ligue a especialização ao foco', [
          ['UX research', 'Métodos de pesquisa com pessoas'],
          ['Content design', 'Linguagem e conteúdo da interface'],
          ['Design systems', 'Componentes, tokens e governança'],
          ['Service design', 'Experiências dentro e fora das telas'],
        ]),
        `## Hábitos de quem cresce

- **Ler** (um livro por mês já é muito): *O Design do Dia a Dia*, *Não me faça pensar*, *Refactoring UI*, *Sprint*, *Inspirado*, *Just Enough Research*.
- **Praticar** fora do trabalho: desafios, projetos voluntários, redesigns com pesquisa.
- **Ensinar**: escrever, mentorar quem está começando — é a forma mais rápida de aprender.
- **Pedir feedback** constantemente.
- **Cuidar da saúde mental**: a **síndrome do impostor** (sentir que é uma fraude, apesar das evidências) é muito comum em quem muda de carreira. Olhe para trás: há 6 meses você não sabia o que era uma heurística. 💜`,
        tf(
          'A síndrome do impostor é rara entre pessoas que mudam de carreira para UX.',
          false,
          'É muito comum. Reconhecer o quanto você evoluiu (com evidências concretas) ajuda a lidar com ela.',
        ),
        scenario(
          'Depois de concluir a trilha, uma designer sente que "não sabe nada" ao ver portfólios de pessoas sêniores.',
          'Qual é a perspectiva mais saudável e realista?',
          'Comparar-se com a própria evolução e seguir praticando; sêniores têm anos de experiência a mais',
          ['Desistir de UX', 'Fazer mais 5 cursos antes de procurar emprego', 'Copiar os portfólios dos sêniores'],
          'Compare-se com quem você era ontem. Cada projeto, teste e conversa soma experiência.',
        ),
        multi(
          'Quais hábitos ajudam a crescer depois da trilha?',
          ['Ler regularmente sobre design', 'Fazer projetos práticos e voluntários', 'Ensinar e mentorar quem está começando'],
          ['Parar de estudar depois do primeiro emprego', 'Evitar feedback para não se frustrar'],
          'Aprendizado contínuo é parte da profissão.',
        ),
        fill(
          'A sensação de ser uma fraude, apesar das evidências de competência, é chamada de síndrome do ___.',
          'impostor',
          ['pânico', 'perfeccionista', 'especialista'],
          'Ela é comum e tem nome — e falar sobre ela ajuda.',
        ),
        open(
          'Escreva 3 metas para os seus próximos 12 meses como designer (ex.: conseguir a primeira vaga, fazer um projeto voluntário, ler 6 livros).',
          'Metas concretas e com prazo viram plano. Revise-as a cada 3 meses — e celebre cada conquista. Você chegou ao fim da trilha: isso já é enorme! 🎓',
        ),
      ],
      flashcards: [
        ['Júnior → pleno → sênior', 'Evolução marcada por autonomia, influência e liderança, não por ferramentas.'],
        ['Especializações em UX', 'Research, UI, interação, conteúdo, design systems, serviço, acessibilidade, DesignOps.'],
        ['Síndrome do impostor', 'Sentir-se uma fraude apesar das evidências de competência — comum na transição de carreira.'],
      ],
      resources: [
        { title: 'Just Enough Research — Erika Hall', kind: 'livro', lang: 'en' },
        { title: 'Interaction Design Foundation — cursos', url: 'https://www.interaction-design.org/', kind: 'curso', lang: 'en' },
        { title: 'Google UX Design Professional Certificate (Coursera)', url: 'https://www.coursera.org/professional-certificates/google-ux-design', kind: 'curso', lang: 'en', note: 'Ótimo complemento com certificado reconhecido pelo mercado.' },
      ],
    },
  ],
  practices: [
    {
      title: 'Kit de candidatura e plano de 12 meses',
      summary: 'Deixe tudo pronto para começar a se candidatar e planeje os próximos passos.',
      minutes: 240,
      tool: 'escrita',
      brief: `## Pronta(o) para o mercado

### Kit de candidatura

1. **Currículo** final em PDF (1 página, texto selecionável, link do portfólio no topo).
2. **LinkedIn** atualizado: foto, título, sobre, destaques com cases, projetos, habilidades.
3. **Mensagem de apresentação** modelo (5 a 7 linhas) para adaptar a cada vaga.
4. **Pitch** "fale sobre você" ensaiado.
5. **5 histórias STAR** escritas.
6. **Lista de 15 empresas** onde você gostaria de trabalhar, com o motivo.
7. **Planilha** de acompanhamento de candidaturas.

### Plano de 12 meses

- 3 metas (com prazo).
- O que vai estudar (livros, cursos).
- Projetos práticos (ex.: 1 voluntário).
- Comunidade: eventos, mentorias.`,
      steps: [
        'Finalize o currículo em PDF e peça uma revisão.',
        'Atualize o LinkedIn com título, sobre, destaques e projetos.',
        'Escreva a mensagem de apresentação modelo.',
        'Escreva as 5 histórias STAR.',
        'Monte a lista de 15 empresas e a planilha de acompanhamento.',
        'Escreva o plano de 12 meses.',
        'Marque pelo menos 1 mentoria (ADPList ou alguém da sua rede) para revisar o kit.',
      ],
      deliverable: 'Link de uma pasta ou documento com o currículo, o print do LinkedIn, a mensagem modelo, as histórias STAR, a lista de empresas e o plano de 12 meses.',
      rubric: [
        'O currículo tem 1 página, texto selecionável e link do portfólio',
        'O LinkedIn está atualizado com título e destaques',
        'Escrevi a mensagem de apresentação modelo',
        'Escrevi 5 histórias STAR',
        'Listei 15 empresas com o motivo',
        'Montei a planilha de acompanhamento',
        'Escrevi o plano de 12 meses com metas e prazos',
        'Marquei uma mentoria para revisar o kit',
      ],
    },
  ],
  checkpointExtra: [
    mc(
      'Qual é um uso responsável de IA na pesquisa?',
      'Resumir transcrições anonimizadas e conferir o resumo com as anotações originais',
      ['Substituir entrevistas por respostas geradas', 'Enviar gravações com nomes reais para qualquer ferramenta', 'Publicar insights da IA sem revisão'],
      'IA ajuda com volume, mas a responsabilidade e a verificação são suas.',
    ),
    tf(
      'Nos primeiros meses de um emprego, pedir feedback com frequência é um sinal de insegurança e deve ser evitado.',
      false,
      'Pedir feedback acelera o aprendizado e mostra maturidade.',
    ),
    scenario(
      'Uma designer júnior recebe a proposta de fazer "um app completo" como freela, pagando um valor fixo baixo, sem contrato.',
      'Qual é o principal risco?',
      'Escopo indefinido e sem contrato: o trabalho pode se estender sem fim e sem garantia de pagamento',
      ['Nenhum: é ótima experiência', 'O app ficar bonito demais', 'Aprender coisas novas'],
      'Escopo, prazos, pagamentos e contrato protegem as duas partes.',
    ),
  ],
}
