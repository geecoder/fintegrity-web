import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import FaqAccordion from '@/components/ui/FaqAccordion'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import FaqJsonLd from '@/components/json-ld/FaqJsonLd'
import { buildMetadata } from '@/lib/seo'
import { API_DOCS_URL } from '@/lib/config'
import TrackedLink from '@/components/analytics/TrackedLink'

export const metadata = buildMetadata({
  title: 'AML Transaction Monitoring Software in Nigeria',
  description:
    'Monitor transactions, screen payment activity, investigate alerts and automate AML compliance decisions for Nigerian fintechs, PSPs, wallets and remittance businesses.',
  path: '/nigeria',
})

const WHO_ITS_FOR = [
  {
    href: '/solutions/digital-wallets',
    label: 'Digital wallets & super apps',
    body: 'High-volume, low-friction consumer wallets — where mule accounts and velocity abuse move fast, and manual review can\'t keep up.',
  },
  {
    href: '/solutions/payment-service-providers',
    label: 'PSPs & payment processors',
    body: 'Merchant-side risk, settlement monitoring, and portfolio-level concentration checks across thousands of sub-merchants.',
  },
  {
    href: '/solutions/banks',
    label: 'Microfinance banks',
    body: 'The same CBN evidence bar as commercial banks, with compliance teams that may be one or two people.',
  },
  {
    href: '/solutions/remittance-companies',
    label: 'Remittance & cross-border operators',
    body: 'Corridor risk, sanctions reach, and dual-jurisdiction compliance for money moving in and out of Nigeria.',
  },
  {
    href: '/solutions/fintechs',
    label: 'Digital lenders & neobanks',
    body: 'End-to-end compliance decisioning for digital-first financial services companies scaling fast.',
  },
]

const NIGERIA_FAQ = [
  {
    question: 'Is Fintegrity CBN-licensed, or a substitute for my MLRO?',
    answer:
      'No. Fintegrity is a technology provider — compliance decisioning and evidence infrastructure — not a licensed financial institution, and not a substitute for your Money Laundering Reporting Officer or compliance team. We give your MLRO and compliance analysts the tools to enforce rules, investigate alerts, and produce evidence; the regulatory responsibility and judgment remain with your institution.',
  },
  {
    question: 'Can Fintegrity enforce KYC tier limits and Naira transaction thresholds?',
    answer:
      // NEEDS COMPLIANCE REVIEW — confirm current CBN tiered-KYC limits before publishing specific figures
      'Yes — Fintegrity enforces KYC tier limits and configurable Naira transaction thresholds at the decision layer, before a transaction is authorised. Tier limits and threshold values are configured per your institution and should be verified against the current CBN circular in force at the time you configure them, since these figures are periodically updated by the regulator.',
  },
  {
    question: 'Does Fintegrity replace my existing KYC or screening provider?',
    answer:
      'No. Fintegrity orchestrates the decision — it sits at the point a transaction is evaluated and pulls in your existing KYC verification result, screening provider\'s match data, and your configured rules to produce one decision. You keep your existing vendors; Fintegrity is the layer that acts on their output in real time.',
  },
  {
    question: 'How fast is a compliance decision returned?',
    answer:
      'Sub-100ms P99 in typical configurations, returned synchronously before your payment rail executes the transaction. The exact figure depends on which rules and external checks are configured to run inline.',
  },
  {
    question: 'Can Fintegrity produce evidence for a CBN or NFIU examiner request?',
    answer:
      'Yes. Every decision, rule fired, and state change is written to an append-only evidence store, and a complete evidence pack for any customer or transaction can be generated on demand — turning what used to be a multi-day reconstruction into a query.',
  },
  {
    question: 'Do you support both real-time and batch monitoring?',
    answer:
      'Fintegrity is built real-time-first — decisions happen before money moves, not in an overnight batch. If your institution currently runs batch monitoring, Fintegrity sits in front of it as a pre-authorisation layer rather than requiring you to rebuild your existing batch processes on day one.',
  },
]

export default function NigeriaPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Nigeria', href: '/nigeria' }]} />
      <FaqJsonLd items={NIGERIA_FAQ} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Nigeria</span>
            <h1>AML transaction monitoring built for Nigerian fintechs</h1>
            <p className="page-hero-lead">
              Fintegrity gives Nigerian fintechs, PSPs, microfinance banks, digital lenders,
              wallet providers, and remittance operators a single decision layer — real-time
              transaction monitoring, AML rule enforcement, alert investigation, and
              regulator-ready evidence, built around how money actually moves in the Nigerian
              market.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Book a demo →
              </Link>
              <Link href="/transaction-monitoring" className="btn btn-ghost">
                See transaction monitoring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Nigeria is different ──────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Why Nigeria is different</span>
            <h2 className="sec-title">Generic AML tools weren&apos;t built for this market</h2>
            <p className="sec-intro">
              Nigerian fintechs operate at a volume and velocity most AML tooling was never
              designed for — millions of Naira transactions a day, tiered KYC enforced against
              BVN and NIN, and compliance teams a fraction the size of the banks the tooling was
              originally built for.
            </p>
          </div>
          <div className="cap-grid" style={{ marginTop: '40px' }}>
            <div className="cap-card reveal">
              <div className="cap-card-tag">KYC tiers</div>
              <h3>BVN/NIN-tiered limits, enforced live</h3>
              <p>
                {/* NEEDS COMPLIANCE REVIEW — confirm current CBN tiered-KYC account limits before publishing specific figures */}
                Customer tier and transaction limit are checked at the decision layer on every
                transaction — not just at onboarding — so a tier breach is caught before the
                transaction executes, not discovered afterward.
              </p>
            </div>
            <div className="cap-card reveal">
              <div className="cap-card-tag">Reporting</div>
              <h3>NFIU-aligned reporting thresholds</h3>
              <p>
                {/* NEEDS COMPLIANCE REVIEW — confirm current NFIU CTR thresholds and filing windows before publishing specific figures */}
                Rules are configurable to your institution&apos;s reporting obligations, including
                currency transaction thresholds and structuring detection across rolling windows
                and counterparties.
              </p>
            </div>
            <div className="cap-card reveal">
              <div className="cap-card-tag">Volume</div>
              <h3>Built for Nigerian transaction volumes</h3>
              <p>
                Sub-100ms decisions at the throughput consumer wallets, PSPs, and digital lenders
                actually run at — not a batch job that catches suspicious activity days after
                the money has already moved.
              </p>
            </div>
            <div className="cap-card reveal">
              <div className="cap-card-tag">Team size</div>
              <h3>Sized for lean compliance teams</h3>
              <p>
                Most Nigerian fintechs and microfinance banks run compliance with two or three
                people, not a department. Fintegrity automates the enforcement and evidence work
                so a small team can operate at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who this is for ───────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Who this is for</span>
            <h2 className="sec-title">Built for every model moving money in Nigeria</h2>
            <p className="sec-intro">
              Rules and risk logic are shaped to the specific patterns — and specific abuse — of
              your business model, not applied generically.
            </p>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {WHO_ITS_FOR.map((item) => (
              <Link key={item.href} href={item.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px' }}>{item.label} →</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it works</span>
            <h2 className="sec-title">One API call, before every transaction executes</h2>
            <p className="sec-intro">
              Integrate once through the{' '}
              <Link href="/compliance-decisioning-api">Compliance Decision API</Link>, and every
              transaction gets evaluated against your configured rules, the customer&apos;s risk
              state, and screening results — before your rails move the money.
            </p>
          </div>
          <div className="process-steps" style={{ maxWidth: '640px', marginTop: '44px' }}>
            {[
              { num: '01', title: 'Transaction reaches your backend', body: 'A customer sends, receives, or withdraws — your system captures the transaction intent.' },
              { num: '02', title: 'One call to Fintegrity', body: 'Your backend calls the Decision API with the transaction context. Evaluation runs in parallel: KYC tier, velocity, screening, behavioural rules.' },
              { num: '03', title: 'Decision returned', body: 'CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED — with the reasons and the exact action your system should take.' },
              { num: '04', title: 'Alerts route to case management', body: 'FLAGGED and HELD_FOR_REVIEW decisions open a structured case in Case Management with the evaluation trail pre-attached.' },
              { num: '05', title: 'Evidence written automatically', body: 'Every decision — including every CLEAR — is logged to an append-only store, ready for an examiner request at any time.' },
            ].map((step) => (
              <div className="process-step reveal" key={step.num}>
                <div className="process-step-left">
                  <div className="process-step-num">{step.num}</div>
                  <div className="process-step-line" />
                </div>
                <div className="process-step-body">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related capabilities ──────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Platform capabilities</span>
            <h2 className="sec-title">Under the hood</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              { href: '/transaction-monitoring', label: 'Transaction Monitoring', desc: 'Real-time AML rule evaluation against every transaction, before it settles.' },
              { href: '/rules-engine', label: 'Rules Engine', desc: 'No-code rule authoring and simulation — compliance teams own the rules, not engineering.' },
              { href: '/case-management', label: 'Case Management', desc: 'Structured investigation workflows with evidence pre-assembled per case.' },
              { href: '/customer-risk-profiling', label: 'Customer Risk Profiling', desc: 'One authoritative risk state per customer, with audited transitions.' },
              { href: '/audit-trail-and-reporting', label: 'Audit Trail & Reporting', desc: 'Immutable, examiner-ready evidence packs generated on demand.' },
              { href: API_DOCS_URL, label: 'Developer API docs', desc: 'Full API reference for integrating the Compliance Decision API.', external: true },
            ].map((link) => (
              link.external ? (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-card reveal"
                  style={{ textDecoration: 'none', display: 'block' }}
                  event="API Documentation CTA Clicked"
                  eventProps={{ location: 'nigeria-capabilities' }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px' }}>{link.label} →</div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{link.desc}</p>
                </TrackedLink>
              ) : (
                <Link key={link.href} href={link.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px' }}>{link.label} →</div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{link.desc}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '720px', margin: '0 auto 40px', textAlign: 'center' }}>
            <span className="sec-eyebrow">Questions</span>
            <h2 className="sec-title">Common questions from Nigerian fintechs</h2>
          </div>
          <div className="reveal" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <FaqAccordion items={NIGERIA_FAQ} />
          </div>
        </div>
      </section>

      <CTABand
        headline="See Fintegrity configured for the Nigerian market"
        body="We'll walk through real-time decisioning, KYC tier enforcement, and evidence generation using transaction patterns from your business model."
        primaryLabel="Book a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See transaction monitoring"
        secondaryHref="/transaction-monitoring"
      />
    </>
  )
}
