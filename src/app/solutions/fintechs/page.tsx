import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import FintechInlineFlow from '@/components/diagrams/FintechInlineFlow'

export const metadata: Metadata = {
  title: 'Compliance Infrastructure for Fintechs & Digital Banks',
  description:
    'Embedded compliance decisioning for fintechs and digital banks — KYC tiering, real-time monitoring and regulator-ready evidence, without building it in-house.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/fintechs' },
  openGraph: {
    title: 'Compliance infrastructure built for fintechs & digital banks — Fintegrity Technologies Limited',
    description: 'One compliance brain for onboarding, payments and withdrawals — API-first.',
    url: 'https://www.getfintegrity.com/solutions/fintechs',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const WHAT_YOU_GET = [
  {
    tag: 'Decisions',
    title: 'Real-time decisions on every transaction',
    body: 'CLEAR / FLAGGED / HELD_FOR_REVIEW / BLOCKED on every payment, withdrawal and onboarding event — synchronous, before money moves.',
  },
  {
    tag: 'KYC enforcement',
    title: 'Tier limits enforced at the transaction layer',
    body: 'KYC tiers collected at onboarding are enforced at every transaction — not just recorded. A T1 customer trying a T2 transaction gets a hard stop at the decision layer.',
  },
  {
    tag: 'Rules',
    title: 'Tunable monitoring, started narrow',
    body: 'A focused, simulatable rule library — velocity, thresholds, structuring patterns, new-account risk. Start with the highest-exposure scenarios; expand with simulation, not guesswork.',
  },
  {
    tag: 'Evidence',
    title: 'Regulator- and sponsor-bank-ready evidence on demand',
    body: 'Every decision is evidenced. Evidence packs for any customer, transaction or case are generated in seconds — not reconstructed from spreadsheets and email threads.',
  },
]

export default function FinitechsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Industries', href: '/solutions/fintechs' },
        { name: 'Fintechs & Digital Banks', href: '/solutions/fintechs' },
      ]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ label: 'Industries' }, { label: 'Fintechs & Digital Banks' }]} />
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Industries</span>
            <h1>Compliance infrastructure for fintechs &amp; digital banks</h1>
            <p className="page-hero-lead">
              A single compliance brain that plugs into onboarding, payments and withdrawals —
              so a small compliance team can operate with bank-grade control and prove it.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Request a demo →
              </Link>
              <Link href="/compliance-decisioning-api" className="btn btn-ghost">
                See the Decision API
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
            <h2 className="sec-title">Bank-grade obligations. Startup-sized compliance team.</h2>
            <p className="sec-intro">
              Fast-growing fintechs and digital banks carry bank-grade compliance obligations
              on a startup-sized team. Building a full KYC + monitoring + evidence stack in-house
              costs a fortune and pulls engineers off the product. Buying enterprise tools means
              pricing and implementation timelines built for banks, not for you.
            </p>
          </div>
          <div className="two-col-feature reveal" style={{ marginTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>What the gap looks like</h3>
              <ul className="feature-list">
                {[
                  'KYC tier limits collected at onboarding but not enforced at the transaction',
                  'Monitoring alerts in a separate vendor dashboard, disconnected from payment decisions',
                  'Evidence reconstructed manually when a sponsor bank asks for proof',
                  'Engineering required for every rule change — compliance waits on sprints',
                  'One new hire on the compliance team expected to manage everything',
                ].map((item) => (
                  <li className="feature-item" key={item}>
                    <span className="feature-check" style={{ background: 'var(--block-bg)', color: 'var(--block)' }}>✗</span>
                    <div className="feature-item-text"><p>{item}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>What Fintegrity gives you</h3>
              <ul className="feature-list">
                {[
                  'KYC tier enforcement at the transaction layer — every time, not just at onboarding',
                  'Monitoring, screening and state management converged into one decision',
                  'Evidence for every decision generated on demand in seconds',
                  'No-code rule builder — compliance changes thresholds without filing a ticket',
                  'One API, one console, one compliance team workflow',
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

      {/* ── How Fintegrity fits ───────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it fits</span>
            <h2 className="sec-title">Sits in-line before money moves. One integration.</h2>
            <p className="sec-intro">
              Fintegrity sits in-line before money moves: it enforces KYC tiers, screens and
              monitors transactions, maintains one authoritative risk state per customer, and
              writes immutable evidence for every decision — all behind one API and one console.
              You integrate once; your compliance team gets a workflow built for them, and your
              engineers get back to building product.
            </p>
          </div>
          <div className="reveal">
            <FintechInlineFlow />
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">What you get</span>
            <h2 className="sec-title">Bank-grade control, fintech-grade speed</h2>
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

      {/* ── Related capabilities ─────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Under the hood</span>
            <h2 className="sec-title">The platform capabilities behind the decision</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              { href: '/compliance-decisioning-api', label: 'Compliance Decision API', desc: 'The synchronous decision call that sits in your payment handler — returns CLEAR/FLAGGED/HELD_FOR_REVIEW/BLOCKED in under 100ms.' },
              { href: '/transaction-monitoring', label: 'Transaction Monitoring', desc: 'Velocity, threshold, structuring and new-account rules evaluated in parallel on every transaction, before money moves.' },
              { href: '/customer-risk-profiling', label: 'Customer Risk Profiling', desc: 'One authoritative risk state per customer — updated by screening, monitoring and KYC events, enforced by the Decision API.' },
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
        body="We'll walk through a live configuration tuned to a fintech or digital bank's transaction flows — one integration, full compliance coverage."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See the Decision API"
        secondaryHref="/compliance-decisioning-api"
      />
    </>
  )
}
