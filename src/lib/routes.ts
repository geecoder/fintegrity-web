// Single source of truth for static, indexable marketing routes.
// sitemap.ts reads this directly. Blog posts (lib/blog.ts) and case studies
// (lib/case-studies.ts) are appended separately since they're already
// data-driven registries — duplicating them here would be the exact drift
// this file exists to prevent.
//
// Excluded on purpose (do not add): /thank-you, /api/*, and the noindexed
// stub pages (partners, resources, fraud-monitoring, solutions/embedded-finance,
// solutions/microfinance-banks, developer-api) — each of those already sets
// `robots: { index: false }` on its own metadata export.

export interface StaticRoute {
  path: string
  priority: number
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

export const STATIC_ROUTES: StaticRoute[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },

  // Product pages
  { path: '/transaction-monitoring', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/case-management', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/compliance-decisioning-api', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/transaction-screening', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/rules-engine', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/customer-risk-profiling', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/audit-trail-and-reporting', priority: 0.9, changeFrequency: 'monthly' },

  // Geo / market pages
  { path: '/nigeria', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/africa', priority: 0.8, changeFrequency: 'monthly' },

  // Industry/solution pages
  { path: '/solutions/digital-wallets', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/solutions/fintechs', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/solutions/payment-service-providers', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/solutions/remittance-companies', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/solutions/banks', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/solutions/crypto-businesses', priority: 0.85, changeFrequency: 'monthly' },

  // Company pages
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/security', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/book-a-demo', priority: 0.85, changeFrequency: 'monthly' },

  // Blog & case studies index
  { path: '/blog', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/case-studies', priority: 0.7, changeFrequency: 'monthly' },
]
