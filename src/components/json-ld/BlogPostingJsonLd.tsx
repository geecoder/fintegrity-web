import { SITE_URL } from '@/lib/config'

interface Props {
  slug: string
  title: string
  description: string
  publishedAt: string
  category: string
}

export default function BlogPostingJsonLd({ slug, title, description, publishedAt, category }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${slug}#article`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    articleSection: category,
    author: {
      '@type': 'Organization',
      name: 'Fintegrity Team',
      '@id': `${SITE_URL}/#organization`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Fintegrity Technologies Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/wordmark-color.svg`,
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
