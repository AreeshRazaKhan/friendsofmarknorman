import { NextResponse } from 'next/server'

import {
  A2P_COMPLIANCE_WEBHOOK,
  GHL_WEBHOOKS,
  buildBasePayload,
  forwardWebhook,
  yesNo,
} from '@/lib/ghl'
import { isPhoneComplete, normalizePhoneForSubmit } from '@/lib/phone'
import { districtFlag, isValidZip } from '@/lib/zip'

const required = (v) => typeof v === 'string' && v.trim().length > 0

const WEBHOOK_URLS = [...GHL_WEBHOOKS.socialism101, A2P_COMPLIANCE_WEBHOOK]

const GUIDE_URL = 'https://markfororegon.com/downloads/mark-norman-issues-guide.pdf'

export const POST = async (request) => {
  try {
    const body = await request.json()

    const firstName = (body?.firstName || '').trim()
    const lastName = (body?.lastName || '').trim()
    const email = (body?.email || '').trim()
    const zipCode = (body?.zipCode || '').trim()

    if (!required(firstName) || !required(lastName) || !required(email) || !required(zipCode)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isValidZip(zipCode)) {
      return NextResponse.json({ error: 'Invalid ZIP code' }, { status: 400 })
    }

    // Phone stays optional, but a partial number is rejected rather than
    // silently dropped — the submitter gets a chance to correct it.
    const phone = (body?.phone || '').trim()
    if (phone && !isPhoneComplete(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    const payload = {
      ...buildBasePayload('Socialism_101', 'src_socialism_101'),
      firstName,
      lastName,
      email,
      phone: normalizePhoneForSubmit(phone),
      zipCode,
      in_district: districtFlag(zipCode),
      guide_url: GUIDE_URL,
      email_consent: yesNo(body?.email_consent),
      sms_updates: yesNo(body?.sms_updates),
      sms_promo: yesNo(body?.sms_promo),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardWebhook(url, payload).catch((err) => {
          console.error('[api/socialism-101 fanout]:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return NextResponse.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[api/socialism-101]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
