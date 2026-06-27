import Link from 'next/link'

type HeroBlockData = {
  blockType: 'hero'
  eyebrow?: string | null
  heading: string
  subheading?: string | null
  primaryCtaLabel?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  backgroundStyle?: 'gradient' | 'dark' | 'light' | null
  id?: string
}

export default function HeroBlock({ block }: { block: HeroBlockData }) {
  const style = block.backgroundStyle ?? 'gradient'

  return (
    <section
      className="cms-hero"
      data-style={style}
    >
      {style === 'gradient' && <div className="hero-wash" aria-hidden />}
      <div className="wrap">
        <div className="cms-hero-inner">
          {block.eyebrow && (
            <p className="sec-eyebrow">{block.eyebrow}</p>
          )}
          <h1 className="cms-hero-h1">{block.heading}</h1>
          {block.subheading && (
            <p className="cms-hero-sub">{block.subheading}</p>
          )}
          {(block.primaryCtaLabel || block.secondaryCtaLabel) && (
            <div className="hero-cta">
              {block.primaryCtaLabel && block.primaryCtaUrl && (
                <Link href={block.primaryCtaUrl} className="btn btn-primary">
                  {block.primaryCtaLabel}
                </Link>
              )}
              {block.secondaryCtaLabel && block.secondaryCtaUrl && (
                <Link href={block.secondaryCtaUrl} className="btn btn-ghost">
                  {block.secondaryCtaLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
