import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /thank-you is a post-conversion redirect target, not a landing page.
      // Individually noindexed stub pages (partners, resources, embedded-finance,
      // etc.) already set `robots: { index: false }` on their own metadata —
      // that's the correct per-page signal; this just covers the whole /api tree.
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: 'https://www.getfintegrity.com/sitemap.xml',
  }
}
