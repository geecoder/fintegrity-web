'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackMarketingEvent } from '@/lib/analytics'
import { API_DOCS_URL } from '@/lib/config'

const PRODUCT_LINKS = [
  { href: '/transaction-monitoring', label: 'Transaction Monitoring', desc: 'Real-time AML rule evaluation' },
  { href: '/case-management', label: 'Case Management', desc: 'Investigation and evidence workflows' },
  { href: '/compliance-decisioning-api', label: 'Compliance Decision API', desc: 'CLEAR / FLAGGED / HELD_FOR_REVIEW / BLOCKED in one call' },
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

  // Lock body scroll while mobile menu is open to prevent page scrolling behind the overlay.
  // The `nav-open` class on body is a CSS hook; the direct style assignment handles iOS Safari
  // which ignores overflow:hidden on body when the viewport has already been scrolled.
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY
      document.body.classList.add('nav-open')
      document.body.style.top = `-${scrollY}px`
    } else {
      const scrollY = parseFloat(document.body.style.top || '0') * -1
      document.body.classList.remove('nav-open')
      document.body.style.top = ''
      // Restore scroll position that was locked
      if (scrollY) window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior })
    }
    return () => {
      document.body.classList.remove('nav-open')
      document.body.style.top = ''
    }
  }, [mobileOpen])

  const toggleDrop = (key: 'product' | 'solutions') =>
    setOpenDrop((prev) => (prev === key ? null : key))

  return (
    <nav ref={navRef}>
      <div className="wrap nav-in">
        {/* Brand */}
        <Link className="brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/lockup-color.svg"
            alt="Fintegrity Technologies Limited"
            className="brand-logo"
            width={580}
            height={88}
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
              <a
                href={API_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-menu-all"
                role="menuitem"
                onClick={() => trackMarketingEvent('API Documentation CTA Clicked', { location: 'nav-menu' })}
              >
                Developer API docs →
              </a>
            </div>
          </div>

          {/* Solutions dropdown */}
          <div className="nav-item">
            <button
              className={`nav-drop-btn${openDrop === 'solutions' ? ' open' : ''}`}
              aria-expanded={openDrop === 'solutions'}
              aria-haspopup="menu"
              aria-label="Use cases menu"
              onClick={() => toggleDrop('solutions')}
            >
              Use cases <ChevronDown />
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

          <Link
            href="/book-a-demo"
            className="btn btn-primary"
            onClick={() => trackMarketingEvent('Primary CTA Clicked', { page: pathname, location: 'nav' })}
          >
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
          <span className="nav-mobile-label">Use cases</span>
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
          <Link href="/security" className="nav-mobile-link">Security</Link>
          <Link href="/contact" className="nav-mobile-link">Contact</Link>
        </div>
        <div className="nav-mobile-cta">
          <Link
            href="/book-a-demo"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => trackMarketingEvent('Primary CTA Clicked', { page: pathname, location: 'nav-mobile' })}
          >
            Book a demo →
          </Link>
        </div>
      </div>
    </nav>
  )
}
