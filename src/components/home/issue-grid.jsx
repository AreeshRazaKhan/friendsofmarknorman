import Link from 'next/link'

import { Button } from '@/components/ui/button'
import IssueCard from '@/components/home/issue-card'

import { ISSUES } from '@/constants/site'

const IssueGrid = () => {
  return (
    <section id="issues" className="bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Where Mark stands</p>
            <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
              Affordability, accountability, <em>common sense.</em>
            </h2>
            <p className="mt-4 max-w-prose text-stone-dark">
              Three priorities — chosen because they are the conversations Mark has every day with
              neighbors, clients, and small-business owners across House District 27.
            </p>
          </div>
          <Button asChild variant="primary">
            <Link href="/issues">Read the full platform</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ISSUES.map((issue) => (
            <IssueCard key={issue.slug} {...issue} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default IssueGrid
