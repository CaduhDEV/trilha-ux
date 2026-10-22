import { ab, fill, match, mc, multi, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u3: UnitDef = {
  title: 'Fluxos e wireframes',
  goal: 'Desenhar os caminhos das pessoas pelo produto e esboçar as telas em baixa fidelidade.',
  lessons: [
    {
      title: 'Fluxos de usuário',
      summary: 'Task flow, user flow e wireflow, caminho feliz, caminhos alternativos e de erro.',
      minutes: 15,
      steps: [
        `## Pensar em caminhos, não em telas soltas

Um erro comum de iniciantes é desenhar telas isoladas. Mas as pessoas não usam telas: elas **percorrem caminhos** para atingir objetivos.

O **fluxo de usuário** mapeia esse caminho: de onde a pessoa vem, quais passos dá, que decisões toma e onde termina.

## Três tipos

- **Task flow (fluxo de tarefa)**: um caminho **único e linear** para uma tarefa, igual para todo mundo. Ex.: os passos para agendar um horário.
- **User flow (fluxo do usuário)**: inclui **decisões e caminhos diferentes** conforme a pessoa e a situação (já tem conta? horário disponível?).
- **Wireflow**: um fluxo em que cada etapa é um **wireframe** da tela, conectado por setas. Mistura fluxo com layout.`,
        match('Ligue o tipo de fluxo à descrição', [
          ['Task flow', 'Caminho linear e único para uma tarefa'],
          ['User flow', 'Caminho com decisões e ramificações'],
          ['Wireflow', 'Fluxo em que cada etapa é o desenho da tela'],
        ]),
        `## A notação básica

::flow-notation

- **Oval/pílula**: início e fim.
- **Retângulo**: uma tela ou etapa.
- **Losango**: uma decisão (sim/não).
- **Seta**: a ação que leva de um ponto a outro (rotule a seta: "toca em Agendar").

Não precisa seguir uma norma rígida — o importante é ser **consistente** e incluir uma **legenda**.`,
        mc(
          'Que forma representa uma decisão num fluxo de usuário?',
          'Losango',
          ['Círculo', 'Retângulo', 'Estrela'],
          'O losango indica um ponto em que o caminho se divide conforme a resposta (sim/não, tem conta/não tem).',
        ),
        `## Caminho feliz e os outros caminhos

O **caminho feliz** (*happy path*) é o fluxo ideal, em que tudo dá certo. Comece por ele — mas **não pare nele**.

Pense também nos:

- **Caminhos alternativos**: a pessoa quer outro dia; não tem conta; vem de um link do Instagram.
- **Caminhos de erro**: sem internet; horário ocupado por outra pessoa enquanto ela decidia; pagamento recusado.
- **Pontos de entrada**: por onde a pessoa chega? Notificação, link, busca, tela inicial?

Os caminhos de erro são onde a experiência mais quebra — e onde designers iniciantes mais esquecem de projetar.`,
        scenario(
          'O fluxo de agendamento desenhado pela designer termina em "Horário confirmado!". Durante o teste, uma participante escolheu um horário que outra cliente tinha acabado de reservar.',
          'O que faltou no fluxo?',
          'Projetar o caminho de erro (horário ficou indisponível) com uma saída clara',
          ['Mais telas de sucesso', 'Uma animação na confirmação', 'Nada: erros são responsabilidade dos devs'],
          'Erros acontecem. Se o design não prevê, a pessoa fica sem saber o que fazer. Algo como "Esse horário acabou de ser reservado. Veja os próximos livres: 15h30, 16h" resolve.',
        ),
        multi(
          'Quais situações você deve considerar num fluxo de agendamento além do caminho feliz?',
          ['A pessoa está sem internet', 'O horário fica indisponível no meio do processo', 'A pessoa chega por um link do Instagram'],
          ['A cor do botão de confirmar', 'O nome da fonte usada'],
          'Caminhos alternativos, de erro e pontos de entrada fazem parte do fluxo. Cor e fonte são decisões visuais, de outra etapa.',
        ),
        order(
          'Ordene um caminho feliz de agendamento:',
          ['Abrir o link de agendamento', 'Escolher o serviço', 'Escolher dia e horário', 'Informar nome e telefone', 'Ver a confirmação'],
          'Repare que o fluxo começa no ponto de entrada (o link) e termina numa confirmação clara.',
        ),
        tf(
          'Um bom fluxo de usuário deve considerar também os pontos de entrada, como uma notificação ou um link compartilhado.',
          true,
          'A pessoa nem sempre começa pela tela inicial. Saber por onde ela chega muda o que a primeira tela precisa mostrar.',
        ),
      ],
      flashcards: [
        ['Fluxo de usuário (user flow)', 'Mapa dos caminhos que a pessoa percorre para atingir um objetivo, com decisões e ramificações.'],
        ['Task flow', 'Fluxo linear e único de uma tarefa, sem ramificações.'],
        ['Wireflow', 'Fluxo em que cada etapa é um wireframe da tela.'],
        ['Caminho feliz (happy path)', 'O fluxo ideal, em que tudo dá certo. É o começo, não o fim do trabalho.'],
        ['Ponto de entrada', 'Por onde a pessoa chega ao fluxo: notificação, link, busca, tela inicial…'],
      ],
      resources: [
        { title: 'Wireflows: A UX Deliverable for Workflows and Apps (NN/g)', url: 'https://www.nngroup.com/articles/wireflows/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Sketching e wireframes de baixa fidelidade',
      summary: 'Rascunhar rápido, definir estrutura e hierarquia antes de qualquer cor.',
      minutes: 15,
      steps: [
        `## Rascunhar é pensar com as mãos

**Sketching** é desenhar ideias à mão, rápido. É a forma mais barata de testar como uma tela pode ser organizada. Em 10 minutos você faz 5 versões de uma tela — no Figma, faria uma.

## Wireframe

O **wireframe** é o "esqueleto" da tela: mostra a **estrutura**, a **hierarquia** e o **conteúdo**, sem cores, imagens reais ou estilo.

::wireframe

Convenções comuns:

- Caixa com um **X** = imagem
- Linhas cinzas = texto
- Retângulos = botões e campos
- Tons de **cinza** apenas`,
        tf(
          'Wireframes de baixa fidelidade devem usar as cores finais da marca para ficar mais realistas.',
          false,
          'Em baixa fidelidade usamos cinzas de propósito: a conversa fica na estrutura e no conteúdo, e não em "gostei do roxo".',
        ),
        `## Por que começar em baixa fidelidade?

::fidelity

- **Rápido e barato**: dá para jogar fora sem dó.
- **Foco no que importa**: estrutura, conteúdo, fluxo.
- **Feedback mais honesto**: as pessoas comentam sem medo quando algo parece "rascunho". Diante de uma tela linda, elas elogiam o visual e não falam do problema.
- **Menos apego**: você também se apega menos e testa mais alternativas.`,
        mc(
          'Por que as pessoas costumam dar feedback mais honesto em wireframes de baixa fidelidade?',
          'Porque o rascunho parece inacabado, e elas se sentem à vontade para sugerir mudanças',
          ['Porque os wireframes são coloridos', 'Porque não entendem o que estão vendo', 'Porque wireframes têm mais texto'],
          'Algo que parece pronto intimida. Algo que parece rascunho convida a participar.',
        ),
        `## O que um bom wireframe tem

- **Conteúdo realista**: use textos próximos dos reais ("Corte + escova · R$ 89") em vez de "Lorem ipsum". O tamanho do conteúdo real muda o layout!
- **Hierarquia clara**: o que é mais importante aparece primeiro e maior.
- **Anotações**: explicam comportamentos que o desenho não mostra ("ao tocar, abre os horários do dia").
- **Todos os estados importantes** (você vai aprender na próxima semana).

Ferramentas: papel e caneta, Figma (com um kit de wireframe da Comunidade), Balsamiq.`,
        ab(
          'Qual wireframe comunica melhor o conteúdo de um card de serviço?',
          `<div style="border:2px solid #ccc;border-radius:8px;padding:8px"><div style="height:40px;border:2px solid #ccc;border-radius:6px;margin-bottom:6px;background:linear-gradient(45deg,transparent 48%,#ccc 49%,#ccc 51%,transparent 52%),linear-gradient(-45deg,transparent 48%,#ccc 49%,#ccc 51%,transparent 52%)"></div><div style="font-size:12px;font-weight:800;color:#555">Lorem ipsum dolor</div><div style="font-size:10px;color:#999">Sit amet consectetur</div><div style="height:20px;background:#ccc;border-radius:6px;margin-top:6px"></div></div>`,
          `<div style="border:2px solid #ccc;border-radius:8px;padding:8px"><div style="height:40px;border:2px solid #ccc;border-radius:6px;margin-bottom:6px;background:linear-gradient(45deg,transparent 48%,#ccc 49%,#ccc 51%,transparent 52%),linear-gradient(-45deg,transparent 48%,#ccc 49%,#ccc 51%,transparent 52%)"></div><div style="font-size:12px;font-weight:800;color:#555">Pé e mão</div><div style="font-size:10px;color:#999">1h10 · R$ 55 · próximo horário 15h</div><div style="height:20px;background:#ccc;border-radius:6px;margin-top:6px;font-size:10px;text-align:center;line-height:20px;color:#fff;font-weight:800">Agendar</div></div>`,
          'b',
          'Conteúdo realista mostra o que realmente precisa caber no card (duração, preço, próximo horário) e torna o teste mais útil.',
        ),
        tf(
          'Rascunhar no papel antes do Figma é perda de tempo para quem já sabe usar a ferramenta.',
          false,
          'No papel você explora várias versões em minutos, sem se apegar a detalhes. O Figma entra quando a direção está mais clara.',
        ),
        fill(
          'Num wireframe, uma caixa com um ___ dentro costuma representar uma imagem.',
          'X',
          ['círculo', 'coração', 'número'],
          'É uma convenção antiga e universal de wireframes.',
        ),
        multi(
          'O que deve aparecer num wireframe de baixa fidelidade?',
          ['Estrutura e hierarquia da tela', 'Conteúdo realista', 'Anotações de comportamento'],
          ['Fotos finais e paleta de cores da marca', 'Animações detalhadas'],
          'Fotos, cores e animações vêm nas etapas de alta fidelidade.',
        ),
      ],
      flashcards: [
        ['Sketching', 'Desenhar ideias à mão, rápido, para explorar várias soluções.'],
        ['Wireframe', 'Esqueleto da tela: estrutura, hierarquia e conteúdo, sem estilo visual.'],
        ['Fidelidade', 'Quanto um artefato se parece com o produto final (baixa, média, alta).'],
        ['Lorem ipsum', 'Texto falso de preenchimento. Em UX, prefira conteúdo realista.'],
      ],
      resources: [
        { title: 'Comunidade do Figma — kits de wireframe gratuitos', url: 'https://www.figma.com/community', kind: 'site', note: 'Busque por "wireframe kit".' },
      ],
    },
    {
      title: 'Padrões de interface',
      summary: 'Cards, listas, formulários, abas, modais, bottom sheets, onboarding e mais — não reinvente a roda.',
      minutes: 20,
      steps: [
        `## Padrões resolvem problemas recorrentes

Um **padrão de interface** (*UI pattern*) é uma solução já consagrada para um problema comum. Usar padrões:

- Reduz o esforço de aprendizado (Lei de Jakob)
- Economiza tempo de design e desenvolvimento
- Diminui o risco

Seu trabalho é saber **qual padrão usar em cada situação** — e quando ele não serve.`,
        `## Padrões de conteúdo

- **Lista**: itens do mesmo tipo, fáceis de escanear (contatos, mensagens, horários). Boa para comparar e para muitos itens.
- **Card**: um "bloco" com informações de um item, geralmente com imagem e ação. Bom para conteúdo variado e visual (serviços, produtos).
- **Tabela**: comparar muitos atributos de muitos itens (mais comum em desktop).
- **Carrossel**: itens em sequência horizontal. Cuidado: a maioria das pessoas vê só os primeiros.

## Padrões de entrada

- **Formulário**: coletar dados (próxima semana em detalhes).
- **Seletores**: dropdown, botões de opção (*radio*), caixas de seleção (*checkbox*), chips, calendário.
- **Stepper (passo a passo)**: divide uma tarefa longa em etapas com progresso.`,
        match('Ligue o padrão ao uso mais adequado', [
          ['Lista', 'Muitos horários do dia para escanear rapidamente'],
          ['Card', 'Serviços com foto, preço e botão de agendar'],
          ['Stepper', 'Cadastro longo dividido em etapas'],
          ['Tabela', 'Comparar planos com vários atributos no computador'],
        ]),
        `## Padrões de sobreposição

- **Modal (diálogo)**: janela que bloqueia o resto até a pessoa decidir. Use para decisões importantes e **curtas** ("Cancelar o horário?"). Não abuse — interrompe.
- **Bottom sheet**: painel que sobe da parte de baixo da tela. Muito usado no celular para opções e detalhes, ao alcance do polegar.
- **Toast / snackbar**: mensagem curta e temporária ("Horário salvo · Desfazer").
- **Tooltip**: dica que aparece ao passar o mouse ou tocar num ícone de ajuda.

## Padrões de orientação

- **Onboarding**: apresentação inicial. Quanto mais curto, melhor — de preferência ensinando **no contexto**, na hora do uso.
- **Estado vazio** (*empty state*): o que aparece quando não há conteúdo ("Você ainda não tem horários. Agende o primeiro!").
- **Busca e filtros**: para conjuntos grandes de itens.`,
        scenario(
          'Depois que a pessoa salva uma alteração no perfil, o app abre um modal enorme dizendo "Alterações salvas com sucesso!" com um botão "OK".',
          'Qual padrão seria mais adequado?',
          'Um toast/snackbar curto e temporário, que não interrompe',
          ['Um modal ainda maior', 'Uma nova tela de sucesso', 'Nenhum feedback'],
          'Confirmações simples não precisam bloquear a pessoa. Modais devem ser reservados para decisões importantes.',
        ),
        tf(
          'Carrosséis são ótimos para mostrar conteúdo importante, porque as pessoas costumam ver todos os itens.',
          false,
          'A maioria das pessoas vê só o primeiro ou os primeiros itens. Conteúdo crucial não deve depender de carrossel.',
        ),
        mc(
          'Para que serve um "estado vazio" bem projetado?',
          'Orientar a pessoa sobre o que fazer quando ainda não há conteúdo',
          ['Esconder erros do sistema', 'Mostrar propaganda', 'Deixar a tela totalmente em branco'],
          'Um bom estado vazio explica o que vai aparecer ali e convida à primeira ação.',
        ),
        `## Onde buscar referências de padrões

- **Mobbin**: biblioteca enorme de telas reais de apps (tem plano gratuito limitado).
- **Material Design** (Google) e **Human Interface Guidelines** (Apple): os guias oficiais das plataformas.
- **Page Flows**, **UI Patterns** e a Comunidade do Figma.

> 💡 Ao pesquisar referências, salve **por que** um padrão funciona naquele contexto, e não só o print.`,
        multi(
          'Quando um modal é uma boa escolha?',
          ['Confirmar uma ação destrutiva, como cancelar um horário', 'Pedir uma decisão curta e importante antes de continuar'],
          ['Mostrar uma mensagem de sucesso simples', 'Exibir um formulário longo de cadastro', 'Mostrar uma propaganda ao abrir o app'],
          'Modais interrompem. Use quando a interrupção é justificada e a decisão é curta.',
        ),
        fill(
          'O painel que sobe da parte de baixo da tela no celular é chamado de ___ sheet.',
          'bottom',
          ['top', 'side', 'full'],
          'Bottom sheets ficam ao alcance do polegar e mantêm o contexto da tela de trás.',
        ),
      ],
      flashcards: [
        ['Padrão de interface (UI pattern)', 'Solução consagrada para um problema comum de interface.'],
        ['Card', 'Bloco que agrupa as informações e ações de um item.'],
        ['Modal', 'Janela que bloqueia o restante da tela até a pessoa decidir. Para decisões curtas e importantes.'],
        ['Bottom sheet', 'Painel que sobe da parte inferior da tela, comum no celular.'],
        ['Toast / snackbar', 'Mensagem curta e temporária de feedback, que não interrompe.'],
        ['Estado vazio (empty state)', 'O que aparece quando ainda não há conteúdo — deve orientar a próxima ação.'],
      ],
      resources: [
        { title: 'Mobbin — referências de telas reais', url: 'https://mobbin.com/', kind: 'site', lang: 'en' },
        { title: 'Material Design 3 (Google)', url: 'https://m3.material.io/', kind: 'site', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'User flow e wireframes das telas principais',
      summary: 'Desenhe o fluxo principal do seu produto e os wireframes lo-fi de todas as telas dele.',
      minutes: 300,
      tool: 'figma',
      brief: `## Do fluxo às telas

### Parte 1 — User flow (FigJam ou Figma)

Desenhe o **fluxo principal** do seu produto (a tarefa mais importante da persona), incluindo:

- Ponto(s) de entrada
- Caminho feliz
- Pelo menos **2 decisões** (losangos)
- Pelo menos **2 caminhos de erro ou alternativos**
- Legenda da notação

### Parte 2 — Sketches

No papel, faça **3 versões diferentes** da tela mais importante do fluxo.

### Parte 3 — Wireframes no Figma

Escolha a melhor versão e desenhe os wireframes de **todas as telas do caminho feliz** (geralmente 5 a 8), em tons de cinza, com conteúdo realista e anotações.

### Dica de Figma: componentes básicos

Crie um botão em cinza e transforme em **componente** (Ctrl+Alt+K). Use cópias (instâncias) dele em todas as telas. Se mudar o original, todas mudam! Você vai aprofundar isso no mês 4.`,
      steps: [
        'Desenhe o user flow do fluxo principal com entrada, decisões, erros e legenda.',
        'Faça 3 sketches diferentes da tela mais importante no papel e fotografe.',
        'Escolha um sketch e justifique em 2 linhas.',
        'No Figma, crie frames de celular para cada tela do caminho feliz.',
        'Desenhe os wireframes em tons de cinza, com conteúdo realista (sem Lorem ipsum).',
        'Crie pelo menos 1 componente (ex.: botão) e reutilize nas telas.',
        'Adicione anotações explicando comportamentos importantes.',
        'Organize as telas em sequência, da esquerda para a direita, com setas ou numeração.',
      ],
      deliverable: 'Link do Figma/FigJam com o user flow, fotos dos 3 sketches e os wireframes das telas do caminho feliz.',
      rubric: [
        'O user flow tem ponto de entrada, decisões e caminhos de erro',
        'O fluxo tem legenda e notação consistente',
        'Fiz 3 sketches diferentes antes de ir para o Figma',
        'Os wireframes cobrem todas as telas do caminho feliz',
        'Usei conteúdo realista, sem Lorem ipsum',
        'A hierarquia de cada tela está clara',
        'Criei e reutilizei pelo menos 1 componente',
        'Incluí anotações de comportamento',
      ],
      tips: ['Use Shift + A sobre um grupo de elementos para aplicar Auto Layout — vamos ver isso a fundo no mês 4, mas pode testar desde já.'],
    },
  ],
  checkpointExtra: [
    scenario(
      'Uma designer entregou 8 telas lindas e coloridas, mas o time não sabe em que ordem elas aparecem nem o que acontece se o pagamento falhar.',
      'O que estava faltando?',
      'Um fluxo de usuário mostrando a sequência, as decisões e os caminhos de erro',
      ['Mais cores nas telas', 'Um logotipo novo', 'Uma persona extra'],
      'Telas soltas não contam a história. O fluxo conecta tudo e mostra o que acontece em cada situação.',
    ),
    mc(
      'Em que etapa faz mais sentido definir a paleta de cores final?',
      'Depois que estrutura e fluxo foram validados em baixa fidelidade',
      ['Antes da pesquisa com usuários', 'Durante o card sorting', 'Ao fazer os primeiros sketches'],
      'Primeiro estrutura e conteúdo; o visual vem depois (mês 4).',
    ),
    tf(
      'Um modal é a melhor forma de confirmar que uma mensagem foi enviada.',
      false,
      'Para feedback simples, um toast/snackbar é suficiente e não interrompe.',
    ),
  ],
}
