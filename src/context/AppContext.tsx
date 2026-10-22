import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { course } from '../content'
import { XP } from '../content/build'
import type { LessonItem, PathItem, PracticeItem, QuizItem } from '../content/types'
import { today } from '../lib/dates'
import {
  achievementById,
  computeStreak,
  earnedAchievements,
  levelFromXp,
  xpByDay,
  type AchievementDef,
} from '../lib/gamification'
import { newCard, review, type Grade } from '../lib/srs'
import { store, type AuthUser } from '../lib/store'
import type {
  Attempt,
  ItemProgress,
  ProfilePatch,
  SrsCard,
  Submission,
  UserData,
  XpEvent,
  XpSource,
} from '../lib/types'

// ---------------------------------------------------------------------
// Toasts
// ---------------------------------------------------------------------
export interface Toast {
  id: number
  kind: 'info' | 'error' | 'achievement' | 'xp'
  title: string
  body?: string
  icon?: string
}

// ---------------------------------------------------------------------
// Contexto
// ---------------------------------------------------------------------
export interface Derived {
  progress: Map<string, ItemProgress>
  completed: Set<string>
  byDay: Map<string, number>
  totalXp: number
  todayXp: number
  streak: number
  doneToday: boolean
  level: ReturnType<typeof levelFromXp>
  cards: Map<string, SrsCard>
  dueCards: SrsCard[]
  submissions: Map<string, Submission>
  unlocked: Set<string>
  /** Próximo item a fazer na trilha */
  current: PathItem | null
  modulesDone: number[]
  /** exercise_id → nº de erros recentes */
  misses: Map<string, number>
  isUnlocked: (id: string) => boolean
}

interface LessonResult {
  mistakes: number
  attempts: Attempt[]
  firstTryCorrect: number
  total: number
}

interface AppCtx {
  authReady: boolean
  user: AuthUser | null
  data: UserData | null
  loadError: string | null
  d: Derived | null
  toasts: Toast[]
  notify: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
  reload: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (patch: ProfilePatch) => Promise<void>
  finishLesson: (item: LessonItem, r: LessonResult) => Promise<{ xp: number; score: number; newCards: number }>
  finishQuiz: (item: QuizItem, score: number, attempts: Attempt[]) => Promise<{ xp: number; passed: boolean }>
  saveSubmission: (item: PracticeItem, patch: Partial<Submission>, submit?: boolean) => Promise<{ xp: number }>
  reviewCard: (cardId: string, grade: Grade) => Promise<void>
  finishCardSession: (count: number) => Promise<number>
  finishTraining: (attempts: Attempt[]) => Promise<number>
}

const Ctx = createContext<AppCtx | null>(null)

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp fora do AppProvider')
  return ctx
}

/** Para telas internas, onde já sabemos que há usuário e dados. */
export function useData() {
  const ctx = useApp()
  if (!ctx.data || !ctx.d || !ctx.user) throw new Error('Dados ainda não carregados')
  return { ...ctx, data: ctx.data, d: ctx.d, user: ctx.user }
}

function derive(data: UserData): Derived {
  const progress = new Map(data.progress.map((p) => [p.item_id, p]))
  const completed = new Set(progress.keys())
  const byDay = xpByDay(data.xpEvents)
  const totalXp = data.xpEvents.reduce((s, e) => s + e.xp, 0)
  const t = today()
  const { streak, doneToday } = computeStreak(byDay, t)
  const cards = new Map(data.cards.map((c) => [c.card_id, c]))
  const dueCards = data.cards.filter((c) => c.due_date <= t && course.flashcardById.has(c.card_id))
  const submissions = new Map(data.submissions.map((s) => [s.practice_id, s]))

  const unlocked = new Set<string>()
  let current: PathItem | null = null
  for (const item of course.items) {
    const prev = item.order > 0 ? course.items[item.order - 1] : null
    const open = data.profile.free_mode || !prev || completed.has(prev.id) || completed.has(item.id)
    if (open) unlocked.add(item.id)
    if (!current && open && !completed.has(item.id)) current = item
  }

  const modulesDone = course.modules
    .filter((m) => completed.has(m.exam.id) && completed.has(m.project.id))
    .map((m) => m.number)

  const misses = new Map<string, number>()
  for (const a of data.attempts) if (!a.correct) misses.set(a.exercise_id, (misses.get(a.exercise_id) ?? 0) + 1)

  return {
    progress,
    completed,
    byDay,
    totalXp,
    todayXp: byDay.get(t) ?? 0,
    streak,
    doneToday,
    level: levelFromXp(totalXp),
    cards,
    dueCards,
    submissions,
    unlocked,
    current,
    modulesDone,
    misses,
    isUnlocked: (id) => unlocked.has(id),
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [authReady, setAuthReady] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [data, setData] = useState<UserData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastId = useRef(0)
  const dataRef = useRef<UserData | null>(null)
  dataRef.current = data

  const notify = useCallback((t: Omit<Toast, 'id'>) => {
    const id = ++toastId.current
    setToasts((list) => [...list, { ...t, id }])
    setTimeout(() => setToasts((list) => list.filter((x) => x.id !== id)), t.kind === 'achievement' ? 6000 : 4000)
  }, [])
  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((x) => x.id !== id)), [])

  // Sessão
  useEffect(() => {
    let alive = true
    store.getUser().then((u) => {
      if (!alive) return
      setUser(u)
      setAuthReady(true)
    })
    const off = store.onAuthChange((u) => {
      setUser((prev) => (prev?.id === u?.id ? prev : u))
      setAuthReady(true)
    })
    return () => {
      alive = false
      off()
    }
  }, [])

  const reload = useCallback(async () => {
    if (!user) return
    try {
      setLoadError(null)
      setData(await store.loadAll(user.id))
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e))
    }
  }, [user])

  useEffect(() => {
    if (user) reload()
    else setData(null)
  }, [user, reload])

  const d = useMemo(() => (data ? derive(data) : null), [data])

  // ---------------------------------------------------------------
  // Mutações (otimistas: atualizam a tela e depois salvam)
  // ---------------------------------------------------------------
  const mutate = useCallback((fn: (prev: UserData) => UserData) => {
    setData((prev) => (prev ? fn(prev) : prev))
  }, [])

  const persist = useCallback(
    async (work: Promise<unknown>) => {
      try {
        await work
      } catch (e) {
        notify({
          kind: 'error',
          title: 'Não consegui salvar',
          body: e instanceof Error ? e.message : 'Verifique sua conexão e tente de novo.',
        })
      }
    },
    [notify],
  )

  const pushXp = useCallback(
    (source: XpSource, itemId: string | null, xp: number) => {
      if (!user || xp <= 0) return
      const ev: XpEvent = { source, item_id: itemId, xp, local_date: today(), created_at: new Date().toISOString() }
      mutate((p) => ({ ...p, xpEvents: [...p.xpEvents, ev] }))
      void persist(store.addXp(user.id, ev))
    },
    [user, mutate, persist],
  )

  const markDone = useCallback(
    (itemId: string, score: number | null) => {
      if (!user || !dataRef.current) return
      const prev = dataRef.current.progress.find((p) => p.item_id === itemId)
      const next: ItemProgress = {
        item_id: itemId,
        status: 'completed',
        best_score: score === null ? (prev?.best_score ?? null) : Math.max(score, prev?.best_score ?? 0),
        attempts: (prev?.attempts ?? 0) + 1,
        completed_at: prev?.completed_at ?? new Date().toISOString(),
      }
      mutate((p) => ({ ...p, progress: [...p.progress.filter((x) => x.item_id !== itemId), next] }))
      void persist(store.saveProgress(user.id, next))
    },
    [user, mutate, persist],
  )

  const logAttempts = useCallback(
    (attempts: Attempt[]) => {
      if (!user || !attempts.length) return
      mutate((p) => ({
        ...p,
        attempts: [...attempts.map((a) => ({ exercise_id: a.exercise_id, correct: a.correct })), ...p.attempts].slice(0, 3000),
      }))
      void persist(store.addAttempts(user.id, attempts))
    },
    [user, mutate, persist],
  )

  // Conquistas: recalcula depois de cada mudança relevante
  const flags = useRef({ perfectLesson: false, perfectExam: false })
  useEffect(() => {
    if (!data || !d || !user) return
    const facts = {
      lessonsDone: course.items.filter((i) => i.kind === 'lesson' && d.completed.has(i.id)).length,
      perfectLesson: flags.current.perfectLesson,
      practicesSent: data.submissions.filter((s) => s.status !== 'rascunho').length,
      checkpointsPassed: course.items.filter((i) => i.kind === 'checkpoint' && d.completed.has(i.id)).length,
      streak: d.streak,
      goalDays: [...d.byDay.values()].filter((xp) => xp >= data.profile.daily_goal_xp).length,
      totalXp: d.totalXp,
      cardReviews: data.xpEvents.filter((e) => e.source === 'flashcards').reduce((s, e) => s + e.xp, 0),
      perfectExam: flags.current.perfectExam,
      modulesDone: d.modulesDone,
    }
    const have = new Set(data.achievements.map((a) => a.achievement_id))
    const fresh = earnedAchievements(facts).filter((id) => !have.has(id))
    if (!fresh.length) return
    const now = new Date().toISOString()
    const rows = fresh.map((achievement_id) => ({ achievement_id, unlocked_at: now }))
    mutate((p) => ({ ...p, achievements: [...p.achievements, ...rows] }))
    void persist(store.unlockAchievements(user.id, rows))
    fresh
      .map((id) => achievementById.get(id))
      .filter((a): a is AchievementDef => !!a)
      .forEach((a) => notify({ kind: 'achievement', title: `Conquista: ${a.title}`, body: a.description, icon: a.icon }))
  }, [data, d, user, mutate, persist, notify])

  // ---------------------------------------------------------------
  // Ações
  // ---------------------------------------------------------------
  const finishLesson: AppCtx['finishLesson'] = useCallback(
    async (item, r) => {
      const already = dataRef.current?.progress.some((p) => p.item_id === item.id)
      const perfect = r.mistakes === 0
      const xp = already ? XP.lessonRepeat : XP.lesson + (perfect ? XP.lessonPerfectBonus : 0)
      const score = r.total ? Math.round((100 * r.firstTryCorrect) / r.total) : 100
      if (perfect && r.total > 0) flags.current.perfectLesson = true

      const existing = new Set(dataRef.current?.cards.map((c) => c.card_id))
      const fresh = item.flashcards.filter((f) => !existing.has(f.id)).map((f) => newCard(f.id))
      if (fresh.length && user) {
        mutate((p) => ({ ...p, cards: [...p.cards, ...fresh] }))
        void persist(store.upsertCards(user.id, fresh))
      }
      logAttempts(r.attempts)
      markDone(item.id, score)
      pushXp('lesson', item.id, xp)
      return { xp, score, newCards: fresh.length }
    },
    [user, mutate, persist, logAttempts, markDone, pushXp],
  )

  const finishQuiz: AppCtx['finishQuiz'] = useCallback(
    async (item, score, attempts) => {
      const passed = score >= item.passScore
      const already = dataRef.current?.progress.some((p) => p.item_id === item.id)
      logAttempts(attempts)
      let xp = 0
      if (passed) {
        xp = already ? XP.lessonRepeat : item.xp + (item.kind === 'exam' && score >= 90 ? XP.examHonorsBonus : 0)
        if (item.kind === 'exam' && score === 100) flags.current.perfectExam = true
        markDone(item.id, score)
        pushXp(item.kind === 'exam' ? 'exam' : 'checkpoint', item.id, xp)
      }
      return { xp, passed }
    },
    [logAttempts, markDone, pushXp],
  )

  const saveSubmission: AppCtx['saveSubmission'] = useCallback(
    async (item, patch, submit) => {
      if (!user) return { xp: 0 }
      const payload = { ...patch, practice_id: item.id, ...(submit ? { status: 'enviado' as const } : {}) }
      const prev = dataRef.current?.submissions.find((s) => s.practice_id === item.id)
      const optimistic: Submission = {
        link: null,
        notes: null,
        rubric: [],
        steps_done: [],
        status: 'rascunho',
        mentor_feedback: null,
        reviewed_at: null,
        ...prev,
        ...payload,
      }
      mutate((p) => ({ ...p, submissions: [...p.submissions.filter((s) => s.practice_id !== item.id), optimistic] }))
      try {
        const saved = await store.saveSubmission(user.id, payload)
        mutate((p) => ({ ...p, submissions: [...p.submissions.filter((s) => s.practice_id !== item.id), saved] }))
      } catch (e) {
        notify({ kind: 'error', title: 'Não consegui salvar a entrega', body: e instanceof Error ? e.message : undefined })
        throw e
      }
      let xp = 0
      if (submit && !dataRef.current?.progress.some((p) => p.item_id === item.id)) {
        xp = item.xp
        markDone(item.id, null)
        pushXp(item.kind === 'project' ? 'project' : 'practice', item.id, xp)
      }
      return { xp }
    },
    [user, mutate, notify, markDone, pushXp],
  )

  const reviewCard: AppCtx['reviewCard'] = useCallback(
    async (cardId, grade) => {
      if (!user || !dataRef.current) return
      const card = dataRef.current.cards.find((c) => c.card_id === cardId) ?? newCard(cardId, today())
      const next = review(card, grade)
      mutate((p) => ({ ...p, cards: [...p.cards.filter((c) => c.card_id !== cardId), next] }))
      void persist(store.upsertCards(user.id, [next]))
    },
    [user, mutate, persist],
  )

  const finishCardSession: AppCtx['finishCardSession'] = useCallback(
    async (count) => {
      pushXp('flashcards', null, count)
      return count
    },
    [pushXp],
  )

  const finishTraining: AppCtx['finishTraining'] = useCallback(
    async (attempts) => {
      logAttempts(attempts)
      pushXp('review', null, XP.review)
      return XP.review
    },
    [logAttempts, pushXp],
  )

  const updateProfile = useCallback(
    async (patch: ProfilePatch) => {
      if (!user) return
      mutate((p) => ({ ...p, profile: { ...p.profile, ...patch } }))
      try {
        const saved = await store.updateProfile(user.id, patch)
        mutate((p) => ({ ...p, profile: saved }))
      } catch (e) {
        notify({ kind: 'error', title: 'Não consegui salvar o perfil', body: e instanceof Error ? e.message : undefined })
      }
    },
    [user, mutate, notify],
  )

  const signOut = useCallback(async () => {
    await store.signOut()
    setUser(null)
    setData(null)
  }, [])

  const value: AppCtx = {
    authReady,
    user,
    data,
    loadError,
    d,
    toasts,
    notify,
    dismiss,
    reload,
    signOut,
    updateProfile,
    finishLesson,
    finishQuiz,
    saveSubmission,
    reviewCard,
    finishCardSession,
    finishTraining,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
