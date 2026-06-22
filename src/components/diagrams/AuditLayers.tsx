/**
 * audit_layers — the three-layer immutable audit architecture:
 * 1. Cryptographically verifiable decision trail
 * 2. WORM evidence store (immutable)
 * 3. Queryable case data
 * → converging into one-click evidence pack
 *
 * This is the hero diagram for the Banks & Microfinance page.
 */
export default function AuditLayers() {
  const LAYERS = [
    {
      num: '1',
      title: 'Cryptographically verifiable decision trail',
      desc: 'Every decision, rule version, customer state and timestamp is hashed into an append-only chain — tamper-evident by construction.',
    },
    {
      num: '2',
      title: 'WORM evidence store (immutable)',
      desc: 'Supporting evidence — screening results, case notes, attachments — is written to write-once, read-many storage. No edit, no delete.',
    },
    {
      num: '3',
      title: 'Queryable case data',
      desc: 'All decisions, alerts and case outcomes are indexed and queryable by customer, transaction, date range, or rule — turning an examiner request into a query.',
    },
  ]

  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Three-layer audit architecture diagram. Every compliance decision feeds three stacked layers: first, a cryptographically verifiable decision trail; second, a WORM evidence store that is immutable; third, queryable case data. All three converge into a one-click evidence pack available as PDF or JSON."
    >
      {/* Input */}
      <div
        aria-hidden="true"
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}
      >
        <div className="diag-node diag-node-primary" style={{ flex: 'none', minWidth: 180 }}>
          <div className="diag-node-label">Every compliance decision</div>
          <div className="diag-node-sub">real-time · deterministic · attributed</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>
          feeds ↓
        </div>
      </div>

      {/* Three layers */}
      <div className="diag-layers" aria-hidden="true">
        {LAYERS.map((layer) => (
          <div className="diag-layer" key={layer.num}>
            <div className="diag-layer-num">{layer.num}</div>
            <div className="diag-layer-content">
              <div className="diag-layer-title">{layer.title}</div>
              <div className="diag-layer-desc">{layer.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="diag-output-node" aria-hidden="true" style={{ marginTop: 14 }}>
        <div>
          <div className="diag-output-label">One-click evidence pack</div>
          <div className="diag-output-sub">PDF · JSON · any customer · any transaction · any date range</div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,.65)',
            border: '1px solid rgba(255,255,255,.3)',
            borderRadius: '7px',
            padding: '4px 10px',
            whiteSpace: 'nowrap',
          }}
        >
          generated on demand
        </div>
      </div>
    </div>
  )
}
