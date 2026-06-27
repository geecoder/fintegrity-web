import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/**
 * GET /api/draft?secret=<PAYLOAD_SECRET>&slug=/path
 *
 * Enables Next.js draft mode (sets the __prerender_bypass cookie) and
 * redirects to the given slug. Used by Payload's Live Preview iframe and
 * the admin "Preview" button.
 *
 * Security: validates the secret against PAYLOAD_SECRET before enabling
 * draft mode. Only authenticated admin users know the secret.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') ?? '/'

  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return new Response('Invalid draft secret', { status: 401 })
  }

  // Enable draft mode — sets a secure httpOnly cookie for this session
  ;(await draftMode()).enable()

  // Redirect to the target page (now in draft mode, so it will fetch unpublished content)
  redirect(slug)
}
