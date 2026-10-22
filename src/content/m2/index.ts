import { match, mc, multi, scenario, tf } from '../helpers'
import type { ModuleDef } from '../types'
import { u1 } from './u1'
import { u2 } from './u2'
import { u3 } from './u3'
import { u4 } from './u4'

export const m2: ModuleDef = {
  title: 'Pesquisa com usuários',
  tagline: 'Entender pessoas antes de desenhar',
  description:
    'Você vai aprender a planejar e conduzir pesquisas, entrevistar pessoas reais, sintetizar o que ouviu em insights e personas, mapear jornadas e analisar concorrentes. É aqui que começa o projeto que vai virar o principal estudo de caso do seu portfólio.',
  color: '#1A6FD1',
  colorDark: '#12549F',
  badge: 'Pesquisadora(or) de UX',
  outcomes: [
    'Escolher o método de pesquisa certo para cada pergunta',
    'Escrever um plano de pesquisa e um roteiro sem vieses',
    'Conduzir entrevistas com escuta ativa e respeito à LGPD',
    'Sintetizar dados com diagrama de afinidade e escrever insights',
    'Criar personas, mapas de empatia e mapas de jornada baseados em dados',
    'Fazer análise competitiva e comunicar achados acionáveis',
  ],
  units: [u1, u2, u3, u4],
  project: {
    title: 'Projeto 2: dossiê de pesquisa',
    summary: 'Reúna toda a pesquisa do seu projeto num dossiê claro, com problema definido e oportunidades.',
    minutes: 480,
    tool: 'figjam',
    brief: `## O alicerce do seu estudo de caso

Neste projeto você organiza **toda a pesquisa** do seu projeto num único arquivo, pronto para ser apresentado — e, mais tarde, para virar a primeira metade do seu estudo de caso.

### O dossiê deve conter

1. **Capa e resumo executivo** (meia página): tema, objetivo, o que você descobriu, o problema definido.
2. **Plano de pesquisa** (revisado).
3. **Participantes**: tabela anonimizada com perfil das **5 pessoas entrevistadas** (no mínimo).
4. **Síntese**: diagrama de afinidade e os **3 a 5 principais insights**, cada um com evidências (falas, frequência).
5. **Persona** e **mapa de empatia**.
6. **Mapa de jornada atual** com dores e oportunidades.
7. **Análise competitiva**: matriz e lacunas.
8. **Definição do problema**: job story, problem statement e as perguntas "Como poderíamos…?" priorizadas.
9. **Aprendizados**: o que você faria diferente na pesquisa.

> 💡 Pense em quem vai ler: uma recrutadora com 5 minutos. O resumo e os insights precisam estar claros logo no início.`,
    steps: [
      'Garanta que você tem pelo menos 5 entrevistas. Se faltar, faça agora.',
      'Revise o diagrama de afinidade com as novas entrevistas e atualize os insights.',
      'Atualize persona, mapa de empatia e jornada com o que mudou.',
      'Monte o dossiê num único arquivo (FigJam, Figma ou Notion), na ordem sugerida.',
      'Escreva o resumo executivo por último (fica mais fácil depois de tudo pronto).',
      'Mostre o dossiê para alguém de fora e peça para a pessoa explicar o problema com as palavras dela. Se ela não conseguir, simplifique.',
      'Escreva os aprendizados.',
    ],
    deliverable: 'Link do dossiê de pesquisa completo (FigJam, Figma ou Notion).',
    rubric: [
      'Fiz pelo menos 5 entrevistas com pessoas do perfil',
      'O resumo executivo permite entender o problema em 1 minuto',
      'Os insights têm evidências (falas e frequência)',
      'Persona, mapa de empatia e jornada são consistentes com os dados',
      'A análise competitiva inclui concorrentes indiretos e aponta lacunas',
      'O problema está definido sem citar uma solução',
      'Priorizei as perguntas "Como poderíamos…?"',
      'Os participantes estão anonimizados',
      'Testei a clareza do dossiê com uma pessoa de fora',
    ],
    tips: [
      'Menos é mais: 3 insights fortes valem mais que 10 fracos.',
      'Inclua 2 ou 3 fotos do processo (post-its, entrevistas com autorização) — recrutadores adoram ver o "making of".',
    ],
  },
  examExtra: [
    scenario(
      'O time de um app de farmácia quer saber se idosos conseguem usar a nova tela de pedido de receitas.',
      'Qual método responde melhor?',
      'Teste de usabilidade com pessoas idosas usando a tela',
      ['Questionário online sobre preferências', 'Análise competitiva', 'Card sorting'],
      'A pergunta é "conseguem usar?" — isso se responde observando pessoas do perfil tentando realizar a tarefa.',
    ),
    scenario(
      'Na entrevista, a participante diz: "Eu nunca esqueço meus horários." Depois, mostra no celular 3 lembretes perdidos e um caderno cheio de horários riscados.',
      'Como a pesquisadora deve registrar isso?',
      'Registrar a fala e o comportamento observado — a contradição é um dado valioso',
      ['Considerar só o que ela disse', 'Considerar só o caderno e apagar a fala', 'Descartar a entrevista por ser contraditória'],
      'Contradições entre o que se diz e o que se faz costumam esconder os melhores insights.',
    ),
    match('Ligue o artefato à pergunta que ele responde', [
      ['Persona', 'Para quem estamos desenhando?'],
      ['Mapa de jornada', 'Como é a experiência ao longo do tempo?'],
      ['Problem statement', 'Qual problema vamos resolver e por quê?'],
      ['Matriz competitiva', 'O que as alternativas oferecem e onde falham?'],
    ]),
    multi(
      'Quais são sinais de uma pesquisa mal conduzida?',
      ['Perguntas como "Você usaria nosso app?"', 'Entrevistar apenas amigos próximos que adoram a ideia', 'Agrupar post-its em categorias definidas antes de olhar os dados'],
      ['Fazer um piloto do roteiro', 'Pedir consentimento para gravar'],
      'Perguntas hipotéticas, amostra viciada e categorias prontas distorcem os resultados.',
    ),
    mc(
      'O que diferencia um insight de uma observação?',
      'O insight explica o porquê de um comportamento e aponta uma oportunidade',
      ['O insight é sempre um número', 'A observação é mais importante', 'Não há diferença'],
      'Observação = o que aconteceu. Insight = por que acontece e o que isso significa para o design.',
    ),
    tf(
      'Concorrentes indiretos, como WhatsApp e caderninho, devem fazer parte da análise competitiva.',
      true,
      'Muitas vezes são a principal alternativa real das pessoas.',
    ),
  ],
}
