import Link from 'next/link'

import { Button } from '@/components/ui/button'
import IssueCard from '@/components/home/issue-card'
import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { ISSUES } from '@/constants/site'

const IssueGrid = () => {
  return (
    <section id="platform" className="bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal variant="up" duration={0.7}>
            <div className="max-w-2xl">
              <p className="eyebrow-bracket eyebrow">the platform / 04</p>
              <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
                The full <em>picture.</em>
              </h2>
              <p className="mt-4 max-w-prose text-stone-dark">
                This campaign is shaped by real conversations Mark has had with people across Oregon
                about what they&apos;re actually facing in their homes and workplaces.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.2} duration={0.6}>
            <Button asChild variant="primary">
              <Link href="/issues">Read the full platform</Link>
            </Button>
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.16}
          delay={0.15}
          className="mt-12 grid divide-y divide-bone lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
          {ISSUES.map((issue, idx) => (
            <RevealItem key={issue.slug} variant="rotate" duration={0.7}>
              <IssueCard index={idx} {...issue} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default IssueGrid
