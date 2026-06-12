import Image from 'next/image'

import VoterGuideForm from '@/components/voter-guide/voter-guide-form'

import { CAMPAIGN } from '@/constants/site'

export const metadata = {
  title: `Free 2026 Issues Guide — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Nine issues that matter at Oregon kitchen tables — and Mark Norman\'s plain answers on every one. Get the free 2026 Issues Guide for Oregon House District 27.',
  openGraph: {
    images: ['/images/voter-guide-cover.png'],
  },
}

const GUIDE_ISSUES = [
  'Public Safety',
  'Education',
  'Small Business',
  'Transportation & Energy',
  'Data Centers',
  'Health Care',
  'Veteran Support',
  'Animal Welfare',
  'Local Issues First',
]

const VoterGuidePage = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16 lg:px-10 lg:py-32">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow-bracket eyebrow text-red-3">[ free 2026 issues guide ]</p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
              Know where Mark <em>stands.</em>
            </h1>
            <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
              Nine issues that matter at Oregon kitchen tables — and one candidate&rsquo;s plain
              answers on every single one. No outrage. No spin. Just where he stands and why,
              in a guide you can read in ten minutes.
            </p>
            <a
              href="#get-the-guide"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border-[1.5px] border-red bg-red px-7 py-[14px] font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-red-2"
            >
              Get the free guide
            </a>
          </div>
          <div className="relative mx-auto aspect-[17/22] w-full max-w-[420px] overflow-hidden rounded-[2rem] border-[1.5px] border-paper-78/30 lg:justify-self-end">
            <Image
              src="/images/voter-guide-cover.png"
              alt="Cover of the 2026 Issues Guide: Where Mark Stands, by Mark Norman for Oregon House District 27."
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4">
            <p className="eyebrow-bracket eyebrow">[ what&rsquo;s inside ]</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Nine issues. <em>Straight answers.</em>
            </h2>
            <p className="max-w-prose text-stone-dark">
              Mark Norman is a Navy veteran, a veterinarian of 30 years, and a small-business
              owner — not a career politician. Every page of this guide is his own answer, in
              his own words.
            </p>
            <ul className="mt-4 grid gap-px overflow-hidden border border-bone bg-bone">
              {GUIDE_ISSUES.map((issue, idx) => (
                <li key={issue} className="flex items-baseline gap-4 bg-white px-5 py-3">
                  <span className="font-mono text-[11px] font-semibold text-red">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-base font-semibold text-navy">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="get-the-guide"
            className="h-fit scroll-mt-24 rounded-2xl border border-bone bg-white p-8 lg:p-10"
          >
            <div className="mb-6 flex flex-col gap-2">
              <h2 className="font-sans text-2xl font-bold tracking-tighter text-navy">
                Get the guide — free.
              </h2>
              <p className="text-sm leading-relaxed text-stone-dark">
                Tell us where to send it. You&rsquo;ll get the download immediately.
              </p>
            </div>
            <VoterGuideForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default VoterGuidePage
