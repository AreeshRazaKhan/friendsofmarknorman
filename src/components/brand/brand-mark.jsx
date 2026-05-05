import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const SIZE_CLASSES = {
  xs: 'text-[22px]',
  sm: 'text-[36px]',
  md: 'text-[54px]',
  lg: 'text-[78px]',
  xl: 'text-[110px]',
}

const BrandMark = ({ size = 'md', inverted = false, className }) => {
  const colorNm = inverted ? 'text-paper' : 'text-navy'
  const colorAccent = inverted ? 'text-paper' : 'text-red'
  const colorLine = inverted ? 'bg-paper' : 'bg-navy'
  const colorMeta = inverted ? 'text-paper' : 'text-navy'
  const colorParty = inverted ? 'text-paper' : 'text-red'

  return (
    <span
      className={cn(
        'inline-flex flex-col items-center font-sans leading-none',
        SIZE_CLASSES[size],
        className
      )}
      aria-label="Mark Norman for Oregon — House District 27 — Republican"
      role="img"
    >
      <span className="flex w-full items-center justify-center gap-2">
        <span className={cn('h-[2px] flex-1 max-w-[100px]', colorLine)} />
        <span className={cn('text-[0.22em] leading-none', colorAccent)}>★</span>
        <span className={cn('h-[2px] flex-1 max-w-[100px]', colorLine)} />
      </span>

      <span className="my-1 text-center font-bold leading-[0.95] tracking-[0.01em]">
        <span className={cn('block text-[1em]', colorNm)}>MARK</span>
        <span className={cn('block text-[1em]', colorAccent)}>NORMAN</span>
      </span>

      <span className="flex w-full items-center justify-center gap-2">
        <span className={cn('h-[2px] flex-1 max-w-[74px]', colorLine)} />
        <span className={cn('font-normal italic text-[0.32em]', colorMeta)}>for</span>
        <span className={cn('h-[2px] flex-1 max-w-[74px]', colorLine)} />
      </span>

      <span className={cn('mt-[2px] font-bold uppercase tracking-[0.04em] text-[0.22em]', colorMeta)}>
        Oregon House District 27
      </span>

      <span className="mt-1 flex items-center justify-center gap-2">
        <span className={cn('h-[2px] w-[26px]', inverted ? 'bg-paper' : 'bg-red')} />
        <span className={cn('font-medium uppercase tracking-[0.32em] text-[0.18em]', colorParty)}>
          Republican
        </span>
        <span className={cn('h-[2px] w-[26px]', inverted ? 'bg-paper' : 'bg-red')} />
      </span>
    </span>
  )
}

BrandMark.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  inverted: PropTypes.bool,
  className: PropTypes.string,
}

export default BrandMark
