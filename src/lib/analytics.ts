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
export const MARKETING_EVENTS = [
  'Website Page Viewed',
  'Primary CTA Clicked',
  'Demo Form Started',
  'Demo Form Submitted',
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
    referrer: document.referrer || undefined,
    page: window.location.pathname,
  }
}
