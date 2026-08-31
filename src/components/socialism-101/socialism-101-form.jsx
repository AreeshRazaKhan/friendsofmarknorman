'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import Toast from '@/components/ui/toast'
import SmsConsent from '@/components/layout/sms-consent'
import FormDisclaimer from '@/components/layout/form-disclaimer'
import { formatPhoneInput, isPhoneComplete } from '@/lib/phone'
import {
  trackFormStart,
  trackLead,
  trackNewsletterSignup,
} from '@/lib/analytics/meta'

const STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^[0-9]{5}$/

const GUIDE_PDF = '/downloads/mark-norman-issues-guide.pdf'

const ISSUE_OPTIONS = [
  'Affordability',
  'Education',
  'Public Safety',
  'Small Business',
  'Healthcare',
  'Energy',
  'Veterans',
  'Animal Welfare',
  'Government Accountability',
  'Data Centers / Local Development',
  'Other',
]

const SELECT_CLASS =
  'h-11 rounded border border-bone bg-paper-2 px-3 font-sans text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red'

const Socialism101Form = ({
  submitLabel,
  successEyebrow,
  successHeading,
  successBody,
  showDownload,
  showIssue,
  redirectTo,
  endpoint,
  meta,
  formName,
}) => {
  const router = useRouter()
  const [status, setStatus] = useState(STATUS.idle)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [phone, setPhone] = useState('')
  const [issue, setIssue] = useState('')
  const [smsConsent, setSmsConsent] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const formStarted = useRef(false)

  const hasPhone = phone.trim().length > 0

  useEffect(() => {
    if (!hasPhone) setSmsConsent(false)
  }, [hasPhone])

  const handleFirstInteraction = () => {
    if (formStarted.current) return
    formStarted.current = true
    trackFormStart({ form_name: formName })
  }

  const validate = (form) => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Invalid email'
    if (!form.zipCode.trim()) next.zipCode = 'Required'
    else if (!ZIP_RE.test(form.zipCode.trim())) next.zipCode = 'Invalid ZIP'
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
      ...meta,
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      phone,
      zipCode: formData.get('zipCode') || '',
      issue: showIssue ? issue : '',
      sms_consent: smsConsent,
    }

    const validation = validate(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus(STATUS.submitting)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const eventId =
        typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined
      trackLead({ form_name: formName }, eventId)
      trackNewsletterSignup({ form_name: formName }, eventId)
      formStarted.current = false
      if (redirectTo) {
        router.push(redirectTo)
        return
      }
      setStatus(STATUS.success)
    } catch (error) {
      console.error('[Socialism101Form]:', error)
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
      <form
        onSubmit={handleSubmit}
        onFocus={handleFirstInteraction}
        onChange={handleFirstInteraction}
        className="grid gap-5"
        noValidate
      >
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
            error={errors.phone}
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

        {showIssue && (
          <div className="grid gap-2">
            <label
              htmlFor="issue"
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red"
            >
              What issue matters most to you?
            </label>
            <select
              id="issue"
              name="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className={SELECT_CLASS}
            >
              <option value="">Select an issue (optional)</option>
              {ISSUE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <SmsConsent
          hasPhone={hasPhone}
          smsConsent={smsConsent}
          onSmsConsentChange={setSmsConsent}
        />

        <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
          {status === STATUS.submitting ? 'Sending…' : submitLabel}
        </Button>

        <FormDisclaimer />
      </form>
    </>
  )
}

Socialism101Form.propTypes = {
  submitLabel: PropTypes.string,
  successEyebrow: PropTypes.string,
  successHeading: PropTypes.node,
  successBody: PropTypes.node,
  showDownload: PropTypes.bool,
  showIssue: PropTypes.bool,
  redirectTo: PropTypes.string,
  endpoint: PropTypes.string,
  meta: PropTypes.object,
  formName: PropTypes.string,
}

Socialism101Form.defaultProps = {
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
  showIssue: false,
  redirectTo: '',
  endpoint: '/api/socialism-101',
  meta: null,
  formName: 'lead_magnet',
}

export default Socialism101Form
