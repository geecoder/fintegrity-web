import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'what-transaction-monitoring-actually-is', text: 'What transaction monitoring actually is' },
    {
      type: 'p',
      text:
        'Transaction monitoring is the ongoing evaluation of customer transactions against a set of rules designed to surface money-laundering, fraud, or sanctions-evasion patterns. It is not the same thing as KYC (which happens at onboarding) or sanctions screening (which checks identities against lists) — though all three feed into the same overall compliance picture, and a mature setup evaluates them together rather than as disconnected systems.',
    },
    {
      type: 'p',
      text:
        'In practice, transaction monitoring for a Nigerian fintech has three layers: the rules that evaluate each transaction, the customer risk state that contextualises the evaluation, and the workflow that turns a rule firing into an investigated, documented decision.',
    },

    { type: 'h2', id: 'the-rule-types-that-actually-matter', text: 'The rule types that actually matter' },
    { type: 'p', text: 'Most monitoring programmes converge on a similar core rule set, tuned to the business model:' },
    {
      type: 'bullets',
      items: [
        "**Velocity rules** — flag an unusual number or value of transactions in a rolling window, relative to the customer's own baseline, not a flat threshold.",
        '**Structuring detection** — identify sequences of transactions designed to stay under reporting thresholds.',
        '**New-account monitoring** — apply elevated sensitivity to accounts in their first 30–90 days, where mule-account abuse concentrates.',
        '**Counterparty aggregation** — treat transactions to the same counterparty across a window as one economic event, not isolated data points.',
        "**Behavioural anomaly** — compare a transaction to the customer's own historical pattern, not just a fixed rule.",
      ],
    },
    {
      type: 'p',
      text:
        "None of these rules work well in isolation. A velocity rule without counterparty aggregation misses structuring across multiple recipients. New-account monitoring without behavioural baselines can't distinguish a legitimately active new customer from an abusive one. The rules need to work as a system.",
    },
    {
      type: 'p',
      text:
        "**Rules without a risk-state layer just generate noise.** A ₦200,000 transfer means something different from a customer with a ₦5,000 average transaction size than one who regularly moves ₦300,000. Monitoring that ignores customer context drowns your analysts in false positives.",
    },

    { type: 'h2', id: 'from-alert-to-decision', text: 'From alert to decision' },
    {
      type: 'p',
      text:
        "A rule firing is not, by itself, a compliance outcome — it's the start of a workflow. What happens next determines whether monitoring is actually effective:",
    },
    {
      type: 'numbered',
      items: [
        '**The rule fires and a decision is returned** — ideally before the transaction settles, not after.',
        '**The decision routes to the right place.** A CLEAR decision needs no human involvement. FLAGGED proceeds but opens a case for review. HELD_FOR_REVIEW or BLOCKED requires action before or instead of execution.',
        '**An analyst investigates** with the evaluation context already attached — which rule fired, the customer\'s risk state, related transaction history — rather than starting from a raw transaction log.',
        '**A disposition is recorded** — the case is closed, escalated, or results in an STR filing, and that decision itself becomes part of the evidence record.',
      ],
    },

    { type: 'h2', id: 'what-a-regulator-actually-expects-to-see', text: 'What a regulator actually expects to see' },
    {
      type: 'p',
      text:
        "When the CBN or NFIU asks about a specific transaction or customer, the answer that holds up is a contemporaneous record: what rules evaluated the transaction, what the customer's risk state was at that moment, what decision was made, and when — not a narrative reconstructed after the fact from scattered logs and spreadsheets.",
    },
    {
      type: 'p',
      text:
        "This means the evidence requirement isn't just about generating alerts — it's about writing an immutable record of every evaluation, including the CLEAR decisions that never became alerts. A regulator asking \"how was this specific transaction handled?\" deserves an answer for the clean transactions too, not just the flagged ones.",
    },

    { type: 'h2', id: 'where-to-start-if-you-are-building-this-today', text: "Where to start if you're building this today" },
    {
      type: 'p',
      text:
        "If your fintech is still relying on manual review or a basic rules list, the practical starting point isn't a complete rebuild — it's:",
    },
    {
      type: 'bullets',
      items: [
        'Get a real-time decision in the critical path for your highest-risk transaction types first.',
        'Establish one authoritative customer risk state, rather than scattered flags across systems.',
        'Make sure every decision — including CLEAR — writes to an evidence record automatically, not manually.',
        "Build the case-management workflow before you need it for an examiner request, not during one.",
      ],
    },
    {
      type: 'p',
      text:
        'This is exactly the architecture Fintegrity is built around — see how our transaction monitoring works or how it fits specifically for the Nigerian market.',
    },
  ],
}

export default content
