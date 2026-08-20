// Consent management utilities.
// Structured so a CMP (CookieYes / OneTrust) can replace this module:
//   - CMP calls saveConsent() with the resolved preferences
//   - CMP calls applyConsentMode() to push to GTM's Consent Mode v2
//   - CMP calls dispatchConsentEvent() so Mixpanel and other listeners react

export type ConsentState = 'granted' | 'denied'

export interface ConsentPreferences {
  analytics: ConsentState    // Mixpanel, GA4 (via GTM)
  advertising: ConsentState  // Google Ads, LinkedIn, Clarity (via GTM)
  savedAt: number
}

const STORAGE_KEY = 'fintegrity_consent_v1'
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000 // 1 year

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const prefs = JSON.parse(raw) as ConsentPreferences
    // Re-prompt if consent is older than 1 year
    if (Date.now() - prefs.savedAt > CONSENT_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return prefs
  } catch {
    return null
  }
}

export function saveConsent(
  prefs: Omit<ConsentPreferences, 'savedAt'>,
): ConsentPreferences {
  const full: ConsentPreferences = { ...prefs, savedAt: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full))
  return full
}

// Push Google Consent Mode v2 update. Works whether GTM is loaded or not —
// GTM picks up the queued dataLayer entries when it does load.
export function applyConsentMode(prefs: ConsentPreferences): void {
  const dl = (window as Window & { dataLayer?: unknown[] }).dataLayer
  if (!dl) return

  dl.push({
    event: 'consent_update',
    // GTM reads the Consent Mode API through the gtag shim we set up in layout
  })

  // gtag shim set up via inline script in layout.tsx
  const gt = (window as Window & { gtag?: (...a: unknown[]) => void }).gtag
  if (typeof gt === 'function') {
    gt('consent', 'update', {
      analytics_storage: prefs.analytics,
      ad_storage: prefs.advertising,
      ad_user_data: prefs.advertising,
      ad_personalization: prefs.advertising,
    })
  }
}

// Broadcast consent changes so subscribers (Mixpanel, other modules) can react.
export function dispatchConsentEvent(prefs: ConsentPreferences): void {
  window.dispatchEvent(new CustomEvent('fintegrity:consent', { detail: prefs }))
}

export function applyAndDispatch(prefs: ConsentPreferences): void {
  applyConsentMode(prefs)
  dispatchConsentEvent(prefs)
}

// Name of the DOM event ConsentBanner listens for to open its "customize"
// panel from anywhere in the app (e.g. the /cookie-settings page), without
// a second parallel consent UI.
export const OPEN_COOKIE_SETTINGS_EVENT = 'fintegrity:open-cookie-settings'

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
}
