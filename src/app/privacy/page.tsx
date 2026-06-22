import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'
import { CONTACT_EMAIL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Fintegrity Technologies Limited privacy policy — how we collect, process, and protect personal data.',
  alternates: { canonical: 'https://www.getfintegrity.com/privacy' },
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <StubPage
      category="Legal"
      title="Privacy Policy"
      description={`Fintegrity Technologies Limited privacy policy. For privacy questions, contact ${CONTACT_EMAIL}. Full policy is being prepared by our legal team.`}
    />
  )
  // CONTENT TODO — requires legal review before publication
}
