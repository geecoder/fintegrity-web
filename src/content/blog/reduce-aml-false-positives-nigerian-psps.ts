import type { ArticleContent } from './types'

const content: ArticleContent = {
  cta: {
    title: 'Simulate rule changes before deploying',
    body: 'Test against real transaction history before a rule ever affects a live decision.',
  },
  blocks: [
    { type: 'h2', id: 'why-false-positives-are-a-compliance-problem', text: "Why false positives are a compliance problem, not just an ops one" },
    {
      type: 'p',
      text:
        "It's tempting to treat a high false-positive rate as a resourcing issue — hire more analysts, work through the backlog faster. But alert fatigue has a direct compliance consequence: analysts reviewing hundreds of low-quality alerts a day develop pattern-matching shortcuts that cause them to miss the genuine positives buried in the noise. A monitoring system that generates too many false positives is, functionally, a monitoring system that catches less real risk than a well-tuned one with a lower alert volume.",
    },

    { type: 'h2', id: 'where-false-positives-actually-come-from', text: 'Where false positives actually come from' },
    { type: 'p', text: 'In PSP environments specifically, false positives tend to cluster around a few root causes:' },
    {
      type: 'bullets',
      items: [
        '**Flat thresholds applied to a diverse merchant base.** A velocity rule tuned for a small merchant flags every transaction from a high-volume merchant as anomalous — because the rule has no concept of merchant-specific baselines.',
        "**No behavioural baseline per customer.** Rules that compare against a fixed number rather than the customer's own transaction history flag routine activity for active customers and miss genuinely anomalous activity for quiet ones.",
        '**Duplicate alerts across disconnected systems.** When screening, monitoring, and fraud tools each generate separate alerts for the same underlying transaction, analysts review the same event three times under three different labels.',
        "**Rules that were never revisited after go-live.** Default configurations are a starting point, not a permanent setting — and most teams don't have a process for periodically reviewing rule performance.",
      ],
    },

    { type: 'h2', id: 'tuning-approaches-that-actually-work', text: 'Tuning approaches that actually work' },
    {
      type: 'numbered',
      items: [
        "**Segment thresholds by merchant/customer profile, not one flat rule.** A rule that scales with the customer or merchant's own historical volume catches genuine anomalies for both high- and low-volume accounts, instead of being tuned to the average and missing both extremes.",
        '**Simulate before you deploy.** Run a proposed rule change against recent historical transactions before it goes live, and look at the actual alert volume and estimated false-positive rate it would have produced — not just whether it "seems reasonable."',
        '**Deduplicate at the decision layer.** If screening, monitoring, and fraud detection converge into a single decision rather than three separate alert streams, analysts see one case with full context instead of three fragments of it.',
        '**Review rule performance on a schedule, not reactively.** A quarterly review of which rules are firing, at what volume, and with what disposition rate tells you which rules need retuning before they become a backlog problem.',
      ],
    },
    {
      type: 'p',
      text:
        '**Tuning down noise is not the same as loosening controls.** A rule that fires on genuine risk with fewer false positives is a better control than a loose rule that fires constantly on low-quality signals. The goal is precision, not volume.',
    },

    { type: 'h2', id: 'where-simulation-and-configuration-help', text: 'Where simulation and configuration help' },
    {
      type: 'p',
      text:
        "This is precisely why Fintegrity's Rules Engine supports simulating a rule change against historical transaction data before it affects a live decision — so tuning is evidence-based, not guesswork, and your PSP-specific configuration can evolve as your merchant base and transaction patterns do.",
    },
  ],
}

export default content
