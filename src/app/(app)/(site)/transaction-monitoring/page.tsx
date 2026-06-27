import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'AML Transaction Monitoring',
  description:
    'Fintegrity monitors every transaction in real time — evaluating it against configurable rules, CBN-aligned patterns, and customer risk profiles before money moves. Every alert automatically becomes a structured case with evidence assembled.',
  alternates: { canonical: 'https://www.getfintegrity.com/transaction-monitoring' },
  openGraph: {
    title: 'AML Transaction Monitoring — Fintegrity Technologies Limited',
    description: 'Real-time, pre-authorisation AML monitoring built for Nigerian fintechs. Rules, velocity, structuring detection and more.',
    url: 'https://www.getfintegrity.com/transaction-monitoring',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const CAPABILITIES = [
  {
    tag: 'Velocity',
    title: 'Rolling-window velocity rules',
    body: 'Configure per-customer, per-account, or per-counterparty transaction counts and amounts across 5-minute, 1-hour, 24-hour, and 7-day windows.',
  },
  {
    tag: 'Thresholds',
    title: 'Amount and KYC tier enforcement',
    body: 'Hard-block transactions that exceed a customer\'s verified KYC tier limits. Configurable absolute and percentage-of-average thresholds.',
  },
  {
    tag: 'Patterns',
    title: 'Structuring detection',
    body: 'Identifies sequences of just-below-threshold transactions to the same counterparty within configurable time windows — a classic layering pattern.',
    note: 'NEEDS COMPLIANCE REVIEW',
  },
  {
    tag: 'New accounts',
    title: 'New-account risk window',
    body: 'Applies elevated monitoring to recently created accounts for a configurable period. Flags the new-account velocity pattern characteristic of mule onboarding.',
  },
  {
    tag: 'Timing',
    title: 'Rapid in-out detection',
    body: 'Detects funds received and swept out within minutes — even across multiple hops — a core indicator of layering and mule activity.',
  },
  {
    tag: 'Counterparty',
    title: 'Counterparty concentration',
    body: 'Flags unusual concentration of transactions to a single counterparty relative to a customer\'s profile, and monitors known-risky counterparty relationships.',
  },
  {
    tag: 'Behaviour',
    title: 'Profile-relative anomaly',
    body: 'Measures each transaction against the customer\'s 90-day behavioural baseline — flagging amounts, frequencies, or counterparties that are unusual for that specific customer.',
  },
  {
    tag: 'Corridors',
    title: 'Corridor and channel risk',
    body: 'Elevated scrutiny for high-risk corridors, channels, and transaction types configured to your specific business model and regulatory exposure.',
  },
]

const STEPS = [
  {
    title: 'Transaction received',
    body: 'Your system calls Fintegrity before executing any debit or credit — at the pre-authorisation point, before money moves.',
  },
  {
    title: 'Customer state checked',
    body: 'We immediately check the customer\'s current risk state: ACTIVE, UNDER_REVIEW, or BLOCKED. A BLOCKED customer gets a hard stop before any rules run.',
  },
  {
    title: 'Rule library evaluated',
    body: 'The transaction is matched against your full configured rule set — velocity, amounts, timing, counterparty, and channel rules all fire in parallel.',
  },
  {
    title: 'Pattern analysis runs',
    body: 'Fintegrity looks at the transaction in context: against the customer\'s profile, their history, and broader cross-customer patterns where applicable.',
  },
  {
    title: 'Decision and alert issued',
    body: 'The result is ALLOW, REVIEW, or BLOCK — with the rules that fired, the required action for your system, and the customer risk state after this transaction.',
  },
  {
    title: 'Evidence written',
    body: 'Every decision is written to the append-only audit trail. If a REVIEW or alert fires, a structured case opens automatically in Case Management with the evidence pre-assembled.',
  },
]

export default function TransactionMonitoringPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Transaction Monitoring', href: '/transaction-monitoring' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Transaction Monitoring</span>
            <h1>Real-time AML transaction monitoring for Nigerian fintechs</h1>
            <p className="page-hero-lead">
              Fintegrity evaluates every transaction before money moves — matching it against
              configurable rules, CBN-aligned patterns, and the customer&apos;s live risk profile.
              When something warrants attention, a structured case opens automatically, with
              evidence already assembled.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Request a demo →
              </Link>
              <Link href="/compliance-decisioning-api" className="btn btn-ghost">
                How decisions work
              </Link>
            </div>
            <div className="page-hero-stat-row">
              <div className="page-hero-stat">
                <big>&lt;50ms</big>
                <span>P99 decision latency</span>
              </div>
              <div className="page-hero-stat">
                <big>Pre-auth</big>
                <span>Before money moves</span>
              </div>
              <div className="page-hero-stat">
                <big>Real-time</big>
                <span>Not batch, not T+1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it works</span>
            <h2 className="sec-title">From transaction to decision in milliseconds</h2>
            <p className="sec-intro">
              Monitoring is synchronous and pre-authorisation. Your payment handler calls
              Fintegrity before executing. We return a decision. You act on it.
            </p>
          </div>
          <div className="process-steps">
            {STEPS.map((step, i) => (
              <div className="process-step reveal" key={i}>
                <div className="process-step-left">
                  <div className="process-step-num">0{i + 1}</div>
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

      {/* ── Capabilities ─────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Rule library</span>
            <h2 className="sec-title">Eight monitoring capabilities, configurable to your model</h2>
            <p className="sec-intro">
              Every rule is configurable to your transaction volumes, customer segments, and
              regulatory exposure. Out of the box, Fintegrity ships with CBN and NFIU-aligned
              default thresholds that you tune rather than build from scratch.
              {/* NEEDS COMPLIANCE REVIEW — CBN/NFIU threshold defaults must be verified before publication */}
            </p>
          </div>
          <div className="cap-grid">
            {CAPABILITIES.map((cap) => (
              <div className="cap-card reveal" key={cap.tag}>
                <div className="cap-card-tag">{cap.tag}</div>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alert → Case pipeline ────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="two-col-feature reveal">
            <div>
              <span className="sec-eyebrow">Alert quality</span>
              <h2 className="sec-title">Every alert is a case, not a queue item</h2>
              <p className="sec-intro" style={{ marginBottom: '24px' }}>
                Most monitoring tools dump alerts into a queue and leave analysts to gather
                evidence manually. Fintegrity does the assembly work automatically.
              </p>
              <ul className="feature-list">
                {[
                  ['Pre-assembled evidence', 'Transaction data, customer profile, risk state, and triggering rule — all in the case when it opens.'],
                  ['Automatic case creation', 'Every monitoring alert that clears the threshold creates a structured case in Case Management. No manual ticket raising.'],
                  ['Alert context preserved', 'The exact state at alert time — customer risk state, transaction data, rule version — is frozen in the evidence pack.'],
                  ['Analyst-ready from day one', 'Your compliance team opens a case to a structured investigation workflow, not a raw data dump.'],
                ].map(([title, body]) => (
                  <li className="feature-item" key={title}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text">
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #1a1840, #2a2270)',
                borderRadius: '18px',
                padding: '32px',
                color: '#fff',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Alert → Case pipeline
                </div>
                {[
                  { label: 'Pattern fires', desc: 'Velocity threshold exceeded in 24h window', badge: 'ALERT', badgeStyle: { background: '#FBBF24', color: '#1a1840' } },
                  { label: 'Case auto-created', desc: 'Evidence assembled, analyst assigned', badge: 'CASE', badgeStyle: { background: '#818CF8', color: '#fff' } },
                  { label: 'Investigation', desc: 'Analyst reviews timeline and profile', badge: 'REVIEW', badgeStyle: { background: '#0F1117', color: '#67E8F9', border: '1px solid rgba(255,255,255,.2)' } },
                  { label: 'Disposition', desc: 'Cleared, escalated, or SAR filed', badge: 'CLOSED', badgeStyle: { background: '#4ADE80', color: '#1a1840' } },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: i < 3 ? '14px' : '0' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'rgba(255,255,255,.35)', paddingTop: '3px', minWidth: '20px' }}>0{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', ...item.badgeStyle }}>{item.badge}</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,.62)', margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Integration note ─────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Integration</span>
              <h2 className="sec-title">Sits in-line with your existing payment rails</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', marginBottom: '24px' }}>
                Fintegrity is not a payment processor. It&apos;s the compliance layer that sits
                between your product and your rails. You keep full control of money movement —
                we decide whether each transaction should proceed, hold, or stop.
              </p>
              <ul className="feature-list">
                {[
                  ['One API call', 'POST /v1/decide before any debit or credit executes. Synchronous response in under 50ms P99.'],
                  ['Works with any rails', 'Mono, Flutterwave, Paystack, NIBSS, in-house ledgers — Fintegrity sits above the rails, not inside them.'],
                  ['No changes to your UX', 'The monitoring logic is invisible to your customers. Decisions happen at the infrastructure layer.'],
                  ['Connects to Case Management', 'Alerts automatically create cases. Your compliance team works in Fintegrity\'s investigation interface.'],
                ].map(([title, body]) => (
                  <li className="feature-item" key={title}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text">
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '12px' }}>
              {[
                { href: '/case-management', label: 'Case Management', desc: 'Every monitoring alert creates a structured case with evidence pre-assembled. See how compliance teams use it.' },
                { href: '/compliance-decisioning-api', label: 'Compliance Decision API', desc: 'The real-time decision engine that transaction monitoring feeds into. One call, one authoritative decision.' },
                { href: '/audit-trail-and-reporting', label: 'Audit Trail & Reporting', desc: 'Every monitoring event and decision is written to the append-only evidence store, ready for regulators.' },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ display: 'block', padding: '20px', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r)', textDecoration: 'none', transition: 'border-color .18s' }} className="cap-card">
                  <div style={{ fontFamily: 'var(--font-sora)', fontWeight: 600, fontSize: '0.97rem', marginBottom: '8px', color: 'var(--ink)' }}>{link.label} →</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline="See Fintegrity monitor transactions in your business"
        body="We'll walk you through a live configuration tuned to your transaction volumes, customer segments, and regulatory exposure."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See how decisions work"
        secondaryHref="/compliance-decisioning-api"
      />
    </>
  )
}
