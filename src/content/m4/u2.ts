import { ab, contrast, fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u2: UnitDef = {
  title: 'Tipografia e cor',
  goal: 'Escolher e combinar fontes, montar escalas tipográficas e criar paletas de cor acessíveis.',
  lessons: [
    {
      title: 'Tipografia para interfaces',
      summary: 'Tipos de fonte, escala tipográfica, entrelinha, comprimento de linha e combinações.',
      minutes: 20,
      steps: [
        `## 95% do design é tipografia

Uma frase famosa (de Oliver Reichenstein) diz que a web é 95% tipografia. Exagero ou não, **a maior parte de uma interface é texto**: títulos, rótulos, botões, mensagens. Tipografia bem feita resolve metade do visual.

## Famílias de fontes

- **Serifadas** (com "pezinhos"): Georgia, Merriweather. Passam tradição e elegância; ótimas para textos longos e editoriais.
- **Sem serifa**: Inter, Roboto, Nunito, SF Pro. Limpas e muito legíveis em telas — a escolha mais comum em apps.
- **Monoespaçadas**: todas as letras com a mesma largura. Usadas para código e números que precisam alinhar.
- **Display/decorativas**: para títulos de impacto. Nunca para textos longos.`,
        match('Ligue o tipo de fonte ao uso mais comum', [
          ['Sem serifa', 'Interface de apps e sites'],
          ['Serifada', 'Textos longos e editoriais'],
          ['Monoespaçada', 'Código e números alinhados'],
          ['Display', 'Títulos de impacto curtos'],
        ]),
        `## Escolhendo fontes para UI

- **Legibilidade**: letras abertas, boa altura-x (altura das minúsculas), diferenciação entre l, I e 1.
- **Vários pesos** (regular, médio, semibold, bold) para criar hierarquia sem trocar de fonte.
- **Suporte ao português**: acentos e cedilha bem desenhados (ç, ã, é).
- **Licença**: fontes do **Google Fonts** são gratuitas para uso comercial.

**Quantas fontes?** Uma família costuma bastar. No máximo duas (uma para títulos e outra para textos). Mais que isso vira bagunça.`,
        tf(
          'Uma boa prática é usar de 4 a 5 famílias de fontes diferentes numa interface para deixá-la mais rica.',
          false,
          'Uma ou duas famílias são suficientes. A variedade vem dos tamanhos e pesos, não de várias fontes.',
        ),
        `## Escala tipográfica

Em vez de escolher tamanhos aleatórios, use uma **escala**: cada nível é o anterior multiplicado por uma razão (1,2; 1,25; 1,333…).

::type-scale

Na prática, a maioria dos apps usa **5 a 7 tamanhos**: legenda, texto pequeno, corpo, subtítulo, títulos.

**Tamanho do corpo do texto**: 16px é o padrão recomendado para leitura em telas. Menos que 14px só para legendas e informações de apoio.`,
        mc(
          'Qual é o tamanho de fonte recomendado para o corpo do texto em telas?',
          '16px',
          ['10px', '12px', '28px'],
          '16px é o padrão de leitura confortável na maioria das telas. Navegadores usam esse valor como padrão.',
        ),
        `## Entrelinha e comprimento de linha

- **Entrelinha** (*line-height*): o espaço vertical entre as linhas. Para o corpo do texto, use cerca de **1,4 a 1,6×** o tamanho da fonte (16px → 24px de entrelinha). Títulos grandes pedem entrelinha menor (1,1 a 1,3).
- **Comprimento de linha**: entre **45 e 75 caracteres** por linha é o mais confortável para ler. Linhas muito longas fazem o olho se perder ao voltar para o começo.
- **Contraste de peso** em vez de sublinhado ou maiúsculas para destacar. TEXTO TODO EM MAIÚSCULAS é mais difícil de ler (e parece GRITO).`,
        ab(
          'Qual bloco de texto é mais confortável para ler?',
          `<div style="font-size:12px;line-height:1.05;letter-spacing:0">Lembre-se de chegar 10 minutos antes do horário marcado. Se precisar remarcar, faça isso com pelo menos 24 horas de antecedência para liberar o horário para outra cliente.</div>`,
          `<div style="font-size:12px;line-height:1.55">Lembre-se de chegar 10 minutos antes do horário marcado. Se precisar remarcar, faça isso com pelo menos 24 horas de antecedência para liberar o horário para outra cliente.</div>`,
          'b',
          'A entrelinha de cerca de 1,5× dá respiro e facilita a leitura. Linhas muito juntas cansam e confundem.',
        ),
        fill(
          'O comprimento de linha mais confortável para leitura fica entre 45 e ___ caracteres.',
          '75',
          ['20', '150', '300'],
          'Linhas longas demais dificultam encontrar o começo da linha seguinte.',
        ),
        multi(
          'Quais práticas tipográficas melhoram a legibilidade?',
          ['Corpo de texto com 16px', 'Entrelinha de cerca de 1,5×', 'Usar pesos para criar hierarquia'],
          ['Parágrafos inteiros em maiúsculas', 'Usar 5 fontes diferentes', 'Linhas com 150 caracteres'],
          'Tamanho adequado, respiro entre linhas e hierarquia por peso deixam o texto fácil de ler.',
        ),
      ],
      flashcards: [
        ['Fonte sem serifa', 'Fonte sem "pezinhos" nas letras; padrão em interfaces por sua legibilidade em telas.'],
        ['Altura-x', 'Altura das letras minúsculas; quanto maior, mais legível em tamanhos pequenos.'],
        ['Escala tipográfica', 'Conjunto de tamanhos de fonte relacionados por uma razão (ex.: 1,25).'],
        ['Entrelinha (line-height)', 'Espaço vertical entre linhas; cerca de 1,4–1,6× para o corpo do texto.'],
        ['Comprimento de linha', 'Quantidade de caracteres por linha; o ideal é entre 45 e 75.'],
      ],
      resources: [
        { title: 'Google Fonts', url: 'https://fonts.google.com/', kind: 'ferramenta', note: 'Fontes gratuitas. Boas para UI: Inter, Roboto, Nunito, Poppins, Lato.' },
        { title: 'Type Scale — calculadora de escala tipográfica', url: 'https://typescale.com/', kind: 'ferramenta', lang: 'en' },
      ],
    },
    {
      title: 'Cor: teoria e paletas para interface',
      summary: 'HSB, harmonias, significado das cores, a regra 60-30-10 e paletas funcionais.',
      minutes: 20,
      steps: [
        `## Como descrever uma cor

Em design digital, as cores são definidas em código **hexadecimal** (#7C4DFF) ou RGB. Mas para **pensar** e criar variações, o modelo **HSB** (ou HSL) é mais intuitivo:

- **H — Matiz** (*hue*): a "cor" em si, no círculo cromático (0° vermelho, 120° verde, 240° azul).
- **S — Saturação**: de cinza (0%) a cor pura (100%).
- **B — Brilho**: de preto (0%) ao mais claro (100%).

Para criar um tom mais escuro da sua cor principal (para um hover, por exemplo), mantenha o matiz e mexa no brilho e na saturação.`,
        match('Ligue a propriedade da cor à descrição', [
          ['Matiz', 'Qual cor é: vermelho, azul, verde…'],
          ['Saturação', 'O quão intensa ou acinzentada é a cor'],
          ['Brilho', 'O quão clara ou escura é a cor'],
        ]),
        `## Harmonias de cor

O círculo cromático ajuda a combinar cores:

::color-harmony

- **Complementar**: cores opostas — alto contraste, ótimo para destacar uma ação.
- **Análoga**: cores vizinhas — harmoniosa e calma.
- **Tríade**: três cores equidistantes — vibrante, exige equilíbrio.

Na prática de UI, as paletas costumam ser bem mais contidas: **uma cor principal**, muitos **neutros** e as **cores de status**.`,
        `## A regra 60-30-10

Uma forma simples de equilibrar a paleta:

::color-60-30-10

- **60%**: cor dominante — geralmente **neutros** (fundos, superfícies).
- **30%**: cor secundária — áreas de apoio, cabeçalhos, cards.
- **10%**: cor de **destaque** — ações principais e o que precisa de atenção.

Se a cor de destaque estiver em tudo, ela perde a força (lembra do efeito Von Restorff?).`,
        scenario(
          'Num app, o roxo da marca está nos fundos, nos títulos, nos ícones, nos botões e nas bordas. Ninguém encontra o botão principal.',
          'O que a regra 60-30-10 sugere?',
          'Reservar a cor forte para poucos elementos de destaque, como a ação principal',
          ['Usar ainda mais roxo', 'Trocar por vermelho em tudo', 'Remover todas as cores'],
          'A cor de destaque funciona por contraste. Em todo lugar, ela vira ruído.',
        ),
        `## Significado das cores (com cautela)

Cores carregam associações — mas elas variam por **cultura** e **contexto**:

- **Vermelho**: erro, perigo, urgência (mas também paixão, promoções).
- **Verde**: sucesso, confirmação, dinheiro.
- **Amarelo/laranja**: alerta, atenção.
- **Azul**: confiança, calma (muito usado por bancos).

Em interfaces, o mais importante são as **cores semânticas** (de status), que devem ser **consistentes** em todo o produto:

| Papel | Cor comum | Uso |
|---|---|---|
| Sucesso | Verde | "Horário confirmado" |
| Erro | Vermelho | "Pagamento recusado" |
| Alerta | Amarelo/laranja | "Faltam 2 vagas" |
| Informação | Azul | "Dica: você pode remarcar até 24h antes" |`,
        `## Montando uma paleta funcional

1. **Cor principal** da marca (ações primárias, links, destaques).
2. Uma **escala de tons** dela (do 50 bem claro ao 900 bem escuro) para fundos suaves, hover, pressionado.
3. **Neutros**: uma escala de cinzas (muitos designers colocam um toque do matiz principal nos cinzas para harmonizar).
4. **Semânticas**: sucesso, erro, alerta, informação — cada uma com tom forte e tom suave.

Ferramentas: Coolors, Adobe Color, e geradores de escala como o do Material Design.`,
        multi(
          'O que uma paleta funcional de interface costuma ter?',
          ['Uma cor principal com escala de tons', 'Uma escala de neutros', 'Cores semânticas de status'],
          ['Uma cor diferente para cada tela', 'Apenas uma única cor sem variações'],
          'Principal + neutros + semânticas cobre quase tudo que uma interface precisa.',
        ),
        open(
          'Qual cor principal você imagina para o seu projeto? Por que ela combina com o público e com a sensação que o produto deve passar?',
          'Ótimo exercício de justificativa. Lembre que a cor principal vai aparecer em botões e destaques (os 10%), então ela precisa ter bom contraste com branco ou com o texto escuro.',
        ),
        tf(
          'As cores semânticas (sucesso, erro, alerta) devem ter o mesmo significado em todo o produto.',
          true,
          'Se o verde significa sucesso numa tela e "em promoção" em outra, a pessoa se confunde.',
        ),
        fill(
          'No modelo HSB, a letra H representa o ___, ou seja, qual é a cor no círculo cromático.',
          'matiz',
          ['brilho', 'hexadecimal', 'contraste'],
          'H = hue = matiz.',
        ),
      ],
      flashcards: [
        ['HSB / HSL', 'Modelo de cor por matiz (hue), saturação e brilho/luminosidade — intuitivo para criar variações.'],
        ['Cores complementares', 'Cores opostas no círculo cromático; criam alto contraste.'],
        ['Regra 60-30-10', '60% cor dominante (neutros), 30% secundária, 10% destaque.'],
        ['Cores semânticas', 'Cores de status com significado fixo: sucesso, erro, alerta, informação.'],
      ],
      resources: [
        { title: 'Coolors — gerador de paletas', url: 'https://coolors.co/', kind: 'ferramenta' },
        { title: 'Adobe Color', url: 'https://color.adobe.com/', kind: 'ferramenta' },
      ],
    },
    {
      title: 'Contraste e acessibilidade de cor',
      summary: 'As regras do WCAG 2.2 para contraste, não depender só da cor e daltonismo.',
      minutes: 20,
      steps: [
        `## Cor bonita que ninguém consegue ler

Um cinza claro sobre branco pode parecer elegante — e ser ilegível para muita gente: pessoas com baixa visão, idosas, ou qualquer um usando o celular no sol.

O **WCAG** (*Web Content Accessibility Guidelines*), do W3C, é a referência mundial de acessibilidade digital. A versão em vigor é a **2.2** (de 2023), e o nível **AA** é o mais exigido por leis e empresas. (O WCAG 3.0 ainda está em rascunho.)

## As regras de contraste (nível AA)

- **Texto normal**: contraste de pelo menos **4,5:1** com o fundo.
- **Texto grande** (a partir de ~24px, ou ~19px em negrito): pelo menos **3:1**.
- **Componentes de interface e gráficos** (bordas de campos, ícones essenciais): pelo menos **3:1**.

O nível **AAA** pede 7:1 para texto normal.`,
        fill(
          'Pelo WCAG 2.2 nível AA, o texto normal precisa de um contraste mínimo de ___ com o fundo.',
          '4,5:1',
          ['2:1', '1,5:1', '10:1'],
          '4,5:1 para texto normal e 3:1 para texto grande e componentes de interface.',
        ),
        `## Teste você mesma(o)

Mexa nas cores abaixo e veja quando o texto passa ou não:

::contrast-checker

Repare: muitas cores "da moda" (amarelos, verdes claros, cinzas suaves) **não passam** com texto branco.`,
        contrast('#FFFFFF', '#7C4DFF'),
        contrast('#9E9E9E', '#FFFFFF'),
        contrast('#FFFFFF', '#2BB673', { large: true, sample: 'Horário confirmado' }),
        contrast('#1F1B2E', '#FFB020'),
        `## Nunca dependa só da cor

O critério **1.4.1** do WCAG diz: a cor **não pode ser o único meio** de transmitir informação.

Cerca de **8% dos homens** e 0,5% das mulheres têm algum tipo de **daltonismo** — o mais comum dificulta distinguir vermelho e verde.

- ❌ Campo com erro indicado só pela borda vermelha.
- ✅ Borda vermelha **+ ícone + texto** explicando o erro.
- ❌ Gráfico em que as linhas só se diferenciam pela cor.
- ✅ Linhas com rótulos diretos ou padrões diferentes.`,
        ab(
          'Qual indicação de status é acessível para pessoas daltônicas?',
          `<div style="font-size:12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="width:10px;height:10px;border-radius:50%;background:#2bb673"></span>Sáb, 15h</div><div style="display:flex;align-items:center;gap:8px"><span style="width:10px;height:10px;border-radius:50%;background:#f04b5b"></span>Dom, 10h</div></div>`,
          `<div style="font-size:12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="color:#17784a;font-weight:800">✓ Confirmado</span>· Sáb, 15h</div><div style="display:flex;align-items:center;gap:8px"><span style="color:#b0283a;font-weight:800">✕ Cancelado</span>· Dom, 10h</div></div>`,
          'b',
          'Na A, só a cor diferencia os status — e verde e vermelho podem parecer iguais para pessoas daltônicas. Na B, ícone e texto carregam a informação.',
        ),
        tf(
          'Indicar um campo com erro apenas mudando a borda para vermelho atende às boas práticas de acessibilidade.',
          false,
          'A cor não pode ser o único meio. Adicione ícone e texto explicando o erro.',
        ),
        `## Ferramentas

- **WebAIM Contrast Checker** (site) — cole as duas cores e veja o resultado.
- No Figma: plugins como **Stark** ou **Contrast**, e a visualização de simulação de daltonismo de alguns plugins.
- Teste no **celular, ao sol**. É o teste mais honesto que existe.

> 💡 Na prática profissional, definir uma paleta já pensando em contraste (ex.: "texto sempre no tom 700 ou mais escuro") evita retrabalho.`,
        multi(
          'Quais práticas tornam o uso de cor mais acessível?',
          ['Garantir 4,5:1 de contraste para texto normal', 'Usar ícones e texto além da cor para status', 'Testar a paleta com simulação de daltonismo'],
          ['Usar cinza claro em textos importantes por ser elegante', 'Diferenciar opções em gráficos apenas pela cor'],
          'Contraste suficiente e informação redundante (não só cor) beneficiam todo mundo.',
        ),
        mc(
          'Qual é a versão do WCAG usada como referência atual para conformidade?',
          'WCAG 2.2 (nível AA é o mais exigido)',
          ['WCAG 1.0', 'WCAG 3.0, já finalizado', 'Não existe versão vigente'],
          'O WCAG 2.2 é a recomendação vigente. O 3.0 ainda é um rascunho de trabalho.',
        ),
      ],
      flashcards: [
        ['WCAG', 'Diretrizes de acessibilidade para conteúdo web do W3C. Versão vigente: 2.2; nível AA é o mais exigido.'],
        ['Contraste AA — texto normal', 'Mínimo de 4,5:1 entre texto e fundo.'],
        ['Contraste AA — texto grande e componentes', 'Mínimo de 3:1 (texto a partir de ~24px ou ~19px em negrito; bordas e ícones essenciais).'],
        ['Não depender só da cor (1.4.1)', 'A informação deve ser transmitida também por texto, ícone ou forma.'],
        ['Daltonismo', 'Dificuldade de distinguir certas cores; afeta cerca de 8% dos homens.'],
      ],
      resources: [
        { title: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', kind: 'ferramenta', lang: 'en' },
        { title: 'WCAG 2.2 (W3C)', url: 'https://www.w3.org/TR/WCAG22/', kind: 'site', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Estilos de texto e cor no Figma',
      summary: 'Crie a tipografia e a paleta do seu projeto como estilos e variáveis reutilizáveis.',
      minutes: 180,
      tool: 'figma',
      brief: `## A base visual do seu produto

Agora você vai definir a **identidade visual** do seu projeto e transformá-la em estilos reutilizáveis no Figma.

### Tipografia

1. Escolha **1 família** do Google Fonts (ou 2, no máximo).
2. Defina uma **escala** com 6 a 7 níveis (ex.: 12, 14, 16, 20, 24, 32).
3. Crie **estilos de texto** no Figma: selecione um texto → painel direito, em *Text* → ícone de estilos (4 pontinhos) → "+" → nomeie como "Título/H1", "Corpo/Regular" etc. Defina tamanho, peso e entrelinha.

### Cor

1. Escolha a **cor principal** e gere uma escala (50 a 900).
2. Crie uma escala de **neutros**.
3. Defina as **semânticas**: sucesso, erro, alerta, informação.
4. Crie **variáveis de cor** (painel *Local variables*) ou estilos de cor. Organize em grupos: "Primária/500", "Neutro/100", "Erro/600".

### Validação

Verifique o contraste de **todas** as combinações de texto/fundo que você vai usar (ex.: texto branco sobre a cor principal).`,
      steps: [
        'Escolha a(s) fonte(s) e justifique em 2 linhas (legibilidade, pesos, personalidade).',
        'Defina a escala tipográfica e crie de 6 a 8 estilos de texto no Figma.',
        'Escolha a cor principal e gere a escala de tons (use Coolors, o gerador do Material ou ajuste no HSB).',
        'Monte a escala de neutros e as 4 cores semânticas.',
        'Crie as variáveis (ou estilos) de cor no Figma, com nomes organizados.',
        'Monte uma página "Fundamentos" mostrando os estilos de texto e as amostras de cor.',
        'Teste o contraste das principais combinações e anote os resultados (passa/não passa AA).',
        'Aplique os estilos em 2 telas do seu wireframe para ver como ficam.',
      ],
      deliverable: 'Link do Figma com a página de fundamentos (tipografia e cores), testes de contraste e 2 telas com os estilos aplicados.',
      rubric: [
        'Usei no máximo 2 famílias de fonte',
        'A escala tipográfica é consistente e tem entrelinhas adequadas',
        'Criei estilos de texto nomeados de forma organizada',
        'A paleta tem cor principal com escala, neutros e cores semânticas',
        'Criei variáveis ou estilos de cor nomeados',
        'Testei o contraste e corrigi o que não passava no AA',
        'Apliquei os estilos em 2 telas',
      ],
      resources: [
        { title: 'Guide to variables in Figma (ajuda oficial)', url: 'https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  checkpointExtra: [
    contrast('#FFFFFF', '#FF9600'),
    scenario(
      'Um app usa texto cinza #A0A0A0 sobre fundo branco em todas as descrições para parecer "clean".',
      'Qual é o problema?',
      'O contraste fica abaixo de 4,5:1 e dificulta a leitura, especialmente para quem tem baixa visão',
      ['Nenhum: cinza claro é sempre recomendado', 'A fonte deveria ser serifada', 'O fundo deveria ser amarelo'],
      'Elegância não pode custar legibilidade. Um cinza mais escuro (#6B6880, por exemplo) mantém a hierarquia e passa no AA.',
    ),
    mc(
      'Quantas famílias de fonte uma interface costuma precisar?',
      'Uma, ou no máximo duas',
      ['Pelo menos quatro', 'Uma diferente para cada tela', 'Nenhuma: só ícones'],
      'A variação vem de tamanhos e pesos dentro da mesma família.',
    ),
  ],
}
