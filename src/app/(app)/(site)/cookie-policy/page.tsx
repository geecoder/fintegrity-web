import type { Metadata } from 'next'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Fintegrity Technologies Limited cookie policy — how we use cookies and similar technologies on this website.',
  alternates: { canonical: 'https://www.getfintegrity.com/cookie-policy' },
}

const DPO_EMAIL = 'privacy@getfintegrity.com'

export default function CookiePolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Cookie Policy', href: '/cookie-policy' }]} />

      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Legal</span>
            <h1>Cookie Policy</h1>
            <p className="page-hero-lead">Fintegrity Technologies Limited (RC No. 9642721)</p>
            <p className="legal-meta">Version 2.0 · Effective date: 16 July 2026 · Review cycle: annual</p>
          </div>
        </div>
      </section>

      <section className="legal-body">
        <div className="wrap">
          <div className="cms-richtext article-content legal-content">
            <h2>1. What this policy covers</h2>
            <p>
              This Cookie Policy explains how Fintegrity Technologies Limited (&ldquo;Fintegrity&rdquo;,
              &ldquo;we&rdquo;) uses cookies and similar technologies (pixels, local storage, SDKs) on our website
              and web application. It should be read together with our <a href="/privacy">Privacy Policy</a>. We
              are a business-to-business compliance-technology company; our site is directed at businesses and
              their personnel.
            </p>
            <p>
              Our use of cookies is governed by the Nigeria Data Protection Act 2023 (&ldquo;NDPA&rdquo;) and the
              General Application and Implementation Directive 2025 (&ldquo;GAID&rdquo;) issued by the Nigeria Data
              Protection Commission (&ldquo;NDPC&rdquo;).
            </p>

            <h2>2. What cookies are</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They allow the site to
              recognise your device, remember your preferences and settings, keep you signed in, and help us
              understand how the site is used. &ldquo;Session&rdquo; cookies expire when you close your browser;
              &ldquo;persistent&rdquo; cookies remain until they expire or you delete them. &ldquo;First-party&rdquo;
              cookies are set by us; &ldquo;third-party&rdquo; cookies are set by our service providers.
            </p>

            <h2>3. Our consent model</h2>
            <p>
              When you first visit our site, a cookie banner lets you accept all cookies, reject all non-essential
              cookies, or customise your choices by category. Strictly necessary cookies are exempt from consent
              because the service you request cannot be provided without them; every other category is used only
              after you opt in — we do not treat continued browsing as consent, and non-essential cookies do not
              load before your choice. You can change or withdraw your choices at any time via the{' '}
              <strong>&ldquo;Cookie Settings&rdquo;</strong> link in the site footer; withdrawing is as easy as
              giving consent. We keep a record of your consent choices (choice, timestamp, banner version) for as
              long as the consent is relied on and for six (6) years thereafter, to evidence compliance.
            </p>

            <h2>4. Categories of cookies we use</h2>
            <p>
              <strong>4.1 Strictly necessary (no consent required).</strong> Required for the site and application
              to function: session management, sign-in and authentication, security (including fraud and abuse
              prevention), load balancing, and remembering your cookie choices.
            </p>
            <p>
              <strong>4.2 Functional (consent required).</strong> Remember your preferences (such as language or
              region) to improve your experience.
            </p>
            <p>
              <strong>4.3 Analytics (consent required).</strong> Help us understand how visitors use the site —
              pages visited, time on page, navigation paths — so we can improve it. We use Google Analytics with IP
              anonymisation enabled. Analytics data may be processed on servers outside Nigeria; such transfers are
              made in compliance with sections 41 to 43 of the NDPA (see Section 7 of our{' '}
              <a href="/privacy">Privacy Policy</a>). You can also opt out of Google Analytics across all sites via
              Google&apos;s browser add-on (
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                tools.google.com/dlpage/gaoptout
              </a>
              ).
            </p>
            <p>
              <strong>4.4 Marketing (consent required).</strong> We do not currently use advertising or marketing
              cookies. If that changes, we will update this Policy and seek your consent through the banner before
              any such cookies are set.
            </p>

            <h2>5. Cookies currently in use</h2>
            <p>
              The table below is indicative of the cookies in use as at the effective date and is verified against
              a periodic scan of the site; the live list in our Cookie Settings tool prevails if there is any
              difference.
            </p>
            {/* [NEEDS LEGAL REVIEW: document lists Google Analytics cookies, but site currently uses Mixpanel + GTM. Reconcile actual cookies in use with legal team before relying on this table.] */}
            <div className="legal-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Type / provider</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>fintegrity_session</td>
                    <td>Strictly necessary (first party)</td>
                    <td>Session management and authentication</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>cookie_consent</td>
                    <td>Strictly necessary (first party)</td>
                    <td>Stores your cookie choices</td>
                    <td>12 months</td>
                  </tr>
                  <tr>
                    <td>_ga</td>
                    <td>Analytics (Google)</td>
                    <td>Distinguishes visitors for usage statistics</td>
                    <td>Up to 24 months</td>
                  </tr>
                  <tr>
                    <td>_gid</td>
                    <td>Analytics (Google)</td>
                    <td>Distinguishes visitors for usage statistics</td>
                    <td>24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>6. Automated processing; what cookies do not do</h2>
            <p>
              Cookies on our site are not used to make decisions with legal or similarly significant effects about
              you. The compliance screening and monitoring performed on our platform for client institutions is
              unrelated to website cookies and is described in Sections 2 and 5 of our{' '}
              <a href="/privacy">Privacy Policy</a>.
            </p>

            <h2>7. Managing cookies in your browser</h2>
            <p>
              In addition to our banner and Cookie Settings link, most browsers let you block or delete cookies
              through their settings (typically under &ldquo;Privacy&rdquo; or &ldquo;Security&rdquo;). Blocking
              strictly necessary cookies may prevent parts of the site — such as signing in — from working. Our site
              does not currently respond to &ldquo;Do Not Track&rdquo; browser signals, because no common standard
              exists; your choices in our banner control our non-essential cookies.
            </p>

            <h2>8. Changes, contact and complaints</h2>
            <p>
              We review this Policy at least annually and whenever our cookie use changes. If we make material
              changes — such as adding a new category of non-essential cookies — we will update the effective date
              and re-present the banner for fresh consent. Questions and requests may be directed to our Data
              Protection Officer at <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a> or to 13B, Luis Ubebe, Coker
              Estate, Shasha, Akowonjo, Lagos State, Nigeria. You may lodge a complaint at any time with the NDPC (
              <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">ndpc.gov.ng</a>).
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
