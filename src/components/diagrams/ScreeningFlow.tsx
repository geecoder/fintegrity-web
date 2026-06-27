/**
 * screening_flow — left-to-right orchestration pipeline.
 * Reflows to vertical stack on mobile (≤640px via CSS).
 */
export default function ScreeningFlow() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Screening flow diagram: a transaction event enters the Decision API, which routes through a screening orchestration layer connecting to Provider A and Provider B (bring your own). Results are interpreted against policy, producing a decision of CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED. Every check writes list version, timestamp, match score, and action to the immutable audit ledger."
    >
      {/* Main horizontal flow */}
      <div className="diag-flow" aria-hidden="true">

        {/* Node 1 */}
        <div className="diag-node">
          <div className="diag-node-label">Transaction event</div>
          <div className="diag-node-sub">onboarding · payment · transfer</div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Node 2 */}
        <div className="diag-node">
          <div className="diag-node-label">Decision API</div>
          <div className="diag-node-sub">/v1/decide</div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Node 3: Screening orchestration with BYO providers */}
        <div className="diag-node diag-node-tint" style={{ gap: '10px' }}>
          <div className="diag-node-label">Screening orchestration</div>
          <div className="diag-provider-label">BYO provider(s)</div>
          <div className="diag-provider-stack">
            <div className="diag-provider-node">Provider A</div>
            <div className="diag-provider-node">Provider B</div>
          </div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Node 4 */}
        <div className="diag-node">
          <div className="diag-node-label">Policy interpretation</div>
          <div className="diag-node-sub">match score threshold · action mapping</div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Node 5: Decision — primary */}
        <div className="diag-node diag-node-primary">
          <div className="diag-node-label">Decision</div>
          <div className="diag-decision-pills">
            <span className="diag-pill diag-pill-clear">CLEAR</span>
            <span className="diag-pill diag-pill-flag">FLAGGED</span>
            <span className="diag-pill diag-pill-hold">HELD_FOR_REVIEW</span>
            <span className="diag-pill diag-pill-block">BLOCKED</span>
          </div>
        </div>
      </div>

      {/* Evidence branch — runs below the main flow */}
      <div className="diag-branch">
        <div className="diag-branch-arrow">↓ every check writes</div>
        <div className="diag-branch-node">
          <div className="diag-branch-title">Immutable audit ledger</div>
          <div className="diag-branch-meta">
            list version · timestamp · match score · matched entity · action taken
          </div>
        </div>
      </div>
    </div>
  )
}
