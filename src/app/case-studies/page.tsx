import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'How Nigerian fintechs use Fintegrity to meet CBN AML/CFT requirements and demonstrate compliance in real time.',
  alternates: { canonical: 'https://www.getfintegrity.com/case-studies' },
  robots: { index: false },
}

export default function CaseStudiesPage() {
  return (
    <StubPage
      category="Case Studies"
      title="Case Studies"
      description="How Fintegrity design partners are building defensible compliance infrastructure. Coming soon as design partnerships develop."
    />
  )
  // CONTENT TODO
}
