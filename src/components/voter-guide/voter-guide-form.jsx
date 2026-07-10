'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import Toast from '@/components/ui/toast'
import SmsConsent from '@/components/layout/sms-consent'
import FormDisclaimer from '@/components/layout/form-disclaimer'
import { formatPhoneInput } from '@/lib/phone'
import { LEGAL } from '@/constants/site'

const STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^[0-9]{5}$/

const GUIDE_PDF = '/downloads/mark-norman-issues-guide.pdf'

const VoterGuideForm = ({
  submitLabel,
  successEyebrow,
  successHeading,
  successBody,
  showDownload,
  redirectTo,
}) => {
  const router = useRouter()
  const [status, setStatus] = useState(STATUS.idle)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [phone, setPhone] = useState('')
  const [emailConsent, setEmailConsent] = useState(false)
  const [smsUpdates, setSmsUpdates] = useState(false)
  const [smsPromo, setSmsPromo] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  const hasPhone = phone.trim().length > 0

  useEffect(() => {
    if (!hasPhone) {
      setSmsUpdates(false)
      setSmsPromo(false)
    }
  }, [hasPhone])

  const validate = (form) => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Invalid email'
    if (!form.zipCode.trim()) next.zipCode = 'Required'
    else if (!ZIP_RE.test(form.zipCode.trim())) next.zipCode = 'Invalid ZIP'
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
      zipCode: formData.get('zipCode') || '',
      email_consent: emailConsent,
      sms_updates: smsUpdates,
      sms_promo: smsPromo,
    }

    const validation = validate(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus(STATUS.submitting)
    try {
      const res = await fetch('/api/voter-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      if (redirectTo) {
        router.push(redirectTo)
        return
      }
      setStatus(STATUS.success)
    } catch (error) {
      console.error('[VoterGuideForm]:', error)
      setStatus(STATUS.error)
      setMessage('Something went wrong. Please try again.')
      setToastOpen(true)
    }
  }

  if (status === STATUS.success) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="eyebrow-bracket eyebrow">{successEyebrow}</p>
        <h3 className="display text-3xl text-navy sm:text-4xl">{successHeading}</h3>
        <p className="max-w-prose text-stone-dark">{successBody}</p>
        {showDownload && (
          <Button asChild variant="red">
            <a href={GUIDE_PDF} download>
              Download the guide (PDF)
            </a>
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <Toast
        open={toastOpen && status === STATUS.error}
        message={message}
        variant="error"
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

        <FormField
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@oregon.com"
          error={errors.email}
        />

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
            name="zipCode"
            label="ZIP code"
            required
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="97005"
            maxLength={5}
            error={errors.zipCode}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-dark">
          <input
            type="checkbox"
            name="email_consent"
            checked={emailConsent}
            onChange={(e) => setEmailConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-bone text-red focus:ring-red"
          />
          <span>
            Yes, I would like to receive campaign updates, event notices, issue highlights,
            volunteer opportunities, and other communications from <strong>{LEGAL.entity}</strong>.
          </span>
        </label>

        <SmsConsent
          hasPhone={hasPhone}
          smsUpdates={smsUpdates}
          smsPromo={smsPromo}
          onSmsUpdatesChange={setSmsUpdates}
          onSmsPromoChange={setSmsPromo}
        />

        <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
          {status === STATUS.submitting ? 'Sending…' : submitLabel}
        </Button>

        <FormDisclaimer />
      </form>
    </>
  )
}

VoterGuideForm.propTypes = {
  submitLabel: PropTypes.string,
  successEyebrow: PropTypes.string,
  successHeading: PropTypes.node,
  successBody: PropTypes.node,
  showDownload: PropTypes.bool,
  redirectTo: PropTypes.string,
}

VoterGuideForm.defaultProps = {
  submitLabel: 'Get my free guide',
  successEyebrow: '[ your guide is ready ]',
  successHeading: (
    <>
      Your guide is <em>ready.</em>
    </>
  ),
  successBody:
    'Thank you for downloading A Warning About Democratic Socialism in House District 27. Inside, ' +
    'you’ll learn why Mark believes House District 27 must reject the socialist agenda of larger ' +
    'government, higher taxes, expanded bureaucracy, public ownership, and centralized control — ' +
    'plus his practical alternative for Oregon.',
  showDownload: true,
  redirectTo: '',
}

export default VoterGuideForm
