import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { CAMPAIGN, DONATION_TIERS, buildDonateUrl } from '@/constants/site'

const HELP_BULLETS = [
  'Walk a neighborhood on a weekend.',
  'Make calls from home in the evenings.',
  'Host a coffee or meet-and-greet.',
  'Help spread campaign updates.',
]

const EngagementSection = () => {
  return (
    <section id="get-involved" className="bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <Reveal variant="up" duration={0.75}>
            <div className="flex max-w-2xl flex-col gap-4">
              <h2 className="display text-4xl text-navy sm:text-5xl lg:text-6xl">
                Oregon <em>needs you.</em>
              </h2>
              <p className="text-stone-dark">
                Campaigns are built by people like you who show up. Every contribution helps us reach
                more voters across House District 27, directly, person to person.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.2} duration={0.6}>
            <div className="flex flex-col gap-3 lg:items-end">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                Donate
              </p>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                {DONATION_TIERS.map((tier) => (
                  <Button key={tier.amount} asChild variant="primary" size="sm">
                    <a
                      href={buildDonateUrl(tier.amount)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tier.label}
                    </a>
                  </Button>
                ))}
                <a
                  href={CAMPAIGN.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
                >
                  Other amount →
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0.1} duration={0.85}>
          <div className="relative mt-12 aspect-[12/5] w-full overflow-hidden rounded-2xl border border-bone">
            <Image
              src="/images/volunteers-door-knocking.jpg"
              alt="Volunteers walking a neighborhood with clipboards, knocking on a door at golden hour."
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal variant="blur" duration={0.9}>
          <article
            id="join"
            className="relative mt-14 overflow-hidden rounded-2xl border border-bone bg-navy p-8 text-paper sm:p-12 lg:p-16"
          >
            <div
              className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
              <div className="flex flex-col gap-5">
                <p className="eyebrow-bracket eyebrow text-red-3">join us</p>
                <h3 className="display text-3xl text-paper sm:text-4xl lg:text-5xl">
                  There&apos;s room <em>to help.</em>
                </h3>
                <p className="max-w-prose text-paper-78">
                  Pick what fits you best. Your every move matters.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="red">
                    <Link href="/volunteer">
                      Volunteer
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              <RevealGroup
                stagger={0.1}
                delay={0.35}
                className="grid gap-3 border-t border-paper-78/20 pt-6 text-base leading-relaxed text-paper-78 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
                as="ul"
              >
                {HELP_BULLETS.map((line, i) => (
                  <RevealItem key={line} variant="left" duration={0.5} as="li">
                    <span className="grid grid-cols-[2rem_1fr] items-start gap-3">
                      <span className="pt-[2px] font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-red-3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{line}</span>
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

export default EngagementSection
