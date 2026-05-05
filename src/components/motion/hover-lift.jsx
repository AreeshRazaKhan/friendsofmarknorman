'use client'

import PropTypes from 'prop-types'
import { motion } from 'motion/react'

const HoverLift = ({ children, lift, className, as }) => {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      whileHover={{ y: -lift }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={className}
    >
      {children}
    </Tag>
  )
}

HoverLift.propTypes = {
  children: PropTypes.node.isRequired,
  lift: PropTypes.number,
  className: PropTypes.string,
  as: PropTypes.string,
}

HoverLift.defaultProps = {
  lift: 4,
  className: '',
  as: 'div',
}

export default HoverLift
