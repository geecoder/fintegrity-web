'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { BOOKING_URL, CONTACT_EMAIL } from '@/lib/config'
import { trackMarketingEvent } from '@/lib/analytics'
import { isPersonalEmail, PERSONAL_EMAIL_ERROR } from '@/lib/email-validation'

const ROLES = [
  'Founder / CEO', 'CTO / Engineering Lead', 'Chief Compliance Officer',
  'Head of Risk', 'Product Manager', 'Compliance Analyst', 'Other',
]

const USE_CASES = [
  'Digital wallet / consumer fintech', 'PSP / payment processor',
  'Remittance / cross-border', 'Lender / BNPL', 'Bank / MFB',
  'Crypto / virtual assets', 'Other',
]

export default function BookADemoForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')
  const [error, setError] = useState('')
  const startedRef = useRef(false)

  function onFirstInteraction() {
    if (startedRef.current) return
    startedRef.current = true
    trackMarketingEvent('Demo Form Started', { page: '/book-a-demo' })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const data = Object.fromEntries(new FormData(e.currentTarget))
    const email = String(data.email ?? '').trim()

    if (isPersonalEmail(email)) {
      setError(PERSONAL_EMAIL_ERROR)
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email,
          company: data.company,
          role: data.role,
          useCase: data.useCase,
          challenge: data.challenge,
          pageUri: window.location.href,
        }),
      })

      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Submission failed')

      trackMarketingEvent('Demo Form Submitted', {
        company: String(data.company ?? ''),
        role: String(data.role ?? ''),
        use_case: String(data.useCase ?? ''),
        crm_mode: json.mode ?? 'unknown',
      })

      setStatus('done')
      // Open booking calendar; after short delay, navigate to thank-you
      setTimeout(() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer'), 600)
      setTimeout(() => { window.location.href = '/thank-you' }, 1400)
    } catch (err) {
      setStatus('idle')
      setError(
        err instanceof Error ? err.message : `Something went wrong. Please email ${CONTACT_EMAIL}.`,
      )
    }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', paddingTop: '40px' }}>
        <div className="thankyou-icon" style={{ margin: '0 auto 20px' }}>✓</div>
        <h2 style={{ marginBottom: '12px' }}>Request received</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.65 }}>
          Opening the booking calendar&hellip; If it doesn&apos;t open,{' '}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--indigo)' }}>
            click here to pick a time
          </a>.
        </p>
      </div>
    )
  }

  return (
    // onFocus/onChange fires Demo Form Started on first interaction
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      className="demo-form"
      onSubmit={handleSubmit}
      onFocus={onFirstInteraction}
      onChange={onFirstInteraction}
    >
      <h2 style={{ fontSize: '1.35rem', marginBottom: '24px' }}>Tell us about yourself</h2>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="firstName">First name <span className="form-required">*</span></label>
          <input id="firstName" name="firstName" type="text" className="form-input" required autoComplete="given-name" />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="lastName">Last name <span className="form-required">*</span></label>
          <input id="lastName" name="lastName" type="text" className="form-input" required autoComplete="family-name" />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="email">Work email <span className="form-required">*</span></label>
        <input id="email" name="email" type="email" className="form-input" required placeholder="you@company.com" />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="company">Company <span className="form-required">*</span></label>
        <input id="company" name="company" type="text" className="form-input" required autoComplete="organization" />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="role">Your role <span className="form-required">*</span></label>
          <select id="role" name="role" className="form-select" required defaultValue="">
            <option value="" disabled>Select role</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="useCase">Use case <span className="form-required">*</span></label>
          <select id="useCase" name="useCase" className="form-select" required defaultValue="">
            <option value="" disabled>Select use case</option>
            {USE_CASES.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="challenge">
          What&apos;s your biggest compliance challenge right now? <span className="form-required">*</span>
        </label>
        <textarea
          id="challenge"
          name="challenge"
          className="form-textarea"
          rows={3}
          required
          placeholder="e.g. We need to enforce KYC tier limits in real time, or we get alert floods with no evidence attached…"
        />
      </div>

      {error && <p className="form-err" role="alert">{error}</p>}

      <button type="submit" className="form-btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Request demo →'}
      </button>
      <p className="form-note">
        By submitting, you agree that Fintegrity Technologies Limited may contact you.
        We never share your information.{' '}
        <Link href="/privacy" style={{ color: 'var(--indigo)' }}>Privacy Policy</Link>.
      </p>
    </form>
  )
}
