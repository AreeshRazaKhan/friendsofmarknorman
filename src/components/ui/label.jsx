import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const Label = forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red',
        className
      )}
      {...props}
    />
  )
})

Label.displayName = 'Label'

Label.propTypes = {
  className: PropTypes.string,
}

export { Label }
