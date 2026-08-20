'use client'

import { useState, type FormEvent } from 'react'
import styles from './NewsletterForm.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setStatus('error')
      setError('Enter a valid email address.')
      return
    }

    setStatus('submitting')
    setError('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, pageUri: window.location.href }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        setStatus('error')
        setError(data.error ?? 'Something went wrong. Try again.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--fg-green-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Subscribed. Watch for the next breakdown.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.fieldGroup}>
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          aria-invalid={status === 'error'}
          className={styles.input}
          disabled={status === 'submitting'}
        />
        <button type="submit" className={styles.button} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && <p className={styles.errorText}>{error}</p>}
    </form>
  )
}
