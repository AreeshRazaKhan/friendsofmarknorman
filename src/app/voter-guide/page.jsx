import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import VoterGuideForm from '@/components/voter-guide/voter-guide-form'
import Reveal from '@/components/motion/reveal'

import { CAMPAIGN } from '@/constants/site'

export const metadata = {
  title: `Why Mark Norman Opposes Democratic Socialism — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Download Mark Norman’s free guide explaining democratic socialism, the DSA agenda, and ' +
    'why Mark believes Oregon House District 27 needs a different path rooted in opportunity, ' +
    'accountability, public safety, economic growth, and individual freedom.',
  openGraph: {
    images: ['/images/voter-guide-cover.png'],
  },
}

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
    key: 'education',
    eyebrow: 'education',
    heading: (
      <>
        Schools should focus on strong basics and <em>real skills.</em>
      </>
    ),
    body:
      'Mark believes Oregon schools should focus on reading, writing, math, science, civics, ' +
      'discipline, critical thinking, career readiness, safe classrooms, and parent transparency.',
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
    body:
      'Mark believes Oregon should reduce unnecessary burdens, streamline permitting, review ' +
      'excessive fees, protect independent contractors and small employers, and make it easier ' +
      'to start, grow, and keep a business.',
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
    body:
      'Mark supports practical healthcare reforms focused on affordability, access, ' +
      'transparency, patient choice, provider support, mental health, and addiction treatment. ' +
      'He does not support a government-run single-payer healthcare system for Oregon.',
    cta: 'Read the healthcare position',
  },
  {
    key: 'public-safety',
    eyebrow: 'public safety',
    heading: (
      <>
        Public safety should be fully funded <em>and accountable.</em>
      </>
    ),
    body:
      'Mark supports effective law enforcement, accountability, community policing, behavioral ' +
      'health partnerships, addiction treatment access, and safe neighborhoods.',
    cta: 'Read the public safety position',
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
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16 lg:px-10 lg:py-32">
          <Reveal variant="up" duration={0.75}>
            <div className="flex flex-col items-start gap-6">
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
                Why Mark Norman opposes <em>democratic socialism.</em>
              </h1>
              <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
                Download Mark Norman&rsquo;s free guide explaining democratic socialism, DSA
                priorities, and why Mark believes Oregon House District 27 needs a different path
                rooted in opportunity, accountability, public safety, economic growth, and
                individual freedom.
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
            <div className="relative mx-auto aspect-[17/22] w-full max-w-[420px] overflow-hidden rounded-[2rem] border-[1.5px] border-paper-78/30 lg:justify-self-end">
              <Image
                src="/images/voter-guide-cover.png"
                alt="Cover of Socialism 101: Why Mark Norman Opposes Democratic Socialism."
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Paying more, getting less */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Oregon families are paying more and <em>getting less from government.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Oregonians are dealing with rising costs, school concerns, public safety challenges,
                business burdens, healthcare frustration, energy bills, and growing distrust in
                government.
              </p>
              <p className="max-w-prose text-stone-dark">
                Mark believes the answer is not more bureaucracy, higher taxes, and centralized
                control.
              </p>
              <a
                href="#compare"
                className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
              >
                See Mark&rsquo;s different path →
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
                Socialism generally means a much larger role for government in providing services,
                directing economic activity, redistributing wealth, regulating private enterprise,
                and controlling major parts of the economy through taxation, public programs, and
                public ownership.
              </p>
              <p className="border-l-[3px] border-red-3 pl-4 text-xl font-semibold text-paper">
                Mark believes that path is wrong for Oregon.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — More control ≠ better outcomes */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                More government control does not always mean <em>better outcomes.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                When government expands without accountability, families and small businesses can
                face higher taxes, more fees, more regulation, fewer choices, and programs that
                grow without delivering better results.
              </p>
              <p className="max-w-prose text-stone-dark">
                Mark&rsquo;s approach focuses on accountability, affordability, and practical
                solutions.
              </p>
              <Button asChild variant="ghost" size="sm">
                <a href="#get-the-guide">Get the issue guide</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5 — Voters should know about DSA */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-paper sm:text-5xl">
                Voters should <em>know about DSA.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                The Democratic Socialists of America is not just a label. It is a national political
                organization with a broader ideological agenda centered on expanding government
                power over healthcare, housing, labor policy, taxation, transportation, energy, and
                major parts of the economy.
              </p>
              <p className="max-w-prose text-paper-78">
                Mark believes voters should understand what that means before choosing which
                philosophy should represent House District 27. This is not simply a debate about
                compassion or helping people. Mark supports helping vulnerable Oregonians,
                improving schools, lowering healthcare costs, and strengthening public safety.
              </p>
              <p className="max-w-prose text-paper-78">
                The real question is whether Oregon should solve those problems through more
                government control, higher taxes, expanded bureaucracy, and public ownership or
                through accountability, opportunity, local solutions, economic growth, and
                individual freedom.
              </p>
              <p className="border-l-[3px] border-red-3 pl-4 text-xl font-semibold text-paper">
                Mark rejects the democratic socialist approach.
              </p>
              <Button asChild variant="invert">
                <a href="#get-the-guide">
                  Read why Mark opposes democratic socialism
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6 — This choice matters in HD27 */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                This choice matters in <em>House District 27.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                This is not just a national debate. The choices made in Salem affect schools, public
                safety, healthcare, small businesses, transportation, energy, housing, and local
                communities.
              </p>
              <p className="max-w-prose text-stone-dark">
                Mark opposes democratic socialism because he believes Oregon needs practical
                leadership, not bigger government.
              </p>
              <a
                href="#compare"
                className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
              >
                Compare the visions →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 7 — Two visions compared */}
      <section id="compare" className="scroll-mt-24 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.6}>
            <div className="flex max-w-3xl flex-col items-start gap-3">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Bigger government vs. <em>Mark Norman&rsquo;s practical leadership.</em>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            <Reveal variant="up" delay={0.05} duration={0.6}>
              <article className="flex h-full flex-col gap-3 rounded-2xl border border-bone bg-white p-8 lg:p-10">
                <p className="font-sans text-xl font-bold tracking-tight text-navy">
                  Bigger government
                </p>
                <p className="text-stone-dark">
                  One vision depends on a larger government, higher taxes, expanded bureaucracy, and
                  more centralized control.
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
                <a href="#priorities">
                  Read Mark&rsquo;s priorities
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
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

      {/* Section 9 — Mark's practical alternative */}
      <section id="priorities" className="scroll-mt-24 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex flex-col items-start gap-4">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Mark&rsquo;s <em>practical alternative.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Mark&rsquo;s guide also explains where he stands on the issues affecting Oregon
                families:
              </p>
              <div className="mt-2">
                <Button asChild variant="red">
                  <a href="#get-the-guide">Download the free guide</a>
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

      {/* Sections 10–13 — Where Mark stands */}
      <section className="bg-paper-2">
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
                  <p className="text-stone-dark">{issue.body}</p>
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

      {/* Section 14 — Ask Mark */}
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

      {/* Section 15 — Help share */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <h2 className="display text-4xl text-navy sm:text-5xl">
                Help share Mark&rsquo;s <em>different path for Oregon.</em>
              </h2>
              <p className="text-stone-dark">
                Campaigns are built by people who stay involved. You can attend an event, volunteer,
                walk a neighborhood, make calls, host a coffee, share campaign updates, review
                official contribution information, or make a plan to vote in 2026.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="primary">
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/events">View events</Link>
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
                Know the issues. Stay informed. <em>Get involved.</em>
              </h2>
              <p className="max-w-prose text-paper-78">
                Learn where Mark stands, compare the visions, stay informed, and make a voting plan
                for 2026.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="red">
                  <a href="#get-the-guide">
                    Download the guide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="invert">
                  <a href="#get-the-guide">Sign up for updates</a>
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
                Download Mark Norman&rsquo;s guide against <em>democratic socialism.</em>
              </h2>
              <p className="max-w-prose text-stone-dark">
                Get the free guide explaining why Mark believes Oregon House District 27 needs a
                different path than larger government, higher taxes, expanded bureaucracy, and
                centralized control.
              </p>
              <p className="max-w-prose text-stone-dark">
                Inside, you&rsquo;ll learn what Mark believes voters should know about democratic
                socialism, the DSA agenda, and his practical alternative focused on opportunity,
                accountability, public safety, strong schools, small-business growth, individual
                freedom, and responsible government.
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
