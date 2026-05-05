import PageHero from '@/components/layout/page-hero'
import VolunteerSignup from '@/components/volunteer/volunteer-signup'

import { CAMPAIGN, VOLUNTEER_ROLES } from '@/constants/site'

export const metadata = {
  title: `Volunteer — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Knock doors, make calls, host an event, or lend a skill. Every hour moves the field for House District 27.',
}

const VolunteerPage = () => {
  return (
    <>
      <PageHero
        eyebrow="volunteer / 01"
        title="The time <em>is now.</em>"
        lead="Campaigns are won by people. Door knockers, callers, hosts, drivers, designers, friends. Pick any role below — we'll meet you where you are and train you on the rest."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow-bracket eyebrow">six ways to help / 02</p>
            <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
              Pick a <em>role.</em>
            </h2>
            <p className="mt-4 max-w-prose text-stone-dark">
              No experience required. We train, we pair, and we keep it light. Want to help in
              another way? Tell us in the form below.
            </p>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden border border-bone bg-bone md:grid-cols-2 lg:grid-cols-3">
            {VOLUNTEER_ROLES.map((role, idx) => (
              <li key={role.title} className="flex flex-col gap-3 bg-paper p-6 lg:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-3xl font-bold leading-none text-red lg:text-4xl">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-stone">
                    / {role.commitment}
                  </span>
                </div>
                <h3 className="display text-xl text-navy lg:text-2xl">{role.title}.</h3>
                <p className="text-sm leading-relaxed text-stone-dark">{role.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4">
            <p className="eyebrow-bracket eyebrow">sign up / 03</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Tell us how to <em>find you.</em>
            </h2>
            <p className="max-w-prose text-stone-dark">
              The team will reach out within 48 hours to walk through what you signed up for. No
              spam, no pressure, no ridiculous asks.
            </p>
          </div>
          <div className="rounded-2xl border border-bone bg-white p-8 lg:p-10">
            <VolunteerSignup />
          </div>
        </div>
      </section>
    </>
  )
}

export default VolunteerPage
