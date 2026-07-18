import type { Metadata } from 'next'
import { SITE_URL } from './config'

interface BuildMetadataInput {
  title: string
  description: string
  path: string // e.g. '/transaction-monitoring', '' for homepage
  ogTitle?: string // defaults to title
  ogDescription?: string // defaults to description
  noIndex?: boolean
}

// Single source of truth for per-page metadata so canonical, OG, and Twitter
// card fields can never drift out of sync with each other. Every new page's
// `metadata` export should be built through this rather than hand-rolling
// the `alternates`/`openGraph`/`twitter` objects individually.
//
// IMPORTANT: `title` must NOT include "Fintegrity" — the root layout's
// `title.template` ('%s — Fintegrity Technologies Limited') appends it
// automatically to the <title> tag. openGraph/twitter titles aren't run
// through that template, so they default to an explicitly branded version.
export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`
  const brandedOgTitle = ogTitle ?? `${title} — Fintegrity Technologies Limited`

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false } } : {}),
    openGraph: {
      title: brandedOgTitle,
      description: ogDescription ?? description,
      url,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedOgTitle,
      description: ogDescription ?? description,
      images: ['/opengraph-image.png'],
    },
  }
}
