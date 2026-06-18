import { Link } from 'react-router-dom'
import { BOOKING_URL } from '../config/site'

export default function Nav() {
  return (
    <nav>
      <div className="wrap nav-in">
        <Link className="brand" to="/">
          <img src="/fintegrity_wm_indigo_mono.png" alt="Fintegrity Technology Limited" className="brand-logo" />
        </Link>
        <div className="nav-links">
          <a href="/#why">Why now</a>
          <a href="/#product">Product</a>
          <a href="/#usecases">Use cases</a>

          {/* TODO: re-enable Resources page — temporarily disabled */}
          {/*
          <div className="nav-dropdown" ref={dropRef}>
            <button
              className={`nav-dropdown-trigger${resActive ? ' nav-link-active' : ''}`}
              onClick={onRes}
              aria-expanded={resOpen}
              aria-haspopup="menu"
            >
              Resources
              <svg
                width="10" height="6" viewBox="0 0 10 6" fill="none"
                style={{ transition: 'transform .15s', transform: resOpen ? 'rotate(180deg)' : 'none' }}
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {resOpen && (
              <div className="nav-dropdown-menu" role="menu">
                <Link
                  to="/resources/cbn-aml-baseline-standards"
                  role="menuitem"
                  onClick={closeRes}
                >
                  <span className="ddm-label">CBN AML/CFT Baseline Standards</span>
                  <span className="ddm-sub">The 12 standards explained</span>
                </Link>
              </div>
            )}
          </div>
          */}

          {/* TODO: re-enable About page — temporarily disabled */}
          {/* <Link to="/about" className={aboutActive ? 'nav-link-active' : ''}>About</Link> */}

          <a
            className="btn btn-primary"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a product demo"
          >
            Request a demo
          </a>
        </div>
      </div>
    </nav>
  )
}
