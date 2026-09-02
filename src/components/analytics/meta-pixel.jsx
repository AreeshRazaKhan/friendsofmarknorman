'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { SITE_NAME } from '@/lib/analytics/meta'

const ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true'

const RouteTracker = () => {
  const pathname = usePathname()
  const search = useSearchParams()

  useEffect(() => {
    if (!ID || !ENABLED || typeof window === 'undefined' || !window.fbq) return
    window.fbq('track', 'PageView')
    window.fbq('track', 'ViewContent', {
      site_name: SITE_NAME,
      page_path: pathname || (typeof window !== 'undefined' ? window.location.pathname : ''),
      page_title: typeof document !== 'undefined' ? document.title : '',
    })
  }, [pathname, search])

  return null
}

const MetaPixel = () => {
  if (!ID || !ENABLED) return null

  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
    </>
  )
}

export default MetaPixel
