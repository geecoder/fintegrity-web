/**
 * corridor_flow — sender → corridor (screening + corridor-risk rules) → recipient,
 * with a branch showing dual-regime evidence. CBN / FCA labels are
 * presentational only — no regulatory claims.
 */
export default function CorridorFlow() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Corridor flow diagram: money moves from sender through the corridor to recipient. At the corridor stage, Fintegrity applies sanctions and PEP screening plus corridor-risk rules. A branch shows the resulting decision and dual-regime evidence, with labels indicating CBN and FCA regulatory contexts as a design capability — not a legal assertion."
    >
      {/* Main spine: sender → corridor → recipient */}
      <div className="diag-flow" aria-hidden="true">
        <div className="diag-node">
          <div className="diag-node-label">Sender</div>
          <div className="diag-node-sub">originating party</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-node diag-node-primary">
          <div className="diag-node-label">Corridor</div>
          <div className="diag-node-sub">
            Fintegrity screening + corridor-risk rules<br />
            sanctions · PEP · adverse media
          </div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-node">
          <div className="diag-node-label">Recipient</div>
          <div className="diag-node-sub">destination party</div>
        </div>
      </div>

      {/* Evidence branch with dual-regime labels */}
      <div className="diag-branch" aria-hidden="true">
        <div className="diag-branch-arrow">↓ every transfer writes</div>
        <div className="diag-branch-node" style={{ position: 'relative' }}>
          <div className="diag-branch-title">Decision + dual-regime evidence</div>
          <div className="diag-branch-meta">
            screening result · corridor-risk outcome · policy action · timestamp
          </div>
          {/* Dual-regime lenses — capability label only */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '5px',
                background: 'var(--bg-soft)',
                border: '1px solid var(--line)',
                color: 'var(--slate)',
              }}
            >
              CBN-aligned
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '5px',
                background: 'var(--bg-soft)',
                border: '1px solid var(--line)',
                color: 'var(--slate)',
              }}
            >
              FCA-aligned
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
