import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Audit Trail & Reporting',
  description: 'Every Fintegrity decision, state change, and case action is written to an append-only audit trail — structured for regulatory reporting and on-demand evidence generation.',
  alternates: { canonical: 'https://www.getfintegrity.com/audit-trail-and-reporting' },
  robots: { index: false },
}

export default function AuditTrailPage() {
  return (
    <StubPage
      category="Product"
      title="Audit Trail & Reporting"
      description="Append-only, immutable evidence store for every compliance decision. Regulator-ready evidence packs on demand. Full content for this page is coming soon."
    />
  )
  // CONTENT TODO
}
