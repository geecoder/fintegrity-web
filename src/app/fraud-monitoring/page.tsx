import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Fraud Monitoring',
  description: 'Fintegrity Fraud Monitoring applies behavioural and network-based fraud detection on top of the compliance decision layer — one integrated signal, not a separate system.',
  alternates: { canonical: 'https://www.getfintegrity.com/fraud-monitoring' },
  robots: { index: false },
}

export default function FraudMonitoringPage() {
  return (
    <StubPage
      category="Product"
      title="Fraud Monitoring"
      description="Behavioural fraud detection integrated with AML compliance controls. Full content for this page is coming soon."
    />
  )
  // CONTENT TODO
}
