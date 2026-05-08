import { NextResponse } from 'next/server'

import { fetchGHLEvents } from '@/lib/ghl'

export const revalidate = 60

export const GET = async () => {
  try {
    const events = await fetchGHLEvents()
    return NextResponse.json({ events, total: events.length })
  } catch (error) {
    console.error('[Events API]:', error)
    return NextResponse.json({ events: [], total: 0 }, { status: 500 })
  }
}
