import Image from 'next/image'
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
    <section className="relative overflow-hidden bg-navy text-paper">
      <div
        className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-10 lg:py-16">
        <div className="flex flex-col items-start gap-5 lg:gap-6">
          <Reveal variant="down" duration={0.5}>
            <span className="eyebrow-bracket font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-red-3">
              friends of mark norman / {CAMPAIGN.cycle}
            </span>
          </Reveal>

          <h1 className="display text-[clamp(2.5rem,6vw,4.75rem)]">
            Grounded leadership<br />
            <em>for Oregon.</em>
          </h1>

          <Reveal variant="fade" delay={0.45} duration={0.6}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper-78">
              {CAMPAIGN.office} · {CAMPAIGN.party} · {CAMPAIGN.cycle}
            </p>
          </Reveal>

          <RevealGroup delay={0.6} stagger={0.1}>
            <ul role="list" className="flex flex-wrap gap-2">
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

          <p className="max-w-[58ch] text-sm leading-relaxed text-paper-78 lg:text-base">
            {ELEVATOR_PITCH}
          </p>

          <Reveal variant="rise" delay={1.15} duration={0.6}>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="red">
                <a href={CAMPAIGN.donateUrl} target="_blank" rel="noopener noreferrer">
                  Donate Now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="invert">
                <Link href="/volunteer">Join Us</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-paper-78/20 lg:max-w-[460px] lg:justify-self-end">
          <Image
            src="/images/mark-hero-portrait.jpg"
            alt="Mark Norman, smiling, in a navy blazer with an American flag lapel pin, photographed outdoors against a green backdrop."
            fill
            sizes="(min-width: 1024px) 460px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
