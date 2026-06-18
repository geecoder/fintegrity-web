import { useState, useCallback, useEffect, useRef } from 'react'
import { BOOKING_URL } from '../config/site'

// ─── Module-level singleton ───────────────────────────────────────────────────
// Shared across all component instances and React Router navigations.
let scriptStatus = 'idle' // 'idle' | 'loading' | 'loaded' | 'error'
let googleButtonEl = null
let hiddenContainer = null
const pendingCallbacks = []

function ensureContainer() {
  if (!hiddenContainer || !document.body.contains(hiddenContainer)) {
    hiddenContainer = document.createElement('div')
    hiddenContainer.style.cssText =
      'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;pointer-events:none;'
    hiddenContainer.setAttribute('aria-hidden', 'true')
    hiddenContainer.id = 'google-booking-portal'
    document.body.appendChild(hiddenContainer)
  }
  return hiddenContainer
}

function tryInitGoogleButton(onReady, onError) {
  const api = window.calendar?.schedulingButton
  if (!api?.load) { onError(); return }

  const container = ensureContainer()

  // Already rendered — just fire ready immediately
  if (googleButtonEl && container.contains(googleButtonEl)) {
    onReady(googleButtonEl)
    return
  }

  api.load({ url: BOOKING_URL, color: '#635BFF', label: 'Book a demo', target: container })

  // Poll until Google renders its button into the container (it renders async)
  let elapsed = 0
  const timer = setInterval(() => {
    const btn = container.querySelector('button, [role="button"]')
    if (btn) {
      clearInterval(timer)
      googleButtonEl = btn
      onReady(btn)
    } else if ((elapsed += 100) >= 5000) {
      clearInterval(timer)
      onError()
    }
  }, 100)
}

function loadGoogleAssets(onLoad, onError) {
  if (scriptStatus === 'loaded') { onLoad(); return }
  if (scriptStatus === 'error') { onError(); return }
  if (scriptStatus === 'loading') { pendingCallbacks.push({ onLoad, onError }); return }

  scriptStatus = 'loading'
  pendingCallbacks.push({ onLoad, onError })

  if (!document.querySelector('link[href*="scheduling-button-script.css"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css'
    document.head.appendChild(link)
  }

  const script = document.createElement('script')
  script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js'
  script.async = true
  script.onload = () => {
    scriptStatus = 'loaded'
    pendingCallbacks.splice(0).forEach(cb => cb.onLoad())
  }
  script.onerror = () => {
    scriptStatus = 'error'
    pendingCallbacks.splice(0).forEach(cb => cb.onError())
  }
  document.head.appendChild(script)
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useBookingPopup() {
  const [loading, setLoading] = useState(false)
  const isOpening = useRef(false)
  const lastTrigger = useRef(null)
  const mounted = useRef(true)

  useEffect(() => () => { mounted.current = false }, [])

  // Return focus to the triggering element when the popup window closes
  const scheduleReturnFocus = useCallback(() => {
    const trigger = lastTrigger.current
    if (!trigger) return
    const handler = () => {
      try { trigger.focus({ preventScroll: true }) } catch (_) {}
      lastTrigger.current = null
    }
    window.addEventListener('focus', handler, { once: true })
  }, [])

  // Pre-warm assets on hover/focus — first actual click will be instant
  const preload = useCallback(() => {
    if (scriptStatus !== 'idle') return
    loadGoogleAssets(
      () => tryInitGoogleButton(() => {}, () => {}),
      () => {}
    )
  }, [])

  const openBooking = useCallback((e) => {
    if (isOpening.current) return
    lastTrigger.current = e?.currentTarget ?? null

    // Already initialised — open immediately, no loading flash
    if (googleButtonEl && document.body.contains(googleButtonEl)) {
      googleButtonEl.click()
      scheduleReturnFocus()
      return
    }

    isOpening.current = true
    if (mounted.current) setLoading(true)

    const fallback = () => {
      isOpening.current = false
      if (mounted.current) setLoading(false)
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
    }

    loadGoogleAssets(
      () => tryInitGoogleButton(
        (btn) => {
          isOpening.current = false
          if (mounted.current) setLoading(false)
          btn.click()
          scheduleReturnFocus()
        },
        fallback
      ),
      fallback
    )
  }, [scheduleReturnFocus])

  return { openBooking, preload, loading }
}
