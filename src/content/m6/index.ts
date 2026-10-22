import { mc, multi, order, scenario, tf } from '../helpers'
import type { ModuleDef } from '../types'
import { u1 } from './u1'
import { u2 } from './u2'
import { u3 } from './u3'
import { u4 } from './u4'

export const m6: ModuleDef = {
  title: 'Carreira em UX',
  tagline: 'Portfólio, entrevistas e o primeiro emprego',
  description:
    'O último mês transforma o que você aprendeu em oportunidades: estudos de caso, portfólio publicado, currículo e LinkedIn, preparação para desafios e entrevistas, uso responsável de IA e um projeto final feito em ritmo de mercado.',
  color: '#4F5BD5',
  colorDark: '#3741A8',
  badge: 'UX Designer',
  outcomes: [
    'Escrever estudos de caso claros, honestos e escaneáveis',
    'Publicar um portfólio com 3 estudos de caso',
    'Preparar currículo, LinkedIn e um kit de candidatura',
    'Resolver desafios de design mostrando o raciocínio',
    'Responder entrevistas com STAR e negociar com informação',
    'Usar IA com responsabilidade e planejar o crescimento contínuo',
  ],
  cumulativeExam: true,
  units: [u1, u2, u3, u4],
  project: {
    title: 'Projeto final: um novo estudo de caso em ritmo de mercado',
    summary: 'Em 2 semanas, resolva um problema novo de ponta a ponta e publique como seu terceiro estudo de caso.',
    minutes: 1200,
    tool: 'figma',
    brief: `## A sua formatura 🎓

Para provar (para o mercado e para você mesma) que consegue fazer **sozinha** e **em pouco tempo** tudo o que aprendeu, faça um projeto novo de ponta a ponta em **2 semanas**.

### Escolha um desafio

1. **Serviço público**: agendamento de consultas ou vacinas numa unidade básica de saúde do seu bairro.
2. **Organização local**: site responsivo para uma ONG, associação ou projeto social (de preferência real, com pessoas que você conheça).
3. **Pequeno negócio**: a experiência de pedidos de uma padaria, feira ou loja do bairro.

### Requisitos

- **Pesquisa rápida**: desk research + **3 entrevistas** (ou observação no local).
- **Síntese**: insights, persona enxuta, problema e "Como poderíamos…?".
- **Fluxo** e **wireframes**.
- **UI em alta fidelidade** usando um **design system pronto** (por exemplo, o **gov.br Design System** para o serviço público, ou o **Material 3**) — mostra que você sabe trabalhar com sistemas existentes, como no mercado.
- Pelo menos **uma tela responsiva** (celular e desktop).
- **Teste de usabilidade com 3 pessoas** e **1 iteração**.
- **Acessibilidade**: checklist aplicado.
- **Estudo de caso publicado** no portfólio.

### Cronograma sugerido

| Dias | Etapa |
|---|---|
| 1–3 | Desk research, entrevistas e síntese |
| 4–5 | Ideação, fluxo e wireframes |
| 6–8 | UI com design system e protótipo |
| 9–10 | Teste com 3 pessoas e iteração |
| 11–14 | Estudo de caso e publicação |`,
    steps: [
      'Escolha o desafio e escreva o plano de 2 semanas.',
      'Faça a desk research e 3 entrevistas (ou observação).',
      'Sintetize: insights, persona enxuta, problema e "Como poderíamos…?".',
      'Desenhe o fluxo e os wireframes.',
      'Crie a UI em alta fidelidade usando um design system pronto, com uma tela responsiva.',
      'Monte o protótipo e teste com 3 pessoas.',
      'Itere com base no teste e aplique o checklist de acessibilidade.',
      'Escreva e publique o estudo de caso no portfólio.',
      'Atualize o LinkedIn com o novo case. Você é UX designer! 🎉',
    ],
    deliverable: 'Link do estudo de caso publicado no portfólio + link do arquivo do Figma.',
    rubric: [
      'Concluí o projeto em cerca de 2 semanas, seguindo um plano',
      'Fiz pesquisa com pelo menos 3 pessoas reais',
      'O problema está bem definido e conectado aos insights',
      'Há fluxo e wireframes antes da UI',
      'A UI usa um design system pronto de forma consistente',
      'Há pelo menos uma tela responsiva',
      'Testei com 3 pessoas e fiz 1 iteração',
      'Apliquei o checklist de acessibilidade',
      'O estudo de caso está publicado, claro e escaneável',
    ],
    tips: [
      'O gov.br Design System tem um kit no Figma disponível na Comunidade — busque por "gov.br design system".',
      'Prazo curto exige foco: um público, um problema, um fluxo principal.',
    ],
    resources: [
      { title: 'Padrão Digital de Governo — gov.br Design System', url: 'https://www.gov.br/ds/', kind: 'site', lang: 'pt' },
      { title: 'Material Design 3', url: 'https://m3.material.io/', kind: 'site', lang: 'en' },
    ],
  },
  examExtra: [
    scenario(
      'Você recebe o desafio: "Melhore a experiência de pedir segunda via de documentos no site da prefeitura." Tem 1 hora.',
      'Qual deve ser o seu primeiro passo?',
      'Fazer perguntas sobre público, objetivo, contexto e restrições, e então definir um foco',
      ['Desenhar a tela inicial em alta fidelidade', 'Escolher as cores do site', 'Listar todas as técnicas de UX que você conhece'],
      'Entender antes de resolver — o princípio que atravessa a trilha inteira.',
    ),
    order(
      'Ordene o processo completo de um projeto de UX, como você aprendeu na trilha:',
      ['Pesquisar e entender as pessoas', 'Definir o problema', 'Idear e priorizar', 'Estruturar fluxos e wireframes', 'Desenhar a interface', 'Testar e iterar'],
      'Do problema à solução validada: o caminho dos 6 meses.',
    ),
    multi(
      'Quais elementos tornam um estudo de caso forte?',
      ['Problema com evidência de pesquisa', 'Decisões justificadas e trade-offs', 'Resultados de teste e aprendizados'],
      ['Lista de todas as ferramentas usadas', 'Telas bonitas sem contexto'],
      'Raciocínio, evidências e resultados — não ferramentas e enfeites.',
    ),
    mc(
      'Qual afirmação sobre IA no trabalho de UX está correta?',
      'Ela acelera tarefas, mas não substitui a pesquisa com pessoas reais nem o julgamento do designer',
      ['Ela substitui completamente a pesquisa com usuários', 'Ela garante sozinha que o design é acessível', 'Ela deve ser evitada em qualquer situação'],
      'Use IA como assistente, com verificação, ética e respeito à privacidade.',
    ),
    tf(
      'Em entrevistas, perguntas do tipo "Conte uma vez em que…" devem ser respondidas com histórias reais, usando o formato STAR.',
      true,
      'Situação, Tarefa, Ação e Resultado: estrutura clara e convincente.',
    ),
  ],
}
