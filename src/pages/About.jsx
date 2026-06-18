import { useReveal, usePageMeta } from '../utils/hooks'
import { BOOKING_URL } from '../config/site'

const VALUES = [
  { num: '01', title: 'Evidence over assertion', body: "We don't promise compliance, we prove it. Every decision is backed by an immutable, verifiable audit trail." },
  { num: '02', title: 'Regulatory honesty', body: "We tell fintechs what CBN and NFIU actually require, even when it's uncomfortable." },
  { num: '03', title: 'Brutal execution discipline', body: 'We ship the minimum that proves the hypothesis, get real data, then build.' },
  { num: '04', title: 'Founder-operator empathy', body: "Every decision is filtered through 'would this have made my compliance team's life better?'" },
  { num: '05', title: 'Infrastructure thinking', body: "Like a payment rail, Fintegrity should be reliable enough to be invisible when it works — and its failure taken just as seriously." },
]

const NOT_LIST = [
  { not: 'Another KYC vendor', is: 'A compliance operating system' },
  { not: 'A generic fraud rules engine', is: 'Regulatory-grade, evidence-first infrastructure' },
  { not: 'A dashboard without enforcement power', is: 'Every decision is actionable and auditable' },
  { not: 'For enterprise banks only', is: 'Built for the 250+ Nigerian fintechs who need bank-grade compliance affordably' },
  { not: "A tool that replaces your compliance team", is: 'It makes your compliance team dramatically more effective' },
]

/* ─────────────────────────────────────────────
   Evidence pack widget — hero visual
───────────────────────────────────────────── */
function EvidenceWidget() {
  return (
    <div className="evidence-widget" aria-label="60-second evidence pack illustration">
      <div className="ew-head">
        <div className="ew-head-top">
          <span className="ew-head-tag">CBN Examination Request</span>
          <span className="ew-head-dot" aria-hidden="true" />
        </div>
        <div className="ew-request">
          "Provide evidence of AML monitoring and compliance for customer #A2847 — last 12 months."
        </div>
      </div>
      <div className="ew-generating">
        <div className="ew-gen-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3L4 7v6c0 5 3.6 8 8 9 4.4-1 8-4 8-9V7l-8-4z" stroke="#635BFF" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M9 12l2 2 4-4.5" stroke="#3ECFE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Generating evidence pack
        </div>
        <div className="ew-prog-track">
          <div className="ew-prog-fill" />
        </div>
      </div>
      <div className="ew-items">
        {[
          { label: 'Transaction audit trail', detail: '547 records' },
          { label: 'Risk state history', detail: '23 state changes' },
          { label: 'KYC verification proof', detail: 'BVN confirmed · T2' },
          { label: 'Alert dispositions', detail: '3 alerts · 0 escalated' },
          { label: 'Cryptographic integrity seal', detail: 'Immutable' },
        ].map((item, i) => (
          <div key={i} className="ew-item" style={{ animationDelay: `${0.8 + i * 0.3}s` }}>
            <span className="ew-check" aria-hidden="true">✓</span>
            <span className="ew-item-label">{item.label}</span>
            <span className="ew-item-detail">{item.detail}</span>
          </div>
        ))}
      </div>
      <div className="ew-foot">
        <div className="ew-time-block">
          <span className="ew-time-num">47</span>
          <span className="ew-time-unit">seconds</span>
        </div>
        <div className="ew-foot-right">
          <p className="ew-ready">Evidence pack ready</p>
          <p className="ew-foot-note">vs. days of manual work without Fintegrity</p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  useReveal()
  usePageMeta(
    'About — Fintegrity Technology Limited',
    'Fintegrity Technology Limited builds embedded compliance infrastructure for regulated fintechs in Africa. Founded March 2026, Lagos, Nigeria. Our compliance brain sits behind every money movement and proves every decision.'
  )

  return (
    <>
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="hero-wash" aria-hidden="true" />
        <div className="wrap about-hero-grid">
          <div className="about-hero-text">
            <div className="reveal">
              <div className="sec-eyebrow">Founded March 2026 · Lagos, Nigeria</div>
              <h1 className="about-h1">Fintegrity Technology Limited</h1>
              <p className="about-tagline">Embedded Compliance as a Service.</p>
              <blockquote className="about-hero-quote">
                "We don't sell checks. We sell defensible compliance decisions."
              </blockquote>
              <div className="about-hero-actions">
                <a
                  className="btn btn-primary"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a product demo"
                >
                  Talk to the founder →
                </a>
                <a className="btn btn-ghost" href="/#product">See the platform</a>
              </div>
            </div>
          </div>
          <div className="about-hero-visual reveal">
            <EvidenceWidget />
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="about-section">
        <div className="wrap about-two-col">
          <div className="about-col-label reveal">
            <div className="sec-eyebrow">Our mission</div>
          </div>
          <div className="about-col-body reveal">
            <h2 className="about-section-h">Making compliance infrastructure the safest foundation for regulated fintech in Africa.</h2>
            <p className="about-section-p">
              To make compliance infrastructure the safest, most defensible foundation for every regulated fintech in
              Africa. Fintegrity exists because the alternative — fragmented compliance, manual evidence, regulatory
              guesswork — puts fintechs, their customers, and the financial system at risk. We build the compliance
              brain that sits behind every money movement, enforces every policy, and proves every decision.
            </p>
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="about-section about-section-soft">
        <div className="wrap about-two-col">
          <div className="about-col-label reveal">
            <div className="sec-eyebrow">Our vision</div>
          </div>
          <div className="about-col-body reveal">
            <h2 className="about-section-h">Any regulated fintech in Africa can answer any regulator's question in 60 seconds — and keep building.</h2>
            <p className="about-section-p">
              Compliance shouldn't slow fintechs down. It should protect them so they can move fast with confidence.
              The 60-second evidence pack isn't a feature — it's the bar we hold every part of the platform to.
            </p>
          </div>
        </div>
      </section>

      {/* ── North Star ── */}
      <section className="about-section">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">North star</div>
            <div className="north-star">
              <div className="north-star-lines">
                <p>"One authoritative risk state per customer.</p>
                <p>One auditable decision trail per transaction.</p>
                <p>One compliance platform for any regulated fintech in Africa."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="about-section about-section-soft">
        <div className="wrap about-two-col">
          <div className="about-col-label reveal">
            <div className="sec-eyebrow">Our story</div>
          </div>
          <div className="about-col-body reveal">
            <h2 className="about-section-h">Built by someone who lived under the regulations, not just read them.</h2>
            <p className="about-section-p">
              Fintegrity was founded by Genesis Enwenyeokwu, who spent 5 years building compliance-adjacent products at
              Rova — a company operating under simultaneous FCA (UK) and CBN (Nigeria) oversight. Most compliance tools
              are built by people who have read the regulations. Genesis built tools while living under them — responding
              to examiner requests, navigating sponsor-bank relationships, and dealing with the exact evidence gaps
              Fintegrity now closes.
            </p>
            <div className="story-insights">
              <div className="story-insight">
                <div className="story-insight-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L3 7v6c0 5 3.5 8 9 9 5.5-1 9-4 9-9V7l-9-5z" stroke="#635BFF" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4.5" stroke="#3ECFE0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <strong>KYC is collected but not enforced.</strong>
                  <p>KYC data lives in one place and transaction limits in another, with no enforcement layer connecting them. A T1-verified customer can transact above their CBN-mandated limit if the engineering isn't right. Fintegrity's Decision API closes that gap.</p>
                </div>
              </div>
              <div className="story-insight">
                <div className="story-insight-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="3" width="16" height="18" rx="2" stroke="#635BFF" strokeWidth="1.8"/>
                    <path d="M8 8h8M8 12h8M8 16h5" stroke="#3ECFE0" strokeWidth="1.9" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <strong>Evidence is rebuilt from scratch every time a regulator asks.</strong>
                  <p>When CBN or a sponsor bank asks for proof a customer was monitored and compliant, teams spend days pulling data from multiple systems. Fintegrity's evidence pack produces it in 60 seconds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different ── */}
      <section className="about-section">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">What makes us different</div>
            <h2 className="sec-title">Most compliance startups build dashboards. We build enforcement infrastructure.</h2>
          </div>
          <div className="diff-grid reveal">
            <div className="diff-card">
              <div className="diff-card-num">01</div>
              <h3>Called before money moves</h3>
              <p>The Decision API is called synchronously <strong>before money moves</strong> — not in a batch report the next morning.</p>
            </div>
            <div className="diff-card">
              <div className="diff-card-num">02</div>
              <h3>Cryptographically immutable</h3>
              <p>The audit log is <strong>cryptographically immutable</strong> — not a database that could be quietly modified.</p>
            </div>
            <div className="diff-card">
              <div className="diff-card-num">03</div>
              <h3>60 seconds, not a week</h3>
              <p>The evidence pack takes <strong>60 seconds</strong> — not the week of manual work it takes today.</p>
            </div>
          </div>
          <div className="diff-definition reveal">
            <div>
              <span className="diff-def-label">What "embedded compliance" means</span>
              <p>Compliance enforced at the API layer, not reviewed in a dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-section about-section-soft">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Our values</div>
            <h2 className="sec-title">Five principles that shape every decision we make.</h2>
          </div>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div key={v.num} className="value-card reveal">
                <div className="value-num">{v.num}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Fintegrity Is NOT ── */}
      <section className="about-section">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">What Fintegrity is not</div>
            <h2 className="sec-title">Precision matters. Here's where we draw the line.</h2>
          </div>
          <div className="not-grid">
            {NOT_LIST.map((item, i) => (
              <div key={i} className="not-item reveal">
                <div className="not-col-a">
                  <span className="not-x" aria-hidden="true">✗</span>
                  <span className="not-label">{item.not}</span>
                </div>
                <div className="not-col-b">
                  <span className="not-arrow" aria-hidden="true">→</span>
                  <span className="not-is">{item.is}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where We're Going ── */}
      <section className="about-future">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow" style={{ color: 'var(--cyan)' }}>Where we're going</div>
            <h2 className="sec-title" style={{ color: '#fff', maxWidth: '28ch' }}>The compliance infrastructure layer for regulated fintech across Africa.</h2>
            <p className="sec-intro" style={{ color: 'rgba(255,255,255,.75)', maxWidth: '58ch' }}>
              Nigeria is the beachhead. The vision is not "the best compliance tool in Nigeria" — it's the compliance
              infrastructure layer that powers regulated fintech across Africa, the way Stripe powers payments globally.
            </p>
          </div>
          <div className="future-track reveal">
            <div className="future-step future-step-active">
              <div className="future-step-marker">Now</div>
              <div className="future-step-card">
                <h3>Nigeria</h3>
                <p>CBN and NFIU regime. Serving Nigerian fintechs as design partners. Building the compliance brain tuned to the local regulatory environment.</p>
              </div>
            </div>
            <div className="future-connector" aria-hidden="true">→</div>
            <div className="future-step">
              <div className="future-step-marker">Next</div>
              <div className="future-step-card">
                <h3>West Africa</h3>
                <p>Ghana and Kenya expansion. Extending the compliance layer to neighbouring regimes with overlapping AML/CFT frameworks.</p>
              </div>
            </div>
            <div className="future-connector" aria-hidden="true">→</div>
            <div className="future-step">
              <div className="future-step-marker">Future</div>
              <div className="future-step-card">
                <h3>UK Entity + FCA</h3>
                <p>A UK entity and FCA compliance layer opens the door to UK-licensed fintechs with Nigerian and West African exposure.</p>
              </div>
            </div>
          </div>
          <div className="future-cta reveal">
            <a
              className="btn btn-white"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a product demo"
            >
              Become a design partner →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
