import { SITE_URL, CONTACT_EMAIL, LINKEDIN_URL } from '@/lib/config'

// Organization.name must match the canonical legal name on the Certificate of Incorporation.
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Fintegrity Technologies Limited',
      alternateName: 'Fintegrity',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/wordmark-color.svg`,
        width: 180,
        height: 36,
      },
      sameAs: [LINKEDIN_URL],
      description:
        "We don't sell checks. We sell defensible compliance decisions. Fintegrity is the compliance decision and evidence layer for regulated African fintechs — real-time transaction monitoring, payment screening, and a Compliance Decision API, built for CBN and NFIU-regulated institutions.",
      foundingDate: '2026',
      areaServed: [
        { '@type': 'Country', name: 'Nigeria' },
        { '@type': 'Place', name: 'Africa' },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: CONTACT_EMAIL,
        contactType: 'customer support',
        areaServed: 'NG',
        availableLanguage: 'English',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Fintegrity Technologies Limited',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
