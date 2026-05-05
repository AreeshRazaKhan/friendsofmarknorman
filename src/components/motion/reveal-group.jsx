'use client'

import PropTypes from 'prop-types'
import { motion } from 'motion/react'

const RevealGroup = ({ children, stagger, delay, once, className, as }) => {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}

RevealGroup.propTypes = {
  children: PropTypes.node.isRequired,
  stagger: PropTypes.number,
  delay: PropTypes.number,
  once: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.string,
}

RevealGroup.defaultProps = {
  stagger: 0.08,
  delay: 0,
  once: true,
  className: '',
  as: 'div',
}

export default RevealGroup
