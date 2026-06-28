import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import RuleLifecycle from '@/components/diagrams/RuleLifecycle'

export const metadata: Metadata = {
  title: 'Compliance Rules Engine — Author, Simulate, Deploy',
  description:
    'A no-code rules engine for compliance teams. Version every rule, simulate against historical transactions, and deploy in hours — no engineering changes.',
  alternates: { canonical: 'https://www.getfintegrity.com/rules-engine' },
  openGraph: {
    title: 'No-code compliance Rules Engine with simulation — Fintegrity Technologies Limited',
    description: 'Author, test against real history, and deploy compliance rules without waiting on engineering.',
    url: 'https://www.getfintegrity.com/rules-engine',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const DIFFERENTIATORS = [
  {
    tag: 'Versioning',
    title: 'Effective dates and full version history',
    body: 'Rules are never silently overwritten — old versions are retained and queryable, and every decision references the exact rule version that produced it.',
    note: 'When a regulator asks "what rule was in force on this date?", the answer is on record.',
    compliance: true,
  },
  {
    tag: 'Simulation',
    title: 'Test before it touches a customer',
    body: 'Before a rule goes live, run it against your last 30 days of transactions to see how often it would have fired, on which transactions, and an estimated false-positive rate — so you tune before alerts pile up.',
    note: null,
    compliance: false,
  },
  {
    tag: 'Speed',
    title: 'Hours, not weeks',
    body: 'Because rule changes do not require code, compliance moves at the speed of the threat, not the release calendar. Engineering sets up the integration once; after that, the compliance team owns the rules.',
    note: null,
    compliance: false,
  },
]

export default function RulesEnginePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Rules Engine', href: '/rules-engine' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ label: 'Rules Engine' }]} />
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Product</span>
            <h1>Rules Engine</h1>
            <p className="page-hero-lead">
              Author, test and deploy custom compliance rules without engineering changes.
              Version every rule, and simulate it against real transaction history before it
              ever affects a live decision.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Request a demo →
              </Link>
              <a
                href="https://docs.getfintegrity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                API docs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The problem</span>
            <h2 className="sec-title">Compliance logic buried in developer code goes stale</h2>
            <p className="sec-intro">
              In most fintechs, compliance logic lives in developer code. Changing a threshold
              means a ticket, a sprint, and a deploy — so rules go stale, and compliance teams
              can&apos;t respond to new typologies or regulatory shifts at the speed those changes
              demand. Worse, no one can prove which version of a rule was in force when a given
              decision was made.
            </p>
          </div>

          {/* Contrast: then vs now */}
          <div className="two-col-feature reveal" style={{ marginTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--block)' }}>
                Without a rules engine
              </h3>
              <ul className="feature-list">
                {[
                  'Compliance raises a threshold change → files a Jira ticket',
                  'Engineering picks it up in the next sprint (days to weeks)',
                  'Change goes through review and deploy pipeline',
                  'New typology is already established before the rule fires',
                  'No record of which threshold was in force on any given date',
                ].map((item) => (
                  <li className="feature-item" key={item}>
                    <span
                      className="feature-check"
                      style={{ background: 'var(--block-bg)', color: 'var(--block)' }}
                    >
                      ✗
                    </span>
                    <div className="feature-item-text"><p>{item}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--allow)' }}>
                With Fintegrity&apos;s Rules Engine
              </h3>
              <ul className="feature-list">
                {[
                  'Compliance opens the policy builder directly',
                  'Rule drafted and simulated against 30 days of history',
                  'False-positive rate checked before going live',
                  'Rule activated with an effective date in hours',
                  'Every decision references the exact rule version in force',
                ].map((item) => (
                  <li className="feature-item" key={item}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text"><p>{item}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it works</span>
            <h2 className="sec-title">Draft. Simulate. Activate. Version.</h2>
            <p className="sec-intro">
              Fintegrity gives compliance teams a no-code policy builder. Rules are defined in a
              versioned schema with conditions, an action (flag / review / block), and effective
              dates. Engineering sets up the integration once; after that, the compliance team
              owns the rules.
            </p>
          </div>

          {/* Lifecycle diagram */}
          <div className="reveal">
            <RuleLifecycle />
          </div>

          {/* Three differentiators */}
          <div className="cap-grid" style={{ marginTop: '48px' }}>
            {DIFFERENTIATORS.map((item) => (
              <div className="cap-card reveal" key={item.tag}>
                <div className="cap-card-tag">{item.tag}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.note && (
                  <>
                    {item.compliance && (
                      /* NEEDS COMPLIANCE REVIEW: verify that "what rule was in force on this date?" is a defensible claim about the versioning implementation */
                      <></>
                    )}
                    <p
                      style={{
                        marginTop: '10px',
                        fontStyle: 'italic',
                        fontSize: '0.84rem',
                        color: 'var(--muted)',
                      }}
                    >
                      {item.note}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it matters ───────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Alert quality</span>
              <h2 className="sec-title">Simulation kills alert fatigue before it starts</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', maxWidth: '50ch' }}>
                Alert fatigue is the silent killer of compliance programs — too many low-signal
                alerts, and the real ones get buried. Simulation lets you start narrow and tune
                deliberately, keeping signal high and your team focused on what matters.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '14px', maxWidth: '50ch' }}>
                Because the simulation runs against real historical transactions (not synthetic
                data), the results reflect your actual customer population — not an approximation.
                A rule that would have fired 4,000 times in 30 days on real data needs tuning
                before it goes live.
              </p>
            </div>
            <div className="reveal">
              <div
                style={{
                  background: 'linear-gradient(135deg,#1a1840,#2a2270)',
                  borderRadius: '18px',
                  padding: '28px',
                  color: '#fff',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--cyan)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '16px',
                  }}
                >
                  Example simulation result
                </div>
                {[
                  { label: 'Rule', value: 'Amount > ₦2M in any 24h window' },
                  { label: 'Period', value: 'Last 30 days' },
                  { label: 'Would-fire count', value: '2,841 times' },
                  { label: 'Sample hits', value: '12 shown' },
                  { label: 'Est. false-positive rate', value: '94%' },
                  { label: 'Recommendation', value: 'Raise threshold or add counterparty filter' },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,.08)',
                      fontSize: '0.84rem',
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,.55)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>{row.label}</span>
                    <span style={{ color: '#fff', fontWeight: 500, textAlign: 'right' }}>{row.value}</span>
                  </div>
                ))}
                <p
                  style={{
                    marginTop: '16px',
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,.45)',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                  }}
                >
                  Simulation result before activation. Compliance team tunes threshold to ₦5M
                  — estimated false-positive rate drops to 18%. Rule goes live the same afternoon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Connected capabilities ───────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Connected capabilities</span>
            <h2 className="sec-title">Rules feed into the full compliance stack</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              {
                href: '/compliance-decisioning-api',
                label: 'Compliance Decision API',
                desc: 'Live rules fire on every decision call. The response includes which rules triggered and the exact version in force.',
              },
              {
                href: '/transaction-monitoring',
                label: 'Transaction Monitoring',
                desc: 'Rules Engine powers the monitoring rule library — including velocity, threshold, structuring and pattern rules.',
              },
              {
                href: '/audit-trail-and-reporting',
                label: 'Audit Trail & Reporting',
                desc: 'Every decision references its rule version. Regulators can inspect which rule was in force on any date.',
              },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-sora)', fontWeight: 700, marginBottom: '8px' }}>
                  {link.label} →
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="See how Fintegrity evaluates transactions in real time"
        body="We'll show you the policy builder, run a live simulation against transaction history, and demonstrate a rule going from draft to active without a single engineering change."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="Read the API docs"
        secondaryHref="https://docs.getfintegrity.com"
      />
    </>
  )
}
