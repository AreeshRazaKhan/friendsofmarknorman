import Link from 'next/link'

import { CAMPAIGN, NAV_LINKS } from '@/constants/site'

const SiteFooter = () => {
  return (
    <footer className="border-t border-bone bg-paper-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="eyebrow">Friends of Mark Norman</p>
          <p className="mt-4 font-sans text-2xl font-bold tracking-tighter text-navy">
            {CAMPAIGN.tagline}
          </p>
          <p className="mt-2 text-sm text-stone-dark">
            {CAMPAIGN.office} · {CAMPAIGN.cycle}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <p className="eyebrow mb-2">Site</p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-navy hover:text-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <p className="eyebrow">Contact</p>
          <a
            href={`mailto:${CAMPAIGN.email}`}
            className="mt-3 block font-sans text-base font-semibold text-red hover:text-red-2"
          >
            {CAMPAIGN.email}
          </a>
          <p className="mt-2 text-sm text-stone-dark">{CAMPAIGN.domain}</p>
        </div>
      </div>

      <div className="border-t border-bone">
        <p className="mx-auto max-w-7xl px-6 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-stone lg:px-10">
          {CAMPAIGN.disclosure}
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
