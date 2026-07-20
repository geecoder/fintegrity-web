# Fintegrity Web — Implementation Notes

This document covers what was built, every environment variable that must be set,
the dashboard steps only you can do, content that requires compliance review, and
everything that is intentionally stubbed or left as a TODO.

---

## What was built

### Phase 1 — Next.js foundation
- Migrated from Vite SPA to **Next.js 15 App Router**, TypeScript strict, ESLint
- `next/font` for Sora / Inter / JetBrains Mono (self-hosted, no Google CDN request)
- Metadata API throughout — no hand-written `<title>` or `<meta>` tags in JSX
- `metadataBase: 'https://www.getfintegrity.com'` for absolute OG/canonical URLs
- Non-www → www redirect in `next.config.ts`
- No trailing slash enforced via `trailingSlash: false`
- `X-Robots-Tag: noindex, nofollow` on all `*.vercel.app` preview deploys
- `app/robots.ts` — allow all, points to `/sitemap.xml`
- `app/sitemap.ts` — 13 indexable URLs (updates as stub pages get real content)

### Phase 2 — Pages and content
34 pages total:
- **5 real product/solution pages** with substantial content:
  `/transaction-monitoring`, `/case-management`, `/compliance-decisioning-api`,
  `/solutions/digital-wallets`, `/about`
- **Blog** — index + 3 full articles:
  CBN AML/CFT Baseline Standards (12 min), ALLOW/REVIEW/BLOCK architecture (8 min),
  Real-time vs batch AML (6 min)
- **Commercial pages** with real content:
  `/book-a-demo`, `/thank-you` (noindex), `/pricing`, `/contact`
- **18 stub pages** — all `robots: { index: false }`, all have `// CONTENT TODO` marker
- **Navigation** — full desktop dropdown (Product / Solutions) + mobile hamburger
- **Footer** — 5-column responsive grid with all product/solution/company/legal links
- **Shared components** — `CTABand`, `Breadcrumb`, `StubPage`, `RevealInit`

### Phase 3 — Structured data + Open Graph
- `OrganizationJsonLd` (Organization + WebSite `@graph`) — homepage only
- `BreadcrumbJsonLd` — all 12 inner real pages and blog articles
- `SoftwareAppJsonLd` — `/compliance-decisioning-api` only (content supports it)
- `app/opengraph-image.tsx` — 1200×630 branded ImageResponse, auto-served at
  `/opengraph-image.png`, inherited by all pages
- Twitter `summary_large_image` card wired in root layout
- Per-page `openGraph.url` on all real product/solution/about pages

### Phase 4 — Analytics, consent, CRM
- **Google Consent Mode v2** — all 4 signals default-denied in layout `<head>`,
  before GTM loads. GTM reads the denied defaults; tags inside GTM that check consent
  will not fire until the user accepts.
- **Consent banner** — Accept all / Reject non-essential / Customize, with toggle
  panel for Analytics vs Advertising. Persists preference in `localStorage`
  (key: `fintegrity_consent_v1`). Persistent "Cookie preferences" affordance
  after first choice.
- **GTM** — conditional on `NEXT_PUBLIC_GTM_ID`. If unset, `dataLayer` is still
  initialised so `trackMarketingEvent()` queues events for when GTM is configured.
- **Mixpanel** — source-installed, EU data residency by default. Initialises ONLY
  after `analytics: 'granted'` consent. Never initialises via GTM (single install
  assertion).
- **`trackMarketingEvent(name, props)`** — dual dispatch to `window.dataLayer`
  (snake_case event name for GTM) and Mixpanel. 12-event controlled taxonomy.
- **UTM + referrer** captured automatically on every `Website Page Viewed` event.
- **`/api/demo` route** — server-side HubSpot submission. Gracefully no-ops if env
  vars are not set (returns `{ ok: true, mode: 'unconfigured' }` so UX still works).
- **`Demo Form Started`** fires on first field interaction; **`Demo Form Submitted`**
  fires on successful submission.
- **`Pricing Viewed`** fires on `/pricing` page mount.

---

## Environment variables — set these in Vercel

Go to: Vercel → Project → Settings → Environment Variables
Set for **Production**, **Preview**, and **Development** unless noted.

| Variable | Scope | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | All | GTM dashboard → Container ID (format: `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_MIXPANEL_TOKEN` | All | Mixpanel → Settings → Project token |
| `NEXT_PUBLIC_MIXPANEL_API_HOST` | All | `https://api-eu.mixpanel.com` (EU) or `https://api.mixpanel.com` (US). Default is EU. |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | All | HubSpot → Settings → Account Setup → Account ID |
| `NEXT_PUBLIC_HUBSPOT_FORM_ID` | All | HubSpot → Marketing → Forms → your form → GUID in URL |
| `HUBSPOT_PRIVATE_TOKEN` | All (**never** prefix with `NEXT_PUBLIC_`) | HubSpot → Settings → Integrations → Private Apps → create app with Forms write scope |

**A redeploy is required after setting these.** Vercel does not apply env vars to
already-running deployments.

---

## Manual dashboard steps (you must do these — they are not code tasks)

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://www.getfintegrity.com`
3. Verify ownership via DNS TXT record (Vercel DNS: Settings → Domains → add TXT)
4. Submit sitemap: Sitemaps → Add sitemap → `https://www.getfintegrity.com/sitemap.xml`

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site → import from Google Search Console (easiest if GSC is already set up)
3. Submit sitemap

### Google Tag Manager
1. Create container at https://tagmanager.google.com
2. Copy the container ID (`GTM-XXXXXXX`) → set as `NEXT_PUBLIC_GTM_ID` in Vercel
3. Inside GTM, configure:
   - **GA4 Configuration tag** → trigger: All Pages
   - **Google Consent Mode v2 initialisation** — use the built-in Consent Mode template
     or the `gtag` consent commands; our layout already sets defaults, GTM reads them
   - **GA4 Event tags** for: `website_page_viewed`, `primary_cta_clicked`,
     `demo_form_started`, `demo_form_submitted`, `demo_booking_completed`,
     `pricing_viewed`, `contact_link_clicked`, `outbound_link_clicked`
   - **LinkedIn Insight Tag** — fire on All Pages, gate with advertising consent
   - **Microsoft Clarity** — fire on All Pages, gate with analytics consent
   - **Google Ads Conversion** — fire on `demo_form_submitted` and `demo_booking_completed`
4. Publish the container

### GA4
1. Create property at https://analytics.google.com
2. Copy Measurement ID → configure in GTM GA4 tag

### LinkedIn Insight Tag
1. Campaign Manager → Account Assets → Insight Tag → copy partner ID
2. Add to GTM as a Custom HTML tag

### Microsoft Clarity
1. https://clarity.microsoft.com → new project → copy project ID
2. Add to GTM as Custom HTML tag

### HubSpot form
1. HubSpot → Marketing → Forms → Create form (type: Embedded)
2. Add fields: First name, Last name, Email, Company, Job title, Message
3. Copy Portal ID → `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
4. Copy Form GUID from URL → `NEXT_PUBLIC_HUBSPOT_FORM_ID`
5. Create a Private App (Settings → Integrations → Private Apps) with:
   - Scope: `forms` (write)
   - Copy the token → `HUBSPOT_PRIVATE_TOKEN`

### Vercel domain + DNS
1. Vercel → Project → Settings → Domains → add `www.getfintegrity.com`
2. Add DNS CNAME record at your registrar: `www` → `cname.vercel-dns.com`
3. Add redirect at registrar or Vercel: `getfintegrity.com` → `https://www.getfintegrity.com`
   (the `next.config.ts` redirect handles this at the application layer, but a
   DNS-level redirect is faster and avoids the extra hop)

---

## Stub pages — content TODO

These routes exist with correct metadata but are `robots: { index: false }` and will
not appear in the sitemap or search results until real content replaces the stub.

**Product stubs:**
- `/transaction-screening` — sanctions, PEP, watchlist screening
- `/fraud-monitoring` — behavioural and network fraud detection
- `/rules-engine` — custom rule authoring interface
- `/customer-risk-profiling` — dynamic risk scoring
- `/audit-trail-and-reporting` — evidence store and reporting
- `/developer-api` — full API reference (links to `api.dev.getfintegrity.com`)

**Solution stubs:**
- `/solutions/fintechs`
- `/solutions/payment-service-providers`
- `/solutions/remittance-companies`
- `/solutions/banks`
- `/solutions/microfinance-banks`
- `/solutions/crypto-businesses`
- `/solutions/embedded-finance`

**Commercial/trust stubs:**
- `/security`
- `/partners`
- `/resources`
- `/case-studies`

**Legal stubs (require legal review before publishing):**
- `/privacy`
- `/cookie-policy`
- `/terms`

To publish a stub page: write real content, remove `robots: { index: false }` from
its metadata, and add its URL to `src/app/sitemap.ts`.

---

## NEEDS COMPLIANCE REVIEW markers

The following code comments mark content that asserts specific regulatory thresholds,
CBN/NFIU directives, or compliance obligations. These must be reviewed by a
qualified compliance professional before publication.

| File | What requires review |
|---|---|
| `src/app/page.tsx:84` | CBN 2024 BVN/NIN directive and tier limit specifics |
| `src/app/page.tsx:93` | NFIU CTR thresholds (₦5M / ₦10M) and 7-day filing window |
| `src/app/transaction-monitoring/page.tsx:36` | CBN/NFIU threshold defaults claim |
| `src/app/transaction-monitoring/page.tsx:175` | (same section) |
| `src/app/solutions/digital-wallets/page.tsx:168` | CBN 2024 tier limit claim |
| `src/app/solutions/digital-wallets/page.tsx:184` | ₦5M structuring threshold reference |
| `src/app/solutions/digital-wallets/page.tsx:204` | (evidence section regulatory claim) |
| `src/app/about/page.tsx:125` | Regulatory direction characterisation |
| `src/components/home/IcpPanel.tsx:54` | ₦5M NFIU CTR reporting threshold |
| `src/app/blog/cbnaml-baseline-standards/page.tsx:52` | Disclaimer — not legal advice |
| `src/app/blog/cbnaml-baseline-standards/page.tsx:174` | CBN automated monitoring direction |
| `src/app/blog/cbnaml-baseline-standards/page.tsx:195` | CTR threshold and filing window |
| `src/app/blog/real-time-vs-batch-aml/page.tsx:139` | CBN regulatory direction claim |

**Content position:** Fintegrity is a technology provider, not an MLRO. All page copy
describes platform capabilities, not compliance or legal obligations. Nothing in this
codebase constitutes legal or regulatory advice.

---

## Privacy assertion (analytics)

`src/lib/mixpanel.ts` contains a top-level code comment asserting that the following
must never be sent to Mixpanel, GA4, Clarity, or any advertising platform:

> transaction payloads · bank account details · screening results · case evidence ·
> government IDs · investigation notes · API payloads · passwords · tokens

Only anonymised behavioural events (page views, CTA clicks, form interaction steps)
are tracked.

---

## TODOs and known improvements

| Item | File | Priority |
|---|---|---|
| Migrate Google Fonts to `next/font` for LCP improvement | `src/app/globals.css` (comment at top) | Low — works fine as-is |
| Wire HubSpot form (set the 3 env vars and create the HubSpot form) | `src/app/api/demo/route.ts` | High — needed before launch |
| Write content for 20 stub pages | `src/app/[stub]/page.tsx` | Medium |
| Write Privacy Policy, Cookie Policy, Terms | `src/app/privacy|cookie-policy|terms/page.tsx` | High — required before launch; needs legal review |
| Add page-specific OG images per product page | `src/app/[route]/opengraph-image.tsx` | Low |
| `Demo Booking Completed` event — fire when user returns from Google Calendar | `src/app/thank-you/page.tsx` | Medium |
| Delete old Vite files (not used, safe to remove) | `index.html`, `vite.config.js`, `src/App.jsx`, `src/main.jsx`, `src/styles.css`, `src/config/`, `src/utils/`, `src/hooks/useBookingPopup.js`, `src/pages/` | Low |

---

## Running the project locally

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Type-check
npx tsc --noEmit

# Production build (checks for errors before deploying)
npm run build
npm start
```

**Do not run `npm audit fix --force`.** The two audit warnings that remain are inside
Next.js's own internal bundled dependencies — they are not reachable from application
code and cannot be fixed by downgrading Next.js. The correct fix is to upgrade
Next.js when a patched release ships.

---

## Git add/commit

```bash
git add src/ public/ app/ next.config.ts tsconfig.json vercel.json .gitignore .eslintrc.json package.json IMPLEMENTATION_NOTES.md
git commit -m "Migrate to Next.js App Router with SEO, analytics, and content foundation

- Next.js 15 App Router, TypeScript strict, next/font, Metadata API
- 34 pages: 5 real product/solution, About, Blog (3 articles), Book-a-Demo, 18+ stubs
- JSON-LD: Organization/WebSite (home), BreadcrumbList (all inner), SoftwareApplication (API page)
- Branded OG image via next/og ImageResponse
- Google Consent Mode v2 (all denied by default), consent banner with customize panel
- GTM container support (conditional on NEXT_PUBLIC_GTM_ID env var)
- Mixpanel source-installed, EU host, consent-gated, 12-event taxonomy
- HubSpot server-side form handler at /api/demo
- All company name instances corrected to Fintegrity Technologies Limited (plural)
- Sitemap: 13 indexable URLs; stub pages and /thank-you excluded (noindex)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
