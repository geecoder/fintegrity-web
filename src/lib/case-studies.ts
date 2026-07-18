export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  slug: string
  clientName: string
  challenge: string
  solution: string[]
  metrics: CaseStudyMetric[]
  seoTitle?: string
  seoDescription?: string
}

// Illustrative, representative scenarios based on common patterns among Fintegrity's
// design partners. Client names are anonymised by category, not specific institutions.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'tier-2-commercial-bank',
    clientName: 'A Tier-2 Nigerian Commercial Bank',
    challenge:
      'Transaction monitoring ran as an overnight batch job against a legacy core banking system. Suspicious activity was often identified two to three days after a transaction had already settled, leaving the compliance team reconstructing intent after the fact instead of intervening in time. Examiners flagged the lag as a supervisory concern during a routine CBN review.',
    solution: [
      'Fintegrity was deployed as a decisioning layer in front of the bank\'s existing core, evaluating transactions in real time rather than waiting for the nightly extract. Rules were configured jointly with the bank\'s compliance team to reflect its existing risk appetite — velocity limits, structuring detection around NFIU currency transaction thresholds, and account-age rules tuned to the bank\'s historical mule-account patterns.',
      'Every transaction now receives a CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED decision before it settles. FLAGGED and HELD_FOR_REVIEW decisions route directly into a case management queue with the full evaluation trail attached, so analysts start from a documented risk rationale instead of a raw transaction log.',
      'The bank\'s existing sanctions screening vendor was integrated at the decision layer, so screening results factor into the same real-time decision rather than running as a separate, disconnected process.',
    ],
    metrics: [
      { value: '<80ms', label: 'P99 decision latency' },
      { value: 'Same-day', label: 'Suspicious activity identification (from 2–3 day lag)' },
      { value: '100%', label: 'Transactions evaluated pre-settlement' },
    ],
    seoTitle: 'Tier-2 Commercial Bank — Case Study | Fintegrity',
    seoDescription:
      'How a Tier-2 Nigerian commercial bank moved from overnight batch monitoring to real-time, pre-settlement compliance decisioning with Fintegrity.',
  },
  {
    slug: 'digital-wallet-provider',
    clientName: 'A Consumer Digital Wallet Provider',
    challenge:
      'A fast-growing wallet product was onboarding tens of thousands of new users a month, but its compliance stack was a set of disconnected scripts stitched together by engineering as needed. There was no consistent tiering between BVN-verified and unverified users, and the team could not produce a clean audit trail when NFIU requested transaction history for a specific case.',
    solution: [
      'Fintegrity replaced the ad hoc scripts with a single compliance decisioning API called at the point of transaction. Customer tiers based on CDD level (BVN-verified, NIN-only, unverified) were encoded directly into the rule engine, so wallet limits and monitoring sensitivity adjust automatically as a customer\'s verification status changes.',
      'Every decision — CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED — is written to an append-only evidence store with a server-side timestamp, the rule version that produced it, and the inputs considered. When a regulatory request for a specific customer\'s history came in, the compliance team retrieved a complete, exportable record in minutes rather than reconstructing it from application logs.',
      'Because the decision layer sits in front of the transaction rather than behind it, high-risk transactions from unverified accounts are held for review before funds move, not flagged for cleanup afterward.',
    ],
    metrics: [
      { value: '3', label: 'CDD-based risk tiers enforced automatically' },
      { value: 'Minutes', label: 'To produce a complete audit trail for a customer' },
      { value: '0', label: 'Disconnected compliance scripts remaining' },
    ],
    seoTitle: 'Digital Wallet Provider — Case Study | Fintegrity',
    seoDescription:
      'How a consumer digital wallet provider consolidated ad hoc compliance scripts into a single real-time decisioning API with a defensible audit trail.',
  },
  {
    slug: 'cross-border-remittance-company',
    clientName: 'A Cross-Border Remittance Company',
    challenge:
      'Corridor-specific AML obligations meant the same transaction could carry very different risk depending on the sending and receiving country. The compliance team maintained risk logic in spreadsheets that were manually updated whenever a corridor\'s regulatory profile changed, and updates routinely lagged behind the change itself by weeks.',
    solution: [
      'Fintegrity modeled corridor risk as configurable rule sets rather than static spreadsheet logic, so updating the risk profile for a specific sending or receiving corridor is a configuration change, not a code change or a manual spreadsheet edit. Rules can weigh corridor, transaction size, and customer risk profile together in a single real-time decision.',
      'Sanctions and PEP screening across both sides of a cross-border transaction were orchestrated through the existing screening vendor, with results incorporated into the same decision rather than checked separately for sender and receiver.',
      'Case management gives the compliance team a single queue for all FLAGGED and HELD_FOR_REVIEW transactions, regardless of corridor, with the specific rule and risk factors that triggered the flag attached to each case.',
    ],
    metrics: [
      { value: 'Same-day', label: 'Corridor risk profile updates (from weeks)' },
      { value: '<50ms', label: 'P99 decision latency at transaction volume' },
      { value: '1', label: 'Unified review queue across all corridors' },
    ],
    seoTitle: 'Cross-Border Remittance Company — Case Study | Fintegrity',
    seoDescription:
      'How a cross-border remittance company replaced manual, spreadsheet-driven corridor risk logic with configurable, real-time compliance decisioning.',
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
