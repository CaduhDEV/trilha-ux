// Camada de dados. Com VITE_SUPABASE_URL configurada, usa o Supabase;
// sem ela, roda em "modo demonstração" salvando tudo no navegador.
import type {
  Attempt,
  ItemProgress,
  Profile,
  ProfilePatch,
  SrsCard,
  StudentOverview,
  Submission,
  SubmissionForReview,
  SubmissionStatus,
  UnlockedAchievement,
  UserData,
  XpEvent,
} from '../types'
import { localStore } from './local'
import { supabaseStore } from './supabase'
import { supabase } from '../supabase'

export interface AuthUser {
  id: string
  email: string | null
}

export interface DataStore {
  mode: 'supabase' | 'demo'

  // Autenticação
  getUser(): Promise<AuthUser | null>
  onAuthChange(cb: (user: AuthUser | null) => void): () => void
  signIn(email: string, password: string): Promise<void>
  signUp(email: string, password: string, displayName: string): Promise<{ needsConfirmation: boolean }>
  resetPassword(email: string): Promise<void>
  signOut(): Promise<void>

  // Dados da pessoa logada
  loadAll(userId: string): Promise<UserData>
  updateProfile(userId: string, patch: ProfilePatch): Promise<Profile>
  saveProgress(userId: string, p: ItemProgress): Promise<void>
  addXp(userId: string, e: XpEvent): Promise<void>
  addAttempts(userId: string, list: Attempt[]): Promise<void>
  upsertCards(userId: string, cards: SrsCard[]): Promise<void>
  saveSubmission(userId: string, s: Partial<Submission> & { practice_id: string }): Promise<Submission>
  unlockAchievements(userId: string, list: UnlockedAchievement[]): Promise<void>

  // Mentor(a)
  mentorOverview(): Promise<StudentOverview[]>
  submissionsForReview(): Promise<SubmissionForReview[]>
  studentProgress(userId: string): Promise<ItemProgress[]>
  reviewSubmission(id: string, status: SubmissionStatus, feedback: string): Promise<void>
}

export const store: DataStore = supabase ? supabaseStore(supabase) : localStore()
