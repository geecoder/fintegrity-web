import type { Metadata } from 'next'
import Link from 'next/link'
import DecisionWidget from '@/components/home/DecisionWidget'
import DecisionEngine from '@/components/home/DecisionEngine'
import IcpPanel from '@/components/home/IcpPanel'
import RevealInit from '@/components/RevealInit'
import OrganizationJsonLd from '@/components/json-ld/OrganizationJsonLd'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.getfintegrity.com',
  },
}

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <RevealInit />
      <div id="top" />

      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="hero">
        <div className="hero-wash" />
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Embedded compliance · built for CBN &amp; NFIU
            </span>
            <h1>
              The compliance brain{' '}
              <span className="grad-text">behind your money flows.</span>
            </h1>
            <p className="lead">
              One API call before money moves returns a real-time decision — backed by an
              immutable, regulator-ready audit trail.
            </p>
            <div className="hero-cta">
              <Link
                className="btn btn-primary"
                href="/book-a-demo"
                aria-label="Book a demo"
              >
                Book a demo →
              </Link>
              <a className="btn btn-ghost" href="#product">
                See how it works
              </a>
            </div>
            <p className="hero-note">decide · enforce · prove</p>
          </div>

          <DecisionWidget />
        </div>
      </header>

      {/* ── Feature strip ────────────────────────────────── */}
      <div className="strip">
        <div className="wrap strip-in">
          <span><b>KYC tier enforcement</b></span>
          <span><b>AML transaction monitoring</b></span>
          <span><b>Immutable evidence packs</b></span>
          <span><b>CBN / NFIU aligned</b></span>
        </div>
      </div>

      {/* ── Why now ──────────────────────────────────────── */}
      <section className="why" id="why">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Why now</div>
            <h2 className="sec-title">
              Compliance in Nigeria just became non-negotiable.
            </h2>
            <p className="sec-intro">
              Enforcement has shifted from &ldquo;do you have a policy&rdquo; to &ldquo;prove
              every transaction was checked.&rdquo; Fintechs now have to demonstrate control —
              transaction by transaction.
            </p>
          </div>
          <div className="open-list open-list-3 reveal">
            {/* NEEDS COMPLIANCE REVIEW — CBN 2024 BVN/NIN directive and tier limit specifics */}
            <div className="open-list-item">
              <div className="open-list-num">01</div>
              <h3>Tighter KYC, by mandate</h3>
              <p>
                The CBN&apos;s 2024 directive made BVN and NIN mandatory across account tiers,
                with limits enforced at every transaction.
              </p>
            </div>
            {/* NEEDS COMPLIANCE REVIEW — NFIU CTR thresholds (₦5M / ₦10M) and 7-day filing window */}
            <div className="open-list-item">
              <div className="open-list-num">02</div>
              <h3>Real reporting thresholds</h3>
              <p>
                NFIU requires currency transaction reports at ₦5M (individuals) and ₦10M
                (corporates), filed within 7 days — and structuring to evade them is an offence.
              </p>
            </div>
            <div className="open-list-item">
              <div className="open-list-num">03</div>
              <h3>Automated monitoring expected</h3>
              <p>
                Regulatory direction is moving toward mandatory, real-time automated AML/CFT
                monitoring — exactly the layer Fintegrity provides.
              </p>
            </div>
          </div>
          <p className="why-foot">
            Regulatory figures reflect current CBN / NFIU / MLPPA 2022 guidance and inform how
            Fintegrity is built.
          </p>
        </div>
      </section>

      {/* ── Platform pillars — asymmetric: text left, step-list bleeding right ── */}
      <section id="product">
        <div className="wrap">
          <div className="decide-split">
            <div className="decide-split-text reveal">
              <h2 className="sec-title">Decide. Enforce. Prove.</h2>
              <p className="sec-intro">
                Three capabilities, one API. Fintegrity plugs into your existing money flows and
                returns decisions your systems act on — and your regulators can audit.
              </p>
            </div>

            <div className="decide-split-steps reveal">
              <div className="decide-step">
                <div className="decide-step-icon-col">
                  <div className="decide-step-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 2L3 7v6c0 5 3.5 8 9 9 5.5-1 9-4 9-9V7l-9-5z"
                        stroke="#0A1F44"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12l2 2 4-4.5"
                        stroke="#0E9F6E"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="decide-step-line" />
                </div>
                <div className="decide-step-body">
                  <div className="plabel">Decide</div>
                  <h3>Real-time decision API</h3>
                  <p>
                    One synchronous call before money moves returns CLEAR, FLAGGED,
                    HELD_FOR_REVIEW, or BLOCKED — with the reasons, the rules that fired, and the
                    exact action your system should take.
                  </p>
                </div>
              </div>

              <div className="decide-step">
                <div className="decide-step-icon-col">
                  <div className="decide-step-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="#0A1F44" strokeWidth="1.8" />
                      <path
                        d="M12 7v5l3 2"
                        stroke="#0E9F6E"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="decide-step-line" />
                </div>
                <div className="decide-step-body">
                  <div className="plabel">Enforce</div>
                  <h3>One risk state per customer</h3>
                  <p>
                    A single authoritative risk status per customer, with enforced, audited
                    transitions. KYC tiers, screening hits, and monitoring alerts converge into
                    one lifecycle.
                  </p>
                </div>
              </div>

              <div className="decide-step">
                <div className="decide-step-icon-col">
                  <div className="decide-step-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="3" width="16" height="18" rx="2" stroke="#0A1F44" strokeWidth="1.8" />
                      <path
                        d="M8 8h8M8 12h8M8 16h5"
                        stroke="#0E9F6E"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="decide-step-line" />
                </div>
                <div className="decide-step-body">
                  <div className="plabel">Prove</div>
                  <h3>Regulator-ready evidence</h3>
                  <p>
                    Every decision, state change, and alert is written to an append-only audit
                    trail. Generate a complete evidence pack for any customer or transaction on
                    demand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Decision engine — signature visual ───────────── */}
      <section className="engine-section">
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 className="sec-title" style={{ margin: '0 auto' }}>See a decision happen.</h2>
            <p className="sec-intro" style={{ margin: '16px auto 0' }}>
              The same four steps run on every transaction — in milliseconds, before money moves.
            </p>
          </div>
          <DecisionEngine />
        </div>
      </section>

      {/* ── ICP segments ─────────────────────────────────── */}
      <section className="icp" id="usecases">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Built for your model</div>
            <h2 className="sec-title">
              Compliance tuned to how <em>you</em> move money.
            </h2>
            <p className="sec-intro">
              Generic AML tools treat every fintech the same. Fintegrity&apos;s rules and risk
              logic are shaped to the specific patterns — and specific abuse — of your business
              model.
            </p>
          </div>

          {/* Tab selector + panel — interactive, client component */}
          <IcpPanel />
        </div>
      </section>

      {/* ── Statement — full-bleed dark field, no card, one sentence ── */}
      <section className="statement">
        <div className="statement-inner reveal">
          <h2>We decide. Your system moves the money.</h2>
          <p>
            Fintegrity is the{' '}
            <span className="hl">compliance decision and evidence layer</span> — not a payment
            processor. When a transaction must be declined and reversed, Fintegrity says so and
            records why. Your rails execute it. That separation keeps you in control and keeps
            Fintegrity focused on one job: defensible compliance.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta" id="demo">
        <div className="wrap reveal">
          <div className="cta-card">
            <h2>Become a Fintegrity design partner.</h2>
            <p>
              We&apos;re working hands-on with a small group of Nigerian fintechs to shape the
              platform. Early access, direct influence on the roadmap, and regulator-ready
              infrastructure ahead of the curve.
            </p>
            <div className="cta-row">
              <Link
                className="btn btn-white"
                href="/book-a-demo"
                aria-label="Book a demo"
              >
                Book a demo →
              </Link>
              <Link
                className="btn btn-outline-w"
                href="/book-a-demo"
                aria-label="Talk to the founder"
              >
                Talk to the founder
              </Link>
            </div>
            <p className="cta-note">Design partnerships are free. Limited spots.</p>
          </div>
        </div>
      </section>
    </>
  )
}
