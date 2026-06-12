import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import PageHero from '@/components/layout/page-hero'
import PostPreviewCard from '@/components/social-posts/post-preview-card'

export const metadata = {
  title: 'Social Posts — Internal Preview',
  description: 'Internal gallery of campaign social media post designs.',
  robots: { index: false, follow: false },
}

const getPosts = () => {
  const dir = path.join(process.cwd(), 'public', 'social-posts')
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

const SocialPostsPage = () => {
  const posts = getPosts()

  return (
    <>
      <PageHero
        eyebrow="[ internal · creative assets ]"
        title="Social post <em>previews.</em>"
        lead="Live previews of every campaign social design, rendered from the actual HTML files. Click any card to open it full-size in a new tab. This page is unlisted and not indexed."
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
    </>
  )
}

export default SocialPostsPage
