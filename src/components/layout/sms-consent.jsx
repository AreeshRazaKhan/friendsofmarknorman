import Link from 'next/link'
import PropTypes from 'prop-types'

import { LEGAL, SMS_DISCLAIMER } from '@/constants/site'
import { cn } from '@/lib/utils'

const SmsConsent = ({ hasPhone, smsConsent, onSmsConsentChange }) => {
  const labelClass = cn(
    'flex items-start gap-3 text-sm leading-relaxed',
    hasPhone ? 'cursor-pointer text-stone-dark' : 'cursor-not-allowed text-stone'
  )

  return (
    <fieldset className="grid gap-3 border-t border-bone pt-6">
      <legend className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red">
        SMS messaging (optional)
      </legend>

      {!hasPhone && (
        <p className="text-xs italic text-stone">
          Entering your phone number does not opt you in to SMS. The consent checkbox below must
          also be checked.
        </p>
      )}

      {/* Peerly 10DLC carrier disclaimer, embedded in the consent statement.
          Text is rendered from SMS_DISCLAIMER — see
          .claude/rules/peerly-10dlc-compliance.md before changing a word. */}
      <label className={labelClass}>
        <input
          type="checkbox"
          name="sms_consent"
          checked={smsConsent}
          onChange={(e) => onSmsConsentChange(e.target.checked)}
          disabled={!hasPhone}
          required={hasPhone}
          className="mt-1 h-4 w-4 shrink-0 rounded border-bone text-red focus:ring-red disabled:cursor-not-allowed disabled:opacity-60"
        />
        <span>
          {SMS_DISCLAIMER.beforeEntity}
          <strong>{LEGAL.entity}</strong>
          {SMS_DISCLAIMER.afterEntity}{' '}
          <Link className="text-red hover:text-red-2" href={SMS_DISCLAIMER.privacyPath}>
            {SMS_DISCLAIMER.privacyLabel}
          </Link>{' '}
          {SMS_DISCLAIMER.privacySuffix}
        </span>
      </label>
    </fieldset>
  )
}

SmsConsent.propTypes = {
  hasPhone: PropTypes.bool.isRequired,
  smsConsent: PropTypes.bool.isRequired,
  onSmsConsentChange: PropTypes.func.isRequired,
}

export default SmsConsent
