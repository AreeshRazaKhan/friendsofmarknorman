import { NextResponse } from 'next/server'

import { GHL_WEBHOOKS, buildBasePayload, forwardWebhook } from '@/lib/ghl'

const required = (v) => typeof v === 'string' && v.trim().length > 0

const splitName = (full) => {
  const parts = (full || '').trim().split(/\s+/)
  const firstName = parts[0] || ''
  const lastName = parts.slice(1).join(' ')
  return { firstName, lastName }
}

export const POST = async (request) => {
  try {
    const body = await request.json()

    const name = (body?.name || '').trim()
    const email = (body?.email || '').trim()
    const subject = (body?.subject || '').trim()
    const description = (body?.description || '').trim()

    if (!required(name) || !required(email) || !required(subject) || !required(description)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { firstName, lastName } = splitName(name)

    const payload = {
      ...buildBasePayload('Issue_Report', 'src_issue'),
      firstName,
      lastName,
      email,
      issue_category: (body?.category || '').trim(),
      issue_location: (body?.location || '').trim(),
      issue_subject: subject,
      issue_description: description,
      issue_image: '',
    }

    const res = await forwardWebhook(GHL_WEBHOOKS.issues, payload)

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Upstream webhook failed', upstream: res.status },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[api/issues]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
