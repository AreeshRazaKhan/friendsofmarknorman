import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/brand/placeholder-image'
import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { CAMPAIGN, DONATION_TIERS } from '@/constants/site'

const HELP_BULLETS = [
  'Walk a precinct on a Saturday.',
  'Make calls from home, on your evenings.',
  'Host a coffee or a meet-and-greet.',
  'Drop a yard sign for a neighbor.',
]

const EngagementSection = () => {
  return (
    <section id="get-involved" className="bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <Reveal variant="up" duration={0.75}>
            <div className="flex max-w-2xl flex-col gap-4">
              <p className="eyebrow-bracket eyebrow">get involved / 06</p>
              <h2 className="display text-4xl text-navy sm:text-5xl lg:text-6xl">
                The time <em>is now.</em>
              </h2>
              <p className="text-stone-dark">
                Every contribution funds direct voter contact in House District 27 — door-knocking,
                mailers, digital outreach, and events. Pick an amount, or set your own.
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
                    <Link href={`/donate?amount=${tier.amount}`}>{tier.label}</Link>
                  </Button>
                ))}
                <Link
                  href="/donate"
                  className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
                >
                  Other amount →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0.1} duration={0.85}>
          <PlaceholderImage
            width={1280}
            height={520}
            seed="mark-norman-door-knocking-volunteers-hd27"
            alt="Placeholder image — replace with a candid field photo of campaign volunteers door-knocking in HD-27"
            badge="Field · Volunteers"
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="mt-12 aspect-[12/5] w-full rounded-2xl border border-bone"
          />
        </Reveal>

        <RevealGroup
          stagger={0.12}
          className="mt-12 grid gap-x-10 gap-y-8 border-t border-bone pt-10 sm:grid-cols-3"
          as="dl"
        >
          <RevealItem variant="up" duration={0.5}>
            <div className="flex flex-col gap-2">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                Email
              </dt>
              <dd>
                <a
                  className="inline-flex min-h-[44px] items-center font-sans text-base font-semibold text-navy hover:text-red"
                  href={`mailto:${CAMPAIGN.email}`}
                >
                  {CAMPAIGN.email}
                </a>
              </dd>
            </div>
          </RevealItem>
          <RevealItem variant="up" duration={0.5}>
            <div className="flex flex-col gap-2">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                Phone
              </dt>
              <dd>
                <a
                  className="inline-flex min-h-[44px] items-center font-sans text-base font-semibold text-navy hover:text-red"
                  href={`tel:${CAMPAIGN.phone.replace(/[^0-9+]/g, '')}`}
                >
                  {CAMPAIGN.phone}
                </a>
              </dd>
            </div>
          </RevealItem>
          <RevealItem variant="up" duration={0.5}>
            <div className="flex flex-col gap-2">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                Mail a check
              </dt>
              <dd className="font-sans text-base text-navy">{CAMPAIGN.mailing}</dd>
            </div>
          </RevealItem>
        </RevealGroup>

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
                  The campaign <em>needs you.</em>
                </h3>
                <p className="max-w-prose text-paper-78">
                  Door-knock, make a call, host a coffee, drop a yard sign. Pick whatever fits —
                  every bit moves the field.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="red">
                    <Link href="/volunteer">
                      Volunteer
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="border-paper text-paper hover:bg-navy-3"
                  >
                    <Link href="/contact">Get updates</Link>
                  </Button>
                </div>
              </div>

              <RevealGroup
                stagger={0.1}
                delay={0.35}
                className="grid gap-3 border-t border-paper-78/20 pt-6 text-sm leading-relaxed text-paper-78 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
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
