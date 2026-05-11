import Link from 'next/link'

import { Button } from '@/components/ui/button'
import PageHero from '@/components/layout/page-hero'
import EventCard from '@/components/events/event-card'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { CAMPAIGN } from '@/constants/site'
import { fetchGHLEvents } from '@/lib/ghl'

export const revalidate = 60

export const metadata = {
  title: `Events — ${CAMPAIGN.candidate} for Oregon`,
  description: 'Where the campaign will be — town halls, coffee chats, door-knocking days, and more across House District 27.',
}

const isUpcoming = (event) => {
  if (!event?.date?.raw) return false
  const todayIso = new Date().toISOString().slice(0, 10)
  return event.date.raw >= todayIso
}

const EventsPage = async () => {
  const events = await fetchGHLEvents()
  const upcoming = events.filter(isUpcoming)

  return (
    <>
      <PageHero
        title="Meet Mark <em>in person.</em>"
        lead="This campaign primarily takes place through conversations at District 27 kitchens, coffee tables, and community spaces. These events are an opportunity for direct conversation, for questions, and to hear where things are."
      />

      <section id="calendar" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Upcoming <em>events.</em>
              </h2>
              <p className="mt-4 max-w-prose text-stone-dark">
                These are open community events. No formal setup needed — just show up.
              </p>
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-stone">
              {upcoming.length} event{upcoming.length === 1 ? '' : 's'} scheduled
            </p>
          </div>

          {upcoming.length > 0 ? (
            <RevealGroup
              stagger={0.1}
              className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2"
            >
              {upcoming.map((event) => (
                <RevealItem key={event.id} variant="scale" duration={0.6}>
                  <EventCard event={event} />
                </RevealItem>
              ))}
            </RevealGroup>
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
                  <Link href="mailto:mark@markfororegon.com">Host an event</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-16 lg:px-10 lg:py-20">
          <p className="eyebrow-bracket eyebrow text-red-3">host an event</p>
          <h2 className="display text-4xl text-paper sm:text-5xl">
            Bring the conversation <em>home.</em>
          </h2>
          <p className="max-w-prose text-paper-78">
            Some of the most meaningful events happen when local residents open their doors. Whether
            it&apos;s a small group of neighbors or a casual gathering, the campaign team will help
            organize everything. We bring the candidate. You bring the space.
          </p>
          <Button asChild variant="invert">
            <Link href="mailto:mark@markfororegon.com">Email events team</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default EventsPage
