/**
 * rule_lifecycle — horizontal rule authoring pipeline with simulation sandbox.
 * Reflows to vertical stack on mobile (≤640px via CSS).
 */
export default function RuleLifecycle() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Rule lifecycle diagram: a compliance team drafts a rule, simulates it against the last 30 days of transactions to see would-fire count, sample hits, and estimated false-positive rate, reviews the results, activates the rule with an effective date, and the rule goes live as a versioned entry. Previous versions are retained and queryable in the audit trail."
    >
      {/* Main flow */}
      <div className="diag-lifecycle" aria-hidden="true">

        <div className="diag-step">
          <div className="diag-step-label">Draft rule</div>
          <div className="diag-step-sub">no-code policy builder</div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Simulation — distinct safe/sandbox tint */}
        <div className="diag-step diag-step-safe">
          <div className="diag-step-label">Simulate</div>
          <div className="diag-step-sub">vs last 30 days · safe sandbox</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-step diag-step-safe">
          <div className="diag-step-label">Review results</div>
          <div className="diag-step-sub">
            would-fire count<br />
            sample hits<br />
            est. false-positive rate
          </div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-step diag-step-active">
          <div className="diag-step-label">Activate</div>
          <div className="diag-step-sub">effective date set</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-step diag-step-active">
          <div className="diag-step-label">Versioned &amp; live</div>
          <div className="diag-step-sub">decisions reference this version</div>
        </div>
      </div>

      {/* Version retention branch */}
      <div className="diag-branch">
        <div className="diag-branch-arrow">↓ on activation</div>
        <div className="diag-branch-node">
          <div className="diag-branch-title">Previous version retained</div>
          <div className="diag-branch-meta">
            queryable in audit · every decision references the exact rule version in force at the time
          </div>
        </div>
      </div>
    </div>
  )
}
