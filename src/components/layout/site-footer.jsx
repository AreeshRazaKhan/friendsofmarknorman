import Link from 'next/link'
import Image from 'next/image'

import { CAMPAIGN, LEGAL, NAV_LINKS } from '@/constants/site'

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
]

const year = new Date().getFullYear()

const FooterColumn = ({ eyebrow, children }) => (
  <div className="flex flex-col gap-4">
    <p className="eyebrow-bracket eyebrow">{eyebrow}</p>
    <div className="flex flex-col">{children}</div>
  </div>
)

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="-ml-1 inline-flex min-h-[44px] w-fit items-center px-1 py-2 font-sans text-sm text-navy transition-colors hover:text-red"
  >
    {children}
  </Link>
)

const SiteFooter = () => {
  return (
    <footer className="border-t border-bone bg-paper-2">
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-6 py-16 lg:grid-cols-12 lg:px-10">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Link
            href="/"
            aria-label={`${LEGAL.entity} — home`}
            className="inline-flex w-fit"
          >
            <Image
              src="/images/mark-norman-logo-cabin-transparent.png"
              alt={`${LEGAL.entity} — ${CAMPAIGN.office} — ${CAMPAIGN.party}`}
              width={1704}
              height={1369}
              sizes="128px"
              loading="lazy"
              className="h-[5.5rem] w-auto"
            />
          </Link>

          <p className="max-w-md font-sans text-xl font-bold tracking-tighter text-navy">
            {CAMPAIGN.tagline}
          </p>

          <dl className="grid gap-1 text-sm text-stone-dark">
            <div className="flex gap-2">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-stone">
                Committee
              </dt>
              <dd className="text-stone-dark">{LEGAL.entity}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-stone">
                Office
              </dt>
              <dd className="text-stone-dark">
                {CAMPAIGN.office} · {CAMPAIGN.party} · {CAMPAIGN.cycle}
              </dd>
            </div>
          </dl>

        </div>

        <nav aria-label="Footer site nav" className="lg:col-span-2">
          <FooterColumn eyebrow="site">
            {NAV_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </nav>

        <nav aria-label="Footer legal nav" className="lg:col-span-2">
          <FooterColumn eyebrow="legal">
            {LEGAL_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </nav>

        <div className="lg:col-span-3">
          <FooterColumn eyebrow="contact">
            <a
              href={`mailto:${LEGAL.email}`}
              className="-ml-1 inline-flex min-h-[44px] w-fit items-center px-1 py-2 font-sans text-sm text-navy transition-colors hover:text-red"
            >
              {LEGAL.email}
            </a>
            <a
              href={`tel:${LEGAL.phoneTel}`}
              className="-ml-1 inline-flex min-h-[44px] w-fit items-center px-1 py-2 font-sans text-sm text-navy transition-colors hover:text-red"
            >
              {LEGAL.phone}
            </a>
            <a
              href="https://maps.app.goo.gl/dJCbf1zmxuAYEwP89"
              target="_blank"
              rel="noopener noreferrer"
              className="-ml-1 inline-flex min-h-[44px] w-fit max-w-[24ch] items-center px-1 py-2 font-sans text-sm text-navy transition-colors hover:text-red"
            >
              {LEGAL.address}
            </a>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-bone">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-stone lg:px-10">
          <p>{CAMPAIGN.disclosure}</p>
        </div>
        <div className="border-t border-bone">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-stone lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]">
              © {year} {LEGAL.entity}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]">
              Powered by{' '}
              <a
                href="https://op1776.com/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-stone-dark transition-colors hover:text-red"
              >
                Operation 1776
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
