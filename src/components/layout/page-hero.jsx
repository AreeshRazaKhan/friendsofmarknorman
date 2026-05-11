import Image from 'next/image'
import PropTypes from 'prop-types'

import Reveal from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const PageHero = ({ eyebrow, title, lead, align, image, imageAlt, children, className }) => {
  const alignClass =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left'

  const Inner = (
    <>
      {eyebrow && (
        <Reveal variant="fade" duration={0.5}>
          <p className="eyebrow-bracket eyebrow text-red-3">{eyebrow}</p>
        </Reveal>
      )}

      <h1
        className="display text-5xl sm:text-6xl lg:text-7xl"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {lead && (
        <p className="max-w-prose text-base leading-relaxed text-paper-78 lg:text-lg">
          {lead}
        </p>
      )}

      {children && (
        <Reveal variant="scale" delay={0.45} duration={0.6}>
          {children}
        </Reveal>
      )}
    </>
  )

  return (
    <section
      className={cn('relative overflow-hidden bg-navy text-paper', className)}
    >
      <div
        className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      {image ? (
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:px-10 lg:py-28">
          <div className={cn('flex flex-col gap-6', alignClass)}>{Inner}</div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-paper-78/20 lg:max-w-[420px] lg:justify-self-end">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'relative mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20 lg:px-10 lg:py-28',
            alignClass
          )}
        >
          {Inner}
        </div>
      )}
    </section>
  )
}

PageHero.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}

PageHero.defaultProps = {
  eyebrow: '',
  lead: '',
  align: 'left',
  image: '',
  imageAlt: '',
  children: null,
  className: '',
}

export default PageHero
