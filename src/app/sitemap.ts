import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog'

// Only indexable pages are included. Stub/coming-soon pages (robots: noindex)
// and /thank-you, /cookie-settings are excluded.
// Update lastModified when page content is significantly changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.getfintegrity.com'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },

    // Products
    { url: `${base}/products/transaction-monitoring`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/products/transaction-monitoring/decision-api`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/products/payment-screening`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/products/customer-lifecycle`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Use cases
    { url: `${base}/solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

    // Company pages
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/demo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // Legal
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },

    // Blog
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    ...BLOG_POSTS.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
