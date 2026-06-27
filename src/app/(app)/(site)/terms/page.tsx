import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Fintegrity Technologies Limited terms of service.',
  alternates: { canonical: 'https://www.getfintegrity.com/terms' },
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <StubPage
      category="Legal"
      title="Terms of Service"
      description="Fintegrity Technologies Limited terms of service. Full terms are being prepared by our legal team."
    />
  )
  // CONTENT TODO — requires legal review before publication
}
