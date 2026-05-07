import Link from 'next/link'
import PropTypes from 'prop-types'
import { ArrowRight, MapPin } from 'lucide-react'

const formatDateParts = (iso) => {
  const d = new Date(`${iso}T00:00:00`)
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
  }
}

const EventCard = ({ slug, title, eyebrow, date, time, location, summary, rsvpRequired }) => {
  const { weekday, day, month } = formatDateParts(date)

  return (
    <article className="relative flex h-full flex-col gap-6 pt-9 before:absolute before:left-0 before:top-0 before:h-[3px] before:w-[60px] before:bg-red before:content-['']">
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

      <div className="flex items-start gap-5">
        <div
          className="flex shrink-0 flex-col overflow-hidden rounded-md border-2 border-navy"
          aria-label={`${weekday} ${month} ${day}`}
        >
          <p className="bg-navy px-3 py-1 text-center font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-paper">
            {weekday}
          </p>
          <p className="bg-white px-4 pb-1 pt-2 text-center font-sans text-[34px] font-bold leading-none text-navy">
            {day}
          </p>
          <p className="bg-white pb-2 text-center font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-stone">
            {month}
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-0.5">
          <h3 className="display text-2xl text-navy lg:text-[28px]">{title}.</h3>
          <p className="font-sans text-base font-semibold text-navy">{time}</p>
          <p className="flex items-start gap-1.5 text-sm text-stone-dark">
            <MapPin className="mt-[3px] h-3.5 w-3.5 shrink-0 text-red" aria-hidden="true" />
            <span>{location}</span>
          </p>
        </div>
      </div>

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
