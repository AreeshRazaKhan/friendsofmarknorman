import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import EventCard from '@/components/events/event-card'
import RsvpForm from '@/components/events/rsvp-form'

import { CAMPAIGN, EVENTS } from '@/constants/site'

const formatDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const generateStaticParams = () => EVENTS.map((e) => ({ id: e.slug }))

export const generateMetadata = ({ params }) => {
  const event = EVENTS.find((e) => e.slug === params.id)
  if (!event) return { title: `Event not found — ${CAMPAIGN.candidate} for Oregon` }
  return {
    title: `${event.title} — ${CAMPAIGN.candidate} for Oregon`,
    description: event.summary,
  }
}

const EventDetailPage = ({ params }) => {
  const event = EVENTS.find((e) => e.slug === params.id)
  if (!event) notFound()

  const others = EVENTS.filter((e) => e.slug !== event.slug).slice(0, 3)

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
            <p className="eyebrow-bracket eyebrow text-red-3">{event.eyebrow.toLowerCase()}</p>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl">{event.title}.</h1>
            <p className="max-w-prose text-paper-78 lg:text-lg">{event.summary}</p>

            <dl className="mt-2 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-4 w-4 text-red-3" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red-3">
                    When
                  </dt>
                  <dd className="font-sans text-base font-semibold text-paper">
                    {formatDate(event.date)}
                  </dd>
                  <dd className="text-sm text-paper-78">{event.time}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-red-3" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red-3">
                    Where
                  </dt>
                  <dd className="font-sans text-base font-semibold text-paper">{event.location}</dd>
                  <dd className="text-sm text-paper-78">{event.address}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-6">
            <p className="eyebrow-bracket eyebrow">about this event / 02</p>
            <h2 className="display text-3xl text-navy sm:text-4xl">
              What to <em>expect.</em>
            </h2>
            <p className="text-base leading-relaxed text-stone-dark">{event.description}</p>

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
                <p className="eyebrow-bracket eyebrow">also coming up / 03</p>
                <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
                  Other <em>events.</em>
                </h2>
              </div>
              <Button asChild variant="primary">
                <Link href="/events">See all events</Link>
              </Button>
            </div>
            <div className="mt-12 grid md:grid-cols-3">
              {others.map((other) => (
                <EventCard key={other.slug} {...other} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default EventDetailPage
