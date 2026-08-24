import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'

import { CAMPAIGN, LEGAL, NAV_LINKS, SOCIAL_LINKS } from '@/constants/site'

const TikTokIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52V6.81a4.85 4.85 0 0 1-1.84-.12z" />
  </svg>
)

const XIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const SOCIAL_ICONS = {
  Facebook,
  Instagram,
  X: XIcon,
  TikTok: TikTokIcon,
}

// Socialism 101 is footer-only — kept out of NAV_LINKS so the top nav stays at five links.
const GET_INVOLVED_LINKS = [
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/ask-mark', label: 'Ask Mark' },
  { href: '/events', label: 'Events' },
  { href: '/socialism-101', label: 'Socialism 101' },
]

// Whatever "get involved" already lists is dropped here so no link appears twice.
const SITE_LINKS = NAV_LINKS.filter(
  (link) => !GET_INVOLVED_LINKS.some((involved) => involved.href === link.href)
)

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
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:px-10">
        <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-4">
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

          <div className="flex flex-col gap-2">
            <p className="eyebrow-bracket eyebrow">follow</p>
            <ul className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.name]
                return (
                  <li key={social.code}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${LEGAL.entity} on ${social.name}`}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-navy transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <nav aria-label="Footer site nav" className="lg:col-span-2">
          <FooterColumn eyebrow="site">
            {SITE_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </nav>

        <nav aria-label="Footer get involved nav" className="lg:col-span-2">
          <FooterColumn eyebrow="get involved">
            {GET_INVOLVED_LINKS.map((link) => (
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

        <div className="lg:col-span-2">
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
              href="https://www.google.com/maps/search/?api=1&query=8165+SW+Ridgeway+Dr+Portland+OR+97225"
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
          <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
            <p className="text-center font-sans text-[11px] leading-relaxed text-stone">
              Some images, audio, video, or written content may be created or
              enhanced using artificial intelligence (AI) tools.
            </p>
          </div>
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
