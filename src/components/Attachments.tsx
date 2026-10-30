import { FileText, Image, Paperclip, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { store } from '../lib/store'
import type { SubmissionFile } from '../lib/types'

const MAX_MB = 25

export function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
}

/** Abre o anexo numa nova aba (URL assinada gerada na hora) */
async function open(f: SubmissionFile) {
  const tab = window.open('', '_blank')
  try {
    const url = await store.fileUrl(f.path)
    if (tab) tab.location.href = url
    else window.location.href = url
  } catch {
    tab?.close()
  }
}

export function FileRow({ file, onRemove }: { file: SubmissionFile; onRemove?: () => void }) {
  const Icon = file.type.startsWith('image/') ? Image : FileText
  return (
    <li className="flex items-center gap-3 rounded-xl border-2 border-line bg-surface p-3">
      <Icon size={22} className="shrink-0 text-sky" />
      <button type="button" onClick={() => void open(file)} className="min-w-0 flex-1 text-left">
        <div className="truncate font-bold text-sky underline">{file.name}</div>
        <div className="text-xs font-semibold text-muted">{formatSize(file.size)}</div>
      </button>
      {onRemove && (
        <button type="button" onClick={onRemove} className="text-muted hover:text-bad-ink" aria-label={`Remover ${file.name}`}>
          <Trash2 size={20} />
        </button>
      )}
    </li>
  )
}

interface Props {
  files: SubmissionFile[]
  onUpload: (files: File[]) => Promise<void>
  onRemove: (f: SubmissionFile) => void
}

export function AttachmentPicker({ files, onUpload, onRemove }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pick = async (list: FileList | null) => {
    if (!list?.length) return
    const chosen = [...list]
    const big = chosen.find((f) => f.size > MAX_MB * 1024 * 1024)
    if (big) {
      setError(`"${big.name}" passa de ${MAX_MB} MB. Exporte em tamanho menor (PNG/JPG/PDF).`)
      return
    }
    setError(null)
    setBusy(true)
    try {
      await onUpload(chosen)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível enviar o arquivo.')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div>
      {files.length > 0 && (
        <ul className="mb-3 flex flex-col gap-2">
          {files.map((f) => (
            <FileRow key={f.path} file={f} onRemove={() => onRemove(f)} />
          ))}
        </ul>
      )}
      <label
        className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-line p-5 text-center font-bold text-muted hover:border-sky hover:text-sky ${busy ? 'pointer-events-none opacity-60' : ''}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          void pick(e.dataTransfer.files)
        }}
      >
        <Paperclip size={26} />
        {busy ? 'Enviando arquivo…' : 'Toque para anexar ou arraste os arquivos aqui'}
        <span className="text-xs font-semibold">Imagens, PDF, .fig ou .zip · até {MAX_MB} MB cada</span>
        <input ref={input} type="file" multiple className="sr-only" onChange={(e) => void pick(e.target.files)} />
      </label>
      {error && <p className="mt-2 text-sm font-bold text-bad-ink">{error}</p>}
    </div>
  )
}
