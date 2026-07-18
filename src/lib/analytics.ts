/**
 * Marketing event taxonomy and dual-dispatch helper.
 * Every call sends to BOTH Mixpanel (source-installed) AND window.dataLayer
 * so GTM can fire GA4, Google Ads, and LinkedIn conversion tags from the same event.
 *
 * Snake-cased event names are used in dataLayer so GTM trigger names stay
 * consistent across tag managers.
 */

import { getMixpanel } from './mixpanel'

// ── Controlled event taxonomy ──────────────────────────────────────────────
// Naming maps directly to the SEM brief's required dataLayer events (each
// name here becomes snake_case in dataLayer, e.g. 'Search Ad Clicked' ->
// 'search_ad_clicked'):
//   - 'Search Ad Clicked' / 'Landing Page Viewed' — fired once per browser
//     session on first load, see PageViewTracker.tsx.
//   - 'Primary CTA Clicked' — wired on Nav's and CTABand's "Book a demo"
//     buttons (the two highest-traffic conversion surfaces, not every single
//     link to /book-a-demo sitewide — see the SEO/SEM brief report).
//   - 'Demo Form Started' / 'Demo Form Submitted' — BookADemoForm.tsx.
//   - 'Demo Booking Started' — fired wherever the raw Google Calendar link
//     is opened (BookingLink.tsx, and BookADemoForm's auto-open).
//   - 'Demo Booking Completed' — deliberately NEVER fired. There's no
//     webhook back from Google Calendar, so there's no real signal that a
//     booking was actually completed rather than just opened. Kept in the
//     taxonomy for when a proper booking flow exists; firing it today would
//     be measuring "the calendar tab was opened," not a completed booking.
export const MARKETING_EVENTS = [
  'Website Page Viewed',
  'Landing Page Viewed',
  'Search Ad Clicked',
  'Primary CTA Clicked',
  'Demo Form Started',
  'Demo Form Submitted',
  'Demo Booking Started',
  'Demo Booking Completed',
  'Developer Docs Viewed',
  'API Documentation CTA Clicked',
  'Resource Viewed',
  'Resource Downloaded',
  'Pricing Viewed',
  'Contact Link Clicked',
  'Outbound Link Clicked',
] as const

export type MarketingEventName = typeof MARKETING_EVENTS[number]

export type EventProperties = Record<string, string | number | boolean | null | undefined>

// ── Dual-dispatch ──────────────────────────────────────────────────────────
export function trackMarketingEvent(
  name: MarketingEventName,
  props: EventProperties = {},
): void {
  if (typeof window === 'undefined') return

  const enriched: EventProperties = {
    ...getUtmProperties(),
    ...props,
  }

  // Push to GTM dataLayer (snake_case event name for GA4 / Ads / LinkedIn)
  const dl = (window as Window & { dataLayer?: unknown[] }).dataLayer
  if (dl) {
    const snakeEvent = name.toLowerCase().replace(/ /g, '_')
    dl.push({ event: snakeEvent, ...enriched })
  }

  // Send to Mixpanel if initialised
  const mp = getMixpanel() as { track?: (n: string, p: object) => void } | undefined
  if (mp?.track) {
    mp.track(name, enriched)
  }
}

// ── UTM + referrer capture ─────────────────────────────────────────────────
export function getUtmProperties(): EventProperties {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source') ?? undefined,
    utm_medium: p.get('utm_medium') ?? undefined,
    utm_campaign: p.get('utm_campaign') ?? undefined,
    utm_term: p.get('utm_term') ?? undefined,
    utm_content: p.get('utm_content') ?? undefined,
    gclid: p.get('gclid') ?? undefined,
    referrer: document.referrer || undefined,
    page: window.location.pathname,
  }
}
