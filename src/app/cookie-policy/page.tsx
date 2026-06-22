import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Fintegrity Technologies Limited cookie policy — how we use cookies and similar technologies on this website.',
  alternates: { canonical: 'https://www.getfintegrity.com/cookie-policy' },
  robots: { index: false },
}

export default function CookiePolicyPage() {
  return (
    <StubPage
      category="Legal"
      title="Cookie Policy"
      description="How Fintegrity Technologies Limited uses cookies and similar technologies. Full policy is being prepared."
    />
  )
  // CONTENT TODO — requires legal review before publication
}
