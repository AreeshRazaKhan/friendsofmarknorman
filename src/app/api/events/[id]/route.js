import { NextResponse } from 'next/server'

import { fetchGHLEvent } from '@/lib/ghl'

export const revalidate = 60

export const GET = async (_request, { params }) => {
  try {
    const { id } = params
    const event = await fetchGHLEvent(id)
    return event
      ? NextResponse.json({ event })
      : NextResponse.json({ event: null }, { status: 404 })
  } catch (error) {
    console.error('[Event API]:', error)
    return NextResponse.json({ event: null }, { status: 500 })
  }
}
