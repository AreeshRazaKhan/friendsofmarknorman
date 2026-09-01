'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { trackCTA } from '@/lib/analytics/meta'

const TrackedInternalLink = forwardRef(
  ({ ctaName, ctaLocation, onClick, href, ...rest }, ref) => {
    const handleClick = (event) => {
      trackCTA({
        cta_name: ctaName,
        cta_location: ctaLocation,
        destination_url: href || '',
      })
      onClick?.(event)
    }
    return <Link ref={ref} href={href} onClick={handleClick} {...rest} />
  }
)

TrackedInternalLink.displayName = 'TrackedInternalLink'

TrackedInternalLink.propTypes = {
  ctaName: PropTypes.string.isRequired,
  ctaLocation: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

TrackedInternalLink.defaultProps = {
  onClick: undefined,
}

export default TrackedInternalLink
