'use client'

import type { ReactNode } from 'react'
import { BOOKING_URL } from '@/lib/config'
import { trackMarketingEvent } from '@/lib/analytics'

interface BookingLinkProps {
  className?: string
  children: ReactNode
  source: string // where this link lives, e.g. 'thank-you-page', 'demo-form-fallback'
  style?: React.CSSProperties
}

// Wraps the raw Google Calendar booking link so every place it appears fires
// demo_booking_started consistently. There's no webhook back from Google
// Calendar, so demo_booking_completed genuinely can't be measured yet — see
// the note in lib/analytics.ts.
export default function BookingLink({ className, children, source, style }: BookingLinkProps) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() => trackMarketingEvent('Demo Booking Started', { source })}
    >
      {children}
    </a>
  )
}
