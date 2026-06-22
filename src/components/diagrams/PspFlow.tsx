/**
 * psp_flow — two risk flows (merchant onboarding + transaction flow)
 * converging into one decision layer, producing a merchant risk state and
 * immutable evidence.
 */
export default function PspFlow() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="PSP flow diagram: merchant onboarding and transaction flow both feed into the Fintegrity decision layer. The decision layer applies velocity and settlement pattern monitoring rules, producing a decision and merchant risk state. Every decision writes immutable evidence."
    >
      <div className="diag-flow" aria-hidden="true">

        {/* Two inputs stacked */}
        <div className="diag-provider-stack" style={{ flex: 'none', minWidth: 160 }}>
          <div className="diag-node" style={{ flex: 'none', marginBottom: 0 }}>
            <div className="diag-node-label">Merchant onboarding</div>
            <div className="diag-node-sub">risk tier · screening</div>
          </div>
          <div style={{ height: 8 }} />
          <div className="diag-node" style={{ flex: 'none' }}>
            <div className="diag-node-label">Transaction flow</div>
            <div className="diag-node-sub">velocity · settlement patterns</div>
          </div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Decision layer */}
        <div className="diag-node diag-node-primary">
          <div className="diag-node-label">Fintegrity decision layer</div>
          <div className="diag-node-sub">velocity · settlement monitoring · screening</div>
        </div>

        <div className="diag-arrow">→</div>

        {/* Outcome */}
        <div className="diag-node diag-node-tint">
          <div className="diag-node-label">Decision + merchant risk state</div>
          <div className="diag-node-sub">one authoritative state per merchant</div>
        </div>

        <div className="diag-arrow">→</div>

        <div className="diag-node">
          <div className="diag-node-label">Immutable evidence</div>
          <div className="diag-node-sub">per-check · per-decision · on demand</div>
        </div>
      </div>
    </div>
  )
}
