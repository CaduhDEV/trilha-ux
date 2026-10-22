import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Toasts() {
  const { toasts, dismiss } = useApp()
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-4" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`card animate-pop pointer-events-auto flex w-full max-w-sm items-start gap-3 p-4 shadow-lg ${
            t.kind === 'error' ? 'border-bad' : t.kind === 'achievement' ? 'border-gold' : ''
          }`}
        >
          {t.icon && <div className="text-3xl leading-none">{t.icon}</div>}
          <div className="min-w-0 flex-1">
            <div className={`font-black ${t.kind === 'error' ? 'text-bad-ink' : t.kind === 'achievement' ? 'text-gold-ink' : ''}`}>
              {t.title}
            </div>
            {t.body && <div className="mt-0.5 text-sm font-semibold text-muted">{t.body}</div>}
          </div>
          <button onClick={() => dismiss(t.id)} className="text-muted hover:text-ink" aria-label="Fechar aviso">
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}
