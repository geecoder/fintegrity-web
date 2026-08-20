import type { ArticleContent } from './types'

const content: ArticleContent = {
  cta: {
    title: 'See the full platform, not just a rules engine',
    body: 'Rules, evidence, and case management — one platform, not three purchases.',
  },
  blocks: [
    { type: 'h2', id: 'why-building-it-yourself-is-tempting', text: 'Why building it yourself is tempting' },
    {
      type: 'p',
      text:
        "A transaction-monitoring engine, at its core, doesn't sound complicated: evaluate a transaction against some rules, return a decision. For an engineering team that builds core payment infrastructure already, it can look like a natural extension — no vendor dependency, full control over the rule logic, no per-transaction pricing.",
    },
    {
      type: 'p',
      text: 'The initial rule engine is, in fact, usually the easy part. The cost that catches teams off guard is everything downstream of it.',
    },

    { type: 'h2', id: 'what-the-initial-build-does-not-include', text: "What the initial build doesn't include" },
    {
      type: 'bullets',
      items: [
        "**Ongoing rule maintenance.** Rules that were correct at launch drift out of date as your customer base, transaction volumes, and abuse patterns evolve. Someone needs to own tuning them — indefinitely, not once.",
        "**Evidence architecture.** A rule engine that makes decisions isn't the same as one that produces regulator-ready evidence — immutable, complete (including clean decisions), and queryable on demand. Building that properly is a separate, non-trivial engineering effort in itself.",
        '**Case management workflow.** Alerts need somewhere to go — a structured investigation workflow with assignment, escalation, and disposition tracking. This is often underestimated as "we\'ll just use a spreadsheet for now," which rarely ages well.',
        "**Simulation and testing infrastructure.** Safely changing a rule in production requires the ability to test it against historical data first — its own engineering investment, separate from the rule engine itself.",
        '**Keeping pace with regulatory change.** Thresholds, reporting requirements, and expectations shift over time, and someone needs to track that and translate it into configuration changes — an ongoing compliance-plus-engineering cost, not a one-time build.',
      ],
    },
    {
      type: 'quote',
      text:
        '**The rule engine is maybe 20% of the actual system.** Evidence architecture, case management, simulation, and ongoing tuning are the other 80% — and they don\'t stop being a cost after go-live.',
    },

    { type: 'h2', id: 'when-building-in-house-genuinely-makes-sense', text: 'When building in-house genuinely makes sense' },
    {
      type: 'p',
      text:
        "Build can be the right call when your transaction patterns are genuinely unusual enough that no configurable third-party rules engine fits, when you have sustained engineering capacity to dedicate to it indefinitely (not just for the initial build), or when compliance technology is itself your core product differentiator rather than infrastructure supporting a different core product.",
    },
    {
      type: 'p',
      text:
        "For most fintechs — where compliance is necessary infrastructure but not the product itself — the ongoing maintenance burden outweighs the control benefit, especially once you account for opportunity cost: engineering time spent maintaining a rules engine is engineering time not spent on your actual product.",
    },

    { type: 'h2', id: 'if-you-buy-what-to-actually-evaluate', text: 'If you buy, what to actually evaluate' },
    {
      type: 'bullets',
      items: [
        "Configurable rules with simulation against historical data — not a fixed rule set you can't adjust.",
        "An evidence architecture that's immutable and complete by default, not something you have to build on top of the vendor.",
        'Case management included, not a separate purchase or a gap you fill with a spreadsheet.',
        'Sub-100ms decision latency if you need real-time, pre-authorisation monitoring rather than batch.',
        "Ownership of your own rule configuration — you shouldn't need to file a support ticket to change a threshold.",
      ],
    },
    {
      type: 'p',
      text:
        "That's the list Fintegrity is built against — see the Rules Engine, evidence architecture, and case management that come as one platform, not three separate purchases.",
    },
  ],
}

export default content
