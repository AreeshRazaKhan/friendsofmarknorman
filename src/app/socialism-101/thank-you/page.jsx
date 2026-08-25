import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/motion/reveal'

import { CAMPAIGN } from '@/constants/site'

export const metadata = {
  title: `Your guide is ready — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Thank you for downloading A Warning About Democratic Socialism in House District 27.',
  robots: { index: false, follow: true },
}

const GUIDE_PDF = '/downloads/mark-norman-issues-guide.pdf'

const NEXT_STEPS = [
  {
    label: 'Ask Mark a question',
    href: '/ask-mark',
    external: false,
    desc: 'Send your question directly to the campaign.',
  },
  {
    label: 'View upcoming events',
    href: '/events',
    external: false,
    desc: 'Meet Mark in the community and hear more about his priorities.',
  },
  {
    label: 'Volunteer',
    href: '/volunteer',
    external: false,
    desc: 'Walk a neighborhood, make calls, host a coffee, or help share campaign updates.',
  },
  {
    label: 'Review official contribution information',
    href: CAMPAIGN.donateUrl,
    external: true,
    desc: 'Campaign outreach takes resources. Official contribution information is available through the campaign website.',
  },
  {
    label: 'Make a plan to vote',
    href: 'https://oregonvotes.gov',
    external: true,
    desc: 'Stay informed about voter registration, election deadlines, and 2026 election updates through official Oregon election sources.',
  },
]

const ThankYouPage = () => {
  // When the step count is odd, pull the last step out as a full-width banner so
  // the 2-column grid never leaves a trailing empty cell.
  const isOdd = NEXT_STEPS.length % 2 === 1
  const gridSteps = isOdd ? NEXT_STEPS.slice(0, -1) : NEXT_STEPS
  const bannerStep = isOdd ? NEXT_STEPS[NEXT_STEPS.length - 1] : null
  const BannerTag = bannerStep && bannerStep.external ? 'a' : Link
  const bannerProps =
    bannerStep && bannerStep.external
      ? { href: bannerStep?.href, target: '_blank', rel: 'noopener noreferrer' }
      : { href: bannerStep?.href }

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
                  Your guide is <em>ready.</em>
                </h1>
                <div className="flex max-w-prose flex-col gap-3 text-base leading-relaxed text-paper-78 lg:text-lg">
                  <p>
                    Thank you for downloading &ldquo;A Warning About Democratic Socialism in House
                    District 27.&rdquo;
                  </p>
                  <p>
                    Inside, you&rsquo;ll learn why Mark Norman believes House District 27 must
                    reject the socialist agenda of larger government, higher taxes, expanded
                    bureaucracy, public ownership, centralized control, and less freedom for
                    families, workers, taxpayers, and small businesses.
                  </p>
                  <p>
                    You&rsquo;ll also see Mark&rsquo;s practical alternative on animal welfare,
                    data centers, education, local issues over ideology, public safety, small
                    business, transportation and energy, healthcare, and veteran support.
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
                  src="/images/socialism-101-cover.png"
                  alt="Guide cover: A Warning About Democratic Socialism in House District 27."
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
                Stay informed. Compare the visions. <em>Help push back.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                This guide is the first step. Now you can help more voters understand what is at
                stake in House District 27.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-bone bg-bone sm:grid-cols-2">
            {gridSteps.map((step, idx) => {
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

          {bannerStep && (
            <Reveal variant="up" delay={0.2} duration={0.6}>
              <BannerTag
                {...bannerProps}
                className="group mt-4 flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-bone bg-navy p-8 text-paper transition-colors hover:bg-navy-3 sm:flex-row sm:items-center lg:p-10"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xl font-bold tracking-tight text-paper">
                    {bannerStep.label}
                  </span>
                  <span className="max-w-prose text-paper-78">{bannerStep.desc}</span>
                </div>
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-paper transition-transform group-hover:translate-x-1 sm:flex">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </BannerTag>
            </Reveal>
          )}

          <Reveal variant="up" delay={0.1} duration={0.6}>
            <div className="mt-10">
              <Button asChild variant="ghost">
                <Link href="/socialism-101">
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
