import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/config'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Security',
  description:
    'A plain-language overview of how Fintegrity protects the data that runs through our platform — encryption, access control, infrastructure, and our immutable evidence trail.',
  alternates: { canonical: `${SITE_URL}/security` },
}

const PRACTICES = [
  {
    title: 'Encrypted in transit and at rest',
    body: 'All traffic to and from our platform is encrypted using industry-standard TLS. Stored data is encrypted at rest using our infrastructure provider’s encryption capabilities.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="10.5" width="16" height="10" rx="1.5" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
  {
    title: 'Role-based access, MFA enforced',
    body: 'Access to production systems and customer data is restricted by role and limited to what each person needs to do their job. Multi-factor authentication is required for administrative access, and access to customer data is logged.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="8" r="3.4" />
        <path d="M4 20c0-3.2 2.7-5.4 6-5.4 1.2 0 2.3.3 3.2.8" />
        <path d="M15 17.5l2 2 3.5-4" />
      </svg>
    ),
  },
  {
    title: 'Established cloud infrastructure',
    body: 'Fintegrity runs on established cloud infrastructure, with physical and network security managed by our hosting provider. We walk prospective Clients through our specific hosting and data-residency setup directly, as part of due diligence.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 8.5C4 6.6 7.6 5 12 5s8 1.6 8 3.5v7C20 17.4 16.4 19 12 19s-8-1.6-8-3.5Z" />
        <path d="M4 12c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5" />
      </svg>
    ),
  },
  {
    title: 'Immutable evidence trail',
    body: 'Every decision and state change our platform produces is written to an append-only audit trail — the same evidence architecture we build for our Clients’ compliance teams applies to how we run the business.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12,2.5 20.5,7.25 20.5,16.75 12,21.5 3.5,16.75 3.5,7.25" />
        <path d="M9 12l2.2 2.2L15 10" strokeLinecap="round" />
      </svg>
    ),
  },
]

const EVIDENCE_CHAIN = ['evd_b91f4a72c', 'evd_c04a7f1e8', 'evd_d5b30c9a2']

const ROADMAP_POINTS = [
  'We are aligning our security practices with ISO/IEC 27001 controls.',
  'Formal third-party certification is on our roadmap — it has not been achieved yet.',
  'We’ll update this page the moment that status changes.',
]

export default function SecurityPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Security', href: '/security' }]} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true">
          <svg viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" className={styles.heroSvg} aria-hidden="true">
            <defs>
              <linearGradient id="secA" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#0A1F44" />
                <stop offset="60%" stopColor="#2FA5B8" />
                <stop offset="100%" stopColor="#7FE3C8" />
              </linearGradient>
              <linearGradient id="secB" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#0E9F6E" />
                <stop offset="100%" stopColor="#3DDCA0" />
              </linearGradient>
            </defs>
            <g className={styles.drift}>
              <path d="M-60 620 C 200 540 240 300 480 200 C 640 134 740 90 860 20" fill="none" stroke="url(#secA)" strokeWidth="64" strokeLinecap="round" opacity=".82" />
              <path d="M-90 720 C 220 640 300 420 560 330 C 700 282 800 220 900 160" fill="none" stroke="url(#secB)" strokeWidth="34" strokeLinecap="round" opacity=".7" />
            </g>
          </svg>
        </div>

        <div className={`fg-container ${styles.heroInner}`}>
          <div className={styles.eyebrow}>Trust</div>
          <h1 className={styles.h1}>Security at Fintegrity</h1>
          <p className={styles.lede}>
            A plain-language overview of how we protect the data that runs through our platform.
            This page is a summary for anyone evaluating Fintegrity — Clients under contract
            receive fuller technical and security detail as part of due diligence.
          </p>
        </div>
      </section>

      {/* ── Practices ────────────────────────────────────────────────── */}
      <section className={styles.sectionBone}>
        <div className="fg-container">
          <h2 className={styles.h2}>Security built into how we operate</h2>
          <p className={styles.sectionLede}>These are the practices we apply across our platform and infrastructure today.</p>

          <div className={styles.practicesGrid}>
            {PRACTICES.map((p) => (
              <div key={p.title} className={styles.practiceCard}>
                {p.icon}
                <h3 className={styles.practiceTitle}>{p.title}</h3>
                <p className={styles.practiceBody}>{p.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.chainStrip}>
            <span className={styles.chainLabel}>Evidence chain</span>
            {EVIDENCE_CHAIN.map((id, i) => (
              <span key={id} className={styles.chainItemWrap}>
                {i > 0 && <span className={styles.chainArrow} aria-hidden="true">→</span>}
                <span className={`${styles.chainItem} fg-num`}>{id}</span>
              </span>
            ))}
            <span className={styles.chainNote}>append-only &middot; no edits</span>
          </div>
        </div>
      </section>

      {/* ── Compliance roadmap ───────────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrow}>Compliance roadmap</div>
            <h2 className={styles.h2sm}>Working toward ISO 27001 alignment</h2>
            <p className={styles.roadmapCaption}>This describes a roadmap intent, not a certification claim.</p>
          </div>
          <div className={styles.roadmapCard}>
            <div className={styles.roadmapHead}>
              <span className={styles.roadmapStatus}>ISO/IEC 27001 — not yet certified</span>
            </div>
            <div className={styles.roadmapList}>
              {ROADMAP_POINTS.map((point) => (
                <div key={point} className={styles.roadmapRow}>
                  <span aria-hidden="true">&#183;</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Responsible disclosure (navy) ────────────────────────────── */}
      <section className={styles.sectionNavy}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrowNavy}>Responsible disclosure</div>
            <h2 className={styles.h2navy}>Found a vulnerability?</h2>
          </div>
          <div>
            <p className={styles.disclosureBody}>
              If you believe you&rsquo;ve found a security issue in our platform or website, tell
              us before telling anyone else. Email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.disclosureLink}>
                {CONTACT_EMAIL}
              </a>{' '}
              with what you found and how to reproduce it, and give us a reasonable window to
              investigate and fix it before any public disclosure. Please don&rsquo;t access,
              modify, or exfiltrate data that isn&rsquo;t yours while testing.
            </p>
            <div className={styles.disclosureActions}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.btnBone}>
                Report an issue <span aria-hidden="true">→</span>
              </a>
              <Link href="/demo" className={styles.btnGhost}>
                Security review request
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={`fg-container ${styles.ctaInner}`}>
          <h2 className={styles.ctaH2}>Questions about our security practices?</h2>
          <p className={styles.ctaLede}>
            If you&rsquo;re evaluating Fintegrity as a Client and need more detail than this page
            covers, we&rsquo;re happy to walk through it directly.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/demo" className={styles.btnPrimary}>
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.btnWhite}>
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
