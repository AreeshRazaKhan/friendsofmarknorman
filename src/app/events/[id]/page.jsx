import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import EventCard from '@/components/events/event-card'
import RsvpForm from '@/components/events/rsvp-form'

import { CAMPAIGN } from '@/constants/site'
import { fetchGHLEvent, fetchGHLEvents } from '@/lib/ghl'

export const revalidate = 60

const formatLongDate = (iso) => {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const generateMetadata = async ({ params }) => {
  const event = await fetchGHLEvent(params.id)
  if (!event) return { title: `Event not found — ${CAMPAIGN.candidate} for Oregon` }
  return {
    title: `${event.title} — ${CAMPAIGN.candidate} for Oregon`,
    description: event.description?.slice(0, 160) || `Event with ${CAMPAIGN.candidate} in Oregon House District 27.`,
  }
}

const EventDetailPage = async ({ params }) => {
  const event = await fetchGHLEvent(params.id)
  if (!event) notFound()

  const allEvents = await fetchGHLEvents()
  const others = allEvents.filter((e) => e.id !== event.id).slice(0, 3)

  const timeRange = event.endTime ? `${event.time} – ${event.endTime}` : event.time

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:px-10 lg:py-28">
          <Link
            href="/events"
            className="-ml-1 inline-flex min-h-[44px] items-center gap-2 px-1 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-paper-78 hover:text-red-3"
          >
            ← Back to all events
          </Link>

          <div className="mt-8 flex flex-col gap-5">
            {event.type && (
              <p className="eyebrow-bracket eyebrow text-red-3">{event.type.toLowerCase()}</p>
            )}
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl">{event.title}.</h1>
            {event.description && (
              <p className="max-w-prose text-paper-78 lg:text-lg">{event.description}</p>
            )}

            <dl className="mt-2 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-4 w-4 text-red-3" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red-3">
                    When
                  </dt>
                  <dd className="font-sans text-base font-semibold text-paper">
                    {formatLongDate(event.date?.raw)}
                  </dd>
                  {timeRange && <dd className="text-sm text-paper-78">{timeRange}</dd>}
                </div>
              </div>
              {event.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-red-3" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red-3">
                      Where
                    </dt>
                    <dd className="font-sans text-base font-semibold text-paper">{event.location}</dd>
                  </div>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-6">
            <p className="eyebrow-bracket eyebrow">about this event</p>
            <h2 className="display text-3xl text-navy sm:text-4xl">
              What to <em>expect.</em>
            </h2>
            {event.description ? (
              <p className="text-base leading-relaxed text-stone-dark whitespace-pre-line">
                {event.description}
              </p>
            ) : (
              <p className="text-base leading-relaxed text-stone-dark">
                Join Mark for a conversation with neighbors across House District 27.
              </p>
            )}

            <ul className="mt-2 grid gap-3 border-t border-bone pt-6 text-sm text-stone-dark sm:grid-cols-2">
              <li>
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                  Cost
                </span>
                <span className="font-sans text-base font-semibold text-navy">Free</span>
              </li>
              <li>
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                  Open to
                </span>
                <span className="font-sans text-base font-semibold text-navy">
                  HD-27 residents and neighbors
                </span>
              </li>
              <li>
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                  Childcare
                </span>
                <span className="font-sans text-base font-semibold text-navy">
                  Available with 24h notice
                </span>
              </li>
              <li>
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                  Accessibility
                </span>
                <span className="font-sans text-base font-semibold text-navy">
                  Wheelchair-accessible venue
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-bone bg-white p-8 lg:p-10">
            <p className="eyebrow-bracket eyebrow">rsvp</p>
            <h3 className="display mt-3 text-2xl text-navy sm:text-3xl">
              Save your <em>spot.</em>
            </h3>
            <p className="mt-3 text-sm text-stone-dark">
              Drop-ins welcome, but RSVP helps us plan coffee, chairs, and conversations.
            </p>
            <div className="mt-6">
              <RsvpForm event={event} />
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-paper-2">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow-bracket eyebrow">also coming up</p>
                <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
                  Other <em>events.</em>
                </h2>
              </div>
              <Button asChild variant="primary">
                <Link href="/events">See all events</Link>
              </Button>
            </div>
            <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <EventCard key={other.id} event={other} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default EventDetailPage
