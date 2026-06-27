import Link from 'next/link'

type CTASectionBlockData = {
  blockType: 'ctaSection'
  headline: string
  body?: string | null
  primaryLabel?: string | null
  primaryUrl?: string | null
  secondaryLabel?: string | null
  secondaryUrl?: string | null
  id?: string
}

export default function CTASectionBlock({ block }: { block: CTASectionBlockData }) {
  return (
    <section className="cta">
      <div className="wrap">
        <div className="cta-card">
          <h2>{block.headline}</h2>
          {block.body && <p>{block.body}</p>}
          {(block.primaryLabel || block.secondaryLabel) && (
            <div className="cta-row">
              {block.primaryLabel && block.primaryUrl && (
                <Link href={block.primaryUrl} className="btn btn-white">
                  {block.primaryLabel}
                </Link>
              )}
              {block.secondaryLabel && block.secondaryUrl && (
                <Link href={block.secondaryUrl} className="btn btn-outline-w">
                  {block.secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
