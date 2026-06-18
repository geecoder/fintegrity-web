import { Link } from 'react-router-dom'
import { BOOKING_URL } from '../config/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="wrap foot-in">
        <Link className="brand" to="/">
          <img src="/fintegrity_wm_indigo_mono.png" alt="Fintegrity Technology Limited" className="brand-logo" />
        </Link>
        <p>Embedded compliance decisioning for African fintechs.</p>
        <div className="foot-links">
          <a href="/#why">Why now</a>
          <a href="/#product">Product</a>
          <a href="/#usecases">Use cases</a>
          {/* TODO: re-enable About page — temporarily disabled */}
          {/* <Link to="/about">About</Link> */}
          {/* TODO: re-enable Resources page — temporarily disabled */}
          {/* <Link to="/resources/cbn-aml-baseline-standards">Resources</Link> */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a product demo"
          >
            Demo
          </a>
        </div>
      </div>
      <div className="wrap">
        <p className="fine">
          © {year} Fintegrity Technology Limited. Registered in Nigeria. Lagos, Nigeria.{' '}
          Early-stage platform in active development with design partners. Regulatory references reflect current CBN / NFIU guidance and are not legal advice.
        </p>
      </div>
    </footer>
  )
}
