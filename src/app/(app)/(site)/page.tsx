import type { Metadata } from 'next'
import Link from 'next/link'
import OrganizationJsonLd from '@/components/json-ld/OrganizationJsonLd'
import HeroSwirl from '@/components/home/HeroSwirl'
import LiveStrip from '@/components/home/LiveStrip'
import DecisionTheatre from '@/components/home/DecisionTheatre'
import BusinessModelTabs from '@/components/home/BusinessModelTabs'
import styles from './page.module.css'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.getfintegrity.com' },
}

const WHY_NOW_CARDS = [
  {
    figure: 'BVN + NIN',
    title: 'Mandatory across tiers',
    body: "The CBN's 2024 directive made both mandatory, with limits enforced at every transaction.",
  },
  {
    figure: '₦5M / ₦10M',
    title: 'Reporting thresholds',
    body: 'NFIU currency transaction reports for individuals and corporates, filed within 7 days. Structuring to evade them is an offence.',
  },
  {
    figure: 'Real-time',
    title: 'The expected control',
    body: 'Regulatory direction is mandatory, automated AML/CFT monitoring — the layer Fintegrity provides.',
  },
]

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />

      {/* ── Hero — built to HERO-SPEC.md, fidelity: exact ───────────────
          Layer order: 1 ribbon swirl, 2 26px grid, 3 fractal-noise grain,
          4 content (relative). Layers 1-3 are decorative/pointer-events:none. */}
      <header className={styles.hero}>
        <HeroSwirl />
        <div className={styles.heroGrid} />
        <div className={styles.heroGrain} />

        <div className={`fg-container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrowPill}>
              <span className={styles.pulseDot} aria-hidden="true" />
              Built for CBN &amp; NFIU
            </span>

            <h1 className={styles.h1}>
              The compliance brain behind your money flows<span className={styles.greenStop}>.</span>
            </h1>

            <p className={styles.lede}>
              One call before money moves. A decision you can prove.
            </p>

            <div className={styles.heroCta}>
              <Link href="/demo" className={styles.heroBtnPrimary}>
                Book a demo <span aria-hidden="true">→</span>
              </Link>
              <a href="#how-it-works" className={styles.heroBtnSecondary}>
                Watch a decision
              </a>
            </div>
          </div>

          <LiveStrip />
        </div>
      </header>

      {/* ── Why now ──────────────────────────────────────────────────── */}
      <section className={styles.sectionBone}>
        <div className="fg-container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Why now</div>
            <h2 className={styles.h2}>Compliance in Nigeria just became non-negotiable.</h2>
            <p className={styles.sectionLede}>
              Enforcement moved from &ldquo;do you have a policy&rdquo; to &ldquo;prove every
              transaction was checked.&rdquo;
            </p>
          </div>

          <div className={styles.tintedGrid3}>
            {WHY_NOW_CARDS.map((c) => (
              <div key={c.title} className={styles.whyCard}>
                <div className={styles.whyFigure}>{c.figure}</div>
                <div className={styles.whyTitle}>{c.title}</div>
                <p className={styles.whyBody}>{c.body}</p>
              </div>
            ))}
          </div>

          <p className={styles.footnote}>
            Regulatory figures reflect current CBN / NFIU / MLPPA 2022 guidance and inform how
            Fintegrity is built. Not legal advice.{' '}
            <Link href="/solutions">See how this applies to your business model →</Link>
          </p>
        </div>
      </section>

      {/* ── Decide. Enforce. Prove. ──────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Decide. Enforce. Prove.</h2>
            <p className={styles.sectionLede}>Three capabilities, one API.</p>
          </div>

          <div className={styles.cardsGrid3}>
            <div className={styles.capabilityCard}>
              <div className={styles.kicker}>Decide</div>
              <h3 className={styles.cardTitle}>Real-time decision API</h3>
              <p className={styles.cardBody}>
                One synchronous call before money moves returns the decision, the reasons, and
                the action your system should take.
              </p>
              <div className={styles.cardFooter}>
                <span className={`${styles.statePill} ${styles.stateClear}`}>CLEAR</span>
                <span className={`${styles.statePill} ${styles.stateFlagged}`}>FLAGGED</span>
                <span className={`${styles.statePill} ${styles.stateHeld}`}>HELD</span>
                <span className={`${styles.statePill} ${styles.stateBlocked}`}>BLOCKED</span>
              </div>
            </div>

            <div className={styles.capabilityCard}>
              <div className={styles.kicker}>Enforce</div>
              <h3 className={styles.cardTitle}>One risk state per customer</h3>
              <p className={styles.cardBody}>
                KYC tiers, screening hits, and monitoring alerts converge into one authoritative,
                audited lifecycle.
              </p>
              <div className={styles.cardFooter}>
                <span className={`${styles.statePill} ${styles.stateClear}`}>ACTIVE</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
                <span className={`${styles.statePill} ${styles.stateFlagged}`}>UNDER_REVIEW</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
                <span className={`${styles.statePill} ${styles.stateBlocked}`}>BLOCKED</span>
              </div>
            </div>

            <div className={styles.capabilityCard}>
              <div className={styles.kicker}>Prove</div>
              <h3 className={styles.cardTitle}>Regulator-ready evidence</h3>
              <p className={styles.cardBody}>
                Every decision and state change is written to an append-only trail. A complete
                evidence pack, on demand.
              </p>
              <div className={styles.cardFooter}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12,2.5 20.5,7.25 20.5,16.75 12,21.5 3.5,16.75 3.5,7.25" />
                  <path d="M9 12l2.2 2.2L15 10" strokeLinecap="round" />
                </svg>
                <span className={`${styles.evidenceRef} fg-num`}>evd_b91f4a72c · append-only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Decision theatre ─────────────────────────────────────────── */}
      <section id="how-it-works" className={styles.sectionNavy}>
        <div className="fg-container">
          <div className={styles.sectionHead}>
            <h2 className={styles.h2navy}>See a decision happen.</h2>
            <p className={styles.sectionLedeNavy}>
              Pick a transaction. Watch the decision and the evidence it leaves.
            </p>
          </div>

          <DecisionTheatre />
        </div>
      </section>

      {/* ── Business-model tabs ──────────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Built for your model</div>
            <h2 className={styles.h2}>
              Compliance tuned to how <em className={styles.emGreen}>you</em> move money.
            </h2>
            <p className={styles.sectionLede}>
              Generic AML tools treat every fintech the same. Fintegrity&rsquo;s rules and risk
              logic are shaped to the specific patterns — and specific abuse — of your business
              model.
            </p>
          </div>

          <BusinessModelTabs />
        </div>
      </section>

      {/* ── Separation of duties + closing CTA ───────────────────────── */}
      <section className={styles.sectionBone}>
        <div className={`fg-container ${styles.diagramGrid}`}>
          <div>
            <h2 className={styles.h2sm}>We decide. Your system moves the money.</h2>
            <p className={styles.sectionLede}>
              Fintegrity is the compliance decision and evidence layer — not a payment processor.
              When a transaction must be declined and reversed, Fintegrity says so and records
              why. Your rails execute it. That separation keeps you in control and keeps
              Fintegrity focused on one job: defensible compliance.
            </p>
          </div>

          <div className={styles.stack}>
            <div className={styles.stackRow}>
              <span>Your product</span>
              <span className={`${styles.stackMeta} fg-num`}>initiates</span>
            </div>
            <div className={styles.chevron} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
            </div>
            <div className={styles.stackRowNavy}>
              <span className={styles.stackBrand}>
                <svg viewBox="0 0 96 96" width="17" height="17" aria-hidden="true">
                  <rect x="14" y="10" width="13" height="76" fill="#F7F3EC" />
                  <rect x="14" y="10" width="54" height="13" fill="#F7F3EC" />
                  <path d="M35 57L48 70L76 39" fill="none" stroke="#0E9F6E" strokeWidth="13" />
                </svg>
                Fintegrity
              </span>
              <span className={styles.stackMetaGreen}>
                <span className={styles.stackDot} aria-hidden="true" />
                decides · evidences
              </span>
            </div>
            <div className={styles.chevron} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
            </div>
            <div className={styles.stackRow}>
              <span>Your payment rails</span>
              <span className={`${styles.stackMeta} fg-num`}>execute</span>
            </div>
          </div>
        </div>

        <div className="fg-container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaWash} aria-hidden="true" />
            <div className={styles.ctaContent}>
              <h2 className={styles.h2sm}>Become a Fintegrity design partner.</h2>
              <p className={styles.sectionLede}>
                We&rsquo;re working hands-on with a small group of Nigerian fintechs to shape the
                platform. Early access, direct influence on the roadmap, and regulator-ready
                infrastructure ahead of the curve.
              </p>
              <div className={styles.ctaRow}>
                <Link href="/demo" className={styles.btnPrimary}>
                  Book a demo <span aria-hidden="true">→</span>
                </Link>
                <a href="mailto:contact@getfintegrity.com" className={styles.btnWhite}>
                  Talk to the founder
                </a>
              </div>
              <p className={styles.ctaNote}>Design partnerships are free. Limited spots.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
