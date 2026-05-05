import { NextResponse } from 'next/server'

import { GHL_WEBHOOKS, buildBasePayload, forwardWebhook, yesNo } from '@/lib/ghl'

const required = (v) => typeof v === 'string' && v.trim().length > 0

export const POST = async (request) => {
  try {
    const body = await request.json()

    const firstName = (body?.firstName || '').trim()
    const lastName = (body?.lastName || '').trim()
    const email = (body?.email || '').trim()
    const phone = (body?.phone || '').trim()
    const message = (body?.message || '').trim()

    if (!required(firstName) || !required(lastName) || !required(email) || !required(message)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      ...buildBasePayload('Contact_Form', 'src_contact'),
      firstName,
      lastName,
      email,
      phone,
      message,
      sms_updates: yesNo(body?.sms_updates),
      sms_promo: yesNo(body?.sms_promo),
    }

    const res = await forwardWebhook(GHL_WEBHOOKS.contact, payload)

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Upstream webhook failed', upstream: res.status },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[api/contact]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
