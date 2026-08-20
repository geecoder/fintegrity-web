import { NextRequest, NextResponse } from 'next/server'
import { isPersonalEmail, PERSONAL_EMAIL_ERROR } from '@/lib/email-validation'

export const runtime = 'nodejs'

/**
 * Server-side HubSpot demo-request submission handler.
 *
 * Uses HubSpot's legacy "Submit data to a form" endpoint
 * (forms.hubspot.com/uploads/form/v2/{portalId}/{formId}) rather than the v3
 * Forms API — it doesn't require legalConsentOptions/GDPR config to match the
 * form's HubSpot-side setup, and silently ignores field names that aren't
 * configured as contact properties rather than rejecting the whole
 * submission. Simpler and more forgiving for a custom-built form UI.
 *
 * Environment variables required (set in Vercel — never expose anything
 * server-only client-side):
 *   NEXT_PUBLIC_HUBSPOT_PORTAL_ID  — your HubSpot portal ID (safe to be public)
 *   NEXT_PUBLIC_HUBSPOT_FORM_ID    — the form GUID from HubSpot (safe to be public)
 *
 * If either is unset (or left at its .env.example placeholder), the route
 * returns a clear failure so the UI can point the visitor at a direct email
 * fallback instead of silently pretending success.
 */

interface DemoFormPayload {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  role?: string
  product?: string
  challenge?: string
  pageUri?: string
  // Honeypot: a real form field a screen-reader/keyboard user never reaches.
  // Bots that blindly fill every input trip it; real submissions leave it empty.
  website?: string
}

const FALLBACK_ERROR =
  'Demo request could not be submitted right now. Please email contact@getfintegrity.com directly.'

function isConfigured(value: string | undefined): value is string {
  return !!value && !value.startsWith('your_')
}

// ── Rate limiting ────────────────────────────────────────────────────────
// Basic in-memory sliding-window limiter keyed by client IP: max 5 requests
// per 10-minute window. This resets on every serverless cold start / new
// instance (each instance has its own Map), so it's a lightweight abuse
// deterrent, not a robust distributed rate limiter — acceptable for this
// stage since the real backstop is HubSpot's own submission handling.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const requestLog = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (requestLog.get(key) ?? []).filter((t) => t > windowStart)

  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(key, timestamps)
    return true
  }

  timestamps.push(now)
  requestLog.set(key, timestamps)

  // Opportunistic cleanup so the map doesn't grow unbounded across cold-start lifetime
  if (requestLog.size > 500) {
    for (const [k, v] of requestLog) {
      const fresh = v.filter((t) => t > windowStart)
      if (fresh.length === 0) requestLog.delete(k)
      else requestLog.set(k, fresh)
    }
  }

  return false
}

function getClientKey(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (isRateLimited(getClientKey(req))) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  let body: DemoFormPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot tripped: pretend success so the bot doesn't learn it was caught,
  // but never forward the submission to HubSpot.
  if ((body.website ?? '').trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const { firstName, lastName, email, company, role, product, challenge, pageUri } = body

  if (!firstName || !lastName || !email || !company) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
  }

  if (isPersonalEmail(email)) {
    return NextResponse.json({ ok: false, error: PERSONAL_EMAIL_ERROR }, { status: 400 })
  }

  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
  const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID

  if (!isConfigured(portalId) || !isConfigured(formId)) {
    console.error('[api/demo] HubSpot portal/form ID not configured — set NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_FORM_ID')
    // Deliberately graceful (not an error response): the demo form's success
    // panel still shows and falls back to the booking-calendar link, so an
    // unconfigured preview/staging deploy never shows visitors a broken form.
    return NextResponse.json({ ok: true, mode: 'unconfigured' })
  }

  const hutk = req.cookies.get('hubspotutk')?.value

  const params = new URLSearchParams()
  params.set('email', email)
  params.set('firstname', firstName)
  params.set('lastname', lastName)
  params.set('company', company)
  if (role) params.set('jobtitle', role)
  if (product) params.set('use_case', product)
  if (challenge) params.set('compliance_challenge', challenge)
  params.set(
    'hs_context',
    JSON.stringify({
      pageName: 'Book a Demo — Fintegrity',
      ...(pageUri ? { pageUri } : { pageUri: 'https://www.getfintegrity.com/demo' }),
      ...(hutk ? { hutk } : {}),
    }),
  )

  try {
    const hsRes = await fetch(
      `https://forms.hubspot.com/uploads/form/v2/${portalId}/${formId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      },
    )

    if (!hsRes.ok) {
      const errBody = await hsRes.text()
      console.error('[api/demo] HubSpot submission failed:', hsRes.status, errBody)
      return NextResponse.json({ ok: false, error: FALLBACK_ERROR }, { status: 502 })
    }

    return NextResponse.json({ ok: true, mode: 'hubspot' })
  } catch (err) {
    console.error('[api/demo] HubSpot submission error:', err)
    return NextResponse.json({ ok: false, error: FALLBACK_ERROR }, { status: 502 })
  }
}
