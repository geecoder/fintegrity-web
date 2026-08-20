import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/config'
import ScreeningDemo from '@/components/screening/ScreeningDemo'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Payment Screening',
  description:
    'Sender, beneficiary, bank code, intermediary and narration — every field of a payment screened against sanctions, PEP and your own lists before it settles.',
  alternates: { canonical: `${SITE_URL}/products/payment-screening` },
}

const FIELDS = [
  {
    name: 'Sender',
    title: 'Not just a name match',
    body: "Screens the payer's name and identifiers against sanctions and PEP lists, and flags spoofed or inconsistent originator details.",
  },
  {
    name: 'Beneficiary',
    title: 'Reads through transliteration',
    body: 'Matches beneficiary names, aliases and common transliterations — the step most screening tools skip.',
  },
  {
    name: 'Bank / BIC',
    title: 'Screens the institution too',
    body: "Checks the receiving bank's BIC and name against sanctioned-entity lists, not just the account holder.",
  },
  {
    name: 'Intermediary',
    title: 'Every hop in the chain',
    body: 'Screens every intermediary bank a payment passes through, catching sanctioned correspondents used to obscure the route.',
  },
  {
    name: 'Narration',
    title: 'Where the risk hides',
    body: 'Screens free-text reference and narration fields for geographic and keyword risk terms that name-only screening never reads.',
  },
]

const HOLD_CARDS = [
  {
    index: '01',
    title: 'How long a hold lasts',
    body: 'Held payments are reviewed same-day by default; the SLA is configurable per corridor and per list.',
  },
  {
    index: '02',
    title: 'Three dispositions',
    body: 'An analyst releases, rejects or escalates every held payment — there is no fourth option.',
  },
  {
    index: '03',
    title: 'What gets recorded',
    body: 'The analyst, the reason, the timestamp and the evidence considered are written to the case.',
  },
  {
    index: '04',
    title: 'Who can act',
    body: 'Disposition is restricted by role; escalation routes to a senior reviewer automatically.',
  },
]

const LIST_ROWS = [
  { name: 'UN Consolidated', tag: 'sanctions' },
  { name: 'OFAC SDN & Consolidated', tag: 'sanctions' },
  { name: 'EU sanctions list', tag: 'sanctions' },
  { name: 'UK HM Treasury', tag: 'sanctions' },
  { name: 'Nigeria Sanctions List', tag: 'domestic' },
  { name: 'PEP data', tag: 'risk' },
  { name: 'Adverse media', tag: 'risk' },
]

export default function PaymentScreeningPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true">
          <div className={styles.washBlob1} />
          <div className={styles.washBlob2} />
          <div className={styles.washGrid} />
        </div>

        <div className={`fg-container ${styles.heroInner}`}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrow}>Payment Screening</span>
            <span className={styles.liveChip}>Live</span>
          </div>

          <h1 className={styles.h1}>Screening that reads the whole payment, not just the name.</h1>

          <p className={styles.lede}>
            Sender, beneficiary, bank code, intermediary and narration — checked against
            sanctions, PEP and adverse media, plus your own lists, before the payment settles.
          </p>

          <div className={styles.heroCta}>
            <Link href="/demo" className={styles.btnPrimary}>
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <a href="#demo" className={styles.btnSecondary}>
              See it screen a payment
            </a>
          </div>

          <div className={styles.statStrip}>
            <div className={styles.statCell}>
              <div className={styles.statFigure}>5 fields</div>
              <div className={styles.statCaption}>screened per payment — not just sender and beneficiary</div>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statCell}>
              <div className={styles.statFigure}>Sub-second</div>
              <div className={styles.statCaption}>screening completes inside the authorisation path</div>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statCell}>
              <div className={styles.statFigure}>Lists + yours</div>
              <div className={styles.statCaption}>global sanctions and PEP data plus your own blocklists</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Field-level screening + live demo (the one navy theatre) ──── */}
      <section id="fields" className={styles.sectionNavy}>
        <div className="fg-container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrowNavy}>Field-level screening</div>
            <h2 className={styles.h2navy}>Risk hides in the fields nobody screens.</h2>
            <p className={styles.sectionLedeNavy}>
              Most tools screen the sender and beneficiary name and stop. Fintegrity screens all
              five fields a payment carries.
            </p>
          </div>

          <div className={styles.fieldsList}>
            {FIELDS.map((f) => (
              <div key={f.name} className={styles.fieldRow}>
                <span className={styles.fieldName}>{f.name}</span>
                <div>
                  <h3 className={styles.fieldTitle}>{f.title}</h3>
                  <p className={styles.fieldBody}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div id="demo" className={styles.demoBlock}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrowNavy}>Live screening</div>
              <h2 className={styles.h2navy}>Pick a payment. Watch every field get screened.</h2>
              <p className={styles.sectionLedeNavy}>
                The score, the hit, the matched field and the action all change together — watch
                what happens when only the narration triggers a hold.
              </p>
            </div>

            <ScreeningDemo />
          </div>
        </div>
      </section>

      {/* ── Hold and review ──────────────────────────────────────────── */}
      <section id="hold" className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Hold and review</div>
          <h2 className={styles.h2}>A held payment is a customer waiting.</h2>

          <div className={styles.holdGrid}>
            {HOLD_CARDS.map((c) => (
              <div key={c.index} className={styles.holdCard}>
                <div className={styles.holdIndex}>{c.index}</div>
                <h3 className={styles.holdTitle}>{c.title}</h3>
                <p className={styles.holdBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage and thresholds ──────────────────────────────────── */}
      <section id="lists" className={styles.sectionBone}>
        <div className={`fg-container ${styles.listsGrid}`}>
          <div>
            <div className={styles.eyebrow}>Lists and thresholds</div>
            <h2 className={styles.h2}>Your screening policy, your thresholds.</h2>
            <p className={styles.listsLede}>
              Tune sensitivity per list and per field. Keep your own blocklists beside the global
              ones. Every configuration change is recorded with the user, the timestamp and the
              version it replaced.
            </p>
            <ul className={styles.bulletList}>
              <li className={styles.bullet}>
                <span className={styles.bulletDot} aria-hidden="true">·</span>
                Nigerian name variants and transliterations handled by default
              </li>
              <li className={styles.bullet}>
                <span className={styles.bulletDot} aria-hidden="true">·</span>
                Client-managed blocklists, editable without an engineering release
              </li>
              <li className={styles.bullet}>
                <span className={styles.bulletDot} aria-hidden="true">·</span>
                Per-field thresholds, so narration noise doesn&rsquo;t hold real payments
              </li>
            </ul>
          </div>

          <div className={styles.coverageCard}>
            <div className={styles.coverageHead}>
              <span className={styles.coverageTitle}>List coverage</span>
              <span className={styles.coverageSynced}>
                <span className={styles.coverageDot} aria-hidden="true" />
                synced <span className="fg-num">14:37 WAT</span>
              </span>
            </div>
            <div className={styles.coverageBody}>
              {LIST_ROWS.map((row) => (
                <div key={row.name} className={styles.coverageRow}>
                  <span className={styles.coverageName}>{row.name}</span>
                  <span className={styles.coverageTag}>{row.tag}</span>
                </div>
              ))}
              <div className={styles.coverageRowOwn}>
                <span className={styles.coverageNameOwn}>Your internal blocklist</span>
                <span className={styles.coverageTagOwn}>self-serve</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.ctaCard}>
            <div>
              <h2 className={styles.h2sm}>Screening and monitoring, one risk profile.</h2>
              <p className={styles.ctaBody}>
                Payment Screening and Transaction Monitoring share the same customer risk state
                and the same evidence trail. One integration, one audit story.
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <Link href="/demo" className={styles.btnPrimary}>
                Book a demo <span aria-hidden="true">→</span>
              </Link>
              <Link href="/products/transaction-monitoring" className={styles.btnWhite}>
                Transaction Monitoring
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
