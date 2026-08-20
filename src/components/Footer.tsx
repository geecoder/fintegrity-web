'use client'

import Link from 'next/link'
import { CONTACT_EMAIL, LINKEDIN_URL } from '@/lib/config'
import { trackMarketingEvent } from '@/lib/analytics'
import TrackedLink from '@/components/analytics/TrackedLink'
import styles from './Footer.module.css'

const USE_CASES = [
  { href: '/solutions#wallets', label: 'Digital Wallets & Super Apps' },
  { href: '/solutions#fintechs', label: 'Fintechs & Digital Banks' },
  { href: '/solutions#psps', label: 'PSPs & Processors' },
  { href: '/solutions#remittance', label: 'Remittance & Cross-Border' },
  { href: '/solutions#banks', label: 'Banks & Microfinance' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/security', label: 'Security' },
  { href: '/contact', label: 'Contact' },
  { href: '/partners', label: 'Partners' },
]

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/cookie-settings', label: 'Cookie Settings' },
]

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.5c.6-1 1.8-1.8 3.5-1.8 2.7 0 4.2 1.7 4.2 5v6.3h-4v-5.7c0-1.5-.6-2.4-1.9-2.4-1.2 0-1.9.8-1.9 2.4v5.7h-4v-11Z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand} aria-label="Fintegrity home">
              <svg viewBox="0 0 96 96" width="22" height="22" role="img" aria-hidden="true" style={{ flex: 'none' }}>
                <rect x="14" y="10" width="13" height="76" fill="#F7F3EC" />
                <rect x="14" y="10" width="54" height="13" fill="#F7F3EC" />
                <path d="M35 57L48 70L76 39" fill="none" stroke="#0E9F6E" strokeWidth="13" />
              </svg>
              <span className={styles.wordmark}>
                Fintegrity<span className={styles.brandDot}>.</span>
              </span>
            </Link>
            <p className={styles.brandBlurb}>Embedded compliance decisioning for regulated African fintechs.</p>
            <div className={styles.brandActions}>
              <Link
                href="/demo"
                className={styles.brandCta}
                onClick={() => trackMarketingEvent('Primary CTA Clicked', { location: 'footer' })}
              >
                Book a demo <span aria-hidden="true">→</span>
              </Link>
              <TrackedLink
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fintegrity on LinkedIn"
                className={styles.socialButton}
                event="Outbound Link Clicked"
                eventProps={{ destination: LINKEDIN_URL, location: 'footer' }}
              >
                <LinkedInIcon />
              </TrackedLink>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colLabel}>Product</div>
            <div className={styles.colLinks}>
              <Link href="/products/transaction-monitoring" className={styles.colLinkPrimary}>Transaction Monitoring</Link>
              <Link href="/products/transaction-monitoring/decision-api" className={styles.colLinkIndented}>Decision API</Link>
              <Link href="/products/transaction-monitoring#cases" className={styles.colLinkIndented}>Case Management</Link>
              <Link href="/products/transaction-monitoring#rules" className={styles.colLinkIndented}>Rules Engine</Link>
              <Link href="/products/transaction-monitoring#evidence" className={styles.colLinkIndented}>Audit trail &amp; evidence</Link>
              <Link href="/products/payment-screening" className={`${styles.colLinkPrimary} ${styles.colLinkSpaced}`}>Payment Screening</Link>
              <Link href="/products/customer-lifecycle" className={`${styles.colLinkPrimary} ${styles.colLinkSpaced} ${styles.colLinkSoon}`}>
                Customer Lifecycle Management
                <span className={styles.soonChip}>Soon</span>
              </Link>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colLabel}>Use cases</div>
            <div className={styles.colLinks}>
              {USE_CASES.map((l) => (
                <Link key={l.href} href={l.href} className={styles.colLink}>{l.label}</Link>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colLabel}>Company</div>
            <div className={styles.colLinks}>
              {COMPANY_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={styles.colLink}>{l.label}</Link>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colLabel}>Legal</div>
            <div className={styles.colLinks}>
              {LEGAL_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={styles.colLink}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.legalLine}>
            © {year} Fintegrity Technologies Limited. Registered in Nigeria. Lagos, Nigeria. Regulatory references are not legal advice.{' '}
            <TrackedLink
              href={`mailto:${CONTACT_EMAIL}`}
              className={styles.legalMail}
              event="Contact Link Clicked"
              eventProps={{ method: 'email', location: 'footer' }}
            >
              {CONTACT_EMAIL}
            </TrackedLink>
          </p>
          <p className={styles.positioningLine}>We don&rsquo;t sell checks. We sell defensible compliance decisions.</p>
        </div>
      </div>
    </footer>
  )
}
