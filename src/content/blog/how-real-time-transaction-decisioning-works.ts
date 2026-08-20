import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'the-call-that-starts-it', text: 'The call that starts it' },
    {
      type: 'p',
      text:
        'Before your payment handler executes a transaction, it makes one synchronous API call to the decision layer with the transaction context: customer identifier, amount, currency, counterparty, and channel. The payment handler then waits — briefly — for a decision before proceeding.',
    },
    {
      type: 'p',
      text:
        'Everything described below has to complete within that wait, which is why architecture and latency budget matter as much as rule logic.',
    },

    { type: 'h2', id: 'what-runs-in-parallel-inside-that-call', text: 'What runs, in parallel, inside that call' },
    { type: 'p', text: "The evaluation isn't a single check — it's several running concurrently:" },
    {
      type: 'bullets',
      items: [
        "**Customer risk state lookup.** The customer's current risk state, KYC tier, and any active restrictions are retrieved — this needs to be a fast lookup, not a slow query, since everything else depends on it.",
        "**Rule evaluation.** Every configured rule relevant to this transaction type runs against the transaction and the customer's recent history — velocity, structuring, behavioural anomaly, and any others configured.",
        '**Screening check.** The counterparty (and sender, if not already verified) is checked against sanctions, PEP, and adverse-media lists.',
        "**Tier/limit enforcement.** The transaction is checked against the customer's KYC tier limit and any other configured hard limits.",
      ],
    },
    {
      type: 'p',
      text:
        'These run in parallel, not sequentially, because running them one after another would make the latency budget impossible to hit at any meaningful scale.',
    },
    {
      type: 'quote',
      text:
        '**Latency budget is an architecture decision, not an afterthought.** A synchronous compliance call that takes 2 seconds adds 2 seconds to every payment in your product. Sub-100ms is achievable, but only if it\'s designed for from the start — not bolted onto a system built for batch processing.',
    },

    { type: 'h2', id: 'converging-on-one-decision', text: 'Converging on one decision' },
    {
      type: 'p',
      text:
        'Once every check completes, the results converge into a single decision using a defined precedence: BLOCKED outranks HELD_FOR_REVIEW, which outranks FLAGGED, which outranks CLEAR. If any single check produces a BLOCKED result — a sanctions match, say — that\'s the final decision regardless of what the other checks returned. This "most restrictive wins" logic is what keeps the combined decision defensible: no individual risk signal gets silently overridden by an unrelated clean result elsewhere.',
    },

    { type: 'h2', id: 'what-happens-after-the-decision-returns', text: 'What happens after the decision returns' },
    {
      type: 'decisionStates',
      items: [
        {
          state: 'CLEAR',
          text:
            'The payment handler proceeds. No human involvement, but the decision and its full reasoning are still written to the evidence store.',
        },
        {
          state: 'FLAGGED',
          text:
            "The payment handler proceeds, but a case is opened for review — the transaction isn't blocked, but it's not silently ignored either.",
        },
        {
          state: 'HELD_FOR_REVIEW',
          text: "The transaction is held pending review before it's allowed to proceed.",
        },
        {
          state: 'BLOCKED',
          text:
            'The transaction is declined (and reversed, if it had already partially executed) and a case is opened automatically.',
        },
      ],
    },

    { type: 'h2', id: 'writing-the-evidence-without-adding-to-the-latency', text: 'Writing the evidence, without adding to the latency' },
    {
      type: 'p',
      text:
        "Writing the full evidence record — every rule evaluated, the customer state at that moment, the final decision — happens asynchronously relative to returning the decision to your payment handler, so evidence-writing doesn't add to the latency your users experience, while still completing fast enough that the record exists before any follow-up query would reasonably need it.",
    },
    {
      type: 'p',
      text:
        "This is the pipeline behind Fintegrity's Compliance Decision API — parallel evaluation, a defined precedence for the final decision, and evidence written automatically to the audit trail, all inside a sub-100ms P99 budget.",
    },
  ],
}

export default content
