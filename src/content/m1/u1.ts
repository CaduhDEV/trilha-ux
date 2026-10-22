import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u1: UnitDef = {
  title: 'Bem-vinda(o) ao mundo do UX',
  goal: 'Entender o que é UX, o que faz uma pessoa designer de UX e como esta trilha funciona.',
  lessons: [
    {
      title: 'O que é UX (e por que você já entende disso)',
      summary: 'A diferença entre experiência e interface, com exemplos do dia a dia.',
      minutes: 15,
      steps: [
        `## Você já é especialista em uma coisa: ser usuária(o)

**UX** vem do inglês *User Experience*: **experiência do usuário**. É tudo o que uma pessoa vive, sente e percebe quando usa um produto ou serviço.

Pense na última vez que você:

- pediu comida por aplicativo,
- tentou marcar uma consulta pelo site do plano de saúde,
- usou o caixa eletrônico do banco.

Em algum desses momentos você pensou *"que fácil!"* ou *"que raiva, onde fica isso?"*. Esse sentimento **é** a experiência do usuário. E quem trabalha para que ele seja bom é a pessoa **designer de UX**.`,
        mc(
          'O que significa a sigla UX?',
          'User Experience — experiência do usuário',
          ['User Extra — usuário avançado', 'Universal Exchange — troca universal', 'User X-ray — raio-x do usuário'],
          'UX = User Experience. É a experiência completa que a pessoa tem ao usar um produto ou serviço.',
        ),
        `## A porta que você empurra quando deveria puxar

O psicólogo e engenheiro **Don Norman** ficou famoso por falar de portas. Sabe aquela porta com puxador que, na verdade, é de empurrar? Todo mundo erra — e a pessoa se sente boba.

Norman inverteu a lógica: **se muita gente erra, a culpa é do design, não da pessoa.** Uma porta bem desenhada "diz" como deve ser usada: uma placa lisa pede *empurre*; uma alça pede *puxe*.

Foi Norman quem popularizou o termo "User Experience", nos anos 1990, quando trabalhava na Apple. A ideia dele: a experiência vai muito além da tela — inclui tudo, do primeiro contato ao suporte.

> 💡 Essas portas confusas ganharam até um apelido: **portas de Norman**.`,
        scenario(
          'Num restaurante, quase todo cliente tenta puxar a porta do banheiro, que na verdade abre empurrando. Ela tem uma alça grande do lado de fora.',
          'Segundo a visão de Don Norman, qual é o problema?',
          'O design da porta: a alça comunica "puxe" quando deveria comunicar "empurre"',
          ['Os clientes não prestam atenção', 'Falta uma placa escrita "EMPURRE" bem grande', 'Nenhum: portas são assim mesmo'],
          'Quando muita gente erra do mesmo jeito, o problema é do design. Uma placa ajuda, mas é um remendo: o ideal é o objeto comunicar sozinho como deve ser usado.',
        ),
        tf(
          'Se uma pessoa erra ao usar um aplicativo, a culpa é sempre dela por não ter prestado atenção.',
          false,
          'Em UX partimos do contrário: erros frequentes são sinal de problema no design. Nosso trabalho é tornar o caminho certo óbvio.',
        ),
        `## UX não é só tela bonita

Um erro comum de quem está começando é achar que UX é "deixar bonito". Beleza importa, mas é só uma parte. A experiência inclui:

- **Encontrar** o produto (anúncio, busca, indicação)
- **Entender** o que ele faz e quanto custa
- **Usar**: cadastro, navegação, pagamento
- **Receber**: e-mail de confirmação, entrega, notificações
- **Pedir ajuda**: atendimento, chat, devolução
- **Voltar** (ou nunca mais voltar 😅)

Um app lindo que cobra duas vezes no cartão oferece uma **péssima** experiência.`,
        multi(
          'Quais destes itens fazem parte da experiência do usuário de um app de delivery?',
          ['O tempo até a comida chegar', 'O atendimento no chat quando o pedido atrasa', 'A cor e o texto do botão "Fazer pedido"', 'O e-mail com o recibo'],
          ['A marca do servidor onde o app está hospedado'],
          'UX é a experiência inteira: entrega, atendimento, recibo e interface. Já a marca do servidor é uma decisão técnica que a pessoa nem percebe — a menos que o app fique fora do ar!',
        ),
        `## UX e UI: primos, não gêmeos

- **UI** (*User Interface*, interface do usuário) é a parte que você **vê e toca**: botões, cores, ícones, textos, telas.
- **UX** é a **experiência completa**, que inclui a interface, mas também o fluxo, o conteúdo, o tempo de resposta, o suporte…

Uma analogia: num restaurante, a **UI** é o cardápio, a decoração e os talheres. A **UX** é a ida inteira: achar o lugar, reservar, ser bem atendida(o), comer, pagar e sair com vontade de voltar.

::ux-umbrella

No mercado você vai ver muitas vagas de **"UX/UI designer"** — pessoas que cuidam das duas coisas. É exatamente isso que você vai aprender aqui.`,
        match('Ligue cada termo ao seu significado', [
          ['UX', 'A experiência completa da pessoa'],
          ['UI', 'A interface: telas, botões, cores'],
          ['Usuário', 'Quem usa o produto ou serviço'],
          ['Design', 'O ato de planejar uma solução com intenção'],
        ]),
        fill(
          'A analogia do restaurante: o cardápio e a decoração são a ___, a ida inteira ao restaurante é a UX.',
          'UI',
          ['UX', 'API', 'PDF'],
          'A interface (UI) é o que se vê e toca. A experiência (UX) é tudo o que a pessoa vive do começo ao fim.',
        ),
        `## Por que empresas pagam por UX?

Porque uma boa experiência dá resultado concreto:

- **Mais vendas**: menos gente desiste no meio da compra.
- **Menos custo**: se o app é claro, menos gente liga para o suporte.
- **Menos erros**: num app de banco, um erro pode custar caro (para a pessoa e para o banco).
- **Fidelidade**: gente que tem uma boa experiência volta e indica.

Por isso o trabalho de UX sempre equilibra duas coisas: **as necessidades das pessoas** e **os objetivos do negócio**. Um bom design atende os dois.`,
        scenario(
          'Uma loja online percebeu que 70% das pessoas colocam produtos no carrinho, mas desistem na tela de pagamento.',
          'Por que isso é um problema de UX (e não só de vendas)?',
          'Algo na experiência de pagamento está confuso, cansativo ou gerando desconfiança',
          ['Porque o site precisa de cores mais bonitas', 'Não é problema de UX: as pessoas só estavam olhando', 'Porque falta um robô de atendimento'],
          'Quando muita gente desiste no mesmo ponto, há um obstáculo na experiência: formulário longo, frete surpresa, falta de confiança… Descobrir o "porquê" é trabalho de UX.',
        ),
        open(
          'Pense num aplicativo ou site que você usa com frequência. O que mais te irrita nele? E o que você mais gosta?',
          'Ótimo! Repare que você descreveu sentimentos (irritação, alívio) e situações concretas. É exatamente assim que designers começam: observando a experiência real. Guarde essa resposta — ela pode virar ideia de projeto.',
        ),
      ],
      flashcards: [
        ['UX (User Experience)', 'Experiência do usuário: tudo o que a pessoa vive, sente e percebe ao usar um produto ou serviço, do primeiro contato ao suporte.'],
        ['UI (User Interface)', 'Interface do usuário: a parte visível e tocável — telas, botões, cores, ícones e textos.'],
        ['Porta de Norman', 'Objeto cujo design comunica o uso errado (ex.: porta de empurrar com alça de puxar). Mostra que erros frequentes são culpa do design.'],
        ['Don Norman', 'Pesquisador que popularizou o termo "User Experience" e escreveu "O Design do Dia a Dia".'],
      ],
      resources: [
        { title: 'The Definition of User Experience (NN/g)', url: 'https://www.nngroup.com/articles/definition-user-experience/', kind: 'artigo', lang: 'en', note: 'A definição clássica de UX, em poucos parágrafos.' },
        { title: 'O Design do Dia a Dia — Don Norman', kind: 'livro', lang: 'pt', note: 'O livro que deu origem à ideia das "portas de Norman". Leitura recomendada para o mês 1.' },
      ],
    },
    {
      title: 'O que faz uma pessoa UX designer',
      summary: 'Rotina, especialidades, com quem se trabalha e o que se entrega.',
      minutes: 15,
      steps: [
        `## Um dia na vida de uma UX designer

Não existe um dia igual ao outro, mas o trabalho gira em torno de um ciclo:

1. **Entender** — conversar com pessoas usuárias, ler dados, entender o negócio.
2. **Definir** — transformar o que aprendeu em um problema claro.
3. **Criar** — desenhar fluxos, rascunhos, telas e protótipos.
4. **Testar** — colocar a ideia na frente de pessoas reais e observar.
5. **Entregar e acompanhar** — passar para o time de desenvolvimento e medir o resultado.

Boa parte do dia é **conversa**: reuniões com o time, entrevistas, apresentações. A outra parte é **mão na massa** no Figma.`,
        order(
          'Coloque o ciclo de trabalho de UX na ordem mais comum:',
          ['Entender as pessoas e o negócio', 'Definir o problema', 'Criar soluções', 'Testar com pessoas reais', 'Entregar e acompanhar resultados'],
          'Primeiro entendemos, depois definimos o problema, criamos, testamos e entregamos. Na prática, voltamos etapas sempre que aprendemos algo novo.',
        ),
        `## As especialidades dentro de UX

UX é um campo grande. Em empresas menores, uma pessoa faz quase tudo; nas maiores, há especialistas:

| Função | Foco principal |
|---|---|
| **UX designer** | Fluxos, estrutura e experiência como um todo |
| **UI designer** | Visual: cores, tipografia, componentes |
| **Product designer** | UX + UI + visão de produto e negócio (muito comum hoje) |
| **UX researcher** | Pesquisa com pessoas: entrevistas, testes, dados |
| **UX writer / content designer** | Os textos da interface |
| **Service designer** | A experiência do serviço inteiro, inclusive fora da tela |
| **DesignOps** | Processos, ferramentas e organização do time de design |

Nesta trilha você vai ter base em todas — e sair pronta(o) para vagas de **UX/UI designer** ou **product designer júnior**.`,
        match('Ligue cada função ao seu foco', [
          ['UX researcher', 'Pesquisar e entender as pessoas'],
          ['UI designer', 'Cores, tipografia e componentes'],
          ['UX writer', 'Os textos da interface'],
          ['Product designer', 'UX + UI + visão de negócio'],
        ]),
        `## Design é esporte coletivo

Você quase nunca trabalha sozinha(o). As pessoas mais próximas:

- **PM (Product Manager / gerente de produto)**: decide *o que* construir e *por quê*, prioriza e cuida do resultado de negócio.
- **Devs (desenvolvedoras/es)**: transformam o design em produto de verdade.
- **QA**: testa se tudo funciona.
- **Stakeholders**: qualquer pessoa interessada no projeto — diretoria, atendimento, marketing, jurídico.

O triângulo **PM + Design + Tech** costuma decidir junto. Saber conversar com cada um é tão importante quanto saber usar o Figma.`,
        scenario(
          'O time precisa escolher se vai construir primeiro o "agendamento online" ou o "programa de fidelidade". Existe pouco tempo e as duas ideias são boas.',
          'Normalmente, quem lidera essa decisão de prioridade?',
          'A pessoa PM (gerente de produto), com base em dados e conversando com design e tecnologia',
          ['A pessoa designer, sozinha', 'A pessoa desenvolvedora mais experiente, sozinha', 'Quem chegar primeiro na reunião'],
          'Priorizar é responsabilidade principal de PM. Design contribui com evidências sobre as pessoas usuárias; tecnologia, com o esforço necessário.',
        ),
        tf(
          'Stakeholder é qualquer pessoa ou área que tem interesse ou influência no projeto.',
          true,
          'Exatamente. Diretoria, atendimento, jurídico, marketing… todos podem ser stakeholders. Ouvir essas pessoas evita surpresas no meio do caminho.',
        ),
        `## O que uma UX designer entrega?

Os "entregáveis" (ou **artefatos**) mais comuns:

- **Pesquisa**: roteiros, relatórios, personas, mapas de jornada
- **Estrutura**: mapas do site (sitemap), fluxos de usuário
- **Desenho**: wireframes (rascunhos), telas finais, protótipos clicáveis
- **Entrega**: especificações para devs, componentes, documentação

> ⚠️ Cuidado com a armadilha: o objetivo **não** é produzir artefatos bonitos. O objetivo é **resolver um problema real**. Um artefato só vale se ajuda o time a decidir melhor.`,
        mc(
          'Qual é o objetivo final do trabalho de UX?',
          'Resolver problemas reais das pessoas, gerando resultado para o negócio',
          ['Produzir o maior número possível de telas', 'Criar personas e jornadas para todo projeto', 'Deixar o produto com a aparência mais moderna'],
          'Artefatos são meios, não fins. O que importa é o problema resolvido — para as pessoas e para o negócio.',
        ),
        `## As habilidades de quem faz UX

**Hard skills** (técnicas): pesquisa, arquitetura de informação, wireframes, Figma, prototipação, testes, noções de acessibilidade e de desenvolvimento.

**Soft skills** (comportamentais): empatia, curiosidade, comunicação clara, saber ouvir, saber receber e dar críticas, organização, contar histórias.

A boa notícia: muitas soft skills você **já tem** da vida. Cuidar de uma família, negociar, organizar uma casa, entender o que alguém precisa sem que ela diga… tudo isso é matéria-prima de UX. As hard skills a gente aprende aqui, com prática.`,
        multi(
          'Quais destas são soft skills importantes em UX?',
          ['Empatia', 'Saber receber críticas', 'Comunicação clara'],
          ['Criar componentes no Figma', 'Calcular a taxa de conversão'],
          'Empatia, abertura a críticas e boa comunicação são comportamentais. Criar componentes e calcular métricas são habilidades técnicas (hard skills) — que também vamos aprender.',
        ),
        open(
          'Quais habilidades da sua vida (trabalho, casa, família, hobbies) você acha que vão te ajudar como designer? Dê um exemplo concreto.',
          'Muita gente que migra para UX vem de áreas como atendimento, educação, saúde, vendas, administração… e traz exatamente isso: entender pessoas, organizar informação e se comunicar. No futuro, essa história vai entrar na sua apresentação de portfólio.',
        ),
      ],
      flashcards: [
        ['Product designer', 'Profissional que une UX, UI e visão de negócio/produto. Um dos títulos mais comuns em vagas hoje.'],
        ['UX researcher', 'Especialista em pesquisa com pessoas: entrevistas, testes de usabilidade, análise de dados.'],
        ['PM (Product Manager)', 'Gerente de produto: decide o que construir e por quê, prioriza e responde pelo resultado.'],
        ['Stakeholder', 'Qualquer pessoa ou área com interesse ou influência no projeto (diretoria, atendimento, jurídico…).'],
        ['Artefato (entregável)', 'Material produzido no processo de design: persona, fluxo, wireframe, protótipo, relatório.'],
      ],
      resources: [
        { title: 'UX Collective Brasil', url: 'https://brasil.uxdesign.cc/', kind: 'site', lang: 'pt', note: 'Artigos em português escritos por designers do mercado.' },
      ],
    },
    {
      title: 'Como aprender UX do zero (e como esta trilha funciona)',
      summary: 'Mentalidade, ciência da memória, mercado de trabalho e o seu plano de 6 meses.',
      minutes: 15,
      steps: [
        `## Você não precisa saber desenhar

Três mitos que travam quem está começando:

1. **"Preciso desenhar bem."** Não. Em UX desenhamos com caixas, setas e componentes prontos. Rabiscos feios funcionam perfeitamente.
2. **"Preciso saber programar."** Não. Ajuda conhecer o básico de como sites são feitos (você verá isso no mês 5), mas não é requisito.
3. **"Preciso de faculdade de design."** Não. O mercado contrata pelo **portfólio**: a prova concreta de que você sabe resolver problemas.

O que você precisa é **curiosidade, constância e prática**.`,
        tf(
          'Para trabalhar com UX é obrigatório ter talento para desenho à mão.',
          false,
          'Rascunhos de UX são simples: caixas, linhas e setas. O que importa é a clareza das ideias, não a beleza do traço.',
        ),
        `## Como a memória funciona (e por que este app é assim)

No século 19, o psicólogo **Hermann Ebbinghaus** mediu quanto esquecemos com o tempo. O resultado é a **curva do esquecimento**: em poucos dias, perdemos boa parte do que vimos uma vez só.

Duas técnicas comprovadas vencem a curva:

- **Prática de recuperação**: tentar lembrar (responder perguntas) fixa muito mais do que reler. Por isso cada lição tem exercícios no meio da teoria.
- **Repetição espaçada**: rever o conteúdo em intervalos cada vez maiores (1 dia, 3 dias, 1 semana, 1 mês…). Por isso existem os **cartões de revisão** — o app calcula o dia certo de cada um.

Errar faz parte: o esforço de lembrar é justamente o que fortalece a memória.`,
        fill(
          'A ___ mostra que esquecemos rapidamente o que vimos uma única vez.',
          'curva do esquecimento',
          ['lei de Fitts', 'pirâmide de Maslow', 'regra dos terços'],
          'A curva do esquecimento, de Ebbinghaus, mostra a queda rápida da memória sem revisão.',
        ),
        mc(
          'Por que a trilha tem cartões de revisão que aparecem em dias diferentes?',
          'Porque rever em intervalos crescentes (repetição espaçada) fixa o conteúdo na memória de longo prazo',
          ['Para você gastar mais tempo no app', 'Porque o conteúdo muda todo dia', 'Para substituir as lições'],
          'A repetição espaçada é uma das técnicas de estudo com mais evidência científica. Poucos minutos por dia de revisão valem mais que horas de releitura.',
        ),
        `## Aprender fazendo: prática deliberada

Ler sobre natação não ensina a nadar. Em UX é igual. Por isso a trilha tem:

- **Práticas semanais** no Figma, FigJam, papel ou com pessoas reais.
- **Um projeto por mês**, que vai para o seu portfólio.
- **Autoavaliação** com critérios claros (rubrica) e, se tiver uma mentoria, feedback.

Prática deliberada é praticar **com objetivo, com critério e com feedback** — e repetir até melhorar. Copiar telas de apps conhecidos, por exemplo, é um ótimo exercício (só para estudo, nunca como se fosse seu trabalho).`,
        multi(
          'O que caracteriza a prática deliberada?',
          ['Ter um objetivo claro', 'Receber feedback', 'Repetir buscando melhorar'],
          ['Assistir vídeos sem praticar', 'Fazer sempre o que já domina'],
          'Prática deliberada = objetivo + critério + feedback + repetição, saindo da zona de conforto.',
        ),
        `## O mercado de trabalho

Alguns números e fatos para calibrar expectativas (2026):

- Títulos comuns de vaga: **UX/UI designer**, **product designer**, **UX designer júnior**.
- Faixas de salário citadas por sites de carreira para **júnior CLT** ficam em torno de **R$ 3.500 a R$ 6.000**, variando muito por cidade, empresa e modelo (CLT, PJ, remoto). Use como referência, não como promessa.
- Há muitas vagas **remotas ou híbridas**.
- A concorrência para júnior existe. O que diferencia: **portfólio com processo bem explicado**, boa comunicação e mostrar que você aprende rápido.

Ao fim dos 6 meses, você terá **projetos completos** para mostrar. O módulo 6 é inteiro sobre portfólio, currículo e entrevistas.`,
        mc(
          'Numa seleção para UX júnior, o que costuma pesar mais?',
          'Um portfólio que mostra como você pensa e resolve problemas',
          ['Ter diploma de design', 'Saber programar em várias linguagens', 'Ter feito o maior número de cursos'],
          'Recrutadoras(es) querem ver seu processo: como você entendeu o problema, as decisões que tomou e o que aprendeu. Certificados ajudam pouco sem isso.',
        ),
        `## Seu plano de 6 meses

| Mês | Módulo | Você vai aprender |
|---|---|---|
| 1 | **Fundamentos** | O que é UX, processos, usabilidade, psicologia, Figma básico |
| 2 | **Pesquisa** | Entrevistas, questionários, personas, jornadas |
| 3 | **Estrutura e interação** | Ideação, arquitetura de informação, fluxos, wireframes |
| 4 | **Interface (UI)** | Hierarquia, tipografia, cor, grids, componentes, design system |
| 5 | **Validação e produto** | Protótipos, testes de usabilidade, acessibilidade, handoff |
| 6 | **Carreira** | Estudos de caso, portfólio, currículo, entrevistas |

Ritmo ideal: **8 a 10 horas por semana**, de preferência um pouco todo dia. A ferramenta principal é o **Figma** — gratuito para começar. Crie sua conta já nesta semana!`,
        order(
          'Coloque os módulos da trilha na ordem:',
          ['Fundamentos', 'Pesquisa', 'Estrutura e interação', 'Interface (UI)', 'Validação e produto', 'Carreira'],
          'Primeiro a base, depois entender pessoas, estruturar, dar forma visual, validar e, por fim, preparar a carreira.',
        ),
        open(
          'Escreva o seu "porquê": por que você quer virar UX designer e como vai estar sua vida daqui a 6 meses se der certo?',
          'Guarde isso. Nos dias de cansaço (eles vão existir), reler o seu porquê ajuda muito. Constância vence talento.',
        ),
      ],
      flashcards: [
        ['Curva do esquecimento', 'Descoberta de Ebbinghaus: sem revisão, esquecemos grande parte do que aprendemos em poucos dias.'],
        ['Repetição espaçada', 'Rever o conteúdo em intervalos cada vez maiores (1, 3, 7, 30 dias…) para fixar na memória de longo prazo.'],
        ['Prática de recuperação', 'Tentar lembrar ativamente (responder perguntas) em vez de só reler. Fixa muito mais o conteúdo.'],
        ['Prática deliberada', 'Praticar com objetivo claro, critério, feedback e repetição, saindo da zona de conforto.'],
        ['Portfólio', 'Coleção dos seus melhores projetos, mostrando o processo e as decisões. É o principal critério de contratação em UX.'],
      ],
      resources: [
        { title: 'Criar conta no Figma (gratuita)', url: 'https://www.figma.com/signup', kind: 'ferramenta', note: 'Faça agora: você vai usar na prática da semana 2.' },
        { title: 'Central de ajuda do Figma', url: 'https://help.figma.com/', kind: 'site', lang: 'en', note: 'Tutoriais oficiais. Dica: o navegador traduz a página.' },
      ],
    },
  ],
  practices: [
    {
      title: 'Caça às experiências: seu diário de UX',
      summary: 'Durante 3 dias, registre 10 experiências boas e ruins do seu dia a dia.',
      minutes: 90,
      tool: 'escrita',
      brief: `## Treinando o olhar de designer

A primeira habilidade de quem faz UX é **perceber** experiências — coisa que a maioria das pessoas faz no automático.

Durante **3 dias**, anote **10 situações**: 5 experiências **boas** e 5 **ruins**. Podem ser digitais (apps, sites, totens) ou físicas (fila do mercado, controle remoto, formulário em papel). Pelo menos 5 devem ser digitais.

Para cada situação, responda:

| Campo | Exemplo |
|---|---|
| **O que aconteceu** | Tentei remarcar a consulta pelo app do plano |
| **Como me senti** | Frustrada, perdi 15 minutos |
| **Por que (sua hipótese)** | O botão de remarcar fica escondido em "Mais opções" |
| **Como poderia ser melhor** | Botão "Remarcar" direto na tela da consulta |

Não existe resposta certa: o objetivo é treinar a observação.`,
      steps: [
        'Crie um documento (Google Docs, Notion, bloco de notas ou caderno) com a tabela de 4 colunas.',
        'Ao longo de 3 dias, anote as situações **na hora em que acontecem** (depois a gente esquece os detalhes).',
        'Para as experiências digitais, tire um **print** da tela onde o problema (ou o acerto) acontece.',
        'Releia tudo e marque as 2 experiências que mais te marcaram.',
        'Escreva um parágrafo final: o que as experiências boas têm em comum?',
      ],
      deliverable: 'Link do documento (ou foto do caderno) com as 10 situações, prints e o parágrafo final.',
      rubric: [
        'Registrei 10 situações (5 boas e 5 ruins)',
        'Pelo menos 5 são experiências digitais',
        'Descrevi como me senti em cada uma',
        'Escrevi uma hipótese de causa para cada uma',
        'Sugeri uma melhoria para as experiências ruins',
        'Incluí prints das experiências digitais',
        'Escrevi a conclusão sobre o que as boas têm em comum',
      ],
      tips: [
        'Situações pequenas valem: um botão difícil de achar, um aviso que te salvou de um erro.',
        'Repare também em experiências do mundo físico: elas ensinam os mesmos princípios.',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Um aplicativo de banco tem telas lindas, mas a transferência às vezes falha sem nenhuma mensagem, e o suporte demora 2 dias para responder.',
      'Como você avaliaria a experiência do usuário desse app?',
      'Ruim: a beleza da interface não compensa falhas e um suporte lento',
      ['Ótima, porque as telas são bonitas', 'Neutra, porque UX só avalia a interface', 'Boa, porque o suporte existe'],
      'UX é a experiência inteira. Falhas silenciosas e suporte lento destroem a confiança, por mais bonita que seja a UI.',
    ),
    mc(
      'Qual destas frases descreve melhor o trabalho de UX?',
      'Equilibrar as necessidades das pessoas com os objetivos do negócio',
      ['Escolher as cores da marca', 'Programar o aplicativo', 'Vender o produto para clientes'],
      'Design de UX atende pessoas e negócio ao mesmo tempo. Cores, código e vendas são partes do todo, feitas com outras áreas.',
    ),
    tf(
      'Product designer é um título comum para quem cuida de UX, UI e da visão de produto.',
      true,
      'Sim. Muitas empresas usam "product designer" para a pessoa que une experiência, interface e negócio.',
    ),
  ],
}
