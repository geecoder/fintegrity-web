'use client'

/**
 * Lightweight consent banner implementing Google Consent Mode v2.
 * Structured so the UI can be replaced by CookieYes / OneTrust:
 *   - Replace the JSX and call saveConsent() + applyAndDispatch() on user choice.
 *   - The lib/consent.ts module handles storage, GTM Consent Mode, and broadcasting.
 *
 * On first visit: banner appears.
 * After choice: banner hides; a small "Cookie preferences" affordance remains.
 * Returns to show on clicking the affordance.
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  getStoredConsent,
  saveConsent,
  applyAndDispatch,
  OPEN_COOKIE_SETTINGS_EVENT,
  type ConsentPreferences,
} from '@/lib/consent'
import { initMixpanel, attachConsentListener } from '@/lib/mixpanel'
import styles from './ConsentBanner.module.css'

type Panel = 'banner' | 'customize' | 'hidden'

export default function ConsentBanner() {
  const [panel, setPanel] = useState<Panel>('hidden')
  const [analyticsOn, setAnalyticsOn] = useState(false)
  const [advertisingOn, setAdvertisingOn] = useState(false)
  const [showAffordance, setShowAffordance] = useState(false)

  // Hydrate consent state on mount
  useEffect(() => {
    attachConsentListener()

    const stored = getStoredConsent()
    if (stored) {
      // Re-apply stored consent to GTM (in case page was refreshed)
      applyAndDispatch(stored)
      if (stored.analytics === 'granted') initMixpanel()
      setAnalyticsOn(stored.analytics === 'granted')
      setAdvertisingOn(stored.advertising === 'granted')
      setShowAffordance(true)
    } else {
      setPanel('banner')
    }
  }, [])

  // Let other parts of the app (e.g. the /cookie-settings page) open the
  // same customize panel this banner already owns, instead of building a
  // second consent UI.
  useEffect(() => {
    function handleOpenRequest() {
      openSettings()
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenRequest)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenRequest)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function accept(analytics: boolean, advertising: boolean) {
    const prefs: ConsentPreferences = {
      analytics: analytics ? 'granted' : 'denied',
      advertising: advertising ? 'granted' : 'denied',
      savedAt: Date.now(),
    }
    saveConsent(prefs)
    applyAndDispatch(prefs)
    if (analytics) initMixpanel()
    setAnalyticsOn(analytics)
    setAdvertisingOn(advertising)
    setPanel('hidden')
    setShowAffordance(true)
  }

  function openSettings() {
    const stored = getStoredConsent()
    if (stored) {
      setAnalyticsOn(stored.analytics === 'granted')
      setAdvertisingOn(stored.advertising === 'granted')
    }
    setPanel('customize')
    setShowAffordance(false)
  }

  return (
    <>
      {/* ── Consent banner ── */}
      {panel === 'banner' && (
        <div className={styles.banner} role="dialog" aria-label="Cookie consent" aria-modal="true">
          <div className={`${styles.inner} ${styles.bannerInner}`}>
            <p className={styles.text}>
              We use cookies to understand how people use Fintegrity and to improve the site.
              Non-essential cookies are only used with your consent.{' '}
              <Link href="/cookie-policy" className={styles.link}>Cookie Policy</Link>
            </p>
            <div className={styles.btns}>
              <button className={styles.btn} onClick={() => setPanel('customize')}>
                Customize
              </button>
              <button className={styles.btn} onClick={() => accept(false, false)}>
                Reject non-essential
              </button>
              <button className={`${styles.btn} ${styles.btnAccept}`} onClick={() => accept(true, true)}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Customize panel ── */}
      {panel === 'customize' && (
        <div className={`${styles.banner} ${styles.customize}`} role="dialog" aria-label="Cookie preferences" aria-modal="true">
          <div className={styles.inner}>
            <div className={styles.head}>
              <span className={styles.title}>Cookie preferences</span>
              <button
                className={styles.close}
                aria-label="Close cookie preferences"
                onClick={() => {
                  const stored = getStoredConsent()
                  setPanel(stored ? 'hidden' : 'banner')
                  setShowAffordance(!!stored)
                }}
              >
                ✕
              </button>
            </div>
            <div className={styles.toggles}>
              {/* Essential — always on */}
              <div className={styles.toggleRow}>
                <div>
                  <div className={styles.toggleLabel}>Essential cookies</div>
                  <div className={styles.toggleDesc}>Required for the site to function. Cannot be disabled.</div>
                </div>
                <div className={styles.toggleOn} aria-label="Essential cookies always active">Always on</div>
              </div>
              {/* Analytics */}
              <div className={styles.toggleRow}>
                <div>
                  <div className={styles.toggleLabel}>Analytics cookies</div>
                  <div className={styles.toggleDesc}>Help us understand how visitors use Fintegrity (Mixpanel, GA4 via GTM).</div>
                </div>
                <button
                  role="switch"
                  aria-checked={analyticsOn}
                  className={`${styles.switch}${analyticsOn ? ` ${styles.on}` : ''}`}
                  onClick={() => setAnalyticsOn((v) => !v)}
                  aria-label="Toggle analytics cookies"
                >
                  <span className={styles.switchThumb} />
                </button>
              </div>
              {/* Advertising */}
              <div className={styles.toggleRow}>
                <div>
                  <div className={styles.toggleLabel}>Advertising cookies</div>
                  <div className={styles.toggleDesc}>Used for targeted ads and conversion measurement (Google Ads, LinkedIn, Clarity via GTM).</div>
                </div>
                <button
                  role="switch"
                  aria-checked={advertisingOn}
                  className={`${styles.switch}${advertisingOn ? ` ${styles.on}` : ''}`}
                  onClick={() => setAdvertisingOn((v) => !v)}
                  aria-label="Toggle advertising cookies"
                >
                  <span className={styles.switchThumb} />
                </button>
              </div>
            </div>
            <div className={styles.customizeFooter}>
              <button className={styles.btn} onClick={() => accept(false, false)}>
                Reject all
              </button>
              <button className={`${styles.btn} ${styles.btnAccept}`} onClick={() => accept(analyticsOn, advertisingOn)}>
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Persistent Cookie Settings affordance ── */}
      {showAffordance && panel === 'hidden' && (
        <button className={styles.affordance} onClick={openSettings} aria-label="Open cookie preferences">
          Cookie preferences
        </button>
      )}
    </>
  )
}
