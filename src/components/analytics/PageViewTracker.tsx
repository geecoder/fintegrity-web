'use client'

/**
 * Tracks route changes in Next.js App Router (which has no built-in router events).
 * Must be wrapped in <Suspense> in the layout because useSearchParams() requires it.
 */

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackMarketingEvent, getUtmProperties } from '@/lib/analytics'

const SESSION_LANDING_KEY = 'fintegrity_landing_tracked'

export default function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    const qs = searchParams?.toString() ?? ''
    const current = pathname + (qs ? `?${qs}` : '')

    // Skip if the effective URL hasn't changed (prevents duplicate on initial hydration)
    if (current === prevPath.current) return
    prevPath.current = current

    trackMarketingEvent('Website Page Viewed', {
      page: pathname,
      page_title: document.title,
      ...getUtmProperties(),
    })

    // Landing Page Viewed / Search Ad Clicked fire once per browser tab
    // session — the first page load, not every subsequent in-app
    // navigation — so they represent true entry/first-touch attribution,
    // distinct from the per-navigation Website Page Viewed above.
    try {
      if (!sessionStorage.getItem(SESSION_LANDING_KEY)) {
        sessionStorage.setItem(SESSION_LANDING_KEY, '1')
        const utm = getUtmProperties()

        trackMarketingEvent('Landing Page Viewed', {
          page: pathname,
          page_title: document.title,
          ...utm,
        })

        // gclid is Google Ads' own click identifier — the most reliable
        // signal a visit came from a paid search click, more reliable than
        // utm_source alone (which organic/social links can also carry).
        if (utm.gclid) {
          trackMarketingEvent('Search Ad Clicked', { page: pathname, ...utm })
        }
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing edge cases) —
      // landing/ad-click attribution is best-effort, safe to skip silently.
    }
  }, [pathname, searchParams])

  return null
}
