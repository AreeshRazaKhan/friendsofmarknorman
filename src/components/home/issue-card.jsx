import PropTypes from 'prop-types'

const IssueCard = ({ icon, title, eyebrow, summary, bullets }) => {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-md border border-bone bg-white p-7">
      <span className="absolute left-0 top-0 h-[3px] w-16 bg-red" aria-hidden="true" />

      <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
        {eyebrow}
      </span>

      <span
        className="mt-5 mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-navy font-bold text-paper"
        aria-hidden="true"
      >
        {icon}
      </span>

      <h3 className="font-sans text-2xl font-bold tracking-tight text-navy">{title}.</h3>
      <p className="mt-3 text-sm leading-relaxed text-stone-dark">{summary}</p>

      {bullets?.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2 border-t border-bone pt-5 text-sm text-stone-dark">
          {bullets.map((line) => (
            <li key={line} className="relative pl-5 leading-relaxed">
              <span
                className="absolute left-0 top-[10px] h-[1.5px] w-3 bg-red"
                aria-hidden="true"
              />
              {line}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

IssueCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.string),
}

IssueCard.defaultProps = {
  bullets: [],
}

export default IssueCard
