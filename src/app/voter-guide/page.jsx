import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import VoterGuideForm from '@/components/voter-guide/voter-guide-form'
import Reveal from '@/components/motion/reveal'

import { CAMPAIGN } from '@/constants/site'

export const metadata = {
  title: `Free 2026 Issues Guide — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Know where Mark Norman stands before you vote. Download the free, plain-language 2026 ' +
    'Issues Guide for Oregon House District 27 — education, public safety, small business, ' +
    'energy, healthcare, veterans, animal welfare, transportation, and responsible leadership.',
  openGraph: {
    images: ['/images/voter-guide-cover.png'],
  },
}

const GUIDE_TOPICS = [
  'Animal Welfare',
  'Data Centers',
  'Education',
  'Local Issues Over Ideology',
  'Public Safety',
  'Small Business',
  'Transportation & Energy',
  'Healthcare',
  'Veteran Support',
]

const ISSUE_PRIORITIES = [
  {
    key: 'education',
    eyebrow: 'education',
    heading: (
      <>
        Strong basics. Real skills. <em>Parents in the loop.</em>
      </>
    ),
    body:
      'Mark believes Oregon schools should focus on reading, writing, math, science, civics, ' +
      'discipline, critical thinking, career readiness, parent transparency, and safe ' +
      'classrooms.',
    cta: 'See the education priorities',
  },
  {
    key: 'public-safety',
    eyebrow: 'public safety',
    heading: (
      <>
        Compassion and safety <em>belong together.</em>
      </>
    ),
    body:
      'Mark supports practical public safety policies that combine effective law enforcement, ' +
      'public trust, mental health resources, addiction treatment, community partnership, and ' +
      'accountability.',
    cta: 'Read the public safety priorities',
  },
  {
    key: 'small-business',
    eyebrow: 'small business',
    heading: (
      <>
        Small businesses need <em>room to grow.</em>
      </>
    ),
    body:
      'Small businesses are facing taxes, regulations, permitting delays, rising costs, ' +
      'insurance pressure, and workforce challenges. Mark supports reducing unnecessary burdens, ' +
      'improving permitting, reviewing fee increases, and helping Oregon become a better place ' +
      'to start and grow a business.',
    cta: 'Read the small business priorities',
  },
  {
    key: 'infrastructure',
    eyebrow: 'energy & infrastructure',
    heading: (
      <>
        Oregon needs reliable energy and <em>practical infrastructure.</em>
      </>
    ),
    body:
      'Data centers, transportation systems, energy policy, and infrastructure decisions all ' +
      'affect families, businesses, and local communities. Mark supports responsible ' +
      'innovation, fair standards, reliable energy, practical transportation investments, and ' +
      'an all-of-the-above energy strategy.',
    cta: 'Explore the infrastructure priorities',
  },
  {
    key: 'healthcare-veterans',
    eyebrow: 'healthcare & veterans',
    heading: (
      <>
        Healthcare and veteran support need <em>practical solutions.</em>
      </>
    ),
    body:
      'Mark supports healthcare reform focused on affordability, access, transparency, patient ' +
      'choice, and provider support. As a retired Navy veteran, he also supports better access ' +
      'to healthcare, mental health services, addiction treatment, housing support, workforce ' +
      'training, and employment opportunities for veterans and military families.',
    cta: 'Read the healthcare and veteran priorities',
  },
  {
    key: 'animal-welfare',
    eyebrow: 'animal welfare',
    heading: (
      <>
        Humane treatment and responsible ownership <em>can work together.</em>
      </>
    ),
    body:
      'As a veterinarian with more than 30 years of experience, Mark supports practical, ' +
      'science-based animal welfare policies that reduce cruelty, neglect, and pet ' +
      'overpopulation while respecting Oregon families, veterinarians, farmers, ranchers, ' +
      'hunters, and responsible pet owners.',
    cta: 'Read the animal welfare position',
  },
]

const VoterGuidePage = () => {
  // When the topic count is odd, pull the last one out as a full-width row so the
  // 2-column grid never leaves a trailing empty cell.
  const oddTopics = GUIDE_TOPICS.length % 2 === 1
  const gridTopics = oddTopics ? GUIDE_TOPICS.slice(0, -1) : GUIDE_TOPICS
  const lastTopic = oddTopics ? GUIDE_TOPICS[GUIDE_TOPICS.length - 1] : null

  return (
    <>
      {/* Section 1 — Hero / lead magnet promise */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16 lg:px-10 lg:py-32">
          <Reveal variant="up" duration={0.75}>
            <div className="flex flex-col items-start gap-6">
              <p className="eyebrow-bracket eyebrow text-red-3">[ free 2026 issues guide ]</p>
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
                Know where Mark Norman <em>stands</em> before you vote.
              </h1>
              <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
                Download Mark Norman&rsquo;s practical issue guide for Oregon House District 27 and
                get a clear look at his priorities on education, public safety, small business,
                energy, healthcare, veterans, animal welfare, transportation, and responsible
                leadership.
              </p>
              <Button asChild variant="red">
                <a href="#get-the-guide">
                  Download the free guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <p className="max-w-prose text-sm text-paper-78">
                No political jargon. Just a clear overview of Mark&rsquo;s priorities and the issues
                affecting Oregon families.
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.15} duration={0.85}>
            <div className="relative mx-auto aspect-[17/22] w-full max-w-[420px] overflow-hidden rounded-[2rem] border-[1.5px] border-paper-78/30 lg:justify-self-end">
              <Image
                src="/images/voter-guide-cover.png"
                alt="Cover of the 2026 Issues Guide by Mark Norman for Oregon House District 27."
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — The pressure Oregon families feel */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-5">
              <p className="eyebrow-bracket eyebrow">[ what voters are feeling ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Oregon families are <em>feeling the pressure.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Rising costs, school concerns, public safety challenges, business burdens,
                healthcare frustrations, energy costs, transportation issues, and distrust in
                government are all part of the conversation in Oregon today.
              </p>
              <p className="max-w-prose text-stone-dark">
                Mark Norman&rsquo;s campaign is focused on practical solutions for the issues people
                are dealing with at home, at work, and in their neighborhoods.
              </p>
              <a
                href="#priorities"
                className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
              >
                See Mark&rsquo;s priorities →
              </a>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} duration={0.7}>
            <div className="rounded-2xl border border-bone bg-white p-8 lg:p-10">
              <p className="eyebrow-bracket eyebrow">[ before you vote ]</p>
              <h3 className="display mt-3 text-2xl text-navy sm:text-3xl">
                Know what they <em>stand for.</em>
              </h3>
              <p className="mt-4 text-stone-dark">
                This guide gives voters a clear overview of Mark Norman&rsquo;s positions on the
                major issues facing Oregon House District 27. It is designed to be simple, direct,
                and easy to understand.
              </p>
              <div className="mt-6">
                <Button asChild variant="ghost" size="sm">
                  <a href="#get-the-guide">Get the issue guide</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — Who Mark is */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.75}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <p className="eyebrow-bracket eyebrow text-red-3">[ about mark ]</p>
              <h2 className="display text-4xl text-paper sm:text-5xl">
                A Navy veteran, veterinarian, and <em>small-business owner.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                Mark Norman brings real-world experience to this campaign. His background includes
                Navy service, veterinary medicine, small-business ownership, and years of community
                connection in Washington County. That experience shapes his focus on service,
                solutions, accountability, and practical leadership.
              </p>
              <Button asChild variant="invert">
                <Link href="/about">
                  Learn about Mark
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5 — Inside the guide */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow">[ inside the free guide ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Inside the <em>free guide.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                The guide covers Mark&rsquo;s positions on:
              </p>
              <div className="mt-2">
                <Button asChild variant="red">
                  <a href="#get-the-guide">Download the guide</a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} duration={0.7}>
            <div className="overflow-hidden rounded-2xl border border-bone">
              <ul className="grid gap-px bg-bone sm:grid-cols-2">
                {gridTopics.map((topic) => (
                  <li key={topic} className="flex items-baseline gap-3 bg-white px-5 py-4">
                    <span className="text-sm text-red" aria-hidden="true">
                      ★
                    </span>
                    <span className="font-sans text-base font-semibold text-navy">{topic}</span>
                  </li>
                ))}
              </ul>
              {lastTopic && (
                <div className="flex items-baseline gap-3 border-t border-bone bg-white px-5 py-4">
                  <span className="text-sm text-red" aria-hidden="true">
                    ★
                  </span>
                  <span className="font-sans text-base font-semibold text-navy">{lastTopic}</span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sections 6–11 — Issue priorities */}
      <section id="priorities" className="scroll-mt-24 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.6}>
            <p className="eyebrow-bracket eyebrow">[ where mark stands ]</p>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-bone bg-bone">
            {ISSUE_PRIORITIES.map((issue, idx) => (
              <Reveal key={issue.key} variant="up" delay={0.05 * idx} duration={0.6}>
                <article className="grid gap-6 bg-white p-8 sm:grid-cols-[auto_1fr] sm:gap-8 lg:p-12">
                  <span className="stat-numeral text-5xl text-navy sm:text-6xl">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col items-start gap-3">
                    <p className="eyebrow-bracket eyebrow">[ {issue.eyebrow} ]</p>
                    <h3 className="display text-2xl text-navy sm:text-3xl">{issue.heading}</h3>
                    <p className="max-w-prose text-stone-dark">{issue.body}</p>
                    <a
                      href="#get-the-guide"
                      className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
                    >
                      {issue.cta} →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12 — Campaign updates signup */}
      <section id="updates" className="relative scroll-mt-24 overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow text-red-3">[ stay in the loop ]</p>
              <h2 className="display text-4xl text-paper sm:text-5xl">
                Clear campaign updates, <em>without the noise.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                Sign up to receive updates from Mark Norman&rsquo;s campaign, including issue
                highlights, event notices, volunteer opportunities, and ways to stay informed about
                Oregon House District 27.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} duration={0.7}>
            <div className="h-fit rounded-2xl border border-bone bg-white p-8 lg:p-10">
              <VoterGuideForm
                submitLabel="Send me updates"
                showDownload={false}
                successEyebrow="[ you’re subscribed ]"
                successHeading={
                  <>
                    You&rsquo;re on the <em>list.</em>
                  </>
                }
                successBody="Thanks — you’ll start hearing from the campaign with issue highlights, event notices, and ways to get involved across House District 27."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sections 12 & 13 — Ask Mark + Events */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 sm:grid-cols-2 lg:gap-8 lg:px-10 lg:py-20">
          <Reveal variant="up" duration={0.6}>
            <article className="flex h-full flex-col items-start gap-4 rounded-2xl border border-bone bg-white p-8 lg:p-10">
              <p className="eyebrow-bracket eyebrow">[ questions ]</p>
              <h3 className="display text-2xl text-navy sm:text-3xl">
                Have a question <em>for Mark?</em>
              </h3>
              <p className="text-stone-dark">
                Campaigns should make room for real questions. Ask about affordability, education,
                public safety, small business, healthcare, animal welfare, veterans support,
                transportation, energy, or government accountability.
              </p>
              <div className="mt-auto pt-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/ask-mark">Ask Mark a question</Link>
                </Button>
              </div>
            </article>
          </Reveal>

          <Reveal variant="up" delay={0.1} duration={0.6}>
            <article className="flex h-full flex-col items-start gap-4 rounded-2xl border border-bone bg-white p-8 lg:p-10">
              <p className="eyebrow-bracket eyebrow">[ events ]</p>
              <h3 className="display text-2xl text-navy sm:text-3xl">
                Meet Mark in <em>the community.</em>
              </h3>
              <p className="text-stone-dark">
                Local events give voters a chance to hear directly from the campaign, ask questions,
                and learn more about Mark&rsquo;s priorities for Oregon House District 27.
              </p>
              <div className="mt-auto pt-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/events">View upcoming events</Link>
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Section 14 — Ways to help */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow">[ get involved ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                There&rsquo;s room <em>to help.</em>
              </h2>
              <p className="text-stone-dark">
                Campaigns are built by people who stay involved. You can walk a neighborhood, make
                calls from home, host a coffee, help at events, share updates, sign up for
                newsletters, review official contribution information, or make a plan to vote in
                2026.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="primary">
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
                <Button asChild variant="ghost">
                  <a href="#updates">Get campaign updates</a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={CAMPAIGN.donateUrl} target="_blank" rel="noopener noreferrer">
                    Review contribution information
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 15 — Closing call to action */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal variant="up" duration={0.75}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <p className="eyebrow-bracket eyebrow text-red-3">[ first step ]</p>
              <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
                Stay informed. Ask questions. <em>Get involved.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                Download the guide, sign up for updates, attend an event, ask Mark a question,
                volunteer, review official contribution information, and make a plan to vote in
                2026. However you choose to participate, the first step is knowing where Mark
                stands.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="red">
                  <a href="#get-the-guide">
                    Download the guide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="invert">
                  <a href="#updates">Sign up for updates</a>
                </Button>
                <Button asChild variant="invert">
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Part 2 — Lead magnet form (final section before footer) */}
      <section id="get-the-guide" className="scroll-mt-24 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow">[ get the guide ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Download Mark Norman&rsquo;s practical priorities for{' '}
                <em>Oregon House District 27.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Get a clear, easy-to-read guide to Mark&rsquo;s positions on education, public
                safety, small business, energy, healthcare, veterans, animal welfare, and practical
                leadership.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} duration={0.7}>
            <div className="h-fit rounded-2xl border border-bone bg-white p-8 lg:p-10">
              <VoterGuideForm
                submitLabel="Download the free guide"
                redirectTo="/voter-guide/thank-you"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default VoterGuidePage
