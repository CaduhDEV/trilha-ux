import type { PathItem } from '../content/types'

export function itemHref(item: PathItem) {
  if (item.kind === 'lesson') return `/licao/${item.id}`
  if (item.kind === 'checkpoint' || item.kind === 'exam') return `/teste/${item.id}`
  return `/pratica/${item.id}`
}
