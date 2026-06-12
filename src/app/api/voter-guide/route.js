import { NextResponse } from 'next/server'

import {
  A2P_COMPLIANCE_WEBHOOK,
  GHL_WEBHOOKS,
  buildBasePayload,
  forwardWebhook,
  yesNo,
} from '@/lib/ghl'
import { normalizePhoneForSubmit } from '@/lib/phone'
import { districtFlag, isValidZip } from '@/lib/zip'

const required = (v) => typeof v === 'string' && v.trim().length > 0

const WEBHOOK_URLS = [...GHL_WEBHOOKS.voterGuide, A2P_COMPLIANCE_WEBHOOK]

const GUIDE_URL = 'https://markfororegon.com/downloads/mark-norman-issues-guide.pdf'

export const POST = async (request) => {
  try {
    const body = await request.json()

    const firstName = (body?.firstName || '').trim()
    const lastName = (body?.lastName || '').trim()
    const email = (body?.email || '').trim()
    const zipCode = (body?.zipCode || '').trim()

    if (!required(firstName) || !required(lastName) || !required(email)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (zipCode && !isValidZip(zipCode)) {
      return NextResponse.json({ error: 'Invalid ZIP code' }, { status: 400 })
    }

    const payload = {
      ...buildBasePayload('Voter_Guide', 'src_voter_guide'),
      firstName,
      lastName,
      email,
      phone: normalizePhoneForSubmit(body?.phone),
      zipCode,
      in_district: districtFlag(zipCode),
      guide_url: GUIDE_URL,
      sms_updates: yesNo(body?.sms_updates),
      sms_promo: yesNo(body?.sms_promo),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardWebhook(url, payload).catch((err) => {
          console.error('[api/voter-guide fanout]:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return NextResponse.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[api/voter-guide]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
