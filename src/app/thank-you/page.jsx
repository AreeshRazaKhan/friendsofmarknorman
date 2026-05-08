import Link from 'next/link'

import PageHero from '@/components/layout/page-hero'
import { Button } from '@/components/ui/button'

import { CAMPAIGN } from '@/constants/site'

export const metadata = {
  title: `Thank you — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Your submission has been received. Watch your email for a follow-up from the Mark Norman for Oregon campaign team.',
  robots: { index: false, follow: true },
}

const NEXT_STEPS = [
  {
    eyebrow: 'Step 01',
    title: 'See where Mark stands.',
    body: 'Read about the issues driving the campaign — affordability, education, and accountability.',
    href: '/about',
    cta: 'Read about Mark',
  },
  {
    eyebrow: 'Step 02',
    title: 'Come to an event.',
    body: 'Town halls, coffee chats, and door-knocking weekends across House District 27.',
    href: '/events',
    cta: 'See upcoming events',
  },
  {
    eyebrow: 'Step 03',
    title: 'Lend a hand.',
    body: 'Volunteer for an hour, an evening, or every weekend. Every shift moves the campaign forward.',
    href: '/volunteer',
    cta: 'Volunteer with us',
  },
]

const ThankYouPage = () => {
  return (
    <>
      <PageHero
        eyebrow="[ thank you ]"
        title="Thanks <em>for reaching out.</em>"
        lead="Your submission has been received. Please watch your email for a follow-up from the campaign team — every message is read and answered."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="invert" asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="ghost" className="border-paper text-paper hover:bg-paper hover:text-navy" asChild>
            <Link href="/events">See upcoming events</Link>
          </Button>
        </div>
      </PageHero>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow-bracket eyebrow">while you&rsquo;re here</p>
            <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
              Three quick ways to <em>stay involved.</em>
            </h2>
            <p className="mt-4 max-w-prose text-stone-dark">
              The campaign moves on the energy of voters across House District 27. If you&rsquo;ve
              got a few minutes more, here&rsquo;s where to point it.
            </p>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden border border-bone bg-bone md:grid-cols-3">
            {NEXT_STEPS.map((step) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 bg-paper p-8 lg:p-10"
              >
                <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                  {step.eyebrow}
                </span>
                <h3 className="font-sans text-xl font-bold text-navy">{step.title}</h3>
                <p className="text-sm leading-relaxed text-stone-dark">{step.body}</p>
                <Link
                  className="mt-auto inline-flex min-h-[44px] items-center font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-red hover:text-red-2"
                  href={step.href}
                >
                  {step.cta} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default ThankYouPage
