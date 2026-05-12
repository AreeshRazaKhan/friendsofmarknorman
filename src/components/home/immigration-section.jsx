import Reveal from '@/components/motion/reveal'
import RevealGroup from '@/components/motion/reveal-group'
import RevealItem from '@/components/motion/reveal-item'

const PARAGRAPHS = [
  'For too long, Washington has failed to deliver meaningful immigration reform.',
  'Mark believes we need a balanced approach to immigration. One that secures our borders, respects the rule of law, protects our communities, and recognizes the human and economic realities of immigration of America.',
  'Oregonians deserve honest leadership on this issue, not more political gridlock.',
]

const ImmigrationSection = () => {
  return (
    <section className="bg-paper">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 lg:px-10 lg:py-28">
        <Reveal variant="up" duration={0.7}>
          <div className="flex flex-col gap-4">
            <p className="eyebrow-bracket eyebrow">on immigration</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">
              A Practical Approach to <em>Immigration.</em>
            </h2>
          </div>
        </Reveal>

        <RevealGroup
          stagger={0.12}
          delay={0.2}
          className="flex flex-col gap-5 text-base leading-relaxed text-stone-dark lg:text-lg"
        >
          {PARAGRAPHS.map((p) => (
            <RevealItem key={p.slice(0, 24)} variant="fade" duration={0.6} as="p">
              {p}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default ImmigrationSection
