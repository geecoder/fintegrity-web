'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { BOOKING_URL, CONTACT_EMAIL } from '@/lib/config'
import { trackMarketingEvent } from '@/lib/analytics'
import { isPersonalEmail, PERSONAL_EMAIL_ERROR } from '@/lib/email-validation'
import styles from './DemoForm.module.css'

const ROLES = [
  'Founder / CEO',
  'CTO / engineering lead',
  'Chief compliance officer',
  'Head of risk',
  'Product manager',
  'Compliance analyst',
  'Other',
]

const VOLUMES = [
  { value: 'under_10k', label: 'Under 10k / month' },
  { value: '10k_100k', label: '10k – 100k / month' },
  { value: '100k_1m', label: '100k – 1M / month' },
  { value: '1m_10m', label: '1M – 10M / month' },
  { value: 'over_10m', label: '10M+ / month' },
]

const PRODUCTS = ['Transaction Monitoring', 'Payment Screening', 'Customer Lifecycle']

const REQUIRED_FIELD_COUNT = 6
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldName = 'fullName' | 'email' | 'company' | 'role' | 'volume' | 'products'
type FieldErrors = Partial<Record<FieldName, string>>

export default function DemoForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [volume, setVolume] = useState('')
  const [products, setProducts] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [submitError, setSubmitError] = useState('')

  const startedRef = useRef(false)

  function onFirstInteraction() {
    if (startedRef.current) return
    startedRef.current = true
    trackMarketingEvent('Demo Form Started', { page: '/demo' })
  }

  function validateField(field: FieldName): string | undefined {
    switch (field) {
      case 'fullName':
        return fullName.trim().length < 2 ? 'Enter your full name' : undefined
      case 'email': {
        const trimmed = email.trim()
        if (!EMAIL_RE.test(trimmed)) return 'Enter a valid work email'
        if (isPersonalEmail(trimmed)) return PERSONAL_EMAIL_ERROR
        return undefined
      }
      case 'company':
        return company.trim().length === 0 ? 'Enter your company name' : undefined
      case 'role':
        return role === '' ? 'Select your role' : undefined
      case 'volume':
        return volume === '' ? 'Select your monthly transaction volume' : undefined
      case 'products':
        return products.length === 0 ? 'Select at least one product' : undefined
      default:
        return undefined
    }
  }

  function handleBlur(field: FieldName) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((e) => ({ ...e, [field]: validateField(field) }))
  }

  function toggleProduct(p: string) {
    const next = products.includes(p) ? products.filter((x) => x !== p) : [...products, p]
    setProducts(next)
    setTouched((t) => ({ ...t, products: true }))
    setErrors((e) => ({ ...e, products: next.length === 0 ? 'Select at least one product' : undefined }))
  }

  function validateAll(): boolean {
    const fields: FieldName[] = ['fullName', 'email', 'company', 'role', 'volume', 'products']
    const nextErrors: FieldErrors = {}
    for (const f of fields) {
      const err = validateField(f)
      if (err) nextErrors[f] = err
    }
    setErrors(nextErrors)
    setTouched({ fullName: true, email: true, company: true, role: true, volume: true, products: true })
    return Object.keys(nextErrors).length === 0
  }

  const filledCount = [
    fullName.trim().length >= 2,
    EMAIL_RE.test(email.trim()),
    company.trim().length > 0,
    role !== '',
    volume !== '',
    products.length > 0,
  ].filter(Boolean).length

  const progressPct = status === 'success' ? 100 : Math.round((filledCount / REQUIRED_FIELD_COUNT) * 100)
  const stepLabel = status === 'success' ? 'sent' : `${filledCount} of ${REQUIRED_FIELD_COUNT}`

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validateAll()) return

    setStatus('submitting')
    setSubmitError('')

    const [firstName, ...rest] = fullName.trim().split(/\s+/)
    const lastName = rest.join(' ')

    // The API route (src/app/api/demo/route.ts) only accepts the original
    // firstName/lastName/email/company/role/product/challenge/pageUri shape.
    // "Products of interest" is a multi-select here, so it's joined into the
    // existing `product` field; "monthly transaction volume" has no field of
    // its own, so it's folded into `challenge` alongside the optional
    // message rather than inventing new keys the route wouldn't read.
    const volumeLabel = VOLUMES.find((v) => v.value === volume)?.label ?? volume
    const challenge = [`Monthly transaction volume: ${volumeLabel}`, message.trim()]
      .filter(Boolean)
      .join('\n\n')

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim(),
          company: company.trim(),
          role,
          product: products.join(', '),
          challenge,
          pageUri: window.location.href,
          website: honeypot,
        }),
      })

      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong. Please try again.')

      trackMarketingEvent('Demo Form Submitted', {
        company,
        role,
        product_type: products.join(', '),
        crm_mode: json.mode ?? 'unknown',
      })

      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setSubmitError(
        err instanceof Error ? err.message : `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
      )
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.card}>
        <div className={styles.successPanel}>
          <span className={styles.successIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--fg-green-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 12.5l4 4 8-9" />
            </svg>
          </span>
          <h2 className={styles.successTitle}>Request received</h2>
          <p className={styles.successBody}>We&rsquo;ll be in touch within one working day.</p>
          <div className={styles.successActions}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Schedule a time <span aria-hidden="true">→</span>
            </a>
            <Link href="/blog" className={styles.backLink}>
              Back to the blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderTitle}>Book a demo</span>
        <span className={`${styles.stepLabel} fg-num`}>{stepLabel}</span>
      </div>
      <div className={styles.progressTrack} role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} aria-label="Form completion">
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onFocus={onFirstInteraction}
        onChange={onFirstInteraction}
        noValidate
      >
        {/* Honeypot — off-screen, unreachable by tab, hidden from assistive
            tech. Real visitors never see or fill this; bots that fill every
            field will trip it. Not display:none/type=hidden on purpose,
            since some bots skip those. */}
        <div className={styles.honeypotWrap} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
              autoComplete="name"
              placeholder="Ada Obi"
              aria-invalid={Boolean(touched.fullName && errors.fullName)}
            />
            {touched.fullName && errors.fullName && <p className={styles.error} role="alert">{errors.fullName}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              autoComplete="email"
              placeholder="ada@company.com"
              aria-invalid={Boolean(touched.email && errors.email)}
            />
            {touched.email && errors.email && <p className={styles.error} role="alert">{errors.email}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              className={styles.input}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onBlur={() => handleBlur('company')}
              autoComplete="organization"
              placeholder="Company name"
              aria-invalid={Boolean(touched.company && errors.company)}
            />
            {touched.company && errors.company && <p className={styles.error} role="alert">{errors.company}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onBlur={() => handleBlur('role')}
              aria-invalid={Boolean(touched.role && errors.role)}
            >
              <option value="">Select role</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {touched.role && errors.role && <p className={styles.error} role="alert">{errors.role}</p>}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="volume">Monthly transaction volume</label>
          <select
            id="volume"
            name="volume"
            className={styles.select}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            onBlur={() => handleBlur('volume')}
            aria-invalid={Boolean(touched.volume && errors.volume)}
          >
            <option value="">Select volume</option>
            {VOLUMES.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
          {touched.volume && errors.volume && <p className={styles.error} role="alert">{errors.volume}</p>}
        </div>

        <div className={styles.field}>
          <span className={styles.label} id="products-label">Products of interest</span>
          <div className={styles.chips} role="group" aria-labelledby="products-label">
            {PRODUCTS.map((p) => {
              const selected = products.includes(p)
              return (
                <button
                  key={p}
                  type="button"
                  className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
                  aria-pressed={selected}
                  onClick={() => toggleProduct(p)}
                >
                  {p}
                </button>
              )
            })}
          </div>
          {touched.products && errors.products && <p className={styles.error} role="alert">{errors.products}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="message">Message <span className={styles.optional}>(optional)</span></label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Anything specific you'd like us to cover on the call?"
          />
        </div>

        {submitError && <p className={styles.formError} role="alert">{submitError}</p>}

        <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <span className={styles.submitting}>Submitting…</span>
          ) : (
            <>Request a demo <span aria-hidden="true">→</span></>
          )}
        </button>
        <p className={styles.note}>
          By submitting, you agree that Fintegrity Technologies Limited may contact you.{' '}
          <Link href="/privacy">Privacy policy</Link>.
        </p>
      </form>
    </div>
  )
}
