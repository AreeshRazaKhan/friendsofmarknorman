'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import FormDisclaimer from '@/components/layout/form-disclaimer'
import { formatPhoneInput } from '@/lib/phone'

const STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RsvpForm = ({ event }) => {
  const [status, setStatus] = useState(STATUS.idle)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [phone, setPhone] = useState('')

  const validate = (data) => {
    const next = {}
    if (!data.firstName.trim()) next.firstName = 'Required'
    if (!data.lastName.trim()) next.lastName = 'Required'
    if (!data.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(data.email)) next.email = 'Invalid email'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      phone,
      eventName: event.title,
      eventDate: event.date?.raw || '',
      eventTime: event.time,
      eventCategory: event.type,
    }

    const validation = validate(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus(STATUS.submitting)
    try {
      const res = await fetch('/api/events/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus(STATUS.success)
      setMessage('You\'re on the list. Confirmation in your inbox shortly.')
      form.reset()
      setPhone('')
    } catch (error) {
      console.error('[RsvpForm]:', error)
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
          required
          autoComplete="given-name"
          placeholder="Alex"
          error={errors.firstName}
        />
        <FormField
          name="lastName"
          label="Last name"
          required
          autoComplete="family-name"
          placeholder="Reed"
          error={errors.lastName}
        />
      </div>

      <FormField
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@oregon.com"
        error={errors.email}
      />

      <FormField
        name="phone"
        label="Contact number (optional)"
        type="tel"
        autoComplete="tel"
        placeholder="+1 (503) 555-0123"
        value={phone}
        onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
      />

      <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
        {status === STATUS.submitting ? 'Confirming…' : 'Confirm RSVP'}
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

RsvpForm.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.shape({ raw: PropTypes.string }),
    time: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
}

export default RsvpForm
