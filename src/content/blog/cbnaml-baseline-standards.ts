import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'disclaimer', text: 'Disclaimer' },
    {
      type: 'p',
      text:
        "This article is educational and reflects Fintegrity's understanding of publicly available CBN guidance. It is not legal advice. Verify all regulatory requirements against official CBN and NFIU circulars and consult a qualified compliance professional before making compliance decisions.",
    },

    { type: 'h2', id: 'why-this-matters-now', text: 'Why this matters now' },
    {
      type: 'p',
      text:
        "The CBN's AML/CFT Baseline Standards aren't new — but enforcement has shifted. The question regulators are now asking isn't \"do you have a policy?\" It's \"show me the evidence that this transaction was reviewed before it processed.\" That shift from policy compliance to evidence-based compliance is what makes the technology layer so important.",
    },
    {
      type: 'p',
      text:
        'For most Nigerian fintechs, the gap between "we have an AML programme" and "we can demonstrate every transaction was reviewed according to it" is large. This guide is about closing that gap — standard by standard.',
    },
    {
      type: 'quote',
      text:
        '**The key shift:** Regulators have moved from asking "do you have a policy?" to "can you prove every transaction was evaluated against it?" That requires technology, not documentation.',
    },

    { type: 'h2', id: 'the-12-standards-at-a-glance', text: 'The 12 standards at a glance' },
    {
      type: 'p',
      text:
        "The CBN's Baseline Standards cover 12 distinct requirements. They range from institutional-level programme requirements (S-01, S-11, S-12) to transaction-level controls (S-04, S-05, S-07, S-08) to recordkeeping and reporting requirements (S-06, S-07, S-09). Not all of them are technology problems — but most of the operational ones are.",
    },
    {
      type: 'labeledCards',
      items: [
        {
          label: 'S-01: AML/CFT Programme',
          body:
            'Fintechs must maintain a documented AML/CFT programme covering policies, procedures, and controls. Technology role: provides the controls infrastructure the programme document references.',
        },
        {
          label: 'S-02: Customer Due Diligence (CDD)',
          body:
            'Know your customer — BVN/NIN verification, identity checks, and risk classification at onboarding. Technology role: enforces tier limits based on CDD level at the transaction layer.',
        },
        {
          label: 'S-03: Enhanced Due Diligence (EDD)',
          body:
            'Stricter checks for high-risk customers, PEPs, and high-value relationships. Technology role: flags transactions from EDD-classified customers for elevated monitoring and review.',
        },
        {
          label: 'S-04: Ongoing Monitoring',
          body:
            'Continuous monitoring of customer transactions for suspicious patterns. Technology role: the core function of a transaction monitoring system operating in real time.',
        },
        {
          label: 'S-05: Transaction Monitoring',
          body:
            'Specific requirement for automated monitoring of transactions against configured scenarios. Technology role: automated rule evaluation, pattern detection, and alert generation.',
        },
        {
          label: 'S-06: Suspicious Transaction Reporting (STR)',
          body:
            'Timely filing of STRs/SARs for transactions that raise suspicion. Technology role: case management provides the evidence base for STR documentation.',
        },
        {
          label: 'S-07: Currency Transaction Reporting (CTR)',
          body:
            'Filing reports for cash transactions above NFIU thresholds (₦5M individuals, ₦10M corporates). Technology role: automatic threshold detection and reporting workflow.',
        },
        {
          label: 'S-08: Sanctions Screening',
          body:
            'Screening customers and counterparties against sanctions lists, PEP databases, and watchlists. Technology role: orchestrates screening provider calls and integrates results into the decision.',
        },
        {
          label: 'S-09: Record Keeping',
          body:
            'Retention of transaction records, CDD documentation, and STR/CTR filings for prescribed periods. Technology role: append-only evidence store with configurable retention periods.',
        },
        {
          label: 'S-10: Training',
          body:
            'Regular AML/CFT training for all relevant staff. Technology role: outside the scope of transaction monitoring technology, but case management workflows build analyst capability.',
        },
        {
          label: 'S-11: Risk Assessment',
          body:
            'Institution-level and customer-level risk assessments. Technology role: customer risk profiling and risk state management inform and operationalise the risk assessment.',
        },
        {
          label: 'S-12: Independent Audit',
          body:
            'Periodic independent testing of the AML/CFT programme. Technology role: audit trail, evidence packs, and decision records are the primary evidence for independent audit.',
        },
      ],
    },

    { type: 'h2', id: 'ongoing-monitoring-and-transaction-monitoring', text: 'S-04 and S-05: ongoing monitoring and transaction monitoring' },
    {
      type: 'p',
      text:
        'These two standards are where most Nigerian fintechs have the biggest gap. S-04 requires continuous, ongoing monitoring of customer transactions. S-05 goes further: it specifically requires automated transaction monitoring against configured scenarios.',
    },
    {
      type: 'p',
      text:
        '"Automated" is the operative word. A compliance officer manually reviewing a daily report is not automated monitoring — and it\'s not ongoing. The direction of CBN guidance is toward real-time, pre-authorisation controls that evaluate transactions before they complete.',
    },
    {
      type: 'p',
      text:
        'What "configured scenarios" means in practice: velocity rules (too many transactions in a rolling window), amount thresholds (absolute or relative), structuring patterns (sub-threshold sequences), and account-age rules (new accounts behaving like mule accounts). These scenarios should be configured to your specific business model — the patterns that matter for a digital wallet are different from those that matter for a remittance company.',
    },
    {
      type: 'quote',
      text:
        '**S-05 requires "automated transaction monitoring."** A compliance officer reading a spreadsheet is not automated monitoring. Technology that evaluates every transaction against configured scenarios before it executes is.',
    },

    { type: 'h2', id: 'currency-transaction-reporting', text: 'S-07: currency transaction reporting' },
    {
      type: 'p',
      text:
        'NFIU requires Currency Transaction Reports (CTRs) for cash transactions above ₦5M (individuals) and ₦10M (corporates), filed within 7 days. Structuring to evade these thresholds — breaking transactions into smaller amounts — is itself an offence under MLPPA 2022.',
    },
    {
      type: 'p',
      text:
        'From a technology perspective, CTR compliance requires three things: threshold detection (identifying transactions at or above the reporting threshold), structuring detection (identifying patterns designed to stay below it), and a workflow for generating and filing the report. All three should be automated, not manual.',
    },

    { type: 'h2', id: 'sanctions-screening', text: 'S-08: sanctions screening' },
    {
      type: 'p',
      text:
        'Every customer and counterparty should be screened against relevant sanctions lists (OFAC, UN, EU, NFIU), PEP databases, and adverse media sources. The CBN expects this screening to happen at onboarding and at intervals thereafter — and increasingly, on every transaction.',
    },
    {
      type: 'p',
      text:
        "The compliance technology role here is orchestration: not providing the screening data (that's your screening vendor's job), but calling the vendor, handling the response, integrating the result into the transaction decision, and creating a case when a hit is returned. Fintegrity plugs in your existing screening provider and incorporates the results into the real-time decision.",
    },

    { type: 'h2', id: 'record-keeping', text: 'S-09: record keeping' },
    {
      type: 'p',
      text:
        'CBN requires financial institutions to retain transaction records, CDD documentation, STR/CTR filings, and investigation records for prescribed periods. The key word is "retain" — but regulators increasingly expect records that are not just retained but retrievable, structured, and verifiable.',
    },
    {
      type: 'p',
      text:
        'An append-only evidence store where every decision, state change, and case action is written with a server-side timestamp satisfies this requirement in a way that a spreadsheet archive does not.',
    },

    { type: 'h2', id: 'standards-technology-does-not-address', text: "The standards technology doesn't address" },
    {
      type: 'p',
      text:
        'S-10 (training) and parts of S-01 (programme documentation) and S-12 (independent audit) are not technology problems. They require human expertise, internal governance, and qualified compliance professionals.',
    },
    {
      type: 'p',
      text:
        "Fintegrity is explicit about this boundary: we provide the controls infrastructure that your AML programme references and that your auditors test. We're not your MLRO and we don't replace your compliance team. We give them better tools and better evidence.",
    },
    {
      type: 'quote',
      text:
        '**The compliance technology boundary:** Technology addresses the operational and controls requirements (S-04, S-05, S-07, S-08, S-09). Programme documentation, training, and independent audit are governance responsibilities that require qualified human expertise.',
    },

    { type: 'h2', id: 'a-practical-implementation-roadmap', text: 'A practical implementation roadmap' },
    {
      type: 'p',
      text: "If you're a Nigerian fintech looking to close your compliance gap, the practical order of priority is usually:",
    },
    {
      type: 'numbered',
      items: [
        '**Get the decision layer in place first.** A real-time decision API (S-04/S-05) gives you the infrastructure everything else plugs into.',
        '**Wire in sanctions screening** via your existing provider (S-08). This can be done alongside or immediately after the decision layer.',
        '**Configure your rule library** to your specific scenarios — velocity, thresholds, structuring patterns (S-05). Start with the highest-risk patterns for your business model.',
        '**Build out case management** for investigation and STR workflow (S-06). This is where your compliance team lives.',
        '**Verify your record-keeping** approach covers the retention periods and retrieval requirements of S-09.',
      ],
    },
    {
      type: 'p',
      text:
        "This roadmap reflects Fintegrity's product architecture and is not a substitute for qualified compliance advice. The order and scope of implementation should be validated against your specific regulatory classification, licence conditions, and MLRO guidance.",
    },

    { type: 'h2', id: 'what-fintegrity-addresses', text: 'What Fintegrity addresses' },
    {
      type: 'p',
      text:
        "Fintegrity's platform is designed to address the technology-addressable standards directly: real-time decision API and transaction monitoring (S-04, S-05), screening orchestration (S-08), automated threshold detection (S-07), case management and STR workflow (S-06), and append-only evidence recordkeeping (S-09). The programme documentation (S-01), training (S-10), risk assessment (S-11), and independent audit (S-12) remain your responsibility — Fintegrity gives your auditors the evidence they need to assess the controls.",
    },
  ],
}

export default content
