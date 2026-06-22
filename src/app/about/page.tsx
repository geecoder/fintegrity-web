import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import { CONTACT_EMAIL, BOOKING_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About Fintegrity',
  description:
    'Fintegrity Technologies Limited builds embedded compliance infrastructure for regulated fintechs in Africa. Founded in Lagos, Nigeria. We don\'t sell checks. We sell defensible compliance decisions.',
  alternates: { canonical: 'https://www.getfintegrity.com/about' },
  openGraph: {
    title: 'About Fintegrity Technologies Limited',
    description: 'Building the compliance layer Nigerian fintechs deserve.',
    url: 'https://www.getfintegrity.com/about',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const VALUES = [
  {
    num: '01',
    title: 'Precision',
    body: 'Vague compliance is useless compliance. Every Fintegrity decision is reasoned, every evidence record is complete, and every rule is explicit. If it can\'t be explained to a regulator, it shouldn\'t exist.',
  },
  {
    num: '02',
    title: 'Defensibility',
    body: 'The test of good compliance isn\'t the policy document. It\'s whether you can defend every decision to a regulator, with evidence, on demand. We build systems that pass that test.',
  },
  {
    num: '03',
    title: 'Partnership',
    body: 'We\'re building with a small group of Nigerian fintechs who share a specific kind of problem. Their product shapes our product. We don\'t build for hypothetical customers.',
  },
  {
    num: '04',
    title: 'Transparency',
    body: 'No black boxes. Every rule that fires, every state that changes, and every decision that\'s made is visible, auditable, and attributable. That\'s what defensibility requires.',
  },
]

const NOT_GRID = [
  { not: 'A KYC provider', but: 'The compliance layer that enforces what your KYC provider verified' },
  { not: 'A payment processor', but: 'The decision engine your payment rails act on' },
  { not: 'A screening data vendor', but: 'The orchestration layer that integrates your screening provider' },
  { not: 'Your MLRO', but: 'The tools your compliance team and MLRO use to do their job' },
  { not: 'A bank or fund holder', but: 'Infrastructure — we never touch money, only decisions about it' },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'About', href: '/about' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="wrap">
          <div className="about-hero-grid">
            <div className="about-hero-text">
              <span className="sec-eyebrow">About Fintegrity</span>
              <h1 className="about-h1">Building the compliance layer Nigerian fintechs deserve</h1>
              <p className="about-tagline">&ldquo;We don&apos;t sell checks. We sell defensible compliance decisions.&rdquo;</p>
              <div className="about-hero-actions">
                <Link href="/book-a-demo" className="btn btn-primary">
                  Become a design partner →
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ghost">
                  Email us
                </a>
              </div>
            </div>
            <div className="about-hero-visual">
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '18px', padding: '28px', boxShadow: 'var(--shadow-lg)', maxWidth: '340px', width: '100%' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--indigo-d)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '18px' }}>
                  The Fintegrity position
                </div>
                {[
                  { label: 'Your product', pos: 20 },
                  { label: 'Fintegrity (compliance layer)', pos: 45, highlight: true },
                  { label: 'Your payment rails', pos: 70 },
                  { label: 'Your KYC provider', pos: 90 },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.highlight ? 'var(--indigo)' : 'var(--line)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.84rem', color: item.highlight ? 'var(--indigo-d)' : 'var(--slate)', fontWeight: item.highlight ? 600 : 400 }}>{item.label}</span>
                  </div>
                ))}
                <div style={{ marginTop: '18px', padding: '14px', background: '#F4F3FF', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                  Fintegrity decides. Your rails execute. Your compliance team investigates. Your regulator audits.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────── */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-two-col">
            <div className="about-col-label">
              <span className="sec-eyebrow">The problem</span>
            </div>
            <div>
              <h2 className="about-section-h">Nigerian fintechs face a compliance infrastructure gap</h2>
              <p className="about-section-p" style={{ marginBottom: '18px' }}>
                Nigeria&apos;s fintech ecosystem is growing faster than compliance infrastructure can
                keep up. The AML tools that exist were built for banks — large teams, slow
                transaction volumes, and months-long implementation timelines. They don&apos;t fit
                wallets, PSPs, or lenders processing millions of transactions a day with three
                people in compliance.
              </p>
              <p className="about-section-p" style={{ marginBottom: '18px' }}>
                The result is that most fintechs manage compliance with spreadsheets, email chains,
                manual reviews, and periodic batch runs. When a regulator asks for evidence that a
                transaction was properly reviewed before it processed, the answer is a reconstructed
                narrative — not a contemporaneous record.
              </p>
              <p className="about-section-p">
                The CBN and NFIU have made clear that the direction of travel is toward automated,
                real-time, evidenced compliance. Fintegrity is that infrastructure.
                {/* NEEDS COMPLIANCE REVIEW — regulatory direction claim */}
              </p>
              <div className="north-star" style={{ marginTop: '28px' }}>
                <div className="north-star-lines">
                  <p>&ldquo;Compliance should be infrastructure, not overhead. Built into the money flow, not bolted on after.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we build ────────────────────────────────── */}
      <section className="about-section about-section-soft">
        <div className="wrap">
          <div className="about-two-col">
            <div className="about-col-label">
              <span className="sec-eyebrow">What we build</span>
            </div>
            <div>
              <h2 className="about-section-h">The compliance brain behind your money flows</h2>
              <p className="about-section-p" style={{ marginBottom: '16px' }}>
                Fintegrity is the decision and evidence layer that sits between your product and
                your payment rails. Before money moves, we evaluate the transaction — against the
                customer&apos;s risk state, your configured rule library, and the patterns we
                know are relevant to your business model. We return a decision. You act on it.
              </p>
              <p className="about-section-p" style={{ marginBottom: '16px' }}>
                Every decision is evidenced. Every state change is immutable. Your compliance team
                gets structured cases, not alert floods. Your regulators get complete evidence
                packs on demand, not reconstructed spreadsheets.
              </p>
              <div className="story-insights" style={{ marginTop: '24px' }}>
                {[
                  { icon: '⚡', title: 'Real-time, not batch', body: 'Decisions happen synchronously, before money moves. Not after the fact. Not in the next morning\'s batch run.' },
                  { icon: '🔒', title: 'Immutable evidence', body: 'Every decision, state change, and case action is written to an append-only store. The record cannot be altered.' },
                  { icon: '⚙️', title: 'Configurable to your model', body: 'Rules, thresholds, and patterns are tuned to your specific business model — not applied generically across all customers.' },
                ].map((item) => (
                  <div className="story-insight" key={item.title}>
                    <div className="story-insight-icon">{item.icon}</div>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we're not ───────────────────────────────── */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-two-col">
            <div className="about-col-label">
              <span className="sec-eyebrow">Boundaries</span>
            </div>
            <div>
              <h2 className="about-section-h">Clear about what Fintegrity is not</h2>
              <p className="about-section-p" style={{ marginBottom: '24px' }}>
                Compliance products often blur their boundaries. Fintegrity doesn&apos;t. Being
                clear about what we are not makes it easier to understand what we are — and what
                your team remains responsible for.
              </p>
              <div className="not-grid">
                {NOT_GRID.map((item) => (
                  <div className="not-item" key={item.not}>
                    <div className="not-col-a">
                      <span className="not-x">✗</span>
                      <span className="not-label">{item.not}</span>
                    </div>
                    <div className="not-col-b">
                      <span className="not-arrow">✓</span>
                      <span className="not-is">{item.but}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="about-section about-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Our values</span>
            <h2 className="sec-title">Four principles that shape every product decision</h2>
          </div>
          <div className="diff-grid" style={{ marginTop: '40px' }}>
            {VALUES.map((v) => (
              <div className="diff-card reveal" key={v.num}>
                <div className="diff-card-num">{v.num}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design partner model ─────────────────────────── */}
      <section className="about-future">
        <div className="wrap">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <span className="sec-eyebrow" style={{ color: 'var(--cyan)' }}>Design partner model</span>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3.6vw,2.6rem)', marginTop: '12px', marginBottom: '20px' }}>
              We&apos;re building with a small cohort of Nigerian fintechs
            </h2>
            <p style={{ color: 'rgba(255,255,255,.78)', fontSize: '1.06rem', lineHeight: 1.7, marginBottom: '32px' }}>
              Fintegrity is in active development with a small group of design partners — Nigerian
              fintechs who are building the platform with us, not just waiting for it. Design
              partners get early access, direct influence over the roadmap, and regulator-ready
              infrastructure built around their specific compliance challenges.
            </p>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '0.88rem', marginBottom: '32px' }}>
              Design partnerships are free. We&apos;re not building software for a fee — we&apos;re
              building the right product with the right partners.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Apply to be a design partner →
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-outline-w">
                Email the founder
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline="Questions about Fintegrity?"
        body="We're a small team building in public with our design partners. If you have compliance infrastructure questions or want to explore a partnership, reach out."
        primaryLabel="Book a conversation →"
        primaryHref="/book-a-demo"
        secondaryLabel="Email us"
        secondaryHref={`mailto:${CONTACT_EMAIL}`}
      />
    </>
  )
}
