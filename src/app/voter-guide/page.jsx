import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import VoterGuideForm from '@/components/voter-guide/voter-guide-form'
import Reveal from '@/components/motion/reveal'

import { CAMPAIGN } from '@/constants/site'

export const metadata = {
  title: `Mark Norman Opposes and Warns About Democratic Socialism — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Democratic socialism points toward larger government, higher taxes, expanded bureaucracy, ' +
    'public ownership, and centralized control over more parts of everyday life. Download ' +
    'Mark Norman’s free guide to learn why he rejects that direction.',
  openGraph: {
    images: ['/images/voter-guide-cover.png'],
  },
}

const DSA_AREAS = [
  'Healthcare',
  'Housing',
  'Labor policy',
  'Taxation',
  'Transportation',
  'Energy',
  'Public safety',
]

const ALTERNATIVE_TOPICS = [
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

const ISSUE_DETAILS = [
  {
    key: 'public-safety',
    eyebrow: 'public safety',
    heading: (
      <>
        Safe communities, <em>not weakened law enforcement.</em>
      </>
    ),
    body: (
      <>
        <p className="text-stone-dark">Public safety is not optional.</p>
        <p className="text-stone-dark">
          Mark supports fully funding public safety, recruiting and retaining qualified officers,
          holding criminals accountable, strengthening community policing, improving behavioral
          health partnerships, and giving law enforcement the tools needed to keep neighborhoods
          safe.
        </p>
        <p className="text-stone-dark">
          Mark rejects policies that weaken law enforcement, normalize disorder, or leave families
          and businesses feeling abandoned.
        </p>
      </>
    ),
    cta: 'Read the public safety position',
  },
  {
    key: 'education',
    eyebrow: 'education',
    heading: (
      <>
        Schools should focus on strong basics and <em>real skills.</em>
      </>
    ),
    body: (
      <p className="text-stone-dark">
        Mark believes Oregon schools should focus on reading, writing, math, science, civics,
        discipline, critical thinking, career readiness, safe classrooms, and parent transparency.
      </p>
    ),
    cta: 'Read the education position',
  },
  {
    key: 'small-business',
    eyebrow: 'small business',
    heading: (
      <>
        Small businesses need <em>room to grow.</em>
      </>
    ),
    body: (
      <p className="text-stone-dark">
        Mark believes Oregon should reduce unnecessary burdens, streamline permitting, review
        excessive fees, protect independent contractors and small employers, and make it easier to
        start, grow, and keep a business.
      </p>
    ),
    cta: 'Read the small business position',
  },
  {
    key: 'healthcare',
    eyebrow: 'healthcare',
    heading: (
      <>
        Healthcare should be patient-centered, <em>not bureaucracy-centered.</em>
      </>
    ),
    body: (
      <>
        <p className="text-stone-dark">
          Mark supports practical healthcare reforms focused on affordability, access,
          transparency, patient choice, provider support, mental health, and addiction treatment.
        </p>
        <p className="text-stone-dark">
          He does not support a government-run single-payer healthcare system for Oregon.
        </p>
      </>
    ),
    cta: 'Read the healthcare position',
  },
]

const VoterGuidePage = () => {
  const oddTopics = ALTERNATIVE_TOPICS.length % 2 === 1
  const gridTopics = oddTopics ? ALTERNATIVE_TOPICS.slice(0, -1) : ALTERNATIVE_TOPICS
  const lastTopic = oddTopics ? ALTERNATIVE_TOPICS[ALTERNATIVE_TOPICS.length - 1] : null

  return (
    <>
      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:px-10 lg:py-32">
          <Reveal variant="up" duration={0.75}>
            <div className="flex flex-col items-start gap-6">
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
                Mark Norman opposes and warns about <em>democratic socialism.</em>
              </h1>
              <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
                Democratic socialism points toward larger government, higher taxes, expanded
                bureaucracy, public ownership, and centralized control over more parts of everyday
                life. Download Mark&rsquo;s free guide to learn why Mark Norman rejects that
                direction.
              </p>
              <Button asChild variant="red">
                <a href="#get-the-guide">
                  Download the free guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.15} duration={0.85}>
            <div className="relative mx-auto w-full max-w-[400px] lg:justify-self-end">
              <Image
                src="/images/voter-guide-cover.png"
                alt="Guide cover: A Warning About Democratic Socialism in House District 27."
                width={816}
                height={1056}
                sizes="(min-width: 1024px) 400px, 80vw"
                className="h-auto w-full rounded-md border-[1.5px] border-paper-78/30"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Paying the price */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Oregon is already paying the price for <em>failed government.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Oregonians are dealing with school concerns, public safety challenges, pressure on
                small businesses, expensive healthcare, rising costs, and high energy bills. All of
                this is leading to growing distrust in government.
              </p>
              <p className="max-w-prose text-stone-dark">
                Mark believes the answer is to reject more bureaucracy, higher taxes, and
                centralized control.
              </p>
              <a
                href="#get-the-guide"
                className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
              >
                Read Mark&rsquo;s warning →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3 — Socialism means more government control */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-paper sm:text-5xl">
                Socialism means <em>more government control.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                Socialism is not just a slogan. It is not just compassion. It is not just helping
                people. It means to control the economy, punish success, weaken private enterprise,
                replace local decision-making, or make families and small businesses dependent on
                bureaucracy — and that&rsquo;s what a socialist candidate supports.
              </p>
              <p className="border-l-[3px] border-red-3 pl-4 text-xl font-semibold text-paper">
                Mark Norman believes that direction is dangerous for Oregon&rsquo;s future.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — The DSA agenda is not harmless */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
            <Reveal variant="up" duration={0.7}>
              <div className="flex max-w-xl flex-col items-start gap-5">
                <h2 className="display text-4xl text-navy sm:text-5xl">
                  The DSA agenda is <em>not harmless.</em>
                </h2>
                <p className="max-w-prose text-stone-dark">
                  The Democratic Socialists of America is a national socialist organization built
                  around an agenda that would expand government authority over:
                </p>
                <ul className="grid w-full gap-2 sm:grid-cols-2">
                  {DSA_AREAS.map((area) => (
                    <li key={area} className="flex items-baseline gap-3">
                      <span className="text-sm text-red" aria-hidden="true">
                        ★
                      </span>
                      <span className="font-sans text-base font-semibold text-navy">{area}</span>
                    </li>
                  ))}
                </ul>
                <p className="max-w-prose text-stone-dark">
                  That is government overreach, and Mark Norman rejects the DSA approach.
                </p>
                <p className="border-l-[3px] border-red pl-4 text-xl font-semibold text-navy">
                  Oregon cannot tax, regulate, bureaucratize, and centralize its way into
                  prosperity.
                </p>
                <Button asChild variant="primary">
                  <a href="#get-the-guide">
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={0.15} duration={0.85}>
              <Image
                src="/images/voter-guide-rally.png"
                alt="Oregonians gathered at the State Capitol in Salem holding signs reading Stop Socialism, Keep Oregon Free, and Protect Oregon Opportunity."
                width={1672}
                height={941}
                sizes="(min-width: 768px) 560px, 100vw"
                className="h-auto w-full rounded-2xl border-[1.5px] border-bone"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 5 — HD27 cannot afford a socialist direction */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-paper sm:text-5xl">
                House District 27 cannot afford <em>a socialist direction.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                This is not just a national debate. The choices made in Salem affect your schools,
                your public safety, your healthcare, small businesses, your transportation, energy,
                your housing, and local communities.
              </p>
              <p className="max-w-prose text-paper-78">
                Mark opposes democratic socialism because he believes Oregon needs practical
                leadership, not bigger government.
              </p>
              <Button asChild variant="invert">
                <a href="#compare">
                  Compare the two directions
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6 — Government control vs. practical leadership */}
      <section id="compare" className="scroll-mt-24 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.6}>
            <div className="flex max-w-3xl flex-col items-start gap-3">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Government control vs. <em>Mark Norman&rsquo;s practical leadership.</em>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            <Reveal variant="up" delay={0.05} duration={0.6}>
              <article className="flex h-full flex-col gap-3 rounded-2xl border border-bone bg-white p-8 lg:p-10">
                <p className="font-sans text-xl font-bold tracking-tight text-navy">
                  Government control
                </p>
                <p className="text-stone-dark">
                  One vision depends on a larger government, higher taxes, expanded bureaucracy,
                  and more centralized control.
                </p>
              </article>
            </Reveal>

            <Reveal variant="up" delay={0.12} duration={0.6}>
              <article className="flex h-full flex-col gap-3 rounded-2xl border-[1.5px] border-navy bg-white p-8 lg:p-10">
                <p className="font-sans text-xl font-bold tracking-tight text-red">
                  Mark Norman&rsquo;s practical leadership
                </p>
                <p className="text-stone-dark">
                  Mark&rsquo;s vision depends on opportunity, accountability, public safety,
                  educational excellence, economic growth, individual freedom, and government
                  measured by results.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal variant="up" delay={0.15} duration={0.6}>
            <div className="mt-8">
              <Button asChild variant="primary">
                <a href="#get-the-guide">
                  Download the full guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 7 — Mark is the alternative */}
      <section id="priorities" className="scroll-mt-24 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-4">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Mark Norman is the alternative to <em>the socialist agenda.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Mark is not just warning voters about democratic socialism. He is offering a clear
                alternative. His guide explains where he stands on the issues that affect Oregon
                families every day:
              </p>
              <p className="border-l-[3px] border-red pl-4 font-semibold text-navy">
                This is not abstract theory. This is about the future of House District 27.
              </p>
              <div className="mt-2">
                <Button asChild variant="red">
                  <a href="#positions">Read Mark&rsquo;s issue priorities</a>
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

      {/* Section 8 — Who Mark is */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.75}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-paper sm:text-5xl">
                A Navy veteran, veterinarian, and <em>small-business owner.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                Mark Norman brings real-world experience to this campaign. His background in
                service, veterinary medicine, and small business shapes the way he approaches
                leadership. Practical problems need practical solutions.
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

      {/* Sections 9–12 — Where Mark stands */}
      <section id="positions" className="scroll-mt-24 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.6}>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Where Mark <em>stands.</em>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
            {ISSUE_DETAILS.map((issue, idx) => (
              <Reveal key={issue.key} variant="up" delay={0.05 * idx} duration={0.6}>
                <article className="flex h-full flex-col items-start gap-3 rounded-2xl border border-bone bg-white p-8 lg:p-10">
                  <h3 className="display text-2xl text-navy sm:text-3xl">{issue.heading}</h3>
                  {issue.body}
                  <a
                    href="#get-the-guide"
                    className="mt-auto inline-flex min-h-[44px] items-center pt-2 font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
                  >
                    {issue.cta} →
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 13 — Ask Mark */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal variant="up" duration={0.6}>
            <article className="flex flex-col items-start gap-4 rounded-2xl border border-bone bg-white p-8 lg:p-10">
              <h2 className="display text-3xl text-navy sm:text-4xl">
                Have a question <em>for Mark?</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Ask about education, small business, healthcare, public safety, energy, data
                centers, animal welfare, veterans, or government accountability.
              </p>
              <div className="pt-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/ask-mark">Ask Mark a question</Link>
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Section 14 — Get involved */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <p className="eyebrow-bracket eyebrow">[ get involved ]</p>
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Help push back against <em>democratic socialism in Oregon.</em>
              </h2>
              <p className="text-stone-dark">
                If you believe House District 27 needs opportunity, accountability, public safety,
                strong schools, economic growth, individual freedom, and practical leadership
                instead of democratic socialism, there is room for you to help.
              </p>
              <p className="text-stone-dark">
                You can attend an event, volunteer, walk a neighborhood, make calls, host a coffee,
                share campaign updates, review official contribution information, or make a plan to
                vote in 2026.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="primary">
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/events">View events</Link>
                </Button>
                <Button asChild variant="ghost">
                  <a href="#get-the-guide">Sign up for updates</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 16 — Closing */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal variant="up" duration={0.75}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
                Reject the socialist agenda. <em>Vote for Mark.</em>
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="red">
                  <a href="#get-the-guide">
                    Download the guide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="invert">
                  <a href={CAMPAIGN.donateUrl} target="_blank" rel="noopener noreferrer">
                    Review contribution information
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lead magnet form (final section before footer) */}
      <section id="get-the-guide" className="scroll-mt-24 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-4">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Download Mark Norman&rsquo;s warning about <em>democratic socialism.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Get the free guide exposing why Mark believes House District 27 must reject the
                socialist agenda of larger government, higher taxes, expanded bureaucracy, public
                ownership, and centralized control.
              </p>
              <p className="max-w-prose text-stone-dark">
                Inside, you&rsquo;ll learn what voters should know about democratic socialism, the
                DSA agenda, and Mark Norman&rsquo;s practical alternative for Oregon.
              </p>
              <p className="max-w-prose font-semibold text-navy">
                Reject the socialist agenda. Choose Mark Norman&rsquo;s practical leadership.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} duration={0.7}>
            <div className="h-fit rounded-2xl border border-bone bg-white p-8 lg:p-10">
              <VoterGuideForm
                submitLabel="Download the free guide"
                redirectTo="/voter-guide/thank-you"
              />
              <p className="mt-4 text-xs leading-relaxed text-stone">
                We respect your privacy. Your information will be used to send campaign updates and
                related communications from Friends of Mark Norman.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default VoterGuidePage
