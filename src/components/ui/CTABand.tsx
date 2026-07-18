import Link from 'next/link'

interface CTABandProps {
  headline: string
  body: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTABand({
  headline,
  body,
  primaryLabel = 'Book a demo →',
  primaryHref = '/book-a-demo',
  secondaryLabel,
  secondaryHref,
}: CTABandProps) {
  const secondaryIsExternal = secondaryHref?.startsWith('http')

  return (
    <section className="cta-band">
      <div className="wrap cta-band-inner">
        <h2>{headline}</h2>
        <p>{body}</p>
        <div className="cta-band-btns">
          <Link href={primaryHref} className="btn btn-white">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            secondaryIsExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-w"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link href={secondaryHref} className="btn btn-outline-w">
                {secondaryLabel}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
