import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { ABOUT_STATS } from '@/constants/site'

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-navy text-paper">
      <div
        className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <RevealGroup
          stagger={0.12}
          delay={0.15}
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          as="dl"
        >
          {ABOUT_STATS.map((stat) => (
            <RevealItem key={`${stat.number}-${stat.descriptor}`} variant="scale" duration={0.6}>
              <div className="flex flex-col gap-3">
                <dt className="flex items-baseline leading-none">
                  <span className="stat-numeral-paper">{stat.number}</span>
                </dt>
                <dd className="stat-descriptor-dark leading-snug tracking-[0.16em]">
                  {stat.descriptor}
                </dd>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default StatsSection
