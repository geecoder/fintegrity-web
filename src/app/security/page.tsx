import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Security',
  description: 'Fintegrity\'s security posture, data handling practices, infrastructure controls, and penetration testing commitments.',
  alternates: { canonical: 'https://www.getfintegrity.com/security' },
  robots: { index: false },
}

export default function SecurityPage() {
  return (
    <StubPage
      category="Trust"
      title="Security"
      description="Fintegrity's security posture, infrastructure controls, and data handling practices. Full content for this page is coming soon."
    />
  )
  // CONTENT TODO
}
