'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import SmsConsent from '@/components/layout/sms-consent'
import FormDisclaimer from '@/components/layout/form-disclaimer'
import { formatPhoneInput } from '@/lib/phone'

const STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TOPICS = [
  'Affordability',
  'Education',
  'Public safety',
  'Government accountability',
  'District services',
  'Other',
]

const SELECT_CLASS =
  'h-11 rounded border border-bone bg-paper-2 px-3 font-sans text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red'

const AskForm = () => {
  const [status, setStatus] = useState(STATUS.idle)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [phone, setPhone] = useState('')
  const [smsUpdates, setSmsUpdates] = useState(false)
  const [smsPromo, setSmsPromo] = useState(false)

  const hasPhone = phone.trim().length > 0

  useEffect(() => {
    if (!hasPhone) {
      setSmsUpdates(false)
      setSmsPromo(false)
    }
  }, [hasPhone])

  const validate = (data) => {
    const next = {}
    if (!data.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(data.email)) next.email = 'Invalid email'
    if (!data.question.trim()) next.question = 'Required'
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone,
      zip: formData.get('zip') || '',
      topic: formData.get('topic') || '',
      question: formData.get('question') || '',
      sms_updates: smsUpdates,
      sms_promo: smsPromo,
    }

    const validation = validate(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus(STATUS.submitting)
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus(STATUS.success)
      setMessage('Got it — Mark reads every question. The team will follow up.')
      event.currentTarget.reset()
      setPhone('')
      setSmsUpdates(false)
      setSmsPromo(false)
    } catch (error) {
      console.error('[AskForm]:', error)
      setStatus(STATUS.error)
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          name="name"
          label="Full name"
          autoComplete="name"
          placeholder="Alex Rivera"
        />
        <FormField
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@oregon.com"
          error={errors.email}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          name="phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (503) 555-0123"
          value={phone}
          onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
        />
        <FormField
          name="zip"
          label="ZIP code"
          inputMode="numeric"
          pattern="[0-9]{5}"
          placeholder="97000"
        />
      </div>

      <FormField name="topic" label="Topic">
        <select id="topic" name="topic" className={SELECT_CLASS}>
          <option value="">Select…</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </FormField>

      <FormField name="question" label="Your question" required error={errors.question}>
        <textarea
          id="question"
          name="question"
          rows={6}
          required
          aria-invalid={Boolean(errors.question)}
          className="rounded border border-bone bg-paper-2 px-[14px] py-3 font-sans text-sm text-navy placeholder:text-stone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
          placeholder="Be as direct as you like. Mark prefers it that way."
        />
      </FormField>

      <SmsConsent
        hasPhone={hasPhone}
        smsUpdates={smsUpdates}
        smsPromo={smsPromo}
        onSmsUpdatesChange={setSmsUpdates}
        onSmsPromoChange={setSmsPromo}
      />

      <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
        {status === STATUS.submitting ? 'Sending…' : 'Send to Mark'}
      </Button>

      <FormDisclaimer />

      {message && (
        <p
          className="text-sm"
          role={status === STATUS.error ? 'alert' : 'status'}
          aria-live="polite"
        >
          <span className={status === STATUS.error ? 'text-red' : 'text-navy'}>{message}</span>
        </p>
      )}
    </form>
  )
}

export default AskForm
