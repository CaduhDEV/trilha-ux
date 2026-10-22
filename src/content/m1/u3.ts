import { ab, fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

const btn = (bg: string, fg: string, label: string, extra = '') =>
  `<div style="background:${bg};color:${fg};border-radius:10px;padding:10px 0;text-align:center;font-weight:800;font-size:14px;${extra}">${label}</div>`

export const u3: UnitDef = {
  title: 'Usabilidade e heurísticas',
  goal: 'Saber o que torna uma interface fácil de usar e avaliar produtos com as 10 heurísticas de Nielsen.',
  lessons: [
    {
      title: 'Usabilidade: o que torna algo fácil de usar',
      summary: 'Os 5 componentes de Nielsen, a definição da ISO e a diferença entre útil e usável.',
      minutes: 15,
      steps: [
        `## O que é usabilidade?

**Usabilidade** é o quanto algo é **fácil e agradável de usar** para atingir um objetivo.

A norma **ISO 9241-11** define usabilidade como a medida em que um produto pode ser usado por pessoas específicas para atingir objetivos específicos com:

- **Eficácia** — a pessoa consegue fazer o que queria? (completou a tarefa?)
- **Eficiência** — com quanto esforço? (tempo, cliques, erros)
- **Satisfação** — como ela se sentiu?

…num **contexto de uso** específico. Repare: "fácil" depende de **quem** usa e **onde**. Um app de banco usado por uma pessoa idosa, no ônibus, com sol na tela, tem desafios diferentes.`,
        match('Ligue cada critério da ISO à pergunta que ele responde', [
          ['Eficácia', 'A pessoa conseguiu completar a tarefa?'],
          ['Eficiência', 'Quanto esforço e tempo foram necessários?'],
          ['Satisfação', 'Como a pessoa se sentiu usando?'],
        ]),
        `## Os 5 componentes de Jakob Nielsen

**Jakob Nielsen**, um dos maiores nomes da usabilidade (cofundador do Nielsen Norman Group, junto com Don Norman), divide usabilidade em 5 qualidades:

1. **Facilidade de aprendizado** — dá para usar bem na primeira vez?
2. **Eficiência** — depois de aprender, dá para fazer rápido?
3. **Facilidade de memorização** — voltando depois de um mês, a pessoa lembra como usar?
4. **Erros** — quantos erros acontecem, quão graves são e dá para se recuperar?
5. **Satisfação** — é agradável?`,
        scenario(
          'Dona Lúcia aprendeu a pedir remédio no app da farmácia com a ajuda da neta. Um mês depois, sozinha, não lembrava mais onde ficava o botão de pedido.',
          'Qual componente da usabilidade falhou?',
          'Facilidade de memorização',
          ['Satisfação', 'Eficiência', 'Facilidade de aprendizado'],
          'Ela conseguiu aprender (com ajuda), mas não conseguiu lembrar depois de um tempo sem usar: é a memorização.',
        ),
        `## Útil ≠ usável

Um produto pode ser:

- **Usável, mas inútil**: um app lindo e fácil… que resolve um problema que ninguém tem.
- **Útil, mas inusável**: o site do governo que tem exatamente o serviço que você precisa… mas ninguém consegue achar.

O que buscamos é **utilidade + usabilidade**. O NN/g resume assim: *útil = usável + tem a funcionalidade de que a pessoa precisa.*`,
        tf(
          'Se um produto é fácil de usar, ele automaticamente é útil.',
          false,
          'Usabilidade é só metade. Se o produto não resolve uma necessidade real, ele pode ser fácil e mesmo assim inútil.',
        ),
        `## Como medir usabilidade

Usabilidade não é opinião: dá para **medir**. Algumas métricas que você vai usar no módulo 5:

- **Taxa de sucesso**: % de pessoas que completaram a tarefa.
- **Tempo na tarefa**: quanto tempo levaram.
- **Taxa de erros**: quantos erros cometeram.
- **Questionários de satisfação**: como o SUS (*System Usability Scale*).

E a forma mais poderosa de avaliar: **observar pessoas reais usando** o produto — o famoso **teste de usabilidade**.`,
        multi(
          'Quais destas são métricas de usabilidade?',
          ['Taxa de sucesso na tarefa', 'Tempo para completar a tarefa', 'Número de erros'],
          ['Quantidade de cores na tela', 'Número de telas do app'],
          'Usabilidade se mede pelo desempenho e pela satisfação das pessoas, não por características da tela.',
        ),
        fill(
          'Observar pessoas reais tentando realizar tarefas num produto é um teste de ___.',
          'usabilidade',
          ['velocidade', 'mercado', 'segurança'],
          'O teste de usabilidade é a técnica mais importante para avaliar se algo é fácil de usar. Você vai fazer vários neste curso.',
        ),
        open(
          'Pense num aparelho ou app que a sua mãe, avó ou alguém mais velho tem dificuldade de usar. Qual dos 5 componentes de Nielsen mais falha nele?',
          'Pessoas com menos familiaridade com tecnologia revelam problemas que usuários experientes nem percebem. Por isso, em testes, é ótimo incluir perfis diversos.',
        ),
      ],
      flashcards: [
        ['Usabilidade', 'Quanto algo é fácil e agradável de usar para atingir um objetivo, num contexto de uso.'],
        ['ISO 9241-11', 'Norma que define usabilidade por eficácia, eficiência e satisfação em um contexto de uso.'],
        ['Jakob Nielsen', 'Especialista em usabilidade, cofundador do NN/g e autor das 10 heurísticas.'],
        ['Útil vs. usável', 'Útil = resolve uma necessidade real. Usável = fácil de usar. Um bom produto precisa das duas coisas.'],
      ],
      resources: [
        { title: 'Usability 101 (NN/g)', url: 'https://www.nngroup.com/articles/usability-101-introduction-to-usability/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'As 10 heurísticas de Nielsen (parte 1)',
      summary: 'Status do sistema, mundo real, controle, consistência e prevenção de erros.',
      minutes: 20,
      steps: [
        `## Regras de bolso da usabilidade

Em 1994, Jakob Nielsen publicou **10 princípios gerais** para design de interfaces. Ele chamou de **heurísticas** — regras práticas, não leis rígidas. Mais de 30 anos depois, continuam sendo usadas no mundo inteiro.

Nesta lição você aprende as 5 primeiras. Para cada uma, pense num exemplo do seu celular.`,
        `## 1. Visibilidade do status do sistema

O sistema deve **manter a pessoa informada** sobre o que está acontecendo, com feedback rápido.

- Barra de progresso no download
- "Digitando…" no WhatsApp
- ✓✓ azul de mensagem lida
- O botão "Pagar" que vira "Processando…" depois do clique

Sem feedback, a pessoa não sabe se o clique funcionou — e clica de novo (pagando duas vezes!).`,
        ab(
          'Depois de tocar em "Pagar", qual tela respeita melhor a visibilidade do status do sistema?',
          `<div style="font-size:13px;color:#6b6880;margin-bottom:8px">Total: R$ 89,00</div>${btn('#7c4dff', '#fff', 'Pagar')}`,
          `<div style="font-size:13px;color:#6b6880;margin-bottom:8px">Total: R$ 89,00</div>${btn('#6a45e0', '#fff', '◌ Processando pagamento…')}`,
          'b',
          'A opção B mostra que o sistema recebeu o comando e está trabalhando. Na A, a pessoa não sabe se o toque funcionou e pode tocar de novo.',
        ),
        `## 2. Correspondência entre o sistema e o mundo real

Fale a **língua das pessoas**, não a do sistema. Use palavras, conceitos e convenções familiares, em ordem natural.

- ❌ "Erro 403: acesso negado ao recurso" → ✅ "Você não tem permissão para ver esta página"
- Ícone de **lixeira** para apagar, de **carrinho** para compras
- Termostato que gira para a direita para esquentar

Jargão técnico, siglas internas e termos do "jeito da empresa" quebram essa heurística.`,
        scenario(
          'Num app de plano de saúde, o menu tem a opção "Gestão de elegibilidade de beneficiários".',
          'Qual heurística esse texto viola?',
          'Correspondência entre o sistema e o mundo real',
          ['Visibilidade do status do sistema', 'Prevenção de erros', 'Consistência e padrões'],
          'É linguagem interna da empresa. Para a pessoa usuária, algo como "Meus dependentes" seria muito mais claro.',
        ),
        `## 3. Controle e liberdade do usuário

As pessoas erram e clicam sem querer. Dê sempre uma **"saída de emergência"** clara:

- **Desfazer** e refazer
- Botão de **voltar** e **cancelar**
- "Mensagem apagada? **Desfazer**" no Gmail
- Poder **sair** de um fluxo de cadastro sem perder tudo

Sem saída, a pessoa se sente presa — e fecha o app.

## 4. Consistência e padrões

- **Consistência interna**: o mesmo elemento funciona e aparece do mesmo jeito em todo o produto (o botão principal é sempre roxo, "Salvar" é sempre "Salvar", não "Gravar" numa tela e "Confirmar" na outra).
- **Consistência externa**: siga as **convenções** que as pessoas já conhecem de outros produtos (logo no canto superior esquerdo leva à home; lupa = busca).

As pessoas passam a maior parte do tempo em **outros** apps. Elas esperam que o seu funcione igual.`,
        match('Ligue o exemplo à heurística', [
          ['Botão "Desfazer" depois de apagar um e-mail', 'Controle e liberdade'],
          ['Lupa como ícone de busca', 'Consistência e padrões'],
          ['"Enviando…" depois de tocar em enviar', 'Visibilidade do status'],
          ['"Meus pedidos" em vez de "Histórico transacional"', 'Correspondência com o mundo real'],
        ]),
        `## 5. Prevenção de erros

Melhor que uma boa mensagem de erro é **impedir que o erro aconteça**:

- Desabilitar datas passadas no calendário de agendamento
- Pedir confirmação antes de ações destrutivas: "Excluir conta? Isso não pode ser desfeito"
- Sugestões na busca para evitar erros de digitação
- Máscaras de campo: telefone (11) 99999-9999

Existem dois tipos de erro: **deslizes** (a pessoa sabia, mas o dedo escorregou) e **enganos** (a pessoa entendeu errado como funciona). Os dois podem ser prevenidos pelo design.`,
        ab(
          'Qual calendário de agendamento previne melhor os erros?',
          `<div style="font-weight:800;font-size:13px;margin-bottom:6px">Escolha a data</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;font-size:12px;text-align:center">${['18', '19', '20', '21', '22', '23', '24', '25', '26', '27'].map((d, i) => `<div style="padding:6px 0;border-radius:6px;${i < 4 ? 'color:#c9c6d4;text-decoration:line-through' : 'background:#efe9ff;color:#4a22c0;font-weight:800'}">${d}</div>`).join('')}</div><div style="font-size:11px;color:#6b6880;margin-top:6px">Hoje: 22</div>`,
          `<div style="font-weight:800;font-size:13px;margin-bottom:6px">Escolha a data</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;font-size:12px;text-align:center">${['18', '19', '20', '21', '22', '23', '24', '25', '26', '27'].map((d) => `<div style="padding:6px 0;border-radius:6px;background:#efe9ff;color:#4a22c0;font-weight:800">${d}</div>`).join('')}</div><div style="font-size:11px;color:#6b6880;margin-top:6px">Hoje: 22</div>`,
          'a',
          'A opção A desabilita as datas passadas, impedindo um erro antes que ele aconteça. Na B, a pessoa pode escolher o dia 18 e só descobrir o problema depois.',
        ),
        scenario(
          'Ao tocar em "Excluir conta", o app apaga tudo imediatamente, sem nenhuma pergunta.',
          'Qual heurística está sendo mais violada?',
          'Prevenção de erros',
          ['Correspondência com o mundo real', 'Visibilidade do status do sistema', 'Estética e design minimalista'],
          'Ações destrutivas e irreversíveis devem pedir confirmação (e, se possível, permitir desfazer por um tempo).',
        ),
        tf(
          'Usar "Salvar" em uma tela e "Gravar" em outra para a mesma ação fere a heurística de consistência.',
          true,
          'Mesma ação, mesma palavra, mesmo visual. Variações fazem a pessoa duvidar se são coisas diferentes.',
        ),
      ],
      flashcards: [
        ['Heurística', 'Regra prática (de bolso) usada para avaliar ou guiar decisões — não é uma lei rígida.'],
        ['Visibilidade do status do sistema', 'Heurística 1: manter a pessoa informada sobre o que está acontecendo, com feedback rápido.'],
        ['Correspondência com o mundo real', 'Heurística 2: usar a linguagem e as convenções das pessoas, não do sistema.'],
        ['Controle e liberdade do usuário', 'Heurística 3: oferecer saídas claras — desfazer, voltar, cancelar.'],
        ['Consistência e padrões', 'Heurística 4: mesmas coisas iguais em todo o produto e seguindo convenções conhecidas.'],
        ['Prevenção de erros', 'Heurística 5: projetar para que o erro nem aconteça (confirmações, restrições, sugestões).'],
      ],
      resources: [
        { title: '10 Usability Heuristics for User Interface Design (NN/g)', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/', kind: 'artigo', lang: 'en', note: 'O artigo original, com exemplos e pôsteres para download.' },
      ],
    },
    {
      title: 'As 10 heurísticas de Nielsen (parte 2) e a avaliação heurística',
      summary: 'Reconhecer em vez de lembrar, eficiência, minimalismo, mensagens de erro, ajuda — e como avaliar um produto.',
      minutes: 20,
      steps: [
        `## 6. Reconhecer em vez de lembrar

A memória de curto prazo é limitada. Mostre as opções em vez de obrigar a pessoa a **lembrar**:

- Menus visíveis em vez de comandos que precisam ser decorados
- "Buscas recentes" e "Pedir de novo"
- Mostrar o resumo do pedido na tela de pagamento (sem obrigar a voltar para conferir)

## 7. Flexibilidade e eficiência de uso

Atalhos para quem já é experiente, sem atrapalhar quem é iniciante:

- Atalhos de teclado (Ctrl+C), gestos (deslizar para arquivar)
- Favoritos, "repetir último pedido"
- Personalização (escolher a tela inicial)`,
        scenario(
          'No app da farmácia, para comprar de novo o mesmo remédio, a pessoa precisa lembrar e digitar o nome exato toda vez.',
          'Qual heurística resolveria melhor isso com uma lista "Comprar novamente"?',
          'Reconhecer em vez de lembrar',
          ['Controle e liberdade do usuário', 'Ajuda e documentação', 'Visibilidade do status do sistema'],
          'Mostrar os itens comprados antes permite reconhecer em vez de lembrar. (Também ajuda na eficiência, heurística 7.)',
        ),
        `## 8. Estética e design minimalista

Cada informação extra **compete** com a informação importante. Minimalismo **não é** ter pouca coisa ou ser branco: é mostrar **só o que é relevante** para aquele momento.

- Uma tela de login não precisa de notícias, banners e 5 links
- Agrupar e esconder opções avançadas ("Mais opções")

## 9. Ajudar a reconhecer, diagnosticar e recuperar-se de erros

Quando o erro acontecer, a mensagem deve:

1. Dizer **o que** deu errado, em linguagem simples
2. Explicar **como resolver**
3. Ser **visível** e perto do problema

❌ "Dados inválidos." → ✅ "O CPF precisa ter 11 números. Faltam 2."`,
        ab(
          'Qual mensagem de erro segue melhor a heurística 9?',
          `<div style="font-size:12px;font-weight:700;margin-bottom:4px">CPF</div><div style="border:2px solid #f04b5b;border-radius:8px;padding:8px;font-size:13px">123.456.789</div><div style="color:#b0283a;font-size:12px;margin-top:4px;font-weight:700">Erro 22: entrada inválida</div>`,
          `<div style="font-size:12px;font-weight:700;margin-bottom:4px">CPF</div><div style="border:2px solid #f04b5b;border-radius:8px;padding:8px;font-size:13px">123.456.789</div><div style="color:#b0283a;font-size:12px;margin-top:4px;font-weight:700">O CPF tem 11 números. Faltam os 2 últimos.</div>`,
          'b',
          'A mensagem B diz o que está errado e como resolver, em linguagem humana. "Erro 22" não ajuda ninguém.',
        ),
        `## 10. Ajuda e documentação

O ideal é o sistema ser tão claro que não precise de manual. Mas, quando precisar, a ajuda deve ser:

- **Fácil de achar** e de pesquisar
- Focada na **tarefa** da pessoa
- Com **passos concretos**
- Disponível **no contexto**: dicas no próprio campo, tooltips, "Como funciona?"

Pense no ícone de "?" ao lado de um campo complicado, ou numa central de ajuda com busca.`,
        match('Ligue o exemplo à heurística', [
          ['"Pedir novamente" com os itens anteriores', 'Reconhecer em vez de lembrar'],
          ['Gesto de deslizar para arquivar', 'Flexibilidade e eficiência'],
          ['Tela de login sem banners desnecessários', 'Estética e minimalismo'],
          ['"Senha incorreta. Esqueceu? Toque aqui"', 'Recuperar-se de erros'],
          ['Ícone "?" com explicação ao lado do campo', 'Ajuda e documentação'],
        ]),
        `## Avaliação heurística: como fazer

A **avaliação heurística** é uma inspeção em que especialistas analisam uma interface usando as heurísticas como checklist. É rápida e barata — não precisa de usuários (mas **não substitui** testes com eles).

**Passo a passo:**

1. Defina o **escopo** e as **tarefas** principais (ex.: "agendar um horário").
2. Percorra cada tarefa **duas vezes**: uma para entender o fluxo, outra procurando problemas.
3. Para cada problema, anote: **onde**, **o quê**, **qual heurística** e a **severidade**.
4. Junte os achados de **3 a 5 avaliadores** (cada pessoa encontra problemas diferentes).
5. Priorize e sugira melhorias.`,
        order(
          'Ordene os passos de uma avaliação heurística:',
          ['Definir escopo e tarefas', 'Percorrer as tarefas procurando problemas', 'Registrar problema, heurística e severidade', 'Consolidar com outros avaliadores', 'Priorizar e sugerir melhorias'],
          'Escopo → inspeção → registro → consolidação → priorização.',
        ),
        `## Escala de severidade de Nielsen

| Nota | Significado |
|---|---|
| **0** | Não é um problema de usabilidade |
| **1** | Cosmético — corrigir se sobrar tempo |
| **2** | Menor — baixa prioridade |
| **3** | Maior — importante corrigir, alta prioridade |
| **4** | Catástrofe — corrigir antes de lançar |

A severidade combina **frequência** (quantas vezes acontece), **impacto** (o quanto atrapalha) e **persistência** (a pessoa contorna ou fica travada sempre).`,
        scenario(
          'Na avaliação de um app de banco, você percebe que o botão de "Confirmar transferência" não dá nenhum retorno e às vezes a transferência é feita duas vezes.',
          'Que severidade faz mais sentido?',
          '4 — catástrofe: corrigir antes de qualquer coisa',
          ['1 — cosmético', '2 — menor', '0 — não é problema'],
          'Envolve dinheiro, acontece com frequência e tem impacto grave. É o tipo de problema que não pode esperar.',
        ),
        tf(
          'Uma avaliação heurística substitui totalmente os testes com usuários reais.',
          false,
          'Ela é ótima para achar problemas óbvios rapidamente, mas especialistas não são os usuários. Testes com pessoas reais revelam coisas que nenhuma checklist pega.',
        ),
        fill(
          'Para uma avaliação heurística, o recomendado é juntar os achados de 3 a ___ avaliadores.',
          '5',
          ['1', '20', '100'],
          'Cada avaliador encontra problemas diferentes. Com 3 a 5, você cobre a maioria sem gastar demais.',
        ),
      ],
      flashcards: [
        ['Reconhecer em vez de lembrar', 'Heurística 6: deixar opções e informações visíveis para não sobrecarregar a memória.'],
        ['Flexibilidade e eficiência de uso', 'Heurística 7: atalhos e personalização para usuários experientes, sem atrapalhar iniciantes.'],
        ['Estética e design minimalista', 'Heurística 8: mostrar só o que é relevante; cada informação extra compete com a importante.'],
        ['Recuperação de erros', 'Heurística 9: mensagens de erro claras, que dizem o problema e como resolver.'],
        ['Ajuda e documentação', 'Heurística 10: ajuda fácil de achar, focada na tarefa e no contexto.'],
        ['Avaliação heurística', 'Inspeção em que 3 a 5 especialistas analisam a interface usando as heurísticas e classificam a severidade dos problemas.'],
        ['Escala de severidade', '0 a 4 (de "não é problema" a "catástrofe"), combinando frequência, impacto e persistência.'],
      ],
      resources: [
        { title: 'How to Conduct a Heuristic Evaluation (NN/g)', url: 'https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/', kind: 'artigo', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Avaliação heurística de um app real',
      summary: 'Escolha um app que você usa e encontre pelo menos 8 problemas com base nas heurísticas.',
      minutes: 150,
      tool: 'figjam',
      brief: `## Hora de avaliar como uma profissional

Escolha um app ou site de **serviço** que você usa (ou já tentou usar). Boas opções: app da operadora de celular, site da prefeitura, app de farmácia, plano de saúde, companhia de luz, delivery.

Escolha **2 tarefas** importantes. Exemplos: "pagar a conta do mês", "agendar uma consulta", "trocar a senha".

### Monte uma tabela assim (no FigJam, Google Planilhas ou Notion)

| # | Tela / onde | Problema | Heurística violada | Severidade (0–4) | Sugestão |
|---|---|---|---|---|---|
| 1 | Tela de pagamento | O botão "Pagar" não dá retorno após o toque | 1. Visibilidade do status | 3 | Mostrar "Processando…" e desabilitar o botão |

Cole o **print** de cada problema ao lado da linha (no FigJam isso fica ótimo).

> 💡 Também anote **2 coisas boas** — heurísticas que o app respeita bem. Avaliações equilibradas são mais respeitadas.`,
      steps: [
        'Escolha o app e escreva as 2 tarefas que vai avaliar.',
        'Faça cada tarefa uma vez só para entender o caminho (tire prints de todas as telas).',
        'Faça de novo, devagar, procurando problemas. Tenha a lista das 10 heurísticas aberta ao lado.',
        'Registre **pelo menos 8 problemas** na tabela, cada um com heurística e severidade.',
        'Registre também **2 pontos positivos**.',
        'Ordene a tabela da maior para a menor severidade.',
        'Escreva um resumo de 3 linhas: quais são os 3 problemas mais urgentes e por quê.',
      ],
      deliverable: 'Link do FigJam/planilha com a tabela de problemas, prints, severidades, pontos positivos e o resumo.',
      rubric: [
        'Defini claramente o app e as 2 tarefas avaliadas',
        'Encontrei pelo menos 8 problemas',
        'Cada problema tem a heurística correta associada',
        'Usei a escala de severidade de 0 a 4 de forma coerente',
        'Cada problema tem um print da tela',
        'Sugeri uma melhoria para cada problema',
        'Registrei 2 pontos positivos',
        'Escrevi o resumo com as 3 prioridades',
      ],
      tips: [
        'Um mesmo problema pode violar mais de uma heurística: escolha a principal.',
        'Severidade não é sua irritação pessoal: pense em quantas pessoas são afetadas e o quanto isso as impede.',
        'No FigJam, use a ferramenta de seção para separar as duas tarefas.',
      ],
      resources: [
        { title: 'FigJam — quadro branco online do Figma', url: 'https://www.figma.com/figjam/', kind: 'ferramenta' },
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Num site de compras, depois de colocar o produto no carrinho, nada acontece na tela. A pessoa só descobre que funcionou ao abrir o carrinho.',
      'Qual heurística foi violada?',
      'Visibilidade do status do sistema',
      ['Ajuda e documentação', 'Flexibilidade e eficiência', 'Estética e minimalismo'],
      'Faltou feedback: um aviso "Adicionado ao carrinho" ou o número no ícone do carrinho resolveria.',
    ),
    scenario(
      'Um formulário de cadastro com 30 campos apaga tudo o que foi digitado se a pessoa tocar em "Voltar" por engano.',
      'Quais heurísticas estão mais envolvidas?',
      'Controle e liberdade do usuário, e prevenção de erros',
      ['Correspondência com o mundo real, e ajuda', 'Estética, e consistência', 'Somente reconhecer em vez de lembrar'],
      'A pessoa não tem como desfazer (controle) e o sistema não evita a perda (prevenção). Salvar o rascunho ou pedir confirmação resolveria.',
    ),
    mc(
      'O que uma boa mensagem de erro precisa ter?',
      'Explicar o problema em linguagem simples e dizer como resolver',
      ['O código técnico do erro', 'Letras maiúsculas e cor vermelha', 'Um pedido de desculpas longo'],
      'Clareza e solução. Cor e ícone ajudam a chamar atenção, mas o texto é o que resolve.',
    ),
  ],
}
