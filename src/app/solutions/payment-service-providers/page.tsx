import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import PspFlow from '@/components/diagrams/PspFlow'

export const metadata: Metadata = {
  title: 'Compliance for Payment Service Providers & Processors',
  description:
    'Merchant and transaction risk controls for PSPs and processors — velocity rules, settlement monitoring and consistent screening, all evidenced.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/payment-service-providers' },
  openGraph: {
    title: 'Compliance infrastructure for PSPs & processors — Fintegrity Technologies Limited',
    description: 'Merchant risk, velocity and settlement monitoring in one decision layer.',
    url: 'https://www.getfintegrity.com/solutions/payment-service-providers',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const WHAT_YOU_GET = [
  {
    tag: 'Merchant risk',
    title: 'One risk state per merchant',
    body: 'Merchant risk profiling with a single authoritative state — updated by onboarding screening, transaction velocity, and settlement patterns. Risk profile visible to the decision layer on every transaction.',
  },
  {
    tag: 'Monitoring',
    title: 'Velocity and settlement-pattern rules',
    body: 'Tunable velocity and settlement-concentration monitoring rules, simulatable against real transaction history before going live. Keeps signal high and false-positive rates under control.',
  },
  {
    tag: 'Screening',
    title: 'Consistent screening across all flows',
    body: 'Sanctions, PEP and adverse-media screening orchestrated into the decision — applied consistently across merchant onboarding and transaction flows, with per-check evidence for every result.',
  },
  {
    tag: 'Evidence',
    title: 'Sponsor-bank due diligence in minutes',
    body: 'Evidence packs covering any merchant, transaction or case are generated on demand. A sponsor bank review that used to take days is answered from one query.',
  },
]

export default function PspsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Industries', href: '/solutions/payment-service-providers' },
        { name: 'Payment Service Providers & Processors', href: '/solutions/payment-service-providers' },
      ]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ label: 'Industries' }, { label: 'Payment Service Providers & Processors' }]} />
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Industries</span>
            <h1>Compliance infrastructure for payment service providers &amp; processors</h1>
            <p className="page-hero-lead">
              Merchant and transaction risk controls — velocity rules, settlement monitoring
              and consistent screening — orchestrated into one decision and one evidence trail.
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
            <h2 className="sec-title">Risk from two directions. Proof required from one place.</h2>
            <p className="sec-intro">
              PSPs and processors sit between merchants and the rails, which means risk comes
              from both directions: merchant onboarding risk, transaction velocity, settlement
              exposure, and the sponsor bank&apos;s expectation that every flow is controlled
              and provable. Stitching that together across point tools leaves gaps that show
              up as regulatory and sponsor-bank questions you can&apos;t answer cleanly.
            </p>
          </div>
          <div className="two-col-feature reveal" style={{ marginTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Where the gaps appear</h3>
              <ul className="feature-list">
                {[
                  'Merchant onboarding screening result lives in the vendor dashboard — not connected to live transaction decisions',
                  'Velocity and settlement rules tuned for one merchant profile applied generically to all',
                  'Sponsor bank asks for proof of screening consistency — answer is spread across three systems',
                  'Settlement exposure spikes before monitoring catches it — batch timing too slow',
                  'No single evidence view covering both onboarding and live transaction risk',
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
                  'Merchant onboarding and live transactions both feed one decision layer',
                  'Velocity and settlement rules tunable per merchant profile, tested by simulation',
                  'Screening consistent across all flows — per-check evidence written every time',
                  'Real-time pre-authorisation monitoring catches settlement patterns before they complete',
                  'One evidence query answers any sponsor bank or regulatory request',
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
            <h2 className="sec-title">One decisioning layer across merchant onboarding and transaction flow</h2>
            <p className="sec-intro">
              Fintegrity gives processors a single decisioning layer across merchant onboarding
              and transaction flow: enforce merchant risk tiers, apply velocity and structuring
              rules, screen consistently, and capture evidence for every decision — so a
              sponsor-bank review is answered from one place.
            </p>
          </div>
          <div className="reveal">
            <PspFlow />
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">What you get</span>
            <h2 className="sec-title">Merchant risk controlled and evidenced end to end</h2>
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
              { href: '/transaction-monitoring', label: 'Transaction Monitoring', desc: 'Velocity, settlement-pattern and structuring rules across merchant and transaction flows — real-time, pre-authorisation.' },
              { href: '/rules-engine', label: 'Rules Engine', desc: 'Author and simulate merchant-specific monitoring rules without engineering changes. Tune false-positive rates before going live.' },
              { href: '/audit-trail-and-reporting', label: 'Audit Trail & Reporting', desc: 'Every decision across onboarding and transaction flows is evidenced and queryable — one query answers any sponsor-bank request.' },
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
        body="We'll demonstrate a live PSP configuration — merchant risk profiling, velocity monitoring, settlement pattern rules, and evidence generation in one session."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See transaction monitoring"
        secondaryHref="/transaction-monitoring"
      />
    </>
  )
}
