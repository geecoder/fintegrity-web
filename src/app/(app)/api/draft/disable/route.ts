import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/** GET /api/draft/disable — exits draft mode and returns to the slug. */
export async function GET(req: NextRequest) {
  ;(await draftMode()).disable()
  const slug = req.nextUrl.searchParams.get('slug') ?? '/'
  redirect(slug)
}
