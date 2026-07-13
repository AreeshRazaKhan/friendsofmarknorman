import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/motion/reveal'

import { CAMPAIGN } from '@/constants/site'
import { appendQueryParams, qrDonateUtm } from '@/lib/url'

export const metadata = {
  title: `Your guide is ready — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Thank you for connecting with the Mark Norman campaign. Download the free guide and stay involved.',
  robots: { index: false, follow: true },
}

const GUIDE_PDF = '/downloads/mark-norman-issues-guide.pdf'

const NEXT_STEPS = [
  {
    label: 'Support the campaign',
    href: appendQueryParams(CAMPAIGN.donateUrl, qrDonateUtm('thank_you')),
    external: true,
    desc: 'Every contribution powers direct conversations with voters across House District 27.',
  },
  {
    label: 'Volunteer',
    href: '/volunteer',
    external: false,
    desc: 'Walk a neighborhood, make calls, host a coffee, or help share campaign updates.',
  },
  {
    label: 'View upcoming events',
    href: '/events',
    external: false,
    desc: 'Meet Mark in the community and hear more about his priorities.',
  },
  {
    label: 'Ask Mark a question',
    href: '/ask-mark',
    external: false,
    desc: 'Send your question directly to the campaign.',
  },
]

const MeetMarkThankYouPage = () => {
  return (
    <>
      {/* Confirmation */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
            <Reveal variant="up" duration={0.75}>
              <div className="flex max-w-xl flex-col items-start gap-6">
                <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
                  Your guide is <em>ready.</em>
                </h1>
                <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
                  Thanks for connecting with the campaign. Download the guide to see where Mark
                  stands on the issues that affect Oregon families every day.
                </p>
                <Button asChild variant="red">
                  <a href={GUIDE_PDF} download>
                    Download the guide (PDF)
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={0.15} duration={0.85}>
              <div className="relative mx-auto w-full max-w-[360px]">
                <Image
                  src="/images/socialism-101-cover.png"
                  alt="Guide cover: A Warning About Democratic Socialism in House District 27."
                  width={816}
                  height={1056}
                  sizes="(min-width: 768px) 360px, 80vw"
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
                Stay connected. <em>Stay involved.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                You scanned the code — that&rsquo;s the first step. Here&rsquo;s how to keep the
                momentum going.
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
                <Link href="/meet-mark">
                  Back to Meet Mark
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

export default MeetMarkThankYouPage
