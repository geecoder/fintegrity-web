import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'what-makes-cross-border-different', text: 'What makes cross-border different from domestic monitoring' },
    {
      type: 'p',
      text:
        "A domestic transaction has one regulatory regime, one currency, and a counterparty you can typically screen against a single set of lists. A cross-border remittance transaction has two regulatory regimes (origin and destination), a currency conversion that can obscure value-based thresholds, and sanctions/PEP exposure across both jurisdictions' relevant lists — plus whatever correspondent banking relationships sit between them.",
    },

    { type: 'h2', id: 'corridor-level-risk-not-just-transaction-level', text: 'Corridor-level risk, not just transaction-level' },
    {
      type: 'p',
      text:
        "The single most important shift in mindset for cross-border monitoring is evaluating risk at the level of the corridor — the specific origin-destination pair — not just the individual transaction. A corridor with historically higher fraud or sanctions-evasion activity warrants tighter rules than a lower-risk corridor, even for transactions that look identical on paper.",
    },
    {
      type: 'p',
      text:
        'In practice, this means your rule configuration needs a corridor dimension: velocity and structuring thresholds that can be tuned per corridor, not one flat global rule applied uniformly regardless of where the money is going.',
    },

    { type: 'h2', id: 'dual-jurisdiction-reporting-exposure', text: 'Dual-jurisdiction reporting exposure' },
    {
      type: 'p',
      text:
        "A remittance operator moving funds between, for example, Nigeria and the UK needs to be aware of reporting obligations in both jurisdictions, which don't necessarily share the same thresholds, definitions, or filing timelines. Monitoring rules built only around one side's requirements can create a genuine compliance gap on the other side.",
    },
    {
      type: 'p',
      text:
        "**Sanctions exposure compounds across a corridor.** Screening needs to check relevant lists for both the origin and destination jurisdiction — and, where correspondent banks are involved, their jurisdiction too — not just the list your own institution is directly obligated to check.",
    },

    { type: 'h2', id: 'patterns-specific-to-remittance-abuse', text: 'Patterns specific to remittance abuse' },
    {
      type: 'bullets',
      items: [
        '**Structuring across multiple senders to one recipient.** Several unrelated-looking senders funding a single recipient can indicate a collection network rather than genuine independent remittances.',
        '**Rapid re-remittance.** Funds received in the destination country and immediately re-sent onward, often to a third jurisdiction — a layering pattern specific to cross-border flows.',
        '**Round-tripping.** Funds sent out and returned through a different corridor shortly after, a pattern with limited legitimate rationale.',
      ],
    },

    { type: 'h2', id: 'building-this-into-your-decision-architecture', text: 'Building this into your decision architecture' },
    {
      type: 'p',
      text:
        "None of this requires a separate monitoring system for cross-border flows — it requires the same decision layer that handles domestic transactions to carry corridor and dual-jurisdiction context as part of its evaluation, rather than treating cross-border as an exception handled manually.",
    },
    {
      type: 'p',
      text:
        "That's the model behind Fintegrity's remittance configuration — corridor-level rules, dual-regime screening, and the same immutable evidence architecture as every other transaction type, applied to the specific patterns cross-border operators actually face.",
    },
  ],
}

export default content
