import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ModelSwitcher from '@/components/solutions/ModelSwitcher'
import { SITE_URL } from '@/lib/config'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Same API, six threat models. See the characteristic abuse patterns and the specific rules Fintegrity applies for digital wallets, fintechs and digital banks, PSPs, remittance, banks and microfinance, and crypto platforms.',
  alternates: { canonical: `${SITE_URL}/solutions` },
  openGraph: {
    title: 'Same API. Six very different threat models. — Fintegrity',
    description: 'Pick your model. See the rules that fire.',
    url: `${SITE_URL}/solutions`,
  },
}

export default function SolutionsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Solutions', href: '/solutions' }]} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true">
          <svg viewBox="0 0 900 700" preserveAspectRatio="xMidYMid slice" className={styles.heroSvg} aria-hidden="true">
            <defs>
              <linearGradient id="solA" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#0E9F6E" />
                <stop offset="100%" stopColor="#7FE3C8" />
              </linearGradient>
              <linearGradient id="solB" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#2FA5B8" />
                <stop offset="100%" stopColor="#8FB4FF" />
              </linearGradient>
              <linearGradient id="solC" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#F0A93C" />
                <stop offset="100%" stopColor="#FFE49B" />
              </linearGradient>
            </defs>
            <g className={styles.driftA}>
              <path d="M-80 620 C 200 520 260 300 520 210 C 700 148 800 100 940 30" fill="none" stroke="url(#solA)" strokeWidth="70" strokeLinecap="round" opacity=".9" />
            </g>
            <g className={styles.driftB}>
              <path d="M-100 720 C 240 620 320 400 600 320 C 760 274 860 210 980 150" fill="none" stroke="url(#solB)" strokeWidth="46" strokeLinecap="round" opacity=".85" />
            </g>
            <g className={styles.driftC}>
              <path d="M-40 500 C 220 420 300 220 540 120 C 680 62 800 40 940 -30" fill="none" stroke="url(#solC)" strokeWidth="30" strokeLinecap="round" opacity=".8" />
            </g>
          </svg>
        </div>

        <div className={`fg-container ${styles.heroInner}`}>
          <div className={styles.eyebrow}>Use cases</div>
          <h1 className={styles.h1}>Same API. Six very different threat models.</h1>
          <p className={styles.lede}>Pick your model. See the rules that fire.</p>
        </div>
      </section>

      {/* ── Switcher ─────────────────────────────────────────────────── */}
      <section className={styles.switcherSection}>
        <div className="fg-container">
          <ModelSwitcher />
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={`fg-container ${styles.ctaInner}`}>
          <h2 className={styles.ctaH2}>Your model, your rules — configured with you.</h2>
          <div className={styles.ctaActions}>
            <Link href="/demo" className={styles.btnPrimary}>
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products/transaction-monitoring" className={styles.btnWhite}>
              See the rule library
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
