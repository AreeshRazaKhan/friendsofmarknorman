import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const PostPreviewCard = ({ href, title, aspect }) => {
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
        <iframe
          src={href}
          title={title}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          scrolling="no"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
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
}

PostPreviewCard.defaultProps = {
  aspect: 'feed',
}

export default PostPreviewCard
