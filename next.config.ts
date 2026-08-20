import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const config: NextConfig = {
  trailingSlash: false,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '^getfintegrity\\.com$' }],
        destination: 'https://www.getfintegrity.com/:path*',
        permanent: true,
      },

      // ── 2026 redesign — old IA to new IA ──────────────────────────────────
      // Transaction Monitoring's four capabilities move from top-level routes
      // to sections of a single product page (see CLAUDE-CODE-BRIEF.md §1, §6).
      { source: '/book-a-demo', destination: '/demo', permanent: true },
      { source: '/transaction-monitoring', destination: '/products/transaction-monitoring', permanent: true },
      { source: '/case-management', destination: '/products/transaction-monitoring#cases', permanent: true },
      { source: '/rules-engine', destination: '/products/transaction-monitoring#rules', permanent: true },
      { source: '/audit-trail-and-reporting', destination: '/products/transaction-monitoring#evidence', permanent: true },
      { source: '/compliance-decisioning-api', destination: '/products/transaction-monitoring/decision-api', permanent: true },
      { source: '/transaction-screening', destination: '/products/payment-screening', permanent: true },
      { source: '/fraud-monitoring', destination: '/products/transaction-monitoring', permanent: true },
      { source: '/customer-risk-profiling', destination: '/products/customer-lifecycle', permanent: true },
      { source: '/developer-api', destination: 'https://api.dev.getfintegrity.com/docs', permanent: true },
      { source: '/resources', destination: '/blog', permanent: true },

      // Six business-model sub-pages collapse into one /solutions page with an
      // in-page switcher, deep-linked by hash (brief §10).
      { source: '/solutions/digital-wallets', destination: '/solutions#wallets', permanent: true },
      { source: '/solutions/fintechs', destination: '/solutions#fintechs', permanent: true },
      { source: '/solutions/payment-service-providers', destination: '/solutions#psps', permanent: true },
      { source: '/solutions/remittance-companies', destination: '/solutions#remittance', permanent: true },
      { source: '/solutions/banks', destination: '/solutions#banks', permanent: true },
      { source: '/solutions/crypto-businesses', destination: '/solutions#crypto', permanent: true },
      { source: '/solutions/embedded-finance', destination: '/solutions', permanent: true },
      { source: '/solutions/microfinance-banks', destination: '/solutions#banks', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default withPayload(config)