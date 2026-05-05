import { NextResponse } from 'next/server'

import { buildBasePayload, yesNo } from '@/lib/ghl'

const required = (v) => typeof v === 'string' && v.trim().length > 0

// NOTE: No GHL webhook UUID is documented for the Ask Mark form. This route
// validates input and returns 200; wire the real webhook in @/lib/ghl once a
// workflow URL is provisioned.

export const POST = async (request) => {
  try {
    const body = await request.json()

    const email = (body?.email || '').trim()
    const question = (body?.question || '').trim()

    if (!required(email) || !required(question)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      ...buildBasePayload('Ask_Mark', 'src_ask'),
      firstName: (body?.firstName || '').trim(),
      email,
      zip: (body?.zip || '').trim(),
      topic: (body?.topic || '').trim(),
      question,
      publish_ok: yesNo(body?.publishOk),
    }

    // TODO: forward to GHL once the ask-mark webhook UUID is added to GHL_WEBHOOKS.
    return NextResponse.json({ success: true, payload }, { status: 200 })
  } catch (error) {
    console.error('[api/ask]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
