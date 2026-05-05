import PropTypes from 'prop-types'

import Reveal from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const PageHero = ({ eyebrow, title, lead, align, children, className }) => {
  const alignClass =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left'

  return (
    <section
      className={cn('relative overflow-hidden bg-navy text-paper', className)}
    >
      <div
        className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <div
        className={cn(
          'relative mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20 lg:px-10 lg:py-28',
          alignClass
        )}
      >
        <Reveal variant="fade" duration={0.5}>
          <p className="eyebrow-bracket eyebrow text-red-3">{eyebrow}</p>
        </Reveal>

        <Reveal variant="blur" delay={0.1} duration={0.85}>
          <h1
            className="display text-5xl sm:text-6xl lg:text-7xl"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Reveal>

        {lead && (
          <Reveal variant="up" delay={0.3} duration={0.7}>
            <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
              {lead}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal variant="scale" delay={0.45} duration={0.6}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  )
}

PageHero.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
}

PageHero.defaultProps = {
  lead: '',
  align: 'left',
  children: null,
  className: '',
}

export default PageHero
