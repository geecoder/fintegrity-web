import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'AML Compliance for Digital Wallets & Super Apps',
  description:
    'Fintegrity gives digital wallets and super apps real-time AML monitoring, KYC tier enforcement, mule detection, and structuring detection — all before money moves. Built for Nigerian consumer fintech scale.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/digital-wallets' },
  openGraph: {
    title: 'AML Compliance for Digital Wallets & Super Apps — Fintegrity Technologies Limited',
    description: 'Pre-authorisation AML monitoring built for digital wallet and super app volumes and fraud patterns.',
    url: 'https://www.getfintegrity.com/solutions/digital-wallets',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const PAINS = [
  {
    title: 'Mule account networks',
    body: 'New accounts are funded and swept within hours of creation. By the time batch monitoring flags it, the funds are gone. Fintegrity\'s new-account velocity rule catches the pattern in the opening transaction.',
    link: { label: 'How velocity monitoring works', href: '/transaction-monitoring' },
  },
  {
    title: 'KYC tier bypass',
    body: 'Customers transact beyond their verified limit — sometimes by design, sometimes because tier enforcement isn\'t wired into the payment handler. Fintegrity enforces tier limits at the decision layer, not in your application code.',
    link: { label: 'How tier enforcement works', href: '/compliance-decisioning-api' },
  },
  {
    title: 'Velocity gaming',
    body: 'Fraudsters split transactions to stay under any single threshold. Fintegrity aggregates across rolling windows and counterparties — a set of ten ₦450k transfers reads the same as a single ₦4.5M transfer.',
    link: { label: 'See the rule library', href: '/transaction-monitoring' },
  },
  {
    title: 'Rapid layering',
    body: 'Funds received and immediately re-sent — often in small amounts to multiple counterparties. Fintegrity\'s rapid in-out detection and profile anomaly rules flag this pattern before the second leg clears.',
    link: { label: 'See pattern detection', href: '/transaction-monitoring' },
  },
]

const HOW_IT_FITS = [
  { num: '01', title: 'Customer initiates transfer', body: 'User taps Send in your wallet app. Your backend receives the transaction intent.' },
  { num: '02', title: 'You call /v1/decide', body: 'Before your payment handler executes, you POST the transaction context to Fintegrity. This takes less than 50ms.' },
  { num: '03', title: 'Fintegrity evaluates', body: 'Customer risk state, KYC tier limits, velocity rules, structuring patterns, and account-age logic all run in parallel.' },
  { num: '04', title: 'Decision returned', body: 'ALLOW: proceed. REVIEW: hold and open a case. BLOCK: decline and reverse. Your handler acts on the response.' },
  { num: '05', title: 'Evidence written', body: 'Every decision is logged to the append-only audit store with the full transaction context. Evidence is available instantly for any regulator query.' },
]

export default function DigitalWalletsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Industries', href: '/solutions/digital-wallets' },
        { name: 'Digital Wallets & Super Apps', href: '/solutions/digital-wallets' },
      ]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Digital Wallets &amp; Super Apps</span>
            <h1>Compliance infrastructure built for digital wallets and super apps</h1>
            <p className="page-hero-lead">
              Digital wallets move money at speeds and volumes that manual compliance cannot
              track. Fintegrity sits in-line before every debit and credit — enforcing KYC tiers,
              monitoring velocity patterns, catching mule behaviour, and generating regulator-ready
              evidence automatically. Before money moves.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                See Fintegrity for your wallet →
              </Link>
              <Link href="/transaction-monitoring" className="btn btn-ghost">
                See transaction monitoring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain points ──────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The wallet compliance problem</span>
            <h2 className="sec-title">Four fraud patterns wallets face every day</h2>
            <p className="sec-intro">
              Consumer wallets are a prime target for financial crime because they combine high
              volume, low friction, and — often — weak transaction-layer controls. These four
              patterns account for the majority of AML exposure in Nigerian digital wallets.
            </p>
          </div>
          <div className="cap-grid" style={{ marginTop: '40px' }}>
            {PAINS.map((pain) => (
              <div className="cap-card reveal" key={pain.title}>
                <h3>{pain.title}</h3>
                <p>{pain.body}</p>
                <Link href={pain.link.href} style={{ display: 'inline-block', marginTop: '14px', fontSize: '0.84rem', color: 'var(--indigo)', fontWeight: 600 }}>
                  {pain.link.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it fits ──────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Integration model</span>
            <h2 className="sec-title">One pre-authorisation hook. Complete compliance coverage.</h2>
            <p className="sec-intro">
              Fintegrity doesn&apos;t require changes to your product UX or your payment rails.
              One API call before each transaction executes is all it takes.
            </p>
          </div>
          <div className="process-steps" style={{ maxWidth: '640px', marginTop: '44px' }}>
            {HOW_IT_FITS.map((step) => (
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

      {/* ── Wallet-specific capabilities ─────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Wallet-specific rules</span>
            <h2 className="sec-title">Rules shaped to how wallets actually move money</h2>
            <p className="sec-intro">
              Generic AML tools apply the same rules to wallets, PSPs, and lenders. Fintegrity
              configures rules around the specific abuse patterns and regulatory exposure of your
              business model.
            </p>
          </div>
          <div className="cap-grid">
            {[
              {
                tag: 'Account age',
                title: 'New-account monitoring window',
                body: 'Accounts in their first 30 days get elevated rule sensitivity. New-account velocity — the first sign of mule account abuse — is flagged before the network establishes.',
              },
              {
                tag: 'Timing',
                title: 'Rapid in-out detection',
                body: 'Funds received and swept within a configurable window (default: 60 minutes) are flagged regardless of amount. Multiple hops within the window are aggregated.',
              },
              {
                tag: 'Tiers',
                title: 'Real-time KYC tier enforcement',
                body: 'Every transaction is checked against the customer\'s verified KYC tier (T1/T2/T3) and the corresponding limit. Tier breaches get a hard BLOCK before your rails execute.',
                note: 'NEEDS COMPLIANCE REVIEW — CBN tier limits must be verified against current circulars',
              },
              {
                tag: 'Splitting',
                title: 'Counterparty aggregation',
                body: 'Transactions to the same counterparty within a rolling window are aggregated and measured as a single economic event — defeating basic threshold-splitting strategies.',
              },
              {
                tag: 'Behaviour',
                title: 'Profile-relative anomaly',
                body: 'Each transaction is compared to the customer\'s 90-day behavioural baseline. A ₦50,000 transaction is very different coming from a customer who typically sends ₦5,000.',
              },
              {
                tag: 'Structuring',
                title: 'Sub-threshold structuring',
                body: 'Sequences of transactions that appear designed to stay below CBN/NFIU CTR thresholds are identified using configurable pattern windows.',
                note: 'NEEDS COMPLIANCE REVIEW — threshold values require compliance verification',
              },
            ].map((cap) => (
              <div className="cap-card reveal" key={cap.tag}>
                <div className="cap-card-tag">{cap.tag}</div>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Evidence section ─────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Regulatory evidence</span>
              <h2 className="sec-title">When the regulator asks, you have an answer</h2>
              {/* NEEDS COMPLIANCE REVIEW — regulatory claim about CBN 2024 directive and tier limits */}
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', marginBottom: '20px', maxWidth: '52ch' }}>
                CBN&apos;s 2024 directive tied wallet transaction limits directly to BVN and NIN
                verification tiers. Every transaction above a tier limit is a potential compliance
                breach — and when a regulator asks, you need to show that your system caught it
                before money moved.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', maxWidth: '52ch', marginBottom: '24px' }}>
                Fintegrity writes every decision — including every ALLOW — to an immutable
                evidence store. A regulator asking &ldquo;how was this transaction handled?&rdquo;
                gets a complete answer: what rules ran, what the customer&apos;s state was, what
                decision was made, and when.
              </p>
              <ul className="feature-list">
                {[
                  ['Every ALLOW is evidenced', 'Not just flags and blocks. Every decision is logged. Showing compliance for a clean transaction is as important as showing it for a flagged one.'],
                  ['Point-in-time state capture', 'The customer\'s risk state, KYC tier, and rule configuration at the exact moment of decision — frozen in the evidence record.'],
                  ['On-demand evidence packs', 'Any transaction or customer can produce a complete evidence pack. No reconstruction required.'],
                ].map(([title, body]) => (
                  <li className="feature-item" key={title}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text"><h4>{title}</h4><p>{body}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#F4F3FF', border: '1px solid #DDD9FF', borderRadius: 'var(--r)', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--indigo-d)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
                  What Fintegrity stores per decision
                </div>
                {[
                  'Transaction ID, amount, currency, channel',
                  'Counterparty identifier and type',
                  'Customer risk state at time of decision',
                  'KYC tier and applicable limits',
                  'Every rule evaluated and its result',
                  'Final decision: ALLOW / REVIEW / BLOCK',
                  'Required action issued to your system',
                  'Timestamp (server-side, immutable)',
                  'Rule version configuration used',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '0.88rem', color: 'var(--slate)' }}>
                    <span style={{ color: 'var(--allow)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other solutions ──────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Other solutions</span>
            <h2 className="sec-title" style={{ maxWidth: '28ch' }}>Fintegrity is built for more than wallets</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              { href: '/solutions/payment-service-providers', label: 'PSPs & Processors', desc: 'Merchant risk at scale. Settlement monitoring. Concentration analysis across merchant portfolios.' },
              { href: '/solutions/remittance-companies', label: 'Remittance Companies', desc: 'Corridor risk, sanctions reach, and dual-jurisdiction compliance for cross-border money movement.' },
              { href: '/solutions/fintechs', label: 'Fintechs & Neobanks', desc: 'End-to-end compliance decisioning for digital-first financial services companies.' },
            ].map((sol) => (
              <Link key={sol.href} href={sol.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <h3>{sol.label}</h3>
                <p>{sol.desc}</p>
                <span style={{ display: 'inline-block', marginTop: '14px', fontSize: '0.84rem', color: 'var(--indigo)', fontWeight: 600 }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="See Fintegrity configured for your wallet"
        body="We'll walk through a live configuration with transaction patterns, KYC tier limits, and monitoring rules tuned to your specific product and volumes."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See transaction monitoring"
        secondaryHref="/transaction-monitoring"
      />
    </>
  )
}
