// Instalação do app (PWA) na tela inicial do celular.
// O Android/Chrome avisa que dá para instalar com o evento "beforeinstallprompt",
// que dispara cedo — por isso ele é capturado aqui, assim que o módulo carrega.
// O iPhone não tem esse evento: lá a instalação é manual pelo Safari.
import { useSyncExternalStore } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export type Platform = 'ios' | 'android' | 'desktop'

let deferred: BeforeInstallPromptEvent | null = null
let installed = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault() // usamos nosso próprio botão em vez da barrinha do navegador
    deferred = e as BeforeInstallPromptEvent
    emit()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    installed = true
    emit()
  })
}

export function detectPlatform(): Platform {
  const ua = navigator.userAgent
  // iPadOS se apresenta como Mac, mas tem tela de toque
  if (/iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

/** Aberto como app instalado (sem barra do navegador) */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useInstall() {
  const canPrompt = useSyncExternalStore(subscribe, () => deferred !== null)
  const justInstalled = useSyncExternalStore(subscribe, () => installed)
  return {
    platform: detectPlatform(),
    standalone: isStandalone() || justInstalled,
    /** o navegador oferece instalação com um toque (Android/Chrome, Edge, Chrome no PC) */
    canPrompt,
    async promptInstall(): Promise<boolean> {
      if (!deferred) return false
      const ev = deferred
      deferred = null
      emit()
      await ev.prompt()
      return (await ev.userChoice).outcome === 'accepted'
    },
  }
}
