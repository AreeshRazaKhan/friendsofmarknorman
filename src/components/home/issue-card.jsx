import PropTypes from 'prop-types'

const IssueCard = ({ index, title, summary, bullets }) => {
  const num = String(index + 1).padStart(2, '0')

  return (
    <article className="flex h-full flex-col gap-6 px-2 py-10 md:px-6 md:py-12 lg:px-10">
      <div className="flex items-baseline gap-4">
        <span className="font-sans text-6xl font-bold leading-none tracking-tight text-red lg:text-7xl">
          {num}
        </span>
      </div>

      <h3 className="display text-3xl text-navy sm:text-4xl">{title}.</h3>

      <p className="text-base leading-relaxed text-stone-dark">{summary}</p>

      {bullets?.length > 0 && (
        <ol className="mt-2 flex flex-col gap-4 text-sm text-stone-dark">
          {bullets.map((line, i) => (
            <li key={line} className="grid grid-cols-[2rem_1fr] items-start gap-3">
              <span className="pt-[3px] font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-red">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ol>
      )}
    </article>
  )
}

IssueCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.string),
}

IssueCard.defaultProps = {
  bullets: [],
}

export default IssueCard
