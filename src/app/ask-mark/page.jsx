import Link from 'next/link'

import PageHero from '@/components/layout/page-hero'
import AskForm from '@/components/ask/ask-form'

import { CAMPAIGN, FAQS } from '@/constants/site'

export const metadata = {
  title: `Ask Mark — ${CAMPAIGN.candidate} for Oregon`,
  description: 'Ask Mark Norman a direct question about the campaign, the district, or any issue.',
}

const AskMarkPage = () => {
  return (
    <>
      <PageHero
        title="Ask Mark <em>directly.</em>"
        lead="If there's something you want to ask about the district, the campaign, or a specific issue, send it in. Honest questions deserve honest answers."
        image="/images/mark-ask-portrait.png"
        imageAlt="Mark Norman, seated outside a café in a navy blazer, smiling warmly with hands clasped on the table."
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4">
            <p className="eyebrow-bracket eyebrow">submit a question</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              All answered <em>by Mark.</em>
            </h2>
            <p className="max-w-prose text-stone-dark">
              Some questions are answered privately. Others may be shared publicly so more people can
              hear the response. Either way, every message gets read and answered by Mark directly.
            </p>
          </div>
          <div className="rounded-2xl border border-bone bg-white p-8 lg:p-10">
            <AskForm />
          </div>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="display text-4xl text-navy sm:text-5xl">
              Recent <em>answers.</em>
            </h2>
            <p className="mt-4 max-w-prose text-stone-dark">
              A short list of questions the campaign answers most often. The full FAQ lives on the{' '}
              <Link className="text-red hover:text-red-2" href="/#faq">
                home page
              </Link>
              .
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden border border-bone bg-bone md:grid-cols-2">
            {FAQS.slice(0, 4).map((item, idx) => (
              <li key={item.q} className="flex flex-col gap-3 bg-paper p-6 lg:p-8">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
                  Q&middot;{String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-sans text-lg font-bold text-navy lg:text-xl">{item.q}</h3>
                <p className="text-sm leading-relaxed text-stone-dark">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default AskMarkPage
