import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import FaqAccordion from '@/components/ui/FaqAccordion'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import FaqJsonLd from '@/components/json-ld/FaqJsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Compliance Infrastructure for African Fintechs',
  description:
    'Real-time compliance decisioning, transaction monitoring, and regulator-ready evidence for fintechs, PSPs, and banks operating across African markets.',
  path: '/africa',
})

const AFRICA_FAQ = [
  {
    question: 'Is Fintegrity licensed as a regulated entity in every African market you serve?',
    answer:
      'No. Fintegrity is a technology provider — we build compliance decisioning and evidence infrastructure, not a licensed financial institution, and we are not a substitute for local regulatory registration, an MLRO, or licensed compliance counsel in any jurisdiction. Your institution remains responsible for its own regulatory obligations in each market it operates in; Fintegrity gives your team the tools to enforce and evidence the rules you configure.',
  },
  {
    question: 'Can the same platform handle different regulatory regimes across African countries?',
    answer:
      // NEEDS COMPLIANCE REVIEW — confirm exact jurisdictional coverage and regulatory alignment claims before publishing
      'Fintegrity\'s rules engine is configuration-driven rather than hardcoded to one regulator\'s requirements, which means thresholds, reporting logic, and risk rules can be configured per market. Our deepest current alignment is with Nigeria\'s CBN and NFIU regime — if you operate in other African markets, talk to us directly about your specific regulatory requirements so we can confirm fit before you rely on it.',
  },
  {
    question: 'Do you support cross-border and multi-currency transaction monitoring?',
    answer:
      'Yes — corridor-level risk rules, counterparty aggregation across currencies, and sanctions/PEP screening are built into the decision layer for cross-border and remittance flows, not bolted on as a separate process.',
  },
  {
    question: 'What does "regulator-ready evidence" mean in markets where requirements differ?',
    answer:
      'Every decision, rule fired, and state change is written to an append-only evidence store regardless of jurisdiction. The specific evidence pack format and retention period are configured to match what your institution and its regulator actually require — we don\'t assume one regulator\'s template fits every market.',
  },
  {
    question: 'Which African markets does Fintegrity currently serve?',
    answer:
      'Fintegrity is built and operated from Lagos, Nigeria, with our deepest product alignment to the Nigerian CBN/NFIU regime today. We work with design partners expanding across other African markets — if that\'s you, book a demo and we\'ll talk through what\'s configured today versus what would need to be built for your specific market.',
  },
]

export default function AfricaPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Africa', href: '/africa' }]} />
      <FaqJsonLd items={AFRICA_FAQ} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Africa</span>
            <h1>Compliance infrastructure for African fintechs</h1>
            <p className="page-hero-lead">
              African fintechs move money across borders, currencies, and regulatory regimes
              that legacy AML tooling — built for single-market banks — was never designed to
              handle. Fintegrity is a configurable decision and evidence layer built to fit the
              market you actually operate in, starting from our deepest alignment with Nigeria&apos;s
              CBN and NFIU regime.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Book a demo →
              </Link>
              <Link href="/nigeria" className="btn btn-ghost">
                See our Nigeria coverage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The problem</span>
            <h2 className="sec-title">One market&apos;s compliance rules don&apos;t transfer to the next</h2>
            <p className="sec-intro">
              A remittance corridor, a mobile-money wallet, and a cross-border PSP each carry
              different sanctions exposure, different reporting thresholds, and different
              customer risk patterns depending on which African markets they touch. Generic,
              hardcoded AML rules built for one regulatory regime either over-block legitimate
              activity in another market, or miss the patterns that actually matter there.
            </p>
          </div>
          <div className="cap-grid" style={{ marginTop: '40px' }}>
            <div className="cap-card reveal">
              <div className="cap-card-tag">Configurable</div>
              <h3>Rules configured per market, not hardcoded</h3>
              <p>
                Thresholds, reporting logic, and risk rules are configuration, not code — so the
                same platform can be tuned to a different market&apos;s requirements without a
                rebuild.
              </p>
            </div>
            <div className="cap-card reveal">
              <div className="cap-card-tag">Cross-border</div>
              <h3>Corridor-level risk, not just per-transaction</h3>
              <p>
                Counterparty and corridor risk are evaluated alongside the individual transaction
                — a pattern of transfers along a single corridor is assessed as one economic
                event, not isolated data points.
              </p>
            </div>
            <div className="cap-card reveal">
              <div className="cap-card-tag">Evidence</div>
              <h3>One evidence architecture, market-appropriate output</h3>
              <p>
                The underlying append-only evidence store doesn&apos;t change market to market —
                what changes is the evidence pack format and retention period, configured to what
                your regulator actually asks for.
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
            <h2 className="sec-title">Built for African fintechs moving money across borders</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              { href: '/solutions/remittance-companies', label: 'Remittance & cross-border operators', desc: 'Corridor risk, sanctions reach, and dual-jurisdiction compliance for money moving between African markets and the diaspora.' },
              { href: '/solutions/digital-wallets', label: 'Digital wallets & mobile money', desc: 'Real-time monitoring built for the volume and velocity of mobile-first consumer wallets.' },
              { href: '/solutions/payment-service-providers', label: 'PSPs & payment processors', desc: 'Merchant risk and settlement monitoring across a multi-country merchant portfolio.' },
              { href: '/solutions/crypto-businesses', label: 'Crypto & digital asset platforms', desc: 'Screening and monitoring for on/off-ramp activity and wallet-to-wallet transfers.' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px' }}>{item.label} →</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nigeria as the flagship market ────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '720px' }}>
            <span className="sec-eyebrow">Where we&apos;re deepest today</span>
            <h2 className="sec-title">Nigeria is our flagship market</h2>
            <p className="sec-intro">
              Fintegrity is built and operated from Lagos. Our deepest regulatory alignment —
              CBN tier enforcement, NFIU reporting thresholds, and CBN/NFIU-aligned evidence
              formats — is with the Nigerian market today.{' '}
              <Link href="/nigeria">See what that looks like</Link> in detail, or talk to us
              about what expanding into your specific market would require.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '720px', margin: '0 auto 40px', textAlign: 'center' }}>
            <span className="sec-eyebrow">Questions</span>
            <h2 className="sec-title">Common questions about African market coverage</h2>
          </div>
          <div className="reveal" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <FaqAccordion items={AFRICA_FAQ} />
          </div>
        </div>
      </section>

      <CTABand
        headline="Talk to us about your specific market"
        body="Tell us which countries and corridors you operate in, and we'll be direct about what's configured today versus what we'd need to build."
        primaryLabel="Book a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See our Nigeria coverage"
        secondaryHref="/nigeria"
      />
    </>
  )
}
