import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageHero from "@/components/layout/page-hero";
import PlaceholderImage from "@/components/brand/placeholder-image";
import Reveal from "@/components/motion/reveal";
import RevealGroup from "@/components/motion/reveal-group";
import RevealItem from "@/components/motion/reveal-item";

import {
  ABOUT_BLOCKS,
  ABOUT_STATS,
  ABOUT_STORY,
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
        title="Who is <em>Mark Norman?</em>"
        lead="Mark Norman is a Navy veteran, veterinarian, and small-business owner running for Oregon House District 27. For almost 30 years he has lived, practiced, and heard the issues families face in their daily lives in Washington County. He believes Oregon needs better leadership that is practical and more connected to real life."
        align="left"
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10 lg:py-28">
          <PlaceholderImage
            width={640}
            height={800}
            seed="mark-norman-portrait-about"
            alt="Placeholder portrait — replace with the official campaign portrait of Mark Norman"
            badge="About · Portrait"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/5] w-full rounded-[2rem] border border-bone"
          />

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
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-2">
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
                  <p className="text-sm leading-relaxed text-stone-dark">
                    {block.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <RevealGroup
            stagger={0.12}
            delay={0.15}
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
            as="dl"
          >
            {ABOUT_STATS.map((stat) => (
              <RevealItem key={stat.descriptor} variant="scale" duration={0.6}>
                <div className="flex flex-col gap-2">
                  <dt className="flex items-baseline">
                    <span className="stat-plus" aria-hidden="true">
                      +
                    </span>
                    <span className="stat-numeral-paper">{stat.number}</span>
                  </dt>
                  <dd className="stat-descriptor-dark">{stat.descriptor}</dd>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-20 lg:px-10 lg:py-24">
          <h2 className="display text-4xl text-navy sm:text-5xl">
            Want to help <em>Oregon?</em>
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
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
