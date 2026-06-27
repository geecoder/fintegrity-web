import { SITE_URL } from '@/lib/config'

// Only added to the Compliance Decision API page, where the visible content
// genuinely describes a callable software application.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fintegrity Compliance Decision API',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  url: `${SITE_URL}/compliance-decisioning-api`,
  description:
    'A real-time compliance decisioning API that returns ALLOW, REVIEW, or BLOCK for financial transactions — with the customer risk state, rules that fired, required actions, and an immutable evidence reference. Built for CBN-regulated fintechs.',
  featureList: [
    'Real-time compliance decisions (ALLOW / REVIEW / BLOCK)',
    'Customer risk state management (ACTIVE / UNDER_REVIEW / BLOCKED)',
    'Configurable AML rule evaluation',
    'Immutable evidence reference per decision',
    'Sub-50ms P99 latency',
    'RESTful JSON API',
  ],
  offers: {
    '@type': 'Offer',
    seller: {
      '@type': 'Organization',
      name: 'Fintegrity Technologies Limited',
      url: SITE_URL,
    },
  },
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
  },
}

export default function SoftwareAppJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
