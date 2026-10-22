import { fill, match, mc, multi, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u3: UnitDef = {
  title: 'Componentes e Auto Layout',
  goal: 'Construir interfaces com componentes reutilizáveis, variantes e Auto Layout no Figma.',
  lessons: [
    {
      title: 'Atomic Design: pensar em peças',
      summary: 'Átomos, moléculas, organismos, templates e páginas.',
      minutes: 15,
      steps: [
        `## Interfaces são feitas de peças

Uma tela de app parece única, mas é montada com **peças repetidas**: botões, campos, cards, listas, barras. Profissionais não desenham cada tela do zero: eles montam com **componentes**.

O **Atomic Design**, criado por Brad Frost, organiza essas peças em cinco níveis, inspirado na química:

::atomic`,
        `## Os cinco níveis

1. **Átomos**: os elementos básicos que não se dividem — rótulo, campo de texto, botão, ícone, cor, fonte.
2. **Moléculas**: grupos simples de átomos com uma função — um campo de busca (campo + botão), um item de lista (ícone + texto + seta).
3. **Organismos**: seções mais complexas — o cabeçalho do app, um card de serviço completo, um formulário.
4. **Templates**: a estrutura da página com os organismos posicionados, ainda sem conteúdo real.
5. **Páginas**: o template com conteúdo real — o que a pessoa vê de verdade.`,
        order(
          'Ordene os níveis do Atomic Design, do menor para o maior:',
          ['Átomos', 'Moléculas', 'Organismos', 'Templates', 'Páginas'],
          'Peças pequenas se combinam em peças maiores até formar a página.',
        ),
        match('Ligue o elemento ao nível do Atomic Design', [
          ['Botão', 'Átomo'],
          ['Campo de busca com botão', 'Molécula'],
          ['Cabeçalho com logo, busca e menu', 'Organismo'],
          ['Tela de agendamento com conteúdo real', 'Página'],
        ]),
        `## Por que pensar assim

- **Consistência**: o mesmo botão em todo lugar.
- **Velocidade**: montar telas novas fica muito mais rápido.
- **Manutenção**: mudou o botão? Muda em todas as telas de uma vez.
- **Conversa com devs**: o código também é feito de componentes (React, Flutter, SwiftUI…). Falar a mesma língua reduz erros.

Não precisa seguir a nomenclatura ao pé da letra: o importante é a ideia de **construir de baixo para cima**.`,
        multi(
          'Quais são benefícios de trabalhar com componentes?',
          ['Consistência visual', 'Agilidade para criar telas novas', 'Mudanças aplicadas em todo lugar de uma vez'],
          ['Cada tela fica com um estilo único', 'Elimina a necessidade de testar com usuários'],
          'Componentes trazem consistência e eficiência — mas não substituem testes.',
        ),
        scenario(
          'O time de um app tem 7 versões diferentes de botão espalhadas pelas telas, cada uma criada por uma pessoa.',
          'Como o pensamento do Atomic Design ajudaria?',
          'Definindo um átomo de botão único, com variantes, usado em todas as telas',
          ['Criando uma oitava versão de botão', 'Proibindo o uso de botões', 'Deixando cada designer escolher o seu'],
          'Começar pelos átomos garante que as peças maiores herdem consistência.',
        ),
        tf(
          'No Atomic Design, um template já tem o conteúdo real que a pessoa vai ver.',
          false,
          'O template é a estrutura sem conteúdo real. Com o conteúdo real, ele vira uma página.',
        ),
        fill(
          'O Atomic Design foi criado por Brad ___.',
          'Frost',
          ['Norman', 'Nielsen', 'Krug'],
          'Brad Frost publicou o livro "Atomic Design", disponível gratuitamente online.',
        ),
      ],
      flashcards: [
        ['Atomic Design', 'Metodologia de Brad Frost: átomos → moléculas → organismos → templates → páginas.'],
        ['Átomo', 'Elemento básico e indivisível: botão, campo, rótulo, ícone.'],
        ['Molécula', 'Grupo simples de átomos com uma função, como um campo de busca.'],
        ['Organismo', 'Seção complexa da interface, como um cabeçalho ou um card completo.'],
      ],
      resources: [
        { title: 'Atomic Design — Brad Frost (livro online gratuito)', url: 'https://atomicdesign.bradfrost.com/', kind: 'livro', lang: 'en' },
      ],
    },
    {
      title: 'Componentes e variantes no Figma',
      summary: 'Componente principal, instâncias, sobrescritas, propriedades e variantes.',
      minutes: 20,
      steps: [
        `## Componente principal e instâncias

No Figma:

- **Componente principal** (*main component*): o "molde". Criado com **Ctrl+Alt+K** (Cmd+Option+K no Mac). Ícone de 4 losangos roxos.
- **Instância**: cada cópia do componente usada nas telas. Ícone de 1 losango vazado.

Quando você muda o componente principal, **todas as instâncias** são atualizadas.

Nas instâncias, você pode fazer **sobrescritas** (*overrides*): trocar o texto do botão, a cor de um ícone — sem perder a ligação com o principal.`,
        mc(
          'O que acontece quando você altera o componente principal no Figma?',
          'Todas as instâncias são atualizadas automaticamente',
          ['Nada: cada instância é independente', 'O arquivo é apagado', 'Apenas a última instância muda'],
          'É exatamente esse o poder dos componentes: uma mudança, aplicada em todo lugar.',
        ),
        `## Propriedades de componente

Para não criar dezenas de componentes parecidos, use **propriedades**:

- **Texto**: o rótulo do botão vira um campo editável no painel.
- **Booleana** (sim/não): mostrar ou esconder um ícone.
- **Troca de instância** (*instance swap*): trocar qual ícone aparece.
- **Variante**: escolher entre versões pré-definidas.

## Variantes

**Variantes** agrupam versões de um componente num **conjunto** (*component set*), organizadas por propriedades:

- **Tipo**: Primário, Secundário, Terciário
- **Tamanho**: Pequeno, Médio, Grande
- **Estado**: Padrão, Hover, Pressionado, Desabilitado, Carregando

Assim, um único componente "Botão" cobre 3 × 3 × 5 = 45 combinações, escolhidas por menus no painel direito.`,
        match('Ligue o tipo de propriedade ao exemplo', [
          ['Texto', 'Mudar o rótulo de "Salvar" para "Agendar"'],
          ['Booleana', 'Mostrar ou esconder o ícone do botão'],
          ['Troca de instância', 'Trocar o ícone de coração por estrela'],
          ['Variante', 'Escolher entre Primário e Secundário'],
        ]),
        `## Nomeando componentes

Nomes organizados facilitam encontrar componentes e conversar com devs. Convenções comuns:

- Use **barras** para criar pastas: "Botão/Primário", "Ícone/Calendário", "Card/Serviço".
- Nas variantes, use propriedades claras: **Tipo=Primário, Tamanho=Médio, Estado=Padrão**.
- Combine os nomes com o que os devs usam no código, quando possível.

## Bibliotecas

Componentes podem ser **publicados como biblioteca** (*library*) e usados em vários arquivos e por todo o time. É assim que nascem os design systems (próxima semana). No plano gratuito do Figma, há limitações para bibliotecas compartilhadas — mas componentes locais funcionam normalmente.`,
        scenario(
          'Uma designer criou 12 componentes separados: "Botão roxo", "Botão roxo grande", "Botão roxo desabilitado", "Botão cinza"…',
          'Qual seria uma organização melhor?',
          'Um único conjunto "Botão" com variantes de tipo, tamanho e estado',
          ['Criar mais 12 componentes para os outros estados', 'Desfazer todos os componentes e usar grupos', 'Trocar os nomes por números'],
          'Variantes juntam versões relacionadas num só lugar e facilitam a troca pelo painel.',
        ),
        tf(
          'Fazer sobrescritas (overrides) numa instância, como trocar o texto, quebra a ligação com o componente principal.',
          false,
          'Sobrescritas mantêm a ligação. Só o "Detach instance" (desvincular) quebra — e deve ser evitado.',
        ),
        fill(
          'O atalho para criar um componente no Figma (Windows) é Ctrl + Alt + ___.',
          'K',
          ['C', 'D', 'G'],
          'Ctrl+Alt+K no Windows, Cmd+Option+K no Mac.',
        ),
        multi(
          'Quais propriedades fazem sentido como variantes de um botão?',
          ['Tipo (primário, secundário)', 'Tamanho (pequeno, médio, grande)', 'Estado (padrão, desabilitado, carregando)'],
          ['A data em que foi criado', 'O nome da pessoa que desenhou'],
          'Variantes descrevem diferenças de aparência e comportamento do componente.',
        ),
      ],
      flashcards: [
        ['Componente principal (main component)', 'O "molde" no Figma; mudanças nele se propagam para as instâncias.'],
        ['Instância', 'Cópia de um componente usada nas telas, ligada ao principal.'],
        ['Override (sobrescrita)', 'Alteração feita numa instância (texto, ícone) sem perder a ligação com o principal.'],
        ['Variantes', 'Versões de um componente agrupadas por propriedades (tipo, tamanho, estado).'],
      ],
      resources: [
        { title: 'Guide to components in Figma (ajuda oficial)', url: 'https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Auto Layout: telas que se ajustam sozinhas',
      summary: 'Direção, espaçamento, padding, hug/fill/fixed e Auto Layout aninhado.',
      minutes: 20,
      steps: [
        `## O superpoder do Figma

**Auto Layout** faz um frame **organizar seus filhos automaticamente**: em linha ou coluna, com espaçamento e padding definidos. Se o conteúdo muda, o layout se ajusta sozinho.

Exemplo: um botão com Auto Layout cresce quando você troca "OK" por "Confirmar agendamento" — sem precisar redimensionar nada.

Para aplicar: selecione os elementos e aperte **Shift + A**.

É como o CSS Flexbox que os devs usam — por isso designs com Auto Layout são muito mais fáceis de implementar.`,
        `## As configurações principais

- **Direção**: horizontal (→), vertical (↓) ou *wrap* (quebra linha, tipo uma grade de chips).
- **Espaçamento entre itens** (*gap*): ex.: 8px entre ícone e texto.
- **Padding**: espaço interno entre a borda do frame e o conteúdo (ex.: 12px em cima e embaixo, 16px nas laterais).
- **Alinhamento**: onde os itens se posicionam dentro do frame (esquerda, centro, direita…).

::auto-layout

## Hug, Fill e Fixed

O comportamento de **tamanho** de cada elemento:

- **Hug contents** (abraçar): o tamanho se ajusta ao conteúdo.
- **Fill container** (preencher): ocupa todo o espaço disponível no frame pai.
- **Fixed** (fixo): tamanho definido manualmente.`,
        match('Ligue o modo de redimensionamento à situação', [
          ['Hug', 'Botão que cresce conforme o texto'],
          ['Fill', 'Botão que ocupa toda a largura do card'],
          ['Fixed', 'Ícone com exatamente 24×24px'],
        ]),
        scenario(
          'Uma designer quer que o botão "Agendar" ocupe toda a largura do card, mesmo quando o card fica mais largo no tablet.',
          'Qual configuração ela deve usar no botão?',
          'Largura em "Fill container"',
          ['Largura em "Hug contents"', 'Largura fixa de 300px', 'Remover o Auto Layout'],
          'Fill faz o botão se esticar para ocupar o espaço disponível do frame pai.',
        ),
        `## Auto Layout aninhado

O poder real aparece quando você **coloca Auto Layout dentro de Auto Layout**:

- Um **item de lista** = Auto Layout horizontal (ícone + textos + seta).
- Os **textos** dentro dele = Auto Layout vertical (título + subtítulo).
- A **lista** = Auto Layout vertical de itens.
- A **tela** = Auto Layout vertical de seções.

Assim, se um título ficar com 2 linhas, tudo abaixo se reorganiza sozinho.

**Dicas:**

- Use **espaçamentos da escala de 8**.
- **Min/max width** limitam quanto algo pode crescer ou encolher.
- **Posição absoluta** tira um elemento do fluxo (ex.: um selo de "Novo" no canto do card).`,
        tf(
          'Com Auto Layout, se o texto de um botão aumentar, o botão se ajusta automaticamente (no modo Hug).',
          true,
          'É uma das principais vantagens: o layout reage ao conteúdo.',
        ),
        mc(
          'Qual é o atalho para adicionar Auto Layout aos elementos selecionados?',
          'Shift + A',
          ['Ctrl + L', 'Alt + F', 'Shift + K'],
          'Shift + A aplica Auto Layout (e Shift + Alt + A remove).',
        ),
        multi(
          'Quais elementos são candidatos naturais a Auto Layout?',
          ['Botões com ícone e texto', 'Itens de lista', 'Cards com conteúdo de tamanho variável'],
          ['Uma ilustração livre com formas sobrepostas'],
          'Auto Layout brilha em elementos estruturados que se repetem e variam de conteúdo. Ilustrações livres não precisam.',
        ),
        fill(
          'O espaço interno entre a borda de um frame com Auto Layout e seu conteúdo se chama ___.',
          'padding',
          ['gap', 'margem', 'gutter'],
          'Gap é o espaço entre os itens; padding é o espaço entre a borda e os itens.',
        ),
      ],
      flashcards: [
        ['Auto Layout', 'Recurso do Figma que organiza elementos automaticamente em linha ou coluna, com espaçamento e padding.'],
        ['Hug contents', 'O elemento se ajusta ao tamanho do seu conteúdo.'],
        ['Fill container', 'O elemento ocupa todo o espaço disponível no frame pai.'],
        ['Gap vs. padding', 'Gap = espaço entre itens. Padding = espaço entre a borda e o conteúdo.'],
        ['Auto Layout aninhado', 'Auto Layout dentro de Auto Layout, para layouts que se reorganizam sozinhos.'],
      ],
      resources: [
        { title: 'Guide to auto layout (ajuda oficial do Figma)', url: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Botão com variantes e card com Auto Layout',
      summary: 'Construa seus primeiros componentes profissionais no Figma.',
      minutes: 240,
      tool: 'figma',
      brief: `## Mão na massa: componentes de verdade

Use os estilos de texto e cor da semana passada.

### 1. Botão

- Crie um botão com **Auto Layout** (padding 12/20, gap 8, ícone opcional + texto).
- Transforme em componente e crie **variantes**:
  - **Tipo**: Primário, Secundário, Terciário
  - **Estado**: Padrão, Pressionado, Desabilitado, Carregando
- Adicione uma **propriedade booleana** para mostrar/esconder o ícone e uma **propriedade de texto** para o rótulo.

### 2. Campo de texto

- Rótulo + campo + mensagem de ajuda/erro, com Auto Layout vertical.
- Variantes de estado: Vazio, Foco, Preenchido, Erro.

### 3. Card de serviço (organismo)

- Imagem, título, informações (duração, preço) e botão.
- Auto Layout aninhado: o card deve se ajustar se o título tiver 2 linhas.
- O botão em **Fill** na largura do card.

### 4. Teste de estresse

Coloque 3 instâncias do card lado a lado com textos de tamanhos bem diferentes e veja se tudo se ajusta.`,
      steps: [
        'Crie o botão com Auto Layout e transforme em componente.',
        'Crie as variantes de tipo e estado do botão (no mínimo 3 × 4 = 12 combinações).',
        'Adicione propriedades de texto e booleana (ícone).',
        'Crie o campo de texto com variantes de estado, incluindo erro com mensagem.',
        'Crie o card de serviço com Auto Layout aninhado, usando o componente de botão dentro dele.',
        'Faça o teste de estresse com textos de tamanhos diferentes.',
        'Organize tudo numa página "Componentes" com títulos.',
      ],
      deliverable: 'Link do Figma com a página de componentes: botão (variantes), campo de texto (estados), card e o teste de estresse.',
      rubric: [
        'O botão usa Auto Layout e se ajusta ao texto',
        'O botão tem variantes de tipo e estado organizadas',
        'Usei propriedades de texto e booleana',
        'O campo de texto tem estado de erro com mensagem',
        'O card usa Auto Layout aninhado e o botão em Fill',
        'O teste de estresse funcionou sem quebrar o layout',
        'Os componentes usam meus estilos de texto e cor',
        'Os nomes dos componentes e propriedades estão organizados',
      ],
      tips: [
        'Selecione o conjunto de variantes e use "Combine as variants" para organizá-las automaticamente.',
        'O estado de foco precisa de um contorno visível — você vai agradecer quando estudar acessibilidade.',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Uma designer desvinculou ("detach") todas as instâncias do botão para ajustar detalhes em cada tela. Depois, a marca mudou de cor.',
      'Qual é a consequência?',
      'Ela terá que alterar cada botão manualmente, porque as cópias não estão mais ligadas ao componente',
      ['Nada: o Figma atualiza mesmo assim', 'Os botões somem do arquivo', 'Os devs fazem a mudança sozinhos'],
      'Desvincular quebra a principal vantagem dos componentes. Prefira variantes e propriedades.',
    ),
    mc(
      'Num item de lista com Auto Layout horizontal, como fazer o texto ocupar o espaço entre o ícone (à esquerda) e a seta (à direita)?',
      'Colocar o bloco de texto em "Fill container"',
      ['Colocar tudo em "Fixed"', 'Usar posição absoluta no ícone', 'Remover o Auto Layout'],
      'O texto em Fill estica e empurra a seta para a direita, em qualquer largura.',
    ),
    tf(
      'Um card de serviço é um exemplo de organismo no Atomic Design.',
      true,
      'Ele combina várias moléculas e átomos (imagem, textos, botão) numa seção completa.',
    ),
  ],
}
