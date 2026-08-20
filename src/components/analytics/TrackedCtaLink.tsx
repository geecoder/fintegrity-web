'use client'

import Link, { type LinkProps } from 'next/link'
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { trackMarketingEvent, type MarketingEventName, type EventProperties } from '@/lib/analytics'

type TrackedCtaLinkProps = PropsWithChildren<
  LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    event: MarketingEventName
    eventProps?: EventProperties
  }
>

/**
 * next/link wrapper that fires a marketing event on click, keeping
 * client-side navigation for internal CTAs (e.g. "Book a demo") without
 * requiring the whole host page to become a Client Component.
 */
export default function TrackedCtaLink({ event, eventProps, onClick, ...rest }: TrackedCtaLinkProps) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        trackMarketingEvent(event, eventProps)
        onClick?.(e)
      }}
    />
  )
}
