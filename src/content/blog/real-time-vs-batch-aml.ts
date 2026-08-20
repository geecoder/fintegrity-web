import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'the-standard-approach-and-why-it-breaks', text: 'The standard approach and why it breaks' },
    {
      type: 'p',
      text:
        'The standard AML monitoring approach at most Nigerian fintechs looks like this: transactions are processed in real time, a batch job runs overnight or at intervals during the day, the batch job applies rules to the transaction history, and alerts are generated for anything suspicious. The compliance team reviews the alerts the next morning.',
    },
    {
      type: 'p',
      text:
        'This approach made sense when transaction volumes were low and speeds were slow. It does not make sense for a digital wallet processing 100,000 transactions a day and settling in under a minute.',
    },
    { type: 'p', text: 'Three specific failure modes emerge at Nigerian fintech scale:' },
    {
      type: 'bullets',
      items: [
        '**The money has moved by the time you flag it.** Batch monitoring reviews completed transactions. If a transaction is suspicious, the funds have already settled. You can file an STR, but you cannot stop the transaction or reverse the funds without additional action — action that\'s now much harder to take.',
        '**Mule account abuse completes in hours.** A mule account is funded, funds are swept to multiple accounts, and the receiving accounts cash out — sometimes within two to three hours of the initial deposit. A T+1 batch run never catches this pattern while any recovery is possible.',
        '**Structuring windows collapse.** Structured transactions — amounts broken up to stay below CTR thresholds — can be completed within a single day. Batch monitoring that looks at daily aggregates may never aggregate across the full pattern.',
      ],
    },
    {
      type: 'quote',
      text:
        '**By the time a batch run flags a mule account, the money is gone.** The window between a suspicious transaction and an irreversible one is often hours. Batch monitoring misses it every time.',
    },

    { type: 'h2', id: 'what-real-time-actually-means', text: 'What "real-time" actually means' },
    {
      type: 'p',
      text:
        'Real-time monitoring in the context of AML compliance has a specific architectural meaning: the evaluation happens before the transaction is authorised, not after it completes. This is the pre-authorisation model.',
    },
    {
      type: 'p',
      text:
        'The implementation pattern: before your payment handler executes a debit or credit, it makes a synchronous call to the compliance decision layer. The compliance layer evaluates the transaction — customer state, rules, patterns — and returns a decision. The payment handler acts on the decision. If the decision is BLOCKED, the transaction never executes.',
    },
    {
      type: 'p',
      text:
        "The alternative is the post-authorisation model: the transaction executes first, and the compliance evaluation happens after. This is where batch monitoring lives, and it's where the failure modes described above live too.",
    },
    { type: 'p', text: "Pre-authorisation compliance has several requirements that batch monitoring doesn't:" },
    {
      type: 'bullets',
      items: [
        '**Low latency.** A synchronous compliance call that takes 2 seconds adds 2 seconds to your payment flow. Sub-50ms P99 is the minimum viable target.',
        '**High availability.** If your compliance layer is down, your payment flow is blocked. Uptime requirements are at least as strict as your payment infrastructure.',
        '**Stateless evaluation.** Each decision call must be self-contained. The compliance layer looks up state (customer risk state, transaction history) rather than relying on shared session state.',
      ],
    },

    { type: 'h2', id: 'the-evidence-argument-for-pre-authorisation', text: 'The evidence argument for pre-authorisation' },
    {
      type: 'p',
      text:
        'Beyond preventing harm, pre-authorisation monitoring makes a stronger compliance argument than post-authorisation monitoring.',
    },
    {
      type: 'p',
      text:
        'When a regulator asks "how did you handle this transaction?", the best answer is: "Before it executed, our system evaluated it against our configured rules and made a decision. Here is the decision record, timestamped before the transaction completed, showing what rules ran and what we decided."',
    },
    {
      type: 'p',
      text:
        'The post-authorisation answer is: "The transaction processed. Our batch job later identified it as suspicious and we filed an STR." The first answer shows a control. The second shows a detection — after the fact.',
    },
    {
      type: 'p',
      text:
        'CBN guidance is explicit that regulated institutions should have effective transaction monitoring controls. Whether "effective" eventually mandates pre-authorisation monitoring explicitly is a question of regulatory interpretation — but the direction of travel is clear.',
    },
    {
      type: 'quote',
      text:
        '**Pre-authorisation monitoring produces evidence that a control was in place.** Post-authorisation monitoring produces evidence that a transaction was reviewed retrospectively. For a regulator, these are different things.',
    },

    { type: 'h2', id: 'practical-migration-path', text: 'Practical migration path' },
    {
      type: 'p',
      text: "If you're running batch monitoring today, moving to pre-authorisation isn't a one-day migration. The practical path:",
    },
    {
      type: 'numbered',
      items: [
        '**Start with the highest-risk transaction types.** Apply pre-authorisation monitoring to transfers above a threshold, withdrawals to new counterparties, or your highest-fraud-exposure flows first. Keep batch for everything else while you build confidence in the synchronous system.',
        '**Run both systems in parallel for a period.** Pre-authorisation in "observe mode" (decision is logged but not enforced) gives you a comparison baseline and confidence before you switch to enforcement.',
        '**Define your response to each decision state upfront.** Before going live, your engineering and product teams need clear, agreed behaviour for each decision state (CLEAR/FLAGGED/HELD_FOR_REVIEW/BLOCKED) in every transaction flow.',
        "**Tune, don't just deploy.** Default rule configurations are a starting point. High false-positive rates will undermine both your user experience and your compliance team's capacity. Plan for a tuning period with your compliance team.",
      ],
    },

    { type: 'h2', id: 'what-this-means-for-your-technology-stack', text: 'What this means for your technology stack' },
    {
      type: 'p',
      text:
        'Pre-authorisation AML monitoring requires an architecture decision: the compliance decision layer must be in the critical path of your payment processing. This is a meaningful change from batch monitoring, which runs offline.',
    },
    {
      type: 'p',
      text:
        'Fintegrity is designed for this architecture. The Decision API is synchronous and optimised for P99 latency under 50ms. It maintains the customer risk state and rule configuration so your payment handler can call it without session state. It handles its own availability so you can treat it like infrastructure, not a feature.',
    },
    {
      type: 'p',
      text:
        'The result: your payment handler makes one API call before executing. Everything else — rule evaluation, pattern detection, case creation, evidence writing — happens in Fintegrity, invisible to your users, before money moves.',
    },
  ],
}

export default content
