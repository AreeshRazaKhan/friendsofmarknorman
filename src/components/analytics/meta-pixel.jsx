'use client'

import Script from 'next/script'
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
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${ID}');
          `,
        }}
      />
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
