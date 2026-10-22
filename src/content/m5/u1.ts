import { fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u1: UnitDef = {
  title: 'Prototipação avançada',
  goal: 'Escolher a fidelidade certa para cada pergunta e criar protótipos realistas com interações e animações.',
  lessons: [
    {
      title: 'Para que serve cada protótipo',
      summary: 'Fidelidade, protótipos horizontais e verticais, Mágico de Oz e protótipo de papel.',
      minutes: 15,
      steps: [
        `## Um protótipo responde a uma pergunta

Protótipos não são "versões bonitas para mostrar ao chefe". Eles existem para **responder perguntas** com o menor custo possível:

- "As pessoas entendem o fluxo de agendamento?" → wireframe clicável basta.
- "A tela de preços passa confiança?" → precisa de alta fidelidade visual.
- "As pessoas usariam um lembrete por voz?" → talvez um teste "de mentirinha".

::fidelity

Antes de prototipar, escreva: **o que quero aprender com este protótipo?**`,
        mc(
          'Qual é o principal objetivo de um protótipo?',
          'Responder uma pergunta sobre a solução com o menor custo possível',
          ['Impressionar a diretoria com telas bonitas', 'Substituir o produto final', 'Documentar todas as telas para os devs'],
          'A fidelidade certa é a mínima necessária para responder a pergunta.',
        ),
        `## Horizontal × vertical

- **Protótipo horizontal**: mostra **muitas** telas e funcionalidades, mas de forma rasa. Bom para testar navegação e visão geral.
- **Protótipo vertical**: aprofunda **uma** funcionalidade de ponta a ponta, com detalhes e estados. Bom para testar um fluxo crítico.

## Técnicas criativas

- **Protótipo de papel**: telas desenhadas em papel; uma pessoa "faz o papel de computador" trocando as folhas conforme a participante toca. Rapidíssimo para testar ideias iniciais.
- **Mágico de Oz** (*Wizard of Oz*): a pessoa acha que o sistema é automático, mas alguém está operando "por trás da cortina". Ex.: testar um "assistente que agenda sozinho" com uma pessoa respondendo as mensagens manualmente.
- **Protótipo em código**: quando a interação é muito complexa ou precisa de dados reais (geralmente feito com devs — ou, hoje, com ferramentas de IA que geram protótipos funcionais).`,
        match('Ligue a técnica de protótipo à situação', [
          ['Protótipo de papel', 'Testar 3 ideias de navegação em uma tarde'],
          ['Mágico de Oz', 'Testar um "assistente automático" antes de construí-lo'],
          ['Protótipo vertical', 'Aprofundar todo o fluxo de pagamento com estados'],
          ['Protótipo horizontal', 'Testar se as pessoas entendem a navegação geral'],
        ]),
        scenario(
          'Um time quer saber se clientes aceitariam remarcar horários conversando com um "robô" no WhatsApp. Construir o robô levaria 2 meses.',
          'Qual técnica permite testar essa ideia em poucos dias?',
          'Mágico de Oz: uma pessoa responde como se fosse o robô',
          ['Protótipo horizontal no Figma', 'Card sorting', 'Avaliação heurística'],
          'O Mágico de Oz testa o valor da ideia antes de investir na tecnologia.',
        ),
        tf(
          'Quanto maior a fidelidade do protótipo, melhor o teste, em qualquer situação.',
          false,
          'Alta fidelidade custa mais e pode desviar o feedback para o visual. Use a fidelidade mínima que responde à sua pergunta.',
        ),
        `## Que fidelidade usar?

| Pergunta | Protótipo indicado |
|---|---|
| A ideia faz sentido para as pessoas? | Papel, storyboard ou Mágico de Oz |
| A navegação e o fluxo são claros? | Wireframes clicáveis (baixa fidelidade) |
| O conteúdo e a hierarquia funcionam? | Média fidelidade, com textos reais |
| O visual passa confiança? A interação é agradável? | Alta fidelidade com animações |
| Funciona com dados reais e muitos casos? | Protótipo em código |

Uma regra prática: **suba a fidelidade só quando as perguntas mais básicas já tiverem resposta**. Testar cores antes de saber se o fluxo funciona é gastar energia no lugar errado.`,
        mc(
          'Você quer saber se as pessoas confiam na tela de pagamento do app. Qual protótipo é mais adequado?',
          'Alta fidelidade, com o visual final e textos reais',
          ['Esboço em papel', 'Card sorting', 'Wireframe cinza sem textos'],
          'Confiança depende muito do visual, dos textos e dos detalhes — por isso pede alta fidelidade.',
        ),
        fill(
          'Um protótipo que aprofunda uma única funcionalidade de ponta a ponta é chamado de protótipo ___.',
          'vertical',
          ['horizontal', 'diagonal', 'circular'],
          'Vertical = profundo e estreito; horizontal = amplo e raso.',
        ),
      ],
      flashcards: [
        ['Protótipo horizontal', 'Mostra muitas funcionalidades de forma rasa; bom para testar navegação.'],
        ['Protótipo vertical', 'Aprofunda uma funcionalidade de ponta a ponta, com detalhes e estados.'],
        ['Mágico de Oz', 'Teste em que uma pessoa simula manualmente um sistema que parece automático.'],
        ['Protótipo de papel', 'Telas desenhadas em papel trocadas manualmente durante o teste.'],
      ],
      resources: [
        { title: 'UX Prototypes: Low Fidelity vs. High Fidelity (NN/g)', url: 'https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Prototipagem avançada no Figma',
      summary: 'Gatilhos, ações, Smart Animate, rolagem, componentes interativos e variáveis.',
      minutes: 20,
      steps: [
        `## A anatomia de uma interação no Figma

Toda interação de protótipo tem três partes:

1. **Gatilho** (*trigger*): o que inicia — *On tap/click* (tocar), *On drag* (arrastar), *While hovering* (passar o mouse), *While pressing* (segurar), *After delay* (depois de um tempo), *Key/Gamepad* (tecla).
2. **Ação**: o que acontece — *Navigate to* (ir para tela), *Open overlay* (abrir sobreposição), *Swap overlay*, *Back* (voltar), *Scroll to* (rolar até), *Change to* (trocar variante), *Set variable* (mudar variável), *Open link*.
3. **Animação**: como acontece — *Instant*, *Dissolve*, *Smart Animate*, *Move in/out*, *Push*, *Slide in/out*, com duração e curva (*easing*).`,
        match('Ligue o gatilho do Figma à situação', [
          ['On tap', 'A pessoa toca no botão "Agendar"'],
          ['After delay', 'A tela de sucesso volta para o início após 2 segundos'],
          ['While hovering', 'O card muda de cor com o mouse em cima (desktop)'],
          ['On drag', 'A pessoa arrasta um carrossel de fotos'],
        ]),
        `## Smart Animate

O **Smart Animate** anima automaticamente as diferenças entre duas telas: posição, tamanho, cor, opacidade, rotação.

O segredo: as camadas que devem "se transformar" precisam ter o **mesmo nome** nas duas telas (e estar na mesma hierarquia). Se os nomes forem diferentes, o Figma não reconhece que são o mesmo elemento.

Exemplos: um card que se expande para virar a tela de detalhes; um botão "+" que gira e vira "×".

## Rolagem

- Frames maiores que a tela do aparelho podem **rolar** (*Overflow: vertical scrolling*).
- Elementos como o cabeçalho e a barra inferior podem ficar **fixos** (*Position: fixed / sticky*).
- Use **Scroll to** para levar a pessoa até uma seção da mesma tela.`,
        mc(
          'Por que o Smart Animate às vezes não anima um elemento entre duas telas?',
          'Porque a camada tem nomes diferentes (ou hierarquia diferente) nas duas telas',
          ['Porque o arquivo é gratuito', 'Porque o elemento tem cor', 'Porque a tela tem rolagem'],
          'O Smart Animate liga elementos pelo nome da camada. Nomes iguais = mesmo elemento.',
        ),
        `## Componentes interativos

Você pode colocar interações **dentro das variantes** de um componente. Ex.: no componente "Checkbox", ao tocar, a variante "desmarcado" muda para "marcado". Assim, **todas as instâncias** já funcionam sozinhas no protótipo — sem precisar duplicar telas.

Bons candidatos: checkbox, switch (liga/desliga), abas, botões com estado pressionado, acordeões, favoritos.

## Variáveis e condicionais

Com **variáveis** no protótipo, dá para guardar valores (ex.: quantidade no carrinho, serviço escolhido) e usar **condicionais** ("se o horário estiver ocupado, mostre o aviso"). Isso cria protótipos muito realistas com poucas telas — ótimo para testes, mas comece pelo simples.`,
        tf(
          'Com componentes interativos, um switch pode alternar entre ligado e desligado em todas as instâncias sem duplicar telas.',
          true,
          'As interações ficam nas variantes do componente principal, e todas as instâncias herdam o comportamento.',
        ),
        multi(
          'Quais elementos são bons candidatos a componentes interativos?',
          ['Checkbox', 'Switch (liga/desliga)', 'Abas'],
          ['Uma fotografia de fundo', 'Um parágrafo de texto fixo'],
          'Componentes com estados que mudam ao toque se beneficiam de interações internas.',
        ),
        scenario(
          'No teste, a participante tocou no ícone de coração para favoritar um serviço e nada aconteceu, porque a designer não prototipou essa interação.',
          'Qual seria a forma mais eficiente de resolver isso no Figma?',
          'Transformar o coração num componente interativo com variantes "vazio" e "preenchido"',
          ['Duplicar a tela inteira só para mostrar o coração preenchido', 'Remover o coração do design', 'Explicar verbalmente durante o teste'],
          'Componentes interativos resolvem microinterações sem multiplicar telas.',
        ),
        fill(
          'Para testar o protótipo no celular, você pode usar o app do Figma e abrir o protótipo no modo de ___.',
          'apresentação',
          ['edição', 'exportação', 'impressão'],
          'Testar no aparelho real revela problemas de tamanho, alcance do polegar e legibilidade.',
        ),
      ],
      flashcards: [
        ['Gatilho, ação e animação', 'As três partes de uma interação de protótipo no Figma.'],
        ['Smart Animate', 'Animação automática entre telas, ligando camadas pelo mesmo nome.'],
        ['Overlay', 'Sobreposição (modal, bottom sheet, menu) aberta por cima da tela atual.'],
        ['Componente interativo', 'Componente com interações entre suas variantes, que funcionam em todas as instâncias.'],
      ],
      resources: [
        { title: 'Create advanced animations with smart animate (ajuda oficial do Figma)', url: 'https://help.figma.com/hc/en-us/articles/360039818874-Create-advanced-animations-with-smart-animate', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Movimento em interfaces',
      summary: 'Para que serve a animação, duração, curvas de aceleração e movimento reduzido.',
      minutes: 15,
      steps: [
        `## Animação com propósito

Animação em interface não é enfeite: ela **comunica**. Usos legítimos:

- **Feedback**: o botão "afunda" ao ser tocado, o check aparece ao concluir.
- **Orientação**: de onde a tela veio e para onde foi (a tela de detalhe "sai" do card tocado).
- **Continuidade**: elementos que se transformam ajudam a entender a mudança.
- **Atenção**: um leve movimento chama o olhar para algo novo — com moderação.
- **Personalidade**: o "charme" da marca (como as comemorações deste app 🎉).

Se uma animação não cumpre nenhum desses papéis, provavelmente está atrapalhando.`,
        multi(
          'Quais são usos legítimos de animação em interfaces?',
          ['Dar feedback de uma ação', 'Mostrar de onde uma tela veio', 'Chamar atenção para uma mudança importante'],
          ['Fazer a pessoa esperar mais para parecer sofisticado', 'Animar todos os elementos ao mesmo tempo'],
          'Animação boa comunica. Animação gratuita atrasa e distrai.',
        ),
        `## Duração e curvas

- **Duração**: microinterações entre **100 e 300ms**; transições de tela entre **200 e 500ms**. Mais que isso parece lento.
- **Curvas de aceleração** (*easing*): objetos reais não se movem em velocidade constante.
  - **Ease-out** (começa rápido, termina devagar): para elementos que **entram**.
  - **Ease-in** (começa devagar, termina rápido): para elementos que **saem**.
  - **Ease-in-out**: para elementos que se movem de um ponto a outro na tela.
  - **Linear**: raramente — parece mecânico (exceto em barras de progresso e rotação contínua).`,
        match('Ligue a curva de animação ao uso', [
          ['Ease-out', 'Um modal entrando na tela'],
          ['Ease-in', 'Um toast saindo da tela'],
          ['Ease-in-out', 'Um elemento mudando de posição na tela'],
          ['Linear', 'Um spinner girando sem parar'],
        ]),
        mc(
          'Qual é a faixa de duração típica para microinterações?',
          '100 a 300ms',
          ['1 a 3 segundos', '5 a 10 segundos', 'Menos de 10ms'],
          'Rápido o suficiente para não atrasar, lento o suficiente para ser percebido.',
        ),
        `## Movimento reduzido: acessibilidade

Para algumas pessoas — por exemplo, com **distúrbios vestibulares** — animações de zoom, parallax e movimentos grandes causam **tontura e náusea**.

- Celulares e computadores têm a opção **"Reduzir movimento"**. Projete uma versão alternativa (fade simples no lugar do zoom).
- O WCAG pede que animações disparadas por interação possam ser **desativadas** (critério 2.3.3, nível AAA) e proíbe conteúdo que **pisca** mais de 3 vezes por segundo (2.3.1, nível A) por risco de crises.
- Evite reprodução automática de movimento longo sem botão de pausa.

## Ferramentas

No Figma, Smart Animate e as animações de protótipo cobrem a maioria dos casos. Em 2026 o Figma também lançou uma **linha do tempo com keyframes** para animações mais elaboradas. Para animações complexas e ilustradas, existem ferramentas como Rive e Lottie (que os devs conseguem usar direto no app).`,
        tf(
          'Conteúdo que pisca mais de 3 vezes por segundo pode causar crises em pessoas com epilepsia fotossensível e deve ser evitado.',
          true,
          'É um critério de nível A do WCAG (2.3.1): o mínimo de acessibilidade.',
        ),
        scenario(
          'Um app usa uma animação de zoom com rotação de 1,5 segundo toda vez que a pessoa troca de aba.',
          'Quais são os problemas?',
          'É longa demais, atrasa a navegação e pode causar desconforto em pessoas sensíveis a movimento',
          ['Nenhum: animações longas são mais elegantes', 'Só falta uma música de fundo', 'Deveria ser ainda mais rápida, com 10ms'],
          'Transições devem ser curtas e respeitar a preferência de movimento reduzido.',
        ),
        fill(
          'Para elementos que entram na tela, a curva de aceleração mais indicada é a ___.',
          'ease-out',
          ['ease-in', 'linear', 'bounce'],
          'Começar rápido e desacelerar no fim dá sensação de responsividade e naturalidade.',
        ),
        open(
          'Repare nas animações do app que você mais usa. Escolha uma e descreva: qual o propósito dela (feedback, orientação, continuidade, atenção, personalidade)? Ela ajuda ou atrapalha?',
          'Treinar o olhar para o "porquê" das animações vai te ajudar a usar movimento com intenção — e a defender suas escolhas com os devs.',
        ),
      ],
      flashcards: [
        ['Easing (curva de aceleração)', 'Como a velocidade varia durante a animação: ease-out (entrar), ease-in (sair), ease-in-out (mover).'],
        ['Duração de microinteração', 'Geralmente entre 100 e 300ms; transições de tela até ~500ms.'],
        ['Reduzir movimento', 'Preferência do sistema para minimizar animações; deve ser respeitada pelo design.'],
        ['WCAG 2.3.1', 'Nada pode piscar mais de 3 vezes por segundo (risco de crises).'],
      ],
      resources: [
        { title: 'The Role of Animation and Motion in UX (NN/g)', url: 'https://www.nngroup.com/articles/animation-purpose-ux/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Protótipo de alta fidelidade com interações',
      summary: 'Leve o protótipo do seu projeto ao nível realista: componentes interativos, overlays, rolagem e animações.',
      minutes: 240,
      tool: 'figma',
      brief: `## Um protótipo que parece o app de verdade

Você vai preparar o protótipo que será usado no **teste de usabilidade** da próxima semana.

### Requisitos

- **Fluxo principal completo** em alta fidelidade.
- **Pelo menos 1 fluxo alternativo** (ex.: remarcar ou cancelar).
- **Pelo menos 1 caminho de erro** (ex.: horário ficou indisponível).
- **2 componentes interativos** (ex.: favoritar, switch de lembrete, abas).
- **Overlays** para bottom sheets ou modais.
- **Rolagem** com cabeçalho ou barra inferior fixos.
- **Smart Animate** em pelo menos 1 transição significativa.
- Durações e curvas coerentes (ex.: 250ms ease-out).

### Antes de entregar

Teste o protótipo **no celular** (app Figma) do início ao fim e corrija conexões quebradas.`,
      steps: [
        'Defina a pergunta que o teste da próxima semana vai responder.',
        'Revise as conexões do fluxo principal e adicione o fluxo alternativo e o caminho de erro.',
        'Crie 2 componentes interativos e use-os nas telas.',
        'Configure rolagem e elementos fixos nas telas longas.',
        'Adicione Smart Animate em uma transição (ex.: card → detalhe).',
        'Padronize a duração e a curva das animações.',
        'Teste no celular e corrija o que estiver quebrado.',
      ],
      deliverable: 'Link do protótipo de alta fidelidade + nota com a pergunta que o teste vai responder.',
      rubric: [
        'O fluxo principal está completo e sem conexões quebradas',
        'Há pelo menos 1 fluxo alternativo e 1 caminho de erro',
        'Usei 2 componentes interativos',
        'Usei overlays e rolagem com elementos fixos',
        'Usei Smart Animate com propósito',
        'As animações têm duração e curva coerentes',
        'Testei no celular',
      ],
    },
  ],
  checkpointExtra: [
    mc(
      'Você quer testar se a nova estrutura de navegação faz sentido para as pessoas, antes de definir o visual. Qual protótipo é mais adequado?',
      'Wireframes clicáveis em baixa fidelidade (protótipo horizontal)',
      ['Protótipo em código com dados reais', 'Telas finais com animações detalhadas', 'Nenhum: basta perguntar'],
      'Para testar estrutura e navegação, baixa fidelidade é suficiente e mais rápida.',
    ),
    tf(
      'Animações longas (acima de 1 segundo) em transições de tela costumam deixar a experiência mais ágil.',
      false,
      'Transições longas fazem o app parecer lento. Fique abaixo de ~500ms.',
    ),
    scenario(
      'O Smart Animate entre a lista e a tela de detalhe não funciona: a imagem simplesmente "pula" em vez de crescer.',
      'Qual é a causa mais provável?',
      'A camada da imagem tem nomes diferentes nas duas telas',
      ['A imagem é colorida', 'O protótipo não tem ponto de partida', 'O arquivo tem muitas páginas'],
      'Renomeie as camadas para o mesmo nome e mantenha a hierarquia parecida.',
    ),
  ],
}
