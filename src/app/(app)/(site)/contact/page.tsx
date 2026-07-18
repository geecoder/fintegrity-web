import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import RevealInit from '@/components/RevealInit'
import { CONTACT_EMAIL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Fintegrity Technologies Limited. We\'re a small team building in public with our design partners. Reach out about partnerships, press, or general enquiries.',
  alternates: { canonical: 'https://www.getfintegrity.com/contact' },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Contact', href: '/contact' }]} />
      <RevealInit />
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner reveal">
            <span className="sec-eyebrow">Contact</span>
            <h1>Get in touch</h1>
            <p className="page-hero-lead">
              We&apos;re a small, focused team. The fastest way to reach us is email. For product
              questions and demos, the booking link below goes directly to the founder.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-page">
        <div className="wrap">
          <div className="contact-grid">
            <div className="reveal">
              <div className="contact-method">
                <div className="contact-method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#0A1F44" strokeWidth="1.8" />
                    <path d="M2 8l10 6 10-6" stroke="#0A1F44" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3>General enquiries</h3>
                  <p>
                    For partnerships, press, and general questions:{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="#0A1F44" strokeWidth="1.8" />
                    <path d="M3 9h18M9 9v11" stroke="#0A1F44" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3>Product demos</h3>
                  <p>
                    Want to see the platform?{' '}
                    <Link href="/book-a-demo" style={{ color: 'var(--indigo)' }}>Book a demo →</Link>
                  </p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="#0A1F44" strokeWidth="1.8" />
                    <path d="M8.5 9c.5-1.5 2-2.5 3.5-2.5 2 0 3.5 1.5 3.5 3 0 2-2 3-3.5 3v1.5" stroke="#0A1F44" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="12" cy="18" r=".5" fill="#0A1F44" stroke="#0A1F44" strokeWidth=".5" />
                  </svg>
                </div>
                <div>
                  <h3>Press and media</h3>
                  <p>
                    Press enquiries: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                    Please include your publication and deadline.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div style={{ background: 'var(--bg-soft)', borderRadius: 'var(--r)', padding: '28px', border: '1px solid var(--line)' }}>
                <div className="sec-eyebrow" style={{ marginBottom: '16px' }}>Company details</div>
                <dl style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    ['Legal name', 'Fintegrity Technologies Limited'],
                    ['Registered in', 'Nigeria (CAC)'],
                    ['Headquarters', 'Lagos, Nigeria'],
                    ['Founded', '2026'],
                    ['Stage', 'Early-stage, active development'],
                    ['Contact email', CONTACT_EMAIL],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{label}</dt>
                      <dd style={{ fontSize: '0.93rem', color: 'var(--ink)' }}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div style={{ marginTop: '16px', background: '#EBEEF3', borderRadius: 'var(--r)', padding: '22px', border: '1px solid #D8DFE8' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate)', lineHeight: 1.65, marginBottom: '16px' }}>
                  Want to work with us? We&apos;re always open to conversations with compliance engineers, fintech founders building in the AML space, and qualified compliance professionals interested in the design partner programme.
                </p>
                <Link href="/book-a-demo" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Book a conversation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
