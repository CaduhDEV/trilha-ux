import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DIAGRAMS } from './diagrams'

const DIRECTIVE = /^::([a-z0-9-]+)\s*$/

/** Markdown das lições. Uma linha "::nome-do-diagrama" vira um diagrama ilustrado. */
export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  const parts: ({ kind: 'md'; text: string } | { kind: 'diagram'; name: string })[] = []
  let buf: string[] = []
  for (const line of children.split('\n')) {
    const m = line.trim().match(DIRECTIVE)
    if (m && DIAGRAMS[m[1]]) {
      if (buf.length) parts.push({ kind: 'md', text: buf.join('\n') })
      parts.push({ kind: 'diagram', name: m[1] })
      buf = []
    } else buf.push(line)
  }
  if (buf.length) parts.push({ kind: 'md', text: buf.join('\n') })

  return (
    <div className={`prose-ux ${className}`}>
      {parts.map((p, i) => {
        if (p.kind === 'diagram') {
          const D = DIAGRAMS[p.name]
          return <D key={i} />
        }
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto rounded-2xl border-2 border-line">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {p.text}
          </ReactMarkdown>
        )
      })}
    </div>
  )
}
