import type { FaqItem } from '@/components/ui/FaqAccordion'

// Only render this on pages that display the exact same Q&A visibly in the
// DOM (via FaqAccordion) — FAQPage markup without matching visible content
// violates Google's structured-data policy.
export default function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
