'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import FormDisclaimer from '@/components/layout/form-disclaimer'

import { ISSUE_CATEGORIES } from '@/constants/issues'

const STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SELECT_CLASS =
  'h-11 rounded border border-bone bg-paper-2 px-3 font-sans text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red'

const IssueForm = () => {
  const [status, setStatus] = useState(STATUS.idle)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const validate = (data) => {
    const next = {}
    if (!data.name.trim()) next.name = 'Required'
    if (!data.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(data.email)) next.email = 'Invalid email'
    if (!data.category) next.category = 'Required'
    if (!data.subject.trim()) next.subject = 'Required'
    if (!data.description.trim()) next.description = 'Required'
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      category: formData.get('category') || '',
      location: formData.get('location') || '',
      subject: formData.get('subject') || '',
      description: formData.get('description') || '',
    }

    const validation = validate(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus(STATUS.submitting)
    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus(STATUS.success)
      setMessage('Thanks — the campaign team will follow up.')
      event.currentTarget.reset()
    } catch (error) {
      console.error('[IssueForm]:', error)
      setStatus(STATUS.error)
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <FormField
        name="name"
        label="Full name"
        required
        autoComplete="name"
        placeholder="Alex Reed"
        error={errors.name}
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

      <FormField name="category" label="Category" required error={errors.category}>
        <select id="category" name="category" className={SELECT_CLASS} required>
          <option value="">Select…</option>
          {ISSUE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        name="location"
        label="Location"
        placeholder="185th &amp; Walker, Aloha"
        hint="Street address, intersection, or neighborhood (optional)."
      />

      <FormField
        name="subject"
        label="Subject"
        required
        placeholder="Pothole on SW Allen Blvd"
        error={errors.subject}
      />

      <FormField name="description" label="Description" required error={errors.description}>
        <textarea
          id="description"
          name="description"
          rows={6}
          required
          aria-invalid={Boolean(errors.description)}
          className="rounded border border-bone bg-paper-2 px-[14px] py-3 font-sans text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
          placeholder="What's going on, who's affected, when did it start?"
        />
      </FormField>

      <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
        {status === STATUS.submitting ? 'Sending…' : 'Report the issue'}
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

export default IssueForm
