import Link from 'next/link'
import Image from 'next/image'

import { CAMPAIGN, LEGAL, NAV_LINKS } from '@/constants/site'

const SOCIAL = [
  { code: 'FB', href: 'https://facebook.com', label: 'Facebook' },
  { code: 'IG', href: 'https://instagram.com', label: 'Instagram' },
  { code: 'X', href: 'https://x.com', label: 'X (Twitter)' },
  { code: 'YT', href: 'https://youtube.com', label: 'YouTube' },
]

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
              src="/images/mark-norman-logo-paper.png"
              alt={`${LEGAL.entity} — ${CAMPAIGN.office} — ${CAMPAIGN.party}`}
              width={1685}
              height={1380}
              sizes="80px"
              loading="lazy"
              className="h-14 w-auto"
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

          <ul className="mt-2 flex items-center gap-1" role="list" aria-label="Social media">
            {SOCIAL.map((s, i) => (
              <li key={s.code} className="flex items-center">
                <a
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-colors hover:text-red"
                >
                  {s.code}
                </a>
                {i < SOCIAL.length - 1 && (
                  <span className="font-mono text-[11px] text-bone" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
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
            <p className="mt-1 max-w-[24ch] text-sm text-stone-dark">{LEGAL.address}</p>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-bone">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-stone lg:px-10">
          <p>{CAMPAIGN.disclosure}</p>
        </div>
        <div className="border-t border-bone">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-stone lg:flex-row lg:items-center lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]">
              © {year} {LEGAL.entity}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
