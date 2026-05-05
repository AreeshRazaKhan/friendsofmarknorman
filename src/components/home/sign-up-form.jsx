'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
}

const SignUpForm = () => {
  const [status, setStatus] = useState(STATUS.idle)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(STATUS.submitting)

    const form = new FormData(event.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      zip: form.get('zip'),
    }

    try {
      // Replace with the campaign's real signup endpoint.
      await new Promise((resolve) => setTimeout(resolve, 600))

      if (!payload?.email) {
        throw new Error('Email is required')
      }

      setStatus(STATUS.success)
      setMessage('Thanks — you\'re on the list. Keep an eye on your inbox.')
      event.currentTarget.reset()
    } catch (error) {
      console.error('[SignUpForm]:', error)
      setStatus(STATUS.error)
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="sign-up" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <div className="max-w-xl">
          <p className="eyebrow">Join the campaign</p>
          <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
            Sign up. <em>Stay in the loop.</em>
          </h2>
          <p className="mt-4 text-stone-dark">
            Updates from the trail. No spam. Unsubscribe any time.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-5" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" autoComplete="name" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@oregon.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="zip">ZIP code</Label>
            <Input
              id="zip"
              name="zip"
              inputMode="numeric"
              pattern="[0-9]{5}"
              autoComplete="postal-code"
              placeholder="97000"
              required
            />
          </div>

          <Button type="submit" variant="red" disabled={status === STATUS.submitting}>
            {status === STATUS.submitting ? 'Signing up…' : 'Sign Up'}
          </Button>

          {message && (
            <p
              className="text-sm"
              role={status === STATUS.error ? 'alert' : 'status'}
              aria-live="polite"
            >
              <span className={status === STATUS.error ? 'text-red' : 'text-navy'}>
                {message}
              </span>
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default SignUpForm
