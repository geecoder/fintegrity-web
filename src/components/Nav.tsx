'use client'

import { useState, useRef, useEffect, useCallback, useId, type ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DEVELOPER_DOCS_URL } from '@/lib/config'
import styles from './Nav.module.css'

type Product = {
  key: string
  href: string
  label: string
  desc: string
  status: 'live' | 'soon'
  icon: ReactElement
}

const PRODUCTS: Product[] = [
  {
    key: 'tm',
    href: '/products/transaction-monitoring',
    label: 'Transaction Monitoring',
    desc: 'Real-time AML decisions, cases and evidence before money moves',
    status: 'live',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0E9F6E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
      </svg>
    ),
  },
  {
    key: 'ps',
    href: '/products/payment-screening',
    label: 'Payment Screening',
    desc: 'Sanctions, PEP and watchlist checks on every payment field',
    status: 'live',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0E9F6E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7.5 3v5.5c0 4.3-3.1 7.9-7.5 9-4.4-1.1-7.5-4.7-7.5-9V6Z" />
        <path d="M9.2 12l2 2 3.6-4" />
      </svg>
    ),
  },
  {
    key: 'clm',
    href: '/products/customer-lifecycle',
    label: 'Customer Lifecycle',
    desc: 'Profiling, screening, identity and address verification',
    status: 'soon',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#B48A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="8" r="3.4" />
        <path d="M4 20c0-3.2 2.7-5.4 6-5.4 1.2 0 2.3.3 3.2.8" />
        <path d="M15 17.5l2 2 3.5-4" />
      </svg>
    ),
  },
]

const USE_CASES: { index: string; label: string; hash: string }[] = [
  { index: '01', label: 'Digital Wallets & Super Apps', hash: 'wallets' },
  { index: '02', label: 'Fintechs & Digital Banks', hash: 'fintechs' },
  { index: '03', label: 'Payment Service Providers', hash: 'psps' },
  { index: '04', label: 'Remittance & Cross-Border', hash: 'remittance' },
  { index: '05', label: 'Banks & Microfinance', hash: 'banks' },
  { index: '06', label: 'Crypto & Digital Assets', hash: 'crypto' },
]

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" style={{ opacity: 0.5 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.5c.6-1 1.8-1.8 3.5-1.8 2.7 0 4.2 1.7 4.2 5v6.3h-4v-5.7c0-1.5-.6-2.4-1.9-2.4-1.2 0-1.9.8-1.9 2.4v5.7h-4v-11Z" />
    </svg>
  )
}

export default function Nav() {
  const pathname = usePathname() ?? ''
  const [menu, setMenu] = useState<'product' | 'use' | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const productMenuId = useId()
  const useMenuId = useId()

  const isProductActive = pathname.startsWith('/products')
  const isUseActive = pathname.startsWith('/solutions')
  const isPricingActive = pathname === '/pricing'
  const isBlogActive = pathname.startsWith('/blog')
  const isAboutActive = pathname === '/about'

  // Close everything on route change.
  useEffect(() => {
    setMenu(null)
    setMobileOpen(false)
  }, [pathname])

  // Close mega-menu on mouseleave of the whole header.
  const closeAll = useCallback(() => setMenu(null), [])

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Close mega-menu on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenu(null)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Mobile drawer: lock body scroll + trap focus while open.
  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const drawer = drawerRef.current
    const focusable = drawer?.querySelectorAll<HTMLElement>('a, button')
    focusable?.[0]?.focus()

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onTab)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onTab)
    }
  }, [mobileOpen])

  const activeStyle = (active: boolean) =>
    active
      ? { color: 'var(--fg-navy)', boxShadow: 'inset 0 -2px 0 var(--fg-green)' }
      : undefined

  return (
    <div className={styles.headerWrap} ref={headerRef} onMouseLeave={closeAll}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="Fintegrity home">
            <svg viewBox="0 0 96 96" width="22" height="22" role="img" aria-hidden="true" className={styles.mark}>
              <rect x="14" y="10" width="13" height="76" fill="#0A1F44" />
              <rect x="14" y="10" width="54" height="13" fill="#0A1F44" />
              <path d="M35 57L48 70L76 39" fill="none" stroke="#0E9F6E" strokeWidth="13" />
            </svg>
            <span className={styles.wordmark}>
              Fintegrity<span className={styles.brandDot}>.</span>
            </span>
          </Link>

          <nav className={styles.navLinks} aria-label="Primary">
            <div className={styles.navItem} onMouseEnter={() => setMenu('product')}>
              <button
                type="button"
                className={styles.navButton}
                style={activeStyle(isProductActive)}
                aria-expanded={menu === 'product'}
                aria-controls={productMenuId}
                onClick={() => setMenu((m) => (m === 'product' ? null : 'product'))}
              >
                Product <Chevron />
              </button>
              {menu === 'product' && (
                <div id={productMenuId} className={styles.megaMenu} style={{ width: 'min(760px, calc(100vw - 32px))' }}>
                  <div className={styles.productGrid}>
                    {PRODUCTS.map((p) => {
                      const isCurrent = pathname === p.href || pathname.startsWith(p.href + '/')
                      return (
                        <Link
                          key={p.key}
                          href={p.href}
                          className={styles.productCard}
                          style={{ background: isCurrent ? 'var(--fg-bone)' : 'transparent' }}
                        >
                          {p.icon}
                          <span className={styles.productLabelRow}>
                            {p.label}
                            {p.status === 'soon' && <span className={styles.soonChip}>Soon</span>}
                          </span>
                          <span className={styles.productDesc}>{p.desc}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.navItem} onMouseEnter={() => setMenu('use')}>
              <button
                type="button"
                className={styles.navButton}
                style={activeStyle(isUseActive)}
                aria-expanded={menu === 'use'}
                aria-controls={useMenuId}
                aria-label="Use cases menu"
                onClick={() => setMenu((m) => (m === 'use' ? null : 'use'))}
              >
                Use cases <Chevron />
              </button>
              {menu === 'use' && (
                <div id={useMenuId} className={styles.megaMenu} style={{ width: 'min(700px, calc(100vw - 32px))' }}>
                  <div className={styles.useKicker}>By business model</div>
                  <div className={styles.useGrid}>
                    {USE_CASES.map((u) => (
                      <Link key={u.hash} href={`/solutions#${u.hash}`} className={styles.useRow}>
                        <span>{u.label}</span>
                        <span className={styles.useIndex}>{u.index}</span>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.useFooter}>
                    <span>Rules and risk logic are tuned per business model.</span>
                    <Link href="/solutions">Compare models →</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/pricing" className={styles.navLink} style={activeStyle(isPricingActive)} onMouseEnter={closeAll}>
              Pricing
            </Link>
            <a
              href={DEVELOPER_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
              onMouseEnter={closeAll}
            >
              Developer
            </a>
            <Link href="/blog" className={styles.navLink} style={activeStyle(isBlogActive)} onMouseEnter={closeAll}>
              Blog
            </Link>
            <Link href="/about" className={styles.navLink} style={activeStyle(isAboutActive)} onMouseEnter={closeAll}>
              About
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/demo" className={styles.cta}>
              Book a demo <span aria-hidden="true">→</span>
            </Link>
          </div>

          <button
            type="button"
            className={styles.hamburger}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className={styles.drawerScrim} role="presentation">
          <div
            ref={drawerRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.drawerSection}>
              <span className={styles.drawerLabel}>Product</span>
              {PRODUCTS.map((p) => (
                <Link key={p.key} href={p.href} className={styles.drawerLink}>
                  {p.label}
                  {p.status === 'soon' && <span className={styles.soonChip}>Soon</span>}
                </Link>
              ))}
            </div>
            <div className={styles.drawerSection}>
              <span className={styles.drawerLabel}>Use cases</span>
              {USE_CASES.map((u) => (
                <Link key={u.hash} href={`/solutions#${u.hash}`} className={styles.drawerLink}>
                  {u.label}
                </Link>
              ))}
            </div>
            <div className={styles.drawerSection}>
              <Link href="/pricing" className={styles.drawerLink}>Pricing</Link>
              <a href={DEVELOPER_DOCS_URL} target="_blank" rel="noopener noreferrer" className={styles.drawerLink}>Developer ↗</a>
              <Link href="/blog" className={styles.drawerLink}>Blog</Link>
              <Link href="/about" className={styles.drawerLink}>About</Link>
            </div>
            <div className={styles.drawerCta}>
              <Link href="/demo" className={styles.cta} style={{ width: '100%', justifyContent: 'center' }}>
                Book a demo <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://www.linkedin.com/company/getfintegrity/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fintegrity on LinkedIn"
                className={styles.drawerSocial}
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
