'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'

import { SOCIAL_LINKS } from '@/constants/site'
import {
  metaEnabled,
  trackDownload,
  trackEmail,
  trackEngagedVisit,
  trackOutbound,
  trackPhone,
  trackScrollDepth,
  trackSocial,
} from '@/lib/analytics/meta'

const SCROLL_THRESHOLDS = [25, 50, 75, 90]
const ENGAGEMENT_MILESTONES = [30, 60, 120]

const SOCIAL_HOSTS = new Set(
  SOCIAL_LINKS.map((s) => {
    try {
      return new URL(s.href).hostname.replace(/^www\./, '')
    } catch (_) {
      return ''
    }
  }).filter(Boolean)
)

const isDownloadHref = (href, anchor) => {
  if (anchor?.hasAttribute('download')) return true
  const path = href.split('?')[0].split('#')[0]
  if (/\.(pdf|zip|doc|docx|xls|xlsx|ppt|pptx|csv)$/i.test(path)) return true
  if (path.startsWith('/downloads/')) return true
  return false
}

const Tracker = () => {
  const pathname = usePathname()
  const search = useSearchParams()
  const firedScrolls = useRef(new Set())
  const engagedSeconds = useRef(0)
  const firedEngagement = useRef(new Set())

  useEffect(() => {
    firedScrolls.current = new Set()
    engagedSeconds.current = 0
    firedEngagement.current = new Set()
  }, [pathname, search])

  useEffect(() => {
    if (!metaEnabled()) return

    let scrollScheduled = false
    const onScroll = () => {
      if (scrollScheduled) return
      scrollScheduled = true
      window.requestAnimationFrame(() => {
        scrollScheduled = false
        const doc = document.documentElement
        const scrollTop = window.scrollY || doc.scrollTop
        const viewport = window.innerHeight || doc.clientHeight
        const total = doc.scrollHeight - viewport
        if (total <= 0) return
        const percent = Math.min(100, Math.round((scrollTop / total) * 100))
        SCROLL_THRESHOLDS.forEach((threshold) => {
          if (percent >= threshold && !firedScrolls.current.has(threshold)) {
            firedScrolls.current.add(threshold)
            trackScrollDepth(threshold)
          }
        })
      })
    }

    const engagementInterval = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      engagedSeconds.current += 1
      ENGAGEMENT_MILESTONES.forEach((milestone) => {
        if (engagedSeconds.current === milestone && !firedEngagement.current.has(milestone)) {
          firedEngagement.current.add(milestone)
          trackEngagedVisit(milestone)
        }
      })
    }, 1000)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearInterval(engagementInterval)
    }
  }, [pathname, search])

  useEffect(() => {
    if (!metaEnabled()) return

    const onClick = (event) => {
      const anchor = event.target?.closest?.('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      if (!href) return

      if (href.startsWith('mailto:')) {
        trackEmail({ destination_url: href })
        return
      }
      if (href.startsWith('tel:')) {
        trackPhone({ destination_url: href })
        return
      }

      let url
      try {
        url = new URL(href, window.location.origin)
      } catch (_) {
        return
      }

      const isExternal = url.origin !== window.location.origin
      const host = url.hostname.replace(/^www\./, '')

      if (isDownloadHref(href, anchor)) {
        trackDownload({
          destination_url: url.href,
          destination_domain: host,
          file_name: url.pathname.split('/').pop() || '',
        })
        return
      }

      if (!isExternal) return

      if (SOCIAL_HOSTS.has(host)) {
        trackSocial({ destination_url: url.href, destination_domain: host })
        return
      }

      trackOutbound({ destination_url: url.href, destination_domain: host })
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}

const SiteAnalytics = () => (
  <Suspense fallback={null}>
    <Tracker />
  </Suspense>
)

export default SiteAnalytics
