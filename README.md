# Trilha UX

Do zero a UX designer profissional em 6 meses — um app de aprendizagem no estilo Duolingo, com
teoria em cartões curtos, exercícios, práticas no Figma, checkpoints semanais, provas por módulo,
projetos de portfólio e repetição espaçada.

## O curso

| Mês | Módulo | Projeto |
|---|---|---|
| 1 | Fundamentos de UX | Análise de experiência com melhorias |
| 2 | Pesquisa com usuários | Dossiê de pesquisa |
| 3 | Estrutura e interação | Fluxo, wireframes e protótipo testado |
| 4 | Design de interface (UI) | Interface em alta fidelidade + mini design system |
| 5 | Validação e produto | Teste de usabilidade, iteração e handoff |
| 6 | Carreira em UX | Projeto final + portfólio publicado |

72 lições · 563 exercícios (9 tipos) · 311 flashcards · 24 práticas · 6 projetos · 24 checkpoints · 6 provas.
O conteúdo fica em `src/content/` (um arquivo por semana) e é validado por `npm test`.

## No celular (sem loja de apps)

Em produção: **https://trilha-ux.vercel.app**. O site é um app instalável (PWA): abre em tela cheia,
tem ícone próprio, funciona com internet ruim e se atualiza sozinho a cada deploy.

- **Android (Chrome):** toque em **Instalar** no aviso da trilha, ou menu ⋮ → **Instalar app**.
- **iPhone (Safari):** Compartilhar → **Adicionar à Tela de Início**.

Login e progresso sempre vão direto ao Supabase; só os arquivos do app ficam em cache.

## Rodando

```bash
npm install
npm run dev
```

Sem Supabase configurado, o app roda em **modo demonstração** (progresso salvo no navegador).

## Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode `supabase/migrations/20261022120000_schema_inicial.sql`.
3. Copie `.env.example` para `.env.local` e preencha URL e chave publishable (Project Settings → API).
4. (Opcional) Em Authentication → Providers → Email, desligue "Confirm email" para entrar sem confirmar.
5. Para virar mentor(a), cadastre-se no app e rode `supabase/promover_mentor.sql` com seu e-mail.

O banco guarda perfil, progresso, XP, sequência, cartões SM-2, entregas (com feedback da mentoria) e
conquistas, com Row Level Security: cada pessoa só vê os próprios dados; mentor(a) lê tudo e revisa entregas.

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção (deploy estático: Vercel/Netlify já configurados)
- `npm test` — testes de conteúdo, lógica (streak, SM-2, contraste) e cores
- `npm run lint` — oxlint
