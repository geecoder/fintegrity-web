import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'why-wallet-abuse-looks-different', text: 'Why wallet abuse looks different' },
    {
      type: 'p',
      text:
        'Wallets combine three things that make them attractive to bad actors: low onboarding friction, high transaction velocity, and — often — weaker transaction-layer controls than traditional bank accounts. The abuse patterns that follow are specific, and a rule library built for slower-moving bank transactions misses most of them.',
    },

    { type: 'h2', id: 'mule-account-networks', text: 'Mule account networks' },
    {
      type: 'p',
      text:
        'A mule account is funded, funds are swept out within hours, and the account goes dormant or is abandoned. By the time a standard batch monitoring cycle would catch it, the money has already moved through several hops.',
    },
    {
      type: 'p',
      text:
        'The rule that catches this is **new-account velocity monitoring**: elevated sensitivity in the first 30 days after account creation, specifically watching for a large inbound transfer followed quickly by outbound sweeps to multiple recipients. This pattern is rare for legitimate new users and common for mule networks.',
    },

    { type: 'h2', id: 'rapid-in-out-layering', text: 'Rapid in-out (layering)' },
    {
      type: 'p',
      text:
        'Funds received and immediately re-sent, often in smaller amounts to multiple counterparties — a classic layering pattern used to obscure the origin of funds. A rule watching for funds in and funds out within a short configurable window (commonly under an hour) catches this regardless of the specific amounts involved, since the pattern is about timing and fragmentation, not value.',
    },

    { type: 'h2', id: 'sub-threshold-structuring', text: 'Sub-threshold structuring' },
    {
      type: 'p',
      text:
        'Transactions deliberately kept below reporting thresholds — split across multiple transfers or multiple days to avoid triggering a currency transaction report. Catching this requires **counterparty and time-window aggregation**: treating a sequence of transactions to the same or related counterparties as a single economic event, not isolated transfers each individually under the threshold.',
    },

    { type: 'h2', id: 'velocity-gaming', text: 'Velocity gaming' },
    {
      type: 'p',
      text:
        "Distinct from structuring, velocity gaming is about volume rather than staying under a specific threshold — many transactions in rapid succession designed to overwhelm manual review capacity or exploit rate limits. Rules here look at transaction count per window, not just value, and correlate against the customer's own historical baseline rather than a flat number that's either too strict for active legitimate users or too loose to catch abuse.",
    },
    {
      type: 'p',
      text:
        '**None of these rules work well as flat, one-size-fits-all thresholds.** Every one of them needs to be evaluated against the customer\'s own behavioural baseline — a ₦50,000 transaction means something different for a customer who typically sends ₦5,000 than one who typically sends ₦500,000.',
    },

    { type: 'h2', id: 'kyc-tier-limits-enforced-at-the-transaction-layer', text: 'KYC tier limits, enforced at the transaction layer' },
    {
      type: 'p',
      text:
        "Wallets typically operate tiered KYC — different verification levels carrying different transaction and balance limits. The rule failure mode here isn't usually about the tier logic itself, it's that tier enforcement lives in application code rather than the compliance decision layer, which means a bug or an edge case in the payment handler can silently bypass it. Enforcing tier limits as a rule evaluated on every transaction — not a check baked into product code — closes that gap.",
    },

    { type: 'h2', id: 'putting-it-together', text: 'Putting it together' },
    {
      type: 'p',
      text:
        "None of these rule types is exotic — the challenge is running all of them, correctly correlated, on every transaction, in real time, without overwhelming your compliance team with false positives. That's the specific problem Fintegrity's wallet configuration is built around, evaluated through the same Compliance Decision API that handles every other transaction type.",
    },
  ],
}

export default content
