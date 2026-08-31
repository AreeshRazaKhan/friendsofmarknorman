'use client'

import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { trackCTA, trackDonateClick } from '@/lib/analytics/meta'

const TrackedCTALink = forwardRef(
  ({ ctaName, ctaLocation, ctaKind, donationProvider, onClick, ...rest }, ref) => {
    const handleClick = (event) => {
      trackCTA({
        cta_name: ctaName,
        cta_location: ctaLocation,
        destination_url: rest.href || '',
      })
      if (ctaKind === 'donate') {
        trackDonateClick({
          cta_location: ctaLocation,
          donation_provider: donationProvider,
          destination_url: rest.href || '',
        })
      }
      onClick?.(event)
    }
    return <a ref={ref} onClick={handleClick} {...rest} />
  }
)

TrackedCTALink.displayName = 'TrackedCTALink'

TrackedCTALink.propTypes = {
  ctaName: PropTypes.string.isRequired,
  ctaLocation: PropTypes.string.isRequired,
  ctaKind: PropTypes.oneOf(['donate', 'primary']),
  donationProvider: PropTypes.string,
  onClick: PropTypes.func,
}

TrackedCTALink.defaultProps = {
  ctaKind: 'primary',
  donationProvider: 'winred',
  onClick: undefined,
}

export default TrackedCTALink
