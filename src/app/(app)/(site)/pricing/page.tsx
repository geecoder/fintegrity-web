import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import TrackOnMount from '@/components/analytics/TrackOnMount'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Fintegrity pricing is based on transaction volume, modules, environments, users, and implementation scope. No fixed public prices — request a quote for a configuration tailored to your business.',
  alternates: { canonical: 'https://www.getfintegrity.com/pricing' },
}

const TIERS = [
  {
    name: 'Starter',
    headline: 'For early-stage fintechs getting compliance right from day one',
    desc: 'Core monitoring, decision API, and case management with sensible defaults. Get up and running without a lengthy implementation project.',
    price: 'Custom',
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
  },
  {
    name: 'Growth',
    headline: 'For scaling fintechs with compliance infrastructure requirements',
    desc: 'Full platform access with configurable rules, advanced pattern detection, and direct compliance team onboarding.',
    price: 'Custom',
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
  },
  {
    name: 'Enterprise',
    headline: 'For regulated institutions with complex multi-product compliance needs',
    desc: 'Custom implementation scope, multi-entity configuration, SLA guarantees, and direct engineering support.',
    price: 'Custom',
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
  },
]

const DIMENSIONS = [
  { title: 'Transaction volume', desc: 'The primary billing dimension. Pricing is per decision made, not per user or per seat. As your volume grows, the unit cost decreases.' },
  { title: 'Modules', desc: 'The core platform includes the Decision API, Transaction Monitoring, and Case Management. Transaction Screening and the Rules Engine are available as add-ons.' },
  { title: 'Environments', desc: 'Production and sandbox are billed separately. Sandbox decisions are charged at a reduced rate for testing and integration development.' },
  { title: 'Users', desc: 'Compliance team analyst seats are included in all plans up to a tier limit. Additional users are priced per seat.' },
  { title: 'Implementation', desc: 'Standard onboarding is included. Bespoke rule configuration, data migration, and extended implementation support are scoped separately.' },
]

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Pricing', href: '/pricing' }]} />
      <TrackOnMount event="Pricing Viewed" props={{ page: '/pricing' }} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Pricing</span>
            <h1>Usage-based pricing that scales with your compliance operation</h1>
            <p className="page-hero-lead">
              Fintegrity pricing is based on transaction volume, not seats. No fixed public
              prices — every configuration is quoted based on your volume, modules, and
              implementation scope. Request a quote to get a number that reflects your actual
              business.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Book a demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing tiers ────────────────────────────────── */}
      <section className="pricing-section">
        <div className="wrap">
          <div className="pricing-grid">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`pricing-tier reveal${tier.featured ? ' pricing-tier-featured' : ''}`}>
                {tier.featured && <span className="pricing-featured-label">Most popular</span>}
                <div className="pricing-tier-name">{tier.name}</div>
                <div className="pricing-tier-headline">{tier.headline}</div>
                <p className="pricing-tier-desc">{tier.desc}</p>
                <div className="pricing-tier-price">{tier.price}</div>
                <div className="pricing-tier-price-note">{tier.priceNote}</div>
                <ul className="pricing-tier-features">
                  {tier.features.map((f) => (
                    <li key={f} className="pricing-feat">
                      <span className="pricing-feat-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book-a-demo" className={`btn ${tier.featured ? 'btn-primary' : 'btn-ghost'}`} style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Book a demo →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing dimensions ───────────────────────────── */}
      <section className="pricing-section" style={{ background: 'var(--bg-soft)', paddingTop: '0' }}>
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How pricing works</span>
            <h2 className="sec-title">Five dimensions, one quote</h2>
            <p className="sec-intro">
              Every Fintegrity quote is built from five dimensions. Understanding these helps
              you know what drives cost — and what reduces it.
            </p>
          </div>
          <div className="pricing-dims">
            {DIMENSIONS.map((dim) => (
              <div className="pricing-dim-card reveal" key={dim.title}>
                <h3>{dim.title}</h3>
                <p>{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Get a quote for your specific configuration"
        body="Tell us your transaction volumes, your compliance team size, and which modules you need. We'll come back with a number built around your actual business."
        primaryLabel="Book a demo →"
        primaryHref="/book-a-demo"
      />
    </>
  )
}
