export function shuffle<T>(list: readonly T[]): T[] {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Sorteia n itens; os de maior peso têm mais chance de sair. */
export function weightedSample<T>(list: readonly T[], n: number, weight: (t: T) => number): T[] {
  const pool = list.map((item) => ({ item, key: Math.random() ** (1 / Math.max(weight(item), 0.0001)) }))
  pool.sort((a, b) => b.key - a.key)
  return pool.slice(0, n).map((p) => p.item)
}
