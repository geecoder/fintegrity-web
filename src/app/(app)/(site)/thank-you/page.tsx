import type { Metadata } from 'next'
import Link from 'next/link'
import RevealInit from '@/components/RevealInit'
import { BOOKING_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Thank you — Demo request received',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <div className="thankyou-page">
      <RevealInit />
      <div className="thankyou-inner reveal">
        <div className="thankyou-icon">✓</div>
        <h1>Demo request received</h1>
        <p>
          Thanks for getting in touch. We&apos;ll review your request and follow up within one
          business day to confirm a time that works.
        </p>
        <p style={{ fontSize: '0.92rem', color: 'var(--muted)', marginBottom: '32px' }}>
          If you&apos;d rather pick a time right now, you can book directly using the calendar
          below.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Pick a time now →
          </a>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
        <div style={{ marginTop: '40px', padding: '20px', background: 'var(--bg-soft)', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            While you wait
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/compliance-decisioning-api', label: 'See the Compliance Decision API' },
              { href: '/transaction-monitoring', label: 'Explore transaction monitoring' },
              { href: '/blog', label: 'Read the Fintegrity blog' },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ fontSize: '0.92rem', color: 'var(--indigo)', fontWeight: 500 }}>
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
