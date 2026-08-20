import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'what-transaction-screening-does', text: 'What transaction screening does' },
    {
      type: 'p',
      text:
        "Transaction screening checks the parties to a transaction — sender, recipient, and any intermediaries — against sanctions lists, PEP (politically exposed person) lists, and adverse-media sources. It answers one question: is anyone involved in this transaction someone we're prohibited or required to take extra care with?",
    },
    {
      type: 'p',
      text:
        "Screening is identity-focused and largely binary at the point of decision: a name either matches a list entry (or matches closely enough to require review) or it doesn't. It typically runs against every transaction, but it isn't looking at transaction behaviour at all.",
    },

    { type: 'h2', id: 'what-transaction-monitoring-does', text: 'What transaction monitoring does' },
    {
      type: 'p',
      text:
        "Transaction monitoring evaluates behaviour — the pattern, timing, value, and context of transactions over time — looking for signs of money laundering, fraud, or structuring that have nothing to do with who the parties are. A monitoring rule doesn't care whether the sender is on a sanctions list; it cares whether this transaction is unusual for this customer, or whether it fits a known abuse pattern like rapid in-out or velocity gaming.",
    },
    {
      type: 'p',
      text:
        'Where screening is a lookup, monitoring is an evaluation against rules, thresholds, and behavioural baselines — inherently more complex and more prone to false positives if not tuned well.',
    },
    {
      type: 'p',
      text:
        '**Screening asks "who is this?". Monitoring asks "is this normal?".** A transaction can pass screening cleanly — no sanctioned party involved — and still be exactly the kind of behaviour monitoring exists to catch, and vice versa.',
    },

    { type: 'h2', id: 'why-you-need-both-not-one', text: 'Why you need both, not one' },
    {
      type: 'p',
      text:
        "A fintech that only screens is blind to structuring, mule accounts, and behavioural anomalies committed by parties who aren't on any list — which describes most domestic money-laundering activity. A fintech that only monitors misses the specific, binary risk of transacting with a sanctioned or high-risk party, which carries its own severe regulatory consequences regardless of whether the transaction pattern looks otherwise ordinary.",
    },
    {
      type: 'p',
      text:
        'The two are complementary layers of the same decision, and the strongest architecture treats them that way: screening results and monitoring rule outcomes feeding into one compliance decision, rather than two disconnected systems that a compliance analyst has to reconcile manually.',
    },

    { type: 'h2', id: 'what-this-looks-like-combined', text: 'What this looks like combined' },
    {
      type: 'p',
      text:
        "In a combined architecture, a single transaction evaluation might run: a screening check against sanctions/PEP/adverse-media lists, a set of monitoring rules against behavioural patterns, and a check against the customer's KYC tier limit — all in parallel, converging into one decision (CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED) with a single evidence record showing exactly which check contributed to the outcome.",
    },
    {
      type: 'p',
      text:
        "That's the model behind both Fintegrity's screening and transaction monitoring capabilities — orchestrated into the same decision rather than run as separate, disconnected processes.",
    },
  ],
}

export default content
