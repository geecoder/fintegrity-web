import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import { CONTACT_EMAIL, BOOKING_URL } from '@/lib/config'
import TrackedLink from '@/components/analytics/TrackedLink'
import styles from './page.module.css'

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

      <header className={styles.hero}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Contact</div>
          <h1 className={styles.h1}>Get in touch</h1>
          <p className={styles.lede}>
            We&rsquo;re a small, focused team. The fastest way to reach us is email. For product questions and
            demos, the booking link below goes directly to the founder.
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={`fg-container ${styles.grid}`}>
          <div>
            <div className={styles.method}>
              <div className={styles.methodIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="var(--fg-green-700)" strokeWidth="1.8" />
                  <path d="M2 8l10 6 10-6" stroke="var(--fg-green-700)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className={styles.methodTitle}>General enquiries</h3>
                <p className={styles.methodBody}>
                  For partnerships, press, and general questions:{' '}
                  <TrackedLink href={`mailto:${CONTACT_EMAIL}`} event="Contact Link Clicked" eventProps={{ method: 'email', location: 'contact-general' }}>{CONTACT_EMAIL}</TrackedLink>
                </p>
              </div>
            </div>

            <div className={styles.method}>
              <div className={styles.methodIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="16" rx="2" stroke="var(--fg-green-700)" strokeWidth="1.8" />
                  <path d="M3 9h18M9 9v11" stroke="var(--fg-green-700)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className={styles.methodTitle}>Product demos</h3>
                <p className={styles.methodBody}>
                  Want to see the platform? <Link href="/demo">Book a demo</Link> or use the calendar link:{' '}
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    schedule directly →
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.method}>
              <div className={styles.methodIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="var(--fg-green-700)" strokeWidth="1.8" />
                  <path
                    d="M8.5 9c.5-1.5 2-2.5 3.5-2.5 2 0 3.5 1.5 3.5 3 0 2-2 3-3.5 3v1.5"
                    stroke="var(--fg-green-700)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="18" r=".5" fill="var(--fg-green-700)" stroke="var(--fg-green-700)" strokeWidth=".5" />
                </svg>
              </div>
              <div>
                <h3 className={styles.methodTitle}>Press and media</h3>
                <p className={styles.methodBody}>
                  Press enquiries: <TrackedLink href={`mailto:${CONTACT_EMAIL}`} event="Contact Link Clicked" eventProps={{ method: 'email', location: 'contact-press' }}>{CONTACT_EMAIL}</TrackedLink>. Please include your
                  publication and deadline.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.detailsCard}>
              <div className={styles.eyebrow} style={{ marginBottom: 0 }}>Company details</div>
              <dl className={styles.detailsList}>
                {[
                  ['Legal name', 'Fintegrity Technologies Limited'],
                  ['Registered in', 'Nigeria (CAC)'],
                  ['Headquarters', 'Lagos, Nigeria'],
                  ['Founded', '2026'],
                  ['Stage', 'Early-stage, active development'],
                  ['Contact email', CONTACT_EMAIL],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className={styles.detailLabel}>{label}</dt>
                    <dd className={`${styles.detailValue} fg-num`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.partnerCard}>
              <p>
                Want to work with us? We&rsquo;re always open to conversations with compliance engineers, fintech
                founders building in the AML space, and qualified compliance professionals interested in the design
                partner programme.
              </p>
              <Link href="/demo" className={styles.btnPrimary}>
                Book a conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
