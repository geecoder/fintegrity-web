import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import styles from './page.module.css'

// The privacy policy names a dedicated DPO mailbox, distinct from the
// general CONTACT_EMAIL used elsewhere on the site — keep it verbatim.
const DPO_EMAIL = 'privacy@getfintegrity.com'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'Fintegrity Technologies Limited privacy policy — how we collect, process and protect personal data under the Nigeria Data Protection Act 2023.',
  alternates: { canonical: 'https://www.getfintegrity.com/privacy' },
}

const LAWFUL_BASES = [
  {
    purpose: 'Providing, administering and billing our services to Client organisations',
    categories: 'Business contact, contract and billing data',
    basis: 'Contract; legitimate interests',
  },
  {
    purpose: 'Responding to enquiries and managing business relationships',
    categories: 'Identity, contact, correspondence',
    basis: 'Legitimate interests',
  },
  {
    purpose: 'Operating, securing and improving our website and platform (including fraud and abuse prevention)',
    categories: 'Technical and usage data',
    basis: 'Legitimate interests; legal obligation (security duties under the NDPA)',
  },
  {
    purpose: 'Direct marketing and event communications',
    categories: 'Contact and preference data',
    basis: 'Consent; legitimate interests for existing business contacts, with opt-out in every message',
  },
  {
    purpose: 'Product analytics and improvement',
    categories: 'Aggregated, de-identified usage data',
    basis: 'Legitimate interests (details of our assessment available on request)',
  },
  {
    purpose: 'Compliance with law, regulatory engagement, and establishing or defending legal claims',
    categories: 'As relevant',
    basis: 'Legal obligation; legitimate interests',
  },
  {
    purpose: 'Recruitment',
    categories: 'Recruitment data',
    basis: 'Consent; steps prior to a contract; legitimate interests',
  },
  {
    purpose: 'Employment administration',
    categories: 'Personnel data',
    basis: 'Contract; legal obligation',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Privacy policy', href: '/privacy' }]} />

      <header className={styles.hero}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Legal</div>
          <h1 className={styles.h1}>Privacy policy</h1>
          <p className={`${styles.meta} fg-num`}>
            Fintegrity Technologies Limited (RC No. 9642721)
            <span className={styles.metaSep}>·</span>
            Version 2.0
            <span className={styles.metaSep}>·</span>
            Effective date: 16 Jul 2026
            <span className={styles.metaSep}>·</span>
            Review cycle: annual
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={`fg-container ${styles.prose}`}>
          <h2>1. Who we are</h2>
          <p>
            Fintegrity Technologies Limited (&ldquo;Fintegrity&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a Nigerian
            company (RC No. 9642721) with its registered address at 13B, Luis Ubebe, Coker Estate, Shasha, Akowonjo,
            Lagos State, Nigeria. We provide a business-to-business compliance-orchestration platform offering
            compliance decisioning, KYC orchestration, screening orchestration, transaction monitoring, case
            management and audit/evidence services to financial institutions and other regulated businesses (our
            &ldquo;Clients&rdquo;).
          </p>
          <p>
            This Privacy Policy explains how we handle personal data under the Nigeria Data Protection Act 2023
            (&ldquo;NDPA&rdquo;) and the General Application and Implementation Directive 2025 (&ldquo;GAID&rdquo;)
            issued by the Nigeria Data Protection Commission (&ldquo;NDPC&rdquo;). It applies to our website, our
            marketing, our corporate operations and, to the extent described in Section 2, our platform.
          </p>
          <p>
            We have designated a Data Protection Officer (&ldquo;DPO&rdquo;), who can be contacted at{' '}
            <a href={`mailto:${DPO_EMAIL}`}>privacy@getfintegrity.com</a> or by post at the registered address
            above, marked for the attention of the Data Protection Officer. Fintegrity is registered with the NDPC
            as a data controller/processor of major importance. NDPC registration number: registration in progress.
          </p>

          <h2>2. Our two roles: controller and processor</h2>
          <p>Understanding our role determines who is responsible to you and where to direct your requests:</p>

          <h3>2.1 Where we act as a processor</h3>
          <p>
            When a Client uses our platform to verify identities, screen names, monitor transactions or manage
            compliance cases, the personal data involved (&ldquo;Platform Data&rdquo;) belongs to the Client&rsquo;s
            relationship with its own customers. The Client is the data controller: it decides why and how that data
            is processed, and its own privacy notice governs. Fintegrity acts strictly as a data processor on the
            Client&rsquo;s documented instructions, under a data processing agreement. If you are a customer of one
            of our Clients and contact us about your data, we will refer your request to the relevant Client within
            five (5) business days, tell you we have done so, and assist the Client in responding. We do not use
            Platform Data for our own purposes, except in aggregated, de-identified form that cannot reasonably
            identify anyone, and as required by law.
          </p>

          <h3>2.2 Where we act as a controller</h3>
          <p>
            We are the data controller for personal data we collect for our own purposes: visitors to our website;
            recipients of our marketing; business contacts at Clients, prospects, partners and vendors; job
            applicants; and our personnel. The remainder of this Policy (Sections 3 to 12) applies to these
            categories.
          </p>

          <h2>3. Personal data we collect as controller</h2>
          <p>
            Depending on your interaction with us, we collect: identity and contact data (name, employer, role,
            email, phone); business correspondence and meeting records; contract and billing details for Client and
            vendor contacts; website and technical data (IP address, device and browser information, pages visited,
            cookie identifiers — see our <Link href="/cookie-policy">Cookie Policy</Link>); marketing preferences and
            consent records; recruitment data (CVs, qualifications, references, interview notes); and personnel
            records for our staff. We collect this data directly from you, from your organisation, from publicly
            available professional sources, and through our website.
          </p>
          <p>
            We do not seek to collect sensitive personal data (as defined in the NDPA — such as health, biometric or
            genetic data, religious or political beliefs, or ethnic origin) in these contexts. Financial data is not
            a statutory category of sensitive data, but where we handle it we apply equivalent safeguards.
          </p>

          <h2>4. Purposes and lawful bases</h2>
          <p>
            We process personal data as controller for the following purposes, on the following NDPA lawful bases:
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Data categories</th>
                  <th>Lawful basis (NDPA)</th>
                </tr>
              </thead>
              <tbody>
                {LAWFUL_BASES.map((row) => (
                  <tr key={row.purpose}>
                    <td>{row.purpose}</td>
                    <td>{row.categories}</td>
                    <td>{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>5. Automated decision-making and profiling</h2>
          <p>
            Our platform performs automated screening, matching and risk-scoring. In these operations we act as a
            processor executing decisioning logic configured and instructed by the Client, which remains responsible
            as controller for the lawful basis, for the consequences of decisions, and for providing routes to
            obtain human review. Where a screening or monitoring outcome affects you, you may seek human
            intervention, express your point of view and contest the decision through the relevant Client; if you
            contact us, we will route your request to that Client as described in Section 2.1. Acting as a
            controller (website, marketing, recruitment, HR), we do not make decisions based solely on automated
            processing that produce legal or similarly significant effects for you.
          </p>

          <h2>6. Who we share personal data with</h2>
          <p>
            We share personal data, on a need-to-know basis and under appropriate safeguards, with: (a) our service
            providers and sub-processors — cloud hosting and infrastructure providers, communications, analytics,
            customer-support and productivity tools (a current list of the sub-processors used for Platform Data is
            available on request and provided to Clients under our data processing agreements); (b) professional
            advisers (legal, accounting, audit, insurance); (c) the NDPC, other regulators, law enforcement and
            courts, where required by law or lawful request; and (d) a prospective or actual acquirer or investor in
            connection with a corporate transaction, under confidentiality obligations. We do not sell personal data,
            and we do not permit advertising networks to build profiles from Platform Data.
          </p>

          <h2>7. International transfers</h2>
          <p>
            Some of our service providers store or process data outside Nigeria. Where personal data is transferred
            outside Nigeria, we do so only in compliance with sections 41 to 43 of the NDPA and the GAID: to
            jurisdictions covered by an adequacy decision of the NDPC, or under appropriate safeguards such as
            approved contractual instruments, or on another lawful basis recognised by the NDPA. Details of current
            storage locations and safeguards are available from the DPO on request.
          </p>

          <h2>8. Security</h2>
          <p>
            We maintain technical and organisational measures appropriate to the risk, including encryption of data
            in transit and at rest, role-based access controls with multi-factor authentication for administrative
            access, logical segregation of Client environments, logging and monitoring, secure development
            practices, vulnerability management and penetration testing, staff confidentiality undertakings and
            training, and documented incident-response procedures.
          </p>
          <p>
            If a personal-data breach occurs: where we are the controller, we will notify the NDPC within
            seventy-two (72) hours of becoming aware where required, and affected individuals without undue delay
            where the breach is likely to result in a high risk to them; where we are a processor, we will notify
            the affected Client without undue delay (and within the timeframe in our data processing agreement) so
            the Client can meet its own obligations.
          </p>

          <h2>9. How long we keep personal data</h2>
          <p>
            We retain personal data only as long as necessary for the purposes described, and then delete,
            anonymise or securely destroy it, in accordance with our Data Retention Policy (available on request or
            on our website). Platform Data is retained and deleted according to each Client&rsquo;s instructions
            under the applicable data processing agreement.
          </p>

          <h2>10. Your rights</h2>
          <p>
            Under the NDPA you have the right to: access your personal data and information about our processing;
            correct inaccurate or incomplete data; request deletion; restrict or object to processing (including an
            absolute right to object to direct marketing); data portability (for data you provided that we process
            by automated means on the basis of consent or contract); withdraw consent at any time, without affecting
            prior processing; not be subject to solely automated decisions with legal or similarly significant
            effects, and to obtain human review as described in Section 5; and lodge a complaint with the NDPC.
          </p>
          <p>
            To exercise any right, contact the DPO at <a href={`mailto:${DPO_EMAIL}`}>privacy@getfintegrity.com</a>{' '}
            or use our Data Subject Access Request (DSAR) Form. We will acknowledge your request within five (5)
            business days with a reference number, verify your identity, and respond without undue delay and in any
            event within thirty (30) days; for complex or multiple requests we may extend by up to a further thirty
            (30) days, and we will tell you within the first period, with reasons. Requests are free of charge,
            unless a request is manifestly unfounded or excessive, in which case we may charge a reasonable fee or
            refuse, giving reasons and informing you of your right to complain to the NDPC. If your request concerns
            Platform Data, Section 2.1 applies and we will refer it to the relevant Client within five (5) business
            days.
          </p>
          <p>
            If you are dissatisfied with our response, you may ask the DPO to review the decision, and you may
            complain at any time to the Nigeria Data Protection Commission (ndpc.gov.ng).
          </p>

          <h2>11. Children</h2>
          <p>
            Our website and services are directed at businesses and are not intended for children under 18. We do
            not knowingly collect children&rsquo;s data as a controller; if we learn that we have, we will delete
            it. Where Platform Data instructed by a Client relates to a child or other vulnerable person, the Client
            is responsible as controller for the required lawful basis and consents, and we apply the safeguards
            required of processors under the NDPA and GAID.
          </p>

          <h2>12. Changes and contact</h2>
          <p>
            We review this Policy at least annually and will post any updated version on our website with a new
            effective date; material changes will be notified prominently. Questions, requests and complaints may
            be directed to the DPO at <a href={`mailto:${DPO_EMAIL}`}>privacy@getfintegrity.com</a> or to the
            registered address above.
          </p>

          <div className={styles.contactCard}>
            <p>
              Related: <Link href="/terms">Terms of use</Link> · <Link href="/cookie-policy">Cookie policy</Link> ·{' '}
              <Link href="/cookie-settings">Cookie settings</Link>
            </p>
          </div>

          <Link href="/" className={styles.backLink}>← Back to home</Link>
        </div>
      </section>
    </>
  )
}
