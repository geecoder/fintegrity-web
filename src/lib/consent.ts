// Consent management utilities.
// Structured so a CMP (CookieYes / OneTrust) can replace this module:
//   - CMP calls saveConsent() with the resolved preferences
//   - CMP calls applyConsentMode() to push to GTM's Consent Mode v2
//   - CMP calls dispatchConsentEvent() so Mixpanel and other listeners react

export type ConsentState = 'granted' | 'denied'
export type ConsentAction = 'accepted_all' | 'rejected_all' | 'customised'

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
// gtag shim is set up via the inline script in layout.tsx, before GTM loads.
export function applyConsentMode(prefs: ConsentPreferences): void {
  if (typeof window === 'undefined') return
  const gt = (window as Window & { gtag?: (...a: unknown[]) => void }).gtag
  if (typeof gt !== 'function') return

  gt('consent', 'update', {
    analytics_storage: prefs.analytics,
    ad_storage: prefs.advertising,
    ad_user_data: prefs.advertising,
    ad_personalization: prefs.advertising,
  })
}

// Fires once per user interaction (accept / reject / customise) — not on the
// silent re-apply that runs on every page load, so it doesn't spam dataLayer
// on every navigation.
export function pushConsentUpdatedEvent(prefs: ConsentPreferences, action: ConsentAction): void {
  if (typeof window === 'undefined') return
  const dl = (window as Window & { dataLayer?: unknown[] }).dataLayer
  if (!dl) return

  dl.push({
    event: 'cookie_consent_updated',
    consent_action: action,
    analytics_consent: prefs.analytics,
    advertising_consent: prefs.advertising,
  })
}

// Broadcast consent changes so subscribers (Mixpanel, other modules) can react.
export function dispatchConsentEvent(prefs: ConsentPreferences): void {
  window.dispatchEvent(new CustomEvent('fintegrity:consent', { detail: prefs }))
}

// `action` is omitted on the mount-time re-apply (existing stored consent
// re-sent to GTM on page load) since that isn't a new user interaction.
export function applyAndDispatch(prefs: ConsentPreferences, action?: ConsentAction): void {
  applyConsentMode(prefs)
  if (action) pushConsentUpdatedEvent(prefs, action)
  dispatchConsentEvent(prefs)
}

// Name of the DOM event ConsentBanner listens for to open its "customize"
// panel from anywhere in the app (e.g. the /cookie-settings page), without
// a second parallel consent UI.
export const OPEN_COOKIE_SETTINGS_EVENT = 'fintegrity:open-cookie-settings'

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
}
