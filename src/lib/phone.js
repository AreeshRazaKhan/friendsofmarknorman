// Strip everything that's not a digit. Drop a leading "1" so we always
// own the country code via our pre-set "+1".
const stripDigits = (raw) => {
  const digits = (raw || '').replace(/\D+/g, '')
  return digits.startsWith('1') ? digits.slice(1) : digits
}

// Live formatter: bind to a controlled <input>'s onChange. Always prefixes
// "+1" once the user has typed any digit, and progressively builds toward
// "+1 (xxx) xxx-xxxx".
export const formatPhoneInput = (raw) => {
  const digits = stripDigits(raw).slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `+1 (${digits}`
  if (digits.length <= 6) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

// True only for a complete 10-digit US number. Empty input is NOT complete —
// callers decide separately whether an empty phone is acceptable (it is, on
// every form: the field is optional).
export const isPhoneComplete = (raw) => stripDigits(raw).length === 10

// Server-side canonical producer. A complete US number normalizes to
// "+1 (xxx) xxx-xxxx"; anything shorter than 10 digits returns "".
export const normalizePhoneForSubmit = (raw) => {
  const digits = stripDigits(raw)
  if (digits.length !== 10) return ''
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
