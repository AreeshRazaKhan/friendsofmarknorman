import Link from 'next/link'
import PropTypes from 'prop-types'
import { ArrowRight } from 'lucide-react'

import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { PILLARS } from '@/constants/site'

const PillarCard = ({ name, headline, summary }) => {
  return (
    <article className="flex h-full flex-col gap-4 border-t border-bone px-6 py-10 first:border-t-0 lg:border-l lg:border-t-0 lg:px-10 lg:first:border-l-0">
      <p className="eyebrow">{name.toLowerCase()}</p>
      <h3
        className="display text-3xl text-navy sm:text-4xl"
        dangerouslySetInnerHTML={{ __html: headline }}
      />
      <p className="text-sm leading-relaxed text-stone-dark">{summary}</p>
    </article>
  )
}

PillarCard.propTypes = {
  name: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
}

const PillarsSection = () => {
  return (
    <section className="relative bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <Reveal variant="left" duration={0.7}>
          <div className="flex flex-col gap-4 border-y border-bone py-10">
            <h2 className="display text-3xl text-navy sm:text-4xl lg:text-5xl">
              Focused on the <em>priorities.</em>
            </h2>
          </div>
        </Reveal>

        <RevealGroup stagger={0.14} delay={0.1} className="mt-2 grid gap-0 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <RevealItem key={pillar.number} variant="scale" duration={0.6}>
              <PillarCard {...pillar} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal variant="up" delay={0.4} duration={0.6}>
          <div className="mt-12 flex justify-center border-t border-bone pt-10">
            <Link
              href="#platform"
              className="inline-flex min-h-[44px] items-center gap-2 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-red transition-colors hover:text-red-2"
            >
              Read the full platform
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default PillarsSection
