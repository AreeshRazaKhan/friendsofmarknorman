import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VOTER_FEEL } from '@/constants/site'

const VoterFeel = () => {
  return (
    <section className="relative overflow-hidden bg-paper-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">{VOTER_FEEL.eyebrow}</p>
          <h2 className="display mt-4 text-4xl text-navy sm:text-5xl lg:text-6xl">
            Hopeful. Respected. <em>Represented.</em>
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-stone-dark">
            {VOTER_FEEL.body}
          </p>
          <p className="mt-4 max-w-prose font-medium text-navy">{VOTER_FEEL.cta}</p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <Button asChild variant="red">
            <Link href="/donate">Donate</Link>
          </Button>
          <Button asChild variant="primary">
            <Link href="#sign-up">Volunteer</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/endorse">Endorse the campaign</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default VoterFeel
