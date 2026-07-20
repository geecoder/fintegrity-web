'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackMarketingEvent } from '@/lib/analytics'
import { API_DOCS_URL } from '@/lib/config'

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
  const pathname = usePathname()

  // Secondary CTA can be a mailto link, an external docs link, some other
  // external link, or an internal page — each is a different signal worth
  // telling apart in Mixpanel/GTM rather than lumping under one event name.
  function trackSecondary() {
    if (!secondaryHref) return
    const base = { page: pathname, location: 'cta-band', label: secondaryLabel }
    if (secondaryHref.startsWith('mailto:')) {
      trackMarketingEvent('Contact Link Clicked', { ...base, method: 'email' })
    } else if (secondaryHref.startsWith(API_DOCS_URL)) {
      trackMarketingEvent('API Documentation CTA Clicked', base)
    } else if (secondaryIsExternal) {
      trackMarketingEvent('Outbound Link Clicked', { ...base, destination: secondaryHref })
    } else {
      trackMarketingEvent('Secondary CTA Clicked', { ...base, destination: secondaryHref })
    }
  }

  return (
    <section className="cta-band">
      <div className="wrap cta-band-inner">
        <h2>{headline}</h2>
        <p>{body}</p>
        <div className="cta-band-btns">
          <Link
            href={primaryHref}
            className="btn btn-white"
            onClick={() => trackMarketingEvent('Primary CTA Clicked', { page: pathname, location: 'cta-band', label: primaryLabel })}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            secondaryIsExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-w"
                onClick={trackSecondary}
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link href={secondaryHref} className="btn btn-outline-w" onClick={trackSecondary}>
                {secondaryLabel}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
