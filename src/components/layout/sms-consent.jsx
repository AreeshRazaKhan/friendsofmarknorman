import Link from 'next/link'
import PropTypes from 'prop-types'

import { LEGAL } from '@/constants/site'
import { cn } from '@/lib/utils'

const SmsConsent = ({
  hasPhone,
  smsUpdates,
  smsPromo,
  onSmsUpdatesChange,
  onSmsPromoChange,
}) => {
  const labelClass = cn(
    'flex items-start gap-3 text-sm leading-relaxed',
    hasPhone ? 'cursor-pointer text-stone-dark' : 'cursor-not-allowed text-stone-dark/50'
  )

  return (
    <fieldset className="grid gap-3 border-t border-bone pt-6">
      <legend className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red">
        SMS messaging (optional)
      </legend>

      {!hasPhone && (
        <p className="text-xs italic text-stone">
          Entering your phone number does not opt you in to SMS. The consent checkboxes below must
          also be checked.
        </p>
      )}

      <label className={labelClass}>
        <input
          type="checkbox"
          name="sms_updates"
          checked={smsUpdates}
          onChange={(e) => onSmsUpdatesChange(e.target.checked)}
          disabled={!hasPhone}
          required={hasPhone}
          className="mt-1 h-4 w-4 shrink-0 rounded border-bone text-red focus:ring-red disabled:cursor-not-allowed disabled:opacity-40"
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

      <label className={labelClass}>
        <input
          type="checkbox"
          name="sms_promo"
          checked={smsPromo}
          onChange={(e) => onSmsPromoChange(e.target.checked)}
          disabled={!hasPhone}
          required={hasPhone}
          className="mt-1 h-4 w-4 shrink-0 rounded border-bone text-red focus:ring-red disabled:cursor-not-allowed disabled:opacity-40"
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

SmsConsent.propTypes = {
  hasPhone: PropTypes.bool.isRequired,
  smsUpdates: PropTypes.bool.isRequired,
  smsPromo: PropTypes.bool.isRequired,
  onSmsUpdatesChange: PropTypes.func.isRequired,
  onSmsPromoChange: PropTypes.func.isRequired,
}

export default SmsConsent
