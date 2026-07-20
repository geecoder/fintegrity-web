import type { Metadata } from 'next'
import StubPage from '@/components/ui/StubPage'
import TrackOnMount from '@/components/analytics/TrackOnMount'

export const metadata: Metadata = {
  title: 'Developer API',
  description: 'Full reference documentation for the Fintegrity API — endpoints, authentication, error codes, SDKs, and integration guides. Coming soon.',
  alternates: { canonical: 'https://www.getfintegrity.com/developer-api' },
  robots: { index: false },
}

export default function DeveloperApiPage() {
  return (
    <>
      <TrackOnMount event="Developer Docs Viewed" props={{ page: '/developer-api' }} />
      <StubPage
        category="Developers"
        title="Developer API Documentation"
        description="Full API reference, authentication guide, error codes, and SDKs. The full documentation site is at api.dev.getfintegrity.com. Full content for this page is coming soon."
      />
    </>
  )
  // CONTENT TODO
}
