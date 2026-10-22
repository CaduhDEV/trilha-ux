import { mc, multi, order, scenario, tf } from '../helpers'
import type { ModuleDef } from '../types'
import { u1 } from './u1'
import { u2 } from './u2'
import { u3 } from './u3'
import { u4 } from './u4'

export const m5: ModuleDef = {
  title: 'Validação e produto',
  tagline: 'Testar, incluir e entregar',
  description:
    'Você vai criar protótipos realistas, conduzir testes de usabilidade com método, garantir acessibilidade, escrever textos que guiam, evitar padrões enganosos e aprender a trabalhar com produto e desenvolvimento — do teste ao handoff.',
  color: '#15803D',
  colorDark: '#0F5F2D',
  badge: 'Designer de produto',
  outcomes: [
    'Escolher a fidelidade de protótipo certa e prototipar interações avançadas no Figma',
    'Planejar, conduzir e analisar testes de usabilidade com métricas (sucesso, SEQ, SUS)',
    'Auditar acessibilidade com base no WCAG 2.2 e na Lei Brasileira de Inclusão',
    'Escrever microcopy claro e mensagens de erro úteis',
    'Reconhecer e evitar padrões enganosos',
    'Definir métricas de produto e preparar arquivos para handoff',
  ],
  units: [u1, u2, u3, u4],
  project: {
    title: 'Projeto 5: validação completa e entrega',
    summary: 'Feche o ciclo do seu projeto: teste, itere, audite e entregue um arquivo pronto para desenvolvimento.',
    minutes: 600,
    tool: 'figma',
    brief: `## O ciclo completo de design

Este é o fechamento do seu projeto principal. Você vai mostrar que sabe **validar** e **iterar** — o que separa um portfólio júnior comum de um portfólio que chama atenção.

### O que entregar

1. **Plano e resultados do teste de usabilidade** (5 pessoas): tarefas, sucesso, SEQ, SUS e problemas priorizados.
2. **Iteração**: as mudanças feitas a partir do teste, com **antes e depois** de pelo menos 3 telas e a justificativa de cada uma.
3. **Validação da iteração**: teste rápido da versão 2 com **pelo menos 2 pessoas** — os problemas foram resolvidos?
4. **Auditoria de acessibilidade** e guia de voz e tom aplicados.
5. **Protótipo final (v2)** em alta fidelidade.
6. **Arquivo pronto para handoff** com estados, edge cases e anotações.
7. **Métricas de sucesso**: como você mediria o resultado após o lançamento (HEART).
8. **Aprendizados**: o que você faria diferente.

> 💡 Recrutadoras amam ver números e evolução: "a taxa de sucesso na tarefa de remarcar subiu de 1/5 para 5/5 depois da iteração".`,
    steps: [
      'Consolide os resultados do teste de usabilidade da semana 18.',
      'Priorize os problemas e itere o design (pelo menos 3 telas com antes/depois).',
      'Teste a versão 2 com pelo menos 2 pessoas e compare os resultados.',
      'Aplique a auditoria de acessibilidade e o guia de voz em todas as telas.',
      'Atualize o protótipo final.',
      'Finalize o arquivo de handoff.',
      'Defina as métricas HEART de sucesso.',
      'Escreva os aprendizados.',
    ],
    deliverable: 'Link do Figma com resultados do teste, iteração (antes/depois), validação da v2, auditoria, protótipo final, handoff e métricas.',
    rubric: [
      'Os resultados do teste têm métricas e problemas priorizados',
      'Iterei pelo menos 3 telas com antes/depois justificado',
      'Validei a versão 2 com pelo menos 2 pessoas',
      'A auditoria de acessibilidade foi aplicada e os problemas corrigidos',
      'Os textos seguem o guia de voz e tom',
      'O protótipo final navega pelo fluxo completo',
      'O arquivo está pronto para handoff (estados, edge cases, anotações)',
      'Defini métricas de sucesso pós-lançamento',
      'Mostrei a evolução com números (antes × depois)',
    ],
  },
  examExtra: [
    scenario(
      'Num teste, 4 de 5 participantes tocam no ícone de calendário achando que é o botão de agendar, mas ele só mostra a agenda da profissional.',
      'Como classificar e tratar esse achado?',
      'Severidade alta (frequente e atrapalha a tarefa principal); revisar o significante e o rótulo do ícone',
      ['Severidade 0, porque é só um ícone', 'Culpar as participantes por não prestarem atenção', 'Esperar mais 20 testes antes de agir'],
      'Alta frequência num fluxo crítico pede correção prioritária.',
    ),
    order(
      'Ordene o ciclo de validação:',
      ['Definir o que testar', 'Testar com 5 pessoas', 'Priorizar problemas', 'Iterar o design', 'Testar a nova versão'],
      'Testar, aprender e testar de novo: o ciclo iterativo do UX.',
    ),
    multi(
      'Quais práticas tornam um produto mais acessível?',
      ['Foco visível em todos os elementos interativos', 'Texto alternativo em imagens informativas', 'Status com ícone e texto, além da cor'],
      ['Remover o contorno de foco por estética', 'Usar placeholder como único rótulo'],
      'Acessibilidade é feita de muitos detalhes — e todos começam no design.',
    ),
    mc(
      'Qual é a melhor mensagem quando a conexão cai durante o envio de um formulário?',
      '"Sem conexão. Suas respostas estão salvas — tente enviar de novo quando a internet voltar."',
      ['"Erro de rede."', '"Você está sem internet, verifique seu aparelho."', '"Ops! 🙈"'],
      'Diz o que aconteceu, tranquiliza e orienta, sem culpar.',
    ),
    tf(
      'Um teste A/B é a melhor forma de descobrir por que as pessoas abandonam um fluxo.',
      false,
      'O A/B mostra qual versão performa melhor, mas não o porquê. Para entender motivos, use pesquisa qualitativa.',
    ),
    scenario(
      'O botão de aceitar cookies é grande e colorido; o de recusar é um link cinza minúsculo escondido no texto.',
      'O que há de errado?',
      'É um padrão enganoso de privacidade: o consentimento não é livre se recusar é muito mais difícil',
      ['Nada: aceitar é o mais comum', 'O botão de aceitar deveria ser vermelho', 'Falta uma animação no banner'],
      'A LGPD exige consentimento livre e informado; aceitar e recusar devem ter destaque equivalente.',
    ),
  ],
}
