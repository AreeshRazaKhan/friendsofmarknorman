import Link from 'next/link'

const FormDisclaimer = () => (
  <p className="text-xs leading-relaxed text-stone">
    By submitting you agree to the{' '}
    <Link className="text-red hover:text-red-2" href="/terms-of-service">
      Terms of Service
    </Link>{' '}
    and{' '}
    <Link className="text-red hover:text-red-2" href="/privacy-policy">
      Privacy Policy
    </Link>
    .
  </p>
)

export default FormDisclaimer
