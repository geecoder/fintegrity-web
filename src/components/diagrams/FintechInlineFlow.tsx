/**
 * fintech_inline_flow — shows Fintegrity sitting in-line between the
 * fintech app and the money rails, returning a decision + writing evidence.
 */
export default function FintechInlineFlow() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Inline placement diagram: Your app — covering onboarding, payments, and withdrawals — calls the Fintegrity Decision API in-line in under 100ms, which returns Allow, Hold, or Block. A side branch writes the customer risk state and immutable evidence after every call."
    >
      <div className="diag-flow" aria-hidden="true">
        <div className="diag-node">
          <div className="diag-node-label">Your app</div>
          <div className="diag-node-sub">onboarding · payments · withdrawals</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-node diag-node-primary">
          <div className="diag-node-label">Fintegrity Decision API</div>
          <div className="diag-node-sub">in-line · &lt;100ms</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-node">
          <div className="diag-node-label">Decision</div>
          <div className="diag-decision-pills">
            <span className="diag-pill diag-pill-allow">ALLOW</span>
            <span className="diag-pill diag-pill-review">HOLD</span>
            <span className="diag-pill diag-pill-block">BLOCK</span>
          </div>
        </div>
      </div>

      <div className="diag-branch">
        <div className="diag-branch-arrow">↓ every call writes</div>
        <div className="diag-branch-node">
          <div className="diag-branch-title">Risk state + immutable evidence</div>
          <div className="diag-branch-meta">
            customer risk state · decision · rules fired · timestamp · evidence reference
          </div>
        </div>
      </div>
    </div>
  )
}
