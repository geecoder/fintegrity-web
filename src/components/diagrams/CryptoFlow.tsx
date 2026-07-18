/**
 * crypto_flow — on/off-ramp and transfer events feeding the Fintegrity
 * decision layer (screening + velocity/pattern rules) → decision + risk
 * state → immutable evidence.
 */
export default function CryptoFlow() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Crypto flow diagram: on-ramp, off-ramp, and transfer events all feed into the Fintegrity decision layer, which applies screening and velocity or pattern rules tuned to crypto typologies. The layer returns one of four decisions — Clear, Flagged, Held for review, or Blocked — and a customer risk state. Every decision writes immutable evidence."
    >
      <div className="diag-flow" aria-hidden="true">
        {/* Three event types stacked on the left */}
        <div className="diag-provider-stack" style={{ flex: 'none', minWidth: 160 }}>
          {['On-ramp', 'Off-ramp', 'Transfer events'].map((label, i) => (
            <div key={label}>
              {i > 0 && <div style={{ height: 6 }} />}
              <div className="diag-provider-node" style={{ fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="diag-arrow">→</div>

        {/* Decision layer */}
        <div className="diag-node diag-node-primary">
          <div className="diag-node-label">Fintegrity decision layer</div>
          <div className="diag-node-sub">
            screening · velocity rules<br />
            pattern detection (crypto typologies)
          </div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Decision + state */}
        <div className="diag-node diag-node-tint">
          <div className="diag-node-label">Decision + risk state</div>
          <div className="diag-decision-pills">
            <span className="diag-pill diag-pill-clear">CLEAR</span>
            <span className="diag-pill diag-pill-flag">FLAGGED</span>
            <span className="diag-pill diag-pill-hold">HELD_FOR_REVIEW</span>
            <span className="diag-pill diag-pill-block">BLOCKED</span>
          </div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Evidence */}
        <div className="diag-node">
          <div className="diag-node-label">Immutable evidence</div>
          <div className="diag-node-sub">every decision · versioned rules · on demand</div>
        </div>
      </div>
    </div>
  )
}
