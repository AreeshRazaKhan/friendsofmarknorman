const GHL_HOOK = process.env.GHL_WEBHOOK_HOOK || 'HK7KWJYbw33yisOBMGEO'

const hook = (uuid) =>
  `https://services.leadconnectorhq.com/hooks/${GHL_HOOK}/webhook-trigger/${uuid}`

export const GHL_WEBHOOKS = {
  contact: hook('cf2eced9-14ad-4109-ba4f-fd244858af10'),
  volunteer: [
    hook('23834100-4e00-4579-82e7-f9ec69ed8542'),
    hook('df947411-0c7e-4a6c-8c2e-7f20291c333f'),
    hook('19e7758c-f5c5-44fa-a770-5c18cefa0645'),
  ],
  issues: hook('3c2d23be-00aa-49d5-9d14-6597d2e93123'),
  rsvp: hook('b8b53720-18c4-4cde-9db9-c549de6264ee'),
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
