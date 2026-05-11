import { HD27_ZIPS } from '@/constants/site'

const ZIP_RE = /^[0-9]{5}$/

export const isValidZip = (zip) => ZIP_RE.test((zip || '').trim())

// 'Yes' if the ZIP is in the campaign's district list, 'No' if it's a
// valid 5-digit ZIP outside the list. Returns 'Unknown' for missing or
// malformed input — API routes should reject those before reaching here,
// so 'Unknown' is the fallback signal that something slipped past
// validation.
export const districtFlag = (zip) => {
  const trimmed = (zip || '').trim()
  if (!ZIP_RE.test(trimmed)) return 'Unknown'
  return HD27_ZIPS.includes(trimmed) ? 'Yes' : 'No'
}
