import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import PageHero from '@/components/layout/page-hero'
import PostPreviewCard from '@/components/social-posts/post-preview-card'

export const metadata = {
  title: 'Social Posts — Internal Preview',
  description: 'Internal gallery of campaign social media post designs.',
  robots: { index: false, follow: false },
}

const readDesigns = (dir) => {
  try {
    return readdirSync(dir)
      .filter((file) => file.endsWith('.html'))
      .sort()
      .map((file) => {
        const html = readFileSync(path.join(dir, file), 'utf8')
        const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? file.replace('.html', '')
        return { file, title }
      })
  } catch (error) {
    console.error('[SocialPostsPage]:', error)
    return []
  }
}

const getPosts = () => readDesigns(path.join(process.cwd(), 'public', 'social-posts'))

const getStories = () => readDesigns(path.join(process.cwd(), 'public', 'social-stories'))

const getSquares = () => readDesigns(path.join(process.cwd(), 'public', 'social-squares'))

const getCarousels = () => {
  const slides = readDesigns(path.join(process.cwd(), 'public', 'social-carousels'))
  const decks = new Map()
  for (const slide of slides) {
    const key = slide.file.match(/^c(\d+)/)?.[1]
    if (!key) continue
    // title format: "C01 · Socialism 101 — 01/07" → deck name between · and —
    const name = slide.title.split('·')[1]?.split('—')[0]?.trim() ?? `Carousel ${key}`
    if (!decks.has(key)) decks.set(key, { key, name, slides: [] })
    decks.get(key).slides.push(slide)
  }
  return [...decks.values()]
}

const SocialPostsPage = () => {
  const posts = getPosts()
  const stories = getStories()
  const squares = getSquares()
  const carousels = getCarousels()

  return (
    <>
      <PageHero
        eyebrow="[ internal · creative assets ]"
        title="Social post <em>previews.</em>"
        lead="Browse live previews of campaign related social media creatives. Select any card to view the full-size version in a new tab. This page is private and excluded from search engine indexing."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow-bracket eyebrow">[ feed posts / 1080 × 1080 ]</p>
          <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
            Square <em>feed posts.</em>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => (
              <PostPreviewCard
                key={post.file}
                href={`/social-posts/${post.file}`}
                title={post.title}
                aspect="feed"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow-bracket eyebrow">[ story posts / 1080 × 1920 ]</p>
          <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
            Vertical <em>story posts.</em>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {posts.map((post) => (
              <PostPreviewCard
                key={post.file}
                href={`/social-posts/${post.file}?v=916`}
                title={post.title}
                aspect="story"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow-bracket eyebrow">[ story designs / 1080 × 1920 ]</p>
          <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
            Story <em>design explorations.</em>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {stories.map((story) => (
              <PostPreviewCard
                key={story.file}
                href={`/social-stories/${story.file}`}
                title={story.title}
                aspect="story"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow-bracket eyebrow">[ square designs / 1080 × 1080 ]</p>
          <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
            Square <em>design explorations.</em>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {squares.map((square) => (
              <PostPreviewCard
                key={square.file}
                href={`/social-squares/${square.file}`}
                title={square.title}
                aspect="feed"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow-bracket eyebrow">[ carousels / 1080 × 1080 · 5–7 slides ]</p>
          <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
            Carousel <em>decks.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-stone-d">
            Ten multi-slide carousels. Each deck reads as a set — cover, numbered
            points, and a closer — so the slides are meant to share a look.
          </p>

          <div className="mt-12 space-y-14">
            {carousels.map((deck) => (
              <div key={deck.key}>
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-red">
                  Carousel {deck.key} · {deck.name}{' '}
                  <span className="text-stone">— {deck.slides.length} slides</span>
                </p>
                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                  {deck.slides.map((slide) => (
                    <PostPreviewCard
                      key={slide.file}
                      href={`/social-carousels/${slide.file}`}
                      title={slide.title}
                      aspect="feed"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default SocialPostsPage
