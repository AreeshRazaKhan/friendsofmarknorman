import { NextResponse } from 'next/server'

import {
  A2P_COMPLIANCE_WEBHOOK,
  GHL_REST,
  GHL_WEBHOOKS,
  a2pFlag,
  buildBasePayload,
  forwardWebhook,
  restHeaders,
  yesNo,
} from '@/lib/ghl'
import { isPhoneComplete, normalizePhoneForSubmit } from '@/lib/phone'

const required = (v) => typeof v === 'string' && v.trim().length > 0

const WEBHOOK_URLS = [GHL_WEBHOOKS.rsvp, A2P_COMPLIANCE_WEBHOOK]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const buildAppointmentTimes = (eventDate, eventTime) => {
  // eventDate like "2026-05-22", eventTime like "6:30 PM – 8:00 PM PT"
  // Parse the start time portion of eventTime; fall back to noon if parsing fails.
  const start = new Date(`${eventDate}T12:00:00`)
  const match = (eventTime || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (match) {
    let hours = Number(match[1])
    const minutes = Number(match[2])
    const meridian = match[3].toUpperCase()
    if (meridian === 'PM' && hours < 12) hours += 12
    if (meridian === 'AM' && hours === 12) hours = 0
    start.setHours(hours, minutes, 0, 0)
  }
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  return { startTime: start.toISOString(), endTime: end.toISOString() }
}

const searchContactByEmail = async (email) => {
  if (!GHL_REST.locationId || !GHL_REST.apiToken) return null
  try {
    const url = `${GHL_REST.base}/contacts/search/duplicate?locationId=${encodeURIComponent(
      GHL_REST.locationId
    )}&email=${encodeURIComponent(email)}`
    const res = await fetch(url, { headers: restHeaders() })
    if (!res.ok) return null
    const data = await res.json()
    return data?.contact?.id || data?.id || null
  } catch (error) {
    console.error('[api/events/rsvp searchContact]:', error)
    return null
  }
}

const createAppointment = async ({ contactId, eventName, eventDate, eventTime }) => {
  if (!contactId || !GHL_REST.locationId || !GHL_REST.apiToken) return null
  try {
    const { startTime, endTime } = buildAppointmentTimes(eventDate, eventTime)
    const url = `${GHL_REST.base}/calendars/events/appointments`
    const res = await fetch(url, {
      method: 'POST',
      headers: restHeaders(),
      body: JSON.stringify({
        calendarId: GHL_REST.calendarId,
        locationId: GHL_REST.locationId,
        contactId,
        title: `RSVP: ${eventName}`,
        appointmentStatus: 'confirmed',
        startTime,
        endTime,
        timezone: 'America/Los_Angeles',
        notes: 'RSVP submitted via campaign website',
      }),
    })
    if (!res.ok) {
      console.error('[api/events/rsvp createAppointment] upstream', res.status)
      return null
    }
    return await res.json()
  } catch (error) {
    console.error('[api/events/rsvp createAppointment]:', error)
    return null
  }
}

export const POST = async (request) => {
  try {
    const body = await request.json()

    const firstName = (body?.firstName || '').trim()
    const email = (body?.email || '').trim()
    const phone = (body?.phone || '').trim()

    if (!required(firstName) || !required(email)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Phone stays optional, but a partial number is rejected rather than
    // silently dropped — the submitter gets a chance to correct it.
    if (phone && !isPhoneComplete(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    const normalizedPhone = normalizePhoneForSubmit(phone)

    const payload = {
      ...buildBasePayload('Event_RSVP', 'src_event'),
      firstName,
      lastName: (body?.lastName || '').trim(),
      email,
      phone: normalizedPhone,
      eventName: (body?.eventName || '').trim(),
      eventDate: (body?.eventDate || '').trim(),
      eventTime: (body?.eventTime || '').trim(),
      eventCategory: (body?.eventCategory || '').trim(),
      // One consent checkbox now covers both informational and fundraising
      // messaging (see .claude/rules/peerly-10dlc-compliance.md). Both GHL
      // flags derive from it so existing CRM workflows keep working.
      sms_updates: yesNo(body?.sms_consent),
      sms_promo: yesNo(body?.sms_consent),
      a2p: a2pFlag(normalizedPhone, body?.sms_consent),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardWebhook(url, payload).catch((err) => {
          console.error('[api/events/rsvp fanout]:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return NextResponse.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    // Wait for GHL workflow to upsert the contact
    await sleep(2000)

    const contactId = await searchContactByEmail(email)
    if (contactId) {
      await createAppointment({
        contactId,
        eventName: payload.eventName,
        eventDate: payload.eventDate,
        eventTime: payload.eventTime,
      })
    }

    return NextResponse.json({ success: true, contactId }, { status: 200 })
  } catch (error) {
    console.error('[api/events/rsvp]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
