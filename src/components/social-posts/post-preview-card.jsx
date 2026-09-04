import Image from 'next/image'
import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const SIZES = '(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw'

const PostPreviewCard = ({ href, title, aspect, kind }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3"
    >
      <span
        className={cn(
          'relative block overflow-hidden rounded-2xl border border-bone bg-white transition-colors group-hover:border-navy',
          aspect === 'story' ? 'aspect-[9/16]' : 'aspect-square'
        )}
      >
        {kind === 'image' ? (
          <Image src={href} alt={title} fill sizes={SIZES} className="object-cover" />
        ) : (
          <iframe
            src={href}
            title={title}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            scrolling="no"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        )}
      </span>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-navy group-hover:text-red">
        {title}
      </span>
    </a>
  )
}

PostPreviewCard.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  aspect: PropTypes.oneOf(['feed', 'story']),
  kind: PropTypes.oneOf(['iframe', 'image']),
}

PostPreviewCard.defaultProps = {
  aspect: 'feed',
  kind: 'iframe',
}

export default PostPreviewCard
