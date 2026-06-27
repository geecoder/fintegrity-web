/**
 * Mixpanel singleton — installed directly in source, NOT via GTM.
 * GA4 / Google Ads / LinkedIn / Clarity are in GTM only.
 *
 * PRIVACY ASSERTION — this module must NEVER send:
 *   transaction payloads · bank account details · screening results
 *   case evidence · government IDs · investigation notes
 *   API keys · passwords · tokens · any user financial data
 * Only send: anonymised behavioural events (page views, CTA clicks, form steps).
 *
 * Mixpanel must not initialise until analytics consent is granted.
 * Consent is communicated via the 'fintegrity:consent' CustomEvent.
 */

import type { ConsentPreferences } from './consent'

const EU_API_HOST = 'https://api-eu.mixpanel.com'

let initialised = false

// Dynamically imported to avoid loading mixpanel-browser in SSR bundles
async function loadAndInit(): Promise<void> {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
  if (!token || initialised) return

  const { default: mixpanel } = await import('mixpanel-browser')

  mixpanel.init(token, {
    api_host: process.env.NEXT_PUBLIC_MIXPANEL_API_HOST ?? EU_API_HOST,
    track_pageview: false,   // we track page views manually via PageViewTracker
    autocapture: false,      // no automatic DOM event capture
    persistence: 'localStorage',
    ip: false,               // do not collect IP addresses
    debug: process.env.NODE_ENV === 'development',
  })

  initialised = true
  ;(window as Window & { __mp?: typeof mixpanel }).__mp = mixpanel
}

/** Call only after analytics consent is granted. */
export async function initMixpanel(): Promise<void> {
  if (typeof window === 'undefined' || initialised) return
  await loadAndInit()
}

/** Returns the live Mixpanel instance or undefined if not yet initialised. */
export function getMixpanel() {
  if (typeof window === 'undefined') return undefined
  return (window as Window & { __mp?: ReturnType<typeof import('mixpanel-browser')['default']['init']> }).__mp
}

/** Bootstrap consent listener — must be called once on the client. */
export function attachConsentListener(): void {
  if (typeof window === 'undefined') return
  window.addEventListener('fintegrity:consent', ((e: CustomEvent<ConsentPreferences>) => {
    if (e.detail.analytics === 'granted') {
      initMixpanel()
    }
  }) as EventListener)
}
