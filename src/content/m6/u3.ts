import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u3: UnitDef = {
  title: 'O processo seletivo',
  goal: 'Saber como funcionam as seleções em UX e se preparar para desafios de design, entrevistas e negociação.',
  lessons: [
    {
      title: 'Como funcionam as seleções em UX',
      summary: 'As etapas mais comuns, onde encontrar vagas e como se candidatar bem.',
      minutes: 15,
      steps: [
        `## As etapas mais comuns

Cada empresa tem seu processo, mas o caminho costuma ser parecido:

1. **Triagem**: currículo e portfólio (às vezes, um formulário com perguntas).
2. **Conversa com RH** (*recruiter screen*): trajetória, motivação, expectativas, disponibilidade, faixa salarial.
3. **Entrevista com a gestora de design**: experiência, como você pensa, perguntas sobre projetos.
4. **Apresentação de portfólio**: você apresenta 1 ou 2 cases (20–40 minutos) e responde perguntas.
5. **Desafio de design**: um exercício **ao vivo** (whiteboard) ou **para fazer em casa** (*take-home*).
6. **Entrevista com o time / cultural**: com PMs, devs e outras designers.
7. **Proposta**.

O processo inteiro pode levar de **2 semanas a 2 meses**. Paciência e organização ajudam muito.`,
        order(
          'Ordene as etapas mais comuns de um processo seletivo de UX:',
          ['Triagem de currículo e portfólio', 'Conversa com RH', 'Entrevista com a gestora', 'Apresentação de portfólio e desafio', 'Proposta'],
          'A ordem varia, mas o portfólio aparece em várias etapas — ele é sua principal ferramenta.',
        ),
        `## Onde encontrar vagas

- **LinkedIn Vagas** (com alertas de busca: "UX designer júnior", "product designer júnior", "UX/UI").
- Plataformas de vagas usadas por empresas brasileiras (como a Gupy) e os sites de carreira das empresas.
- Comunidades e grupos de vagas de design.
- **Indicações** — a forma mais efetiva. Conte para sua rede que está buscando.

## Candidatando-se bem

- Leia a vaga com atenção e **adapte** o currículo (palavras-chave) e a mensagem.
- Não espere cumprir 100% dos requisitos: se cumpre a maior parte, **candidate-se**.
- Organize uma **planilha**: empresa, vaga, data, etapa, contato, próximos passos.
- Acompanhe com educação depois de 1 a 2 semanas sem resposta.`,
        tf(
          'Só vale se candidatar a uma vaga se você cumprir 100% dos requisitos listados.',
          false,
          'Listas de requisitos costumam ser "desejos". Se você cumpre boa parte e tem um bom portfólio, candidate-se.',
        ),
        multi(
          'Quais práticas aumentam suas chances numa candidatura?',
          ['Adaptar o currículo às palavras-chave da vaga', 'Pedir indicação na sua rede', 'Organizar as candidaturas numa planilha'],
          ['Enviar o mesmo currículo genérico para 200 vagas em um dia', 'Ignorar a descrição da vaga'],
          'Candidaturas cuidadosas e indicações rendem mais que volume sem foco.',
        ),
        scenario(
          'Depois de 30 candidaturas sem resposta, uma iniciante pensa em desistir de UX.',
          'O que faz mais sentido revisar primeiro?',
          'Portfólio e currículo com mentoras, a adaptação às vagas e a estratégia de indicações',
          ['Desistir imediatamente', 'Mandar 300 candidaturas iguais', 'Mudar o portfólio para só telas bonitas'],
          'Silêncio geralmente indica que algo na triagem pode melhorar. Feedback externo ajuda a enxergar.',
        ),
        `## Uma rotina de busca sustentável

A busca pelo primeiro emprego pode levar **alguns meses**. Uma rotina ajuda a não desanimar:

- **Meta semanal realista**: por exemplo, 5 candidaturas bem feitas (adaptadas) por semana, em vez de 50 genéricas.
- **1 conversa por semana** com alguém da área (mentoria, café virtual, evento).
- **Continue praticando**: um desafio ou melhoria no portfólio por semana — você chega mais afiada às entrevistas.
- **Registre o que aprende** em cada processo (perguntas que fizeram, o que travou).
- **Cuide do ânimo**: "não" faz parte do caminho de todo mundo. Celebre as etapas (uma entrevista já é uma conquista!).`,
        mc(
          'Qual estratégia de candidatura tende a dar mais resultado?',
          'Poucas candidaturas por semana, bem adaptadas, somadas a conversas com a rede',
          ['Enviar o mesmo currículo para o maior número de vagas possível', 'Esperar a vaga perfeita aparecer', 'Candidatar-se só quando dominar todas as ferramentas'],
          'Qualidade, adaptação e relacionamento vencem volume genérico.',
        ),
        fill(
          'O exercício de design feito em casa, com prazo, durante um processo seletivo é chamado de ___.',
          'take-home',
          ['whiteboard', 'daily', 'onboarding'],
          'Take-home é feito em casa; whiteboard é ao vivo, na frente das entrevistadoras.',
        ),
      ],
      flashcards: [
        ['Recruiter screen', 'Primeira conversa com o RH: trajetória, motivação, expectativas e faixa salarial.'],
        ['Apresentação de portfólio', 'Etapa em que você apresenta 1–2 cases e responde perguntas (20–40 min).'],
        ['Take-home vs. whiteboard', 'Take-home: desafio feito em casa. Whiteboard: desafio ao vivo.'],
      ],
    },
    {
      title: 'O desafio de design',
      summary: 'Um roteiro para resolver desafios ao vivo e em casa mostrando seu raciocínio.',
      minutes: 20,
      steps: [
        `## O que estão avaliando

No desafio de design, ninguém espera a solução perfeita em 1 hora. Estão avaliando **como você pensa**:

- Você faz **perguntas** antes de sair desenhando?
- Você pensa nas **pessoas** e no **objetivo**?
- Você explora **alternativas** e explica **trade-offs**?
- Você **comunica** bem o raciocínio?
- Você reage bem a **feedback** durante o exercício?

Exemplo de enunciado: *"Desenhe uma forma de pessoas idosas marcarem consultas no posto de saúde."*`,
        mc(
          'O que mais importa num desafio de design ao vivo?',
          'Mostrar o raciocínio: perguntas, foco nas pessoas, alternativas e trade-offs',
          ['Entregar telas perfeitas em alta fidelidade', 'Terminar o mais rápido possível', 'Não fazer nenhuma pergunta para parecer segura'],
          'O processo de pensamento é o que está sendo avaliado.',
        ),
        `## Um roteiro em 7 passos

1. **Entender e perguntar** (5–10 min): Quem são as pessoas? Qual o objetivo do negócio? Qual o contexto (celular? totem? ligação?)? Há restrições? Como saberemos que deu certo?
2. **Definir o foco**: escolha **um** público e **um** problema principal ("vou focar em idosos que agendam pelo celular com ajuda limitada").
3. **Mapear a jornada ou o fluxo** de forma simples.
4. **Explorar alternativas**: 2 ou 3 caminhos diferentes, rapidamente.
5. **Escolher e detalhar**: rabisque as telas-chave da melhor alternativa.
6. **Validar e medir**: como testaria? Que métricas acompanharia?
7. **Próximos passos**: o que faria com mais tempo, riscos e trade-offs.

**Pense em voz alta** o tempo todo e **administre o tempo** (combine as pausas no começo).`,
        order(
          'Ordene o roteiro para um desafio de design:',
          ['Fazer perguntas e entender o contexto', 'Definir público e problema em foco', 'Mapear o fluxo', 'Explorar alternativas', 'Detalhar a solução escolhida', 'Explicar como validaria e mediria'],
          'Entender → focar → mapear → divergir → convergir → validar.',
        ),
        scenario(
          'No começo do desafio "app de doação de sangue", a candidata imediatamente começa a desenhar a tela de cadastro.',
          'O que ela deveria ter feito antes?',
          'Fazer perguntas sobre público, objetivo, contexto e restrições, e definir um foco',
          ['Escolher a paleta de cores', 'Desenhar o logotipo', 'Perguntar quanto vai ganhar'],
          'Pular para telas é a "solucionite" do mês 1. Entrevistadoras querem ver você investigar primeiro.',
        ),
        `## Take-home: cuidados

- Respeite o **tempo sugerido** e diga quanto tempo você investiu.
- Foque no **raciocínio** e em 2–3 telas-chave bem explicadas, não em 20 telas.
- Documente **premissas** ("assumi que as pessoas já têm cadastro no SUS").
- Desafios que pedem **dias de trabalho** ou parecem um projeto real da empresa sem pagamento são um **sinal de alerta**. Você pode perguntar o escopo e o uso do material.

## Apresentando a solução

Estrutura de 10–15 minutos: problema e foco → premissas → fluxo → alternativas e escolha → telas → validação e métricas → próximos passos.`,
        tf(
          'Num take-home, documentar as premissas que você assumiu ajuda a mostrar seu raciocínio.',
          true,
          'Premissas explícitas mostram que você reconhece o que não sabe — maturidade que gestoras valorizam.',
        ),
        multi(
          'Quais são boas perguntas para fazer no início de um desafio?',
          ['Quem é o público principal?', 'Qual é o objetivo de negócio?', 'Como saberemos se a solução deu certo?'],
          ['Que cor vocês preferem?', 'Posso usar Comic Sans?'],
          'Perguntas sobre pessoas, objetivos e sucesso orientam todo o resto.',
        ),
        fill(
          'Durante o desafio ao vivo, é importante pensar em ___ alta para que as entrevistadoras acompanhem seu raciocínio.',
          'voz',
          ['letra', 'cor', 'nota'],
          'Seu raciocínio só conta se for compartilhado.',
        ),
      ],
      flashcards: [
        ['Desafio de design', 'Exercício (ao vivo ou em casa) que avalia raciocínio: perguntas, foco, alternativas, trade-offs e comunicação.'],
        ['Premissas', 'Suposições assumidas explicitamente quando faltam informações.'],
        ['Roteiro do desafio', 'Perguntar → focar → mapear → explorar → detalhar → validar → próximos passos.'],
      ],
      resources: [
        { title: 'How to Answer UX Job Interview Questions (NN/g)', url: 'https://www.nngroup.com/articles/answer-ux-job-interview-questions/', kind: 'artigo', lang: 'en', note: 'Inclui o método METEOR para perguntas situacionais e desafios.' },
      ],
    },
    {
      title: 'Entrevista, apresentação e negociação',
      summary: 'Perguntas comportamentais com STAR, apresentar o portfólio, perguntas para a empresa e salário.',
      minutes: 20,
      steps: [
        `## "Fale sobre você"

Prepare um **pitch** de 1 a 2 minutos:

1. **Quem você é** e de onde vem (a transição de carreira é um trunfo).
2. **O que te trouxe ao UX** (seu porquê).
3. **O que você já fez** (projetos, resultados).
4. **O que busca** agora.

> "Trabalhei 8 anos com atendimento numa clínica, onde via todo dia pessoas se perdendo em sistemas confusos. Isso me levou ao UX. Nos últimos 6 meses, fiz uma formação intensiva e conduzi um projeto completo — pesquisa com 5 profissionais, protótipo testado em duas rodadas. Busco minha primeira oportunidade como designer júnior num time onde eu possa aprender e contribuir com pesquisa."`,
        mc(
          'O que um bom pitch de "fale sobre você" deve conter?',
          'Trajetória, motivação, o que já fez em UX e o que busca agora',
          ['A biografia completa desde a infância', 'Apenas o nome e a idade', 'Uma lista de ferramentas que você conhece'],
          'Curto, focado e com uma história que conecta passado, presente e futuro.',
        ),
        `## Perguntas comportamentais (use STAR)

Perguntas como "Conte uma vez em que…" pedem **histórias reais**. Responda com **STAR** (Situação, Tarefa, Ação, Resultado):

- "Conte uma vez em que você recebeu uma crítica difícil."
- "Conte de um conflito com alguém do time e como resolveu."
- "Conte de uma decisão de design que você defendeu com dados."
- "Conte de um erro que você cometeu e o que aprendeu."

Prepare **5 histórias** (do curso, do trabalho anterior, da vida) que você possa adaptar a várias perguntas.`,
        match('Ligue a letra do STAR à parte da resposta', [
          ['Situação', 'O contexto em que aconteceu'],
          ['Tarefa', 'O desafio ou responsabilidade'],
          ['Ação', 'O que você fez, especificamente'],
          ['Resultado', 'O que aconteceu e o que aprendeu'],
        ]),
        `## Apresentando o portfólio ao vivo

- **1 ou 2 cases**, não todos.
- Comece pelo **problema e o resultado**; depois o processo.
- Mostre as **decisões** e **o que você faria diferente**.
- Deixe **tempo para perguntas** (são parte da avaliação).
- **Ensaie** com cronômetro e grave-se.

## Perguntas para fazer à empresa

Entrevista é mão dupla. Boas perguntas:

- "Como é a rotina de pesquisa com usuários aqui?"
- "Como designers e PMs trabalham juntos?"
- "Como é o apoio para quem está começando (mentoria, onboarding)?"
- "Como vocês medem o sucesso do design?"
- "Quais são os maiores desafios do time hoje?"`,
        tf(
          'Ao final da entrevista, é melhor não fazer perguntas para não parecer insegura.',
          false,
          'Boas perguntas mostram interesse e maturidade — e ajudam você a avaliar se a empresa é um bom lugar.',
        ),
        `## Salário e negociação

- **Pesquise faixas** antes: sites de carreira em 2026 citam, para **júnior CLT**, algo em torno de **R$ 3.500 a R$ 6.000** — variando muito por cidade, porte da empresa e modelo de trabalho. Converse com pessoas da área e use essas faixas só como referência.
- **CLT × PJ**: no PJ o valor bruto parece maior, mas você paga impostos e não tem férias, 13º, FGTS nem benefícios. Compare o **total**.
- Considere **benefícios**: plano de saúde, vale-alimentação, auxílio home office, cursos.
- Quando perguntarem sua pretensão, você pode dar uma **faixa** baseada na pesquisa.
- **Negociar é normal** e esperado — com educação e argumentos.

## Lidando com o "não"

Rejeições fazem parte (para todo mundo). Peça **feedback** educadamente, ajuste e siga. Cada processo é treino para o próximo.`,
        scenario(
          'Uma empresa oferece R$ 6.000 como PJ e outra R$ 4.500 como CLT com plano de saúde e vale-alimentação.',
          'Como comparar as propostas?',
          'Calcular o valor total, considerando impostos do PJ e benefícios, férias, 13º e FGTS da CLT',
          ['Escolher a maior, sem calcular', 'Escolher sempre CLT', 'Escolher sempre PJ'],
          'O valor bruto engana. Compare o total anual líquido e os benefícios — e considere o aprendizado e o time.',
        ),
        fill(
          'Para responder perguntas comportamentais, use o método ___ (Situação, Tarefa, Ação, Resultado).',
          'STAR',
          ['SCAMPER', 'POUR', 'HEART'],
          'STAR organiza histórias reais de forma clara e convincente.',
        ),
        open(
          'Escreva o seu pitch de "fale sobre você" em até 6 linhas.',
          'Leia em voz alta e cronometre: deve caber em 1 a 2 minutos. Ensaie até soar natural — não decorado.',
        ),
      ],
      flashcards: [
        ['Pitch pessoal', 'Apresentação de 1–2 minutos: trajetória, motivação, o que já fez e o que busca.'],
        ['Pergunta comportamental', '"Conte uma vez em que…" — responda com uma história real usando STAR.'],
        ['CLT vs. PJ', 'Compare o total: impostos do PJ versus férias, 13º, FGTS e benefícios da CLT.'],
      ],
      resources: [
        { title: 'Faixas salariais de UX no Brasil 2026 (JobRise)', url: 'https://jobrise.io/pt/blog/salario-ux-ui-designer-brasil-2026/', kind: 'artigo', lang: 'pt', note: 'Use como referência e confirme com vagas reais e com pessoas da área.' },
      ],
    },
  ],
  practices: [
    {
      title: 'Simulação: desafio de design + apresentação gravada',
      summary: 'Faça um desafio de 2 horas como se fosse um processo seletivo e grave a apresentação.',
      minutes: 240,
      tool: 'figma',
      brief: `## Treino de entrevista de verdade

### Escolha um enunciado (sem olhar soluções prontas!)

1. "Desenhe uma forma de pessoas idosas marcarem consultas no posto de saúde do bairro."
2. "Crie uma experiência para vizinhos de um condomínio emprestarem ferramentas uns aos outros."
3. "Ajude pais e mães a acompanharem a vacinação dos filhos."

### Regras

- **2 horas** de cronômetro, no máximo.
- Siga o roteiro: perguntas e premissas → foco → fluxo → alternativas → telas-chave (baixa ou média fidelidade) → validação e métricas → próximos passos.
- Monte uma apresentação de **10 a 15 minutos**.
- **Grave-se** apresentando (vídeo ou só áudio com a tela).
- Assista e anote 3 coisas para melhorar.

Se tiver alguém por perto (uma mentora, alguém da família, uma amizade), peça para fazer o papel de entrevistadora e te interromper com perguntas.`,
      steps: [
        'Escolha um enunciado e inicie o cronômetro de 2 horas.',
        'Escreva as perguntas que faria e as premissas que vai assumir.',
        'Defina o público e o problema em foco.',
        'Desenhe o fluxo principal e explore 2 ou 3 alternativas.',
        'Detalhe as telas-chave da alternativa escolhida.',
        'Escreva como validaria (teste) e quais métricas acompanharia.',
        'Monte a apresentação e grave-se apresentando em até 15 minutos.',
        'Assista à gravação e anote 3 pontos de melhoria.',
      ],
      deliverable: 'Link do Figma com o desafio e link da gravação (ou um resumo escrito das 3 melhorias).',
      rubric: [
        'Respeitei o limite de 2 horas',
        'Listei perguntas e premissas antes de desenhar',
        'Defini um foco claro',
        'Explorei pelo menos 2 alternativas e expliquei a escolha',
        'Detalhei as telas-chave',
        'Expliquei como validaria e mediria',
        'Gravei a apresentação em até 15 minutos',
        'Anotei 3 melhorias depois de assistir',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Na entrevista, perguntam: "Conte uma vez em que você discordou de alguém do time." A candidata responde: "Eu nunca discordo de ninguém."',
      'Qual é o problema dessa resposta?',
      'Não traz uma história real e evita a pergunta, que avalia como você lida com conflitos',
      ['Nenhum: mostra que ela é fácil de lidar', 'Ela deveria ter falado mal do colega', 'Deveria ter respondido com uma pergunta'],
      'Prepare histórias reais com STAR — inclusive sobre conflitos resolvidos com respeito.',
    ),
    mc(
      'Qual é uma boa pergunta para fazer à empresa no final da entrevista?',
      '"Como é a rotina de pesquisa com usuários no time?"',
      ['"Quantos dias de folga eu tenho no primeiro mês?"', '"Vocês fazem alguma coisa interessante?"', 'Não fazer nenhuma pergunta'],
      'Perguntas sobre o trabalho mostram interesse genuíno e ajudam você a avaliar a vaga.',
    ),
    tf(
      'Num desafio de design, é recomendado explicitar as premissas quando faltam informações.',
      true,
      'Premissas claras mostram raciocínio estruturado.',
    ),
  ],
}
