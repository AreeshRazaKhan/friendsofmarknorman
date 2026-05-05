import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-colors min-h-[44px] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-navy text-paper border-[1.5px] border-navy hover:bg-navy-3',
        red: 'bg-red text-paper border-[1.5px] border-red hover:bg-red-2',
        ghost: 'bg-transparent text-navy border-[1.5px] border-navy hover:bg-paper-2',
        invert: 'bg-paper text-navy border-[1.5px] border-paper hover:bg-bone',
      },
      size: {
        default: 'px-7 py-[14px]',
        sm: 'px-[22px] py-[10px] text-[11px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'red', 'ghost', 'invert']),
  size: PropTypes.oneOf(['default', 'sm']),
  asChild: PropTypes.bool,
}

export { Button, buttonVariants }
