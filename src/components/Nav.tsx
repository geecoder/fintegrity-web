'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BOOKING_URL } from '@/lib/config'

const PRODUCT_LINKS = [
  { href: '/transaction-monitoring', label: 'Transaction Monitoring', desc: 'Real-time AML rule evaluation' },
  { href: '/case-management', label: 'Case Management', desc: 'Investigation and evidence workflows' },
  { href: '/compliance-decisioning-api', label: 'Compliance Decision API', desc: 'ALLOW / REVIEW / BLOCK in one call' },
  { href: '/transaction-screening', label: 'Transaction Screening', desc: 'Sanctions, PEP, and watchlist checks' },
  { href: '/rules-engine', label: 'Rules Engine', desc: 'Configurable compliance logic' },
  { href: '/customer-risk-profiling', label: 'Customer Risk Profiling', desc: 'Dynamic risk scoring per customer' },
]

const SOLUTION_LINKS = [
  { href: '/solutions/digital-wallets', label: 'Digital Wallets & Super Apps' },
  { href: '/solutions/fintechs', label: 'Fintechs & Digital Banks' },
  { href: '/solutions/payment-service-providers', label: 'Payment Service Providers & Processors' },
  { href: '/solutions/remittance-companies', label: 'Remittance & Cross-Border Payments' },
  { href: '/solutions/banks', label: 'Banks & Microfinance Institutions' },
  { href: '/solutions/crypto-businesses', label: 'Crypto & Digital Asset Platforms' },
]

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const pathname = usePathname() ?? ''
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState<'product' | 'solutions' | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenDrop(null)
  }, [pathname])

  // Close dropdowns on outside click
  const handleOutside = useCallback((e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setOpenDrop(null)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [handleOutside])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenDrop(null); setMobileOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Close mobile menu when viewport grows above 1024px (tablet rotation to landscape)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    const handler = (e: MediaQueryListEvent) => { if (e.matches) { setMobileOpen(false); setOpenDrop(null) } }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleDrop = (key: 'product' | 'solutions') =>
    setOpenDrop((prev) => (prev === key ? null : key))

  return (
    <nav ref={navRef}>
      <div className="wrap nav-in">
        {/* Brand */}
        <Link className="brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fintegrity_wm_indigo_mono.png"
            alt="Fintegrity Technologies Limited"
            className="brand-logo"
            width={180}
            height={36}
          />
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {/* Product dropdown */}
          <div className="nav-item">
            <button
              className={`nav-drop-btn${openDrop === 'product' ? ' open' : ''}`}
              aria-expanded={openDrop === 'product'}
              aria-haspopup="menu"
              onClick={() => toggleDrop('product')}
            >
              Product <ChevronDown />
            </button>
            <div className={`nav-drop-menu${openDrop === 'product' ? ' open' : ''}`} role="menu">
              {PRODUCT_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="nav-menu-item" role="menuitem">
                  <span className="nav-menu-item-label">{l.label}</span>
                  <span className="nav-menu-item-desc">{l.desc}</span>
                </Link>
              ))}
              <div className="nav-menu-divider" />
              <Link href="/developer-api" className="nav-menu-all" role="menuitem">
                Developer API docs →
              </Link>
            </div>
          </div>

          {/* Solutions dropdown */}
          <div className="nav-item">
            <button
              className={`nav-drop-btn${openDrop === 'solutions' ? ' open' : ''}`}
              aria-expanded={openDrop === 'solutions'}
              aria-haspopup="menu"
              aria-label="Industries menu"
              onClick={() => toggleDrop('solutions')}
            >
              Industries <ChevronDown />
            </button>
            <div className={`nav-drop-menu${openDrop === 'solutions' ? ' open' : ''}`} role="menu">
              {SOLUTION_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="nav-menu-item" role="menuitem">
                  <span className="nav-menu-item-label">{l.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/blog" className={pathname.startsWith('/blog') ? 'nav-link-active' : ''}>
            Blog
          </Link>
          <Link href="/pricing" className={pathname === '/pricing' ? 'nav-link-active' : ''}>
            Pricing
          </Link>
          <Link href="/about" className={pathname === '/about' ? 'nav-link-active' : ''}>
            About
          </Link>

          <Link href="/book-a-demo" className="btn btn-primary">
            Book a demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile overlay */}
      <div className={`nav-mobile-overlay${mobileOpen ? ' open' : ''}`} role="dialog" aria-label="Navigation menu">
        <div className="nav-mobile-section">
          <span className="nav-mobile-label">Product</span>
          {PRODUCT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-mobile-link">
              {l.label}
              <span className="nav-mobile-sub">{l.desc}</span>
            </Link>
          ))}
        </div>
        <div className="nav-mobile-section">
          <span className="nav-mobile-label">Industries</span>
          {SOLUTION_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-mobile-link">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-mobile-section">
          <span className="nav-mobile-label">Company</span>
          <Link href="/blog" className="nav-mobile-link">Blog</Link>
          <Link href="/pricing" className="nav-mobile-link">Pricing</Link>
          <Link href="/about" className="nav-mobile-link">About</Link>
          <Link href="/contact" className="nav-mobile-link">Contact</Link>
        </div>
        <div className="nav-mobile-cta">
          <Link href="/book-a-demo" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Book a demo →
          </Link>
        </div>
      </div>
    </nav>
  )
}
