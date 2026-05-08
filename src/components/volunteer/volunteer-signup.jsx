'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import SmsConsent from '@/components/layout/sms-consent'
import FormDisclaimer from '@/components/layout/form-disclaimer'
import { formatPhoneInput } from '@/lib/phone'

import {
  AVAILABILITY_OPTIONS,
  CAMPAIGN_EXPERIENCE_LEVELS,
  OREGON_COUNTIES,
  OREGON_REGIONS,
  VOLUNTEER_HELP_OPTIONS,
} from '@/constants/site'

const STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SELECT_CLASS =
  'h-11 rounded border border-bone bg-paper-2 px-3 font-sans text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red'

const VolunteerSignup = () => {
  const [status, setStatus] = useState(STATUS.idle)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [helpOptions, setHelpOptions] = useState([])
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

  const toggleHelp = (option) =>
    setHelpOptions((prev) =>
      prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]
    )

  const validate = (data) => {
    const next = {}
    if (!data.firstName.trim()) next.firstName = 'Required'
    if (!data.lastName.trim()) next.lastName = 'Required'
    if (!data.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(data.email)) next.email = 'Invalid email'
    if (!data.region) next.region = 'Required'
    if (!data.registeredVoter) next.registeredVoter = 'Required'
    if (!data.campaignExperience) next.campaignExperience = 'Required'
    if (!data.availability) next.availability = 'Required'
    if (data.helpOptions.length === 0) next.helpOptions = 'Pick at least one'
    if (!data.issues.trim()) next.issues = 'Required'
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      phone,
      zipCode: formData.get('zipCode') || '',
      county: formData.get('county') || '',
      region: formData.get('region') || '',
      registeredVoter: formData.get('registeredVoter') || '',
      campaignExperience: formData.get('campaignExperience') || '',
      helpOptions,
      availability: formData.get('availability') || '',
      issues: formData.get('issues') || '',
      anythingElse: formData.get('anythingElse') || '',
      sms_updates: smsUpdates,
      sms_promo: smsPromo,
    }

    const validation = validate(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus(STATUS.submitting)
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus(STATUS.success)
      setMessage('Thanks — we\'ll be in touch within 48 hours with next steps.')
      event.currentTarget.reset()
      setHelpOptions([])
      setPhone('')
      setSmsUpdates(false)
      setSmsPromo(false)
    } catch (error) {
      console.error('[VolunteerSignup]:', error)
      setStatus(STATUS.error)
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
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
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          name="zipCode"
          label="ZIP code"
          inputMode="numeric"
          pattern="[0-9]{5}"
          autoComplete="postal-code"
          placeholder="97000"
        />
        <FormField name="county" label="County">
          <select id="county" name="county" className={SELECT_CLASS}>
            <option value="">Select…</option>
            {OREGON_COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField name="region" label="Region" required error={errors.region}>
          <select id="region" name="region" className={SELECT_CLASS} required>
            <option value="">Select…</option>
            {OREGON_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          name="registeredVoter"
          label="Registered to vote in Oregon?"
          required
          error={errors.registeredVoter}
        >
          <select
            id="registeredVoter"
            name="registeredVoter"
            className={SELECT_CLASS}
            required
          >
            <option value="">Select…</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FormField>
      </div>

      <FormField
        name="campaignExperience"
        label="Prior campaign experience?"
        required
        error={errors.campaignExperience}
      >
        <select
          id="campaignExperience"
          name="campaignExperience"
          className={SELECT_CLASS}
          required
        >
          <option value="">Select…</option>
          {CAMPAIGN_EXPERIENCE_LEVELS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </FormField>

      <fieldset className="grid gap-3">
        <legend className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red">
          How would you like to help? *
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {VOLUNTEER_HELP_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 rounded border border-bone bg-paper-2 px-3 py-2 text-sm text-stone-dark hover:border-red"
            >
              <input
                type="checkbox"
                checked={helpOptions.includes(option)}
                onChange={() => toggleHelp(option)}
                className="h-4 w-4 rounded border-bone text-red focus:ring-red"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.helpOptions && (
          <p role="alert" className="text-xs font-medium text-red">
            {errors.helpOptions}
          </p>
        )}
      </fieldset>

      <FormField
        name="availability"
        label="Availability"
        required
        error={errors.availability}
      >
        <select id="availability" name="availability" className={SELECT_CLASS} required>
          <option value="">Select…</option>
          {AVAILABILITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        name="issues"
        label="What issue(s) matter most?"
        required
        error={errors.issues}
      >
        <textarea
          id="issues"
          name="issues"
          rows={3}
          required
          aria-invalid={Boolean(errors.issues)}
          placeholder="Affordability, schools, public safety, accountability — what brought you in?"
          className="rounded border border-bone bg-paper-2 px-[14px] py-3 font-sans text-sm text-navy placeholder:text-stone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
        />
      </FormField>

      <FormField name="anythingElse" label="Anything else to share?">
        <textarea
          id="anythingElse"
          name="anythingElse"
          rows={3}
          className="rounded border border-bone bg-paper-2 px-[14px] py-3 font-sans text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
          placeholder="Skills, languages, scheduling notes…"
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
        {status === STATUS.submitting ? 'Submitting…' : 'Sign me up'}
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

export default VolunteerSignup
