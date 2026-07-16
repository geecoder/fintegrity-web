import Link from 'next/link'
import RevealInit from '@/components/RevealInit'

interface StubPageProps {
  title: string
  description: string
  category?: string
}

// Placeholder component for noindex routes. Replace when real content is ready.
export default function StubPage({ title, description, category }: StubPageProps) {
  return (
    <div className="stub-page">
      <RevealInit />
      <div className="stub-inner reveal">
        {category && <div className="stub-eyebrow">{category}</div>}
        <h1>{title}</h1>
        <p>{description}</p>
        {/* CONTENT TODO */}
        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '28px' }}>
          This page is in development. Explore what Fintegrity already offers.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/compliance-decisioning-api" className="btn btn-primary">
            See the Decision API →
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
