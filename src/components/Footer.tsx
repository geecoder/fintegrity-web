import Link from 'next/link'
import { CONTACT_EMAIL, LINKEDIN_URL } from '@/lib/config'
import CookieSettingsLink from '@/components/consent/CookieSettingsLink'
import TrackedLink from '@/components/analytics/TrackedLink'

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const FOOTER_LINKS = {
  Product: [
    { href: '/transaction-monitoring', label: 'Transaction Monitoring' },
    { href: '/case-management', label: 'Case Management' },
    { href: '/compliance-decisioning-api', label: 'Decision API' },
    { href: '/transaction-screening', label: 'Transaction Screening' },
    { href: '/rules-engine', label: 'Rules Engine' },
    { href: '/customer-risk-profiling', label: 'Customer Risk Profiling' },
  ],
  'Use cases': [
    { href: '/solutions/digital-wallets', label: 'Digital Wallets & Super Apps' },
    { href: '/solutions/fintechs', label: 'Fintechs & Digital Banks' },
    { href: '/solutions/payment-service-providers', label: 'PSPs & Processors' },
    { href: '/solutions/remittance-companies', label: 'Remittance & Cross-Border' },
    { href: '/solutions/banks', label: 'Banks & Microfinance' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/security', label: 'Security' },
    { href: '/contact', label: 'Contact' },
    { href: '/partners', label: 'Partners' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '#cookie-settings', label: 'Cookie Settings' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="wrap footer-inner">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <Link className="brand" href="/" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/lockup-black.svg"
                alt="Fintegrity Technologies Limited"
                className="brand-logo"
                width={580}
                height={88}
              />
            </Link>
            <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.65, maxWidth: '26ch', marginBottom: '20px', marginTop: '14px' }}>
              Embedded compliance decisioning for regulated African fintechs.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link
                href="/book-a-demo"
                className="btn btn-primary"
                style={{ fontSize: '0.84rem', padding: '9px 16px' }}
              >
                Book a demo →
              </Link>
              <TrackedLink
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fintegrity Technologies Limited on LinkedIn"
                className="footer-social-link"
                event="Outbound Link Clicked"
                eventProps={{ destination: 'linkedin', location: 'footer' }}
              >
                <LinkedInIcon />
              </TrackedLink>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <div className="footer-col-label">{section}</div>
              <ul className="footer-link-list">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.href === '#cookie-settings' ? (
                      <CookieSettingsLink />
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="fine" style={{ margin: 0 }}>
            © {year} Fintegrity Technologies Limited. Registered in Nigeria. Lagos, Nigeria.{' '}
            Regulatory references are not legal advice.{' '}
            <TrackedLink
              href={`mailto:${CONTACT_EMAIL}`}
              style={{ color: 'var(--indigo)' }}
              event="Contact Link Clicked"
              eventProps={{ method: 'email', location: 'footer' }}
            >
              {CONTACT_EMAIL}
            </TrackedLink>
          </p>
          <p className="fine" style={{ margin: 0, fontStyle: 'italic' }}>
            We don&apos;t sell checks. We sell defensible compliance decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
