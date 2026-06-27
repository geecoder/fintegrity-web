import type { MetadataRoute } from 'next'

// Only indexable pages are included. Stub pages (robots: noindex) and /thank-you are excluded.
// Update lastModified when page content is significantly changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.getfintegrity.com'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },

    // Product pages (real content)
    { url: `${base}/transaction-monitoring`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/case-management`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/compliance-decisioning-api`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/transaction-screening`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/rules-engine`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/customer-risk-profiling`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

    // Industry/solution pages (real content)
    { url: `${base}/solutions/digital-wallets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/solutions/fintechs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/solutions/payment-service-providers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/solutions/remittance-companies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/solutions/banks`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/solutions/crypto-businesses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

    // Company pages
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/book-a-demo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

    // Blog
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${base}/blog/cbnaml-baseline-standards`, lastModified: new Date('2026-03-15'), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/allow-review-block-compliance-decisions`, lastModified: new Date('2026-04-02'), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/real-time-vs-batch-aml`, lastModified: new Date('2026-05-10'), changeFrequency: 'yearly', priority: 0.7 },
  ]
}
