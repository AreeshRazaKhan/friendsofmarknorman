// A2P 10DLC compliance webhook. Single URL shared by every form that
// collects a phone number (contact, volunteer, rsvp, ask mark). Drives
// the SMS consent / subscription workflow and rides alongside each form's
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
  ],
  // Voter Guide opt-in funnel (/voter-guide). Primary workflow webhook for
  // the lead-magnet funnel; the route fans this out alongside the shared
  // A2P compliance webhook (same pattern as the other forms).
  voterGuide: [
    'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/7f867349-ace2-4b71-ad16-76339731965b',
  ],
  // QR print-media funnel (/meet-mark). Dedicated workflow webhook — leads
  // arrive with type QR_Funnel and qr_source (flyer/banner/mailer/...) for
  // per-material attribution. Fans out alongside the A2P compliance webhook.
  qrFunnel: [
    'https://services.leadconnectorhq.com/hooks/xpk2cvMlHO4xSLm4NgAz/webhook-trigger/3c4691ee-3a59-476a-8ceb-3c7bb74b2b45',
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

// ---------------------------------------------------------------------------
// Events — GHL Custom Object integration
//
// Events are stored in a GHL custom object (schema key
// `custom_objects.events`), NOT the native calendar API. See
// `.claude/rules/ghl-events-integration.md` for the full contract.
// ---------------------------------------------------------------------------

const EVENTS_SCHEMA_KEY = 'custom_objects.events'
const EVENTS_API_VERSION = '2021-07-28'

export const eventHeaders = () => ({
  Authorization: `Bearer ${GHL_REST.apiToken}`,
  Version: EVENTS_API_VERSION,
  Accept: 'application/json',
})

const TIME_LABELS = {
  '600_am': '6:00 AM', '630_am': '6:30 AM',
  '700_am': '7:00 AM', '730_am': '7:30 AM',
  '800_am': '8:00 AM', '830_am': '8:30 AM',
  '900_am': '9:00 AM', '930_am': '9:30 AM',
  '1000_am': '10:00 AM', '1030_am': '10:30 AM',
  '1100_am': '11:00 AM', '1130_am': '11:30 AM',
  '1200_pm': '12:00 PM', '1230_pm': '12:30 PM',
  '100_pm': '1:00 PM', '130_pm': '1:30 PM',
  '200_pm': '2:00 PM', '230_pm': '2:30 PM',
  '300_pm': '3:00 PM', '330_pm': '3:30 PM',
  '400_pm': '4:00 PM', '430_pm': '4:30 PM',
  '500_pm': '5:00 PM', '530_pm': '5:30 PM',
  '600_pm': '6:00 PM', '630_pm': '6:30 PM',
  '700_pm': '7:00 PM', '730_pm': '7:30 PM',
  '800_pm': '8:00 PM', '830_pm': '8:30 PM',
  '900_pm': '9:00 PM',
}

const CATEGORY_LABELS = {
  rally: 'Rally',
  town_hall: 'Town Hall',
  fundraiser: 'Fundraiser',
  debate: 'Debate',
  press_conference: 'Press Conference',
  community_meetup: 'Community Meetup',
  volunteer_drive: 'Volunteer Drive',
  doortodoor_campaign: 'Door-to-Door Campaign',
  victory_celebration: 'Victory Celebration',
  protest__march: 'Protest / March',
  other: 'Other',
}

const SAFE_DATE = { month: '', day: '', year: '', raw: '' }

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parseDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null
  // 'T00:00:00' avoids UTC/local timezone drift that would shift the day.
  const d = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(d.getTime())) return null
  return {
    month: MONTH_ABBR[d.getMonth()],
    day: String(d.getDate()).padStart(2, '0'),
    year: String(d.getFullYear()),
    raw: dateStr,
  }
}

const normalizeEvent = (record) => {
  const props = record?.properties || {}
  // GHL field names: `event_start_date`, `event_start_time`, `event_end_time`.
  // Older legacy keys (`event_date`, `select_time`, `end_time`) are read as
  // fallbacks so a schema rename in GHL does not break rendering instantly.
  const startDate = parseDate(props.event_start_date || props.event_date) || SAFE_DATE
  const endDate = parseDate(props.event_end_date)
  const imageUrl = Array.isArray(props.event_image) && props.event_image[0]?.url
    ? props.event_image[0].url
    : '/placeholder-event.svg'
  const categorySlug = props.event_category || ''
  const timeSlug = props.event_start_time || props.select_time || ''
  const endTimeSlug = props.event_end_time || props.end_time || ''
  const location = props.event_location || ''

  return {
    id: record?.id || '',
    title: props.event_name || '',
    description: props.event_description || '',
    date: startDate,
    endDate,
    time: TIME_LABELS[timeSlug] || timeSlug || '',
    endTime: TIME_LABELS[endTimeSlug] || endTimeSlug || '',
    location,
    address: location,
    image: imageUrl,
    type: CATEGORY_LABELS[categorySlug] || categorySlug || '',
    source: 'ghl',
  }
}

export const fetchGHLEvents = async () => {
  if (!GHL_REST.apiToken || !GHL_REST.locationId) return []
  try {
    const res = await fetch(
      `${GHL_REST.base}/objects/${EVENTS_SCHEMA_KEY}/records/search`,
      {
        method: 'POST',
        headers: { ...eventHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: GHL_REST.locationId,
          page: 1,
          pageLimit: 50,
          query: '',
          searchAfter: [],
        }),
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) {
      console.error('[fetchGHLEvents] upstream', res.status)
      return []
    }
    const data = await res.json()
    const records = data?.records ?? []
    return records
      .map(normalizeEvent)
      .sort((a, b) => {
        const da = a.date.raw ? new Date(a.date.raw) : new Date(0)
        const db = b.date.raw ? new Date(b.date.raw) : new Date(0)
        return da - db
      })
  } catch (error) {
    console.error('[fetchGHLEvents]:', error)
    return []
  }
}

export const fetchGHLEvent = async (eventId) => {
  if (!eventId || !GHL_REST.apiToken) return null
  try {
    const res = await fetch(
      `${GHL_REST.base}/objects/${EVENTS_SCHEMA_KEY}/records/${eventId}`,
      { headers: eventHeaders(), next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const record = data?.record ?? data
    if (!record?.id && !record?.properties) return null
    return normalizeEvent(record)
  } catch (error) {
    console.error('[fetchGHLEvent]:', error)
    return null
  }
}
