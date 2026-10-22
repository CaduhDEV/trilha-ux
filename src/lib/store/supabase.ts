import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { AuthUser, DataStore } from '.'
import type { ItemProgress, Profile, StudentOverview, Submission, SubmissionForReview, UserData } from '../types'

const toUser = (u: User | null | undefined): AuthUser | null => (u ? { id: u.id, email: u.email ?? null } : null)

function check<T>(res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(translate(res.error.message))
  return res.data as T
}

function translate(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('invalid login credentials')) return 'E-mail ou senha incorretos.'
  if (m.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar (veja sua caixa de entrada).'
  if (m.includes('user already registered')) return 'Já existe uma conta com esse e-mail.'
  if (m.includes('password should be at least')) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (m.includes('rate limit')) return 'Muitas tentativas seguidas. Espere um pouco e tente de novo.'
  if (m.includes('failed to fetch')) return 'Sem conexão com o servidor. Verifique sua internet.'
  return msg
}

const PAGE = 1000

/** Busca todas as linhas, paginando de 1000 em 1000 */
async function all<T>(query: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>) {
  const rows: T[] = []
  for (let from = 0; ; from += PAGE) {
    const res = await query(from, from + PAGE - 1)
    const data = check(res) ?? []
    rows.push(...data)
    if (data.length < PAGE) break
  }
  return rows
}

export function supabaseStore(sb: SupabaseClient): DataStore {
  return {
    mode: 'supabase',

    async getUser() {
      const { data } = await sb.auth.getSession()
      return toUser(data.session?.user)
    },

    onAuthChange(cb) {
      const { data } = sb.auth.onAuthStateChange((_event, session) => cb(toUser(session?.user)))
      return () => data.subscription.unsubscribe()
    },

    async signIn(email, password) {
      const { error } = await sb.auth.signInWithPassword({ email, password })
      if (error) throw new Error(translate(error.message))
    },

    async signUp(email, password, displayName) {
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName }, emailRedirectTo: window.location.origin },
      })
      if (error) throw new Error(translate(error.message))
      return { needsConfirmation: !data.session }
    },

    async resetPassword(email) {
      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/perfil` })
      if (error) throw new Error(translate(error.message))
    },

    async signOut() {
      await sb.auth.signOut()
    },

    async loadAll(userId) {
      const [profile, progress, xpEvents, cards, submissions, achievements, attempts] = await Promise.all([
        sb.from('profiles').select('*').eq('id', userId).single().then(check<Profile>),
        all<ItemProgress>((f, t) =>
          sb.from('item_progress').select('item_id,status,best_score,attempts,completed_at').eq('user_id', userId).range(f, t),
        ),
        all<UserData['xpEvents'][number]>((f, t) =>
          sb
            .from('xp_events')
            .select('source,item_id,xp,local_date,created_at')
            .eq('user_id', userId)
            .order('created_at')
            .range(f, t),
        ),
        all<UserData['cards'][number]>((f, t) =>
          sb
            .from('srs_cards')
            .select('card_id,ease,interval_days,repetitions,lapses,due_date,last_reviewed_at')
            .eq('user_id', userId)
            .range(f, t),
        ),
        sb.from('submissions').select('*').eq('user_id', userId).then(check<Submission[]>),
        sb.from('achievements').select('achievement_id,unlocked_at').eq('user_id', userId).then(check<UserData['achievements']>),
        sb
          .from('exercise_attempts')
          .select('exercise_id,correct')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(3000)
          .then(check<UserData['attempts']>),
      ])
      return { profile, progress, xpEvents, cards, submissions: submissions ?? [], achievements: achievements ?? [], attempts: attempts ?? [] }
    },

    async updateProfile(userId, patch) {
      return check(await sb.from('profiles').update(patch).eq('id', userId).select('*').single<Profile>())
    },

    async saveProgress(userId, p) {
      check(await sb.from('item_progress').upsert({ ...p, user_id: userId }, { onConflict: 'user_id,item_id' }))
    },

    async addXp(userId, e) {
      check(await sb.from('xp_events').insert({ ...e, user_id: userId, created_at: undefined }))
    },

    async addAttempts(userId, list) {
      if (!list.length) return
      check(await sb.from('exercise_attempts').insert(list.map((a) => ({ ...a, user_id: userId }))))
    },

    async upsertCards(userId, cards) {
      if (!cards.length) return
      check(await sb.from('srs_cards').upsert(cards.map((c) => ({ ...c, user_id: userId })), { onConflict: 'user_id,card_id' }))
    },

    async saveSubmission(userId, s) {
      const payload: Record<string, unknown> = { ...s, user_id: userId }
      delete payload.id
      delete payload.mentor_feedback
      delete payload.reviewed_at
      delete payload.updated_at
      return check(
        await sb.from('submissions').upsert(payload, { onConflict: 'user_id,practice_id' }).select('*').single<Submission>(),
      )
    },

    async unlockAchievements(userId, list) {
      if (!list.length) return
      check(
        await sb
          .from('achievements')
          .upsert(list.map((a) => ({ ...a, user_id: userId })), { onConflict: 'user_id,achievement_id', ignoreDuplicates: true }),
      )
    },

    async mentorOverview() {
      return check(await sb.rpc('mentor_overview')) as StudentOverview[]
    },

    async submissionsForReview() {
      const subs = check(await sb.from('submissions').select('*').neq('status', 'rascunho').order('updated_at', { ascending: false })) as Submission[]
      const ids = [...new Set(subs.map((s) => s.user_id!))]
      const profiles = ids.length
        ? (check(await sb.from('profiles').select('id,display_name').in('id', ids)) as { id: string; display_name: string }[])
        : []
      const names = new Map(profiles.map((p) => [p.id, p.display_name]))
      return subs.map((s) => ({ ...s, display_name: names.get(s.user_id!) ?? '—' })) as SubmissionForReview[]
    },

    async studentProgress(userId) {
      return all<ItemProgress>((f, t) =>
        sb.from('item_progress').select('item_id,status,best_score,attempts,completed_at').eq('user_id', userId).range(f, t),
      )
    },

    async reviewSubmission(id, status, feedback) {
      check(await sb.from('submissions').update({ status, mentor_feedback: feedback }).eq('id', id))
    },
  }
}
