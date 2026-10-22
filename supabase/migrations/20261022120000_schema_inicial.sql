-- =====================================================================
-- Trilha UX — schema inicial
-- O conteúdo do curso (módulos, lições, exercícios) vive no código
-- (src/content). O banco guarda tudo o que é da pessoa: perfil,
-- progresso, XP, sequência, repetição espaçada, entregas e conquistas.
-- Todos os ids de conteúdo são strings estáveis, ex.: "m1-u2-l3".
-- =====================================================================

-- ---------------------------------------------------------------------
-- Perfis
-- ---------------------------------------------------------------------
create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  display_name  text        not null default '',
  role          text        not null default 'student' check (role in ('student', 'mentor')),
  daily_goal_xp int         not null default 30 check (daily_goal_xp between 10 and 500),
  start_date    date        not null default current_date,
  study_days    smallint[]  not null default '{1,2,3,4,5,6}',
  motivation    text,
  onboarded     boolean     not null default false,
  free_mode     boolean     not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on column public.profiles.role is 'student = aluna(o); mentor = pode ver o progresso de todos e revisar entregas';
comment on column public.profiles.study_days is 'Dias de estudo (0 = domingo … 6 = sábado)';
comment on column public.profiles.free_mode is 'Quando true, todas as lições ficam desbloqueadas';

-- ---------------------------------------------------------------------
-- Progresso por item da trilha (lição, prática, checkpoint, prova, projeto)
-- ---------------------------------------------------------------------
create table public.item_progress (
  user_id      uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  item_id      text        not null,
  status       text        not null default 'completed' check (status in ('completed')),
  best_score   int         check (best_score between 0 and 100),
  attempts     int         not null default 1,
  completed_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  primary key (user_id, item_id)
);

-- ---------------------------------------------------------------------
-- Eventos de XP (base para meta diária, sequência e gráficos)
-- local_date é calculada no fuso da pessoa, no navegador.
-- ---------------------------------------------------------------------
create table public.xp_events (
  id         bigint generated always as identity primary key,
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  source     text        not null check (source in ('lesson', 'practice', 'checkpoint', 'exam', 'project', 'review', 'flashcards')),
  item_id    text,
  xp         int         not null check (xp between 0 and 500),
  local_date date        not null,
  created_at timestamptz not null default now()
);

create index xp_events_user_date_idx on public.xp_events (user_id, local_date);

-- ---------------------------------------------------------------------
-- Respostas a exercícios (alimenta o "treino de fixação" com os pontos fracos)
-- ---------------------------------------------------------------------
create table public.exercise_attempts (
  id          bigint generated always as identity primary key,
  user_id     uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  item_id     text        not null,
  exercise_id text        not null,
  correct     boolean     not null,
  answer      jsonb,
  created_at  timestamptz not null default now()
);

create index exercise_attempts_user_idx on public.exercise_attempts (user_id, created_at desc);

-- ---------------------------------------------------------------------
-- Cartões de repetição espaçada (algoritmo SM-2)
-- ---------------------------------------------------------------------
create table public.srs_cards (
  user_id          uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  card_id          text        not null,
  ease             real        not null default 2.5,
  interval_days    int         not null default 0,
  repetitions      int         not null default 0,
  lapses           int         not null default 0,
  due_date         date        not null,
  last_reviewed_at timestamptz,
  created_at       timestamptz not null default now(),
  primary key (user_id, card_id)
);

-- ---------------------------------------------------------------------
-- Entregas de práticas e projetos (link do Figma, autoavaliação, feedback)
-- ---------------------------------------------------------------------
create table public.submissions (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  practice_id     text        not null,
  link            text,
  notes           text,
  rubric          jsonb       not null default '[]',
  steps_done      jsonb       not null default '[]',
  status          text        not null default 'rascunho' check (status in ('rascunho', 'enviado', 'aprovado', 'refazer')),
  mentor_feedback text,
  reviewed_by     uuid        references auth.users (id),
  reviewed_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, practice_id)
);

-- ---------------------------------------------------------------------
-- Conquistas desbloqueadas
-- ---------------------------------------------------------------------
create table public.achievements (
  user_id        uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  achievement_id text        not null,
  unlocked_at    timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

-- =====================================================================
-- Funções e gatilhos
-- =====================================================================

create or replace function public.is_mentor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'mentor'
  );
$$;

-- Cria o perfil assim que alguém se cadastra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger item_progress_touch before update on public.item_progress
  for each row execute function public.touch_updated_at();

-- Quem é aluna(o) só pode mexer na própria entrega (e só para rascunho/enviado);
-- quem é mentor(a) só pode mexer no status e no feedback de entregas alheias.
create or replace function public.guard_submission()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' and public.is_mentor() and old.user_id <> auth.uid() then
    new.user_id     := old.user_id;
    new.practice_id := old.practice_id;
    new.link        := old.link;
    new.notes       := old.notes;
    new.rubric      := old.rubric;
    new.steps_done  := old.steps_done;
    new.created_at  := old.created_at;
    if new.status not in ('aprovado', 'refazer', 'enviado') then
      new.status := old.status;
    end if;
    new.reviewed_by := auth.uid();
    new.reviewed_at := now();
  elsif tg_op = 'INSERT' then
    if new.status not in ('rascunho', 'enviado') then
      new.status := 'rascunho';
    end if;
    new.mentor_feedback := null;
    new.reviewed_by     := null;
    new.reviewed_at     := null;
  else
    if new.status is distinct from old.status and new.status not in ('rascunho', 'enviado') then
      new.status := old.status;
    end if;
    new.user_id         := old.user_id;
    new.practice_id     := old.practice_id;
    new.mentor_feedback := old.mentor_feedback;
    new.reviewed_by     := old.reviewed_by;
    new.reviewed_at     := old.reviewed_at;
    new.created_at      := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger submissions_guard before insert or update on public.submissions
  for each row execute function public.guard_submission();

-- Painel do(a) mentor(a): um resumo por aluna(o)
create or replace function public.mentor_overview()
returns table (
  user_id             uuid,
  display_name        text,
  start_date          date,
  completed_items     int,
  total_xp            int,
  xp_7d               int,
  last_active         date,
  pending_submissions int
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    p.id,
    p.display_name,
    p.start_date,
    (select count(*)::int from public.item_progress ip where ip.user_id = p.id),
    coalesce((select sum(x.xp)::int from public.xp_events x where x.user_id = p.id), 0),
    coalesce((select sum(x.xp)::int from public.xp_events x where x.user_id = p.id and x.local_date >= current_date - 6), 0),
    (select max(x.local_date) from public.xp_events x where x.user_id = p.id),
    (select count(*)::int from public.submissions s where s.user_id = p.id and s.status = 'enviado')
  from public.profiles p
  where public.is_mentor() and p.role = 'student'
  order by p.display_name;
$$;

-- =====================================================================
-- Permissões e Row Level Security
-- =====================================================================

-- Ninguém promove a si mesmo a mentor: só algumas colunas do perfil são editáveis.
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (display_name, daily_goal_xp, start_date, study_days, motivation, onboarded, free_mode)
  on public.profiles to authenticated;

revoke all on function public.mentor_overview() from anon, public;
grant execute on function public.mentor_overview() to authenticated;

alter table public.profiles          enable row level security;
alter table public.item_progress     enable row level security;
alter table public.xp_events         enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.srs_cards         enable row level security;
alter table public.submissions       enable row level security;
alter table public.achievements      enable row level security;

-- profiles
create policy "perfil: ler o próprio ou ser mentor" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or public.is_mentor());
create policy "perfil: editar o próprio" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Tabelas "da pessoa": dona faz tudo, mentor(a) só lê.
create policy "progresso: dona" on public.item_progress
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "progresso: mentor lê" on public.item_progress
  for select to authenticated using (public.is_mentor());

create policy "xp: dona" on public.xp_events
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "xp: mentor lê" on public.xp_events
  for select to authenticated using (public.is_mentor());

create policy "tentativas: dona" on public.exercise_attempts
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "tentativas: mentor lê" on public.exercise_attempts
  for select to authenticated using (public.is_mentor());

create policy "cartões: dona" on public.srs_cards
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy "conquistas: dona" on public.achievements
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "conquistas: mentor lê" on public.achievements
  for select to authenticated using (public.is_mentor());

-- submissions
create policy "entregas: ler as próprias ou ser mentor" on public.submissions
  for select to authenticated using (user_id = (select auth.uid()) or public.is_mentor());
create policy "entregas: criar as próprias" on public.submissions
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "entregas: editar as próprias ou revisar" on public.submissions
  for update to authenticated
  using (user_id = (select auth.uid()) or public.is_mentor())
  with check (user_id = (select auth.uid()) or public.is_mentor());
create policy "entregas: apagar as próprias" on public.submissions
  for delete to authenticated using (user_id = (select auth.uid()));
