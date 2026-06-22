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
  type ConsentPreferences,
} from '@/lib/consent'
import { initMixpanel, attachConsentListener } from '@/lib/mixpanel'

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
        <div className="consent-banner" role="dialog" aria-label="Cookie consent" aria-modal="true">
          <div className="wrap consent-inner">
            <p className="consent-text">
              We use cookies to understand how people use Fintegrity and to improve the site.
              Non-essential cookies are only used with your consent.{' '}
              <Link href="/cookie-policy" className="consent-link">Cookie Policy</Link>
            </p>
            <div className="consent-btns">
              <button className="consent-btn consent-btn-customize" onClick={() => setPanel('customize')}>
                Customize
              </button>
              <button className="consent-btn consent-btn-reject" onClick={() => accept(false, false)}>
                Reject non-essential
              </button>
              <button className="consent-btn consent-btn-accept" onClick={() => accept(true, true)}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Customize panel ── */}
      {panel === 'customize' && (
        <div className="consent-banner consent-customize" role="dialog" aria-label="Cookie preferences" aria-modal="true">
          <div className="wrap">
            <div className="consent-customize-head">
              <span className="consent-customize-title">Cookie preferences</span>
              <button
                className="consent-close"
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
            <div className="consent-toggles">
              {/* Essential — always on */}
              <div className="consent-toggle-row">
                <div>
                  <div className="consent-toggle-label">Essential cookies</div>
                  <div className="consent-toggle-desc">Required for the site to function. Cannot be disabled.</div>
                </div>
                <div className="consent-toggle-on" aria-label="Essential cookies always active">Always on</div>
              </div>
              {/* Analytics */}
              <div className="consent-toggle-row">
                <div>
                  <div className="consent-toggle-label">Analytics cookies</div>
                  <div className="consent-toggle-desc">Help us understand how visitors use Fintegrity (Mixpanel, GA4 via GTM).</div>
                </div>
                <button
                  role="switch"
                  aria-checked={analyticsOn}
                  className={`consent-switch${analyticsOn ? ' on' : ''}`}
                  onClick={() => setAnalyticsOn((v) => !v)}
                  aria-label="Toggle analytics cookies"
                >
                  <span className="consent-switch-thumb" />
                </button>
              </div>
              {/* Advertising */}
              <div className="consent-toggle-row">
                <div>
                  <div className="consent-toggle-label">Advertising cookies</div>
                  <div className="consent-toggle-desc">Used for targeted ads and conversion measurement (Google Ads, LinkedIn, Clarity via GTM).</div>
                </div>
                <button
                  role="switch"
                  aria-checked={advertisingOn}
                  className={`consent-switch${advertisingOn ? ' on' : ''}`}
                  onClick={() => setAdvertisingOn((v) => !v)}
                  aria-label="Toggle advertising cookies"
                >
                  <span className="consent-switch-thumb" />
                </button>
              </div>
            </div>
            <div className="consent-customize-footer">
              <button className="consent-btn consent-btn-reject" onClick={() => accept(false, false)}>
                Reject all
              </button>
              <button className="consent-btn consent-btn-accept" onClick={() => accept(analyticsOn, advertisingOn)}>
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Persistent Cookie Settings affordance ── */}
      {showAffordance && panel === 'hidden' && (
        <button className="consent-affordance" onClick={openSettings} aria-label="Open cookie preferences">
          Cookie preferences
        </button>
      )}
    </>
  )
}
