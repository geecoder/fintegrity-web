'use client'

import type { AnchorHTMLAttributes } from 'react'
import { trackMarketingEvent, type MarketingEventName, type EventProperties } from '@/lib/analytics'

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: MarketingEventName
  eventProps?: EventProperties
}

/** Plain <a> that fires a marketing event on click. For mailto/external links outside next/link. */
export default function TrackedLink({ event, eventProps, onClick, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackMarketingEvent(event, eventProps)
        onClick?.(e)
      }}
    />
  )
}
