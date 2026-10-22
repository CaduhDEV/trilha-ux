import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u3: UnitDef = {
  title: 'Síntese: do caos ao insight',
  goal: 'Transformar anotações de pesquisa em padrões, insights, personas e um problema bem definido.',
  lessons: [
    {
      title: 'Organizando dados qualitativos',
      summary: 'Diagrama de afinidade, codificação e a diferença entre observação, padrão e insight.',
      minutes: 15,
      steps: [
        `## Pesquisa sem síntese é só conversa

Depois das entrevistas, você tem páginas de anotações, falas e gravações. **Síntese** é transformar esse material bruto em **entendimento** que o time pode usar para decidir.

O caminho:

1. **Observações** — fatos e falas soltas ("P2 anota tudo num caderno").
2. **Padrões** — coisas que se repetem entre participantes ("4 de 5 usam papel para organizar a agenda").
3. **Insights** — a interpretação que explica o porquê e abre oportunidades ("As profissionais confiam mais no papel porque ele nunca 'trava' no meio do atendimento").`,
        order(
          'Ordene o caminho da síntese:',
          ['Observações individuais', 'Padrões entre participantes', 'Insights que explicam o porquê'],
          'De fatos soltos para padrões, e de padrões para interpretações que geram oportunidades de design.',
        ),
        `## Diagrama de afinidade

A técnica mais usada para síntese qualitativa:

1. Escreva **uma observação por post-it** (físico ou no FigJam). Use falas e fatos, não conclusões.
2. Espalhe tudo e **agrupe** os post-its parecidos, sem categorias definidas antes — deixe os grupos **emergirem**.
3. Dê um **nome** a cada grupo que explique o tema (ex.: "Medo de parecer chata ao cobrar").
4. Agrupe os grupos em temas maiores, se fizer sentido.
5. Escreva os **insights** a partir dos grupos.

::affinity

Fazer em grupo é melhor: cada pessoa enxerga conexões diferentes.`,
        tf(
          'No diagrama de afinidade, o ideal é definir as categorias antes e depois encaixar os post-its nelas.',
          false,
          'O poder da técnica está em deixar os grupos surgirem dos dados. Categorias prontas fazem você enxergar só o que já esperava (viés de confirmação).',
        ),
        `## O que é um bom insight?

Um insight **não é** uma observação repetida. Ele revela **uma verdade sobre as pessoas** que você não sabia, e aponta uma **direção**.

- ❌ Observação: "As clientes usam WhatsApp para agendar."
- ❌ Padrão: "A maioria agenda por WhatsApp."
- ✅ Insight: "As clientes preferem agendar por WhatsApp porque sentem que estão falando **com a pessoa**, não com um sistema — a relação pessoal é parte do serviço."

Repare que o insight muda o design: talvez a solução **não deva substituir** a conversa, e sim facilitar dentro dela.`,
        scenario(
          'Depois de 6 entrevistas com tutores de pets, você escreveu três frases.',
          'Qual delas é um INSIGHT?',
          'Quem adota tem medo de ser julgado pela ONG, por isso esconde dúvidas no formulário e desiste depois',
          ['5 de 6 pessoas preencheram o formulário pelo celular', 'P3 disse que o formulário é longo', 'As pessoas usam Instagram'],
          'O insight explica um comportamento (esconder dúvidas e desistir) com uma motivação (medo de julgamento) e abre caminho para soluções.',
        ),
        `## Outras formas de síntese

- **Codificação (tagging)**: marcar trechos das transcrições com etiquetas ("preço", "confiança", "esquecimento") e contar a frequência.
- **Matriz de participantes**: uma tabela com participantes nas linhas e temas nas colunas — ótimo para ver padrões rapidamente.
- **Quotes wall**: um mural só com as falas mais fortes.

Ferramentas: FigJam, Miro, Dovetail, ou até uma planilha.`,
        match('Ligue a técnica à descrição', [
          ['Diagrama de afinidade', 'Agrupar post-its por semelhança até surgirem temas'],
          ['Codificação', 'Marcar trechos com etiquetas e contar frequência'],
          ['Matriz de participantes', 'Tabela com participantes × temas'],
        ]),
        multi(
          'O que deve ir nos post-its de um diagrama de afinidade?',
          ['Uma fala literal da participante', 'Um fato observado ("P4 anota tudo no caderno")'],
          ['Uma solução já pronta ("fazer um app")', 'Várias ideias diferentes no mesmo post-it'],
          'Um item por post-it, e com dados (falas e fatos), não com soluções.',
        ),
        fill(
          'Um insight explica o ___ por trás de um comportamento e aponta uma oportunidade.',
          'porquê',
          ['preço', 'layout', 'logotipo'],
          'Padrões dizem o quê; insights dizem por quê.',
        ),
      ],
      flashcards: [
        ['Síntese', 'Transformar dados brutos de pesquisa em padrões e insights acionáveis.'],
        ['Diagrama de afinidade', 'Técnica de agrupar observações (post-its) por semelhança até surgirem temas.'],
        ['Insight', 'Interpretação que revela o porquê de um comportamento e aponta uma oportunidade de design.'],
        ['Codificação (tagging)', 'Marcar trechos de dados com etiquetas temáticas para encontrar padrões.'],
      ],
      resources: [
        { title: 'Affinity Diagramming (NN/g)', url: 'https://www.nngroup.com/articles/affinity-diagram/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Personas e mapa de empatia',
      summary: 'Representar o público com base em dados — e não em estereótipos.',
      minutes: 15,
      steps: [
        `## O que é uma persona

**Persona** é um personagem **baseado em dados de pesquisa** que representa um grupo de pessoas usuárias com objetivos e comportamentos parecidos.

Ela serve para o time lembrar **para quem** está desenhando. Em vez de "o usuário", todo mundo pensa em "a Cláudia, manicure que atende em casa e não tem tempo de responder mensagens durante o atendimento".

Uma persona típica tem:

- Nome, foto/ilustração e uma frase que a resume
- Contexto (rotina, onde e como usa tecnologia)
- **Objetivos** (o que quer alcançar)
- **Frustrações / dores**
- **Comportamentos** relevantes para o produto`,
        mc(
          'Qual é a base de uma persona bem feita?',
          'Padrões encontrados em pesquisa com pessoas reais',
          ['A imaginação do time de marketing', 'Dados de idade e renda apenas', 'O perfil do CEO da empresa'],
          'Personas sem pesquisa viram estereótipos — e levam a decisões erradas com aparência de "centradas no usuário".',
        ),
        `## O que importa e o que é enfeite

O erro mais comum é encher a persona de dados **demográficos irrelevantes** ("gosta de gatos, signo de leão, cor favorita azul").

Pergunte para cada informação: **isso muda alguma decisão de design?**

- "Atende clientes com as mãos ocupadas" → **sim** (precisa responder rápido, com uma mão ou por voz).
- "Tem 2 filhos" → talvez (se afeta a rotina e o horário disponível).
- "Signo de leão" → não.

Comportamentos, objetivos e dores valem mais que idade e renda.`,
        scenario(
          'Uma persona do projeto "Agenda Bela" diz: "Cláudia, 38 anos, gosta de novela, torce para o Corinthians, mora em Guarulhos."',
          'O que está faltando para ela ser útil ao design?',
          'Objetivos, dores e comportamentos relacionados a agendamentos',
          ['Uma foto mais bonita', 'O signo e a cor favorita', 'O salário exato'],
          'Sem objetivos, dores e comportamentos ligados ao problema, a persona não ajuda a tomar nenhuma decisão.',
        ),
        `## Proto-persona

Quando não há tempo ou verba para pesquisa, alguns times criam uma **proto-persona**: uma persona feita a partir do **conhecimento atual** do time, assumindo que são **hipóteses**.

Ela é útil para alinhar o time e decidir o que pesquisar — **desde que fique claro** que ainda precisa ser validada. Nunca venda uma proto-persona como se fosse pesquisa.`,
        tf(
          'Uma proto-persona pode ser apresentada como resultado de pesquisa, já que se baseia no conhecimento do time.',
          false,
          'Proto-personas são hipóteses. Usá-las como verdade pode levar o time a decisões sem evidência.',
        ),
        `## Mapa de empatia

O **mapa de empatia** é uma ferramenta rápida para organizar o que você aprendeu sobre um perfil, em quatro quadrantes:

::empathy-map

- **Diz**: falas literais das entrevistas.
- **Pensa**: o que passa pela cabeça (pode não ser dito).
- **Faz**: ações e comportamentos observados.
- **Sente**: emoções — preocupações, alegrias, frustrações.

Ele ajuda a enxergar **contradições** (diz que é tranquilo, mas faz 3 ligações para confirmar) — e contradições são ótimas fontes de insight.`,
        match('Ligue o quadrante do mapa de empatia ao exemplo', [
          ['Diz', '"Eu dou conta de tudo sozinha."'],
          ['Pensa', '"Será que essa cliente vai aparecer?"'],
          ['Faz', 'Confirma o horário com cada cliente por áudio'],
          ['Sente', 'Ansiedade com horários vagos'],
        ]),
        multi(
          'Quais informações tornam uma persona mais útil para o design?',
          ['Objetivos ligados ao problema', 'Dores e frustrações', 'Comportamentos e contexto de uso'],
          ['Signo do zodíaco', 'Time de futebol'],
          'Mantenha só o que influencia decisões de design.',
        ),
        open(
          'Pense nas 3 entrevistas que você fez. Escreva uma frase que resuma a persona principal do seu projeto no formato: "[Nome], [contexto], que precisa [objetivo], mas [dor]."',
          'Exemplo: "Cláudia, manicure que atende em casa, que precisa manter a agenda cheia, mas não consegue responder mensagens durante os atendimentos." Essa frase vai guiar suas decisões até o fim do projeto.',
        ),
      ],
      flashcards: [
        ['Persona', 'Personagem baseado em pesquisa que representa um grupo de usuários com objetivos e comportamentos parecidos.'],
        ['Proto-persona', 'Persona feita com o conhecimento atual do time, sem pesquisa — deve ser tratada como hipótese.'],
        ['Mapa de empatia', 'Ferramenta com 4 quadrantes: o que a pessoa diz, pensa, faz e sente.'],
      ],
      resources: [
        { title: 'Personas Make Users Memorable (NN/g)', url: 'https://www.nngroup.com/articles/persona/', kind: 'artigo', lang: 'en' },
        { title: 'Empathy Mapping (NN/g)', url: 'https://www.nngroup.com/articles/empathy-mapping/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Jobs to be Done e a definição do problema',
      summary: 'O "trabalho" que a pessoa contrata o produto para fazer, problem statements e "Como poderíamos…?".',
      minutes: 15,
      steps: [
        `## Jobs to be Done (JTBD)

A ideia do **Jobs to be Done** (popularizada por Clayton Christensen): as pessoas não querem produtos; elas **"contratam"** produtos para fazer um **trabalho** na vida delas.

> Ninguém quer uma furadeira. As pessoas querem um furo na parede — na verdade, querem o quadro pendurado.

O formato de **job story**:

> **Quando** [situação], **quero** [motivação], **para** [resultado esperado].

Exemplo: "**Quando** estou atendendo uma cliente e chega uma mensagem pedindo horário, **quero** responder sem parar o trabalho, **para** não perder a cliente nem atrasar o atendimento."`,
        fill(
          'Uma job story segue o formato: Quando [situação], quero [motivação], para [___].',
          'resultado esperado',
          ['nome do produto', 'cor do botão', 'preço final'],
          'O foco é a situação e o resultado que a pessoa busca, não as características dela ou do produto.',
        ),
        mc(
          'Qual destas é uma job story bem escrita?',
          'Quando percebo que um horário ficou vago de última hora, quero avisar clientes interessadas rapidamente, para não perder dinheiro naquele dia',
          ['Como manicure, quero um app bonito', 'Quero um botão roxo na tela inicial', 'O app deve ter notificações'],
          'Ela descreve situação, motivação e resultado — sem prender o time a uma solução específica.',
        ),
        `## Problem statement (declaração do problema)

Depois da síntese, escreva o problema de forma clara. Um formato muito usado (o **ponto de vista**, ou POV):

> **[Pessoa]** precisa de **[necessidade]** porque **[insight]**.

Exemplo: "**Profissionais de beleza autônomas** precisam de **uma forma de gerenciar pedidos de horário sem interromper os atendimentos** porque **cada mensagem não respondida rápido vira uma cliente perdida para a concorrência**."

Um bom problema é:

- Centrado nas **pessoas**, não no negócio nem na tecnologia
- **Específico** o suficiente para guiar
- **Aberto** o suficiente para permitir várias soluções (não cita a solução!)`,
        scenario(
          'Um time escreveu o problema: "Precisamos criar um chatbot no WhatsApp para o salão."',
          'O que há de errado com essa definição?',
          'Ela já traz a solução, em vez de descrever a necessidade das pessoas',
          ['Ela não cita o nome do salão', 'É curta demais', 'Não há nada de errado'],
          'Problemas que já contêm a solução matam a exploração. O chatbot pode até ser a resposta, mas só depois de explorar alternativas.',
        ),
        `## "Como poderíamos…?" (How Might We)

Para transformar o problema em convite à criatividade, use perguntas **"Como poderíamos…?"** (em inglês, *How Might We* ou **HMW**):

- "**Como poderíamos** ajudar profissionais a responder pedidos de horário sem parar o atendimento?"
- "**Como poderíamos** fazer horários vagos de última hora virarem oportunidade?"
- "**Como poderíamos** fazer clientes lembrarem dos horários sem parecer cobrança?"

O tamanho certo:

- **Amplo demais**: "Como poderíamos melhorar a beleza no Brasil?"
- **Estreito demais**: "Como poderíamos colocar um botão de lembrete na tela 3?"
- **Na medida**: abre várias ideias, mas tem foco.`,
        match('Classifique cada pergunta "Como poderíamos…?"', [
          ['…revolucionar o mercado de serviços?', 'Ampla demais'],
          ['…colocar um ícone de sino no canto superior direito?', 'Estreita demais'],
          ['…ajudar clientes a lembrar do horário sem se sentirem cobradas?', 'Na medida'],
        ]),
        tf(
          'Um bom problem statement deve descrever a solução que será construída.',
          false,
          'O problema descreve a necessidade e o porquê. A solução vem depois, na ideação.',
        ),
        multi(
          'Quais características tem um bom "Como poderíamos…?"',
          ['Partir de um insight da pesquisa', 'Permitir várias soluções diferentes', 'Ter um foco claro'],
          ['Já indicar exatamente qual tela mudar', 'Ser tão amplo que vale para qualquer empresa'],
          'Um bom HMW é um trampolim para a ideação: focado e aberto ao mesmo tempo.',
        ),
        order(
          'Ordene o caminho da pesquisa até a ideação:',
          ['Entrevistas', 'Diagrama de afinidade', 'Insights', 'Problem statement', 'Perguntas "Como poderíamos…?"'],
          'Dos dados brutos aos padrões, aos insights, ao problema definido e, então, às perguntas que abrem a ideação (mês 3).',
        ),
      ],
      flashcards: [
        ['Jobs to be Done (JTBD)', 'Teoria de que as pessoas "contratam" produtos para realizar um trabalho (um progresso) na vida delas.'],
        ['Job story', '"Quando [situação], quero [motivação], para [resultado esperado]."'],
        ['Problem statement (POV)', '"[Pessoa] precisa de [necessidade] porque [insight]." Descreve o problema sem citar a solução.'],
        ['Como poderíamos…? (HMW)', 'Pergunta que transforma um problema em convite à ideação, com foco mas aberta a várias soluções.'],
      ],
      resources: [
        { title: 'Using "How Might We" Questions to Ideate on the Right Problems (NN/g)', url: 'https://www.nngroup.com/articles/how-might-we-questions/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Síntese no FigJam: afinidade, persona e "Como poderíamos"',
      summary: 'Transforme suas entrevistas em insights, uma persona e perguntas de oportunidade.',
      minutes: 240,
      tool: 'figjam',
      brief: `## Da conversa ao insight

Nesta prática você vai sintetizar as entrevistas do seu projeto. Se puder, faça **mais 2 entrevistas** antes (totalizando 5) — o projeto do mês pede 5.

### Estrutura do quadro no FigJam

Crie **4 seções** (Shift+S) no mesmo arquivo:

1. **Post-its** — todas as observações, uma por post-it, com a cor por participante (P1 amarelo, P2 rosa…).
2. **Afinidade** — os grupos formados, cada um com um título.
3. **Persona + mapa de empatia** — a persona principal do projeto.
4. **Problema** — 3 insights, 1 problem statement e 3 a 5 perguntas "Como poderíamos…?".

> 💡 Usar uma cor de post-it por participante ajuda a ver se um grupo representa várias pessoas ou só uma muito falante.`,
      steps: [
        'Releia as notas de todas as entrevistas e escreva **pelo menos 40 post-its** (um fato ou fala por post-it).',
        'Agrupe os post-its por afinidade, sem categorias prontas. Nomeie cada grupo com uma frase.',
        'Escreva **3 insights** a partir dos grupos mais fortes (com evidências: quantos participantes?).',
        'Monte a **persona** (objetivos, dores, comportamentos, frase) e o **mapa de empatia**.',
        'Escreva **1 job story** e **1 problem statement** no formato POV.',
        'Escreva de 3 a 5 perguntas **"Como poderíamos…?"** e marque a que você considera mais promissora.',
      ],
      deliverable: 'Link do FigJam com as 4 seções: post-its, afinidade, persona/mapa de empatia e problema (insights, POV, HMWs).',
      rubric: [
        'Criei pelo menos 40 post-its com fatos e falas (sem soluções)',
        'Os grupos emergiram dos dados e têm títulos descritivos',
        'Escrevi 3 insights com evidências',
        'A persona tem objetivos, dores e comportamentos ligados ao problema',
        'O mapa de empatia está preenchido nos 4 quadrantes',
        'Escrevi uma job story e um problem statement sem citar solução',
        'Escrevi de 3 a 5 perguntas "Como poderíamos…?" no tamanho certo',
      ],
      tips: [
        'No FigJam, selecione vários post-its e use "Organizar" para alinhá-los rapidamente.',
        'Existem templates prontos de persona e mapa de empatia na Comunidade do Figma (busque "empathy map").',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Na síntese, uma designer agrupou post-its e todos os de um grupo vieram da mesma participante, que falou muito.',
      'Qual cuidado ela deve ter?',
      'Não tratar esse grupo como padrão geral, porque representa uma única pessoa',
      ['Apagar o grupo imediatamente', 'Transformar em persona principal', 'Ignorar todas as falas dessa participante'],
      'Um padrão precisa aparecer em várias pessoas. A cor do post-it por participante ajuda a perceber isso.',
    ),
    mc(
      'Qual frase é uma pergunta "Como poderíamos…?" na medida certa?',
      'Como poderíamos ajudar tutores a tirar dúvidas sobre adoção sem medo de serem julgados?',
      ['Como poderíamos acabar com o abandono de animais no mundo?', 'Como poderíamos mudar a cor do formulário?', 'Como poderíamos fazer um app?'],
      'Ela parte de um insight, tem foco e permite muitas soluções diferentes.',
    ),
    tf(
      'Personas devem priorizar comportamentos, objetivos e dores em vez de dados demográficos irrelevantes.',
      true,
      'Informações que não mudam decisões de design só ocupam espaço.',
    ),
  ],
}
