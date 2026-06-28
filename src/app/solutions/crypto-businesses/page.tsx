import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import CryptoFlow from '@/components/diagrams/CryptoFlow'

export const metadata: Metadata = {
  title: 'Compliance for Crypto & Digital Asset Platforms',
  description:
    'Real-time screening, monitoring and decisioning for crypto on/off-ramps and digital-asset platforms — with immutable evidence for every decision.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/crypto-businesses' },
  openGraph: {
    title: 'Compliance infrastructure for crypto & digital asset platforms — Fintegrity Technologies Limited',
    description: 'Screening, monitoring and evidence for on/off-ramp flows.',
    url: 'https://www.getfintegrity.com/solutions/crypto-businesses',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const WHAT_YOU_GET = [
  {
    tag: 'Decisions',
    title: 'Real-time decisioning on on/off-ramp and asset-movement events',
    body: 'CLEAR / FLAGGED / HELD_FOR_REVIEW / BLOCKED on every on-ramp, off-ramp and asset transfer — synchronous, before the transaction executes. Not a batch review after the fact.',
  },
  {
    tag: 'Screening',
    title: 'Screening orchestrated into the decision, BYO provider',
    body: 'Sanctions, PEP and adverse-media screening applied consistently inside every on/off-ramp decision. Connect your existing provider — no vendor lock-in, BYO credentials.',
  },
  {
    tag: 'Rules',
    title: 'Versioned, simulatable rules tuned to crypto typologies',
    body: 'Rules authored in the no-code policy builder, simulated against real transaction history before going live. Tune for crypto-specific patterns (rapid on/off-ramp cycling, structuring, unusual velocity) without waiting on engineering.',
  },
  {
    tag: 'Evidence',
    title: 'Immutable evidence for every decision',
    body: 'Every on/off-ramp and asset-movement decision is captured in the append-only audit ledger — rule version, screening result, customer risk state, timestamp. Defensible when the regulatory picture shifts.',
  },
]

export default function CryptoBusinessesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Industries', href: '/solutions/crypto-businesses' },
        { name: 'Crypto & Digital Asset Platforms', href: '/solutions/crypto-businesses' },
      ]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ label: 'Industries' }, { label: 'Crypto & Digital Asset Platforms' }]} />
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Industries</span>
            <h1>Compliance infrastructure for crypto &amp; digital asset platforms</h1>
            <p className="page-hero-lead">
              Real-time screening, monitoring and decisioning for on/off-ramp and digital-asset
              flows — with immutable evidence for every decision you make.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Request a demo →
              </Link>
              <Link href="/transaction-monitoring" className="btn btn-ghost">
                See transaction monitoring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The pain ─────────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The challenge</span>
            <h2 className="sec-title">Intense scrutiny. High velocity. Fast-shifting compliance expectations.</h2>
            {/* NEEDS COMPLIANCE REVIEW: regulatory-posture framing for crypto — do not assert specific regulatory requirements; describe the compliance challenge and Fintegrity's capability response only */}
            <p className="sec-intro">
              Crypto on/off-ramps and digital-asset platforms operate under intense and evolving
              scrutiny, with high transaction velocity and elevated fraud and sanctions exposure.
              The compliance bar is rising faster than most in-house tooling can keep up with.
            </p>
          </div>
          <div className="two-col-feature reveal" style={{ marginTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Common compliance gaps</h3>
              <ul className="feature-list">
                {[
                  'Screening applied inconsistently — some on-ramp flows checked, some not',
                  'Velocity and pattern rules written for fiat use cases, not crypto typologies',
                  'Evidence scattered across vendor dashboards — hard to produce under scrutiny',
                  'Rule changes require engineering sprints — compliance can\'t respond fast enough to typology shifts',
                  'No single evidence record covering screening, monitoring and decision for each on/off-ramp event',
                ].map((item) => (
                  <li className="feature-item" key={item}>
                    <span className="feature-check" style={{ background: 'var(--block-bg)', color: 'var(--block)' }}>✗</span>
                    <div className="feature-item-text"><p>{item}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>With Fintegrity</h3>
              <ul className="feature-list">
                {[
                  'Screening orchestrated inside every on/off-ramp decision — consistent coverage, BYO provider',
                  'Rules tuned to crypto typologies, simulatable before going live',
                  'Immutable evidence written for every decision, queryable on demand',
                  'No-code rule builder — compliance updates thresholds in hours, not release cycles',
                  'One evidence record: screening result + monitoring outcome + decision + timestamp',
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

      {/* ── How it fits ──────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it fits</span>
            <h2 className="sec-title">The same decisioning layer, tuned to digital-asset flows</h2>
            <p className="sec-intro">
              Fintegrity brings the same decisioning and evidence layer to digital-asset flows:
              orchestrate screening into every on/off-ramp decision, apply velocity and pattern
              rules tuned to crypto typologies, maintain one risk state per customer, and capture
              defensible evidence throughout. Because rules are no-code and versioned, you adapt
              as the regulatory picture shifts — in hours, not release cycles.
            </p>
          </div>
          <div className="reveal">
            <CryptoFlow />
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">What you get</span>
            <h2 className="sec-title">Real-time compliance, immutable evidence, no release-cycle dependency</h2>
          </div>
          <div className="cap-grid">
            {WHAT_YOU_GET.map((item) => (
              <div className="cap-card reveal" key={item.tag}>
                <div className="cap-card-tag">{item.tag}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Platform capabilities</span>
            <h2 className="sec-title">Under the hood</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              { href: '/transaction-screening', label: 'Transaction Screening', desc: 'Sanctions, PEP and adverse-media screening orchestrated inside every on/off-ramp decision. BYO provider, two connectors active for redundancy.' },
              { href: '/transaction-monitoring', label: 'Transaction Monitoring', desc: 'Velocity and pattern rules tuned to crypto typologies — rapid cycling, structuring, unusual counterparty concentration — applied before each transaction.' },
              { href: '/rules-engine', label: 'Rules Engine', desc: 'No-code rule builder with version history and simulation mode. Update crypto-typology rules in hours, not sprints, as the regulatory picture shifts.' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-sora)', fontWeight: 700, marginBottom: '8px' }}>{link.label} →</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="See how Fintegrity evaluates transactions in real time"
        body="We'll show you a live crypto configuration — on/off-ramp decision flow, BYO screening, crypto-tuned rules, and immutable evidence — built around your platform's transaction typologies."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See transaction monitoring"
        secondaryHref="/transaction-monitoring"
      />
    </>
  )
}
