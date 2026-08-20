import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/config'
import TrackedLink from '@/components/analytics/TrackedLink'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Fintegrity Technologies Limited builds embedded compliance infrastructure for regulated fintechs in Africa. Founded in Lagos, Nigeria. We don’t sell checks. We sell defensible compliance decisions.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'Building the compliance layer Nigerian fintechs deserve — Fintegrity',
    description: 'We don’t sell checks. We sell defensible compliance decisions.',
    url: `${SITE_URL}/about`,
  },
}

const POSITION_ROWS = [
  { label: 'Your product', meta: 'initiates' },
  { label: 'Your payment rails', meta: 'execute' },
  { label: 'Your KYC provider', meta: 'verifies' },
]

const PRINCIPLE_CARDS = [
  {
    title: 'Real-time, not batch',
    body: 'Decisions happen synchronously, before money moves. Not after the fact. Not in the next morning’s batch run.',
  },
  {
    title: 'Immutable evidence',
    body: 'Every decision, state change, and case action is written to an append-only store. The record cannot be altered.',
  },
  {
    title: 'Configurable to your model',
    body: 'Rules, thresholds, and patterns are tuned to your specific business model — not applied generically across all customers.',
  },
]

const NOT_ROWS = [
  { not: 'A KYC provider', but: 'The compliance layer that enforces what your KYC provider verified' },
  { not: 'A payment processor', but: 'The decision engine your payment rails act on' },
  { not: 'A screening data vendor', but: 'The orchestration layer that integrates your screening provider' },
  { not: 'Your MLRO', but: 'The tools your compliance team and MLRO use to do their job' },
  { not: 'A bank or fund holder', but: 'Infrastructure — we never touch money, only decisions about it' },
]

const VALUES = [
  {
    num: '01',
    title: 'Precision',
    body: 'Vague compliance is useless compliance. Every Fintegrity decision is reasoned, every evidence record is complete, and every rule is explicit. If it can’t be explained to a regulator, it shouldn’t exist.',
  },
  {
    num: '02',
    title: 'Defensibility',
    body: 'The test of good compliance isn’t the policy document. It’s whether you can defend every decision to a regulator, with evidence, on demand. We build systems that pass that test.',
  },
  {
    num: '03',
    title: 'Partnership',
    body: 'We’re building with a small group of Nigerian fintechs who share a specific kind of problem. Their product shapes our product. We don’t build for hypothetical customers.',
  },
  {
    num: '04',
    title: 'Transparency',
    body: 'No black boxes. Every rule that fires, every state that changes, and every decision that’s made is visible, auditable, and attributable. That’s what defensibility requires.',
  },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'About', href: '/about' }]} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true" />
        <div className={`fg-container ${styles.heroInner}`}>
          <div>
            <div className={styles.eyebrow}>About Fintegrity</div>
            <h1 className={styles.h1}>Building the compliance layer Nigerian fintechs deserve</h1>
            <p className={styles.quote}>&ldquo;We don&rsquo;t sell checks. We sell defensible compliance decisions.&rdquo;</p>
            <div className={styles.heroActions}>
              <Link href="/demo" className={styles.btnPrimary}>
                Become a design partner <span aria-hidden="true">→</span>
              </Link>
              <TrackedLink href={`mailto:${CONTACT_EMAIL}`} className={styles.btnWhite} event="Contact Link Clicked" eventProps={{ method: 'email', location: 'about-hero' }}>
                Email us
              </TrackedLink>
            </div>
          </div>

          <div className={styles.positionCard}>
            <div className={styles.positionKicker}>The Fintegrity position</div>
            <div className={styles.positionStack}>
              <div className={styles.positionRow}>
                <span className={styles.positionLabel}>{POSITION_ROWS[0].label}</span>
                <span className={`${styles.positionMeta} fg-num`}>{POSITION_ROWS[0].meta}</span>
              </div>
              <div className={styles.positionRowNavy}>
                <span className={styles.positionBrand}>
                  <svg viewBox="0 0 96 96" width="16" height="16" aria-hidden="true">
                    <rect x="14" y="10" width="13" height="76" fill="#F7F3EC" />
                    <rect x="14" y="10" width="54" height="13" fill="#F7F3EC" />
                    <path d="M35 57L48 70L76 39" fill="none" stroke="#0E9F6E" strokeWidth="13" />
                  </svg>
                  Fintegrity
                </span>
                <span className={styles.positionMetaGreen}>
                  <span className={styles.positionDot} aria-hidden="true" />
                  compliance layer
                </span>
              </div>
              <div className={styles.positionPair}>
                {POSITION_ROWS.slice(1).map((row) => (
                  <div key={row.label} className={styles.positionCell}>
                    <span className={styles.positionLabel}>{row.label}</span>
                    <span className={`${styles.positionMeta} fg-num`}>{row.meta}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className={styles.positionCaption}>
              Fintegrity decides. Your rails execute. Your compliance team investigates. Your
              regulator audits.
            </p>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────────────────── */}
      <section className={styles.sectionBone}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrow}>The problem</div>
            <h2 className={styles.h2}>Nigerian fintechs face a compliance infrastructure gap</h2>
            <blockquote className={styles.pullQuote}>
              <p>&ldquo;Compliance should be infrastructure, not overhead. Built into the money flow, not bolted on after.&rdquo;</p>
            </blockquote>
          </div>
          <div>
            <p className={styles.bodyP}>
              Nigeria&rsquo;s fintech ecosystem is growing faster than compliance infrastructure
              can keep up. The AML tools that exist were built for banks — large teams, slow
              transaction volumes, and months-long implementation timelines. They don&rsquo;t fit
              wallets, PSPs, or lenders processing millions of transactions a day with three
              people in compliance.
            </p>
            <p className={styles.bodyP}>
              The result is that most fintechs manage compliance with spreadsheets, email chains,
              manual reviews, and periodic batch runs. When a regulator asks for evidence that a
              transaction was properly reviewed before it processed, the answer is a reconstructed
              narrative — not a contemporaneous record.
            </p>
            <p className={styles.bodyP}>
              The CBN and NFIU have made clear that the direction of travel is toward automated,
              real-time, evidenced compliance. Fintegrity is that infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ── What we build ────────────────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.eyebrow}>What we build</div>
          <h2 className={`${styles.h2} ${styles.h2wide}`}>The compliance brain behind your money flows</h2>

          <div className={styles.buildCols}>
            <p className={styles.bodyP}>
              Fintegrity is the decision and evidence layer that sits between your product and
              your payment rails. Before money moves, we evaluate the transaction — against the
              customer&rsquo;s risk state, your configured rule library, and the patterns we know
              are relevant to your business model. We return a decision. You act on it.
            </p>
            <p className={styles.bodyP}>
              Every decision is evidenced. Every state change is immutable. Your compliance team
              gets structured cases, not alert floods. Your regulators get complete evidence
              packs on demand, not reconstructed spreadsheets.
            </p>
          </div>

          <div className={styles.tintedGrid3}>
            {PRINCIPLE_CARDS.map((card) => (
              <div key={card.title} className={styles.principleCard}>
                <h3 className={styles.principleTitle}>{card.title}</h3>
                <p className={styles.principleBody}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Boundaries (navy) ────────────────────────────────────────── */}
      <section className={styles.sectionNavy}>
        <div className="fg-container">
          <div className={styles.eyebrowNavy}>Boundaries</div>
          <h2 className={`${styles.h2navy} ${styles.h2wide}`}>Clear about what Fintegrity is not</h2>
          <p className={styles.ledeNavy}>
            Compliance products often blur their boundaries. Fintegrity doesn&rsquo;t. Being clear
            about what we are not makes it easier to understand what we are — and what your team
            remains responsible for.
          </p>

          <div className={styles.notList}>
            {NOT_ROWS.map((row) => (
              <div key={row.not} className={styles.notRow}>
                <div className={styles.notCell}>
                  <span className={styles.notX} aria-hidden="true">✗</span>
                  {row.not}
                </div>
                <div className={styles.notCellIs}>
                  <span className={styles.notCheck} aria-hidden="true">✓</span>
                  {row.but}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className={styles.sectionBone}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Our values</div>
          <h2 className={`${styles.h2} ${styles.h2wide}`}>Four principles that shape every product decision</h2>

          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.num} className={styles.valueCard}>
                <div className={styles.valueNum}>{v.num}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueBody}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design partner model ─────────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrow}>Design partner model</div>
            <h2 className={styles.h2}>We&rsquo;re building with a small cohort of Nigerian fintechs</h2>
          </div>
          <div>
            <p className={styles.bodyP}>
              Fintegrity is in active development with a small group of design partners —
              Nigerian fintechs who are building the platform with us, not just waiting for it.
              Design partners get early access, direct influence over the roadmap, and
              regulator-ready infrastructure built around their specific compliance challenges.
            </p>
            <p className={styles.bodyP}>
              Design partnerships are free. We&rsquo;re not building software for a fee —
              we&rsquo;re building the right product with the right partners.
            </p>
            <div className={styles.heroActions}>
              <Link href="/demo" className={styles.btnPrimary}>
                Apply to be a design partner <span aria-hidden="true">→</span>
              </Link>
              <TrackedLink href={`mailto:${CONTACT_EMAIL}`} className={styles.btnWhite} event="Contact Link Clicked" eventProps={{ method: 'email', location: 'about-design-partner' }}>
                Email the founder
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={`fg-container ${styles.ctaInner}`}>
          <h2 className={styles.ctaH2}>Questions about Fintegrity?</h2>
          <p className={styles.ctaLede}>
            We&rsquo;re a small team building in public with our design partners. If you have
            compliance infrastructure questions or want to explore a partnership, reach out.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/demo" className={styles.btnPrimary}>
              Book a conversation <span aria-hidden="true">→</span>
            </Link>
            <TrackedLink href={`mailto:${CONTACT_EMAIL}`} className={styles.btnWhite} event="Contact Link Clicked" eventProps={{ method: 'email', location: 'about-closing-cta' }}>
              Email us
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  )
}
