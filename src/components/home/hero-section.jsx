import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { CAMPAIGN, ELEVATOR_PITCH } from '@/constants/site'

const CREDENTIALS = ['Navy Veteran', 'Veterinarian', 'Small-Business Owner']

const HeroSection = () => {
  return (
    <section className="relative flex h-[calc(100svh-5rem)] items-center justify-center overflow-hidden bg-navy text-paper sm:h-[calc(100svh-5.5rem)]">
      <div
        className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-6 py-12 text-center lg:gap-6 lg:px-10 lg:py-16">
        <Reveal variant="down" duration={0.5}>
          <span className="eyebrow-bracket font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-red-3">
            friends of mark norman / {CAMPAIGN.cycle}
          </span>
        </Reveal>

        <Reveal variant="blur" delay={0.15} duration={1}>
          <h1 className="display text-[clamp(2.75rem,8vw,6rem)]">
            Grounded leadership<br />
            <em>for Oregon.</em>
          </h1>
        </Reveal>

        <Reveal variant="fade" delay={0.45} duration={0.6}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper-78">
            {CAMPAIGN.office} · {CAMPAIGN.party} · {CAMPAIGN.cycle}
          </p>
        </Reveal>

        <RevealGroup delay={0.6} stagger={0.1}>
          <ul role="list" className="flex flex-wrap justify-center gap-2">
            {CREDENTIALS.map((credential) => (
              <RevealItem key={credential} variant="scale" duration={0.5} as="li">
                <span className="inline-flex items-center gap-2 rounded-pill border border-paper-78/30 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-paper [word-spacing:-0.22em]">
                  <span aria-hidden="true" className="text-red-3">
                    ★
                  </span>
                  {credential}
                </span>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>

        <Reveal variant="up" delay={0.95} duration={0.7}>
          <p className="max-w-[58ch] text-sm leading-relaxed text-paper-78 lg:text-base">
            {ELEVATOR_PITCH}
          </p>
        </Reveal>

        <Reveal variant="rise" delay={1.15} duration={0.6}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="red">
              <Link href="/donate">
                Donate Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="invert">
              <Link href="/volunteer">Join Us</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default HeroSection
