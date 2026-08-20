import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/config'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Fintegrity pricing is based on transaction volume, not seats. No fixed public prices — every configuration is quoted based on your volume, modules, and implementation scope.',
  alternates: { canonical: `${SITE_URL}/pricing` },
}

type Tier = {
  name: string
  headline: string
  desc: string
  priceNote: string
  features: string[]
  featured: boolean
  cta: string
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    headline: 'For early-stage fintechs getting compliance right from day one',
    desc: 'Core monitoring, decision API, and case management with sensible defaults. Get up and running without a lengthy implementation project.',
    priceNote: 'Based on transaction volume',
    features: [
      'Compliance Decision API — up to agreed monthly volume',
      'Transaction Monitoring — core rule library',
      'Case Management — investigation workflow',
      'Customer risk state management',
      'Standard evidence pack generation',
      'Email support + onboarding call',
    ],
    featured: false,
    cta: 'Request a quote',
  },
  {
    name: 'Growth',
    headline: 'For scaling fintechs with compliance infrastructure requirements',
    desc: 'Full platform access with configurable rules, advanced pattern detection, and direct compliance team onboarding.',
    priceNote: 'Based on volume + modules',
    features: [
      'Everything in Starter',
      'Full configurable rule library',
      'Advanced pattern detection (structuring, rapid in-out)',
      'Transaction Screening orchestration',
      'Rules Engine — custom rule authoring',
      'Multi-user compliance team access',
      'Dedicated onboarding and rule configuration',
      'Priority support',
    ],
    featured: true,
    cta: 'Request a quote →',
  },
  {
    name: 'Enterprise',
    headline: 'For regulated institutions with complex multi-product compliance needs',
    desc: 'Custom implementation scope, multi-entity configuration, SLA guarantees, and direct engineering support.',
    priceNote: 'By engagement',
    features: [
      'Everything in Growth',
      'Multi-entity / multi-product configuration',
      'Custom rule authoring support',
      'Dedicated implementation engineering',
      'Uptime SLA commitment',
      'Audit and regulatory support documentation',
      'Security review and penetration test results',
    ],
    featured: false,
    cta: 'Talk to us',
  },
]

const DIMENSIONS = [
  {
    title: 'Transaction volume',
    body: 'The primary billing dimension. Pricing is per decision made, not per user or per seat. As your volume grows, the unit cost decreases.',
  },
  {
    title: 'Modules',
    body: 'The core platform includes the Decision API, Transaction Monitoring, and Case Management. Transaction Screening and the Rules Engine are available as add-ons.',
  },
  {
    title: 'Environments',
    body: 'Production and sandbox are billed separately. Sandbox decisions are charged at a reduced rate for testing and integration development.',
  },
  {
    title: 'Users',
    body: 'Compliance team analyst seats are included in all plans up to a tier limit. Additional users are priced per seat.',
  },
  {
    title: 'Implementation',
    body: 'Standard onboarding is included. Bespoke rule configuration, data migration, and extended implementation support are scoped separately.',
  },
]

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Pricing', href: '/pricing' }]} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true" />
        <div className={`fg-container ${styles.heroInner}`}>
          <div className={styles.eyebrow}>Pricing</div>
          <h1 className={styles.h1}>Usage-based pricing that scales with your compliance operation</h1>
          <p className={styles.lede}>
            Fintegrity pricing is based on transaction volume, not seats. No fixed public
            prices — every configuration is quoted based on your volume, modules, and
            implementation scope. Request a quote to get a number that reflects your actual
            business.
          </p>
        </div>
      </section>

      {/* ── Plan cards ───────────────────────────────────────────────── */}
      <section className={styles.tiersSection}>
        <div className="fg-container">
          <div className={styles.tiersGrid}>
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={tier.featured ? styles.tierCardFeatured : styles.tierCard}
              >
                {tier.featured && <span className={styles.mostPopular}>Most popular</span>}
                <h2 className={styles.tierName}>{tier.name}</h2>
                <div className={styles.tierHeadline}>{tier.headline}</div>
                <p className={styles.tierDesc}>{tier.desc}</p>

                <div className={styles.priceBlock}>
                  <div className={`${styles.price} fg-num`}>Custom</div>
                  <div className={styles.priceNote}>{tier.priceNote}</div>
                </div>

                <ul className={styles.features}>
                  {tier.features.map((f) => (
                    <li key={f}>
                      <span aria-hidden="true">&#183;</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo"
                  className={tier.featured ? styles.ctaFeatured : styles.ctaOutline}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Five dimensions ──────────────────────────────────────────── */}
      <section className={styles.dimsSection}>
        <div className="fg-container">
          <div className={styles.eyebrow}>How pricing works</div>
          <h2 className={styles.h2}>Five dimensions, one quote</h2>
          <p className={styles.dimsLede}>
            Every Fintegrity quote is built from five dimensions. Understanding these helps you
            know what drives cost — and what reduces it.
          </p>

          <div className={styles.dimsList}>
            {DIMENSIONS.map((d, i) => (
              <div key={d.title} className={styles.dimRow}>
                <span className={`${styles.dimIndex} fg-num`}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.dimTitle}>{d.title}</h3>
                <p className={styles.dimBody}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={`fg-container ${styles.ctaInner}`}>
          <h2 className={styles.ctaH2}>Get a quote for your specific configuration</h2>
          <p className={styles.ctaLede}>
            Tell us your transaction volumes, your compliance team size, and which modules you
            need. We&rsquo;ll come back with a number built around your actual business.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/demo" className={styles.btnPrimary}>
              Request a quote <span aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.btnWhite}>
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
