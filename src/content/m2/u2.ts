import { fill, match, mc, multi, open, order, scenario, tf } from '../helpers'
import type { UnitDef } from '../types'

export const u2: UnitDef = {
  title: 'Entrevistas e questionários',
  goal: 'Recrutar participantes, escrever roteiros, conduzir entrevistas e criar questionários sem vieses.',
  lessons: [
    {
      title: 'Recrutamento e roteiro de entrevista',
      summary: 'Encontrar as pessoas certas e escrever perguntas que trazem histórias reais.',
      minutes: 20,
      steps: [
        `## Encontrando as pessoas certas

**Recrutar** é encontrar participantes que representam o público. Errar aqui invalida a pesquisa inteira: entrevistar sua prima que nunca foi a um salão não ajuda a entender clientes de salão.

**Onde encontrar:**

- Sua rede: amigos de amigos (evite pessoas muito próximas — elas tendem a ser "gentis" demais)
- Grupos de WhatsApp, Facebook e comunidades do bairro
- No próprio local: o salão, a feira, a ONG
- Clientes do produto (se já existir)

**Screener** (questionário de triagem): 3 a 6 perguntas rápidas para filtrar quem tem o perfil. Ex.: "Nos últimos 3 meses, quantas vezes você foi a um salão de beleza?"`,
        mc(
          'Para que serve um screener?',
          'Filtrar candidatos para garantir que os participantes têm o perfil da pesquisa',
          ['Gravar a tela durante o teste', 'Medir a satisfação depois da entrevista', 'Escolher as cores do protótipo'],
          'O screener é a "peneira" do recrutamento: poucas perguntas que confirmam se a pessoa faz parte do público.',
        ),
        `## A estrutura do roteiro

Um roteiro de entrevista de 30 a 45 minutos costuma ter:

1. **Abertura** (2 min): agradecer, explicar o objetivo, pedir consentimento para gravar, dizer que não há respostas certas.
2. **Aquecimento** (5 min): perguntas fáceis sobre a pessoa e a rotina. Cria confiança (*rapport*).
3. **Corpo** (20–30 min): perguntas sobre o tema, do **geral para o específico** (formato de funil).
4. **Fechamento** (3 min): "Tem algo que eu não perguntei e você acha importante?", agradecer, explicar próximos passos.

O roteiro é um **guia**, não um questionário para ler em voz alta. Siga a conversa e volte ao roteiro quando precisar.`,
        order(
          'Ordene as partes de um roteiro de entrevista:',
          ['Abertura e consentimento', 'Aquecimento', 'Perguntas gerais sobre o tema', 'Perguntas específicas', 'Fechamento'],
          'Começamos criando confiança e vamos do geral para o específico, terminando com espaço aberto para a pessoa.',
        ),
        `## Perguntas que funcionam

✅ **Abertas**: não dá para responder com sim/não. "Como você…", "Conte sobre…", "O que acontece quando…"

✅ **Sobre o passado concreto**: "Conte da **última vez** que você precisou remarcar um horário." Histórias reais trazem detalhes que opiniões não trazem.

✅ **Pedindo exemplos**: "Você pode me mostrar como faz isso no seu celular?"

❌ **Hipotéticas sobre o futuro**: "Você usaria um app que…?" (todo mundo diz que sim)

❌ **Indutivas**: "Não é difícil ligar para o salão?"

❌ **Duplas**: "Você gosta do preço e do atendimento?" (qual das duas a pessoa está respondendo?)

❌ **Sobre a solução**: "Você quer um botão de lembrete?" — as pessoas são especialistas nos **problemas** delas, não em desenhar soluções.`,
        multi(
          'Quais são boas perguntas de entrevista?',
          ['Conte como foi a última vez que você marcou um horário no salão.', 'O que você faz quando precisa desmarcar?', 'Pode me mostrar como você guarda seus compromissos?'],
          ['Você usaria um app de agendamento?', 'Você acha caro e demorado o atendimento?'],
          'Boas perguntas são abertas e focadas em situações reais. Evite futuro hipotético e perguntas duplas.',
        ),
        scenario(
          'Um roteiro tem a pergunta: "Você prefere receber lembretes por WhatsApp ou por e-mail e com quanto tempo de antecedência?"',
          'Qual é o problema?',
          'É uma pergunta dupla (duas perguntas em uma) e fechada',
          ['É longa demais para uma entrevista', 'WhatsApp não deveria ser citado', 'Não tem problema nenhum'],
          'Divida em perguntas separadas e, melhor ainda, pergunte primeiro como a pessoa lembra dos compromissos hoje.',
        ),
        tf(
          'Perguntar "Você usaria esse app?" é uma ótima forma de validar uma ideia.',
          false,
          'Previsões sobre o próprio comportamento futuro são pouco confiáveis. Investigue comportamentos atuais e teste com protótipos.',
        ),
        fill(
          'Organizar as perguntas do geral para o específico é chamado de técnica do ___.',
          'funil',
          ['espelho', 'labirinto', 'pêndulo'],
          'O funil começa amplo (a rotina, o contexto) e vai afunilando para o tema específico, sem induzir a pessoa logo de cara.',
        ),
      ],
      flashcards: [
        ['Recrutamento', 'Encontrar e selecionar participantes que representam o público da pesquisa.'],
        ['Screener', 'Questionário curto de triagem para garantir que o participante tem o perfil desejado.'],
        ['Rapport', 'Relação de confiança e conforto criada no início da entrevista.'],
        ['Técnica do funil', 'Ordenar perguntas do geral para o específico.'],
        ['Pergunta dupla', 'Pergunta que junta dois assuntos ("o preço e o atendimento"). Deve ser dividida.'],
      ],
      resources: [
        { title: 'Writing an Effective Guide for a UX Interview (NN/g)', url: 'https://www.nngroup.com/articles/interview-guide/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Conduzindo uma boa entrevista',
      summary: 'Escuta ativa, o poder do silêncio, aprofundar sem induzir e registrar bem.',
      minutes: 15,
      steps: [
        `## Fale pouco, escute muito

Numa boa entrevista, a participante fala **80% do tempo**. Seu papel é fazer a pessoa contar histórias.

**Escuta ativa:**

- Contato visual, acenos, "uhum", "entendi".
- **Parafrasear**: "Então, se eu entendi bem, você anota no caderno e depois passa para o celular?"
- **Não interromper** nem completar as frases da pessoa.
- **Não corrigir, não ensinar e não defender o produto.** Se a pessoa estiver "errada", é isso que você precisa ver.`,
        tf(
          'Se a participante disser algo errado sobre como o produto funciona, a entrevistadora deve corrigir imediatamente.',
          false,
          'O entendimento "errado" da pessoa é um dado valioso: mostra o modelo mental dela. Corrigir contamina o resto da entrevista.',
        ),
        `## O poder do silêncio

Depois que a pessoa responder, **espere 3 a 5 segundos** antes de fazer a próxima pergunta. É desconfortável no começo, mas o silêncio faz a pessoa **completar o raciocínio** — e muitas vezes vem aí a informação mais valiosa.

## Aprofundando sem induzir

Use perguntas de aprofundamento (*probes*) neutras:

- "Por que isso é importante para você?"
- "Pode me contar mais sobre isso?"
- "O que você fez depois?"
- "Como você se sentiu?"
- "Você pode dar um exemplo?"

A técnica dos **5 porquês** ajuda a chegar à causa raiz — mas use com delicadeza, para não parecer um interrogatório.`,
        mc(
          'Por que é útil esperar alguns segundos em silêncio depois de uma resposta?',
          'Porque a pessoa tende a complementar a resposta, muitas vezes com a informação mais valiosa',
          ['Para mostrar que a entrevistadora está pensando', 'Para a gravação ficar mais longa', 'Para a pessoa ficar desconfortável e desistir'],
          'O silêncio dá espaço para a pessoa continuar. É uma das técnicas mais simples e poderosas de entrevista.',
        ),
        match('Ligue a técnica à fala', [
          ['Parafrasear', '"Então você anota no caderno e depois passa para o celular?"'],
          ['Aprofundar', '"Pode me contar mais sobre isso?"'],
          ['Pedir exemplo', '"Pode me mostrar como você faz?"'],
          ['Explorar sentimentos', '"Como você se sentiu nessa hora?"'],
        ]),
        `## Registrando a entrevista

- **Grave** (com consentimento) para não depender da memória. Ferramentas de videochamada e de transcrição automática ajudam muito.
- Se possível, tenha uma **segunda pessoa anotando** enquanto você conduz.
- Anote **falas literais** entre aspas — elas são poderosas em apresentações.
- Separe **o que a pessoa disse ou fez** (fato) da **sua interpretação**.
- Logo depois de cada entrevista, faça um **debrief** de 10 minutos: quais foram as 3 coisas mais surpreendentes?`,
        scenario(
          'Nas anotações, a entrevistadora escreveu: "A Joana é desorganizada."',
          'Qual seria uma anotação melhor?',
          '"Joana disse que perdeu 2 horários no último mês porque anotou no papel e esqueceu de olhar."',
          ['"A Joana é muito desorganizada mesmo."', '"Joana: nota 3 de 10 em organização."', 'Não anotar nada sobre isso.'],
          'Anote fatos e falas concretas. "Desorganizada" é um julgamento seu; o fato descrito é o que ajuda a desenhar soluções.',
        ),
        `## Presencial ou remoto?

- **Presencial**: mais rapport e você vê o contexto (ambiente, objetos, gestos). Ideal para pesquisa contextual.
- **Remoto (videochamada)**: mais prático, barato e permite falar com gente de outros lugares. Peça para a pessoa compartilhar a tela quando for mostrar algo.

Em ambos: teste o equipamento antes, escolha um lugar silencioso, tenha o roteiro aberto e um copo de água por perto. 😉`,
        multi(
          'Quais atitudes atrapalham uma entrevista?',
          ['Defender o produto quando a pessoa critica', 'Interromper para fazer a próxima pergunta', 'Completar as frases da participante'],
          ['Pedir exemplos concretos', 'Parafrasear para confirmar o entendimento'],
          'Defender, interromper e completar frases desviam a conversa para você. Pedir exemplos e parafrasear mantêm o foco na pessoa.',
        ),
        fill(
          'Logo após cada entrevista, vale fazer um ___ rápido para registrar as principais impressões.',
          'debrief',
          ['briefing', 'deploy', 'backup'],
          'O debrief, feito com a memória fresca, registra surpresas e padrões antes que se percam.',
        ),
        open(
          'Imagine que, numa entrevista, a pessoa responde só "é tranquilo" para tudo. Escreva 3 perguntas de aprofundamento que você poderia usar.',
          'Exemplos: "Conte da última vez que você fez isso, passo a passo." / "Teve alguma vez em que não foi tão tranquilo?" / "Se você pudesse mudar uma coisa nesse processo, o que seria?". Pedir histórias concretas quebra respostas genéricas.',
        ),
      ],
      flashcards: [
        ['Escuta ativa', 'Ouvir com atenção total, mostrando interesse, parafraseando e sem interromper.'],
        ['Probe (aprofundamento)', 'Pergunta neutra para aprofundar uma resposta: "Pode me contar mais?"'],
        ['5 porquês', 'Técnica de perguntar "por quê?" repetidamente para chegar à causa raiz.'],
        ['Debrief', 'Conversa ou registro rápido logo após a sessão, com as principais impressões.'],
      ],
      resources: [
        { title: 'Interviewing Users (NN/g)', url: 'https://www.nngroup.com/articles/interviewing-users/', kind: 'artigo', lang: 'en' },
      ],
    },
    {
      title: 'Questionários (surveys) sem armadilhas',
      summary: 'Quando usar, tipos de pergunta, escala Likert e os erros mais comuns.',
      minutes: 15,
      steps: [
        `## Quando usar questionário

Questionários são ótimos para **quantificar**: confirmar se um padrão que apareceu nas entrevistas acontece com muita gente.

Bom fluxo de pesquisa:

1. **Entrevistas** descobrem padrões ("várias clientes esquecem os horários").
2. **Questionário** mede ("62% das clientes já esqueceram um horário no último ano").

Questionários são **ruins** para descobrir o "porquê" profundo e para prever comportamento futuro. Ferramentas gratuitas: Google Forms, Microsoft Forms, Tally.`,
        mc(
          'Em que situação um questionário é a melhor escolha?',
          'Medir quantas pessoas têm um comportamento que apareceu nas entrevistas',
          ['Entender em profundidade as emoções de 5 pessoas', 'Ver se as pessoas conseguem usar um protótipo', 'Observar a rotina de uma recepcionista'],
          'Questionários quantificam. Profundidade vem de entrevistas; uso real, de testes e observação.',
        ),
        `## Tipos de pergunta

- **Escolha única**: "Com que frequência você vai ao salão?" (semanal, mensal…)
- **Múltipla escolha**: "Quais meios você usa para agendar? (marque todos)"
- **Escala Likert**: grau de concordância — "Discordo totalmente → Concordo totalmente", normalmente 5 ou 7 pontos.
- **Abertas**: "Conte o que mais te incomoda ao agendar." (use poucas: dão trabalho para responder e para analisar)

Dicas:

- Comece com perguntas fáceis e deixe dados demográficos para o fim.
- Questionário **curto**: 5 a 10 minutos no máximo.
- **Teste** com 2 ou 3 pessoas antes de enviar (piloto).`,
        match('Ligue o tipo de pergunta ao exemplo', [
          ['Escala Likert', '"Agendar pelo WhatsApp é fácil." (discordo totalmente → concordo totalmente)'],
          ['Múltipla escolha', '"Quais meios você usa para agendar? Marque todos."'],
          ['Aberta', '"Conte o que mais te incomoda ao agendar."'],
          ['Escolha única', '"Com que frequência você vai ao salão?"'],
        ]),
        `## Erros que estragam questionários

- **Pergunta indutiva**: "Quão incrível foi nosso atendimento?"
- **Pergunta dupla**: "O app é rápido e bonito?"
- **Opções incompletas**: faixa de idade 18–25, 30–40 (e quem tem 27?). Inclua "Outro" e "Prefiro não responder".
- **Opções sobrepostas**: 1–5 vezes, 5–10 vezes (5 está nas duas).
- **Termos técnicos**: "Você usa algum SaaS de agendamento?"
- **Escala desequilibrada**: Ruim / Bom / Muito bom / Excelente (3 positivas e 1 negativa).
- **Amostra viciada**: mandar só no grupo de fãs da marca.`,
        scenario(
          'Um questionário pergunta: "Qual sua idade? ( ) 18–25 ( ) 25–35 ( ) 35–50".',
          'Quais são os problemas das opções?',
          'Há sobreposição (25 e 35 aparecem duas vezes) e faltam faixas (menos de 18 e mais de 50)',
          ['As faixas deveriam ser em meses', 'Não há problema', 'Idade nunca deve ser perguntada'],
          'Opções devem ser mutuamente exclusivas e cobrir todos os casos (ou ter "Outro"/"Prefiro não responder").',
        ),
        tf(
          'Uma escala com as opções "Ruim, Bom, Muito bom, Excelente" é equilibrada.',
          false,
          'Ela tem 1 opção negativa e 3 positivas, empurrando as respostas para o positivo. Use escalas simétricas.',
        ),
        `## Sobre o NPS

O **NPS** (*Net Promoter Score*) pergunta: "De 0 a 10, quanto você recomendaria [produto] a um amigo?". É muito usado por empresas para acompanhar a lealdade.

Mas cuidado: o NPS mede **intenção de recomendar**, não usabilidade, e um número sozinho não diz **o que** melhorar. Sempre acompanhe com uma pergunta aberta: "O que mais influenciou sua nota?".`,
        fill(
          'Antes de enviar um questionário para muita gente, é recomendado fazer um teste ___ com 2 ou 3 pessoas.',
          'piloto',
          ['A/B', 'final', 'cego'],
          'O piloto revela perguntas confusas, opções faltando e o tempo real de resposta.',
        ),
        multi(
          'Quais práticas melhoram um questionário?',
          ['Deixar perguntas demográficas para o final', 'Manter o tempo de resposta curto', 'Incluir "Outro" quando as opções podem não cobrir tudo'],
          ['Usar o máximo possível de perguntas abertas', 'Escrever perguntas que destacam as qualidades do produto'],
          'Curto, claro e completo. Muitas abertas cansam e perguntas que "vendem" o produto enviesam.',
        ),
      ],
      flashcards: [
        ['Questionário (survey)', 'Método quantitativo para medir quantas pessoas pensam ou fazem algo.'],
        ['Escala Likert', 'Escala de concordância, geralmente de 5 ou 7 pontos ("discordo totalmente" a "concordo totalmente").'],
        ['Teste piloto', 'Aplicar o questionário (ou roteiro) com poucas pessoas antes, para corrigir problemas.'],
        ['NPS (Net Promoter Score)', 'Pergunta de 0 a 10 sobre a chance de recomendar o produto. Mede lealdade, não usabilidade.'],
      ],
      resources: [
        { title: 'Google Forms', url: 'https://forms.google.com/', kind: 'ferramenta' },
      ],
    },
  ],
  practices: [
    {
      title: 'Roteiro e 3 entrevistas reais',
      summary: 'Escreva o roteiro, faça um piloto e conduza 3 entrevistas para o seu projeto.',
      minutes: 300,
      tool: 'pesquisa',
      brief: `## Hora de ir a campo! 🎙️

Esta é uma das práticas mais importantes do curso. Entrevistar dá frio na barriga no começo — e fica natural rapidinho.

### O que fazer

1. Escreva o **roteiro** (30–40 min de conversa) para o seu projeto, seguindo a estrutura: abertura, aquecimento, corpo (funil) e fechamento.
2. Faça um **piloto** com alguém próximo (não conta nas 3).
3. Recrute e conduza **3 entrevistas** com pessoas do perfil (presencial ou por vídeo).
4. Registre **notas organizadas** de cada uma.

### Modelo de abertura

> "Oi, [nome]! Obrigada por topar. Estou estudando como as pessoas [tema] e quero ouvir a sua experiência. Não existe resposta certa ou errada — o que importa é o seu jeito de fazer as coisas. A conversa dura uns 30 minutos. Posso gravar o áudio só para não perder nada? Ele não será compartilhado. Você pode parar quando quiser."

### Modelo de notas (uma página por entrevista)

- **Perfil** (anonimizado): P1, 34 anos, manicure autônoma, atende em casa
- **Contexto e rotina**
- **Falas marcantes** (entre aspas)
- **Dores / dificuldades**
- **Gambiarras** (soluções improvisadas que a pessoa criou)
- **Surpresas**`,
      steps: [
        'Escreva o roteiro com pelo menos 10 perguntas abertas, incluindo 3 do tipo "Conte da última vez que…".',
        'Revise o roteiro procurando perguntas indutivas, duplas ou hipotéticas — e corrija.',
        'Faça um **piloto** com alguém próximo e ajuste o que não funcionou.',
        'Recrute 3 pessoas do perfil definido no seu plano (use um screener simples).',
        'Conduza as 3 entrevistas, gravando com consentimento.',
        'Após cada uma, faça um debrief de 10 minutos e preencha a página de notas.',
        'Escreva 5 padrões ou surpresas que você percebeu comparando as 3 entrevistas.',
      ],
      deliverable: 'Link do documento com o roteiro final, as notas das 3 entrevistas (anonimizadas) e os 5 padrões/surpresas.',
      rubric: [
        'O roteiro segue a estrutura abertura → aquecimento → funil → fechamento',
        'As perguntas são abertas e sem indução',
        'Fiz o piloto e ajustei o roteiro',
        'Conduzi 3 entrevistas com pessoas do perfil',
        'Pedi consentimento para gravar',
        'As notas separam fatos/falas de interpretações',
        'Anonimizei os participantes',
        'Listei 5 padrões ou surpresas',
      ],
      tips: [
        'Ferramentas como o gravador do celular ou a transcrição automática do Google Meet/Teams poupam muito tempo.',
        'Se a conversa fugir do roteiro mas estiver rica, deixe fluir.',
        'Agradeça com algo simples: um café, um chocolate, um cartão.',
      ],
    },
  ],
  checkpointExtra: [
    scenario(
      'Uma pesquisadora começa a entrevista perguntando: "Qual funcionalidade você gostaria no nosso app?"',
      'Por que esse não é um bom começo?',
      'Pede para a pessoa desenhar soluções em vez de contar sobre suas experiências, e pula o aquecimento',
      ['Porque deveria perguntar o nome completo primeiro', 'Porque deveria ser em inglês', 'Porque está correta e não há problema'],
      'Pessoas são especialistas nos próprios problemas. Comece criando confiança e explorando a rotina e as dificuldades.',
    ),
    mc(
      'O que deve ser anotado como "fala marcante" nas notas?',
      'A frase literal da participante, entre aspas',
      ['O resumo da entrevistadora com suas conclusões', 'A nota que a entrevistadora daria para a participante', 'Apenas as falas que confirmam as hipóteses'],
      'Falas literais preservam a voz da pessoa e são muito persuasivas ao apresentar a pesquisa.',
    ),
    tf(
      'Em uma escala Likert, é recomendado ter o mesmo número de opções positivas e negativas.',
      true,
      'Escalas simétricas evitam empurrar as respostas para um lado.',
    ),
  ],
}
