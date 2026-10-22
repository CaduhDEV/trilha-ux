// "Pixel", o mascote da Trilha UX — um frame do Figma com olhos.
import type { ReactNode } from 'react'

export type Mood = 'happy' | 'think' | 'party' | 'sad' | 'wink'

export function Mascot({ mood = 'happy', size = 96, className = '' }: { mood?: Mood; size?: number; className?: string }) {
  const eyeY = mood === 'think' ? 25 : 27
  const pupilDx = mood === 'think' ? 2.5 : 1.5
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      {mood === 'party' && (
        <g>
          <path d="M14 4 l3 6 M50 3 l-3 6 M6 16 l6 2 M58 16 l-6 2" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      <rect x="6" y="11" width="52" height="49" rx="15" fill="var(--brand-dark)" />
      <rect x="6" y="7" width="52" height="49" rx="15" fill="var(--brand)" />
      {/* "alças" de seleção do Figma */}
      <rect x="3" y="4" width="6" height="6" rx="1.5" fill="#fff" stroke="var(--sky)" strokeWidth="1.5" />
      <rect x="55" y="4" width="6" height="6" rx="1.5" fill="#fff" stroke="var(--sky)" strokeWidth="1.5" />
      {mood === 'wink' ? (
        <path d="M17 28 q6 -5 12 0" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ) : (
        <>
          <circle cx="23" cy={eyeY} r="7" fill="#fff" />
          <circle cx={23 + pupilDx} cy={eyeY + (mood === 'sad' ? 1.5 : 1)} r="3.3" fill="#1f1b2e" />
        </>
      )}
      <circle cx="41" cy={eyeY} r="7" fill="#fff" />
      <circle cx={41 + pupilDx} cy={eyeY + (mood === 'sad' ? 1.5 : 1)} r="3.3" fill="#1f1b2e" />
      {mood === 'sad' && (
        <>
          <path d="M16 18 l9 3 M48 18 l-9 3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M25 45 q7 -5 14 0" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {mood === 'think' && <path d="M27 43 h10" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />}
      {(mood === 'happy' || mood === 'wink') && (
        <path d="M24 40 q8 7 16 0" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'party' && <path d="M23 39 q9 11 18 0 z" fill="#fff" />}
      <circle cx="15" cy="37" r="3" fill="#ff8fb3" opacity=".55" />
      <circle cx="49" cy="37" r="3" fill="#ff8fb3" opacity=".55" />
    </svg>
  )
}

export function MascotSays({
  mood,
  children,
  size = 88,
  className = '',
}: {
  mood?: Mood
  children: ReactNode
  size?: number
  className?: string
}) {
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <Mascot mood={mood} size={size} className="shrink-0 animate-bob" />
      <div className="relative mb-4 rounded-2xl border-2 border-line bg-surface px-4 py-3 font-bold text-ink">
        <span className="absolute -left-2 bottom-4 h-3 w-3 rotate-45 border-b-2 border-l-2 border-line bg-surface" />
        {children}
      </div>
    </div>
  )
}
