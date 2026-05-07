import PageHero from '@/components/layout/page-hero'
import IssueForm from '@/components/issues/issue-form'

import { CAMPAIGN } from '@/constants/site'
import { ISSUE_CATEGORIES } from '@/constants/issues'

export const metadata = {
  title: `Report an Issue — ${CAMPAIGN.candidate} for Oregon`,
  description:
    'Tell the campaign about a problem in House District 27 — affordability, schools, public safety, infrastructure, or anything else that matters.',
}

const IssuesPage = () => {
  return (
    <>
      <PageHero
        eyebrow="report an issue / 01"
        title="What needs <em>attention?</em>"
        lead="The most useful thing a campaign can hear is what's actually happening on the ground. If something in your neighborhood needs attention, send it in. The team sorts through each submission and Mark sees the patterns."
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-6">
            <p className="eyebrow-bracket eyebrow">categories / 02</p>
            <h2 className="display text-3xl text-navy sm:text-4xl">
              What you <em>can report.</em>
            </h2>
            <ul className="grid gap-2 text-sm text-stone-dark">
              {ISSUE_CATEGORIES.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-[7px] h-[2px] w-3 shrink-0 bg-red" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-bone bg-white p-8 lg:p-10">
            <p className="eyebrow-bracket eyebrow">submit / 03</p>
            <h3 className="display mt-3 text-2xl text-navy sm:text-3xl">
              Tell us <em>what&apos;s going on.</em>
            </h3>
            <p className="mt-3 text-sm text-stone-dark">
              Every submission is reviewed. Patterns and recurring issues are shared with the
              campaign team.
            </p>
            <div className="mt-6">
              <IssueForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default IssuesPage
