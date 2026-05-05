'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import FormDisclaimer from '@/components/layout/form-disclaimer'

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
      firstName: formData.get('firstName') || '',
      email: formData.get('email') || '',
      zip: formData.get('zip') || '',
      topic: formData.get('topic') || '',
      question: formData.get('question') || '',
      publishOk: formData.get('publishOk') === 'on',
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
          name="firstName"
          label="First name"
          autoComplete="given-name"
          placeholder="Alex"
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
          name="zip"
          label="ZIP code"
          inputMode="numeric"
          pattern="[0-9]{5}"
          placeholder="97000"
        />
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
      </div>

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

      <label className="flex items-start gap-3 text-sm text-stone-dark">
        <input
          type="checkbox"
          name="publishOk"
          className="mt-1 h-4 w-4 rounded border-bone text-red focus:ring-red"
        />
        <span>
          You can publish my question (with first name and ZIP only) on the campaign blog.
        </span>
      </label>

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
