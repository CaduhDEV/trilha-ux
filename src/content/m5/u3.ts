import { ab, contrast, fill, match, mc, multi, open, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

const btn = (label: string, primary = true) =>
  `<div style="background:${primary ? '#7c4dff' : '#fff'};color:${primary ? '#fff' : '#4a22c0'};border:${primary ? 'none' : '1.5px solid #d3cfe1'};border-radius:10px;padding:8px 0;text-align:center;font-weight:800;font-size:12px;margin-top:6px">${label}</div>`

export const u3: UnitDef = {
  title: 'Acessibilidade, UX writing e ética',
  goal: 'Projetar para todas as pessoas, escrever textos de interface que ajudam e evitar padrões enganosos.',
  lessons: [
    {
      title: 'Acessibilidade de verdade',
      summary: 'Quem se beneficia, os princípios POUR, o que o WCAG pede dos designers e a lei brasileira.',
      minutes: 20,
      steps: [
        `## Acessibilidade é para todo mundo

**Acessibilidade digital** é garantir que **pessoas com deficiência** consigam perceber, entender, navegar e interagir com produtos digitais. No Brasil, segundo o IBGE, milhões de pessoas têm alguma deficiência — e muitas mais têm limitações por idade.

Mas pense também nas limitações **temporárias** e **situacionais**:

| Permanente | Temporária | Situacional |
|---|---|---|
| Pessoa com um braço só | Braço quebrado | Segurando um bebê no colo |
| Pessoa cega | Olho irritado após um procedimento | Tela com sol forte |
| Pessoa surda | Infecção no ouvido | Lugar barulhento, sem fone |

Projetar com acessibilidade melhora a experiência de **todo mundo**. Legendas, por exemplo, são usadas por muita gente que ouve bem.`,
        match('Ligue o tipo de limitação ao exemplo (mão ocupada)', [
          ['Permanente', 'Pessoa que perdeu um braço'],
          ['Temporária', 'Pessoa com o braço engessado'],
          ['Situacional', 'Pessoa segurando sacolas de compras'],
        ]),
        `## Os 4 princípios: POUR

O WCAG organiza tudo em quatro princípios. O conteúdo precisa ser:

- **P**erceptível: dá para perceber por algum sentido (texto alternativo em imagens, legendas em vídeos, contraste suficiente).
- **O**perável: dá para usar (navegação por teclado, tempo suficiente, áreas de toque adequadas, nada que pisque).
- **C**ompreensível (*Understandable*): dá para entender (linguagem clara, comportamento previsível, ajuda com erros).
- **R**obusto: funciona com tecnologias assistivas (leitores de tela) e diferentes dispositivos — muito ligado ao código, mas o design precisa indicar rótulos e estrutura.`,
        match('Ligue o princípio POUR ao exemplo', [
          ['Perceptível', 'Imagens com texto alternativo'],
          ['Operável', 'Tudo funciona usando só o teclado'],
          ['Compreensível', 'Mensagens de erro claras e linguagem simples'],
          ['Robusto', 'Funciona bem com leitores de tela'],
        ]),
        `## O que o designer precisa garantir (o essencial do WCAG 2.2 AA)

- **Contraste**: 4,5:1 texto normal; 3:1 texto grande e componentes.
- **Não depender só de cor**.
- **Texto alternativo** para imagens informativas.
- **Foco visível** em todos os elementos interativos, com **ordem lógica** de navegação.
- **Áreas de toque** adequadas (mínimo 24×24px; ideal 44–48).
- **Rótulos** visíveis em campos de formulário.
- **Títulos e estrutura** de página claros (hierarquia de títulos).
- **Texto ampliável**: o layout não pode quebrar com a fonte aumentada a 200%.
- **Legendas** em vídeos e alternativas para áudio.
- **Mensagens de erro** que identificam o campo e explicam como corrigir.`,
        multi(
          'Quais itens são responsabilidade do design para atender ao WCAG 2.2 AA?',
          ['Foco visível nos elementos interativos', 'Rótulos visíveis nos campos', 'Layout que suporta texto ampliado'],
          ['Usar apenas a cor para indicar erros', 'Deixar a ordem de navegação aleatória'],
          'Design define muito da acessibilidade: foco, rótulos, contraste, estrutura e comportamento com texto grande.',
        ),
        `## Tecnologias assistivas

- **Leitores de tela**: VoiceOver (iPhone/Mac), TalkBack (Android), NVDA (Windows, gratuito). Leem a interface em voz alta e permitem navegar por gestos ou teclado.
- **Ampliadores de tela** e fonte aumentada.
- **Controle por voz** e **teclados alternativos**.

**Faça o teste agora**: ative o TalkBack ou o VoiceOver no seu celular por 5 minutos e tente usar um app. É uma experiência que muda a forma como você desenha.

## A lei no Brasil

A **Lei Brasileira de Inclusão** (Lei 13.146/2015, o Estatuto da Pessoa com Deficiência) determina, no artigo 63, que sites de empresas e órgãos públicos sejam **acessíveis**. Para o governo, existe o **eMAG** (Modelo de Acessibilidade em Governo Eletrônico), alinhado ao WCAG.`,
        tf(
          'No Brasil, a Lei Brasileira de Inclusão (13.146/2015) exige acessibilidade em sites de empresas e órgãos públicos.',
          true,
          'O artigo 63 trata da acessibilidade nos sítios da internet. Acessibilidade é também uma obrigação legal.',
        ),
        scenario(
          'Uma pessoa que navega só pelo teclado não consegue ver em qual botão está, porque o designer removeu o contorno de foco "por ser feio".',
          'Que princípio e critério foram violados?',
          'Operável — o foco visível é obrigatório para quem navega por teclado',
          ['Perceptível — falta texto alternativo', 'Robusto — problema só do código', 'Nenhum — é escolha estética'],
          'Sem foco visível, a navegação por teclado fica impossível. O foco pode ser bonito, mas precisa existir.',
        ),
        fill(
          'Os quatro princípios do WCAG formam a sigla ___.',
          'POUR',
          ['CRAP', 'HEART', 'SCAMPER'],
          'Perceptível, Operável, Compreensível (Understandable) e Robusto.',
        ),
      ],
      flashcards: [
        ['Acessibilidade digital', 'Garantir que pessoas com deficiência (e todas as pessoas) consigam usar produtos digitais.'],
        ['POUR', 'Princípios do WCAG: Perceptível, Operável, Compreensível e Robusto.'],
        ['Foco visível', 'Indicação clara do elemento selecionado ao navegar por teclado. Nunca remova sem substituir.'],
        ['Limitação situacional', 'Dificuldade causada pelo contexto (sol na tela, mão ocupada, barulho).'],
        ['Lei Brasileira de Inclusão', 'Lei 13.146/2015; o art. 63 exige acessibilidade em sites de empresas e órgãos públicos.'],
        ['eMAG', 'Modelo de Acessibilidade em Governo Eletrônico, referência para sites do governo brasileiro.'],
      ],
      resources: [
        { title: 'Lei Brasileira de Inclusão (texto da lei)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm', kind: 'site', lang: 'pt' },
        { title: 'Introduction to Web Accessibility (W3C WAI)', url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/', kind: 'artigo', lang: 'en' },
        { title: 'Microsoft Inclusive Design', url: 'https://inclusive.microsoft.design/', kind: 'site', lang: 'en' },
      ],
    },
    {
      title: 'UX writing: palavras que guiam',
      summary: 'Clareza, concisão, voz e tom, botões, mensagens de erro e linguagem inclusiva.',
      minutes: 20,
      steps: [
        `## O texto também é design

**UX writing** é escrever os textos da interface — botões, rótulos, mensagens, títulos, avisos, estados vazios — para **ajudar a pessoa a agir**. As pessoas não leem: escaneiam. Cada palavra precisa trabalhar.

Princípios:

- **Claro**: palavras do dia a dia, sem jargão.
- **Conciso**: o mínimo necessário (sem ficar seco ou ambíguo).
- **Útil**: diz o que a pessoa precisa saber **naquele momento**.
- **Humano**: como uma pessoa gentil falaria, não um sistema.
- **O mais importante primeiro** (*front-loading*): "Horário confirmado para sábado, 15h" e não "Informamos que o seu agendamento foi realizado com sucesso para…"`,
        ab(
          'Qual mensagem de confirmação é mais clara?',
          `<div style="font-size:12px;line-height:1.5">Prezada cliente, informamos que a solicitação de agendamento referente ao serviço selecionado foi devidamente processada e registrada em nosso sistema com sucesso.</div>`,
          `<div style="font-size:13px;font-weight:800">✓ Horário confirmado!</div><div style="font-size:12px;color:#6b6880;margin-top:4px">Pé e mão · sáb, 25/10 às 15h<br/>Studio Bela · Rua das Flores, 120</div>`,
          'b',
          'A opção B coloca o essencial primeiro, com informações úteis e linguagem humana.',
        ),
        `## Botões: verbos que dizem o que acontece

- ✅ "Confirmar agendamento", "Salvar alterações", "Pagar R$ 55"
- ❌ "OK", "Enviar", "Clique aqui", "Sim/Não" (em confirmações)

Em diálogos de confirmação, repita a ação nos botões: **"Cancelar horário?"** → botões **"Cancelar horário"** e **"Manter horário"**. "Sim" e "Não" obrigam a reler a pergunta.`,
        ab(
          'Qual diálogo de confirmação é melhor?',
          `<div style="font-weight:800;font-size:13px">Tem certeza?</div><div style="font-size:11px;color:#6b6880">Essa ação não pode ser desfeita.</div>${btn('Sim')}${btn('Não', false)}`,
          `<div style="font-weight:800;font-size:13px">Cancelar o horário de sábado?</div><div style="font-size:11px;color:#6b6880">O horário volta a ficar livre para outras clientes.</div>${btn('Cancelar horário')}${btn('Manter horário', false)}`,
          'b',
          'Botões que dizem a ação ("Cancelar horário" / "Manter horário") não exigem reler a pergunta e evitam erros.',
        ),
        `## Mensagens de erro

Uma boa mensagem de erro responde três perguntas:

1. **O que aconteceu?**
2. **Por quê?** (se ajudar)
3. **Como resolver?**

E segue regras de tom:

- **Não culpe** a pessoa: ❌ "Você digitou errado" → ✅ "Esse e-mail parece incompleto. Confira se tem @ e o domínio."
- **Não seja engraçadinho** em momentos de frustração (perdeu o pagamento? Nada de "Ops! 🙈").
- **Seja específico**: "Sem conexão. Seus dados estão salvos — tente de novo quando a internet voltar."`,
        scenario(
          'O pagamento falha e o app mostra: "Ops! Algo deu errado 😅".',
          'Qual seria uma mensagem melhor?',
          '"Não conseguimos aprovar o pagamento. Confira os dados do cartão ou tente outra forma de pagamento. Seu horário fica reservado por 10 minutos."',
          ['"Erro 500: falha na transação"', '"Você errou os dados do cartão."', '"Ops! Algo deu muito errado 🙈🙈"'],
          'A boa mensagem diz o que aconteceu, como resolver e tranquiliza sobre o que não foi perdido — sem culpar e sem piada.',
        ),
        `## Voz e tom

- **Voz**: a personalidade da marca — **constante**. (Ex.: "próxima, simples e encorajadora".)
- **Tom**: como a voz se **adapta** ao momento. Numa conquista, celebramos 🎉; num erro de pagamento, somos sérios e objetivos; num aviso de segurança, firmes e claros.

Pense numa amiga: ela é sempre ela (voz), mas fala diferente num aniversário e num velório (tom).

## Linguagem simples e inclusiva

- Frases curtas, ordem direta, palavras comuns.
- Evite jargões técnicos e siglas sem explicação.
- Linguagem **neutra** quando possível ("Boas-vindas!" em vez de "Bem-vindo!"; "Quem tiver dúvidas…").
- Evite expressões **capacitistas** ("dar uma de cego", "fingir demência").`,
        match('Ligue o conceito à definição', [
          ['Voz', 'Personalidade constante da marca'],
          ['Tom', 'Adaptação da voz a cada situação'],
          ['Front-loading', 'Colocar o mais importante no começo da frase'],
          ['Microcopy', 'Pequenos textos da interface: botões, rótulos, dicas'],
        ]),
        multi(
          'Quais textos de botão são bons?',
          ['"Confirmar agendamento"', '"Salvar alterações"', '"Pagar R$ 55"'],
          ['"OK"', '"Clique aqui"'],
          'Verbos de ação específicos dizem exatamente o que vai acontecer.',
        ),
        tf(
          'Em mensagens de erro, um tom bem-humorado sempre ajuda a aliviar a frustração.',
          false,
          'Em momentos sérios (dinheiro, dados, saúde), humor parece descaso. Ajuste o tom à situação.',
        ),
      ],
      flashcards: [
        ['UX writing', 'Escrever os textos da interface para ajudar a pessoa a agir: claros, concisos, úteis e humanos.'],
        ['Microcopy', 'Pequenos textos da interface: botões, rótulos, dicas, mensagens.'],
        ['Front-loading', 'Colocar a informação mais importante no começo da frase.'],
        ['Voz vs. tom', 'Voz = personalidade constante. Tom = adaptação a cada situação.'],
        ['Mensagem de erro útil', 'Diz o que aconteceu, por quê (se ajudar) e como resolver — sem culpar a pessoa.'],
      ],
      resources: [
        { title: 'Microcopy: The Complete Guide — Kinneret Yifrah', kind: 'livro', lang: 'en' },
        { title: 'Error-Message Guidelines (NN/g)', url: 'https://www.nngroup.com/articles/error-message-guidelines/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Design ético e padrões enganosos',
      summary: 'Dark patterns, privacidade, LGPD na interface e design para pessoas com pouca familiaridade digital.',
      minutes: 15,
      steps: [
        `## O poder do design pode ser usado contra as pessoas

Tudo o que você aprendeu — psicologia, hierarquia, escrita — pode ser usado para **enganar**. Os **dark patterns** (hoje também chamados de **deceptive patterns**, termo de Harry Brignull) são interfaces desenhadas para levar a pessoa a fazer algo que **não queria**.

Exemplos comuns:

- **Confirmshaming**: "Não, obrigada, prefiro pagar mais caro" no botão de recusar.
- **Roach motel (armadilha)**: assinar com 1 clique, cancelar só por telefone em horário comercial.
- **Item escondido no carrinho**: seguro ou doação adicionados sem a pessoa pedir.
- **Urgência falsa**: "Só restam 2!" ou cronômetro que reinicia.
- **Custos ocultos**: taxas que só aparecem no último passo.
- **Insistência** (*nagging*): pedir a mesma permissão a cada tela.
- **Privacidade enganosa**: "Aceitar tudo" gigante e "Configurar" escondido.`,
        match('Ligue o padrão enganoso ao exemplo', [
          ['Confirmshaming', '"Não, prefiro continuar desorganizada"'],
          ['Roach motel', 'Assinatura online, cancelamento só por telefone'],
          ['Custos ocultos', 'Taxa de serviço que aparece só no pagamento'],
          ['Urgência falsa', 'Cronômetro de oferta que reinicia ao recarregar'],
        ]),
        `## Por que evitar (além de ser o certo)

- **Confiança**: pessoas enganadas não voltam — e contam para os outros.
- **Lei**: o **Código de Defesa do Consumidor** proíbe práticas enganosas e abusivas; a **LGPD** exige consentimento **livre, informado e inequívoco**; normas do consumidor também tratam de facilitar o cancelamento de serviços.
- **Reputação**: empresas já foram multadas e expostas por dark patterns.

Designers são, muitas vezes, a **última barreira** antes de um padrão enganoso chegar às pessoas. Saber argumentar com dados e com a lei é parte do trabalho.`,
        scenario(
          'O time de marketing pede para o botão de recusar a newsletter dizer "Não, eu não gosto de economizar".',
          'Qual seria uma postura profissional da designer?',
          'Explicar que é confirmshaming, que prejudica a confiança, e propor um texto neutro como "Agora não"',
          ['Fazer o pedido sem questionar', 'Recusar o projeto inteiro', 'Esconder o botão de recusar'],
          'Argumentar com respeito, mostrando riscos e alternativas, é mais eficaz do que obedecer calada ou bater de frente.',
        ),
        `## Privacidade e LGPD na interface

- Peça **só os dados necessários** e explique **por quê** ("Usamos seu telefone só para lembrar do horário").
- **Consentimento** claro e separado para cada finalidade (ex.: lembretes × promoções).
- Opções de **aceitar e recusar** com o **mesmo destaque** em banners de cookies.
- Permita **ver, corrigir e apagar** os dados e **revogar** consentimentos facilmente.
- Peça permissões do celular (localização, notificações) **no contexto**, quando a pessoa entende para que servem.`,
        multi(
          'Quais práticas respeitam a privacidade e a LGPD?',
          ['Explicar por que um dado é pedido', 'Botões de aceitar e recusar com o mesmo destaque', 'Pedir permissão de notificação no momento em que faz sentido'],
          ['Pré-marcar a opção de receber promoções', 'Pedir CPF sem necessidade "por segurança"'],
          'Transparência, minimização e escolha real são a base do design respeitoso.',
        ),
        `## Design para quem tem pouca familiaridade digital

Uma parte grande da população brasileira tem **pouca intimidade com tecnologia**: pessoas idosas, com baixa escolaridade, que usam celulares simples e internet limitada. Projetar para elas melhora a experiência de todos:

- Textos simples e diretos; ícones **sempre com rótulo**.
- Fonte maior e alto contraste; botões grandes.
- Um caminho claro por tela; poucas opções.
- Confirmação de ações importantes e possibilidade de **voltar**.
- Funcionar bem com **internet lenta** e em aparelhos mais antigos.
- Canais alternativos (atendimento humano) para quem não consegue.`,
        tf(
          'Projetar pensando em pessoas com pouca familiaridade digital geralmente melhora a experiência de todos os usuários.',
          true,
          'Clareza, rótulos, contraste e caminhos simples beneficiam qualquer pessoa — especialmente em momentos de pressa ou distração.',
        ),
        fill(
          'Interfaces desenhadas para levar a pessoa a fazer algo que ela não queria são chamadas de dark patterns ou padrões ___.',
          'enganosos',
          ['responsivos', 'atômicos', 'heurísticos'],
          'Deceptive patterns: o nome atual, que deixa claro o problema — enganar.',
        ),
        open(
          'Você já caiu em algum padrão enganoso (assinatura difícil de cancelar, taxa escondida, item extra no carrinho)? Conte como foi e como você redesenharia.',
          'Reconhecer esses padrões na própria pele ajuda a argumentar contra eles no trabalho. Guarde a história — é um ótimo exemplo para entrevistas.',
        ),
      ],
      flashcards: [
        ['Dark patterns (padrões enganosos)', 'Interfaces que levam a pessoa a fazer algo que não queria (confirmshaming, custos ocultos, armadilhas).'],
        ['Confirmshaming', 'Texto que envergonha a pessoa por recusar uma oferta.'],
        ['Roach motel', 'Fácil de entrar (assinar), difícil de sair (cancelar).'],
        ['Consentimento (LGPD)', 'Deve ser livre, informado e inequívoco, para finalidades específicas.'],
      ],
      resources: [
        { title: 'Deceptive Design (Harry Brignull)', url: 'https://www.deceptive.design/', kind: 'site', lang: 'en' },
      ],
    },
  ],
  practices: [
    {
      title: 'Auditoria de acessibilidade e revisão de textos',
      summary: 'Audite seu protótipo com um checklist WCAG e reescreva os textos da interface.',
      minutes: 240,
      tool: 'figma',
      brief: `## Deixando o projeto pronto para todo mundo

### Parte 1 — Auditoria de acessibilidade

Use este checklist em **todas** as telas do fluxo principal:

| Item | Como verificar |
|---|---|
| Contraste de textos (4,5:1 / 3:1) | Plugin de contraste ou WebAIM |
| Contraste de componentes (3:1) | Bordas de campos, ícones essenciais |
| Não depender só de cor | Status e erros têm ícone/texto |
| Áreas de toque ≥ 44–48 | Medir no Figma |
| Foco visível | Existe variante de foco nos componentes? |
| Rótulos visíveis nos campos | Sem placeholder como rótulo |
| Ícones com rótulo ou texto acessível | Anotar o rótulo para leitores de tela |
| Texto alternativo nas imagens | Anotar alt text ou "decorativa" |
| Ordem de foco lógica | Numerar a ordem de navegação numa tela |
| Texto ampliado | Testar uma tela com textos 2× maiores |

### Parte 2 — Revisão de UX writing

Revise **todos os textos** do fluxo: títulos, botões, rótulos, mensagens de erro, sucesso e estados vazios. Defina em 3 adjetivos a **voz** do seu produto.

### Parte 3 — Check de ética

Revise o fluxo procurando qualquer padrão enganoso ou coleta de dados desnecessária.`,
      steps: [
        'Rode o checklist de acessibilidade em todas as telas e registre o resultado.',
        'Corrija os problemas encontrados no design system e nas telas.',
        'Anote, numa tela, a ordem de foco e os rótulos para leitores de tela.',
        'Teste uma tela com texto ampliado (2×) e ajuste o layout.',
        'Defina a voz do produto em 3 adjetivos com exemplos de "é / não é".',
        'Reescreva botões, mensagens de erro, sucesso e estados vazios (tabela antes → depois).',
        'Revise o fluxo procurando padrões enganosos e dados pedidos sem necessidade.',
      ],
      deliverable: 'Link do Figma/documento com o checklist preenchido, correções feitas, anotações de acessibilidade, guia de voz e a tabela de textos antes/depois.',
      rubric: [
        'Preenchi o checklist de acessibilidade em todas as telas',
        'Corrigi os problemas de contraste, toque e foco',
        'Anotei ordem de foco e rótulos para leitores de tela',
        'Testei o layout com texto ampliado',
        'Defini a voz do produto com exemplos',
        'Reescrevi os textos com verbos de ação e mensagens de erro úteis',
        'Revisei o fluxo procurando padrões enganosos e excesso de dados',
      ],
      tips: ['Ative o leitor de tela do celular e navegue pelo seu protótipo no app do Figma: você vai perceber o que falta descrever.'],
    },
  ],
  checkpointExtra: [
    contrast('#B9A6FF', '#FFFFFF'),
    scenario(
      'Para cancelar a assinatura de um app de beleza, a pessoa precisa ligar para uma central que só funciona em horário comercial, mas a assinatura foi feita em 2 toques.',
      'Que padrão enganoso é esse?',
      'Roach motel (armadilha): fácil de entrar, difícil de sair',
      ['Confirmshaming', 'Urgência falsa', 'Item escondido no carrinho'],
      'O ideal é cancelar pelo mesmo canal e com a mesma facilidade da contratação.',
    ),
    mc(
      'Qual texto de botão é melhor para confirmar a exclusão de uma foto?',
      '"Excluir foto"',
      ['"Sim"', '"OK"', '"Prosseguir"'],
      'O botão diz exatamente o que vai acontecer.',
    ),
  ],
}
