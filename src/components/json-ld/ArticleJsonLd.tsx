import { SITE_URL } from '@/lib/config'

interface ArticleJsonLdProps {
  headline: string
  description: string
  slug: string
  datePublished: string // ISO date, e.g. '2026-04-02'
  dateModified?: string // defaults to datePublished
}

// Article structured data for blog posts. Author is the Organization, not an
// individual byline — posts aren't currently attributed to a named person.
export default function ArticleJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
}: ArticleJsonLdProps) {
  const url = `${SITE_URL}/blog/${slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: `${SITE_URL}/opengraph-image.png`,
    author: {
      '@type': 'Organization',
      name: 'Fintegrity Technologies Limited',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Fintegrity Technologies Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/lockup-color.svg`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
