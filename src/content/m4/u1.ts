import { ab, fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

const card = (inner: string) => `<div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:12px">${inner}</div>`

export const u1: UnitDef = {
  title: 'Fundamentos visuais',
  goal: 'Usar hierarquia, espaço, alinhamento e grids para criar telas claras e organizadas.',
  lessons: [
    {
      title: 'Hierarquia visual',
      summary: 'Como tamanho, peso, cor, contraste, posição e espaço dizem o que é mais importante.',
      minutes: 15,
      steps: [
        `## Bem-vinda(o) ao mês da interface!

Até aqui você trabalhou estrutura e fluxo em tons de cinza. Agora vamos dar **forma visual** às telas. E o ponto de partida não é "deixar bonito": é **deixar claro**.

## Hierarquia visual

**Hierarquia visual** é a organização dos elementos para que o olhar siga uma **ordem de importância**. Numa boa tela, em 2 segundos a pessoa entende: o que é isto, o que é mais importante e o que posso fazer.

::hierarchy`,
        `## As ferramentas da hierarquia

- **Tamanho**: maior = mais importante.
- **Peso**: negrito chama mais atenção que regular.
- **Cor e contraste**: cores fortes e alto contraste se destacam; cinza recua.
- **Posição**: o topo e a esquerda são vistos primeiro (em culturas que leem da esquerda para a direita).
- **Espaço**: um elemento com espaço ao redor ganha destaque.
- **Agrupamento**: elementos próximos formam blocos que são lidos juntos.

Dica profissional: **não use tudo ao mesmo tempo**. Muitas vezes, só mudar o peso e a cor (de preto para cinza) já cria hierarquia sem aumentar nada.`,
        match('Ligue a ferramenta de hierarquia ao exemplo', [
          ['Tamanho', 'O preço em 24px e a descrição em 14px'],
          ['Peso', 'O nome do serviço em negrito'],
          ['Cor', 'Informação secundária em cinza'],
          ['Espaço', 'Bastante respiro ao redor do botão principal'],
        ]),
        `## O teste de apertar os olhos

Um truque simples: afaste-se da tela (ou aperte os olhos até ficar tudo embaçado). O que ainda se destaca? Deveria ser **o mais importante** — geralmente o título e a ação principal.

Se tudo vira uma "massa" uniforme, falta hierarquia. Se o que se destaca é um banner secundário, a hierarquia está errada.

## Um foco por tela

Cada tela deve ter **uma ação principal** clara. Os botões costumam seguir três níveis:

- **Primário**: a ação principal (preenchido, cor forte). Idealmente um por tela.
- **Secundário**: alternativas (contorno ou fundo suave).
- **Terciário**: ações menores (só texto, tipo link).`,
        ab(
          'Qual tela deixa mais clara a ação principal?',
          card(`<div style="font-weight:900;font-size:15px;margin-bottom:10px">Confirmar horário?</div><div style="font-size:12px;color:#6b6880;margin-bottom:12px">Sáb, 15h · Pé e mão</div><div style="display:flex;gap:6px"><div style="flex:1;background:#7c4dff;color:#fff;border-radius:8px;padding:8px 0;text-align:center;font-size:12px;font-weight:800">Remarcar</div><div style="flex:1;background:#7c4dff;color:#fff;border-radius:8px;padding:8px 0;text-align:center;font-size:12px;font-weight:800">Cancelar</div><div style="flex:1;background:#7c4dff;color:#fff;border-radius:8px;padding:8px 0;text-align:center;font-size:12px;font-weight:800">Confirmar</div></div>`),
          card(`<div style="font-weight:900;font-size:15px;margin-bottom:10px">Confirmar horário?</div><div style="font-size:12px;color:#6b6880;margin-bottom:12px">Sáb, 15h · Pé e mão</div><div style="background:#7c4dff;color:#fff;border-radius:8px;padding:9px 0;text-align:center;font-size:13px;font-weight:800;margin-bottom:6px">Confirmar</div><div style="border:1.5px solid #d3cfe1;border-radius:8px;padding:7px 0;text-align:center;font-size:12px;font-weight:800;color:#4a22c0;margin-bottom:6px">Remarcar</div><div style="text-align:center;font-size:11px;font-weight:700;color:#b0283a">Cancelar horário</div>`),
          'b',
          'Na B, a hierarquia de botões (primário, secundário, terciário) deixa claro o que é esperado. Na A, três botões iguais competem e "Cancelar" está tão fácil quanto "Confirmar".',
        ),
        tf(
          'Se todos os elementos da tela estiverem em destaque, a hierarquia fica mais forte.',
          false,
          'Se tudo é destaque, nada é. Hierarquia depende de contraste entre o importante e o secundário.',
        ),
        scenario(
          'Numa tela de produto, o banner de "frete grátis" é o elemento maior e mais colorido, enquanto o botão "Comprar" é pequeno e cinza.',
          'O que o teste de apertar os olhos revelaria?',
          'Que a atenção vai para o banner, e não para a ação principal',
          ['Que a tela está perfeita', 'Que falta mais texto', 'Que o problema é a fonte'],
          'A hierarquia deve guiar o olhar para o que importa na tarefa — aqui, comprar.',
        ),
        multi(
          'Quais formas criam hierarquia sem precisar aumentar o tamanho do texto?',
          ['Mudar o peso (negrito × regular)', 'Usar cinza para informações secundárias', 'Dar mais espaço ao redor do elemento importante'],
          ['Usar a mesma cor e o mesmo peso em tudo', 'Colocar todos os textos em caixa alta'],
          'Peso, cor e espaço são ferramentas sutis e poderosas. Caixa alta em tudo tira a hierarquia em vez de criá-la.',
        ),
        fill(
          'O botão da ação mais importante da tela é chamado de botão ___.',
          'primário',
          ['terciário', 'fantasma', 'auxiliar'],
          'O botão primário costuma ser preenchido com a cor principal — e, de preferência, há só um por tela.',
        ),
      ],
      flashcards: [
        ['Hierarquia visual', 'Organização dos elementos para guiar o olhar pela ordem de importância.'],
        ['Teste de apertar os olhos', 'Embaçar a visão para ver o que se destaca na tela — deveria ser o mais importante.'],
        ['Botão primário, secundário e terciário', 'Níveis de ênfase: preenchido (ação principal), contorno (alternativa), texto (ação menor).'],
      ],
      resources: [
        { title: 'Refactoring UI — Adam Wathan e Steve Schoger', url: 'https://www.refactoringui.com/', kind: 'livro', lang: 'en', note: 'O melhor guia prático de UI para quem não é designer visual. Vale cada página.' },
      ],
    },
    {
      title: 'Espaço, alinhamento e os princípios CRAP',
      summary: 'Espaço em branco, alinhamento, repetição e contraste aplicados à interface.',
      minutes: 15,
      steps: [
        `## Espaço em branco não é desperdício

**Espaço em branco** (ou **espaço negativo**) é a área vazia entre e ao redor dos elementos. Não precisa ser branco — é só "vazio".

- **Microespaço**: entre letras, linhas, ícone e texto, rótulo e campo.
- **Macroespaço**: entre seções, ao redor de blocos, margens da tela.

Espaço bem usado:

- Agrupa e separa (proximidade da Gestalt)
- Melhora a leitura
- Dá sensação de calma e qualidade
- Destaca o que importa

Telas "apertadas" parecem confusas e baratas, mesmo com conteúdo bom.`,
        tf(
          'Espaço em branco é desperdício de tela e deve ser reduzido ao máximo.',
          false,
          'Espaço organiza, agrupa e dá respiro. Telas apertadas aumentam a carga cognitiva.',
        ),
        `## A regra do espaço interno e externo

Um bom princípio para agrupar: o **espaço dentro** de um grupo deve ser **menor** que o **espaço entre** grupos.

Exemplo num card: 8px entre o título e o subtítulo, 16px de padding interno, 24px entre um card e outro. Assim, o cérebro entende sem esforço o que pertence a quê.

## CRAP: os 4 princípios básicos

A designer Robin Williams (sim, outra pessoa 😄) resumiu o design visual em quatro princípios:

- **C**ontraste: se dois elementos são diferentes, faça-os **bem** diferentes.
- **R**epetição: repita estilos (cores, fontes, espaçamentos) para criar unidade.
- **A**linhamento: nada deve ser colocado ao acaso; tudo se conecta a uma linha invisível.
- **P**roximidade: agrupe o que é relacionado.`,
        match('Ligue o princípio CRAP ao exemplo', [
          ['Contraste', 'Título em 28px negrito e texto em 16px regular'],
          ['Repetição', 'Todos os cards com o mesmo raio e o mesmo padding'],
          ['Alinhamento', 'Ícones e textos da lista começando na mesma linha vertical'],
          ['Proximidade', 'Rótulo colado ao campo, longe do campo seguinte'],
        ]),
        `## Alinhamento

- **Alinhe à esquerda** a maior parte do texto (para quem lê da esquerda para a direita). Texto centralizado é bom para títulos curtos e telas de destaque, mas cansa em parágrafos.
- Crie **poucas linhas de alinhamento**: quanto menos "colunas invisíveis", mais organizada a tela.
- Ícones em listas devem ter o **mesmo tamanho** e o texto deve começar no mesmo ponto.
- No Figma, use as ferramentas de **alinhar** e **distribuir** e observe as **linhas vermelhas** (smart guides).`,
        ab(
          'Qual lista está melhor alinhada?',
          `<div style="font-size:12px">${['💇 Cabelo', '💅  Unhas', '👁 Sobrancelha'].map((t, i) => `<div style="padding:6px 0;padding-left:${[0, 10, 4][i]}px;border-bottom:1px solid #eee">${t}</div>`).join('')}</div>`,
          `<div style="font-size:12px">${['💇', '💅', '👁'].map((e, i) => `<div style="display:flex;gap:10px;padding:6px 0;border-bottom:1px solid #eee"><span style="width:16px;text-align:center">${e}</span><span>${['Cabelo', 'Unhas', 'Sobrancelha'][i]}</span></div>`).join('')}</div>`,
          'b',
          'Na B, ícones e textos começam sempre no mesmo ponto: o olhar desce em linha reta. Na A, cada item tem um recuo diferente.',
        ),
        scenario(
          'Numa tela, cada card tem um arredondamento diferente (4px, 12px, 20px) e espaçamentos variados.',
          'Qual princípio está sendo quebrado?',
          'Repetição (consistência)',
          ['Contraste', 'Proximidade', 'Fechamento'],
          'Repetir os mesmos estilos cria unidade e passa sensação de cuidado. Variações sem motivo parecem erro.',
        ),
        multi(
          'Quais práticas de espaço e alinhamento melhoram uma tela?',
          ['Espaço interno de um grupo menor que o espaço entre grupos', 'Alinhar textos longos à esquerda', 'Usar poucas linhas de alinhamento'],
          ['Centralizar todos os parágrafos', 'Usar espaçamentos diferentes em cada card'],
          'Consistência e alinhamento claro reduzem o esforço de leitura.',
        ),
        fill(
          'Pelo princípio do contraste, se dois elementos são diferentes, eles devem ser ___ diferentes.',
          'bem',
          ['pouco', 'quase', 'levemente'],
          'Diferenças sutis parecem erro. Diferenças claras parecem intenção.',
        ),
      ],
      flashcards: [
        ['Espaço em branco (negativo)', 'Área vazia ao redor e entre elementos; organiza, agrupa e destaca.'],
        ['Regra do espaço interno/externo', 'O espaço dentro de um grupo deve ser menor que o espaço entre grupos.'],
        ['CRAP', 'Contraste, Repetição, Alinhamento e Proximidade — princípios básicos de design visual.'],
      ],
    },
    {
      title: 'Grids, o grid de 8 pontos e layouts responsivos',
      summary: 'Colunas, gutters, margens, escala de espaçamento e breakpoints.',
      minutes: 20,
      steps: [
        `## Para que serve um grid

O **grid** (grade) é uma estrutura invisível de **colunas** que organiza o layout. Ele garante alinhamento, consistência entre telas e facilita a vida dos devs.

Partes de um grid de colunas:

- **Colunas**: as faixas onde o conteúdo se apoia.
- **Gutter (calha)**: o espaço entre as colunas.
- **Margens**: o espaço entre o conteúdo e a borda da tela.

Valores comuns:

| Dispositivo | Colunas | Margem | Gutter |
|---|---|---|---|
| Celular | 4 | 16–24px | 16px |
| Tablet | 8 | 24–32px | 16–24px |
| Desktop | 12 | 32px+ | 24px |`,
        match('Ligue a parte do grid à definição', [
          ['Coluna', 'Faixa vertical onde o conteúdo se apoia'],
          ['Gutter', 'Espaço entre duas colunas'],
          ['Margem', 'Espaço entre o conteúdo e a borda da tela'],
        ]),
        `## O grid de 8 pontos

Além das colunas, use uma **escala de espaçamento** baseada em múltiplos de **8** (com 4 para ajustes finos):

::grid-8pt

Por que 8?

- É divisível facilmente (8, 16, 24, 32…) e se adapta bem às densidades de tela.
- Limita as escolhas: em vez de pensar "13px ou 15px?", você escolhe entre 12 e 16.
- O time inteiro fala a mesma língua: "o padding do card é 16".

Aplique a escala em **paddings, margens, espaços entre elementos e alturas** de componentes (botões de 40 ou 48px, por exemplo).`,
        mc(
          'Qual conjunto de espaçamentos segue o grid de 8 pontos?',
          '8, 16, 24, 32, 48',
          ['7, 13, 22, 31, 45', '5, 10, 15, 25, 35', '9, 18, 27, 36, 45'],
          'Múltiplos de 8 (com 4 para ajustes finos) criam ritmo e consistência.',
        ),
        tf(
          'No grid de 8 pontos, valores como 4 e 12 podem ser usados para ajustes finos.',
          true,
          'É comum usar a meia-unidade (4) e 12 em espaços pequenos, como entre ícone e texto.',
        ),
        `## Design responsivo

**Responsivo** é o layout que se **adapta** a diferentes larguras de tela. Os pontos em que o layout muda são os **breakpoints** (ex.: 600px, 905px, 1240px no Material Design).

Estratégias:

- **Mobile first**: desenhe primeiro para o celular (menos espaço obriga a priorizar) e depois expanda.
- Conteúdo que fica em **1 coluna** no celular pode virar 2 ou 3 colunas no desktop.
- Navegação muda: barra inferior no celular, menu lateral ou no topo no desktop.
- Textos com largura controlada: linhas longas demais cansam.`,
        scenario(
          'Uma designer desenhou o site apenas para desktop. Quando os devs adaptaram para celular, os cards ficaram minúsculos e o menu quebrou.',
          'Qual abordagem teria evitado isso?',
          'Desenhar com mobile first e definir como o layout se comporta em cada breakpoint',
          ['Usar fontes maiores no desktop', 'Proibir o acesso por celular', 'Adicionar mais colunas no grid'],
          'Grande parte do acesso é pelo celular. Pensar no menor espaço primeiro força priorização e evita improvisos.',
        ),
        fill(
          'Os pontos de largura em que o layout muda de organização são chamados de ___.',
          'breakpoints',
          ['gutters', 'paddings', 'frames'],
          'Breakpoints definem quando, por exemplo, uma coluna vira duas.',
        ),
        multi(
          'Quais benefícios um grid traz?',
          ['Alinhamento consistente entre telas', 'Comunicação mais clara com os devs', 'Decisões de espaçamento mais rápidas'],
          ['Elimina a necessidade de pesquisa', 'Escolhe as cores automaticamente'],
          'Grids organizam o layout. Pesquisa e cores são outras decisões.',
        ),
        open(
          'Abra um app que você acha bem organizado e meça (no olho ou com print no Figma) as margens laterais e o espaço entre os cards. Os valores parecem seguir uma escala?',
          'A maioria dos apps bem feitos usa margens de 16 a 24px no celular e espaçamentos múltiplos de 4 ou 8. Medir apps reais é um ótimo treino de olho.',
        ),
      ],
      flashcards: [
        ['Grid de colunas', 'Estrutura invisível de colunas, gutters e margens que organiza o layout.'],
        ['Gutter', 'Espaço entre as colunas do grid.'],
        ['Grid de 8 pontos', 'Escala de espaçamento em múltiplos de 8 (4 para ajustes finos).'],
        ['Breakpoint', 'Largura de tela em que o layout muda de organização.'],
        ['Mobile first', 'Desenhar primeiro para o celular e depois expandir para telas maiores.'],
      ],
      resources: [
        { title: 'Material Design 3 — Layout', url: 'https://m3.material.io/foundations/layout', kind: 'site', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Layout grids e cópia com o grid de 8',
      summary: 'Configure grids no Figma e recrie uma tela bem feita usando só espaçamentos da escala.',
      minutes: 180,
      tool: 'figma',
      brief: `## Treinando o olho para espaço e alinhamento

### Parte 1 — Layout grid

No Figma, selecione um frame de celular e, no painel direito, em **Layout guide/grid**, adicione:

- Um grid de **4 colunas**, margem 16, gutter 16 (tipo *Stretch*).
- Um grid de **linhas de 8px** (opcional, para ajudar no ritmo vertical).

Faça o mesmo para um frame de desktop (1440px) com 12 colunas.

### Parte 2 — Cópia com regras

Escolha uma tela de um app **bem desenhado** (sugestões: um app de banco digital, de streaming ou de delivery) e recrie com uma regra: **todos os espaçamentos devem ser da escala 4, 8, 12, 16, 24, 32, 48**.

### Parte 3 — Antes e depois de hierarquia

Pegue 1 wireframe do seu projeto e crie uma versão com **hierarquia visual** aplicada (ainda em cinza): tamanhos, pesos e espaços. Compare lado a lado.`,
      steps: [
        'Crie um frame de celular com grid de 4 colunas (margem 16, gutter 16).',
        'Crie um frame de desktop (1440px) com grid de 12 colunas.',
        'Recrie uma tela de app bem desenhado usando só espaçamentos da escala de 8.',
        'Anote na lateral os espaçamentos usados (ex.: "padding do card = 16").',
        'Pegue um wireframe do seu projeto e aplique hierarquia visual em tons de cinza.',
        'Faça o teste de apertar os olhos nas duas versões e anote o que se destaca.',
      ],
      deliverable: 'Link do Figma com os frames com grid, a recriação anotada e o antes/depois de hierarquia do seu wireframe.',
      rubric: [
        'Configurei grids de colunas para celular e desktop',
        'Na recriação, todos os espaçamentos são da escala de 8',
        'Anotei os espaçamentos usados',
        'O wireframe revisado tem hierarquia clara',
        'Registrei o resultado do teste de apertar os olhos',
      ],
      tips: ['Ctrl + G (ou Shift + G) liga e desliga a visualização do grid no Figma.'],
    },
  ],
  checkpointExtra: [
    scenario(
      'Num card, o espaço entre o título e o preço é de 24px, e o espaço entre um card e outro é de 8px.',
      'Qual é o problema?',
      'O espaço interno está maior que o externo, então os cards parecem misturados',
      ['O título deveria ser menor', 'Faltam cores', 'Os cards deveriam ser centralizados'],
      'O espaço dentro de um grupo deve ser menor que o espaço entre grupos.',
    ),
    mc(
      'Quantas colunas costuma ter o grid de um layout de celular?',
      '4',
      ['12', '16', '1'],
      'Celulares geralmente usam 4 colunas; tablets, 8; desktops, 12.',
    ),
    tf(
      'Centralizar parágrafos longos facilita a leitura.',
      false,
      'Texto centralizado tem o começo de cada linha num lugar diferente, o que cansa. Para parágrafos, alinhe à esquerda.',
    ),
  ],
}
