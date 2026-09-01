import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Socialism101Form from '@/components/socialism-101/socialism-101-form'
import AskForm from '@/components/ask/ask-form'
import CampaignVideo from '@/components/meet-mark/campaign-video'
import TrackOnMount from '@/components/analytics/track-on-mount'
import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { ABOUT_STATS, CAMPAIGN, VOTER_GUIDE_VIDEO } from '@/constants/site'

export const metadata = {
  title: `The 5-Minute Voter Guide | ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Before Election 2026, get a quick overview of who is running to represent Oregon House ' +
    'District 27. Download The 5-Minute Voter Guide to Mark Norman: his background, priorities, ' +
    'and practical vision.',
  openGraph: {
    images: ['/images/5-min-voter-guide-cover.png'],
  },
}

const INSIDE = [
  'Who Mark is: Navy veteran, veterinarian, small-business owner',
  'Why he is running for House District 27',
  'Affordability: reducing pressure on working families',
  'Education: strong schools and real opportunity',
  'Accountability: results, not more spending',
  'Public safety, small business, healthcare, energy & more',
]

const ISSUES = [
  {
    number: '01',
    eyebrow: 'affordability',
    heading: 'Families need breathing room',
    body:
      'Housing, utilities, healthcare, groceries, gas, insurance, and everyday expenses keep ' +
      'rising. Mark believes government should reduce pressure on working families, not add to it ' +
      'through unnecessary taxes, fees, mandates, and policies that raise costs.',
  },
  {
    number: '02',
    eyebrow: 'education',
    heading: 'Strong schools. Real opportunity.',
    body:
      'Students need reading, writing, math, science, career readiness, safe classrooms, and ' +
      'strong preparation for life. Parents should be informed and involved. Funding should focus ' +
      'on student achievement, not bureaucracy.',
  },
  {
    number: '03',
    eyebrow: 'accountability',
    heading: 'Taxpayers deserve results',
    body:
      'Public money should be transparent. Programs should be measured by outcomes, not size. ' +
      'Mark believes government should prove what works before asking taxpayers for more money.',
  },
  {
    number: '04',
    eyebrow: 'public safety',
    heading: 'Safe communities matter',
    body:
      'Families should feel safe at home. Students should feel safe at school. Seniors should ' +
      'feel safe in their neighborhoods. Small businesses should feel safe opening their doors. ' +
      'Mark supports safe, stable communities with accountability.',
  },
  {
    number: '05',
    eyebrow: 'small business',
    heading: 'Local employers need room to grow',
    body:
      'Small businesses create jobs, serve families, and strengthen communities. They should not ' +
      'be treated like endless revenue sources for bigger government. Mark supports reducing ' +
      'unnecessary burdens and helping local employers stay viable.',
  },
]

const VOLUNTEER_WAYS = [
  'Walk a neighborhood',
  'Make calls from home',
  'Host a coffee or meet-and-greet',
  'Help with events',
  'Share campaign updates',
  'Place a yard sign',
  'Help with voter outreach',
]

const FiveMinuteVoterGuidePage = () => {
  return (
    <>
      <TrackOnMount
        event="VoterInfoView"
        params={{ content_category: 'voter_info', content_name: 'five_minute_voter_guide' }}
      />
      {/* Section 1 — Editorial video hero (asymmetric) */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        {/* diagonal red stripe field, top-right corner only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            clipPath: 'polygon(66% 0, 100% 0, 100% 42%)',
            backgroundImage:
              'repeating-linear-gradient(45deg, var(--red) 0 2px, transparent 2px 24px)',
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
          <Reveal variant="up" duration={0.75}>
            <div className="flex flex-col items-start gap-6">
              <p className="eyebrow-bracket eyebrow text-red-3">
                [ the 5-minute voter guide ]
              </p>
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
                Hear directly <br className="hidden sm:block" />
                from <em>Mark.</em>
              </h1>
              <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
                A Navy veteran, veterinarian, and small-business owner running for Oregon House
                District 27. Grounded leadership, practical decisions, and everyday
                accountability.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="red">
                  <a href="#get-the-guide">
                    Get the free guide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="invert">
                  <a href={CAMPAIGN.donateUrl} target="_blank" rel="noopener noreferrer">
                    Donate
                  </a>
                </Button>
              </div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-paper-78">
                Service · Solutions · Accountability
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.1} duration={0.85} className="w-full">
            <CampaignVideo
              src={VOTER_GUIDE_VIDEO.src}
              poster={VOTER_GUIDE_VIDEO.poster}
              title={VOTER_GUIDE_VIDEO.title}
              className="mx-auto aspect-[9/16] w-full max-w-[340px] rounded-[1.5rem] border-[1.5px] border-paper-78/25 shadow-2xl lg:max-w-[380px]"
            />
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Lead magnet showcase + form */}
      <section id="get-the-guide" className="scroll-mt-24 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow">[ free download ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Before Election 2026, know who&rsquo;s <em>running to represent you.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Download the free voter guide and get a quick overview of Mark&rsquo;s background,
                priorities, and practical vision for House District 27. It takes about five minutes
                to read.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* Cover + what's inside */}
            <Reveal variant="up" delay={0.05} duration={0.7}>
              <div className="flex flex-col gap-8">
                <div className="relative mx-auto w-full max-w-[360px] lg:mx-0">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 h-full w-full rounded-[1.25rem] bg-navy/10"
                  />
                  <Image
                    src="/images/5-min-voter-guide-cover.png"
                    alt="Cover of The 5-Minute Voter Guide to Mark Norman."
                    width={816}
                    height={1056}
                    sizes="(min-width: 1024px) 360px, 80vw"
                    className="relative h-auto w-full rounded-[1.25rem] border-[1.5px] border-bone shadow-xl"
                    priority
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-red">
                    What&rsquo;s inside
                  </p>
                  <ul className="grid gap-3">
                    {INSIDE.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-stone-dark">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-paper">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal variant="right" delay={0.15} duration={0.7}>
              <div className="h-fit rounded-2xl border border-bone bg-white p-8 shadow-sm lg:p-10">
                <h3 className="display text-2xl text-navy sm:text-3xl">
                  Get the free <em>voter guide.</em>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                  Enter your information to download the guide and receive campaign updates, event
                  notices, and ways to stay involved.
                </p>
                <div className="mt-6">
                  <Socialism101Form
                    endpoint="/api/5-minute-voter-guide"
                    submitLabel="Download the guide"
                    redirectTo="/5-minute-voter-guide/thank-you"
                    showIssue
                    formName="five_minute_voter_guide"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 3 — Why Mark is running */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col gap-6">
              <p className="eyebrow-bracket eyebrow">[ why mark is running ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Oregon families deserve better <em>than excuses.</em>
              </h2>
              <p className="text-stone-dark">
                Families should not have to keep adjusting their lives around rising costs. Parents
                should know what is happening in schools. Small businesses should not be buried
                under taxes, fees, delays, and regulations. Public safety should be taken seriously.
                Public money should be transparent. Government programs should be measured by
                results.
              </p>
              <p className="text-stone-dark">
                Mark believes House District 27 needs leadership that listens, solves problems,
                respects taxpayers, and focuses on practical outcomes.
              </p>
              <p className="border-l-2 border-red pl-5 text-lg font-semibold leading-snug text-navy">
                Oregon needs service, solutions, and accountability.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — Credibility stats strip */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal variant="up" duration={0.6}>
            <p className="max-w-2xl font-mono text-xs font-semibold uppercase tracking-[0.22em] text-red-3">
              Real experience, not political noise
            </p>
          </Reveal>
          <RevealGroup
            stagger={0.1}
            delay={0.1}
            className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {ABOUT_STATS.map((stat) => (
              <RevealItem key={stat.descriptor} variant="up" duration={0.6}>
                <div className="flex flex-col gap-2">
                  <span className="font-sans font-bold leading-none tracking-tight text-paper [font-size:clamp(44px,4.5vw,64px)]">
                    <span className="align-super text-[0.6em] text-red-3">+</span>
                    {stat.number}
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-paper-78">
                    {stat.descriptor}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Section 5 — Issues bento */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow-bracket eyebrow">[ where mark stands ]</p>
            <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
              Focused on the issues families <em>talk about every day.</em>
            </h2>
          </div>

          <RevealGroup
            stagger={0.12}
            delay={0.1}
            className="mt-12 grid gap-px overflow-hidden border border-bone bg-bone md:grid-cols-2"
          >
            {ISSUES.map((issue) => (
              <RevealItem key={issue.number} variant="rotate" duration={0.7}>
                <article className="flex h-full flex-col gap-4 bg-paper p-8 lg:p-10">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans text-5xl font-bold leading-none text-red lg:text-6xl">
                      {issue.number}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-stone">
                      / {issue.eyebrow}
                    </span>
                  </div>
                  <h3 className="display text-2xl text-navy lg:text-3xl">{issue.heading}</h3>
                  <p className="text-sm leading-relaxed text-stone-dark">{issue.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Section 6 — Ask Mark */}
      <section id="ask-mark" className="scroll-mt-24 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow">[ ask mark ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Have a question <em>for Mark?</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Ask Mark about affordability, schools, public safety, small business, healthcare,
                energy, veterans, animal welfare, data centers, government accountability, or any
                issue affecting your family, neighborhood, or business.
              </p>
              <p className="max-w-prose text-sm text-stone">
                The campaign may use submitted questions to help shape future videos, emails,
                events, and voter updates.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} duration={0.7}>
            <div className="h-fit rounded-2xl border border-bone bg-white p-8 shadow-sm lg:p-10">
              <AskForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 7 — Volunteer */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-24 top-16 text-4xl text-red-3"
        >
          ★
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-24 right-40 text-2xl text-red-3/70"
        >
          ★
        </span>
        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-6">
            <p className="eyebrow-bracket eyebrow text-red-3">[ get involved ]</p>
            <h2 className="display text-4xl sm:text-5xl">
              Show up <em>for Oregon.</em>
            </h2>
            <p className="max-w-prose text-paper-78">
              Campaigns are built by people who show up. You can help Mark reach more voters across
              House District 27 by walking neighborhoods, making calls, hosting a coffee or
              meet-and-greet, attending events, sharing campaign updates, or helping with voter
              outreach.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {VOLUNTEER_WAYS.map((way) => (
                <li key={way} className="flex items-start gap-3 text-paper-78">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-red-3" aria-hidden="true" />
                  {way}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="invert">
                <Link href="/volunteer">Volunteer with the campaign</Link>
              </Button>
              <Button asChild variant="red">
                <a href={CAMPAIGN.donateUrl} target="_blank" rel="noopener noreferrer">
                  Donate to the campaign
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 — Final CTAs */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow-bracket eyebrow">[ stay involved ]</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Stay informed. Ask questions. <em>Get involved.</em>
            </h2>
            <p className="max-w-prose text-stone-dark">
              Voters deserve to know who Mark Norman is, where he stands, and how he would represent
              Oregon House District 27. Download the voter guide, ask a question, volunteer, donate,
              or sign up for updates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="red">
                <a href="#get-the-guide">Download the guide</a>
              </Button>
              <Button asChild variant="ghost">
                <a href="#ask-mark">Ask Mark a question</a>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button asChild variant="primary">
                <a href={CAMPAIGN.donateUrl} target="_blank" rel="noopener noreferrer">
                  Donate
                </a>
              </Button>
            </div>
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-stone">
              Service · Solutions · Accountability
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default FiveMinuteVoterGuidePage
