import { NextResponse } from 'next/server'

import {
  A2P_COMPLIANCE_WEBHOOK,
  GHL_WEBHOOKS,
  buildBasePayload,
  forwardWebhook,
  yesNo,
} from '@/lib/ghl'
import { isPhoneComplete, normalizePhoneForSubmit } from '@/lib/phone'

const required = (v) => typeof v === 'string' && v.trim().length > 0

const WEBHOOK_URLS = [GHL_WEBHOOKS.contact, A2P_COMPLIANCE_WEBHOOK]

export const POST = async (request) => {
  try {
    const body = await request.json()

    const firstName = (body?.firstName || '').trim()
    const lastName = (body?.lastName || '').trim()
    const email = (body?.email || '').trim()
    const message = (body?.message || '').trim()
    const phone = (body?.phone || '').trim()

    if (!required(firstName) || !required(lastName) || !required(email) || !required(message)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Phone stays optional, but a partial number is rejected rather than
    // silently dropped — the submitter gets a chance to correct it.
    if (phone && !isPhoneComplete(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    const payload = {
      ...buildBasePayload('Contact_Form', 'src_contact'),
      firstName,
      lastName,
      email,
      phone: normalizePhoneForSubmit(phone),
      message,
      // One consent checkbox now covers both informational and fundraising
      // messaging (see .claude/rules/peerly-10dlc-compliance.md). Both GHL
      // flags derive from it so existing CRM workflows keep working.
      sms_updates: yesNo(body?.sms_consent),
      sms_promo: yesNo(body?.sms_consent),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardWebhook(url, payload).catch((err) => {
          console.error('[api/contact fanout]:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return NextResponse.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[api/contact]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
