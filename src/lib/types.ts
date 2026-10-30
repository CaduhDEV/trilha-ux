// Tipos dos dados da pessoa (espelham as tabelas do Supabase)

export type Role = 'student' | 'mentor'

export interface Profile {
  id: string
  display_name: string
  role: Role
  daily_goal_xp: number
  start_date: string // YYYY-MM-DD
  study_days: number[] // 0 = domingo
  motivation: string | null
  onboarded: boolean
  free_mode: boolean
  created_at: string
}

export type ProfilePatch = Partial<
  Pick<Profile, 'display_name' | 'daily_goal_xp' | 'start_date' | 'study_days' | 'motivation' | 'onboarded' | 'free_mode'>
>

export interface ItemProgress {
  item_id: string
  status: 'completed'
  best_score: number | null
  attempts: number
  completed_at: string
}

export type XpSource = 'lesson' | 'practice' | 'checkpoint' | 'exam' | 'project' | 'review' | 'flashcards'

export interface XpEvent {
  source: XpSource
  item_id: string | null
  xp: number
  local_date: string
  created_at: string
}

export interface Attempt {
  item_id: string
  exercise_id: string
  correct: boolean
  answer: unknown
}

export interface SrsCard {
  card_id: string
  ease: number
  interval_days: number
  repetitions: number
  lapses: number
  due_date: string
  last_reviewed_at: string | null
}

export type SubmissionStatus = 'rascunho' | 'enviado' | 'aprovado' | 'refazer'

export interface SubmissionFile {
  /** caminho no bucket "entregas" (ou data URL no modo demonstração) */
  path: string
  name: string
  size: number
  type: string
}

export interface Submission {
  id?: string
  user_id?: string
  practice_id: string
  link: string | null
  files: SubmissionFile[]
  notes: string | null
  rubric: boolean[]
  steps_done: boolean[]
  status: SubmissionStatus
  mentor_feedback: string | null
  reviewed_at: string | null
  updated_at?: string
}

export interface UnlockedAchievement {
  achievement_id: string
  unlocked_at: string
}

export interface UserData {
  profile: Profile
  progress: ItemProgress[]
  xpEvents: XpEvent[]
  cards: SrsCard[]
  submissions: Submission[]
  achievements: UnlockedAchievement[]
  /** Últimas respostas (para descobrir os pontos fracos) */
  attempts: { exercise_id: string; correct: boolean }[]
}

export interface StudentOverview {
  user_id: string
  display_name: string
  start_date: string
  completed_items: number
  total_xp: number
  xp_7d: number
  last_active: string | null
  pending_submissions: number
}

export interface SubmissionForReview extends Submission {
  id: string
  user_id: string
  display_name: string
}
