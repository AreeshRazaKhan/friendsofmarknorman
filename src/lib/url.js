/**
 * Append query params to a URL that may or may not already have a query
 * string. Skips empty values. Used to stamp UTM attribution onto outbound
 * donate links so donation-path activity can be traced back to the QR
 * funnel and the printed material that drove the visit.
 *
 * appendQueryParams('https://x.com/d?a=1', { utm_source: 'qr' })
 *   → 'https://x.com/d?a=1&utm_source=qr'
 */
export const appendQueryParams = (url, params) => {
  const entries = Object.entries(params || {}).filter(
    ([, value]) => value !== undefined && value !== null && value !== ''
  )
  if (entries.length === 0) return url

  const query = entries
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return `${url}${url.includes('?') ? '&' : '?'}${query}`
}

/**
 * Build the UTM set for donate links on the QR funnel. `qrSource` is the
 * sanitized print material ('flyer', 'banner', …) so WinRed reporting can
 * show which physical piece produced each donation click.
 */
export const qrDonateUtm = (qrSource) => ({
  utm_source: 'markfororegon',
  utm_medium: 'qr',
  utm_campaign: 'meet_mark_funnel',
  utm_content: qrSource || 'qr',
})
