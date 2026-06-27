type Feature = {
  tag?: string | null
  title: string
  body: string
  id?: string
}

type FeatureGridBlockData = {
  blockType: 'featureGrid'
  eyebrow?: string | null
  heading: string
  subheading?: string | null
  columns?: '2' | '3' | '4' | null
  features?: Feature[] | null
  id?: string
}

export default function FeatureGridBlock({ block }: { block: FeatureGridBlockData }) {
  const cols = block.columns ?? '3'

  return (
    <section className="cms-feature-grid">
      <div className="wrap">
        {(block.eyebrow || block.heading || block.subheading) && (
          <div className="cms-section-header">
            {block.eyebrow && <p className="sec-eyebrow">{block.eyebrow}</p>}
            {block.heading && <h2 className="sec-title">{block.heading}</h2>}
            {block.subheading && <p className="sec-intro">{block.subheading}</p>}
          </div>
        )}
        {block.features && block.features.length > 0 && (
          <div
            className="cms-feat-cards"
            style={{ '--feat-cols': cols } as React.CSSProperties}
          >
            {block.features.map((feat, i) => (
              <div key={feat.id ?? i} className="pillar">
                {feat.tag && (
                  <p className="plabel">{feat.tag}</p>
                )}
                <h3>{feat.title}</h3>
                <p>{feat.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
