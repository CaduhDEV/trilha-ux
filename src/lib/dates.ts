// Datas sempre como "YYYY-MM-DD" no fuso local da pessoa.

const pad = (n: number) => String(n).padStart(2, '0')

export const toLocalDate = (d: Date = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const today = () => toLocalDate()

export function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(s: string, n: number): string {
  const d = parseLocalDate(s)
  d.setDate(d.getDate() + n)
  return toLocalDate(d)
}

/** Diferença em dias inteiros: b - a */
export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number)
  const [by, bm, bd] = b.split('-').map(Number)
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000)
}

const fmtShort = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })
const fmtLong = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
const fmtWeekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })

export const formatShort = (s: string) => fmtShort.format(parseLocalDate(s)).replace('.', '')
export const formatLong = (s: string) => fmtLong.format(parseLocalDate(s))
export const weekdayShort = (s: string) => fmtWeekday.format(parseLocalDate(s)).replace('.', '')

export const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
