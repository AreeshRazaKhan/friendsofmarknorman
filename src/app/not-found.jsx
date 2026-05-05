import Link from 'next/link'

import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center gap-6 px-6 py-24">
      <span className="eyebrow">404</span>
      <h1 className="display text-5xl">
        Page <em>not found.</em>
      </h1>
      <p className="max-w-prose text-stone-dark">
        That page doesn&apos;t exist. Head back to the campaign home page.
      </p>
      <Button asChild variant="primary">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  )
}

export default NotFound
