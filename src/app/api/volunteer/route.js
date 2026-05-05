import { NextResponse } from 'next/server'

import { GHL_WEBHOOKS, buildBasePayload, forwardWebhook, yesNo } from '@/lib/ghl'

const required = (v) => typeof v === 'string' && v.trim().length > 0

export const POST = async (request) => {
  try {
    const body = await request.json()

    const firstName = (body?.firstName || '').trim()
    const lastName = (body?.lastName || '').trim()
    const email = (body?.email || '').trim()

    if (!required(firstName) || !required(lastName) || !required(email)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const helpOptionsArray = Array.isArray(body?.helpOptions) ? body.helpOptions : []
    const helpOptions = helpOptionsArray.filter((s) => typeof s === 'string' && s.trim()).join(', ')

    const payload = {
      ...buildBasePayload('Volunteer_Form', 'src_volunteer'),
      firstName,
      lastName,
      email,
      phone: (body?.phone || '').trim(),
      zipCode: (body?.zipCode || '').trim(),
      county: (body?.county || '').trim(),
      region: (body?.region || '').trim(),
      registeredVoter: (body?.registeredVoter || '').trim(),
      campaignExperience: (body?.campaignExperience || '').trim(),
      helpOptions,
      availability: (body?.availability || '').trim(),
      issues: (body?.issues || '').trim(),
      anythingElse: (body?.anythingElse || '').trim(),
      sms_updates: yesNo(body?.sms_updates),
      sms_promo: yesNo(body?.sms_promo),
    }

    const results = await Promise.all(
      GHL_WEBHOOKS.volunteer.map((url) =>
        forwardWebhook(url, payload).catch((err) => {
          console.error('[api/volunteer fanout]:', err)
          return null
        })
      )
    )

    const anySuccess = results.some((r) => r && r.ok)
    if (!anySuccess) {
      return NextResponse.json({ error: 'Upstream webhook failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[api/volunteer]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
