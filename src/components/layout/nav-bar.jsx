import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { NAV_LINKS } from '@/constants/site'

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 bg-navy text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 lg:px-10 lg:py-2.5">
        <Link
          href="/"
          aria-label="Mark Norman for Oregon — home"
          className="inline-flex"
        >
          <Image
            src="/images/mark-norman-logo-cabin.png"
            alt="Mark Norman for Oregon — House District 27 — Republican"
            width={1688}
            height={1390}
            priority
            sizes="96px"
            className="h-16 w-auto sm:h-[72px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center font-sans text-sm font-medium tracking-[0.08em] text-paper hover:text-red-3"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <Button asChild variant="invert" size="sm">
              <Link href="/volunteer">Join</Link>
            </Button>
            <Button asChild variant="red" size="sm">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild variant="red" size="sm">
            <Link href="/donate">Donate</Link>
          </Button>
          <details className="group relative">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-pill border-[1.5px] border-paper text-paper hover:bg-navy-3"
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Mobile primary"
              className="mobile-nav-panel absolute right-0 top-[calc(100%+0.5rem)] z-50 w-60 flex-col rounded-md border border-paper-78/20 bg-navy p-3 shadow-2xl"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-sm px-4 py-3 font-sans text-sm font-medium tracking-[0.08em] text-paper hover:bg-navy-3 hover:text-red-3"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/volunteer"
                className="mt-2 rounded-sm border-t border-paper-78/20 px-4 py-3 font-sans text-sm font-medium tracking-[0.08em] text-paper hover:bg-navy-3 hover:text-red-3"
              >
                Join the campaign
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}

export default NavBar
