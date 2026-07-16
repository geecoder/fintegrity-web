import Link from 'next/link'
import { BOOKING_URL, CONTACT_EMAIL } from '@/lib/config'
import CookieSettingsLink from '@/components/consent/CookieSettingsLink'

const FOOTER_LINKS = {
  Product: [
    { href: '/transaction-monitoring', label: 'Transaction Monitoring' },
    { href: '/case-management', label: 'Case Management' },
    { href: '/compliance-decisioning-api', label: 'Decision API' },
    { href: '/transaction-screening', label: 'Transaction Screening' },
    { href: '/rules-engine', label: 'Rules Engine' },
  ],
  Industries: [
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
                src="/fintegrity_wm_indigo_mono.png"
                alt="Fintegrity Technologies Limited"
                className="brand-logo"
                width={180}
                height={36}
              />
            </Link>
            <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.65, maxWidth: '26ch', marginBottom: '20px', marginTop: '14px' }}>
              Embedded compliance decisioning for regulated African fintechs.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: '0.84rem', padding: '9px 16px' }}
            >
              Book a demo →
            </a>
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
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--indigo)' }}>{CONTACT_EMAIL}</a>
          </p>
          <p className="fine" style={{ margin: 0, fontStyle: 'italic' }}>
            We don&apos;t sell checks. We sell defensible compliance decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
