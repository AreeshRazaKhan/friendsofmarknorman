'use client'

import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { trackMeta, trackStandard } from '@/lib/analytics/meta'

const TrackOnMount = ({ event, params, kind }) => {
  useEffect(() => {
    if (kind === 'standard') {
      trackStandard(event, params)
    } else {
      trackMeta(event, params)
    }
  }, [event, params, kind])

  return null
}

TrackOnMount.propTypes = {
  event: PropTypes.string.isRequired,
  params: PropTypes.object,
  kind: PropTypes.oneOf(['custom', 'standard']),
}

TrackOnMount.defaultProps = {
  params: {},
  kind: 'custom',
}

export default TrackOnMount
