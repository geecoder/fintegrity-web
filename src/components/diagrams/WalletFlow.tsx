export default function WalletFlow() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Wallet integration diagram: a customer taps Send in the wallet app, the wallet's backend calls Fintegrity's /v1/decide endpoint in under 50 milliseconds, and Fintegrity returns Clear, Flagged, Held for review, or Blocked. A side branch writes the customer risk state and immutable evidence after every call."
    >
      <div className="diag-flow" aria-hidden="true">
        <div className="diag-node">
          <div className="diag-node-label">Customer taps Send</div>
          <div className="diag-node-sub">wallet app · transfer intent</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-node diag-node-primary">
          <div className="diag-node-label">POST /v1/decide</div>
          <div className="diag-node-sub">pre-authorisation · &lt;50ms</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-node">
          <div className="diag-node-label">Decision</div>
          <div className="diag-decision-pills">
            <span className="diag-pill diag-pill-clear">CLEAR</span>
            <span className="diag-pill diag-pill-flag">FLAGGED</span>
            <span className="diag-pill diag-pill-hold">HELD_FOR_REVIEW</span>
            <span className="diag-pill diag-pill-block">BLOCKED</span>
          </div>
        </div>
      </div>

      <div className="diag-branch">
        <div className="diag-branch-arrow">↓ every call writes</div>
        <div className="diag-branch-node">
          <div className="diag-branch-title">Risk state + immutable evidence</div>
          <div className="diag-branch-meta">
            KYC tier · velocity window · rules fired · timestamp · evidence reference
          </div>
        </div>
      </div>
    </div>
  )
}
