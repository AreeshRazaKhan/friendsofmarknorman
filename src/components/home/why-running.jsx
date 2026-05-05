import { STORY_QUOTE } from '@/constants/site'

const WhyRunning = () => {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[auto_1fr] lg:gap-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Why I&apos;m running</p>
          <span
            className="font-sans text-[140px] font-bold leading-none text-red"
            aria-hidden="true"
          >
            “
          </span>
        </div>

        <figure className="flex flex-col gap-6">
          <blockquote className="display text-3xl text-navy sm:text-4xl lg:text-5xl">
            <p>
              {STORY_QUOTE.body.split('. ').map((sentence, i, arr) => {
                const text = i === arr.length - 1 ? sentence : `${sentence}. `
                if (i === 1) {
                  return (
                    <span key={i}>
                      <em>{text}</em>
                    </span>
                  )
                }
                return <span key={i}>{text}</span>
              })}
            </p>
          </blockquote>

          <figcaption className="flex items-center gap-4 border-t border-bone pt-6">
            <span className="h-[2px] w-10 bg-red" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-stone">
              {STORY_QUOTE.attribution}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default WhyRunning
