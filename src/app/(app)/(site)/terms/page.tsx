import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Fintegrity Technologies Limited website terms of use.',
  alternates: { canonical: 'https://www.getfintegrity.com/terms' },
}

const DPO_EMAIL = 'privacy@getfintegrity.com'

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Terms of use', href: '/terms' }]} />

      <header className={styles.hero}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Legal</div>
          <h1 className={styles.h1}>Website terms of use</h1>
          <p className={`${styles.meta} fg-num`}>
            Fintegrity Technologies Limited (RC No. 9642721)
            <span className={styles.metaSep}>·</span>
            Version 1.0
            <span className={styles.metaSep}>·</span>
            Effective date: 16 Jul 2026
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={`fg-container ${styles.prose}`}>
          <h2>1. Who we are; acceptance</h2>
          <p>
            These Terms of Use govern your access to and use of the website at getfintegrity.com (the
            &ldquo;Site&rdquo;), operated by Fintegrity Technologies Limited (RC No. 9642721) of 13B, Luis Ubebe,
            Coker Estate, Shasha, Akowonjo, Lagos State, Nigeria (&ldquo;Fintegrity&rdquo;, &ldquo;we&rdquo;). By
            using the Site you accept these Terms; if you do not accept them, do not use the Site. If you use the
            Site on behalf of an organisation, you confirm you have authority to bind it. The Site is directed at
            businesses and their personnel and is not intended for children under 18.
          </p>
          <p>
            Access to the Fintegrity platform and services is governed separately by the Master Service Agreement
            (or other written agreement) with the relevant client and by the Platform Terms of Use and Acceptable
            Use Policy — not by these Terms. Our <Link href="/privacy">Privacy Policy</Link> and{' '}
            <Link href="/cookie-policy">Cookie Policy</Link> explain how we handle personal data and cookies on the
            Site.
          </p>

          <h2>2. Use of the site</h2>
          <p>
            We grant you a limited, revocable, non-exclusive licence to access and view the Site for lawful business
            and informational purposes. You must not: use the Site unlawfully or to harm others; attempt to gain
            unauthorised access to the Site, its servers or connected systems; introduce malware or interfere with
            the Site&rsquo;s operation; scrape, harvest or systematically extract data from the Site (including by
            bots or automated means) except as search engines ordinarily index public pages; misrepresent your
            identity or affiliation; or copy, frame, or create derivative works from the Site except as these Terms
            allow.
          </p>

          <h2>3. Intellectual property; feedback</h2>
          <p>
            The Site and all its content — text, graphics, logos, product names, software and design — are owned by
            or licensed to Fintegrity and protected by intellectual-property laws, including the Copyright Act 2022
            and the Trade Marks Act. You may view, download and print pages for your internal business evaluation,
            keeping all proprietary notices; any other reproduction or use requires our prior written consent. If
            you send us feedback or suggestions, you grant us a perpetual, irrevocable, royalty-free licence to use
            them without restriction or obligation to you.
          </p>

          <h2>4. Content is not advice</h2>
          <p>
            Content on the Site — including descriptions of regulatory technology, compliance topics, articles and
            documentation — is provided for general information only. It is not legal, regulatory, compliance or
            professional advice, does not create an adviser–client relationship, and should not be relied upon as a
            substitute for advice from qualified professionals or for your organisation&rsquo;s own regulatory
            judgment. Content may become out of date and we are not obliged to update it.
          </p>

          <h2>5. Third-party links; availability</h2>
          <p>
            The Site may link to third-party websites and resources for convenience; we do not control and are not
            responsible for them, and linking is not endorsement. We may modify, suspend or withdraw the Site (or
            any part) at any time, and we do not warrant that the Site will be uninterrupted, error-free or free of
            harmful components.
          </p>

          <h2>6. Disclaimer and liability</h2>
          <p>
            The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, and all warranties, conditions
            and terms implied by law are excluded to the fullest extent permitted. To the fullest extent permitted
            by law, Fintegrity shall not be liable for any loss of profits, business, data or goodwill, or any
            indirect or consequential loss, arising from use of or inability to use the Site or reliance on its
            content; our total aggregate liability in connection with the Site shall not exceed{' '}
            <span className="fg-num">₦500,000</span>. Nothing excludes or limits liability for fraud, for death or
            personal injury caused by negligence, or for any liability that cannot lawfully be excluded. You shall
            indemnify us against claims arising from your breach of these Terms.
          </p>

          <h2>7. Changes; general; governing law</h2>
          <p>
            We may update these Terms by posting the revised version on the Site with a new effective date; your
            continued use after the effective date constitutes acceptance. If any provision is unenforceable it
            shall be modified to the minimum extent necessary and the remainder continues in force; failure to
            enforce is not waiver. These Terms are governed by the laws of the Federal Republic of Nigeria, and the
            courts of Lagos State have non-exclusive jurisdiction. Questions:{' '}
            <a href={`mailto:${DPO_EMAIL}`}>privacy@getfintegrity.com</a> or the address above; data-protection
            matters: <a href={`mailto:${DPO_EMAIL}`}>privacy@getfintegrity.com</a>.
          </p>

          <div className={styles.contactCard}>
            <p>
              Related: <Link href="/privacy">Privacy policy</Link> ·{' '}
              <Link href="/cookie-policy">Cookie policy</Link> ·{' '}
              <Link href="/cookie-settings">Cookie settings</Link>
            </p>
          </div>

          <Link href="/" className={styles.backLink}>← Back to home</Link>
        </div>
      </section>
    </>
  )
}
