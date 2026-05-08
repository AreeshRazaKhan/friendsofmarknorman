import Link from 'next/link'

import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/brand/placeholder-image'
import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { ABOUT_STATS, ABOUT_STORY } from '@/constants/site'

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-navy text-paper">
      <div
        className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10 lg:py-28">
        <Reveal variant="left" duration={0.9}>
          <div className="relative">
            <PlaceholderImage
              width={640}
              height={800}
              seed="mark-norman-with-constituents"
              alt="Placeholder image — replace with the candidate-with-constituents shot"
              badge="About · Constituents"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] w-full rounded-[2rem] border border-paper-78/20"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 lg:pt-4">
          <Reveal variant="right" delay={0.15} duration={0.7}>
            <p className="eyebrow-bracket eyebrow text-red-3">Mark Norman</p>
            <h2 className="display mt-4 text-4xl text-paper sm:text-5xl lg:text-6xl">
              A voice for <em>working families.</em>
            </h2>
          </Reveal>

          <RevealGroup
            stagger={0.12}
            delay={0.3}
            className="space-y-5 text-base leading-relaxed text-paper-78"
          >
            {ABOUT_STORY.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 24)} variant="fade" duration={0.7} as="p">
                {paragraph}
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup
            stagger={0.12}
            delay={0.4}
            className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-paper-78/20 py-8 sm:grid-cols-4"
            as="dl"
          >
            {ABOUT_STATS.map((stat) => (
              <RevealItem key={stat.descriptor} variant="scale" duration={0.6}>
                <div className="flex flex-col gap-2">
                  <dt className="flex items-baseline">
                    <span className="stat-plus" aria-hidden="true">
                      +
                    </span>
                    <span className="stat-numeral-paper">{stat.number}</span>
                  </dt>
                  <dd className="stat-descriptor-dark">{stat.descriptor}</dd>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal variant="rise" delay={0.5} duration={0.6}>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="invert">
                <Link href="/about">Read more about Mark</Link>
              </Button>
              <Button asChild variant="ghost" className="border-paper text-paper hover:bg-navy-3">
                <Link href="#faq">Common questions</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
