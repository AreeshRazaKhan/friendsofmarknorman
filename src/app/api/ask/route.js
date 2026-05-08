import { NextResponse } from 'next/server'

import {
  A2P_COMPLIANCE_WEBHOOK,
  GHL_WEBHOOKS,
  buildBasePayload,
  forwardWebhook,
  yesNo,
} from '@/lib/ghl'
import { normalizePhoneForSubmit } from '@/lib/phone'

const required = (v) => typeof v === 'string' && v.trim().length > 0

const splitFullName = (name) => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: '', lastName: '' }
  const [firstName, ...rest] = parts
  return { firstName, lastName: rest.join(' ') }
}

const deriveSubject = (question) => {
  const trimmed = (question || '').trim()
  if (trimmed.length <= 80) return trimmed
  return trimmed.slice(0, 77).trimEnd() + '…'
}

// Ask Mark fans out to its primary workflow webhook(s) plus the A2P
// compliance webhook in parallel. The submission is treated as
// successful if at least one webhook returns 2xx.
const WEBHOOK_URLS = [...GHL_WEBHOOKS.askMark, A2P_COMPLIANCE_WEBHOOK]

export const POST = async (request) => {
  try {
    const body = await request.json()

    const email = (body?.email || '').trim()
    const question = (body?.question || '').trim()

    if (!required(email) || !required(question)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { firstName, lastName } = splitFullName(body?.name)

    const payload = {
      ...buildBasePayload('Ask_Mark', 'src_ask'),
      firstName,
      lastName,
      email,
      phone: normalizePhoneForSubmit(body?.phone),
      issue_category: (body?.topic || '').trim(),
      issue_location: (body?.zip || '').trim(),
      issue_subject: deriveSubject(question),
      issue_description: question,
      issue_image: '',
      sms_updates: yesNo(body?.sms_updates),
      sms_promo: yesNo(body?.sms_promo),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardWebhook(url, payload).catch((err) => {
          console.error('[api/ask fanout]:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return NextResponse.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[api/ask]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
