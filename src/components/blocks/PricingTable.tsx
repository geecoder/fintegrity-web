import Link from 'next/link'

type PricingFeature = { feature: string; id?: string }

type PricingTier = {
  name: string
  headline?: string | null
  description?: string | null
  price: string
  priceNote?: string | null
  features?: PricingFeature[] | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  featured?: boolean | null
  id?: string
}

type PricingTableBlockData = {
  blockType: 'pricingTable'
  heading: string
  subheading?: string | null
  tiers?: PricingTier[] | null
  id?: string
}

export default function PricingTableBlock({ block }: { block: PricingTableBlockData }) {
  return (
    <section className="cms-pricing">
      <div className="wrap">
        <div className="cms-section-header" style={{ textAlign: 'center' }}>
          <h2 className="sec-title" style={{ maxWidth: 'none' }}>{block.heading}</h2>
          {block.subheading && <p className="sec-intro" style={{ margin: '16px auto 0' }}>{block.subheading}</p>}
        </div>
        {block.tiers && block.tiers.length > 0 && (
          <div className="cms-pricing-grid">
            {block.tiers.map((tier, i) => (
              <div
                key={tier.id ?? i}
                className={`cms-pricing-tier${tier.featured ? ' cms-pricing-tier--featured' : ''}`}
              >
                {tier.featured && (
                  <div className="cms-pricing-badge">Recommended</div>
                )}
                <p className="cms-pricing-name">{tier.name}</p>
                {tier.headline && <p className="cms-pricing-headline">{tier.headline}</p>}
                {tier.description && <p className="cms-pricing-desc">{tier.description}</p>}
                <div className="cms-pricing-price">
                  <span className="cms-pricing-price-value">{tier.price}</span>
                  {tier.priceNote && <span className="cms-pricing-price-note">{tier.priceNote}</span>}
                </div>
                {tier.features && tier.features.length > 0 && (
                  <ul className="cms-pricing-features">
                    {tier.features.map((f, j) => (
                      <li key={f.id ?? j}>{f.feature}</li>
                    ))}
                  </ul>
                )}
                {tier.ctaLabel && tier.ctaUrl && (
                  <Link
                    href={tier.ctaUrl}
                    className={`btn ${tier.featured ? 'btn-primary' : 'btn-ghost'} cms-pricing-cta`}
                  >
                    {tier.ctaLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
