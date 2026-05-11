import Image from 'next/image'
import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const PlaceholderImage = ({
  width,
  height,
  seed,
  alt,
  badge,
  grayscale,
  blur,
  priority,
  sizes,
  className,
}) => {
  const params = []
  if (grayscale) params.push('grayscale')
  if (blur) params.push(`blur=${blur}`)
  const query = params.length > 0 ? `?${params.join('&')}` : ''
  const src = `https://picsum.photos/seed/${slugify(seed)}/${width}/${height}${query}`

  return (
    <div className={cn('relative overflow-hidden bg-paper-2', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={sizes}
        className="object-cover"
      />
      <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-sm bg-paper px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red shadow-sm">
        <span aria-hidden="true">★</span>
        {badge}
      </span>
    </div>
  )
}

PlaceholderImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  seed: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  badge: PropTypes.string,
  grayscale: PropTypes.bool,
  blur: PropTypes.number,
  priority: PropTypes.bool,
  sizes: PropTypes.string,
  className: PropTypes.string,
}

PlaceholderImage.defaultProps = {
  badge: 'Placeholder',
  grayscale: false,
  blur: 0,
  priority: false,
  sizes: '(min-width: 1024px) 50vw, 100vw',
  className: '',
}

export default PlaceholderImage
