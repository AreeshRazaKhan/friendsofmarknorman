import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded border border-bone bg-paper-2 px-[14px] py-3 font-sans text-sm text-navy placeholder:text-[#5F594D99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
}

export { Input }
