const GHL_HOOK = process.env.GHL_WEBHOOK_HOOK || 'HK7KWJYbw33yisOBMGEO'

const hook = (uuid) =>
  `https://services.leadconnectorhq.com/hooks/${GHL_HOOK}/webhook-trigger/${uuid}`

// A2P 10DLC compliance webhook. Single URL shared by every form that
// collects a phone number (contact, volunteer, rsvp). Drives the SMS
// consent / subscription workflow and rides alongside each form's
// primary webhook(s).
export const A2P_COMPLIANCE_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/hqfmuiOqLxlS0k9VV4lc'

export const GHL_WEBHOOKS = {
  contact: 'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/09g46Cj3ygV1R5aoAM2o',
  volunteer: [
    'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/QfDhvzPhlwkovxmcFEZl',
    'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/xCO2smONLmx8CsZZuVus',
    'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/TGF8MYaxXDm7YC9t2OkD',
  ],
  rsvp: 'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/lmGoHsLcbAbTYKQn5oep',
  askMark: [
    'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/Z22L9yu7Z3CdQGxe0UFt',
    hook('3c2d23be-00aa-49d5-9d14-6597d2e93123'),
  ],
}

export const GHL_REST = {
  base: 'https://services.leadconnectorhq.com',
  apiVersion: '2021-04-15',
  calendarId: process.env.GHL_CALENDAR_ID || 'UTM5EkrGwiZjQyc19WGN',
  locationId: process.env.GHL_LOCATION_ID || '',
  apiToken: process.env.GHL_API_TOKEN || '',
}

export const restHeaders = () => ({
  Authorization: `Bearer ${GHL_REST.apiToken}`,
  Version: GHL_REST.apiVersion,
  'Content-Type': 'application/json',
  Accept: 'application/json',
})

export const yesNo = (value) => (value ? 'Yes' : 'No')

export const buildBasePayload = (type, source) => ({
  type,
  source,
  submitted_at: new Date().toISOString(),
})

export const forwardWebhook = async (url, payload) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res
}
