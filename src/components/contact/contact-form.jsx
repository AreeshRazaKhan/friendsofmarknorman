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

const ContactForm = () => {
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

  const validate = (form) => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Invalid email'
    if (!form.message.trim()) next.message = 'Required'
    if (form.phone.trim() && !isPhoneComplete(form.phone)) {
      next.phone = 'Enter a complete 10-digit number'
    }
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      phone,
      message: formData.get('message') || '',
      sms_consent: smsConsent,
    }

    const validation = validate(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus(STATUS.submitting)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus(STATUS.success)
      setMessage('Thanks — we got it. The team will follow up shortly.')
      setToastOpen(true)
      form.reset()
      setPhone('')
      setSmsConsent(false)
    } catch (error) {
      console.error('[ContactForm]:', error)
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

      <div className="grid gap-5 sm:grid-cols-2">
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
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (503) 555-0123"
          value={phone}
          onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          error={errors.phone}
        />
      </div>

      <FormField name="message" label="Message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          placeholder="Tell us what's on your mind — questions, ideas, scheduling, anything."
          className="rounded border border-bone bg-paper-2 px-[14px] py-3 font-sans text-sm text-navy placeholder:text-[#5F594D99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        />
      </FormField>

      <SmsConsent
        hasPhone={hasPhone}
        smsConsent={smsConsent}
        onSmsConsentChange={setSmsConsent}
      />

      <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
        {status === STATUS.submitting ? 'Sending…' : 'Send message'}
      </Button>

      <FormDisclaimer />

    </form>
    </>
  )
}

export default ContactForm
