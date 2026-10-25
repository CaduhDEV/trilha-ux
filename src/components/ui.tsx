import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import type { ItemKind } from '../content/types'
import { BookOpen, ClipboardCheck, Crown, PenTool, Briefcase, Star } from 'lucide-react'

export function ProgressBar({
  value,
  color = 'var(--ok)',
  className = '',
  height = 16,
}: {
  value: number
  color?: string
  className?: string
  height?: number
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-line ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%`, background: color }}
      >
        {pct > 4 && <div className="mx-2 mt-[3px] h-[30%] rounded-full bg-white/30" />}
      </div>
    </div>
  )
}

export function Modal({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  label: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="card animate-pop relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-4 top-4 text-muted hover:text-ink" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
        {children}
      </div>
    </div>
  )
}

export const KIND_LABEL: Record<ItemKind, string> = {
  lesson: 'Lição',
  practice: 'Prática',
  checkpoint: 'Checkpoint',
  exam: 'Prova',
  project: 'Projeto',
}

export function KindIcon({ kind, size = 28 }: { kind: ItemKind; size?: number }) {
  const props = { size, strokeWidth: 2.5 }
  switch (kind) {
    case 'lesson':
      return <BookOpen {...props} />
    case 'practice':
      return <PenTool {...props} />
    case 'checkpoint':
      return <ClipboardCheck {...props} />
    case 'exam':
      return <Crown {...props} />
    case 'project':
      return <Briefcase {...props} />
  }
}

/** Ícone de XP (pontos). Estrela e não raio: raio lembra "energia que se gasta" e aqui nada se gasta. */
export function XpIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return <Star size={size} fill="currentColor" strokeWidth={2.2} strokeLinejoin="round" className={className} aria-hidden />
}

export function Spinner({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-muted" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-brand" />
      <span className="font-bold">{label}</span>
    </div>
  )
}

export function Stat({ icon, value, label, tone = 'text-ink' }: { icon: ReactNode; value: ReactNode; label: string; tone?: string }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <div className={`text-2xl ${tone}`}>{icon}</div>
      <div className="min-w-0">
        <div className="text-xl font-black leading-none">{value}</div>
        <div className="mt-1 text-sm font-bold leading-tight text-muted">{label}</div>
      </div>
    </div>
  )
}

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="text-xl font-black">{children}</h2>
      {aside}
    </div>
  )
}
