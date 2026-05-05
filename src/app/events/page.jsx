import Link from 'next/link'

import { Button } from '@/components/ui/button'
import PageHero from '@/components/layout/page-hero'
import EventCard from '@/components/events/event-card'

import { CAMPAIGN, EVENTS } from '@/constants/site'

export const metadata = {
  title: `Events — ${CAMPAIGN.candidate} for Oregon`,
  description: 'Where the campaign will be — town halls, coffee chats, door-knocking days, and more across House District 27.',
}

const EventsPage = () => {
  const upcoming = EVENTS.filter((e) => new Date(`${e.date}T00:00:00`) >= new Date('2026-05-05'))

  return (
    <>
      <PageHero
        eyebrow="events / 01"
        title="Where the campaign will <em>be.</em>"
        lead="Town halls, coffee chats, door-knocking days, and small-business roundtables across House District 27. Mark shows up — bring a friend, a neighbor, or a skeptical relative."
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="red">
            <Link href="#calendar">See the calendar</Link>
          </Button>
          <Button asChild variant="invert">
            <Link href="mailto:events@marknormanfororegon.com">Host an event</Link>
          </Button>
        </div>
      </PageHero>

      <section id="calendar" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow-bracket eyebrow">on the calendar / 02</p>
              <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
                Next <em>up.</em>
              </h2>
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-stone">
              {upcoming.length} event{upcoming.length === 1 ? '' : 's'} scheduled
            </p>
          </div>

          {upcoming.length > 0 ? (
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4">
              {upcoming.map((event) => (
                <EventCard key={event.slug} {...event} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-bone bg-paper-2 p-10 text-center">
              <p className="font-sans text-lg font-bold text-navy">No events scheduled right now.</p>
              <p className="mt-3 max-w-prose text-stone-dark">
                Check back soon — or sign up for updates and we&apos;ll send the next event the
                moment it drops.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild variant="red">
                  <Link href="/#sign-up">Get updates</Link>
                </Button>
                <Button asChild variant="primary">
                  <Link href="mailto:events@marknormanfororegon.com">Host an event</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-16 lg:px-10 lg:py-20">
          <p className="eyebrow-bracket eyebrow text-red-3">host an event / 03</p>
          <h2 className="display text-4xl text-paper sm:text-5xl">
            Open your <em>door.</em>
          </h2>
          <p className="max-w-prose text-paper-78">
            The strongest events on the schedule are the ones a neighbor invited us to. House
            parties, coffee groups, book clubs, business networks, faith communities — anywhere ten
            people are willing to gather. We bring the candidate. You bring the room.
          </p>
          <Button asChild variant="invert">
            <Link href="mailto:events@marknormanfororegon.com">Email events team</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default EventsPage
