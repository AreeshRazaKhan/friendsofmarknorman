import Link from 'next/link'

import { Button } from '@/components/ui/button'
import BrandMark from '@/components/brand/brand-mark'

import { NAV_LINKS } from '@/constants/site'

const NavBar = () => {
  return (
    <header className="bg-navy text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-10">
        <Link href="/" aria-label="Mark Norman for Oregon — home">
          <BrandMark size="sm" inverted />
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium tracking-[0.08em] text-paper hover:text-red-3"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="red" size="sm">
            <Link href="/donate">Donate</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
