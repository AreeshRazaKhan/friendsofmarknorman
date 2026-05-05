import Link from 'next/link'

import { LEGAL } from '@/constants/site'

const SmsConsent = () => {
  return (
    <fieldset className="grid gap-3 border-t border-bone pt-6">
      <legend className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red">
        SMS messaging (optional)
      </legend>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-stone-dark">
        <input
          type="checkbox"
          name="sms_updates"
          className="mt-1 h-4 w-4 shrink-0 rounded border-bone text-red focus:ring-red"
        />
        <span>
          By checking this box, I consent to receive campaign updates from{' '}
          <strong>{LEGAL.entity}</strong> via automated text messages at the phone number provided.
          Message frequency may vary. Message and data rates may apply. Text STOP to opt out or
          HELP for help. View our{' '}
          <Link className="text-red hover:text-red-2" href="/privacy-policy">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link className="text-red hover:text-red-2" href="/terms-of-service">
            Terms of Service
          </Link>
          .
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-stone-dark">
        <input
          type="checkbox"
          name="sms_promo"
          className="mt-1 h-4 w-4 shrink-0 rounded border-bone text-red focus:ring-red"
        />
        <span>
          By checking this box, I consent to receive promotional messages, event invitations, and
          fundraising communications from <strong>{LEGAL.entity}</strong> via automated text
          messages. Message frequency may vary. Message and data rates may apply. Text STOP to opt
          out or HELP for help.
        </span>
      </label>

      <p className="text-xs leading-relaxed text-stone">
        Both checkboxes are optional. Checking either is not required to use this site.
      </p>
    </fieldset>
  )
}

export default SmsConsent
