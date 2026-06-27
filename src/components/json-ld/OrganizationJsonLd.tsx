import { SITE_URL, CONTACT_EMAIL } from '@/lib/config'

// Organization.name must match the canonical legal name on the Certificate of Incorporation.
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Fintegrity Technologies Limited',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/fintegrity_wm_indigo_mono.png`,
        width: 180,
        height: 36,
      },
      description:
        'Embedded compliance decisioning for regulated fintechs in Africa. Real-time AML transaction monitoring, case management, and a Compliance Decision API — built for CBN and NFIU-regulated institutions.',
      foundingDate: '2026',
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
