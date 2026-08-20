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
//   - 'Search Ad Clicked' / 'Landing Page Viewed' — fired once per browser
//     session on first load, see PageViewTracker.tsx.
//   - 'Primary CTA Clicked' — Nav's and the hero/closing CTA's "Book a demo".
//   - 'Demo Form Started' / 'Demo Form Submitted' — DemoForm.tsx.
//   - 'Demo Booking Started' — fired wherever the raw booking-calendar link
//     is opened (the demo success panel's "Schedule a time" action).
//   - 'Demo Booking Completed' — deliberately NEVER fired. There's no
//     webhook back from the calendar provider, so there's no real signal
//     that a booking was actually completed rather than just opened. Kept
//     in the taxonomy for when a proper booking flow exists.
//   - 'Secondary CTA Clicked' / 'API Documentation CTA Clicked' /
//     'Contact Link Clicked' / 'Outbound Link Clicked' — TrackedLink.tsx
//     wraps every mailto/external/docs link that isn't already covered by a
//     more specific event, keyed off the href: mailto: -> Contact Link
//     Clicked, API_DOCS_URL/DEVELOPER_DOCS_URL (lib/config) -> API
//     Documentation CTA Clicked, other external -> Outbound Link Clicked,
//     internal -> Secondary CTA Clicked.
//   - 'Developer Docs Viewed' / 'Pricing Viewed' — pageview on the pages
//     that link out to or explain pricing/developer docs.
//   - 'Resource Viewed' / 'Resource Downloaded' — reserved; not fired yet.
export const MARKETING_EVENTS = [
  'Website Page Viewed',
  'Landing Page Viewed',
  'Search Ad Clicked',
  'Primary CTA Clicked',
  'Secondary CTA Clicked',
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
// Campaign attribution (utm_*, gclid) only lives in the URL of the landing
// page itself — the moment a visitor clicks through to another internal
// page, the query string is gone. Without persisting it, every event after
// the first pageview (a demo form submit, a booking click) would silently
// lose the ad/campaign that drove the visit. So: cache the most recent set
// of attribution params in sessionStorage and fall back to it whenever the
// current URL has none. A fresh utm/gclid in the URL always overwrites the
// cached one — if a visitor arrives via a second campaign link mid-session,
// that's the attribution that should stick for what follows.
const UTM_STORAGE_KEY = 'fintegrity_utm_session'

function readUtmFromUrl(): EventProperties {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source') ?? undefined,
    utm_medium: p.get('utm_medium') ?? undefined,
    utm_campaign: p.get('utm_campaign') ?? undefined,
    utm_term: p.get('utm_term') ?? undefined,
    utm_content: p.get('utm_content') ?? undefined,
    gclid: p.get('gclid') ?? undefined,
  }
}

export function getUtmProperties(): EventProperties {
  if (typeof window === 'undefined') return {}

  const fromUrl = readUtmFromUrl()
  let attribution: EventProperties = fromUrl

  try {
    if (Object.values(fromUrl).some(Boolean)) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl))
    } else {
      const stored = sessionStorage.getItem(UTM_STORAGE_KEY)
      if (stored) attribution = JSON.parse(stored) as EventProperties
    }
  } catch {
    // sessionStorage unavailable — fall back to URL-only attribution for this call
  }

  return {
    ...attribution,
    referrer: document.referrer || undefined,
    page: window.location.pathname,
  }
}
