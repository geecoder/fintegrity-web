import { SITE_URL } from '@/lib/config'

interface Crumb {
  name: string
  /** relative path, e.g. '/transaction-monitoring' */
  href: string
}

interface Props {
  /** Inner crumbs after Home. The last crumb is the current page. */
  items: Crumb[]
}

export default function BreadcrumbJsonLd({ items }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...items.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.href}`,
      })),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
