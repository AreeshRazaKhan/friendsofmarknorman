import { Cabin, JetBrains_Mono } from 'next/font/google'

import NavBar from '@/components/layout/nav-bar'
import SiteFooter from '@/components/layout/site-footer'

import { CAMPAIGN } from '@/constants/site'

import './globals.css'

const cabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cabin',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: `${CAMPAIGN.candidate} for Oregon — ${CAMPAIGN.office}`,
  description:
    'Practical leadership for Oregon House District 27. A Navy veteran, longtime veterinarian, and small-business owner running on service, solutions, and accountability.',
  metadataBase: new URL(`https://${CAMPAIGN.domain.toLowerCase()}`),
  openGraph: {
    title: `${CAMPAIGN.candidate} for Oregon`,
    description: CAMPAIGN.tagline,
    type: 'website',
  },
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${cabin.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

export default RootLayout
