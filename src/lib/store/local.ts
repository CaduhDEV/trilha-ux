// Modo demonstração: tudo fica no localStorage deste navegador.
import type { AuthUser, DataStore } from '.'
import { today } from '../dates'
import type { Profile, StudentOverview, Submission, UserData } from '../types'

const KEY = 'trilha-ux:demo'
const DEMO_ID = '00000000-0000-4000-8000-000000000001'

interface DemoDb {
  user: AuthUser | null
  data: UserData | null
}

function read(): DemoDb {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as DemoDb
  } catch {
    /* armazenamento indisponível */
  }
  return { user: null, data: null }
}

let mem: DemoDb = read()

function write() {
  try {
    localStorage.setItem(KEY, JSON.stringify(mem))
  } catch {
    /* sem armazenamento: segue só em memória */
  }
}

function freshData(displayName: string): UserData {
  const profile: Profile = {
    id: DEMO_ID,
    display_name: displayName,
    role: 'student',
    daily_goal_xp: 30,
    start_date: today(),
    study_days: [1, 2, 3, 4, 5, 6],
    motivation: null,
    onboarded: false,
    free_mode: false,
    created_at: new Date().toISOString(),
  }
  return { profile, progress: [], xpEvents: [], cards: [], submissions: [], achievements: [], attempts: [] }
}

function data(): UserData {
  if (!mem.data) mem.data = freshData('Você')
  return mem.data
}

const listeners = new Set<(u: AuthUser | null) => void>()
const emit = () => listeners.forEach((cb) => cb(mem.user))
const tick = () => new Promise((r) => setTimeout(r, 60))

export function localStore(): DataStore {
  return {
    mode: 'demo',

    async getUser() {
      return mem.user
    },

    onAuthChange(cb) {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },

    async signIn(email) {
      await tick()
      mem.user = { id: DEMO_ID, email }
      if (!mem.data) mem.data = freshData(email.split('@')[0] || 'Você')
      write()
      emit()
    },

    async signUp(email, _password, displayName) {
      await tick()
      mem = { user: { id: DEMO_ID, email }, data: freshData(displayName || email.split('@')[0]) }
      write()
      emit()
      return { needsConfirmation: false }
    },

    async resetPassword() {
      await tick()
    },

    async signOut() {
      mem.user = null
      write()
      emit()
    },

    async loadAll() {
      await tick()
      return structuredClone(data())
    },

    async updateProfile(_id, patch) {
      const d = data()
      d.profile = { ...d.profile, ...patch }
      write()
      return { ...d.profile }
    },

    async saveProgress(_id, p) {
      const d = data()
      d.progress = [...d.progress.filter((x) => x.item_id !== p.item_id), p]
      write()
    },

    async addXp(_id, e) {
      data().xpEvents.push(e)
      write()
    },

    async addAttempts(_id, list) {
      const d = data()
      d.attempts = [...list.map((a) => ({ exercise_id: a.exercise_id, correct: a.correct })), ...d.attempts].slice(0, 3000)
      write()
    },

    async upsertCards(_id, cards) {
      const d = data()
      const map = new Map(d.cards.map((c) => [c.card_id, c]))
      for (const c of cards) map.set(c.card_id, c)
      d.cards = [...map.values()]
      write()
    },

    async saveSubmission(_id, s) {
      const d = data()
      const prev = d.submissions.find((x) => x.practice_id === s.practice_id)
      const next: Submission = {
        link: null,
        notes: null,
        rubric: [],
        steps_done: [],
        status: 'rascunho',
        mentor_feedback: null,
        reviewed_at: null,
        ...prev,
        ...s,
        id: prev?.id ?? crypto.randomUUID(),
        user_id: DEMO_ID,
        updated_at: new Date().toISOString(),
      }
      if (prev && s.status === undefined) next.status = prev.status
      d.submissions = [...d.submissions.filter((x) => x.practice_id !== s.practice_id), next]
      write()
      return { ...next }
    },

    async unlockAchievements(_id, list) {
      const d = data()
      const have = new Set(d.achievements.map((a) => a.achievement_id))
      d.achievements.push(...list.filter((a) => !have.has(a.achievement_id)))
      write()
    },

    async mentorOverview() {
      const d = data()
      const week = new Date(Date.now() - 6 * 86_400_000).toISOString().slice(0, 10)
      const row: StudentOverview = {
        user_id: DEMO_ID,
        display_name: d.profile.display_name,
        start_date: d.profile.start_date,
        completed_items: d.progress.length,
        total_xp: d.xpEvents.reduce((s, e) => s + e.xp, 0),
        xp_7d: d.xpEvents.filter((e) => e.local_date >= week).reduce((s, e) => s + e.xp, 0),
        last_active: d.xpEvents.at(-1)?.local_date ?? null,
        pending_submissions: d.submissions.filter((s) => s.status === 'enviado').length,
      }
      return [row]
    },

    async submissionsForReview() {
      const d = data()
      return d.submissions
        .filter((s) => s.status !== 'rascunho')
        .map((s) => ({ ...s, id: s.id!, user_id: DEMO_ID, display_name: d.profile.display_name }))
    },

    async studentProgress() {
      return structuredClone(data().progress)
    },

    async reviewSubmission(id, status, feedback) {
      const d = data()
      d.submissions = d.submissions.map((s) =>
        s.id === id ? { ...s, status, mentor_feedback: feedback, reviewed_at: new Date().toISOString() } : s,
      )
      write()
    },
  }
}
