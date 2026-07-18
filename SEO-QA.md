# SEO/SEM Post-Deploy QA Checklist

Run this after every deploy that touches metadata, routing, or analytics.
Check items off in order — later steps assume earlier ones passed.

## 1. Canonical host

```
curl -sI https://getfintegrity.com
```
Expect a `301` or `308` with `location: https://www.getfintegrity.com/`.
This is enforced in `next.config.ts` — belt-and-suspenders, also set the
**primary domain to `www.getfintegrity.com`** in Vercel → Project → Domains.

## 2. Sitemap & robots

```
curl -s https://www.getfintegrity.com/sitemap.xml | head -50
curl -s https://www.getfintegrity.com/robots.txt
```
- Sitemap should be valid XML with ~42 URLs (29 static/geo pages + 13 blog posts + 3 case studies as of this writing — check `src/lib/routes.ts`, `src/lib/blog.ts`, `src/lib/case-studies.ts` if the count looks off).
- No `/api/`, `/thank-you`, or stub pages (`/partners`, `/resources`, `/fraud-monitoring`, `/solutions/embedded-finance`, `/solutions/microfinance-banks`) should appear.
- `robots.txt` should show `Disallow: /api/` and `Disallow: /thank-you`, plus the sitemap URL.

## 3. View-source spot checks

Check these three pages in **view-source** (not DevTools Elements, which shows post-hydration DOM):
- Homepage (`/`)
- `/nigeria` (the priority SEM landing page)
- One product page, e.g. `/transaction-monitoring`

For each, confirm:
- [ ] `<title>` is correct and does NOT show doubled branding (e.g. never `"X | Fintegrity — Fintegrity Technologies Limited"` — this exact bug happened once during this build, see `src/lib/seo.ts`'s comment)
- [ ] Meta description present, under ~155 characters
- [ ] `<link rel="canonical">` present and self-referencing (matches the page's own URL, not a different one)
- [ ] `og:title`, `og:description`, `og:image`, `og:url` present
- [ ] At least one `<script type="application/ld+json">` block, valid JSON

## 4. Structured data validation

Run each of these through Google's tools (paste the live URL):
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/

Check specifically:
- [ ] Homepage — `Organization` + `WebSite` graph validates, no errors
- [ ] `/nigeria` and `/africa` — `FAQPage` validates AND the questions/answers shown in the schema match what's actually visible on the page in the accordion (Google penalizes FAQ markup that doesn't match visible content)
- [ ] Any blog post — `Article` validates (headline, datePublished, author, publisher.logo)
- [ ] `/compliance-decisioning-api` — `SoftwareApplication` validates

## 5. Analytics — GTM Preview + GA4 DebugView

Open GTM → Preview, connect to the live site, and walk through:

| Event (dataLayer name) | How to trigger | Where it's wired |
|---|---|---|
| `website_page_viewed` | Any navigation | `PageViewTracker.tsx` |
| `landing_page_viewed` | First page load of a fresh session (clear `sessionStorage` or use incognito) | `PageViewTracker.tsx` |
| `search_ad_clicked` | Load any page with `?gclid=test123` in the URL | `PageViewTracker.tsx` |
| `primary_cta_clicked` | Click "Book a demo" in the nav, or the primary button in a page's closing CTA band | `Nav.tsx`, `CTABand.tsx` |
| `demo_form_started` | Focus/change any field on `/book-a-demo` | `BookADemoForm.tsx` |
| `demo_form_submitted` | Successfully submit the form | `BookADemoForm.tsx` |
| `demo_booking_started` | Click "Pick a time now" on `/thank-you`, or submit the demo form (auto-opens the calendar) | `BookingLink.tsx` |
| `consent_update` / `cookie_consent_updated` | Accept/reject/customize the cookie banner | `ConsentBanner.tsx` |

**`demo_booking_completed` will never fire** — there's no webhook back from the raw Google Calendar link, so there's no real signal a booking was actually completed rather than just opened. This is a known open item, not a bug — see "Open decisions" below.

## 6. Lighthouse

Run Lighthouse (Chrome DevTools → Lighthouse, or PageSpeed Insights) against:
- [ ] Homepage — SEO score ≥ 95
- [ ] `/nigeria` — SEO score ≥ 95

If either is below 95, check the specific failing audit before assuming it's a code issue — image alt text, tap-target sizing, and heading order are the most common culprits.

## 7. Search Console (manual, dashboard-only)

1. Go to https://search.google.com/search-console, add a **Domain property** (not a URL-prefix property) for `getfintegrity.com` — this covers `http`/`https` and apex/`www` in one property.
2. Verify via **DNS TXT record**. Google will give you a value like `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXX`.
3. In Namecheap: Domain List → `getfintegrity.com` → **Manage** → **Advanced DNS** → **Add New Record** → type `TXT Record`, host `@`, value the string Google gave you, TTL Automatic. Save, then click Verify in Search Console (DNS propagation can take a few minutes to a few hours).
4. Once verified, **Sitemaps** (left nav) → submit `https://www.getfintegrity.com/sitemap.xml`.
5. **Settings → Associations** (or via GA4 Admin → Product links → Search Console) → link the Search Console property to your GA4 property. This has to be done from the GA4 side, not Search Console's.

## Founder manual-action checklist (summary)

- [ ] Set Vercel primary domain to `www.getfintegrity.com`
- [ ] Confirm `NEXT_PUBLIC_GTM_ID` is set in Vercel's **Production** environment variables (not just local `.env`) — a local-only env var never reaches the deployed build
- [ ] In GTM: create/confirm the GA4 Configuration tag, mark the relevant events above as conversions (`demo_form_submitted`, `demo_booking_started` at minimum)
- [ ] Create Search Console Domain property + DNS TXT record (steps above)
- [ ] Submit sitemap in Search Console
- [ ] Link Search Console to GA4 (from GA4 Admin, not Search Console)
- [ ] Confirm real HubSpot form fields (`use_case`, `compliance_challenge`) exist as contact properties if you want them captured — see the earlier HubSpot integration notes
