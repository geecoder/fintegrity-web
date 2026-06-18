import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal, usePageMeta } from '../utils/hooks'
import { BOOKING_URL } from '../config/site'

/* ─────────────────────────────────────────────
   Assessment constants
───────────────────────────────────────────── */
const STATUS_OPTIONS = [
  { value: 'not_started', label: 'Not started', color: 'gs-red' },
  { value: 'in_progress', label: 'In progress', color: 'gs-amber' },
  { value: 'implemented', label: 'Implemented', color: 'gs-blue' },
  { value: 'audit_ready', label: 'Audit-ready', color: 'gs-green' },
]
const STATUS_SCORE = { not_started: 0, in_progress: 1, implemented: 2, audit_ready: 3 }
const INST_TYPES = ['DMBs', 'MFBs', 'PSPs', 'IMTOs', 'Finance Cos.', 'MMOs']
const INST_DEADLINES = {
  'DMBs': { date: '10 September 2027', note: '18 months from issuance' },
  'MFBs': { date: '10 March 2028', note: '24 months from issuance' },
  'PSPs': { date: '10 March 2028', note: '24 months from issuance' },
  'IMTOs': { date: '10 March 2028', note: '24 months from issuance' },
  'Finance Cos.': { date: '10 March 2028', note: '24 months from issuance' },
  'MMOs': { date: '10 March 2028', note: '24 months from issuance' },
}

/* ─────────────────────────────────────────────
   Lifecycle data
───────────────────────────────────────────── */
const LIFECYCLE = [
  {
    num: '01', label: 'KYC / CDD', sub: 'Risk profiling',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="#635BFF" strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    num: '02', label: 'Screening', sub: 'Sanctions & PEP',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="#635BFF" strokeWidth="1.8"/><path d="M16.5 16.5l3.5 3.5" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round"/><path d="M9 11l1.5 1.5L13 9" stroke="#3ECFE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    num: '03', label: 'Transaction Monitoring', sub: 'Real-time detection',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12h4l3-7 4 14 3-7 3 0" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="21" cy="12" r="1.5" fill="#3ECFE0"/></svg>,
  },
  {
    num: '04', label: 'Case Management', sub: 'Audit trail',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="#635BFF" strokeWidth="1.8"/><path d="M8 13h8M8 16h5" stroke="#3ECFE0" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    num: '05', label: 'Reporting', sub: 'STR / CTR / SAR / FTR',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#635BFF" strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#3ECFE0" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    num: '06', label: 'Governance', sub: 'Examination-ready',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3L4 7v6c0 5 3.6 8 8 9 4.4-1 8-4 8-9V7l-8-4z" stroke="#635BFF" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4.5" stroke="#3ECFE0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
]

/* ─────────────────────────────────────────────
   Who must comply
───────────────────────────────────────────── */
const INSTITUTIONS = [
  { type: 'DMBs', title: 'Deposit Money Banks', desc: 'Commercial, merchant, and non-interest banks operating under full CBN licensing.', note: 'Full-compliance deadline: 10 September 2027.' },
  { type: 'MFBs', title: 'Microfinance Banks', desc: 'State, national, and unit MFBs. Implementation depth calibrated to size and risk profile.', note: 'Full-compliance deadline: 10 March 2028.' },
  { type: 'PSPs', title: 'Payment Service Providers', desc: 'PSPs, switching companies, payment gateways, and super-agents.', note: 'Full-compliance deadline: 10 March 2028.' },
  { type: 'IMTOs', title: 'Money Transfer Operators', desc: 'International money transfer operators and domestic cross-border operators.', note: 'Full-compliance deadline: 10 March 2028.' },
  { type: 'Finance Cos.', title: 'Finance Companies', desc: 'Mortgage institutions, finance houses, and non-bank financial institutions.', note: 'Full-compliance deadline: 10 March 2028.' },
  { type: 'MMOs', title: 'Mobile Money Operators', desc: 'CBN-licensed mobile money operators and payment service banks.', note: 'Full-compliance deadline: 10 March 2028.' },
]

/* ─────────────────────────────────────────────
   The 12 standards
───────────────────────────────────────────── */
const STANDARDS_DATA = [
  { num: '5.1', title: 'AML Solution', summary: 'The minimum functional footprint an AML system must cover — the end-to-end capability baseline.', reqs: ['Covers identity & verification, risk profiling, screening, monitoring, case management, reporting, audit trails, and data protection', 'Fraud monitoring must be clearly segregated from AML functions where both are present in the system', 'End-to-end lifecycle coverage with no functional gaps across the AML process', 'Documented minimum capability thresholds per functional area'] },
  { num: '5.2', title: 'CDD / KYC / KYB', summary: 'Automated due diligence that stays live post-onboarding — continuous sync between KYC records, risk profiles, and transactions.', reqs: ['Continuous synchronisation between KYC records, risk profiles, and transaction history throughout the customer lifecycle', 'Automated triggers for enhanced due diligence when a customer risk profile changes', 'Integration with BVN and NIN where available', 'KYB processes for corporate customers with beneficial ownership mapping'] },
  { num: '5.3', title: 'Sanctions & PEP Screening', summary: 'Real-time screening beyond simple name matching — fuzzy/AI matching, adverse media, and automated blocking on confirmed hits.', reqs: ['Real-time screening against sanctions lists and PEP databases beyond simple exact name matching', 'Fuzzy and AI-assisted matching to reduce missed hits from name variations, transliterations, or aliases', 'Adverse media screening integrated into the overall customer risk assessment', 'Automated blocking on confirmed sanctions matches with an auditable review and override process'] },
  { num: '5.4', title: 'Risk Assessment', summary: 'Dynamic, configurable risk scoring that updates as customer behaviour changes, with documented governance for any AI/ML models.', reqs: ['Dynamic risk scoring that updates as customer behaviour and profile change — not a static score assigned at onboarding', 'Enterprise-level risk measurement across the institution\'s full portfolio', 'Configurable risk parameters and thresholds with a documented change-management and governance process', 'Documented governance and validation framework for any AI or ML models used in risk scoring'] },
  { num: '5.5', title: 'Transaction Monitoring & Risk-Based Analyses', summary: 'Multi-scenario monitoring using KYC/KYB attributes — not raw transaction data alone — plus network analysis and independent model validation.', reqs: ['Multi-scenario rule-based and/or model-based monitoring using KYC/KYB customer attributes, not raw transaction data alone', 'Related-party and network analysis to detect layering and structuring patterns across connected accounts', 'Independent validation of AI/ML transaction monitoring models with documented outcomes', 'Alert prioritisation and disposition workflows with documented and reviewed thresholds'] },
  { num: '5.6', title: 'Fraud Monitoring & Detection', summary: 'Where the system also handles fraud: real-time cross-channel monitoring with clear AML/fraud separation of responsibilities.', reqs: ['Real-time fraud monitoring across all transaction channels where the solution covers fraud functions', 'Clear and documented separation of AML and fraud monitoring responsibilities within the system', 'Fraud typologies and alert logic maintained separately from AML rules with distinct governance', 'Cross-channel fraud correlation and customer-level fraud risk profiling'] },
  { num: '5.7', title: 'Case Management', summary: 'Automated case creation, maker-checker controls, role-based escalation, full audit trail, and management reporting.', reqs: ['Automated case creation from alerts with configurable prioritisation and routing rules', 'Maker-checker controls ensuring no single officer can both raise and close a case unilaterally', 'Role-based escalation with documented decision points, timeouts, and escalation paths', 'Full, immutable audit trail of all case actions, decisions, notes, and communications'] },
  { num: '5.8', title: 'Reporting', summary: 'Automated generation of STRs/SARs/CTRs/FTRs in CBN-prescribed formats, with internal governance before submission.', reqs: ['Automated generation of STRs, SARs, CTRs, and FTRs in CBN/NFIU-prescribed report formats', 'Version management to accommodate format changes issued by the regulator', 'Internal review and governance workflow before any regulatory submission is filed', 'Tracking of submission status, regulatory acknowledgements, and responses'] },
  { num: '5.9', title: 'Audit & Governance', summary: 'Immutable, tamper-proof audit trail of all system and user activity, with forensic linkages and segregated access.', reqs: ['Immutable, tamper-proof audit log capturing all system events and user actions with timestamps and user attribution', 'Forensic linkages between alerts, cases, decisions, and regulatory reports for examination evidence', 'Documented governance structure with segregated system access and clearly defined roles', 'Board-level governance oversight with documented accountability for AML system performance and controls'] },
  { num: '5.10', title: 'System Integration & Scalability', summary: 'Real-time, bidirectional integration with core banking and KYC systems; documented standards-based APIs.', reqs: ['Real-time, bidirectional integration with the core banking system and KYC infrastructure', 'Documented, standards-based APIs with version control and a formal change-management process', 'Standalone transaction feed configurations restricted or prohibited for higher-risk institutions', 'Demonstrated scalability to handle peak transaction volumes without monitoring gaps or processing latency'] },
  { num: '5.11', title: 'Security & Data Protection', summary: 'Encryption at rest and in transit, RBAC with MFA, NDPA compliance, data sovereignty, and defined RTO/RPO.', reqs: ['Encryption of all AML data at rest and in transit using current industry-standard algorithms', 'Role-based access control (RBAC) with multi-factor authentication (MFA) mandatory for all system users', 'Compliance with the Nigeria Data Protection Act 2023 (NDPA) and data sovereignty requirements for locally held data', 'Defined, documented, and tested Recovery Time Objective (RTO) and Recovery Point Objective (RPO)'] },
  { num: '5.12', title: 'User Interface & Customisation', summary: 'Real-time dashboards, usable investigation interfaces, multi-entity/currency/jurisdiction configuration.', reqs: ['Real-time dashboards showing alert queues, case status, and monitoring health indicators for compliance teams', 'Usable investigation interfaces enabling efficient alert review and case documentation without specialist training', 'Multi-entity, multi-currency, and multi-jurisdiction configuration capability where applicable', 'Documented processes for updating detection rules, thresholds, and monitoring parameters without system downtime'] },
]

/* ─────────────────────────────────────────────
   Roadmap phases
───────────────────────────────────────────── */
const ROADMAP = [
  { phase: '01', title: 'Gap Assessment', deadline: { date: '10 June 2026', passed: true }, items: ['Self-assess against all 12 standards and score each against current capability', 'Identify critical gaps and prioritise quick wins for early submission', 'Document current-state evidence for each standard area', 'Draft the CBN roadmap submission — submit electronically in Word and PDF formats'] },
  { phase: '02', title: 'Foundation', items: ['Update AML/CFT governance framework and policies to reflect the standards', 'Obtain board approval of updated compliance policies and risk methodology', 'Formalise governance committee structure and terms of reference', 'Establish vendor management policy and third-party oversight framework'] },
  { phase: '03', title: 'System Build', items: ['Deploy or upgrade the automated AML solution to meet Standard 5.1', 'Configure sanctions and PEP screening (Standard 5.3)', 'Integrate with core banking and KYC systems (Standard 5.10)', 'Set up case management, reporting, and immutable audit trail modules', 'Configure fraud monitoring with documented AML/fraud segregation (Standard 5.6)'] },
  { phase: '04', title: 'Assurance', items: ['Commission independent audit of all 12 standards with evidence per standard', 'Complete AI/ML model validation documentation (Standards 5.4 and 5.5)', 'Compile training records and staff competency evidence', 'Produce an examination-ready evidence file per standard', 'Establish annual self-assessment and review cycle'] },
]

/* ─────────────────────────────────────────────
   How Fintegrity helps
───────────────────────────────────────────── */
const HELPS = [
  { tag: 'Decision API', lifecycle: 'Standards 5.1 · 5.4 · 5.5', title: 'Enforcement before money moves', body: 'The Decision API is called synchronously before each transaction. It returns ALLOW, REVIEW, or BLOCK with the rules that fired and an evidence reference. This directly fulfils the automated enforcement requirements of Standards 5.1, 5.4, and 5.5 — and eliminates the gap between KYC data and transaction control.' },
  { tag: 'Immutable Audit Trail', lifecycle: 'Standard 5.9', title: 'Tamper-proof evidence, always ready', body: "Every decision, risk-state change, and alert is written to a cryptographically immutable audit log. Standard 5.9's requirement for a tamper-proof, forensically linked audit trail is met by design — and examination evidence retrieval takes seconds, not days." },
  { tag: 'Monitoring · Case Mgmt · Evidence Packs', lifecycle: 'Standards 5.5 · 5.7 · 5.8', title: '60-second evidence pack', body: "Fintegrity's monitoring engine creates cases, maintains maker-checker workflows, and generates a complete, regulator-ready evidence pack for any customer on demand. Standards 5.5 (monitoring), 5.7 (case management), and 5.8 (reporting) are addressed in one integrated layer." },
]

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const FAQ_DATA = [
  { q: 'How is this different from the existing CBN AML/CFT Regulations?', a: "The Regulations set your legal obligations. The Baseline Standards define the minimum technology and operational capabilities CBN expects to see when assessing whether you meet them — essentially the examiner's rubric. Think of the Regulations as the law and the Baseline Standards as the CBN's published interpretation of what 'complying' looks like in practice." },
  { q: 'Do smaller institutions like MFBs need to comply with all the standards?', a: "The standards apply to all financial institutions under the CBN's regulatory purview. However, the depth and sophistication of implementation must be proportionate to each institution's size, risk profile, business model, transaction volumes and operational complexity. A unit MFB implements differently from a national commercial bank, but the obligation to have functioning AML technology exists across all licensed institutions. Institutions in elevated-risk business lines must apply enhanced monitoring regardless of size." },
  { q: 'The 10 June 2026 implementation plan deadline has passed. What now?', a: 'If you have not yet submitted your implementation plan, submit it immediately to the CBN Compliance Department in both editable Word and final PDF formats. Late submission does not remove the full-compliance obligation — DMBs must reach full compliance by 10 September 2027 and other financial institutions by 10 March 2028. The CBN circular CMD/DIR/PUB/CIR/001006 (31 March 2026) sets out the submission requirements.' },
  { q: 'What will examiners actually look at?', a: 'Based on typical CBN examination practice: live system demonstrations showing key workflows, transaction and alert walk-throughs in the production environment, document review (governance policies, board minutes, risk methodology, training records, model validation reports), and staff interviews. Contemporaneous evidence — records created at the time of the action, not reconstructed — carries the most weight.' },
  { q: 'Can we use a third-party vendor to meet the standards?', a: 'Yes. However, your institution remains accountable for the outputs and governance of any third-party system. The CBN implementation circular specifically clarifies that compliance is assessed at the financial-institution level, not merely by purchasing a vendor product. You must be able to produce examination-ready evidence and maintain effective vendor oversight.' },
  { q: 'Is this page legal advice?', a: 'No. This is an educational summary provided by Fintegrity Technology Limited, based on publicly available regulatory material. It is not legal advice. Verify the content against the official CBN circulars and consult a qualified compliance professional before making compliance or business decisions.' },
]

/* ─────────────────────────────────────────────
   Widget — hero visual (illustrative)
───────────────────────────────────────────── */
const WIDGET_ROWS = [
  { num: '5.1', name: 'AML Solution', s: 'implemented' },
  { num: '5.2', name: 'CDD / KYC / KYB', s: 'implemented' },
  { num: '5.3', name: 'Sanctions & PEP', s: 'not_started' },
  { num: '5.4', name: 'Risk Assessment', s: 'in_progress' },
  { num: '5.5', name: 'Transaction Monitoring', s: 'not_started' },
  { num: '5.6', name: 'Fraud Monitoring', s: 'in_progress' },
  { num: '5.7', name: 'Case Management', s: 'not_started' },
  { num: '5.8', name: 'Reporting', s: 'in_progress' },
  { num: '5.9', name: 'Audit & Governance', s: 'not_started' },
  { num: '5.10', name: 'Integration', s: 'implemented' },
  { num: '5.11', name: 'Security & Data', s: 'implemented' },
  { num: '5.12', name: 'UI & Customisation', s: 'not_started' },
]
const WIDGET_CFG = {
  audit_ready: { label: 'Audit-ready', cls: 'wb-green' },
  implemented: { label: 'Implemented', cls: 'wb-blue' },
  in_progress: { label: 'In progress', cls: 'wb-amber' },
  not_started: { label: 'Gap', cls: 'wb-red' },
}

function ComplianceWidget() {
  const score = WIDGET_ROWS.reduce((s, r) => s + (STATUS_SCORE[r.s] || 0), 0)
  const pct = Math.round((score / 36) * 100)
  return (
    <div className="compliance-widget" aria-label="Illustrative compliance status snapshot">
      <div className="cw-head">
        <div>
          <p className="cw-title">CBN Baseline Standards</p>
          <p className="cw-circular">BSD/DIR/PUB/LAB/019/002 · Illustrative snapshot</p>
        </div>
        <span className="cw-live-dot" aria-hidden="true" />
      </div>
      <div className="cw-rows">
        {WIDGET_ROWS.map((r) => {
          const cfg = WIDGET_CFG[r.s]
          return (
            <div key={r.num} className="cw-row">
              <span className="cw-num">{r.num}</span>
              <span className="cw-name">{r.name}</span>
              <span className={`cw-badge ${cfg.cls}`}>{cfg.label}</span>
            </div>
          )
        })}
      </div>
      <div className="cw-foot">
        <div className="cw-score-row">
          <span className="cw-score-label">Overall readiness</span>
          <span className="cw-score-num">{pct}%</span>
        </div>
        <div className="cw-prog-track"><div className="cw-prog-fill" style={{ width: `${pct}%` }} /></div>
        <div className="cw-deadlines">
          <span>DMBs → 10 Sep 2027</span>
          <span className="cw-dl-dot">·</span>
          <span>OFIs → 10 Mar 2028</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Accordion
───────────────────────────────────────────── */
function Accordion({ items, prefix }) {
  const [open, setOpen] = useState(new Set())
  const toggle = (i) => setOpen((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n })
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open.has(i)
        return (
          <div key={i} className={`accord-item${isOpen ? ' open' : ''}`}>
            <button className="accord-trigger" onClick={() => toggle(i)} aria-expanded={isOpen} aria-controls={`${prefix}-body-${i}`}>
              {item.trigger}
              <span className="accord-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            <div id={`${prefix}-body-${i}`} className="accord-body" aria-hidden={!isOpen}>
              <div className="accord-body-inner">{item.body}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Gap assessment tool
───────────────────────────────────────────── */
function GapAssessment() {
  const [started, setStarted] = useState(false)
  const [instType, setInstType] = useState(null)
  const [scores, setScores] = useState({})
  const resultsRef = useRef(null)

  const setScore = (num, val) => setScores((p) => ({ ...p, [num]: val }))

  const totalScore = Object.values(scores).reduce((s, v) => s + (STATUS_SCORE[v] || 0), 0)
  const assessed = Object.values(scores).filter(Boolean).length
  const scorePct = assessed > 0 ? Math.round((totalScore / 36) * 100) : 0
  const progressPct = Math.round((assessed / 12) * 100)

  const getTier = () => {
    if (assessed === 0) return null
    if (scorePct >= 92) return { label: 'Examination-ready', cls: 'tier-green', desc: 'Your AML controls appear examination-ready. Focus on independent assurance and evidence documentation.' }
    if (scorePct >= 69) return { label: 'On track', cls: 'tier-blue', desc: 'A solid foundation is in place. Address remaining gaps before your compliance deadline.' }
    if (scorePct >= 36) return { label: 'Significant gaps', cls: 'tier-amber', desc: 'A structured implementation programme is required. Prioritise the critical gaps listed below.' }
    return { label: 'Critical gaps', cls: 'tier-red', desc: 'Immediate action required. Multiple standards are unaddressed. Start with Standards 5.1 and 5.7.' }
  }
  const tier = getTier()

  const priorityGaps = [...STANDARDS_DATA]
    .filter((s) => scores[s.num] !== 'audit_ready')
    .sort((a, b) => (STATUS_SCORE[scores[a.num]] ?? -1) - (STATUS_SCORE[scores[b.num]] ?? -1))
    .slice(0, 3)

  const deadline = instType ? INST_DEADLINES[instType] : null

  const buildEmailHref = () => {
    const subj = encodeURIComponent(`CBN AML Baseline gap assessment — ${instType || 'institution'} — ${scorePct}% readiness`)
    const body = encodeURIComponent([
      'CBN AML Baseline Standards — Self-Assessment Results',
      '',
      `Institution type: ${instType || 'Not specified'}`,
      `Overall readiness: ${scorePct}% (${totalScore}/36 points)`,
      `Standards assessed: ${assessed}/12`,
      tier ? `Readiness tier: ${tier.label}` : '',
      '',
      'Priority gaps:',
      ...priorityGaps.map((s) => `- ${s.num} ${s.title}: ${STATUS_OPTIONS.find((o) => o.value === scores[s.num])?.label || 'Not rated'}`),
      '',
      `Compliance deadline: ${deadline?.date || 'Not specified'}`,
      '',
      "I'd like to discuss how Fintegrity can help close these gaps.",
    ].join('\n'))
    return `mailto:hello@fintegrity.africa?subject=${subj}&body=${body}`
  }

  const scrollToResults = () => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

  if (!started) {
    return (
      <div className="gap-intro-card">
        <div className="gap-intro-eyebrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 11l2 2 4-4M20 12a8 8 0 11-16 0 8 8 0 0116 0z" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Interactive gap assessment
        </div>
        <h3 className="gap-intro-title">Where does your institution stand?</h3>
        <p className="gap-intro-sub">Self-assess across all 12 CBN baseline standards in about 2 minutes. Get an instant readiness score, your top priority gaps, and your compliance deadline — then share your results directly with us to start the conversation.</p>
        <div className="gap-intro-preview">
          {STANDARDS_DATA.slice(0, 4).map((s) => (
            <div key={s.num} className="gap-preview-row">
              <span className="gap-preview-num">{s.num}</span>
              <span className="gap-preview-name">{s.title}</span>
              <span className="gap-preview-rate">Rate →</span>
            </div>
          ))}
          <div className="gap-preview-ellipsis">+ 8 more standards</div>
        </div>
        <div className="gap-intro-footer">
          <button className="btn btn-primary" onClick={() => setStarted(true)}>Start gap assessment →</button>
          <p className="gap-intro-note">No sign-up required · Takes ~2 minutes</p>
        </div>
      </div>
    )
  }

  return (
    <div className="gap-tool-wrap">
      <div className="gap-tool-header">
        <div>
          <h3 className="gap-tool-title">CBN Baseline Standards — Self-Assessment</h3>
          <p className="gap-tool-sub">Rate each standard against your current capability. Results update live as you go.</p>
        </div>
        {assessed > 0 && (
          <button className="gap-jump-results" onClick={scrollToResults}>
            View results ↓
          </button>
        )}
      </div>

      {/* Institution type */}
      <div className="gap-inst-wrap">
        <p className="gap-inst-label">Your institution type <span className="gap-inst-hint">(sets your compliance deadline)</span></p>
        <div className="gap-inst-pills" role="group" aria-label="Institution type">
          {INST_TYPES.map((t) => (
            <button
              key={t}
              className={`gap-inst-pill${instType === t ? ' active' : ''}`}
              onClick={() => setInstType(t)}
              aria-pressed={instType === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="gap-overall-prog">
        <div className="gap-op-bar"><div className="gap-op-fill" style={{ width: `${progressPct}%` }} /></div>
        <span className="gap-op-label">{assessed} of 12 standards rated</span>
      </div>

      {/* Standards grid */}
      <div className="gap-standards-grid">
        {STANDARDS_DATA.map((std) => {
          const sel = scores[std.num]
          const selOpt = STATUS_OPTIONS.find((o) => o.value === sel)
          return (
            <div key={std.num} className={`gap-std-card${sel ? ` gap-card-${selOpt.color}` : ''}`}>
              <div className="gap-std-top">
                <span className="gap-std-num">{std.num}</span>
                <span className="gap-std-name">{std.title}</span>
              </div>
              <p className="gap-std-desc">{std.summary}</p>
              <div className="gap-status-row" role="group" aria-label={`Status for ${std.title}`}>
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`gap-status-btn ${opt.color}${sel === opt.value ? ' selected' : ''}`}
                    onClick={() => {
                      setScore(std.num, opt.value)
                      if (Object.keys({ ...scores, [std.num]: opt.value }).length >= 12) {
                        setTimeout(scrollToResults, 400)
                      }
                    }}
                    aria-pressed={sel === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Results panel */}
      {assessed > 0 && (
        <div className="gap-results" ref={resultsRef}>
          <div className="gap-results-inner">
            <div className="gap-res-header">
              <h3 className="gap-res-title">Your readiness summary</h3>
              {tier && <span className={`gap-tier-badge ${tier.cls}`}>{tier.label}</span>}
            </div>

            {/* Score */}
            <div className="gap-score-section">
              <div className="gap-score-meta">
                <span className="gap-score-big">{scorePct}<span className="gap-score-pct">%</span></span>
                <div className="gap-score-detail">
                  <span>{totalScore} / 36 points</span>
                  <span>{assessed} / 12 assessed</span>
                </div>
              </div>
              <div className="gap-score-bar-track">
                <div className={`gap-score-bar-fill ${tier?.cls || ''}`} style={{ width: `${scorePct}%` }} />
              </div>
              {tier && <p className="gap-tier-desc">{tier.desc}</p>}
            </div>

            <div className="gap-res-cols">
              {/* Priority gaps */}
              <div className="gap-priority-section">
                <p className="gap-section-label">Top priority gaps</p>
                <div className="gap-priority-list">
                  {priorityGaps.length === 0 ? (
                    <p className="gap-all-ready">All assessed standards are audit-ready. Book an independent assurance review.</p>
                  ) : priorityGaps.map((s) => {
                    const opt = STATUS_OPTIONS.find((o) => o.value === scores[s.num])
                    return (
                      <div key={s.num} className="gap-priority-row">
                        <div className="gap-priority-info">
                          <span className="gap-priority-num">{s.num}</span>
                          <span className="gap-priority-name">{s.title}</span>
                        </div>
                        <span className={`gap-priority-status ${opt ? opt.color : 'gs-grey'}`}>
                          {opt?.label || 'Not rated'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Deadline */}
              <div className="gap-deadline-section">
                <p className="gap-section-label">Your compliance deadline</p>
                {deadline ? (
                  <div className="gap-deadline-card">
                    <div className="gap-deadline-type">{instType}</div>
                    <div className="gap-deadline-date">{deadline.date}</div>
                    <div className="gap-deadline-note">{deadline.note} · CBN Circular BSD/DIR/PUB/LAB/019/002</div>
                  </div>
                ) : (
                  <div className="gap-deadline-empty">
                    <p>Select your institution type above to see your deadline.</p>
                    <div className="gap-deadline-all">
                      <div><strong>DMBs</strong> — 10 September 2027</div>
                      <div><strong>All others</strong> — 10 March 2028</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="gap-cta-section">
              <div className="gap-cta-inner">
                <div>
                  <p className="gap-cta-title">Talk to us about your gaps</p>
                  <p className="gap-cta-desc">Your assessment results are pre-filled in the email — no form to complete, just a direct conversation about your specific gaps and how Fintegrity can help close them.</p>
                </div>
                <div className="gap-cta-actions">
                  <a
                    className="btn btn-primary"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a product demo"
                  >
                    Send results &amp; start conversation →
                  </a>
                  <button className="btn btn-ghost gap-reset" onClick={() => { setScores({}); setInstType(null); window.scrollTo({ top: resultsRef.current?.offsetTop - 400, behavior: 'smooth' }) }}>
                    Reset assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   JSON-LD
───────────────────────────────────────────── */
function useJsonLd() {
  useEffect(() => {
    const scripts = []
    ;[
      { '@context': 'https://schema.org', '@type': 'Article', headline: "Nigeria's CBN AML/CFT Baseline Standards — Explained", description: 'A plain-English guide to the CBN AML/CFT/CPF Baseline Standards for Automated Solutions — 12 standards, verified against CBN Circular BSD/DIR/PUB/LAB/019/002 (10 March 2026).', author: { '@type': 'Organization', name: 'Fintegrity Technology Limited' }, publisher: { '@type': 'Organization', name: 'Fintegrity Technology Limited', url: 'https://fintegrity.africa' }, datePublished: '2026-06-14', dateModified: '2026-06-14', url: 'https://fintegrity.africa/resources/cbn-aml-baseline-standards' },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ].forEach((schema) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.setAttribute('data-page', 'cbn-aml')
      s.textContent = JSON.stringify(schema)
      document.head.appendChild(s)
      scripts.push(s)
    })
    return () => scripts.forEach((s) => s.remove())
  }, [])
}

/* ─────────────────────────────────────────────
   Accordion items
───────────────────────────────────────────── */
const stdItems = STANDARDS_DATA.map((s) => ({
  trigger: (
    <span className="accord-trigger-inner">
      <span className="std-num-badge">{s.num}</span>
      <span className="std-trigger-title">{s.title}</span>
    </span>
  ),
  body: (
    <>
      <p className="std-summary">{s.summary}</p>
      <p className="std-req-label">What it requires</p>
      <ul className="std-reqs" role="list">{s.reqs.map((r, i) => <li key={i} role="listitem">{r}</li>)}</ul>
    </>
  ),
}))

const faqItems = FAQ_DATA.map((f) => ({
  trigger: <span className="faq-trigger-text">{f.q}</span>,
  body: <p className="faq-answer">{f.a}</p>,
}))

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function CbnAmlBaseline() {
  useReveal()
  useJsonLd()
  usePageMeta(
    "Nigeria's CBN AML/CFT Baseline Standards Explained — Fintegrity Technology Limited",
    'A verified plain-English guide to the 12 CBN AML/CFT/CPF Baseline Standards (Circular BSD/DIR/PUB/LAB/019/002, 10 March 2026). Who must comply, the 12 standards, interactive gap assessment, and implementation roadmap.'
  )

  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="res-hero">
        <div className="hero-wash" aria-hidden="true" />
        <div className="wrap res-hero-grid">
          <div className="res-hero-text">
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span aria-hidden="true"> / </span>
              <span>Resources</span><span aria-hidden="true"> / </span>
              <span>CBN AML/CFT Baseline Standards</span>
            </nav>
            <div className="reveal">
              <div className="sec-eyebrow">Regulatory guide · Nigeria · Verified 14 June 2026</div>
              <h1 className="res-hero-h1">Nigeria's CBN AML/CFT Baseline Standards — Explained</h1>
              <p className="res-hero-sub">
                The CBN AML/CFT/CPF Baseline Standards for Automated Solutions set the minimum technology and operational
                capability every CBN-licensed institution must have. Twelve standard areas,{' '}
                <strong>100 mapped requirements</strong> across 95 standard-level requirements and five cross-cutting
                obligations. This guide explains each in plain English, sourced directly from the CBN circular.
              </p>
              <div className="res-source-line">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="9" stroke="#635BFF" strokeWidth="1.8"/><path d="M12 8v4M12 16v.5" stroke="#635BFF" strokeWidth="2" strokeLinecap="round"/></svg>
                <span>
                  <strong>Source:</strong> CBN Circular BSD/DIR/PUB/LAB/019/002, issued 10 March 2026. Implementation
                  guidance under Circular CMD/DIR/PUB/CIR/001006, issued 31 March 2026.{' '}
                  <strong>Last regulatory review: 14 June 2026.</strong>
                </span>
              </div>
              <div className="res-hero-cta">
                <a
                  className="btn btn-primary"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a product demo"
                >
                  Talk to us about readiness →
                </a>
                <a className="btn btn-ghost" href="#standards">Jump to the standards</a>
              </div>
            </div>
          </div>
          <div className="res-hero-visual reveal">
            <ComplianceWidget />
          </div>
        </div>
      </section>

      {/* ── 2. Trust & Sourcing strip ── */}
      <section className="trust-strip">
        <div className="wrap">
          <div className="trust-grid">
            <div className="trust-card reveal">
              <div className="trust-card-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#635BFF" strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Primary sources
              </div>
              <ul className="trust-source-list">
                <li>
                  <span className="trust-source-label">CBN Baseline Standards for Automated AML/CFT/CPF Solutions</span>
                  <a href="https://www.cbn.gov.ng/Out/2026/CCD/CBN%20issues%20Baseline%20Standards%20for%20Automated%20Anti-Money%20Laundering%20Solution.pdf" target="_blank" rel="noopener noreferrer" className="trust-source-link">Circular BSD/DIR/PUB/LAB/019/002 ↗</a>
                </li>
                <li>
                  <span className="trust-source-label">CBN Implementation Guidance Note</span>
                  <a href="https://www.cbn.gov.ng/Out/2026/CCD/LETTER%20TO%20SUPERVISED%20INSTITUTIONS_IMPLEMENTATION%20OF%20THE%20BASELINE%20STANDARDS%20FOR%20AUTOMATED%20AML_CFT_CPF%20SOLUTIONS2.pdf" target="_blank" rel="noopener noreferrer" className="trust-source-link">Circular CMD/DIR/PUB/CIR/001006 ↗</a>
                </li>
                <li>
                  <span className="trust-source-label">Money Laundering (Prevention &amp; Prohibition) Act 2022</span>
                  <a href="https://www.nfiu.gov.ng/LawsAndRegulations" target="_blank" rel="noopener noreferrer" className="trust-source-link">NFIU Laws &amp; Regulations ↗</a>
                </li>
                <li>
                  <span className="trust-source-label">Nigeria Data Protection Act 2023 (NDPA)</span>
                  <a href="https://ndpc.gov.ng/download/nigeria-data-protection-act-2023" target="_blank" rel="noopener noreferrer" className="trust-source-link">NDPC ↗</a>
                </li>
                <li>
                  <span className="trust-source-label">Terrorism (Prevention &amp; Prohibition) Act 2022 (TPPA)</span>
                  <span className="ph-url">[{{SOURCE_URL}} — fill in official URL]</span>
                </li>
              </ul>
            </div>

            <div className="trust-card reveal">
              <div className="trust-card-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#635BFF" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Last verified
              </div>
              <p className="trust-date-stamp">14 June 2026</p>
              <p className="trust-card-body">
                This page was reviewed against CBN Circular BSD/DIR/PUB/LAB/019/002 and the implementation guidance
                Circular CMD/DIR/PUB/CIR/001006. We update this page when the source circulars change.
              </p>
              <p className="trust-card-body" style={{ marginTop: '10px' }}>
                <strong>Not a legal document.</strong> Always verify against the primary CBN source before making
                compliance or business decisions.
              </p>
            </div>

            <div className="trust-card reveal">
              <div className="trust-card-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3L4 7v6c0 5 3.6 8 8 9 4.4-1 8-4 8-9V7l-8-4z" stroke="#635BFF" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                Not legal advice
              </div>
              <p className="trust-card-body">
                This guide is an educational summary of publicly available regulatory material. It is{' '}
                <strong>not legal advice</strong> and must not be relied upon as a substitute for the official CBN
                circulars or advice from a qualified compliance professional.
              </p>
              <p className="trust-card-body" style={{ marginTop: '10px' }}>
                Verify against the primary CBN source. Consult a qualified compliance professional before acting on
                anything here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Compliance timeline ── */}
      <section className="res-section">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">CBN implementation timeline</div>
            <h2 className="sec-title">Where the industry stands right now.</h2>
            <p className="sec-intro">
              The standards were issued 10 March 2026. The implementation plan submission deadline has already passed.
              Full compliance deadlines are approaching.
            </p>
          </div>
          <div className="ctl-wrap reveal">
            <div className="ctl-track">
              <div className="ctl-milestone ctl-done">
                <div className="ctl-dot ctl-dot-green" />
                <div className="ctl-date">10 Mar 2026</div>
                <div className="ctl-label">Standards issued</div>
                <div className="ctl-sub">CBN Circular BSD/DIR/PUB/LAB/019/002</div>
              </div>
              <div className="ctl-line ctl-line-green" />
              <div className="ctl-milestone ctl-done">
                <div className="ctl-dot ctl-dot-amber" />
                <div className="ctl-date">31 Mar 2026</div>
                <div className="ctl-label">Implementation guidance</div>
                <div className="ctl-sub">Circular CMD/DIR/PUB/CIR/001006</div>
              </div>
              <div className="ctl-line ctl-line-green" />
              <div className="ctl-milestone ctl-done">
                <div className="ctl-dot ctl-dot-red" />
                <div className="ctl-date">10 Jun 2026</div>
                <div className="ctl-label">Implementation plans due</div>
                <div className="ctl-sub ctl-passed">Deadline passed</div>
              </div>
              <div className="ctl-line" />
              <div className="ctl-milestone">
                <div className="ctl-dot" />
                <div className="ctl-date">10 Sep 2027</div>
                <div className="ctl-label">DMBs — full compliance</div>
                <div className="ctl-sub">18 months from issuance</div>
              </div>
              <div className="ctl-line" />
              <div className="ctl-milestone">
                <div className="ctl-dot" />
                <div className="ctl-date">10 Mar 2028</div>
                <div className="ctl-label">OFIs — full compliance</div>
                <div className="ctl-sub">24 months from issuance</div>
              </div>
            </div>
            <div className="ctl-today-marker">
              <span className="ctl-today-line" />
              <span className="ctl-today-label">Today — 14 June 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. AML Lifecycle ── */}
      <section className="res-section res-section-soft">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">The compliance lifecycle</div>
            <h2 className="sec-title">AML as one connected lifecycle.</h2>
            <p className="sec-intro">The 12 standards map onto a single end-to-end AML lifecycle. Every institution must cover the full chain — from onboarding to governance — with no gaps.</p>
          </div>
          <div className="lifecycle-outer reveal">
            <div className="lifecycle-flow" role="list">
              {LIFECYCLE.map((stage, i) => (
                <div key={stage.num} className="lifecycle-item-wrap" role="listitem">
                  <div className="lifecycle-stage">
                    <div className="lifecycle-icon">{stage.icon}</div>
                    <div className="lifecycle-num">{stage.num}</div>
                    <div className="lifecycle-label">{stage.label}</div>
                    <div className="lifecycle-sub">{stage.sub}</div>
                  </div>
                  {i < LIFECYCLE.length - 1 && <div className="lifecycle-arrow" aria-hidden="true">→</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Who must comply ── */}
      <section className="res-section">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Who must comply</div>
            <h2 className="sec-title">Every CBN-licensed institution.</h2>
            <p className="sec-intro">
              The standards apply to all financial institutions under the CBN's regulatory purview. The depth and
              sophistication of implementation must be proportionate to each institution's size, risk profile, business
              model, transaction volumes, and operational complexity. Institutions in elevated-risk business lines must
              apply enhanced monitoring regardless of institutional size.
            </p>
          </div>
          <div className="institution-grid">
            {INSTITUTIONS.map((inst) => (
              <div key={inst.type} className="institution-card reveal">
                <div className="institution-type">{inst.type}</div>
                <h3>{inst.title}</h3>
                <p>{inst.desc}</p>
                <p className="institution-note">{inst.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. The 12 standards ── */}
      <section className="res-section res-section-soft" id="standards">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">The standards</div>
            <h2 className="sec-title">12 baseline standards. 100 mapped requirements.</h2>
            <p className="sec-intro">
              The framework contains 12 baseline-standard areas (Sections 5.1–5.12) supported by 95 mapped
              standard-level requirements and five cross-cutting obligations under Section 6. The CBN circular does
              not itself publish "100" as a headline total — this is a structured compliance mapping.
            </p>
          </div>
          <div className="reveal" style={{ marginTop: '36px' }}>
            <Accordion items={stdItems} prefix="std" />
          </div>
          <p className="res-cross-cutting reveal">
            Cross-cutting obligations (Section 6): vendor and third-party management, third-party compliance
            accountability, cybersecurity and shared-services requirements, AI governance standards, and heightened
            vendor due diligence.
          </p>
        </div>
      </section>

      {/* ── 7. Gap Assessment ── */}
      <section className="res-section gap-section">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Interactive tool</div>
            <h2 className="sec-title">Assess your readiness in 2 minutes.</h2>
            <p className="sec-intro">
              Rate each of the 12 standards against your current capability. Get an instant readiness score,
              your priority gaps, and your compliance deadline — then share your results with us directly.
            </p>
          </div>
          <div className="reveal" style={{ marginTop: '36px' }}>
            <GapAssessment />
          </div>
        </div>
      </section>

      {/* ── 8. Roadmap ── */}
      <section className="res-section res-section-soft">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Implementation roadmap</div>
            <h2 className="sec-title">Four phases from gap to assurance.</h2>
            <p className="sec-intro">
              A structured path to examination readiness. Phase 1 — the CBN implementation plan submission — had
              a deadline of <strong>10 June 2026</strong>, which has now passed.
            </p>
          </div>
          <div className="roadmap-track reveal">
            {ROADMAP.map((phase) => (
              <div key={phase.phase} className="roadmap-phase">
                <div className="phase-badge-num">Phase {phase.phase}</div>
                <h3 className="phase-title">{phase.title}</h3>
                <ul className="phase-items">
                  {phase.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
                {phase.deadline && (
                  <div className={`phase-deadline${phase.deadline.passed ? ' phase-deadline-passed' : ''}`}>
                    {phase.deadline.passed ? '⚑ ' : ''}CBN submission deadline: {phase.deadline.date}
                    {phase.deadline.passed && ' — passed'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. How Fintegrity helps ── */}
      <section className="res-section fint-helps-band">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">How Fintegrity helps</div>
            <h2 className="sec-title">From compliance obligation to live enforcement.</h2>
            <p className="sec-intro">
              Fintegrity maps directly onto the Baseline Standards lifecycle — not as a dashboard, but as enforcement
              infrastructure called before every transaction and proved after every decision.
            </p>
          </div>
          <div className="helps-grid">
            {HELPS.map((h, i) => (
              <div key={i} className="helps-card reveal">
                <div className="helps-tag">{h.tag}</div>
                <div className="helps-lifecycle">{h.lifecycle}</div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
          <div className="helps-cta reveal">
            <p className="helps-cta-note">
              The educational content above is independent of our platform — the standards exist regardless of which solution you use.
              Fintegrity is a compliance infrastructure layer, not a dashboard.
            </p>
            <a
              className="btn btn-primary"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a product demo"
            >
              Talk to us about your readiness →
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ── */}
      <section className="res-section res-section-soft">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Common questions</div>
            <h2 className="sec-title">Frequently asked questions.</h2>
          </div>
          <div className="reveal" style={{ marginTop: '36px' }}>
            <Accordion items={faqItems} prefix="faq" />
          </div>
        </div>
      </section>

      {/* ── 11. Page integrity note ── */}
      <div className="page-integrity-note">
        <div className="wrap">
          <p>
            This guide is provided for education by Fintegrity Technology Limited. It summarises publicly available
            regulatory material sourced from CBN Circular BSD/DIR/PUB/LAB/019/002 (10 March 2026) and implementation
            guidance Circular CMD/DIR/PUB/CIR/001006 (31 March 2026). It is not legal advice. Always verify against
            the official CBN circulars and consult a qualified compliance professional. Last reviewed 14 June 2026.
          </p>
        </div>
      </div>
    </>
  )
}
