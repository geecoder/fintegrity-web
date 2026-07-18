import type { MetadataRoute } from 'next'
import { STATIC_ROUTES } from '@/lib/routes'
import { BLOG_POSTS } from '@/lib/blog'
import { CASE_STUDIES } from '@/lib/case-studies'
import { SITE_URL } from '@/lib/config'

// Built from STATIC_ROUTES (lib/routes.ts) plus the blog and case-study
// registries — three single sources of truth, so this file never drifts
// out of sync with what's actually indexable. Noindexed stub pages
// (partners, resources, fraud-monitoring, embedded-finance,
// microfinance-banks) and /thank-you, /api/* are deliberately excluded —
// see the comment in lib/routes.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.65,
  }))

  return [...staticEntries, ...blogEntries, ...caseStudyEntries]
}
