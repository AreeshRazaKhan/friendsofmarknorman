import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { BIO_HIGHLIGHTS, SERVICE_TIMELINE } from '@/constants/site'

const BioByNumbers = () => {
  return (
    <section className="relative overflow-hidden bg-navy text-paper">
      <div
        className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="eyebrow text-red-3">A lifetime of service</p>
          <h2 className="display text-4xl text-paper sm:text-5xl">
            Three decades. <em>One Oregonian.</em>
          </h2>
          <p className="text-paper-78">
            Mark didn&apos;t come up through politics. He came up through the Navy, the exam room,
            and the back office of a small business — places where decisions have to be right the
            first time and accountability isn&apos;t optional.
          </p>
          <Button asChild variant="invert" className="self-start">
            <Link href="/about">Read Mark&apos;s story</Link>
          </Button>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-paper-78/30 bg-paper-78/30 lg:col-span-7">
          {BIO_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 bg-navy p-6">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red-3">
                {item.label}
              </dt>
              <dd className="display text-5xl text-paper sm:text-6xl">{item.number}</dd>
              <p className="text-sm text-paper-78">{item.detail}</p>
            </div>
          ))}
        </dl>

        <ol className="lg:col-span-12 grid gap-4 border-t border-paper-78/20 pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICE_TIMELINE.map((entry) => (
            <li key={entry.year} className="flex flex-col gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red-3">
                {entry.year}
              </span>
              <span className="text-sm leading-relaxed text-paper-78">{entry.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default BioByNumbers
