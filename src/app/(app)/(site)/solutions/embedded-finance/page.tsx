import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'AML Compliance for Embedded Finance',
  description: 'Compliance infrastructure for embedded finance providers — serving multiple client fintechs with configurable, isolated compliance decisioning.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/embedded-finance' },
  robots: { index: false },
}

export default function EmbeddedFinancePage() {
  return (
    <StubPage
      category="Solutions"
      title="AML Compliance for Embedded Finance"
      description="Multi-tenant compliance decisioning for embedded finance providers. Full content for this page is coming soon."
    />
  )
  // CONTENT TODO
}
