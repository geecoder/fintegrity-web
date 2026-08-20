'use client'

import { useEffect, useState } from 'react'
import { getStoredConsent, openCookieSettings, type ConsentPreferences } from '@/lib/consent'
import styles from './page.module.css'

/**
 * Client-side panel for the /cookie-settings page. Reads the same stored
 * consent state ConsentBanner writes (lib/consent.ts) and, on request,
 * dispatches the event ConsentBanner listens for to reopen its own
 * "customize" panel — no second, parallel consent UI.
 */
export default function CookieSettingsPanel() {
  const [stored, setStored] = useState<ConsentPreferences | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setStored(getStoredConsent())
    setHydrated(true)

    function onConsentChange(e: Event) {
      setStored((e as CustomEvent<ConsentPreferences>).detail)
    }
    window.addEventListener('fintegrity:consent', onConsentChange)
    return () => window.removeEventListener('fintegrity:consent', onConsentChange)
  }, [])

  const analyticsGranted = stored?.analytics === 'granted'
  const advertisingGranted = stored?.advertising === 'granted'

  return (
    <div className={styles.card}>
      <div className={styles.statusRow}>
        <div>
          <div className={styles.statusLabel}>Essential cookies</div>
          <div className={styles.statusDesc}>Required for the site to function. Cannot be disabled.</div>
        </div>
        <span className={`${styles.statePill} ${styles.stateOn}`}>Always on</span>
      </div>

      <div className={styles.statusRow}>
        <div>
          <div className={styles.statusLabel}>Analytics cookies</div>
          <div className={styles.statusDesc}>Mixpanel, GA4 (via GTM).</div>
        </div>
        {hydrated ? (
          <span className={`${styles.statePill} ${analyticsGranted ? styles.stateOn : styles.stateOff}`}>
            {analyticsGranted ? 'Granted' : 'Denied'}
          </span>
        ) : (
          <span className={`${styles.statePill} ${styles.stateOff}`}>—</span>
        )}
      </div>

      <div className={styles.statusRow}>
        <div>
          <div className={styles.statusLabel}>Advertising cookies</div>
          <div className={styles.statusDesc}>Google Ads, LinkedIn, Clarity (via GTM).</div>
        </div>
        {hydrated ? (
          <span className={`${styles.statePill} ${advertisingGranted ? styles.stateOn : styles.stateOff}`}>
            {advertisingGranted ? 'Granted' : 'Denied'}
          </span>
        ) : (
          <span className={`${styles.statePill} ${styles.stateOff}`}>—</span>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.btnPrimary} onClick={() => openCookieSettings()}>
          Manage cookie preferences
        </button>
      </div>

      {hydrated && !stored && (
        <p className={styles.footnote}>
          No choice is recorded yet for this browser — you&rsquo;ll see the cookie banner on your next page load, or
          you can set your preferences now using the button above.
        </p>
      )}
    </div>
  )
}
