'use client'

import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { AlertTriangle, Check, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const VARIANTS = {
  success: {
    Icon: Check,
    iconBg: 'bg-green',
    role: 'status',
    ariaLive: 'polite',
  },
  error: {
    Icon: AlertTriangle,
    iconBg: 'bg-red',
    role: 'alert',
    ariaLive: 'assertive',
  },
}

const Toast = ({ open, message, onClose, autoDismissMs, variant }) => {
  const v = VARIANTS[variant] || VARIANTS.success
  const Icon = v.Icon

  useEffect(() => {
    if (!open || !autoDismissMs) return undefined
    const t = setTimeout(onClose, autoDismissMs)
    return () => clearTimeout(t)
  }, [open, autoDismissMs, onClose])

  return (
    <div
      role={v.role}
      aria-live={v.ariaLive}
      aria-hidden={!open}
      className={cn(
        'pointer-events-none fixed left-1/2 top-24 z-[60] -translate-x-1/2 transform px-4 transition-all duration-300 ease-out sm:top-28',
        open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      )}
    >
      <div
        className={cn(
          'flex max-w-[min(92vw,560px)] items-center gap-3 rounded-pill border-[1.5px] border-navy bg-navy px-5 py-3 shadow-[0_8px_24px_rgba(11,40,68,0.25)]',
          open && 'pointer-events-auto'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-paper',
            v.iconBg
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={3} />
        </span>
        <p className="font-sans text-sm font-medium leading-snug text-paper">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          tabIndex={open ? 0 : -1}
          className="ml-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-paper-78 transition-colors hover:bg-navy-3 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  autoDismissMs: PropTypes.number,
  variant: PropTypes.oneOf(['success', 'error']),
}

Toast.defaultProps = {
  autoDismissMs: 5000,
  variant: 'success',
}

export default Toast
