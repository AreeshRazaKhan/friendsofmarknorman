'use client'

import { useId, useState } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'

import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

import { FAQS } from '@/constants/site'

const EASE = [0.2, 0, 0.2, 1]

const FaqItemInner = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const buttonId = useId()

  return (
    <>
      <button
        id={buttonId}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-red">
            {String(index + 1).padStart(2, '0')}
          </span>
          <motion.span
            animate={{ color: isOpen ? 'var(--brand-red)' : 'var(--brand-navy)' }}
            transition={{ duration: 0.2, ease: EASE }}
            className="font-sans text-lg font-bold sm:text-xl"
          >
            {question}
          </motion.span>
        </span>
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            backgroundColor: isOpen ? 'var(--brand-red)' : 'rgba(0,0,0,0)',
            color: isOpen ? 'var(--brand-paper)' : 'var(--brand-navy)',
            borderColor: isOpen ? 'var(--brand-red)' : 'var(--brand-bone)',
          }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: EASE },
              opacity: { duration: 0.2, ease: EASE },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p className="max-w-prose pb-5 pl-10 text-sm leading-relaxed text-stone-dark">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

FaqItemInner.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

const FaqSection = () => {
  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-10 lg:py-28">
        <Reveal variant="left" duration={0.7}>
          <div className="flex flex-col gap-6">
            <p className="eyebrow-bracket eyebrow">questions / 07</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              You asked. <em>We answered.</em>
            </h2>
            <p className="max-w-prose text-stone-dark">
              The questions voters most often ask the campaign team — about the candidate, the
              district, and how to help. If yours isn&apos;t here, send it to{' '}
              <a className="text-red hover:text-red-2" href="mailto:info@marknormanfororegon.com">
                info@marknormanfororegon.com
              </a>
              .
            </p>
          </div>
        </Reveal>

        <RevealGroup stagger={0.06} delay={0.1} as="ul" className="flex flex-col">
          {FAQS.map((item, idx) => (
            <RevealItem key={item.q} variant="right" duration={0.5} as="li">
              <div className="border-b border-bone last:border-b-0">
                <FaqItemInner question={item.q} answer={item.a} index={idx} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default FaqSection
