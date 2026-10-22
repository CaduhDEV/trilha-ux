import { fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u2: UnitDef = {
  title: 'Portfólio e presença profissional',
  goal: 'Publicar seu portfólio, preparar um currículo e um LinkedIn de UX e começar a construir sua rede.',
  lessons: [
    {
      title: 'Onde e como publicar o portfólio',
      summary: 'Site próprio, Behance, Notion ou PDF — e a estrutura de um portfólio que funciona.',
      minutes: 15,
      steps: [
        `## Onde publicar

| Opção | Prós | Contras |
|---|---|---|
| **Site próprio** (Framer, Figma Sites, Webflow, Wix) | Mais profissional, controle total, mostra suas habilidades | Dá mais trabalho; pode ter custo |
| **Notion** | Rápido, gratuito, fácil de editar | Visual mais limitado |
| **Behance** | Comunidade grande, gratuito | Focado em visual; estudos de caso longos ficam menos legíveis |
| **Medium** | Ótimo para textos longos | Pouco controle visual |
| **PDF** | Bom para enviar em candidaturas | Não é indexado; precisa estar leve |

Uma combinação comum: **site próprio** (ou Notion bem feito) + **PDF** curto para enviar + perfil no **Behance/LinkedIn** apontando para o site.

Se puder, compre um **domínio** com seu nome (ex.: anasouza.design). Custa pouco por ano e passa profissionalismo.`,
        mc(
          'Qual combinação de portfólio costuma funcionar bem para quem está começando?',
          'Site próprio (ou Notion) com os cases + um PDF leve para candidaturas',
          ['Apenas prints no Instagram pessoal', 'Somente o arquivo do Figma', 'Nenhum portfólio, só o currículo'],
          'O site concentra os cases; o PDF facilita candidaturas que pedem anexo.',
        ),
        `## A estrutura do site

- **Início**: uma frase de quem você é e o que faz ("UX/UI designer que transforma pesquisa em produtos simples") + seus **2 a 3 estudos de caso** em destaque, com imagem e título.
- **Estudos de caso**: uma página para cada.
- **Sobre**: sua história (a transição de carreira é um **ponto forte**, não algo para esconder), foto, o que te move.
- **Contato**: e-mail, LinkedIn e **currículo** para download.

Ordem dos cases: o **mais forte primeiro**. Recrutadoras raramente abrem o terceiro.`,
        tf(
          'Ser uma pessoa em transição de carreira deve ser escondido no portfólio.',
          false,
          'Sua trajetória anterior traz habilidades e repertório. Conte como ela te ajuda em UX — isso diferencia você.',
        ),
        `## Detalhes que pesam

- **Funciona no celular?** Muita gente vai abrir o link pelo celular.
- **Rápido?** Imagens otimizadas.
- **Acessível?** Contraste, textos alternativos, tamanho de fonte.
- **Tem a sua voz?** Um portfólio com personalidade (sem exageros) é lembrado.
- **Atualizado?** Datas recentes e links funcionando.

> 💡 O próprio portfólio é um projeto de UX: o público são recrutadoras e gestoras com pouco tempo. Qual é a tarefa delas? Entender rapidamente se você deve ir para a entrevista.`,
        multi(
          'Quais páginas um portfólio de UX deve ter?',
          ['Início com os cases em destaque', 'Páginas dos estudos de caso', 'Sobre e contato com currículo'],
          ['Uma galeria com todos os exercícios do curso', 'Uma página de fotos pessoais de viagens'],
          'Foco no que ajuda quem avalia a decidir.',
        ),
        scenario(
          'O portfólio de uma candidata tem 9 projetos na página inicial, em ordem cronológica, começando pelos primeiros exercícios do curso.',
          'Qual seria a melhor organização?',
          'Mostrar só os 2 ou 3 melhores cases, com o mais forte primeiro',
          ['Manter todos, porque mostram esforço', 'Inverter a ordem e manter os 9', 'Esconder todos os projetos'],
          'Quem avalia tem pouco tempo. O primeiro case precisa ser o melhor.',
        ),
        tf(
          'Um portfólio de UX precisa funcionar bem no celular, porque muita gente abre os links pelo telefone.',
          true,
          'Recrutadoras muitas vezes fazem a primeira triagem pelo celular. Um site quebrado ali queima a primeira impressão.',
        ),
        fill(
          'Pense no portfólio como um projeto de UX: o público principal são recrutadoras e ___ com pouco tempo.',
          'gestoras',
          ['clientes finais', 'concorrentes', 'investidores'],
          'Gestoras de design e recrutadoras são o público. A tarefa delas é decidir rapidamente se vale te entrevistar.',
        ),
      ],
      flashcards: [
        ['Estrutura de portfólio', 'Início (proposta + 2–3 cases), páginas de case, Sobre e Contato com currículo.'],
        ['Portfólio como projeto de UX', 'O público são recrutadoras e gestoras com pouco tempo; a tarefa é decidir se vale entrevistar.'],
        ['Portfólio em PDF', 'Versão curta e leve do portfólio para anexar em candidaturas que pedem arquivo.'],
      ],
      resources: [
        { title: 'Framer — sites sem código', url: 'https://www.framer.com/', kind: 'ferramenta', lang: 'en' },
        { title: 'Behance', url: 'https://www.behance.net/', kind: 'site' },
      ],
    },
    {
      title: 'Currículo e LinkedIn para UX',
      summary: 'Um currículo de uma página, palavras-chave e um LinkedIn que atrai recrutadoras.',
      minutes: 15,
      steps: [
        `## O currículo

- **Uma página**. Em transição de carreira, duas no máximo.
- **No topo**: nome, título ("UX/UI Designer"), cidade, e-mail, **link do portfólio** (clicável!) e LinkedIn.
- **Resumo** de 2–3 linhas: quem você é, o que faz bem, o que busca.
- **Projetos** de UX (sim, os do curso!) com 1–2 linhas de resultado cada.
- **Experiência anterior**: destaque o que se conecta com UX (atendimento ao público, pesquisa, organização, comunicação, liderança).
- **Formação e cursos**.
- **Habilidades**: Figma, pesquisa com usuários, testes de usabilidade, prototipação, acessibilidade, design systems…

**ATS**: muitas empresas usam sistemas que leem o currículo automaticamente. Use **texto real** (não imagem), um layout simples e as **palavras-chave** da vaga.`,
        multi(
          'O que deve estar no topo do currículo de UX?',
          ['Nome e título profissional', 'Link clicável do portfólio', 'E-mail e LinkedIn'],
          ['Foto de corpo inteiro', 'Número de documentos pessoais (CPF/RG)'],
          'O essencial para contato e para chegar ao portfólio. Documentos pessoais não devem ir no currículo.',
        ),
        `## Contando a experiência anterior

Traduza sua experiência para a linguagem de UX, sem inventar:

- Recepcionista → "Atendi 50+ clientes por dia e reorganizei o processo de agendamento, reduzindo filas."
- Professora → "Planejei aulas para públicos diferentes e adaptei materiais a partir do retorno dos alunos."
- Vendedora → "Entendi necessidades de clientes e expliquei produtos de forma simples."

Use **verbos de ação** e, quando possível, **números**.`,
        scenario(
          'Uma candidata trabalhou 8 anos como recepcionista de clínica e acha que essa experiência "não conta" para UX.',
          'Como ela poderia apresentar essa experiência?',
          'Destacando atendimento, entendimento de necessidades e melhoria de processos, com exemplos concretos',
          ['Removendo do currículo', 'Dizendo que foi "UX designer de recepção"', 'Escrevendo apenas "recepcionista" sem descrição'],
          'Experiências reais com pessoas e processos são muito valorizadas — basta traduzir sem exagerar.',
        ),
        `## LinkedIn

O LinkedIn é onde recrutadoras **procuram** pessoas. Otimize:

- **Foto** profissional e simples (rosto visível, fundo neutro) e **banner** com seu título ou uma imagem de projeto.
- **Título** com palavras-chave: "UX/UI Designer | Product Design | Pesquisa com usuários | Figma".
- **Sobre**: sua história em primeira pessoa, curta, com link do portfólio.
- **Em destaque**: links para os estudos de caso.
- **Experiência**: inclua os projetos do curso como "Projetos" ou numa experiência de "UX Designer (projetos independentes)".
- **Habilidades** e **recomendações** (peça para colegas e mentoras).
- Ative o **"Open to work"** (pode ser visível só para recrutadoras).`,
        match('Ligue a seção do LinkedIn ao conteúdo ideal', [
          ['Título', 'UX/UI Designer | Pesquisa | Figma'],
          ['Sobre', 'Sua história curta + link do portfólio'],
          ['Em destaque', 'Links para os estudos de caso'],
          ['Recomendações', 'Depoimentos de colegas e mentoras'],
        ]),
        tf(
          'Currículos feitos como imagem bonita (exportados do Figma como PNG) funcionam bem com sistemas de triagem automática (ATS).',
          false,
          'O ATS precisa ler o texto. Exporte em PDF com texto selecionável e layout simples.',
        ),
        fill(
          'Sistemas que leem currículos automaticamente na triagem são chamados de ___.',
          'ATS',
          ['CMS', 'CRM', 'API'],
          'ATS = Applicant Tracking System. Palavras-chave da vaga e texto real ajudam a passar pela triagem.',
        ),
        open(
          'Escreva o título do seu LinkedIn e o resumo de 3 linhas do seu currículo.',
          'Exemplo de resumo: "UX/UI designer em transição de carreira, com 8 anos de experiência em atendimento ao público. Conduzo pesquisas, desenho fluxos e protótipos no Figma e testo com pessoas reais. Busco minha primeira oportunidade como designer júnior." Ajuste para a sua história.',
        ),
      ],
      flashcards: [
        ['Currículo de UX', 'Uma página, link do portfólio no topo, projetos com resultados, experiência traduzida, palavras-chave.'],
        ['ATS', 'Applicant Tracking System: software de triagem que lê currículos — use texto real e palavras-chave.'],
        ['Título do LinkedIn', 'Linha abaixo do nome; use palavras-chave como "UX/UI Designer | Figma | Pesquisa".'],
      ],
    },
    {
      title: 'Rede, comunidades e aprender em público',
      summary: 'Mentorias gratuitas, comunidades brasileiras, voluntariado e compartilhar o processo.',
      minutes: 15,
      steps: [
        `## Muitas vagas vêm de indicação

Uma parte grande das contratações acontece por **indicação** ou por alguém que "já conhecia seu trabalho". Construir uma rede não é "fazer contatos por interesse": é **trocar** com pessoas da área.

## Onde encontrar a comunidade

- **ADPList**: plataforma de **mentoria gratuita** com designers do mundo todo (muitos brasileiros). Marque conversas de 30 minutos para revisar portfólio e tirar dúvidas.
- **UX Collective Brasil** (artigos em português) e newsletters da área.
- **Comunidades em Discord, Telegram e WhatsApp** de UX e design de produto.
- **Meetups e eventos** (presenciais e online): capítulos locais da IxDA, eventos de UX das capitais, conferências.
- **LinkedIn**: siga designers brasileiros e participe com comentários de verdade (não só "parabéns!").`,
        mc(
          'O que é o ADPList?',
          'Uma plataforma de mentoria gratuita com designers experientes',
          ['Um plugin de ícones do Figma', 'Um teste de usabilidade automatizado', 'Uma certificação obrigatória'],
          'Mentorias gratuitas ajudam muito a revisar portfólio e entender o mercado.',
        ),
        `## Aprender em público

Compartilhar o seu processo (no LinkedIn, por exemplo) mostra evolução e atrai pessoas:

- "Esta semana fiz 5 entrevistas para o meu projeto e descobri que…"
- "3 coisas que aprendi testando meu primeiro protótipo."
- Um antes e depois de uma tela com a explicação da decisão.

Não precisa ser especialista para postar: mostre **o que você aprendeu**. Recrutadoras veem iniciativa e capacidade de comunicação.

## Experiência real: voluntariado

Uma ONG, um pequeno negócio do bairro, uma associação: muitos precisam de ajuda com o site ou com processos. Um projeto voluntário **real** (com acordo claro de escopo e prazo) vira um case forte e uma referência.`,
        `## Como pedir ajuda sem constranger ninguém

Mensagens curtas, específicas e respeitosas têm muito mais resposta. Um modelo:

> "Oi, Marina! Acompanho seus posts sobre pesquisa e o último, sobre entrevistas com idosos, me ajudou muito no meu projeto. Estou fazendo a transição para UX e publiquei meu primeiro estudo de caso. Você toparia dar uma olhada de 5 minutos e me dizer se a parte de pesquisa está clara? Sem problema se não tiver tempo. Obrigada!"

Repare: **contexto** (por que ela), **pedido pequeno e específico** e **saída fácil**. E depois: agradeça e conte o que você mudou com o feedback — isso cria relação.`,
        tf(
          'Para postar sobre UX no LinkedIn, é preciso já ser especialista na área.',
          false,
          'Compartilhar o que você está aprendendo é valioso e mostra evolução. Seja honesta(o) sobre o seu nível.',
        ),
        scenario(
          'Uma iniciante quer experiência real, mas não consegue estágio.',
          'Qual estratégia é mais indicada?',
          'Fazer um projeto voluntário com escopo claro para uma ONG ou pequeno negócio',
          ['Esperar uma vaga perfeita sem fazer nada', 'Inventar experiências no currículo', 'Fazer mais 10 cursos antes de qualquer projeto'],
          'Projetos reais, mesmo voluntários, trazem restrições, stakeholders e resultados — tudo que um case precisa.',
        ),
        multi(
          'Quais atitudes ajudam a construir uma rede profissional saudável?',
          ['Pedir mentorias com perguntas específicas', 'Comentar posts com contribuições reais', 'Compartilhar o próprio processo de aprendizado'],
          ['Mandar mensagem pedindo vaga para desconhecidos todo dia', 'Só aparecer quando precisa de algo'],
          'Rede se constrói com troca e constância.',
        ),
        fill(
          'Mostrar o seu processo de aprendizado nas redes, mesmo sendo iniciante, é chamado de aprender em ___.',
          'público',
          ['segredo', 'silêncio', 'grupo'],
          'Learning in public: você aprende mais ao explicar e ainda constrói reputação.',
        ),
        match('Ligue o recurso ao que ele oferece', [
          ['ADPList', 'Mentorias gratuitas'],
          ['UX Collective Brasil', 'Artigos de UX em português'],
          ['Meetups', 'Encontros com profissionais da área'],
          ['Voluntariado', 'Experiência com projeto real'],
        ]),
        open(
          'Liste 3 pessoas ou comunidades de UX que você vai começar a acompanhar esta semana e 1 pergunta que faria numa mentoria.',
          'Boas perguntas de mentoria são específicas: "Meu primeiro case está claro para quem não conhece o projeto?" rende mais do que "Como entro no mercado?".',
        ),
      ],
      flashcards: [
        ['ADPList', 'Plataforma de mentorias gratuitas com designers experientes.'],
        ['Aprender em público', 'Compartilhar o processo e os aprendizados enquanto estuda.'],
        ['Projeto voluntário', 'Projeto real para ONG ou pequeno negócio, com escopo claro — gera um case forte.'],
      ],
      resources: [
        { title: 'ADPList — mentorias gratuitas', url: 'https://adplist.org/', kind: 'site', lang: 'en' },
        { title: 'UX Collective Brasil', url: 'https://brasil.uxdesign.cc/', kind: 'site', lang: 'pt' },
      ],
    },
  ],
  practices: [
    {
      title: 'Portfólio online no ar',
      summary: 'Publique seu portfólio com 2 estudos de caso, página Sobre e contato.',
      minutes: 480,
      tool: 'web',
      brief: `## Hora de ir ao ar 🚀

Publique seu portfólio com:

- **Início**: sua proposta em uma frase + os cases em destaque.
- **Case 1**: o projeto principal (escrito na semana passada).
- **Case 2**: o Projeto 1 (análise de experiência) reescrito como case curto — ou outro projeto que você tenha.
- **Sobre**: sua história, foto e o que você busca.
- **Contato**: e-mail, LinkedIn e currículo em PDF.

### Escolha da ferramenta

Se nunca fez um site: **Framer** (gratuito com subdomínio) ou **Notion** são os caminhos mais rápidos. Se já se sente confortável com Figma: **Figma Sites** (beta) permite publicar a partir do próprio Figma.

> O Case 3 vem do projeto final deste mês.`,
      steps: [
        'Escolha a ferramenta e um template simples (ou comece do zero).',
        'Monte a página inicial com a proposta e os cases em destaque.',
        'Publique o case 1 com imagens e legendas.',
        'Publique o case 2 (pode ser mais curto).',
        'Escreva a página "Sobre" contando sua transição de carreira.',
        'Adicione contato e currículo em PDF.',
        'Teste no celular, revise o português e teste todos os links numa janela anônima.',
        'Peça feedback para 2 pessoas (uma delas, se possível, numa mentoria do ADPList).',
      ],
      deliverable: 'Link do portfólio publicado.',
      rubric: [
        'O portfólio está publicado e acessível por link',
        'A página inicial tem proposta clara e os cases em destaque',
        'O case principal está completo e escaneável',
        'Há pelo menos 2 estudos de caso',
        'A página Sobre conta minha história',
        'Contato e currículo estão disponíveis',
        'Funciona bem no celular e os links foram testados',
        'Recebi feedback de pelo menos 2 pessoas e ajustei',
      ],
    },
  ],
  checkpointExtra: [
    mc(
      'Qual é um bom título de LinkedIn para quem está buscando a primeira vaga?',
      '"UX/UI Designer | Pesquisa com usuários | Prototipação no Figma"',
      ['"Desempregada buscando oportunidades"', '"Apaixonada por tudo"', '"Estudante"'],
      'Títulos com palavras-chave da área ajudam recrutadoras a encontrar você nas buscas.',
    ),
    tf(
      'É recomendado colocar o link do portfólio no topo do currículo.',
      true,
      'É a primeira coisa que quem avalia quer ver depois do seu nome.',
    ),
    scenario(
      'Uma candidata enviou o currículo como uma imagem PNG cheia de ícones e gráficos de "nível de habilidade" (Figma ★★★★☆).',
      'Quais são os problemas?',
      'Sistemas de triagem não leem imagem, e barras de habilidade não dizem nada concreto',
      ['Nenhum: currículos visuais sempre se destacam', 'Faltaram mais estrelas', 'Deveria ter usado mais cores'],
      'Use PDF com texto real e mostre habilidades com projetos e resultados, não com estrelinhas.',
    ),
  ],
}
