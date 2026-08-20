import { NextRequest, NextResponse } from 'next/server'

/**
 * Server-side HubSpot form submission handler.
 *
 * Environment variables required (set in Vercel — never expose HUBSPOT_PRIVATE_TOKEN client-side):
 *   NEXT_PUBLIC_HUBSPOT_PORTAL_ID  — your HubSpot portal ID (safe to be public)
 *   NEXT_PUBLIC_HUBSPOT_FORM_ID    — the form GUID from HubSpot (safe to be public)
 *   HUBSPOT_PRIVATE_TOKEN          — private app token for API auth (server-side only)
 *
 * If any var is unset, the route returns { ok: true, mode: 'unconfigured' }.
 * The client treats this as success and falls back to the booking calendar link.
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
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
  const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID
  const token = process.env.HUBSPOT_PRIVATE_TOKEN

  if (isRateLimited(getClientKey(req))) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  let body: DemoFormPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 })
  }

  // Honeypot tripped: pretend success so the bot doesn't learn it was caught,
  // but never forward the submission to HubSpot.
  if ((body.website ?? '').trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  // Graceful degradation: succeed without HubSpot so the UX still works
  if (!portalId || !formId || !token) {
    return NextResponse.json({ ok: true, mode: 'unconfigured' })
  }

  // Basic server-side validation — do not pass raw user input beyond these fields
  const email = (body.email ?? '').trim()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 })
  }

  const fields = [
    { name: 'firstname', value: (body.firstName ?? '').trim() },
    { name: 'lastname', value: (body.lastName ?? '').trim() },
    { name: 'email', value: email },
    { name: 'company', value: (body.company ?? '').trim() },
    { name: 'jobtitle', value: (body.role ?? '').trim() },
    // Map to a HubSpot custom property if configured; otherwise it goes in the message field
    { name: 'message', value: [body.product, body.challenge].filter(Boolean).join('\n\n') },
  ].filter((f) => f.value !== '')

  let hsRes: Response
  try {
    hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: body.pageUri ?? 'https://www.getfintegrity.com/demo',
            pageName: 'Book a Demo — Fintegrity',
          },
        }),
      },
    )
  } catch (err) {
    console.error('[demo/route] HubSpot fetch failed:', err)
    return NextResponse.json({ ok: false, error: 'Upstream error' }, { status: 502 })
  }

  if (!hsRes.ok) {
    const detail = await hsRes.text().catch(() => '')
    console.error('[demo/route] HubSpot rejected submission:', hsRes.status, detail)
    return NextResponse.json({ ok: false, error: 'CRM submission failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, mode: 'hubspot' })
}
