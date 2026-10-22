import { mc, multi, scenario, tf } from '../helpers'
import type { ModuleDef } from '../types'
import { u1 } from './u1'
import { u2 } from './u2'
import { u3 } from './u3'
import { u4 } from './u4'

export const m1: ModuleDef = {
  title: 'Fundamentos de UX',
  tagline: 'Aprender a pensar como designer',
  description:
    'Você vai entender o que é UX, como designers trabalham, o que torna algo fácil de usar e como a mente humana percebe interfaces. E vai dar os primeiros passos no Figma.',
  color: '#7C4DFF',
  colorDark: '#5B2FD6',
  badge: 'Aprendiz de UX',
  outcomes: [
    'Explicar a diferença entre UX e UI com exemplos',
    'Descrever os processos de Design Thinking, Double Diamond e Lean UX',
    'Fazer uma avaliação heurística com as 10 heurísticas de Nielsen',
    'Usar leis de UX e princípios da Gestalt para justificar decisões',
    'Criar frames, formas, textos e alinhamentos no Figma',
  ],
  units: [u1, u2, u3, u4],
  project: {
    title: 'Projeto 1: análise de experiência com proposta de melhorias',
    summary: 'Avalie a fundo uma tarefa de um app real e proponha 3 melhorias com "antes e depois" no Figma.',
    minutes: 480,
    tool: 'figma',
    brief: `## Seu primeiro projeto de portfólio (versão "estudo")

Você vai juntar tudo do mês: olhar de usuária, heurísticas, leis de UX, Gestalt e Figma.

### O desafio

Escolha **um serviço digital que muita gente usa e que tem problemas** — por exemplo: o site da prefeitura para emitir uma guia, o app da companhia de luz, um app de farmácia, o agendamento de um laboratório.

Escolha **uma tarefa importante** (ex.: "emitir a segunda via da conta") e entregue uma página no Figma com:

1. **Contexto**: qual serviço, qual tarefa, quem costuma fazer essa tarefa.
2. **Fluxo atual**: prints de cada tela da tarefa, em sequência, com setas.
3. **Problemas**: no mínimo 6, cada um com heurística/lei de UX e severidade.
4. **3 melhorias**: para os 3 problemas mais graves, um **"antes e depois"**: o print original ao lado de uma versão melhorada que você desenhou no Figma (pode ser simples, em tons de cinza).
5. **Justificativa**: para cada melhoria, 2–3 frases explicando a decisão usando o que você aprendeu ("aumentei o botão por causa da Lei de Fitts…").
6. **Aprendizados**: o que você faria diferente com mais tempo.

> 💡 Ainda não precisa ficar bonito. Precisa ficar **claro**. Organização da página conta muito: títulos, seções, alinhamento.`,
    steps: [
      'Escolha o serviço e a tarefa. Faça a tarefa você mesma(o), tirando prints de todas as telas.',
      'No Figma, crie uma página "Projeto 1" e monte o **fluxo atual** com os prints lado a lado e setas.',
      'Faça a avaliação heurística da tarefa e liste pelo menos 6 problemas com severidade.',
      'Escolha os 3 problemas mais graves e desenhe uma versão melhorada de cada tela.',
      'Monte os blocos "antes e depois" com a justificativa de cada melhoria.',
      'Escreva o contexto no topo e os aprendizados no final.',
      '**Bônus**: peça para uma pessoa próxima tentar a tarefa no app original enquanto você observa em silêncio. Anote onde ela travou.',
      'Revise a organização da página: títulos, alinhamentos e espaços consistentes.',
    ],
    deliverable: 'Link do Figma com a página do projeto: contexto, fluxo atual, problemas, 3 antes/depois com justificativas e aprendizados.',
    rubric: [
      'O contexto (serviço, tarefa e público) está claro',
      'O fluxo atual está documentado com prints em sequência',
      'Listei pelo menos 6 problemas com heurística e severidade',
      'Fiz 3 propostas de melhoria no formato antes/depois',
      'Cada melhoria tem justificativa baseada em heurísticas, leis de UX ou Gestalt',
      'A página está organizada, com títulos e alinhamentos consistentes',
      'Escrevi os aprendizados',
      'Fiz a observação bônus com uma pessoa real',
    ],
    tips: [
      'Use seções (Shift+S) no Figma para separar as partes da página.',
      'Um bom antes/depois mostra a mesma tela, no mesmo tamanho, lado a lado.',
      'Guarde este projeto: no módulo 6 você vai transformá-lo em estudo de caso.',
    ],
  },
  examExtra: [
    scenario(
      'Ao enviar um formulário de inscrição, a página recarrega e mostra o formulário vazio de novo, sem nenhuma mensagem.',
      'Qual é o problema mais grave de usabilidade?',
      'Falta de feedback: a pessoa não sabe se a inscrição deu certo (visibilidade do status)',
      ['O formulário deveria ter mais campos', 'A cor do botão de envio', 'A falta de um vídeo explicativo'],
      'Sem confirmação, a pessoa pode reenviar várias vezes ou desistir achando que falhou.',
    ),
    scenario(
      'Uma equipe passou 2 meses construindo um recurso de "lista de desejos" porque o diretor achou uma boa ideia. Ninguém usa.',
      'Que prática de processo poderia ter evitado isso?',
      'Investigar o problema com pessoas reais e testar a ideia com um protótipo antes de construir',
      ['Construir mais rápido', 'Usar outra ferramenta de design', 'Fazer um logo novo para o recurso'],
      'Primeiro diamante + teste barato. A hipótese "as pessoas querem uma lista de desejos" deveria ter sido validada antes.',
    ),
    multi(
      'Quais decisões de design são justificadas pela Lei de Fitts?',
      ['Botão principal grande e ao alcance do polegar', 'Afastar o botão "Excluir" do botão "Salvar"'],
      ['Usar no máximo 3 cores', 'Escrever textos curtos'],
      'Fitts fala de tamanho e distância de alvos. Cores e textos são outros assuntos.',
    ),
    mc(
      'Qual frase descreve melhor uma heurística?',
      'Uma regra prática que ajuda a avaliar ou guiar decisões, sem ser lei absoluta',
      ['Uma lei matemática que nunca pode ser quebrada', 'Uma ferramenta do Figma', 'Um tipo de pesquisa com usuários'],
      'Heurísticas são "regras de bolso": úteis, mas exigem bom senso para aplicar.',
    ),
    tf(
      'Seguir convenções de outros apps (como o carrinho de compras) é recomendado pela Lei de Jakob.',
      true,
      'As pessoas trazem expectativas de outros produtos. Respeitá-las reduz a curva de aprendizado.',
    ),
    scenario(
      'Num app de academia, o horário da aula aparece em letras pequenas e cinza no fim do card, enquanto o nome da professora está enorme no topo.',
      'Qual conceito explica por que as pessoas reclamam que "não acham o horário"?',
      'Hierarquia e escaneabilidade: a informação mais importante para a tarefa não está em destaque nem no início',
      ['Efeito Zeigarnik', 'Lei de Tesler', 'Fechamento da Gestalt'],
      'As pessoas escaneiam. Se o horário é o que importa para decidir, ele deve aparecer com destaque e cedo.',
    ),
  ],
}
