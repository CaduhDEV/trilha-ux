import { Download, EllipsisVertical, RefreshCw, Share, SquarePlus, Smartphone, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useInstall, type Platform } from '../lib/install'
import { Mascot } from './Mascot'
import { Modal } from './ui'

const DISMISS_KEY = 'trilha-ux:install-banner-dismissed'

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-black text-brand-ink">{n}</span>
      <span className="pt-0.5 font-semibold">{children}</span>
    </li>
  )
}

const Inline = ({ children }: { children: ReactNode }) => (
  <span className="mx-0.5 inline-flex translate-y-[3px] items-center rounded-md bg-surface-2 px-1 text-ink">{children}</span>
)

/** Passo a passo manual, para quando o navegador não oferece o botão de instalar */
export function InstallSteps({ platform }: { platform: Platform }) {
  if (platform === 'ios')
    return (
      <ol className="flex flex-col gap-3">
        <Step n={1}>
          Abra <b>trilha-ux.vercel.app</b> no <b>Safari</b>.
        </Step>
        <Step n={2}>
          Toque em <b>Compartilhar</b>
          <Inline>
            <Share size={16} />
          </Inline>
          na barra de baixo.
        </Step>
        <Step n={3}>
          Role e toque em <b>Adicionar à Tela de Início</b>
          <Inline>
            <SquarePlus size={16} />
          </Inline>
          e depois em <b>Adicionar</b>.
        </Step>
      </ol>
    )
  if (platform === 'android')
    return (
      <ol className="flex flex-col gap-3">
        <Step n={1}>
          Abra <b>trilha-ux.vercel.app</b> no <b>Chrome</b>.
        </Step>
        <Step n={2}>
          Toque no menu
          <Inline>
            <EllipsisVertical size={16} />
          </Inline>
          no canto de cima.
        </Step>
        <Step n={3}>
          Toque em <b>Instalar app</b> (ou <b>Adicionar à tela inicial</b>) e confirme.
        </Step>
      </ol>
    )
  return (
    <ol className="flex flex-col gap-3">
      <Step n={1}>
        No celular, abra <b>trilha-ux.vercel.app</b> (Safari no iPhone, Chrome no Android).
      </Step>
      <Step n={2}>
        Use <b>Adicionar à Tela de Início</b> (iPhone) ou <b>Instalar app</b> (Android).
      </Step>
      <Step n={3}>Pronto: a Trilha UX abre em tela cheia, como qualquer app.</Step>
    </ol>
  )
}

/** Cartão no Perfil: instalar com um toque quando der, ou mostrar como fazer */
export function InstallCard() {
  const { platform, standalone, canPrompt, promptInstall } = useInstall()
  if (standalone)
    return (
      <section className="card mt-8 flex items-center gap-3 p-5">
        <Smartphone className="shrink-0 text-ok" />
        <p className="font-bold">Você está usando o app instalado. 🎉</p>
      </section>
    )
  return (
    <section className="card mt-8 p-5">
      <h2 className="flex items-center gap-2 text-xl font-black">
        <Smartphone /> App no celular
      </h2>
      <p className="mb-4 mt-1 text-sm font-semibold text-muted">
        Instale a Trilha UX na tela inicial: abre em tela cheia, sem loja de apps, e sempre atualizada.
      </p>
      {canPrompt ? (
        <button className="btn btn-primary w-full" onClick={() => void promptInstall()}>
          <Download size={18} /> Instalar app
        </button>
      ) : (
        <InstallSteps platform={platform} />
      )}
    </section>
  )
}

/** Aviso discreto no topo da trilha (só no celular, some se a pessoa fechar ou instalar) */
export function InstallBanner() {
  const { platform, standalone, canPrompt, promptInstall } = useInstall()
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === '1'
    } catch {
      return false
    }
  })
  const [howOpen, setHowOpen] = useState(false)
  if (standalone || dismissed || platform === 'desktop') return null

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* navegação privada: só some nesta visita */
    }
  }

  return (
    <>
      <div className="card mb-6 flex items-center gap-3 p-3 pr-2">
        <Mascot size={40} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="font-black leading-tight">Instale o app</div>
          <div className="text-sm font-semibold leading-tight text-muted">Abre em tela cheia, direto da tela inicial.</div>
        </div>
        <button
          className="btn btn-primary shrink-0 px-3 py-2 text-xs"
          onClick={async () => {
            if (canPrompt) {
              if (await promptInstall()) dismiss()
            } else setHowOpen(true)
          }}
        >
          {canPrompt ? 'Instalar' : 'Como?'}
        </button>
        <button className="shrink-0 p-1 text-muted hover:text-ink" onClick={dismiss} aria-label="Não mostrar de novo">
          <X size={20} />
        </button>
      </div>
      <Modal open={howOpen} onClose={() => setHowOpen(false)} label="Como instalar o app">
        <h2 className="mb-4 pr-8 text-xl font-black">Instalar no {platform === 'ios' ? 'iPhone' : 'Android'}</h2>
        <InstallSteps platform={platform} />
        <button className="btn btn-ok mt-6 w-full" onClick={() => setHowOpen(false)}>
          Entendi
        </button>
      </Modal>
    </>
  )
}

/** Avisa quando há versão nova; a pessoa escolhe a hora (nunca recarrega no meio de uma lição) */
export function PwaUpdater() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // com o app aberto por muito tempo, procura atualização a cada hora
      if (registration) setInterval(() => void registration.update(), 60 * 60 * 1000)
    },
  })
  const [busy, setBusy] = useState(false)
  if (!needRefresh) return null
  return (
    <div className="fixed inset-x-0 bottom-24 z-[55] flex justify-center px-4 lg:bottom-6" role="status">
      <div className="card animate-pop flex w-full max-w-sm items-center gap-3 p-3 shadow-lg">
        <RefreshCw className="shrink-0 text-brand" size={22} />
        <div className="min-w-0 flex-1 text-sm font-bold">Nova versão da Trilha UX disponível.</div>
        <button
          className="btn btn-primary shrink-0 px-3 py-2 text-xs"
          disabled={busy}
          onClick={() => {
            setBusy(true)
            void updateServiceWorker(true)
          }}
        >
          Atualizar
        </button>
        <button className="shrink-0 p-1 text-muted hover:text-ink" onClick={() => setNeedRefresh(false)} aria-label="Depois">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
