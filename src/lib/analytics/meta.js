export const SITE_NAME = 'mark_for_oregon'

export const metaEnabled = () =>
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true' &&
  Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID)

export const trackMeta = (event, params = {}, eventId) => {
  if (!metaEnabled() || !window.fbq) return
  const opts = eventId ? { eventID: eventId } : undefined
  window.fbq('trackCustom', event, params, opts)
}

export const trackStandard = (event, params = {}, eventId) => {
  if (!metaEnabled() || !window.fbq) return
  const opts = eventId ? { eventID: eventId } : undefined
  window.fbq('track', event, params, opts)
}

export const standardParams = (extra = {}) => ({
  site_name: SITE_NAME,
  page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  page_title: typeof document !== 'undefined' ? document.title : '',
  ...extra,
})

export const trackPageView = () => trackStandard('PageView')

export const trackViewContent = (params = {}, eventId) =>
  trackStandard('ViewContent', standardParams(params), eventId)

export const trackLead = (params = {}, eventId) =>
  trackStandard('Lead', standardParams(params), eventId)

export const trackCompleteRegistration = (params = {}, eventId) =>
  trackStandard('CompleteRegistration', standardParams(params), eventId)

export const trackCTA = (params = {}) =>
  trackMeta('CTA_Click', standardParams(params))

export const trackDonateClick = (params = {}) =>
  trackMeta('DonateClick', standardParams(params))

export const trackFormStart = (params = {}) =>
  trackMeta('FormStart', standardParams(params))

export const trackFormError = (params = {}) =>
  trackMeta('FormError', standardParams(params))

export const trackOutbound = (params = {}) =>
  trackMeta('OutboundLinkClick', standardParams(params))

export const trackSocial = (params = {}) =>
  trackMeta('SocialLinkClick', standardParams(params))

export const trackEmail = (params = {}) =>
  trackMeta('EmailClick', standardParams(params))

export const trackPhone = (params = {}) =>
  trackMeta('PhoneClick', standardParams(params))

export const trackDownload = (params = {}) =>
  trackMeta('Download', standardParams(params))

export const trackScrollDepth = (percent) =>
  trackMeta('ScrollDepth', standardParams({ percent }))

export const trackEngagedVisit = (seconds) =>
  trackMeta('EngagedVisit', standardParams({ seconds }))

export const trackIssuesView = (params = {}) =>
  trackMeta('IssuesView', standardParams(params))

export const trackVoterInfoView = (params = {}) =>
  trackMeta('VoterInfoView', standardParams(params))

export const trackVolunteerStart = (params = {}) =>
  trackMeta('VolunteerStart', standardParams(params))

export const trackVolunteerComplete = (params = {}, eventId) =>
  trackMeta('VolunteerComplete', standardParams(params), eventId)

export const trackEventRSVPComplete = (params = {}, eventId) =>
  trackMeta('EventRSVPComplete', standardParams(params), eventId)

export const trackNewsletterSignup = (params = {}, eventId) =>
  trackMeta('NewsletterSignup', standardParams(params), eventId)
