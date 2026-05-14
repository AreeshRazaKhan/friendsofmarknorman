import PageHero from '@/components/layout/page-hero'
import VolunteerSignup from '@/components/volunteer/volunteer-signup'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

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
        title="Campaigns run <em>on people.</em>"
        lead="Every conversation matters. Some volunteers knock doors. Others help behind the scenes. You can help any way you can — pick a role below."
        image="/images/mark-volunteer-portrait.png"
        imageAlt="Mark Norman, seated outside a café, laughing warmly with hands clasped, in a navy blazer."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow-bracket eyebrow">ways to help</p>
            <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
              Pick what works <em>for you.</em>
            </h2>
            <p className="mt-4 max-w-prose text-stone-dark">
              No political experience needed — just a willingness to help and a bit of time when
              available. Want to help in another way? Tell us in the form below.
            </p>
          </div>

          <RevealGroup
            stagger={0.07}
            delay={0.1}
            className="mt-12 grid gap-px overflow-hidden border border-bone bg-bone md:grid-cols-2 lg:grid-cols-4"
            as="ul"
          >
            {VOLUNTEER_ROLES.map((role, idx) => (
              <RevealItem key={role.title} variant="up" duration={0.55} as="li">
                <div className="flex h-full flex-col gap-3 bg-paper p-6 lg:p-8">
                  <div className="flex min-h-[2.75rem] items-baseline gap-3 lg:min-h-[3.25rem]">
                    <span className="font-sans text-3xl font-bold leading-none text-red lg:text-4xl">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-eyebrow text-stone">
                      / {role.commitment}
                    </span>
                  </div>
                  <h3 className="display text-xl text-navy lg:text-2xl">{role.title}.</h3>
                  <p className="text-sm leading-relaxed text-stone-dark">{role.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4">
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Tell us a little <em>about yourself.</em>
            </h2>
            <p className="max-w-prose text-stone-dark">
              Once you sign up, you&apos;ll receive a call from a member of the campaign team to
              help you get started.
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
