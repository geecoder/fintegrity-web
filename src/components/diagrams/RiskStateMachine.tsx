/**
 * risk_state_machine — 6-node state machine rendered as:
 *   - A colour-coded state grid (responsive: 3-col → 2-col → 1-col)
 *   - A transitions list below (always readable on any screen width)
 */

const STATES = [
  {
    key: 'pending',
    name: 'KYC_PENDING',
    desc: 'Onboarding started; verification not yet complete',
  },
  {
    key: 'ok',
    name: 'KYC_OK',
    desc: 'Verified and in good standing. Transactions proceed through full rule evaluation.',
  },
  {
    key: 'refresh',
    name: 'KYC_REFRESH_DUE',
    desc: 'Verification has expired or is due for scheduled refresh',
  },
  {
    key: 'review',
    name: 'RISK_REVIEW_REQUIRED',
    desc: 'Flagged by a screening hit or monitoring alert — under active investigation',
  },
  {
    key: 'restricted',
    name: 'RESTRICTED',
    desc: 'Limited access pending case resolution',
  },
  {
    key: 'blocked',
    name: 'BLOCKED',
    desc: 'Barred from transacting. All transactions return BLOCKED before any rules run.',
  },
]

const TRANSITIONS = [
  { from: 'KYC_PENDING', label: '→ KYC_OK when verification passed' },
  { from: 'KYC_OK', label: '→ KYC_REFRESH_DUE when verification expires' },
  { from: 'KYC_OK', label: '→ RISK_REVIEW_REQUIRED on screening hit or monitoring alert' },
  { from: 'RISK_REVIEW_REQUIRED', label: '→ KYC_OK when case outcome: cleared' },
  { from: 'RISK_REVIEW_REQUIRED', label: '→ RESTRICTED when case outcome: adverse' },
  { from: 'RESTRICTED', label: '→ BLOCKED on unresolved escalation' },
  {
    from: '⋯ manual override',
    label: '→ RESTRICTED or BLOCKED; requires reason + approver identity + supporting evidence. No silent state changes.',
    manual: true,
  },
]

export default function RiskStateMachine() {
  return (
    <div
      className="diag-wrap"
      role="img"
      aria-label="Customer risk state machine with six states: KYC_PENDING (onboarding in progress), KYC_OK (good standing, indigo), KYC_REFRESH_DUE (verification expiring), RISK_REVIEW_REQUIRED (flagged, amber), RESTRICTED (limited access, red), and BLOCKED (fully barred, red). Transitions are event-driven: verification passes moves pending to OK; a screening hit or monitoring alert moves OK to RISK_REVIEW; case outcomes move RISK_REVIEW to either cleared (back to OK) or RESTRICTED; unresolved escalation moves RESTRICTED to BLOCKED. Manual overrides require a reason, approver, and evidence."
    >
      {/* State grid */}
      <div className="diag-states" aria-hidden="true">
        {STATES.map((s) => (
          <div key={s.key} className={`diag-state diag-state-${s.key}`}>
            <div className="diag-state-name">{s.name}</div>
            <div className="diag-state-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Transitions */}
      <div className="diag-transitions" aria-hidden="true">
        {TRANSITIONS.map((t, i) => (
          <div
            key={i}
            className={`diag-transition${t.manual ? ' diag-transition-manual' : ''}`}
          >
            <span className="diag-transition-from">{t.from}</span>
            <span className="diag-transition-label">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
