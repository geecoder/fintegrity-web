// The signature homepage visual: a transaction moving through Fintegrity's
// decision engine in four stages. Animates once on scroll into view (via the
// shared .reveal/.in mechanism from RevealInit) and respects
// prefers-reduced-motion — see the .dengine rules in globals.css.
export default function DecisionEngine() {
  return (
    <div
      className="dengine reveal"
      role="img"
      aria-label="Diagram: a ₦450,000 transfer enters Fintegrity's decision engine, is checked against velocity, KYC tier, and screening rules, returns a CLEAR decision, and the outcome is written to an immutable evidence trail with a timestamped reference."
    >
      <div className="dengine-track" aria-hidden="true">
        <div className="dengine-stage dengine-stage-1">
          <div className="dengine-stage-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="6" width="18" height="13" rx="2" stroke="#0A1F44" strokeWidth="1.7" />
              <path d="M3 9h18" stroke="#0A1F44" strokeWidth="1.7" />
              <path d="M8 14.5h5" stroke="#0E9F6E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="dengine-stage-label">Transaction</div>
          <div className="dengine-tx-chip">
            <span>₦450,000</span>
            <span className="dengine-tx-sep">·</span>
            <span>transfer</span>
          </div>
        </div>

        <div className="dengine-connector" />

        <div className="dengine-stage dengine-stage-2">
          <div className="dengine-stage-icon dengine-pulse-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" stroke="#0A1F44" strokeWidth="1.7" />
              <path d="M12 7.5v5l3.2 1.8" stroke="#0E9F6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="dengine-pulse-ring" aria-hidden="true" />
          </div>
          <div className="dengine-stage-label">Evaluate</div>
          <ul className="dengine-checks">
            <li className="dengine-check">
              <span className="dengine-check-mark">✓</span>Velocity
            </li>
            <li className="dengine-check">
              <span className="dengine-check-mark">✓</span>KYC tier
            </li>
            <li className="dengine-check">
              <span className="dengine-check-mark">✓</span>Screening
            </li>
          </ul>
        </div>

        <div className="dengine-connector" />

        <div className="dengine-stage dengine-stage-3">
          <div className="dengine-stage-label">Decision</div>
          <div className="dengine-badge">CLEAR</div>
          <div className="dengine-badge-sub">14ms</div>
        </div>

        <div className="dengine-connector" />

        <div className="dengine-stage dengine-stage-4">
          <div className="dengine-stage-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="4" y="3" width="16" height="18" rx="2" stroke="#0A1F44" strokeWidth="1.7" />
              <path d="M8 8h8M8 12h8" stroke="#0A1F44" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M8 16h5" stroke="#0E9F6E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="dengine-stage-label">Evidence</div>
          <div className="dengine-ledger">evd_b91f4a72c…</div>
        </div>
      </div>
    </div>
  )
}
