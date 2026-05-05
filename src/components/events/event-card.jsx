import Link from 'next/link'
import PropTypes from 'prop-types'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'

const formatDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })
}

const EventCard = ({ slug, title, eyebrow, date, time, location, summary, rsvpRequired }) => {
  return (
    <article className="flex h-full flex-col gap-5 border-b border-bone py-8 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
          {eyebrow}
        </span>
        {rsvpRequired && (
          <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-stone">
            / RSVP
          </span>
        )}
      </div>

      <h3 className="display text-2xl text-navy lg:text-3xl">{title}.</h3>

      <dl className="grid gap-2 text-sm text-stone-dark">
        <div className="flex items-start gap-2">
          <Calendar className="mt-0.5 h-4 w-4 text-red" aria-hidden="true" />
          <div>
            <dt className="sr-only">When</dt>
            <dd>
              {formatDate(date)} · {time}
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-red" aria-hidden="true" />
          <div>
            <dt className="sr-only">Where</dt>
            <dd>{location}</dd>
          </div>
        </div>
      </dl>

      <p className="text-sm leading-relaxed text-stone-dark">{summary}</p>

      <Link
        href={`/events/${slug}`}
        className="mt-auto inline-flex min-h-[44px] items-center gap-2 self-start font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
      >
        Details &amp; RSVP
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    </article>
  )
}

EventCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  rsvpRequired: PropTypes.bool,
}

EventCard.defaultProps = {
  rsvpRequired: false,
}

export default EventCard
