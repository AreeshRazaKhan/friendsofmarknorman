'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import Toast from '@/components/ui/toast'
import SmsConsent from '@/components/layout/sms-consent'
import FormDisclaimer from '@/components/layout/form-disclaimer'
import { formatPhoneInput, isPhoneComplete } from '@/lib/phone'

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
  const [smsConsent, setSmsConsent] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  const hasPhone = phone.trim().length > 0

  useEffect(() => {
    if (!hasPhone) setSmsConsent(false)
  }, [hasPhone])

  const validate = (data) => {
    const next = {}
    if (!data.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(data.email)) next.email = 'Invalid email'
    if (!data.zip.trim()) next.zip = 'Required'
    else if (!/^[0-9]{5}$/.test(data.zip.trim())) next.zip = 'Enter a 5-digit ZIP'
    if (!data.question.trim()) next.question = 'Required'
    if (data.phone.trim() && !isPhoneComplete(data.phone)) {
      next.phone = 'Enter a complete 10-digit number'
    }
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone,
      zip: formData.get('zip') || '',
      topic: formData.get('topic') || '',
      question: formData.get('question') || '',
      sms_consent: smsConsent,
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
      setToastOpen(true)
      form.reset()
      setPhone('')
      setSmsConsent(false)
    } catch (error) {
      console.error('[AskForm]:', error)
      setStatus(STATUS.error)
      setMessage('Something went wrong. Please try again.')
      setToastOpen(true)
    }
  }

  return (
    <>
    <Toast
      open={toastOpen && (status === STATUS.success || status === STATUS.error)}
      message={message}
      variant={status === STATUS.error ? 'error' : 'success'}
      onClose={() => setToastOpen(false)}
    />
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
          error={errors.phone}
        />
        <FormField
          name="zip"
          label="ZIP code"
          required
          inputMode="numeric"
          pattern="[0-9]{5}"
          autoComplete="postal-code"
          placeholder="97000"
          error={errors.zip}
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
          className="rounded border border-bone bg-paper-2 px-[14px] py-3 font-sans text-sm text-navy placeholder:text-[#5F594D99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
          placeholder="Be as direct as you like. Mark prefers it that way."
        />
      </FormField>

      <SmsConsent
        hasPhone={hasPhone}
        smsConsent={smsConsent}
        onSmsConsentChange={setSmsConsent}
      />

      <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
        {status === STATUS.submitting ? 'Sending…' : 'Send to Mark'}
      </Button>

      <FormDisclaimer />

    </form>
    </>
  )
}

export default AskForm
