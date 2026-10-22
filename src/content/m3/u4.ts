import { ab, fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

const field = (label: string, value: string, opts: { error?: string; placeholderOnly?: boolean } = {}) =>
  opts.placeholderOnly
    ? `<div style="border:1.5px solid #ccc;border-radius:8px;padding:8px;font-size:12px;color:#aaa;margin-bottom:8px">${label}</div>`
    : `<div style="margin-bottom:8px"><div style="font-size:11px;font-weight:800;margin-bottom:3px">${label}</div><div style="border:1.5px solid ${opts.error ? '#f04b5b' : '#ccc'};border-radius:8px;padding:8px;font-size:12px">${value}</div>${opts.error ? `<div style="font-size:10px;color:#b0283a;font-weight:700;margin-top:3px">${opts.error}</div>` : ''}</div>`

export const u4: UnitDef = {
  title: 'Design de interação',
  goal: 'Projetar como a interface responde às pessoas: sinais, feedback, estados, microinterações e formulários.',
  lessons: [
    {
      title: 'Os fundamentos de Don Norman',
      summary: 'Affordance, significantes, feedback, mapeamento, restrições e modelo conceitual.',
      minutes: 15,
      steps: [
        `## Design de interação

**Design de interação** (IxD) cuida do **diálogo** entre a pessoa e o produto: o que ela pode fazer, como sabe que pode, e como o sistema responde.

Don Norman, no livro *O Design do Dia a Dia*, descreveu os princípios fundamentais. Vamos a eles.

## Affordance e significantes

- **Affordance**: as **possibilidades de ação** que existem entre um objeto e uma pessoa. Uma cadeira "permite" sentar; um botão "permite" ser pressionado.
- **Significante**: o **sinal perceptível** que comunica essa possibilidade. A sombra que faz o botão parecer "apertável", o sublinhado no link, as três barrinhas que indicam "arraste aqui".

Em telas, quase tudo depende de **significantes**: um texto azul sublinhado diz "sou clicável"; um botão "chapado" igual a um texto diz… nada.`,
        mc(
          'Num app, o que é um significante?',
          'Um sinal visual que comunica que algo pode ser feito, como a aparência de botão',
          ['O significado da cor da marca', 'O nome técnico de um componente', 'Uma animação de carregamento'],
          'Significantes são as pistas visíveis de que uma ação é possível. Sem eles, as pessoas não percebem o que podem fazer.',
        ),
        ab(
          'Qual elemento deixa mais claro que é clicável?',
          `<div style="font-size:14px;font-weight:700;color:#1f1b2e;padding:10px 0;text-align:center">Ver horários</div>`,
          `<div style="font-size:14px;font-weight:800;color:#fff;background:#7c4dff;border-radius:10px;padding:10px 0;text-align:center;box-shadow:0 3px 0 #5b2fd6">Ver horários</div>`,
          'b',
          'Fundo, formato e sombra funcionam como significantes de "botão". Um texto comum, sem nenhum sinal, parece apenas informação.',
        ),
        `## Feedback

Toda ação deve ter uma **resposta imediata e clara**. Você já viu isso como heurística 1 de Nielsen. Sem feedback, a pessoa repete a ação ou desiste.

## Mapeamento

A relação entre os **controles** e seus **efeitos** deve ser natural. Um controle deslizante de volume que sobe = mais alto. Os botões do fogão dispostos na mesma posição das bocas.

Em telas: a seta "→" avança, o gesto de puxar a lista para baixo atualiza, o controle de tamanho de fonte "A A" do menor para o maior.

## Restrições

Limitar as ações possíveis **evita erros**: desabilitar o botão "Continuar" até que os campos obrigatórios estejam preenchidos, mostrar só os horários livres, impedir datas passadas.`,
        match('Ligue o princípio de Norman ao exemplo', [
          ['Feedback', 'Botão muda para "Salvando…" ao ser tocado'],
          ['Mapeamento', 'Arrastar o controle para a direita aumenta o valor'],
          ['Restrição', 'Datas passadas aparecem desabilitadas no calendário'],
          ['Significante', 'Sublinhado indicando que o texto é um link'],
        ]),
        `## Modelo conceitual e os dois golfos

O **modelo conceitual** é a explicação simplificada de como algo funciona, que o design transmite. Se ele bate com o modelo mental da pessoa, tudo flui.

Norman descreve dois "golfos" (abismos) que a pessoa precisa atravessar:

- **Golfo de execução**: "Como eu faço o que quero?" — reduzido com **significantes, restrições e mapeamento** claros.
- **Golfo de avaliação**: "O que aconteceu? Deu certo?" — reduzido com **feedback** e um bom modelo conceitual.

Bom design de interação deixa os dois golfos **estreitos**.`,
        scenario(
          'Depois de enviar uma foto pelo app, a pessoa não sabe se a foto foi enviada, se ainda está carregando ou se deu erro.',
          'Qual golfo está largo demais?',
          'Golfo de avaliação — falta feedback sobre o resultado da ação',
          ['Golfo de execução', 'Golfo de navegação', 'Nenhum: é normal'],
          'A pessoa conseguiu agir (execução), mas não consegue avaliar o resultado. Indicadores de progresso e confirmação resolvem.',
        ),
        tf(
          'Desabilitar o botão "Continuar" até que os campos obrigatórios sejam preenchidos é um exemplo de restrição.',
          true,
          'Restrições limitam as ações possíveis para prevenir erros — desde que fique claro POR QUE o botão está desabilitado.',
        ),
        fill(
          'O abismo entre "o que eu quero fazer" e "como faço isso" é o golfo de ___.',
          'execução',
          ['avaliação', 'navegação', 'percepção'],
          'Significantes e restrições ajudam a pessoa a descobrir como agir.',
        ),
      ],
      flashcards: [
        ['Affordance', 'Possibilidade de ação entre um objeto e uma pessoa (uma cadeira permite sentar).'],
        ['Significante', 'Sinal perceptível que comunica uma possibilidade de ação (sombra de botão, sublinhado de link).'],
        ['Mapeamento', 'Relação natural entre um controle e seu efeito.'],
        ['Restrição', 'Limitar ações possíveis para evitar erros.'],
        ['Golfo de execução', 'Distância entre o que a pessoa quer fazer e descobrir como fazer.'],
        ['Golfo de avaliação', 'Distância entre agir e entender o que aconteceu.'],
      ],
      resources: [
        { title: 'O Design do Dia a Dia — Don Norman', kind: 'livro', lang: 'pt', note: 'Os capítulos 1 e 2 cobrem esses conceitos.' },
      ],
    },
    {
      title: 'Estados e microinterações',
      summary: 'Projetar todos os estados de componentes e telas, e os pequenos momentos que fazem a diferença.',
      minutes: 15,
      steps: [
        `## Uma tela não tem um estado só

Iniciantes desenham a tela "ideal", cheia de conteúdo bonito. Mas na vida real, cada tela passa por vários **estados**:

- **Vazio**: primeira vez, sem dados ("Nenhum horário ainda").
- **Carregando**: buscando os dados.
- **Parcial**: só um pouco de conteúdo (1 horário, não 10).
- **Ideal**: o conteúdo esperado.
- **Erro**: algo falhou (sem internet, servidor fora do ar).
- **Sucesso**: a ação deu certo.

Projetar só o estado ideal é como planejar uma viagem só para dias de sol.`,
        multi(
          'Quais estados de uma tela de "Meus horários" você deve projetar?',
          ['Vazio (nenhum horário)', 'Carregando', 'Erro ao carregar', 'Com vários horários'],
          ['Apenas o estado com vários horários, pois é o mais comum'],
          'Todos os estados acontecem de verdade. Se não forem projetados, os devs vão improvisar — e geralmente fica ruim.',
        ),
        `## Estados de componentes

Componentes interativos também têm estados:

::button-states

- **Padrão**, **hover** (mouse em cima — só no desktop), **pressionado**, **foco** (navegação por teclado — essencial para acessibilidade!), **desabilitado**, **carregando**.
- Campos de formulário ainda têm: **preenchido**, **com erro**, **validado**.

## Carregamento

- Menos de 1 segundo: geralmente não precisa de indicador.
- Entre 1 e 10 segundos: indicador (spinner) ou **skeleton screen** — o "esqueleto" cinza do conteúdo que vai aparecer, que dá sensação de rapidez.
- Mais de 10 segundos: barra de progresso com estimativa e, se possível, permitir fazer outra coisa.`,
        scenario(
          'Uma lista de serviços demora cerca de 3 segundos para carregar e a tela fica totalmente branca nesse tempo.',
          'Qual melhoria é mais adequada?',
          'Mostrar um skeleton screen com o formato dos cards enquanto carrega',
          ['Mostrar uma barra de progresso com tempo estimado de minutos', 'Não mostrar nada, pois são só 3 segundos', 'Mostrar uma propaganda'],
          'Para esperas curtas, o skeleton screen indica que o conteúdo está chegando e reduz a sensação de espera.',
        ),
        `## Microinterações

**Microinterações** são pequenos momentos com um único objetivo: curtir um post, ligar o modo avião, puxar para atualizar, a animação do "check" ao concluir uma tarefa.

Dan Saffer dividiu toda microinteração em 4 partes:

1. **Gatilho**: o que a inicia (toque da pessoa ou evento do sistema).
2. **Regras**: o que acontece.
3. **Feedback**: como a pessoa percebe o que aconteceu (visual, som, vibração).
4. **Loops e modos**: o que muda com o tempo ou em repetições.

Bem feitas, elas dão **personalidade** e **clareza**. Exageradas, irritam e atrasam.`,
        match('Ligue a parte da microinteração ao exemplo do "curtir"', [
          ['Gatilho', 'A pessoa toca no coração'],
          ['Regras', 'O post é marcado como curtido e o contador soma 1'],
          ['Feedback', 'O coração fica vermelho e pulsa'],
          ['Loops e modos', 'Tocando de novo, a curtida é desfeita'],
        ]),
        tf(
          'O estado de foco de um botão só importa no visual, não afeta a acessibilidade.',
          false,
          'O foco visível é essencial para quem navega pelo teclado ou por tecnologias assistivas. Sem ele, a pessoa não sabe onde está.',
        ),
        mc(
          'Qual é um bom texto para o estado vazio de "Meus horários"?',
          '"Você ainda não tem horários marcados. Que tal agendar o primeiro?" + botão "Agendar"',
          ['"Nenhum dado encontrado."', '"Erro 404."', 'Deixar a tela em branco'],
          'Um bom estado vazio explica a situação e convida à próxima ação.',
        ),
        fill(
          'O "esqueleto" cinza que mostra o formato do conteúdo enquanto ele carrega se chama skeleton ___.',
          'screen',
          ['button', 'error', 'modal'],
          'Skeleton screens fazem a espera parecer menor e preparam o olhar para o conteúdo.',
        ),
      ],
      flashcards: [
        ['Estados de tela', 'Vazio, carregando, parcial, ideal, erro e sucesso — todos precisam ser projetados.'],
        ['Estados de componente', 'Padrão, hover, pressionado, foco, desabilitado, carregando (e erro, em campos).'],
        ['Skeleton screen', 'Esqueleto do conteúdo exibido durante o carregamento.'],
        ['Microinteração', 'Pequeno momento com um único objetivo: gatilho, regras, feedback, loops e modos.'],
      ],
      resources: [
        { title: 'Microinteractions in User Experience (NN/g)', url: 'https://www.nngroup.com/articles/microinteractions/', kind: 'artigo', lang: 'en' },
        { title: 'Skeleton Screens 101 (NN/g)', url: 'https://www.nngroup.com/articles/skeleton-screens/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Formulários que funcionam',
      summary: 'Rótulos, validação, mensagens de erro, teclados certos e menos campos.',
      minutes: 20,
      steps: [
        `## O formulário é onde o negócio acontece

Cadastro, agendamento, pagamento, pedido: quase toda conversão passa por um **formulário**. E formulários ruins são uma das maiores causas de desistência.

A primeira pergunta: **esse campo é mesmo necessário?** Cada campo a mais é atrito. Precisa do CPF para marcar um horário de manicure? Precisa da data de nascimento? (Lembre da LGPD: colete só o necessário.)`,
        `## Rótulos

- Rótulo **acima do campo** é o padrão mais fácil de escanear, principalmente no celular.
- **Nunca use só o placeholder** (o texto cinza dentro do campo) como rótulo: ele **some** quando a pessoa começa a digitar, e ela esquece o que era o campo. Também costuma ter contraste baixo.
- Placeholder pode trazer um **exemplo** ("ex.: (11) 98765-4321").`,
        ab(
          'Qual formulário segue as boas práticas de rótulos?',
          `${field('Nome completo', '', { placeholderOnly: true })}${field('Telefone', '', { placeholderOnly: true })}`,
          `${field('Nome completo', 'Ana Souza')}${field('Telefone (WhatsApp)', '(11) 98765-4321')}`,
          'b',
          'Na opção A, os rótulos são placeholders: somem ao digitar e têm pouco contraste. Rótulos visíveis acima do campo são mais claros e acessíveis.',
        ),
        `## Organização

- **Uma coluna**: o olhar desce numa linha só. Formulários em duas colunas fazem as pessoas pularem campos.
- **Agrupe** campos relacionados (dados pessoais, endereço, pagamento) — Gestalt de novo!
- **Ordem lógica**: siga a ordem em que as pessoas pensam (nome antes do sobrenome, CEP antes do endereço).
- Marque os campos **opcionais** (ou os obrigatórios, de forma consistente). Se quase todos são obrigatórios, marque os opcionais com "(opcional)".
- Formulários longos? Divida em **etapas** com indicador de progresso.`,
        tf(
          'Formulários em uma única coluna costumam ser preenchidos com mais facilidade do que em duas colunas.',
          true,
          'Uma coluna cria um caminho de leitura único e reduz campos esquecidos.',
        ),
        `## Validação e mensagens de erro

- **Valide no momento certo**: depois que a pessoa sai do campo (*on blur*), e não a cada letra digitada (é irritante ver "e-mail inválido" antes de terminar de digitar).
- Mostre o erro **perto do campo**, com cor **e** texto (e um ícone — não dependa só da cor).
- Diga **o que fazer**: "Digite o telefone com DDD, ex.: (11) 98765-4321".
- **Nunca apague** o que a pessoa digitou por causa de um erro.
- Valide **em tempo real** só quando ajuda: força da senha, disponibilidade do nome de usuário.`,
        ab(
          'Qual campo de erro está melhor?',
          `${field('Telefone', '98765-4321', { error: 'Campo inválido' })}`,
          `${field('Telefone', '98765-4321', { error: 'Inclua o DDD. Ex.: (11) 98765-4321' })}`,
          'b',
          'A mensagem B explica o problema e mostra como resolver. "Campo inválido" obriga a pessoa a adivinhar.',
        ),
        `## Detalhes que fazem diferença no celular

- **Teclado certo**: numérico para telefone e CEP, com "@" para e-mail. (Os devs configuram com o tipo de campo — anote no design!)
- **Máscaras**: formatar automaticamente (11) 98765-4321 enquanto a pessoa digita.
- **Preenchimento automático**: permita que o navegador ou o celular complete nome, e-mail e endereço.
- **Botão de ação claro**: "Confirmar agendamento" é melhor que "Enviar".
- **Áreas de toque** generosas.`,
        multi(
          'Quais práticas melhoram um formulário no celular?',
          ['Mostrar o teclado numérico para telefone', 'Permitir preenchimento automático', 'Usar um botão com verbo específico, como "Confirmar agendamento"'],
          ['Validar o e-mail a cada letra digitada', 'Apagar todos os campos quando houver erro', 'Usar apenas placeholders como rótulos'],
          'Teclado certo, autocompletar e botões claros reduzem esforço. As outras práticas geram frustração.',
        ),
        scenario(
          'O formulário de agendamento pede: nome, sobrenome, CPF, RG, data de nascimento, gênero, endereço completo e telefone — só para marcar uma manicure.',
          'Qual seria a melhor recomendação?',
          'Pedir só o necessário (nome e telefone) e, se algo mais for preciso, pedir depois',
          ['Dividir os 8 campos em 4 etapas', 'Deixar todos os campos como opcionais', 'Adicionar um campo de observações'],
          'Menos campos = menos esforço e menos dados pessoais coletados sem necessidade (LGPD).',
        ),
        fill(
          'Validar um campo depois que a pessoa sai dele, e não a cada tecla, é validar no evento ___.',
          'blur',
          ['click', 'scroll', 'load'],
          '"On blur" é quando o campo perde o foco. É o momento mais respeitoso para mostrar erros.',
        ),
        open(
          'Pense no pior formulário que você já preencheu (cadastro em loja, inscrição, serviço público). Liste 3 problemas dele usando o que aprendeu nesta lição.',
          'Formulários são onde boas práticas fazem uma diferença enorme — e mensurável. Muitas empresas aumentam as conversões só cortando campos e melhorando mensagens de erro.',
        ),
      ],
      flashcards: [
        ['Placeholder', 'Texto de exemplo dentro do campo. Não deve substituir o rótulo, pois some ao digitar.'],
        ['Validação on blur', 'Verificar o campo quando a pessoa sai dele, e não a cada tecla.'],
        ['Máscara de campo', 'Formatação automática enquanto se digita, ex.: (11) 98765-4321.'],
        ['Formulário em uma coluna', 'Padrão recomendado: um caminho de leitura único e menos campos esquecidos.'],
      ],
      resources: [
        { title: 'Website Forms Usability: Top 10 Recommendations (NN/g)', url: 'https://www.nngroup.com/articles/web-form-design/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Protótipo lo-fi navegável no Figma',
      summary: 'Conecte seus wireframes, projete os estados e teste com uma pessoa.',
      minutes: 240,
      tool: 'figma',
      brief: `## Dando vida aos wireframes

Um **protótipo** permite que a pessoa **toque e navegue** como se fosse o app. Mesmo em baixa fidelidade, isso já permite testar o fluxo.

### Prototipagem básica no Figma

1. Mude para a aba **Prototype** no painel direito.
2. Selecione um elemento (ex.: botão) e arraste a **bolinha azul** até a tela de destino. Isso cria uma **conexão**.
3. Configure a interação: **On tap** (ao tocar) → **Navigate to** (navegar para) → animação (Instant ou Smart animate).
4. Defina o **ponto de partida** (*flow starting point*) na primeira tela.
5. Aperte **Present** (▶ no topo) para testar.

Use **Overlay** para bottom sheets e modais, e **Back** para os botões de voltar.

### O que entregar

- Os wireframes conectados num protótipo navegável do caminho feliz.
- As telas dos **estados**: pelo menos 1 vazio, 1 carregando e 1 erro.
- Um formulário revisado com as boas práticas da lição.`,
      steps: [
        'Revise os wireframes da semana passada aplicando os princípios de interação (significantes, feedback, restrições).',
        'Revise o formulário do fluxo: rótulos acima, campos mínimos, mensagens de erro úteis, botão com verbo.',
        'Desenhe os estados extras: vazio, carregando (skeleton) e erro.',
        'Conecte as telas na aba Prototype e defina o ponto de partida.',
        'Use pelo menos 1 overlay (bottom sheet ou modal) e 1 ação "Back".',
        'Teste o protótipo você mesma(o) no modo Present, do início ao fim.',
        'Peça para 1 pessoa usar o protótipo com uma tarefa ("marque um horário para sábado") e anote onde ela travou.',
      ],
      deliverable: 'Link do protótipo do Figma (modo apresentação) + anotações do teste com 1 pessoa.',
      rubric: [
        'O caminho feliz está todo conectado e navegável',
        'Defini o ponto de partida do fluxo',
        'Usei pelo menos 1 overlay e 1 ação de voltar',
        'Projetei os estados vazio, carregando e erro',
        'O formulário segue as boas práticas (rótulos, erros, campos mínimos)',
        'Testei com 1 pessoa e registrei os problemas',
      ],
      tips: [
        'No modo Present, aperte R para reiniciar o protótipo.',
        'Para testar no celular, instale o app Figma (iOS/Android) e abra o protótipo por lá.',
      ],
      resources: [
        { title: 'Guide to prototyping in Figma (ajuda oficial)', url: 'https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Num app, o botão "Enviar" fica cinza (desabilitado) e a pessoa não entende por quê. Não há nenhuma indicação de qual campo falta.',
      'O que melhoraria essa experiência?',
      'Indicar claramente quais campos faltam (ou deixar o botão ativo e mostrar os erros ao tocar)',
      ['Esconder o botão até tudo estar preenchido', 'Deixar o botão ainda mais claro', 'Mostrar uma mensagem genérica de "Erro"'],
      'Restrições precisam de explicação. Um botão desabilitado sem motivo aparente gera confusão.',
    ),
    mc(
      'O que deve acontecer com os dados que a pessoa digitou quando o formulário encontra um erro?',
      'Os dados devem ser mantidos, e o erro indicado perto do campo',
      ['O formulário deve ser limpo para começar de novo', 'A página deve recarregar', 'Os campos com erro devem ser apagados'],
      'Apagar o que a pessoa digitou é uma das experiências mais frustrantes possíveis.',
    ),
    tf(
      'Projetar apenas o estado ideal de uma tela é suficiente para entregar ao time de desenvolvimento.',
      false,
      'Estados de vazio, carregamento e erro acontecem de verdade e precisam ser projetados.',
    ),
  ],
}
