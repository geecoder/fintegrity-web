import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Fintegrity Technologies Limited partner programme — for payment infrastructure providers, compliance consultancies, and fintech enablers.',
  alternates: { canonical: 'https://www.getfintegrity.com/partners' },
  robots: { index: false },
}

export default function PartnersPage() {
  return (
    <StubPage
      category="Company"
      title="Partners"
      description="Technology and consulting partners who work with Fintegrity to deliver compliance infrastructure. Full content for this page is coming soon."
    />
  )
  // CONTENT TODO
}
