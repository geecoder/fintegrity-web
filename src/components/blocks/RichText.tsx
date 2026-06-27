import LexicalRenderer, { type LexicalData } from './LexicalRenderer'

type RichTextBlockData = {
  blockType: 'richText'
  content?: LexicalData | null
  maxWidth?: 'normal' | 'wide' | 'narrow' | null
  id?: string
}

const maxWidthMap = {
  normal: '760px',
  wide: '1140px',
  narrow: '600px',
}

export default function RichTextBlock({ block }: { block: RichTextBlockData }) {
  if (!block.content) return null

  const maxWidth = maxWidthMap[block.maxWidth ?? 'normal']

  return (
    <section className="cms-richtext-section">
      <div className="wrap">
        <div className="cms-richtext" style={{ maxWidth, margin: '0 auto' }}>
          <LexicalRenderer data={block.content} />
        </div>
      </div>
    </section>
  )
}
