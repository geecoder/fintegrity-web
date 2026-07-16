'use client'

// Footer trigger for the consent-banner customize panel. ConsentBanner listens
// for this event so the "Cookie Settings" link works from any page, including
// the footer (a server component) without lifting consent state up.
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="footer-cookie-settings"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
    >
      Cookie Settings
    </button>
  )
}
