import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Compliance guides, regulatory breakdowns, integration documentation, and technical resources from Fintegrity Technologies Limited.',
  alternates: { canonical: 'https://www.getfintegrity.com/resources' },
  robots: { index: false },
}

export default function ResourcesPage() {
  return (
    <StubPage
      category="Resources"
      title="Resources"
      description="Compliance guides, regulatory breakdowns, and technical resources. For now, see our blog for published content."
    />
  )
  // CONTENT TODO
}
