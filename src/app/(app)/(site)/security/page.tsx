import type { Metadata } from 'next'
import RevealInit from '@/components/RevealInit'
import CTABand from '@/components/ui/CTABand'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import { CONTACT_EMAIL } from '@/lib/config'
import TrackedLink from '@/components/analytics/TrackedLink'

export const metadata: Metadata = {
  title: 'Security',
  description:
    'How Fintegrity protects data: encryption in transit and at rest, role-based access controls, hosting practices, our ISO 27001 alignment roadmap, and how to report a vulnerability.',
  alternates: { canonical: 'https://www.getfintegrity.com/security' },
  openGraph: {
    title: 'Security at Fintegrity Technologies Limited',
    description: 'A plain-language overview of how we protect the data that runs through our platform.',
    url: 'https://www.getfintegrity.com/security',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const PROTECTIONS = [
  {
    icon: '🔐',
    title: 'Encryption in transit and at rest',
    body: 'All traffic to and from our platform is encrypted using industry-standard TLS. Stored data is encrypted at rest using our infrastructure provider’s encryption capabilities.',
  },
  {
    icon: '🔑',
    title: 'Role-based access control',
    body: 'Access to production systems and customer data is restricted by role and limited to what each person needs to do their job. Multi-factor authentication is required for administrative access, and access to customer data is logged.',
  },
  {
    icon: '☁️',
    title: 'Established cloud infrastructure',
    body: 'Fintegrity runs on established cloud infrastructure, with physical and network security managed by our hosting provider. We walk prospective Clients through our specific hosting and data-residency setup directly, as part of due diligence.',
  },
  {
    icon: '📒',
    title: 'Immutable evidence trail',
    body: 'Every decision and state change our platform produces is written to an append-only audit trail — the same evidence architecture we build for our Clients’ compliance teams applies to how we run the business.',
  },
]

export default function SecurityPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Security', href: '/security' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Trust</span>
            <h1>Security at Fintegrity</h1>
            <p className="page-hero-lead">
              A plain-language overview of how we protect the data that runs through our
              platform. This page is a summary for anyone evaluating Fintegrity — Clients under
              contract receive fuller technical and security detail as part of due diligence.
            </p>
          </div>
        </div>
      </section>

      {/* ── How we protect data ──────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How we protect your data</span>
            <h2 className="sec-title">Security built into how we operate</h2>
            <p className="sec-intro">
              These are the practices we apply across our platform and infrastructure today.
            </p>
          </div>
          <div className="story-insights reveal">
            {PROTECTIONS.map((item) => (
              <div className="story-insight" key={item.title}>
                <div className="story-insight-icon">{item.icon}</div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance roadmap ────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '640px' }}>
            <span className="sec-eyebrow">Compliance roadmap</span>
            <h2 className="sec-title">Working toward ISO 27001 alignment</h2>
          </div>
          <div className="roadmap-phase reveal" style={{ marginTop: '32px', maxWidth: '520px' }}>
            <div className="phase-badge-num">Status</div>
            <div className="phase-title">ISO/IEC 27001 — not yet certified</div>
            <ul className="phase-items">
              <li>We are aligning our security practices with ISO/IEC 27001 controls.</li>
              <li>Formal third-party certification is on our roadmap — it has not been achieved yet.</li>
              <li>We&apos;ll update this page the moment that status changes.</li>
            </ul>
            <div className="phase-deadline">This describes a roadmap intent, not a certification claim.</div>
          </div>
        </div>
      </section>

      {/* ── Responsible disclosure ────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <span className="sec-eyebrow">Responsible disclosure</span>
            <h2 className="sec-title">Found a vulnerability?</h2>
            <p className="sec-intro">
              If you believe you&apos;ve found a security issue in our platform or website, tell
              us before telling anyone else. Email{' '}
              <TrackedLink
                href={`mailto:${CONTACT_EMAIL}`}
                event="Contact Link Clicked"
                eventProps={{ method: 'email', location: 'security-disclosure' }}
              >
                {CONTACT_EMAIL}
              </TrackedLink> with what you found and how
              to reproduce it, and give us a reasonable window to investigate and fix it before
              any public disclosure. Please don&apos;t access, modify, or exfiltrate data that
              isn&apos;t yours while testing.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        headline="Questions about our security practices?"
        body="If you're evaluating Fintegrity as a Client and need more detail than this page covers, we're happy to walk through it directly."
        primaryLabel="Book a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="Email us"
        secondaryHref={`mailto:${CONTACT_EMAIL}`}
      />
    </>
  )
}
