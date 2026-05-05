import { NextResponse } from 'next/server'

import {
  GHL_REST,
  GHL_WEBHOOKS,
  buildBasePayload,
  forwardWebhook,
  restHeaders,
} from '@/lib/ghl'

const required = (v) => typeof v === 'string' && v.trim().length > 0

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

    if (!required(firstName) || !required(email)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      ...buildBasePayload('Event_RSVP', 'src_event'),
      firstName,
      lastName: (body?.lastName || '').trim(),
      email,
      phone: (body?.phone || '').trim(),
      eventName: (body?.eventName || '').trim(),
      eventDate: (body?.eventDate || '').trim(),
      eventTime: (body?.eventTime || '').trim(),
      eventCategory: (body?.eventCategory || '').trim(),
    }

    const res = await forwardWebhook(GHL_WEBHOOKS.rsvp, payload)
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Upstream webhook failed', upstream: res.status },
        { status: 502 }
      )
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
