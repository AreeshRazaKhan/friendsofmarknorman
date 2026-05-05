'use client'

import PropTypes from 'prop-types'
import { motion } from 'motion/react'

const EASE = [0.2, 0, 0.2, 1]

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -3, y: 18 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  rise: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
}

const buildVariants = (variant, duration) => {
  const v = VARIANTS[variant] || VARIANTS.up
  return {
    hidden: v.hidden,
    visible: { ...v.visible, transition: { duration, ease: EASE } },
  }
}

const RevealItem = ({ children, variant, duration, className, as }) => {
  const Tag = motion[as] || motion.div
  return (
    <Tag variants={buildVariants(variant, duration)} className={className}>
      {children}
    </Tag>
  )
}

RevealItem.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  duration: PropTypes.number,
  className: PropTypes.string,
  as: PropTypes.string,
}

RevealItem.defaultProps = {
  variant: 'up',
  duration: 0.5,
  className: '',
  as: 'div',
}

export default RevealItem
