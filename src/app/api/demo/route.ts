import { NextRequest, NextResponse } from 'next/server'
import { isPersonalEmail, PERSONAL_EMAIL_ERROR } from '@/lib/email-validation'

export const runtime = 'nodejs'

interface DemoRequestBody {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  role?: string
  useCase?: string
  challenge?: string
  pageUri?: string
}

const FALLBACK_ERROR =
  'Demo request could not be submitted right now. Please email contact@getfintegrity.com directly.'

function isConfigured(value: string | undefined): value is string {
  return !!value && !value.startsWith('your_')
}

export async function POST(req: NextRequest) {
  let body: DemoRequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const { firstName, lastName, email, company, role, useCase, challenge, pageUri } = body

  if (!firstName || !lastName || !email || !company || !role || !useCase || !challenge) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
  }

  if (isPersonalEmail(email)) {
    return NextResponse.json({ ok: false, error: PERSONAL_EMAIL_ERROR }, { status: 400 })
  }

  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
  const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID

  if (!isConfigured(portalId) || !isConfigured(formId)) {
    console.error('[api/demo] HubSpot portal/form ID not configured — set NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_FORM_ID')
    return NextResponse.json({ ok: false, error: FALLBACK_ERROR }, { status: 503 })
  }

  const hutk = req.cookies.get('hubspotutk')?.value

  // HubSpot's legacy "Submit data to a form" endpoint. Unlike the v3 Forms
  // API, it doesn't require legalConsentOptions/GDPR config to match the
  // form's HubSpot-side setup, and silently ignores field names that aren't
  // configured as contact properties rather than rejecting the whole
  // submission — simpler and more forgiving for a custom-built form UI.
  const params = new URLSearchParams()
  params.set('email', email)
  params.set('firstname', firstName)
  params.set('lastname', lastName)
  params.set('company', company)
  params.set('jobtitle', role)
  params.set('use_case', useCase)
  params.set('compliance_challenge', challenge)
  params.set(
    'hs_context',
    JSON.stringify({
      pageName: 'Book a Demo',
      ...(pageUri ? { pageUri } : {}),
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
