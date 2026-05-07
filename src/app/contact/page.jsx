import PageHero from '@/components/layout/page-hero'
import ContactForm from '@/components/contact/contact-form'

import { CAMPAIGN, CONTACT_METHODS } from '@/constants/site'

export const metadata = {
  title: `Contact — ${CAMPAIGN.candidate} for Oregon`,
  description: 'Reach the Mark Norman for Oregon campaign team — questions, press, scheduling, or general support.',
}

const ContactPage = () => {
  return (
    <>
      <PageHero
        eyebrow="contact / 01"
        title="Reach out <em>anytime.</em>"
        lead="The campaign team reads every message and replies directly and promptly to inquiries, questions, event requests, or any message from the community."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="eyebrow-bracket eyebrow">the basics / 02</p>
          <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
            Here&apos;s how to <em>reach us.</em>
          </h2>

          <dl className="mt-10 grid gap-px overflow-hidden border border-bone bg-bone md:grid-cols-2 lg:grid-cols-4">
            {CONTACT_METHODS.map((m) => (
              <div key={m.label} className="flex flex-col gap-2 bg-paper p-6 lg:p-8">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                  {m.label}
                </dt>
                <dd className="font-sans text-base font-semibold text-navy">
                  {m.href ? (
                    <a
                      className="inline-flex min-h-[44px] items-center hover:text-red"
                      href={m.href}
                    >
                      {m.value}
                    </a>
                  ) : (
                    m.value
                  )}
                </dd>
                <p className="text-xs text-stone-dark">{m.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4">
            <p className="eyebrow-bracket eyebrow">write us / 03</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Send a <em>message.</em>
            </h2>
            <p className="max-w-prose text-stone-dark">
              We want to hear your question, concern, or local issue. The campaign team checks
              messages every day. Press inquiries with a same-day deadline should email{' '}
              <a className="text-red hover:text-red-2" href="mailto:press@marknormanfororegon.com">
                press@marknormanfororegon.com
              </a>{' '}
              directly.
            </p>
          </div>
          <div className="rounded-2xl border border-bone bg-white p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
