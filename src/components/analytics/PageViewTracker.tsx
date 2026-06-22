'use client'

/**
 * Tracks route changes in Next.js App Router (which has no built-in router events).
 * Must be wrapped in <Suspense> in the layout because useSearchParams() requires it.
 */

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackMarketingEvent, getUtmProperties } from '@/lib/analytics'

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
  }, [pathname, searchParams])

  return null
}
