import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'a-log-is-not-an-audit-trail', text: 'A log is not an audit trail' },
    {
      type: 'p',
      text:
        "Most systems have some form of logging — a record that a transaction happened, when, and for how much. That's a transaction log. An audit trail, in the sense a regulator means it, is a different and stricter thing: a record of the decision made about a transaction, the reasoning behind it, and proof that record hasn't been altered since it was written.",
    },
    {
      type: 'p',
      text:
        'The distinction matters because a log answers "what happened," while an examiner is usually asking "why did you let this happen, and can you prove your controls were actually applied at the time?"',
    },

    { type: 'h2', id: 'three-properties-a-defensible-audit-trail-needs', text: 'Three properties a defensible audit trail needs' },
    {
      type: 'numbered',
      items: [
        "**Contemporaneous, not reconstructed.** The record needs to be written at the moment the decision was made — not assembled afterward from scattered sources when an examiner asks. A narrative built after the fact, however accurate, carries less weight than a timestamped record created in the moment.",
        "**Complete, including the clean decisions.** Evidence only for flagged or blocked transactions leaves a gap — a regulator asking about a specific transaction that was allowed to proceed deserves an answer showing it was actually evaluated, not just that nothing happened.",
        '**Tamper-evident.** The record needs to be structured so that any after-the-fact alteration is detectable — an append-only store, ideally with cryptographic verification, rather than a mutable database row that could theoretically be edited after the fact.',
      ],
    },
    {
      type: 'quote',
      text:
        '**"We reviewed it and it looked fine" is not evidence.** A defensible audit trail shows what rules ran, what the customer\'s risk state was at that exact moment, what the decision was, and when — not a summary written after the question was asked.',
    },

    { type: 'h2', id: 'what-should-actually-be-captured-per-decision', text: 'What should actually be captured per decision' },
    {
      type: 'bullets',
      items: [
        'Transaction identifiers, amount, currency, and channel',
        'Counterparty identity and type',
        'Customer risk state at the exact moment of the decision — not the current state, the state then',
        'Every rule evaluated and its individual result, not just the final outcome',
        'The final decision and the required action issued to the payment system',
        'A server-side, immutable timestamp',
        'The rule/configuration version in force at that moment',
      ],
    },
    {
      type: 'p',
      text:
        'That last point is easy to overlook and important: if your rules change over time (as they should), the evidence record needs to show which version of the rules produced a given historical decision — not the current configuration, which may have since changed.',
    },

    { type: 'h2', id: 'from-raw-records-to-an-evidence-pack', text: 'From raw records to an evidence pack' },
    {
      type: 'p',
      text:
        "An examiner request rarely wants raw database rows — it wants a complete, readable pack for a specific customer, transaction, or time period: every relevant decision, in order, with the reasoning attached, ideally producible in the format the examiner actually wants (PDF or structured JSON) on demand, not after a multi-day internal reconstruction effort.",
    },
    {
      type: 'p',
      text:
        "This is the architecture behind Fintegrity's audit trail and reporting — append-only, tamper-evident, and generating evidence packs on demand for any customer, transaction, or case, straight from the Compliance Decision API.",
    },
  ],
}

export default content
