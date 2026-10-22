import { ab, fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u4: UnitDef = {
  title: 'Psicologia e leis de UX',
  goal: 'Entender como o cérebro percebe interfaces e usar leis de UX e a Gestalt para justificar decisões de design.',
  lessons: [
    {
      title: 'Como o cérebro usa interfaces',
      summary: 'Modelos mentais, carga cognitiva, atenção, memória e padrões de leitura.',
      minutes: 15,
      steps: [
        `## Modelos mentais

Um **modelo mental** é a ideia que a pessoa tem de **como algo funciona** — construída a partir de experiências anteriores.

Exemplo: quase todo mundo espera que, numa loja online, exista um **carrinho** onde os produtos ficam até a compra. Esse modelo veio dos mercados físicos e de outros sites.

Quando o design **combina** com o modelo mental, tudo parece intuitivo. Quando **contraria**, a pessoa se perde. Por isso designers estudam como as pessoas *pensam* que algo funciona — e não só como ele realmente funciona.`,
        scenario(
          'Um app de mercado chamou o carrinho de "Cesta de intenções" e colocou o ícone de uma lâmpada.',
          'Qual o principal problema?',
          'Contraria o modelo mental das pessoas sobre compras online',
          ['O nome é muito curto', 'Lâmpadas são difíceis de desenhar', 'Nenhum: é criativo e diferente'],
          'Criatividade que quebra o modelo mental gera confusão. As pessoas procuram um carrinho (ou sacola) porque é o que conhecem.',
        ),
        `## Carga cognitiva

**Carga cognitiva** é o esforço mental necessário para usar algo. Nosso "processador" tem capacidade limitada:

- **Carga intrínseca**: a dificuldade natural da tarefa (fazer a declaração do imposto de renda é complexo por natureza).
- **Carga estranha (extrínseca)**: o esforço **extra** causado por um design ruim — textos confusos, excesso de opções, layout bagunçado.

O trabalho do designer é **reduzir a carga estranha ao mínimo**, para que a energia da pessoa vá para a tarefa em si.`,
        tf(
          'O designer pode eliminar a carga intrínseca de qualquer tarefa.',
          false,
          'A carga intrínseca é da natureza da tarefa. O que o design controla é a carga estranha — o esforço desnecessário criado pela interface.',
        ),
        `## Atenção e memória

- **Memória de trabalho** (curto prazo) é limitada: guardamos poucos itens por vez. O psicólogo George Miller falou em "7 ± 2"; estudos mais recentes indicam algo em torno de **4 blocos** de informação.
- **Atenção seletiva**: focamos no que importa para o nosso objetivo e ignoramos o resto. Um exemplo famoso é a **cegueira de banner**: as pessoas ignoram áreas que *parecem* anúncios — mesmo quando têm informação útil.
- **Agrupar informações** (*chunking*) ajuda: é mais fácil lembrar 11 9 8765-4321 do que 11987654321.`,
        fill(
          'Quebrar informações em pequenos grupos, como no número de telefone 11 98765-4321, chama-se ___.',
          'chunking',
          ['branding', 'scrolling', 'hacking'],
          'Chunking é agrupar em blocos para reduzir a carga da memória de trabalho.',
        ),
        `## As pessoas não leem, escaneiam

Steve Krug, no livro *Não me faça pensar*, resume: na web, as pessoas **não leem — passam os olhos**. Pesquisas com rastreamento ocular mostram padrões como o **F**:

::f-pattern

O olhar varre o topo, desce pela esquerda e faz varreduras curtas. Em telas mais visuais (landing pages), aparece o padrão em **Z**.

**Consequências para o design:**

- Informação mais importante **no começo** (títulos e primeiras palavras)
- Títulos e subtítulos claros, listas e negrito para facilitar a varredura
- Parágrafos curtos`,
        multi(
          'Sabendo que as pessoas escaneiam, quais práticas ajudam?',
          ['Começar títulos e frases pelas palavras mais importantes', 'Usar listas e subtítulos', 'Escrever parágrafos curtos'],
          ['Escrever blocos longos de texto sem divisões', 'Colocar a informação principal no fim da página'],
          'Texto escaneável coloca o essencial primeiro e é fácil de "passar o olho".',
        ),
        mc(
          'O que é a "cegueira de banner"?',
          'A tendência de ignorar áreas que parecem anúncio, mesmo com informação útil',
          ['A dificuldade de pessoas daltônicas com banners', 'Quando um banner é grande demais para a tela', 'Um bloqueador de anúncios'],
          'Por isso, avisos importantes não devem ter cara de propaganda.',
        ),
        open(
          'Pense no aplicativo do seu banco. Qual parte dele você "nunca enxerga" porque parece propaganda ou é irrelevante para você?',
          'Esse é o efeito da atenção seletiva. Se uma informação importante estiver nessas áreas, ela simplesmente não será vista.',
        ),
      ],
      flashcards: [
        ['Modelo mental', 'A ideia que a pessoa tem de como algo funciona, baseada em experiências anteriores.'],
        ['Carga cognitiva', 'Esforço mental para usar algo. O design deve reduzir a carga estranha (causada pela interface).'],
        ['Chunking', 'Agrupar informação em blocos menores para facilitar a memória (ex.: 11 98765-4321).'],
        ['Cegueira de banner', 'Tendência de ignorar áreas que parecem anúncios.'],
        ['Padrão em F', 'Forma comum de varredura visual em páginas com texto: topo, depois a lateral esquerda.'],
      ],
      resources: [
        { title: 'Não me faça pensar — Steve Krug', kind: 'livro', lang: 'pt', note: 'Curto, divertido e essencial. Ótimo para ler neste mês.' },
      ],
    },
    {
      title: 'Leis de UX que todo designer usa',
      summary: 'Jakob, Hick, Fitts, Miller, Tesler, Doherty, Von Restorff, Pico-Fim e outras.',
      minutes: 20,
      steps: [
        `## Psicologia que vira regra prática

O site **Laws of UX** (de Jon Yablonski) reúne princípios da psicologia que ajudam a **justificar** decisões de design. Saber citá-los numa reunião faz diferença: "o botão está grande por causa da Lei de Fitts" convence mais do que "eu acho mais bonito".

## Lei de Jakob

> As pessoas passam a maior parte do tempo em **outros** sites e apps. Por isso, preferem que o seu funcione do mesmo jeito.

Não reinvente a roda: siga as convenções (carrinho, menu, busca no topo). Inovação é bem-vinda quando resolve um problema real — não só para ser "diferente".`,
        `## Lei de Hick

> O tempo para tomar uma decisão aumenta com o **número e a complexidade** das opções.

::hick

Aplicações: reduza escolhas, destaque a opção recomendada, divida decisões complexas em etapas (um formulário longo vira um passo a passo).

## Lei de Fitts

> O tempo para atingir um alvo depende da **distância** até ele e do seu **tamanho**.

::fitts

Aplicações: botões principais grandes, áreas de toque generosas, ações frequentes ao alcance do polegar, e ações perigosas (como "Excluir") **longe** das comuns.`,
        scenario(
          'O botão "Confirmar agendamento" é um link pequeno no canto da tela, enquanto "Cancelar" é um botão grande no centro.',
          'Qual lei de UX está sendo desrespeitada?',
          'Lei de Fitts',
          ['Lei de Jakob', 'Lei de Tesler', 'Efeito Zeigarnik'],
          'A ação principal deveria ser o alvo maior e mais fácil de atingir. Aqui está invertido — e ainda facilita cancelar sem querer.',
        ),
        ab(
          'Pensando na Lei de Hick, qual tela ajuda a pessoa a decidir mais rápido?',
          `<div style="font-weight:800;font-size:13px;margin-bottom:8px">Qual plano?</div>${['Básico', 'Básico+', 'Plus', 'Plus Anual', 'Pro', 'Pro Anual', 'Família', 'Família+'].map((p) => `<div style="border:1px solid #ddd;border-radius:6px;padding:4px 8px;font-size:11px;margin-bottom:3px">${p}</div>`).join('')}`,
          `<div style="font-weight:800;font-size:13px;margin-bottom:8px">Qual plano?</div><div style="border:1px solid #ddd;border-radius:8px;padding:8px;font-size:12px;margin-bottom:6px">Individual · R$ 19</div><div style="border:2px solid #7c4dff;border-radius:8px;padding:8px;font-size:12px;margin-bottom:6px;background:#efe9ff"><b>Família · R$ 29</b><div style="font-size:10px;color:#4a22c0">⭐ Mais escolhido</div></div><div style="font-size:11px;color:#6b6880;text-align:center">Ver todos os planos</div>`,
          'b',
          'Menos opções e uma recomendação em destaque reduzem o tempo de decisão. As opções extras continuam disponíveis em "Ver todos".',
        ),
        `## Lei de Miller

> A pessoa média guarda poucos itens na memória de trabalho (Miller falava em 7 ± 2).

Cuidado: isso **não** significa "menus devem ter no máximo 7 itens". A lição é: **organize a informação em blocos** e não obrigue as pessoas a memorizar.

## Lei de Tesler (conservação da complexidade)

> Todo sistema tem uma quantidade de complexidade que **não pode ser eliminada** — só transferida.

A pergunta é: quem vai carregar essa complexidade, **o sistema ou a pessoa**? Exemplo: preencher o endereço só com o CEP. O sistema faz o trabalho pesado para a pessoa não ter que fazer.

## Limite de Doherty

> A produtividade dispara quando o sistema responde em **menos de 400 milissegundos**.

Se não dá para ser rápido, **pareça** rápido: animações de carregamento, telas "esqueleto", atualizar a interface antes da confirmação do servidor.`,
        match('Ligue a lei à sua ideia principal', [
          ['Lei de Jakob', 'Siga as convenções que as pessoas já conhecem'],
          ['Lei de Hick', 'Mais opções, mais tempo para decidir'],
          ['Lei de Fitts', 'Alvos grandes e próximos são mais fáceis'],
          ['Lei de Tesler', 'A complexidade não some: só muda de lugar'],
          ['Limite de Doherty', 'Respostas em menos de 400 ms'],
        ]),
        `## Efeitos de memória e atenção

- **Efeito Von Restorff (isolamento)**: entre itens parecidos, o **diferente** é o mais lembrado. Use para destacar a ação principal — com moderação (se tudo é destaque, nada é).
- **Efeito de posição serial**: lembramos melhor do **primeiro** e do **último** item de uma lista. Coloque as opções mais importantes nas pontas (como a barra de navegação do celular).
- **Regra do Pico-Fim**: julgamos uma experiência pelo seu **momento mais intenso** e pelo **final**. Capriche nos picos e no encerramento (a tela de "Pedido confirmado! 🎉").
- **Efeito Zeigarnik**: tarefas incompletas ficam na cabeça. Barras de progresso ("Perfil 70% completo") aproveitam isso.
- **Efeito do gradiente de meta**: quanto mais perto do objetivo, mais motivação. Cartão fidelidade que já vem com 2 carimbos é concluído mais rápido.
- **Efeito estética-usabilidade**: interfaces bonitas são **percebidas** como mais fáceis — e as pessoas toleram mais pequenos problemas nelas.`,
        scenario(
          'Esta trilha mostra a barra "Semana 3: 4 de 6 etapas" e você sente vontade de terminar as que faltam.',
          'Qual efeito está agindo?',
          'Efeito Zeigarnik (e gradiente de meta)',
          ['Lei de Fitts', 'Lei de Jakob', 'Cegueira de banner'],
          'Tarefas incompletas ficam "abertas" na mente, e a proximidade da meta aumenta a motivação. Por isso apps de aprendizagem usam tanto barras de progresso.',
        ),
        mc(
          'Segundo a regra do Pico-Fim, em que momentos vale caprichar mais na experiência?',
          'No momento mais intenso e no final',
          ['Só na tela inicial', 'Em todas as telas igualmente', 'Só nos e-mails de marketing'],
          'As pessoas lembram da experiência pelo pico e pelo final. Uma confirmação de pedido bem feita marca a lembrança de toda a compra.',
        ),
        tf(
          'Pela Lei de Miller, todo menu deve ter no máximo 7 itens.',
          false,
          'É uma leitura errada e comum. A lição é organizar em blocos e não depender da memória — menus podem ter mais itens se forem bem organizados e visíveis.',
        ),
        fill(
          'Destacar o botão principal com uma cor diferente de todo o resto usa o efeito ___.',
          'Von Restorff',
          ['Zeigarnik', 'Doherty', 'Tesler'],
          'O efeito Von Restorff (ou de isolamento) diz que o item diferente é o mais notado e lembrado.',
        ),
      ],
      flashcards: [
        ['Lei de Jakob', 'As pessoas preferem que seu produto funcione como os outros que já conhecem. Siga convenções.'],
        ['Lei de Hick', 'O tempo de decisão aumenta com o número e a complexidade das opções.'],
        ['Lei de Fitts', 'O tempo para atingir um alvo depende da distância e do tamanho dele.'],
        ['Lei de Tesler', 'Conservação da complexidade: ela não some, só muda de lugar — prefira que o sistema a carregue.'],
        ['Limite de Doherty', 'A produtividade aumenta quando o sistema responde em menos de 400 ms.'],
        ['Efeito Von Restorff', 'O item diferente dos demais é o mais notado e lembrado.'],
        ['Regra do Pico-Fim', 'Julgamos uma experiência pelo momento mais intenso e pelo final.'],
        ['Efeito Zeigarnik', 'Tarefas incompletas ficam mais na memória e geram vontade de terminar.'],
        ['Efeito estética-usabilidade', 'Interfaces bonitas são percebidas como mais fáceis de usar.'],
      ],
      resources: [
        { title: 'Laws of UX', url: 'https://lawsofux.com/', kind: 'site', lang: 'en', note: 'Cada lei com ilustração, explicação e referências. Vale explorar todas.' },
      ],
    },
    {
      title: 'Gestalt: como agrupamos o que vemos',
      summary: 'Proximidade, semelhança, região comum, fechamento, continuidade e figura-fundo.',
      minutes: 15,
      steps: [
        `## O todo é diferente da soma das partes

**Gestalt** é uma escola da psicologia alemã do início do século 20 que estudou como **percebemos** formas. A conclusão: o cérebro **organiza automaticamente** o que vê em grupos e padrões.

Para design de interfaces, isso é ouro: com espaço, cor e forma, você consegue **dizer ao cérebro o que está relacionado** sem escrever uma palavra.

::gestalt`,
        `## Proximidade

Elementos **próximos** são vistos como um **grupo**. É o princípio mais poderoso — e o mais usado.

Num formulário, o rótulo "E-mail" deve ficar **mais perto do seu campo** do que do campo de cima. Se o espaçamento for igual, a pessoa não sabe a qual campo o rótulo pertence.

## Semelhança

Elementos **parecidos** (cor, forma, tamanho) são vistos como relacionados. Todos os links azuis e sublinhados "pertencem" à mesma categoria: clicáveis.

## Região comum

Elementos dentro de uma **mesma área delimitada** (um card, uma borda, um fundo) formam um grupo. É por isso que **cards** funcionam tão bem.`,
        ab(
          'Em qual formulário fica mais claro qual rótulo pertence a qual campo?',
          `<div style="font-size:12px;font-weight:700">Nome</div><div style="height:12px"></div><div style="border:1.5px solid #ccc;border-radius:6px;height:26px"></div><div style="height:12px"></div><div style="font-size:12px;font-weight:700">E-mail</div><div style="height:12px"></div><div style="border:1.5px solid #ccc;border-radius:6px;height:26px"></div>`,
          `<div style="font-size:12px;font-weight:700;margin-bottom:4px">Nome</div><div style="border:1.5px solid #ccc;border-radius:6px;height:26px"></div><div style="height:20px"></div><div style="font-size:12px;font-weight:700;margin-bottom:4px">E-mail</div><div style="border:1.5px solid #ccc;border-radius:6px;height:26px"></div>`,
          'b',
          'Em B, cada rótulo está mais perto do seu campo do que do campo anterior (proximidade). Em A, os espaços iguais deixam a relação ambígua.',
        ),
        `## Fechamento

O cérebro **completa** formas incompletas. Um círculo com falhas ainda é visto como círculo. Ícones e logotipos usam muito isso.

## Continuidade

Elementos alinhados numa **linha ou curva** são vistos como relacionados e o olhar segue esse caminho. Um carrossel cortado na borda da tela ("tem mais para lá →") usa continuidade para indicar que dá para deslizar.

## Figura e fundo

Separamos o que está **na frente** (figura) do que está **atrás** (fundo). Um modal com o fundo escurecido usa esse princípio: o foco vai para a janela.

## Simplicidade (Prägnanz)

Interpretamos imagens complexas da forma **mais simples possível**. Por isso, interfaces simples e formas claras são processadas mais rápido.`,
        match('Ligue o princípio ao exemplo', [
          ['Proximidade', 'Rótulo colado ao campo do formulário'],
          ['Semelhança', 'Todos os links com a mesma cor'],
          ['Região comum', 'Informações de um produto dentro de um card'],
          ['Figura-fundo', 'Fundo escurecido atrás de um modal'],
          ['Continuidade', 'Carrossel com o próximo item cortado na borda'],
        ]),
        scenario(
          'Numa tela de configurações, as opções de "Notificações" e de "Privacidade" estão todas na mesma lista, com o mesmo espaçamento entre todas.',
          'Qual mudança, baseada na Gestalt, deixaria a organização mais clara?',
          'Separar os dois grupos com mais espaço e um título para cada (proximidade + região comum)',
          ['Usar uma fonte maior em todas as opções', 'Colocar todas as opções em vermelho', 'Remover os títulos'],
          'Mais espaço entre grupos e menos dentro deles faz o cérebro perceber dois blocos. Títulos e fundos reforçam a separação.',
        ),
        tf(
          'Usar a mesma cor para elementos que têm funções diferentes pode confundir, por causa do princípio da semelhança.',
          true,
          'Se botões clicáveis e textos decorativos têm a mesma cor, o cérebro acha que são da mesma "família" — e a pessoa tenta clicar no que não é clicável.',
        ),
        multi(
          'Quais princípios da Gestalt um card de produto (foto, nome, preço e botão dentro de uma caixa com borda) usa?',
          ['Região comum', 'Proximidade'],
          ['Fechamento', 'Continuidade'],
          'A borda cria uma região comum e os elementos próximos uns dos outros formam um grupo. Fechamento e continuidade não são o mecanismo principal aqui.',
        ),
        open(
          'Abra o app que você mais usa e procure 2 exemplos de princípios da Gestalt. Descreva quais são e onde estão.',
          'Depois que você aprende a Gestalt, passa a enxergá-la em todo lugar — cards, listas, menus, ícones. Esse olhar vai guiar suas próprias telas no mês 4.',
        ),
      ],
      flashcards: [
        ['Gestalt', 'Escola da psicologia que mostra como o cérebro organiza o que vê em grupos e padrões.'],
        ['Proximidade (Gestalt)', 'Elementos próximos são percebidos como um grupo.'],
        ['Semelhança (Gestalt)', 'Elementos parecidos em cor, forma ou tamanho são vistos como relacionados.'],
        ['Região comum (Gestalt)', 'Elementos dentro de uma mesma área delimitada formam um grupo — a base dos cards.'],
        ['Fechamento (Gestalt)', 'O cérebro completa formas incompletas.'],
        ['Figura-fundo (Gestalt)', 'Separamos o que está em primeiro plano (figura) do que está atrás (fundo).'],
      ],
      resources: [
        { title: 'Gestalt Principles (Interaction Design Foundation)', url: 'https://www.interaction-design.org/literature/topics/gestalt-principles', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Figma: recriando telas com alinhamento e proximidade',
      summary: 'Copie (para estudo) duas telas de apps conhecidos, prestando atenção em espaçamentos e agrupamentos.',
      minutes: 150,
      tool: 'figma',
      brief: `## Copiar para aprender

Pintores aprendem copiando grandes mestres. Designers também: **recriar telas de apps bem feitos** treina o olho para espaçamentos, tamanhos e alinhamentos — e você ganha agilidade no Figma.

> ⚠️ Essa cópia é **só para estudo**. Nunca coloque no portfólio como se fosse um projeto seu.

### O desafio

1. Escolha **2 telas simples** de apps que você usa (ex.: tela de configurações do celular, tela de perfil de uma rede social, lista de contatos).
2. Tire print e cole no Figma, ao lado de um frame do mesmo tamanho.
3. Recrie a tela por cima, o mais fiel possível, **sem usar a imagem dentro do frame**.
4. Depois, identifique e anote os princípios da Gestalt e as leis de UX que você reconhece.

### Ferramentas novas desta prática

- **Alinhar e distribuir** (topo do painel direito): deixa espaços iguais entre itens.
- **Medir distâncias**: selecione um elemento, segure **Alt** e passe o mouse sobre outro.
- **Ícones**: use plugins gratuitos como *Iconify* (menu Plugins → buscar "Iconify").`,
      steps: [
        'Tire prints das 2 telas escolhidas e arraste para o canvas do Figma.',
        'Crie um frame com o mesmo tamanho do print (selecione o print e veja as dimensões no painel direito).',
        'Recrie a primeira tela com formas, textos e ícones. Use Alt para medir as distâncias no print e copiar os espaçamentos.',
        'Use **Alinhar** e **Distribuir** para garantir espaços iguais entre itens repetidos.',
        'Faça o mesmo com a segunda tela.',
        'Ao lado de cada tela, adicione **notas** (com o texto do Figma ou o post-it do FigJam) apontando pelo menos 3 princípios de Gestalt ou leis de UX que você identificou.',
        'Compare sua versão com o original lado a lado e anote 2 diferenças que você não tinha percebido no começo.',
      ],
      deliverable: 'Link do Figma com os 2 prints originais, as 2 recriações e as anotações de Gestalt/leis de UX.',
      rubric: [
        'Recriei as 2 telas sem usar o print dentro do frame',
        'Os espaçamentos são consistentes (itens repetidos com distâncias iguais)',
        'Os elementos estão alinhados entre si',
        'Usei ícones de um plugin ou biblioteca',
        'Anotei pelo menos 3 princípios de Gestalt ou leis de UX por tela',
        'Registrei 2 diferenças que percebi ao comparar com o original',
      ],
      tips: [
        'Mantenha a camada do print bloqueada (Ctrl+Shift+L) para não movê-la sem querer.',
        'Diminua a opacidade do print e coloque-o atrás do frame para comparar.',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Um app coloca os botões "Salvar" e "Excluir tudo" lado a lado, do mesmo tamanho e da mesma cor.',
      'Que melhoria é mais recomendada?',
      'Diferenciar visualmente e afastar a ação destrutiva da ação principal',
      ['Deixar os dois botões vermelhos', 'Aumentar os dois botões igualmente', 'Remover o texto dos botões e usar só ícones'],
      'Fitts (afastar ações perigosas), Von Restorff (destacar a principal) e prevenção de erros trabalham juntos aqui.',
    ),
    mc(
      'Preencher automaticamente o endereço a partir do CEP é um exemplo de qual lei?',
      'Lei de Tesler — o sistema absorve a complexidade no lugar da pessoa',
      ['Lei de Hick', 'Efeito Zeigarnik', 'Lei de Jakob'],
      'A complexidade de achar o endereço continua existindo, mas quem a carrega agora é o sistema.',
    ),
    tf(
      'Pelo princípio da proximidade, um rótulo deve ficar mais perto do seu próprio campo do que dos outros.',
      true,
      'É a aplicação mais clássica da proximidade em formulários.',
    ),
  ],
}
