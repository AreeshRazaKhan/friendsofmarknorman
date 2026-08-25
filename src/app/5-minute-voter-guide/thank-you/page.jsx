import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/motion/reveal'

import { CAMPAIGN } from '@/constants/site'

export const metadata = {
  title: `Your voter guide is ready — ${CAMPAIGN.candidate} for Oregon`,
  description: 'Thank you for downloading The 5-Minute Voter Guide to Mark Norman.',
  robots: { index: false, follow: true },
}

const GUIDE_PDF = '/downloads/mark-norman-5-min-voter-guide.pdf'
const GUIDE_COVER = '/images/5-min-voter-guide-cover.png'

const NEXT_STEPS = [
  {
    label: 'Ask Mark a question',
    href: '/5-minute-voter-guide#ask-mark',
    external: false,
    desc: 'Have a question about an issue affecting your family, neighborhood, school, or business?',
  },
  {
    label: 'Volunteer with the campaign',
    href: '/volunteer',
    external: false,
    desc: 'Help the campaign reach more voters across House District 27.',
  },
  {
    label: 'Donate to the campaign',
    href: CAMPAIGN.donateUrl,
    external: true,
    desc: 'Support signs, mail, events, calls, digital outreach, and voter contact.',
  },
  {
    label: 'Share this page',
    href: '/5-minute-voter-guide',
    external: false,
    desc: 'Know someone in House District 27 who should learn about Mark?',
  },
]

const ThankYouPage = () => {
  return (
    <>
      {/* Confirmation */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
            <Reveal variant="up" duration={0.75}>
              <div className="flex max-w-xl flex-col items-start gap-6">
                <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
                  Your voter guide is <em>ready.</em>
                </h1>
                <div className="flex max-w-prose flex-col gap-3 text-base leading-relaxed text-paper-78 lg:text-lg">
                  <p>Thank you for downloading The 5-Minute Voter Guide to Mark Norman.</p>
                  <p>
                    Inside, you&rsquo;ll learn who Mark is, why he is running, and where he stands on
                    the issues affecting Oregon families every day, including affordability,
                    education, public safety, small business, healthcare, energy, veterans, and
                    government accountability.
                  </p>
                </div>
                <Button asChild variant="red">
                  <a href={GUIDE_PDF} download>
                    Download the guide (PDF)
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={0.15} duration={0.85}>
              <div className="relative mx-auto w-full max-w-[400px]">
                <Image
                  src={GUIDE_COVER}
                  alt="Guide cover: The 5-Minute Voter Guide to Mark Norman."
                  width={816}
                  height={1056}
                  sizes="(min-width: 768px) 400px, 80vw"
                  className="h-auto w-full rounded-md border-[1.5px] border-paper-78/30"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.6}>
            <div className="flex max-w-3xl flex-col items-start gap-3">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Take the <em>next step.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                This guide is the first step. Here&rsquo;s how you can stay involved with Mark
                Norman&rsquo;s campaign for Oregon House District 27.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-bone bg-bone sm:grid-cols-2">
            {NEXT_STEPS.map((step, idx) => {
              const Tag = step.external ? 'a' : Link
              const linkProps = step.external
                ? { href: step.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: step.href }

              return (
                <Reveal key={step.label} variant="up" delay={0.05 * idx} duration={0.6}>
                  <Tag
                    {...linkProps}
                    className="group flex h-full flex-col gap-2 bg-white p-8 transition-colors hover:bg-paper lg:p-10"
                  >
                    <span className="inline-flex items-center gap-2 font-sans text-xl font-bold tracking-tight text-navy group-hover:text-red">
                      {step.label}
                      <span aria-hidden="true">→</span>
                    </span>
                    <span className="text-stone-dark">{step.desc}</span>
                  </Tag>
                </Reveal>
              )
            })}
          </div>

          <Reveal variant="up" delay={0.1} duration={0.6}>
            <div className="mt-10">
              <Button asChild variant="ghost">
                <Link href="/5-minute-voter-guide">
                  Back to the guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default ThankYouPage
