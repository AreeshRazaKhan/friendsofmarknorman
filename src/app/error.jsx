'use client'

import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@/components/ui/button'

const ErrorBoundary = ({ error, reset }) => {
  useEffect(() => {
    console.error('[RootError]:', error)
  }, [error])

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center gap-6 px-6 py-24">
      <span className="eyebrow">Error</span>
      <h1 className="display text-5xl">
        Something <em>went wrong.</em>
      </h1>
      <p className="max-w-prose text-stone-dark">
        The page didn&apos;t load. Try again — and if it keeps happening, send a note to the campaign team.
      </p>
      <Button onClick={reset} variant="primary">
        Try again
      </Button>
    </section>
  )
}

ErrorBoundary.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    digest: PropTypes.string,
  }).isRequired,
  reset: PropTypes.func.isRequired,
}

export default ErrorBoundary
