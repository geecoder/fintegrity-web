import type { ReactNode } from 'react'

// Minimal Lexical JSON → React renderer for the node types Payload's editor produces.
// Handles: root, paragraph, heading, text (bold/italic/underline/strike/code),
// linebreak, link, list (bullet/number), listitem, quote, horizontalrule.

type LexicalNode = {
  type: string
  version?: number
  children?: LexicalNode[]
  // text nodes
  text?: string
  format?: number      // bitmask: 1=bold 2=italic 4=strikethrough 8=underline 16=code
  mode?: string
  // heading
  tag?: string
  // list
  listType?: 'bullet' | 'number' | 'check'
  checked?: boolean
  value?: number
  // link
  fields?: { url?: string; newTab?: boolean }
  url?: string
}

export type LexicalData = {
  root: LexicalNode
}

function renderNode(node: LexicalNode, key: string | number): ReactNode {
  switch (node.type) {
    case 'root':
      return <>{node.children?.map((c, i) => renderNode(c, i))}</>

    case 'paragraph': {
      const children = node.children?.map((c, i) => renderNode(c, i))
      return <p key={key}>{children}</p>
    }

    case 'heading': {
      const Tag = (node.tag ?? 'h2') as keyof React.JSX.IntrinsicElements
      return <Tag key={key}>{node.children?.map((c, i) => renderNode(c, i))}</Tag>
    }

    case 'text': {
      if (!node.text) return null
      const fmt = node.format ?? 0
      let content: ReactNode = node.text
      if (fmt & 16) content = <code>{content}</code>
      if (fmt & 8) content = <u>{content}</u>
      if (fmt & 4) content = <s>{content}</s>
      if (fmt & 2) content = <em>{content}</em>
      if (fmt & 1) content = <strong>{content}</strong>
      return <span key={key}>{content}</span>
    }

    case 'linebreak':
      return <br key={key} />

    case 'link': {
      const href = node.fields?.url ?? node.url ?? '#'
      const newTab = node.fields?.newTab
      return (
        <a
          key={key}
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
        >
          {node.children?.map((c, i) => renderNode(c, i))}
        </a>
      )
    }

    case 'autolink': {
      const href = node.fields?.url ?? node.url ?? '#'
      return (
        <a key={key} href={href}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </a>
      )
    }

    case 'list': {
      const items = node.children?.map((c, i) => renderNode(c, i))
      return node.listType === 'number'
        ? <ol key={key}>{items}</ol>
        : <ul key={key}>{items}</ul>
    }

    case 'listitem':
      return <li key={key}>{node.children?.map((c, i) => renderNode(c, i))}</li>

    case 'quote':
      return <blockquote key={key}>{node.children?.map((c, i) => renderNode(c, i))}</blockquote>

    case 'horizontalrule':
      return <hr key={key} />

    default:
      if (node.children?.length) {
        return <>{node.children.map((c, i) => renderNode(c, i))}</>
      }
      return null
  }
}

export default function LexicalRenderer({ data, className }: { data: LexicalData | null | undefined; className?: string }) {
  if (!data?.root) return null
  return (
    <div className={className}>
      {renderNode(data.root, 'root')}
    </div>
  )
}
