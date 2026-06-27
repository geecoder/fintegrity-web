import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

// This route is intentionally kept for URL continuity but is NOT linked in the nav.
// MFB content is now covered by /solutions/banks (Banks & Microfinance Institutions).
// Do NOT add this route back to the nav dropdown.

export const metadata: Metadata = {
  title: 'AML Compliance for Microfinance Banks',
  description: 'Fintegrity compliance infrastructure for Nigerian microfinance banks. See our Banks & Microfinance Institutions page for full details.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/banks' },
  robots: { index: false },
}

export default function MicrofinanceBanksPage() {
  return (
    <StubPage
      category="Industries"
      title="AML Compliance for Microfinance Banks"
      description="Microfinance bank compliance is now covered by our Banks & Microfinance Institutions page. Full content for this page is coming soon."
    />
  )
  // CONTENT TODO — consolidate with /solutions/banks or redirect to it
}
