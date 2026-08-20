import type { ArticleContent } from './types'

import cbnamlBaselineStandards from './cbnaml-baseline-standards'
import allowReviewBlockComplianceDecisions from './allow-review-block-compliance-decisions'
import realTimeVsBatchAml from './real-time-vs-batch-aml'
import amlTransactionMonitoringGuideNigeria from './aml-transaction-monitoring-guide-nigeria'
import transactionMonitoringRulesDigitalWallets from './transaction-monitoring-rules-digital-wallets'
import transactionScreeningVsMonitoring from './transaction-screening-vs-monitoring'
import reduceAmlFalsePositivesNigerianPsps from './reduce-aml-false-positives-nigerian-psps'
import regulatorReadyAuditTrailPaymentDecisions from './regulator-ready-audit-trail-payment-decisions'
import amlCaseManagementAlertToDisposition from './aml-case-management-alert-to-disposition'
import monitorCrossBorderRemittanceTransactions from './monitor-cross-border-remittance-transactions'
import buildVsBuyTransactionMonitoringEngine from './build-vs-buy-transaction-monitoring-engine'
import howRealTimeTransactionDecisioningWorks from './how-real-time-transaction-decisioning-works'
import complianceChecklistDigitalWalletLaunchNigeria from './compliance-checklist-digital-wallet-launch-nigeria'

export const ARTICLE_CONTENT: Record<string, ArticleContent> = {
  'cbnaml-baseline-standards': cbnamlBaselineStandards,
  'allow-review-block-compliance-decisions': allowReviewBlockComplianceDecisions,
  'real-time-vs-batch-aml': realTimeVsBatchAml,
  'aml-transaction-monitoring-guide-nigeria': amlTransactionMonitoringGuideNigeria,
  'transaction-monitoring-rules-digital-wallets': transactionMonitoringRulesDigitalWallets,
  'transaction-screening-vs-monitoring': transactionScreeningVsMonitoring,
  'reduce-aml-false-positives-nigerian-psps': reduceAmlFalsePositivesNigerianPsps,
  'regulator-ready-audit-trail-payment-decisions': regulatorReadyAuditTrailPaymentDecisions,
  'aml-case-management-alert-to-disposition': amlCaseManagementAlertToDisposition,
  'monitor-cross-border-remittance-transactions': monitorCrossBorderRemittanceTransactions,
  'build-vs-buy-transaction-monitoring-engine': buildVsBuyTransactionMonitoringEngine,
  'how-real-time-transaction-decisioning-works': howRealTimeTransactionDecisioningWorks,
  'compliance-checklist-digital-wallet-launch-nigeria': complianceChecklistDigitalWalletLaunchNigeria,
}

export function getArticleContent(slug: string): ArticleContent | undefined {
  return ARTICLE_CONTENT[slug]
}
