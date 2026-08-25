import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageHero from "@/components/layout/page-hero";
import Reveal from "@/components/motion/reveal";
import RevealGroup from "@/components/motion/reveal-group";
import RevealItem from "@/components/motion/reveal-item";

import {
  ABOUT_BLOCKS,
  ABOUT_CREED,
  ABOUT_PERSON,
  ABOUT_PILLARS,
  ABOUT_QUOTE,
  ABOUT_STORY,
  ABOUT_STORY_CLOSE,
  CAMPAIGN,
} from "@/constants/site";

export const metadata = {
  title: `About — ${CAMPAIGN.candidate} for Oregon`,
  description:
    "A Navy veteran, longtime veterinarian, and small-business owner running for Oregon House District 27 on practical leadership.",
};

const AboutPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Who is Mark Norman?"
        title="Veteran. Veterinarian. <em>Oregon problem solver.</em>"
        lead="Mark Norman is a Navy veteran, veterinarian, and small-business owner running for Oregon House District 27. For nearly 25 years, Washington County has been his home — and Mark believes Oregon deserves leadership that listens first, studies the facts, makes practical decisions, and accepts responsibility for the results."
        align="center"
      >
        <Button asChild variant="invert">
          <Link href="#story">Read Mark&rsquo;s Story</Link>
        </Button>
      </PageHero>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-bone">
            <Image
              src="/images/mark-about-portrait.png"
              alt="Mark Norman, laughing warmly, in a gray plaid blazer photographed against a charcoal backdrop."
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="eyebrow-bracket eyebrow">the story</p>
              <h2 className="display mt-4 text-4xl text-navy sm:text-5xl">
                A voice for <em>working families.</em>
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-stone-dark">
              {ABOUT_STORY.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="border-l-2 border-red pl-5 text-lg font-semibold leading-snug text-navy">
                {ABOUT_CREED}
              </p>
              <p>{ABOUT_STORY_CLOSE}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="scroll-mt-24 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="display text-4xl text-navy sm:text-5xl">
              The four <em>chapters.</em>
            </h2>
          </div>

          <RevealGroup
            stagger={0.14}
            delay={0.1}
            className="mt-12 grid gap-px overflow-hidden border border-bone bg-bone md:grid-cols-2"
          >
            {ABOUT_BLOCKS.map((block) => (
              <RevealItem key={block.number} variant="rotate" duration={0.7}>
                <article className="flex h-full flex-col gap-4 bg-paper p-8 lg:p-10">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans text-5xl font-bold leading-none text-red lg:text-6xl">
                      {block.number}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-stone">
                      / {block.eyebrow}
                    </span>
                  </div>
                  <h3 className="display text-2xl text-navy lg:text-3xl">
                    {block.title}
                  </h3>
                  {Array.isArray(block.body) ? (
                    <div className="space-y-3 text-sm leading-relaxed text-stone-dark">
                      {block.body.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                      {block.closing && (
                        <p className="font-semibold text-navy">
                          {block.closing}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-stone-dark">
                      {block.body}
                    </p>
                  )}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="bg-halftone-paper pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-8">
            <div>
              <p className="eyebrow-bracket eyebrow text-red-3">
                the person behind the résumé
              </p>
              <h2 className="display mt-4 text-4xl sm:text-5xl">
                His dogs think he is a genius. <em>Mark knows better.</em>
              </h2>
            </div>
            <div className="max-w-prose space-y-5 text-base leading-relaxed text-paper-78">
              {ABOUT_PERSON.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal variant="left" duration={0.7}>
            <div className="flex flex-col gap-4 border-y border-bone py-10">
              <h2 className="display text-3xl text-navy sm:text-4xl lg:text-5xl">
                What Mark brings to <em>Salem.</em>
              </h2>
            </div>
          </Reveal>

          <RevealGroup stagger={0.14} delay={0.1} className="mt-2 grid gap-0 lg:grid-cols-3">
            {ABOUT_PILLARS.map((pillar) => (
              <RevealItem key={pillar.number} variant="scale" duration={0.6}>
                <article className="flex h-full flex-col gap-4 border-t border-bone px-6 py-10 first:border-t-0 lg:border-l lg:border-t-0 lg:px-10 lg:first:border-l-0">
                  <p className="eyebrow">{pillar.name.toLowerCase()}</p>
                  <p className="text-sm leading-relaxed text-stone-dark">
                    {pillar.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper-2">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal variant="up" duration={0.7}>
            <figure className="flex flex-col items-start gap-6">
              <blockquote className="display text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl">
                &ldquo;{ABOUT_QUOTE.text}&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-red">
                — {ABOUT_QUOTE.attribution}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-20 lg:px-10 lg:py-24">
          <h2 className="display text-4xl text-navy sm:text-5xl">
            Want to help build a <em>stronger Oregon?</em>
          </h2>
          <p className="max-w-prose text-stone-dark">
            Volunteer, attend an event, or support the campaign financially.
            Every bit of involvement helps the campaign reach more people across
            District 27.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="red">
              <Link href="/volunteer">Volunteer</Link>
            </Button>
            <Button asChild variant="primary">
              <a
                href={CAMPAIGN.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
