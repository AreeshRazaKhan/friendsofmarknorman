import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const LegalProse = ({ children, className }) => {
  return (
    <div
      className={cn(
        'prose-legal flex max-w-3xl flex-col gap-6 text-base leading-relaxed text-stone-dark',
        className
      )}
    >
      {children}
    </div>
  )
}

LegalProse.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

LegalProse.defaultProps = { className: '' }

export default LegalProse
