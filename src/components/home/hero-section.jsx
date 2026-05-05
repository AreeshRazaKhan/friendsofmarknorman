import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import BrandMark from '@/components/brand/brand-mark'

import { CAMPAIGN, ELEVATOR_PITCH } from '@/constants/site'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-navy text-paper">
      <div className="bg-stripe pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-8">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-red-3">
            <span aria-hidden="true">★</span> Friends of Mark Norman · {CAMPAIGN.cycle}
          </span>

          <h1 className="display text-6xl sm:text-7xl lg:text-[140px]">
            Mark<br />Norman<br />
            <em>for Oregon.</em>
          </h1>

          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-paper-78">
            Oregon House District 27 · Republican
          </p>

          <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
            {ELEVATOR_PITCH}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild variant="red">
              <Link href="/donate">
                Donate Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="invert">
              <Link href="/issues">Where Mark stands</Link>
            </Button>
            <Button asChild variant="ghost" className="border-paper text-paper hover:bg-navy-3">
              <Link href="/about">About Mark</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute inset-0 bg-red"
            style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
            aria-hidden="true"
          />
          <div
            className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
          />
          <div className="relative flex h-full items-center justify-center p-12">
            <div
              className="rounded-sm border-2 border-navy bg-paper p-8 text-navy shadow-stamp"
              style={{ transform: 'rotate(3deg)' }}
            >
              <BrandMark size="md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
