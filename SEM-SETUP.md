# SEM Setup Reference — Google Ads

Reference for whoever configures the Google Ads account. Campaign creation,
bidding, and budgets are dashboard work — this document exists so that work
starts from a coherent structure instead of guesswork, and so the mapping
between ad groups and landing pages stays correct as the site evolves.

## Landing page map

Every ad group should point at the page built for that specific intent —
never the homepage. Quality Score depends heavily on ad-to-landing-page
relevance.

| Ad group / intent | Landing page |
|---|---|
| Transaction monitoring software | `/transaction-monitoring` |
| AML software Nigeria | `/nigeria` |
| Transaction screening API | `/transaction-screening` |
| Sanctions / PEP screening | `/transaction-screening` (covers sanctions+PEP directly — do not split into a separate page/ad group pointing elsewhere) |
| AML case management | `/case-management` |
| Compliance API for developers | `/developer-api` |
| Rules engine / configurable AML rules | `/rules-engine` |
| Audit trail / compliance evidence | `/audit-trail-and-reporting` |
| Digital wallet compliance | `/solutions/digital-wallets` |
| PSP / payment processor compliance | `/solutions/payment-service-providers` |
| Remittance / cross-border compliance | `/solutions/remittance-companies` |
| Bank / microfinance bank compliance | `/solutions/banks` |
| Africa-wide / multi-market compliance | `/africa` |

## Campaign structure

Suggested structure — one campaign per broad theme, tightly-themed ad groups
inside each (5-15 closely related keywords per ad group, not broad catch-alls):

- **Campaign: Nigeria — Core AML/Compliance** (highest priority, per the brief)
  - Ad group: AML transaction monitoring Nigeria
  - Ad group: Compliance software Nigeria fintech
  - Ad group: KYC/AML tools Nigeria
- **Campaign: Product — Transaction Monitoring**
  - Ad group: Transaction monitoring software
  - Ad group: Real-time transaction monitoring
- **Campaign: Product — Screening**
  - Ad group: Transaction screening API
  - Ad group: Sanctions/PEP screening
- **Campaign: Product — Case Management & Audit**
  - Ad group: AML case management software
  - Ad group: Compliance audit trail
- **Campaign: Solutions — By Segment**
  - Ad group: Digital wallet compliance
  - Ad group: PSP AML software
  - Ad group: Remittance compliance
- **Campaign: Developers**
  - Ad group: Compliance API / AML API for developers

## Keyword seeds (phrase/exact match starting point)

Group by ad group above. These are seeds to expand from Keyword Planner
data, not a final list.

**AML transaction monitoring Nigeria**
- "aml transaction monitoring nigeria"
- "transaction monitoring software nigeria"
- "compliance software for nigerian fintechs"
- "cbn compliant transaction monitoring"

**Transaction monitoring software**
- "transaction monitoring software"
- "real time transaction monitoring"
- "aml monitoring platform"
- "transaction monitoring api"

**Transaction screening / sanctions**
- "transaction screening api"
- "sanctions screening api"
- "pep screening software"
- "real time sanctions screening"

**AML case management**
- "aml case management software"
- "compliance case management"
- "alert investigation software"

**Compliance audit trail**
- "compliance audit trail software"
- "regulatory evidence software"
- "aml evidence management"

**Digital wallet / PSP / remittance**
- "digital wallet compliance software"
- "psp aml compliance"
- "remittance compliance software"
- "cross border payment compliance"

**Developer / API**
- "aml api"
- "compliance decisioning api"
- "kyc api nigeria"

## Negative keyword list (apply account-wide)

These consistently attract irrelevant clicks for a B2B compliance
infrastructure product — job seekers, students, and people looking for
generic definitions rather than software:

```
jobs
job
salary
career
careers
course
courses
training
certification
certified
definition
meaning
what is
pdf
free download
download
internship
university
degree
personal loan
loan
customer care
customer service
complaint
complaints
scam
free
```

Also add broad single-word negatives that are too generic to convert:
```
compliance
fraud
banking
software
fintech
```
(These are covered as *parts* of your actual keywords above — as
standalone broad-match terms they mostly attract irrelevant traffic
searching for something else entirely.)

## Attribution — what's already wired

- `search_ad_clicked` fires automatically when a landing page loads with a
  `gclid` parameter (Google Ads appends this to every ad click URL — no
  extra tagging needed beyond standard auto-tagging being enabled in the
  Ads account).
- `landing_page_viewed` fires once per browser session on first page load,
  capturing whatever UTM parameters are present.
- UTM parameters and `gclid` are read from the URL and pushed into
  `dataLayer` — they are **never** written into canonical URLs, so paid
  traffic doesn't create duplicate-content variations of a page for Google
  to index.
- If you're not using GA4's auto-tagging (`gclid`), make sure Final URL
  suffix or manual UTM tagging is turned on in the Ads campaign settings —
  otherwise `landing_page_viewed` fires but with no campaign attribution
  attached to it.
