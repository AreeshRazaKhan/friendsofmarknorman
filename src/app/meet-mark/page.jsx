import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import VoterGuideForm from '@/components/voter-guide/voter-guide-form'
import CampaignVideo from '@/components/meet-mark/campaign-video'
import Reveal from '@/components/motion/reveal'

import {
  ABOUT_STATS,
  CAMPAIGN,
  DONATION_TIERS,
  ELEVATOR_PITCH,
  INTRO_VIDEO,
  PILLARS,
  QR_SOURCES,
  buildDonateUrl,
} from '@/constants/site'

export const metadata = {
  title: `Meet Mark Norman — ${CAMPAIGN.office}`,
  description:
    'Watch Mark Norman’s introduction, download his free guide, and support the campaign for ' +
    'Oregon House District 27. Practical leadership: service, solutions, accountability.',
  openGraph: {
    images: ['/images/voter-guide-cover.png'],
  },
}

const MeetMarkPage = async ({ searchParams }) => {
  const params = await searchParams
  const rawSrc = typeof params?.src === 'string' ? params.src : ''
  const qrSource = QR_SOURCES.includes(rawSrc) ? rawSrc : 'qr'

  return (
    <>
      {/* Section 1 — Video hero */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-8 px-6 py-16 lg:max-w-7xl lg:px-10 lg:py-24">
          <Reveal variant="up" duration={0.75}>
            <div className="flex flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow">[ thanks for scanning ]</p>
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
                Meet <em>Mark Norman.</em>
              </h1>
              <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
                {ELEVATOR_PITCH}
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.1} duration={0.85} className="w-full">
            <CampaignVideo
              youtubeId={INTRO_VIDEO.youtubeId}
              title={INTRO_VIDEO.title}
              className="mx-auto max-w-3xl"
            />
          </Reveal>

          <Reveal variant="up" delay={0.15} duration={0.7}>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="red">
                <a href="#get-the-guide">
                  Get the free guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="invert">
                <a href="#donate">Donate</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Credibility stats */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {ABOUT_STATS.map((stat, idx) => (
              <Reveal key={stat.descriptor} variant="up" delay={0.05 * idx} duration={0.6}>
                <div className="flex flex-col gap-1">
                  <p className="display text-5xl text-navy lg:text-6xl">
                    <span className="text-[60%] text-red" aria-hidden="true">
                      +
                    </span>
                    {stat.number}
                  </p>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-stone lg:text-[11px]">
                    {stat.descriptor}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Lead magnet + form */}
      <section id="get-the-guide" className="scroll-mt-24 bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-5">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Download Mark&rsquo;s <em>free guide.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                See exactly where Mark stands on the issues that affect Oregon families every day
                — public safety, education, small business, healthcare, transportation and energy,
                animal welfare, data centers, veterans, and more.
              </p>
              <p className="max-w-prose text-stone-dark">
                Enter your details and the guide is yours. We&rsquo;ll also keep you posted on
                events and campaign updates.
              </p>
              <div className="relative mx-auto w-full max-w-[280px] sm:mx-0">
                <Image
                  src="/images/voter-guide-cover.png"
                  alt="Guide cover: A Warning About Democratic Socialism in House District 27."
                  width={816}
                  height={1056}
                  sizes="280px"
                  className="h-auto w-full rounded-md border-[1.5px] border-bone"
                />
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} duration={0.7}>
            <div className="h-fit rounded-2xl border border-bone bg-white p-6 sm:p-8 lg:p-10">
              <VoterGuideForm
                submitLabel="Download the free guide"
                endpoint="/api/qr-funnel"
                meta={{ qr_source: qrSource }}
                redirectTo="/meet-mark/thank-you"
              />
              <p className="mt-4 text-xs leading-relaxed text-stone">
                We respect your privacy. Your information will be used to send campaign updates and
                related communications from Friends of Mark Norman.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — Where Mark stands (quick pillars) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal variant="up" duration={0.6}>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Where Mark <em>stands.</em>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
            {PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.number} variant="up" delay={0.05 * idx} duration={0.6}>
                <article className="flex h-full flex-col gap-3 rounded-2xl border border-bone bg-white p-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-red">
                    {pillar.number} / {pillar.name}
                  </p>
                  <p className="text-stone-dark">{pillar.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Donate */}
      <section id="donate" className="relative scroll-mt-24 overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.75}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-paper sm:text-5xl">
                Help power <em>practical leadership.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                Campaign outreach takes resources — every contribution goes toward direct
                conversations with voters across House District 27 through field work, events, and
                communication.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button asChild variant="red">
                  <a href={CAMPAIGN.donateUrl} target="_blank" rel="noopener noreferrer">
                    Donate
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                {DONATION_TIERS.map((tier) => (
                  <Button key={tier.amount} asChild variant="invert">
                    <a
                      href={buildDonateUrl(tier.amount)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Give {tier.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6 — Closing / more ways to connect */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal variant="up" duration={0.6}>
            <div className="flex flex-col items-start gap-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-red">
                {CAMPAIGN.tagline}
              </p>
              <h2 className="display text-3xl text-navy sm:text-4xl">
                More ways to <em>get involved.</em>
              </h2>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button asChild variant="primary">
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/events">View events</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/ask-mark">Ask Mark a question</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default MeetMarkPage
