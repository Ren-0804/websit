"use client"

import { ArrowRight, Calendar } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"
import { getCopy } from "@/lib/i18n"
import type { PostData } from "@/lib/markdown"

export default function NewsClient({ posts }: { posts: PostData[] }) {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const featuredPost = posts[0]
  const restPosts = posts.slice(1)

  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <section className="border-b border-[#d8d1c5] bg-[#101820] py-20 text-white md:py-24">
        <div className="container">
          <div className="max-w-4xl">
            <div className="site-eyebrow text-[#e05a62]">{t.nav.news}</div>
            <h1 className="mt-5">{t.pages.newsTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{t.pages.newsIntro}</p>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="border border-[#d8d1c5] bg-[#fbfaf7] p-10 text-center text-[#5b6266]">{t.detail.emptyNews}</div>
          ) : (
            <div className="space-y-8">
              {featuredPost && (
                <article className="grid overflow-hidden border border-[#d8d1c5] bg-[#fbfaf7] lg:grid-cols-[0.72fr_1.28fr]">
                  <div className="route-grid flex min-h-72 items-end bg-[#101820] p-8 text-white">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(featuredPost.date), "MMM d, yyyy")}
                      </div>
                      <div className="mt-5 text-sm uppercase tracking-[0.22em] text-[#e05a62]">
                        {featuredPost.category || "Featured"}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[#101820] md:text-4xl">
                      <Link href={`/news/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[#5b6266]">
                      {featuredPost.summary || featuredPost.content.slice(0, 180)}
                    </p>
                    <Link href={`/news/${featuredPost.slug}`} className="mt-8 inline-flex items-center bg-[#101820] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b3262f]">
                      {t.cta.read}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )}

              {restPosts.length > 0 && (
                <div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-2">
                  {restPosts.map((post) => (
                    <article key={post.slug} className="bg-[#fbfaf7] p-7">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d7478]">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </div>
                      <h2 className="mt-5 line-clamp-2 text-2xl font-semibold leading-tight text-[#101820]">
                        <Link href={`/news/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#5b6266]">
                        {post.summary || post.content.slice(0, 160)}
                      </p>
                      <Link href={`/news/${post.slug}`} className="mt-6 inline-flex items-center text-sm font-semibold text-[#b3262f]">
                        {t.cta.read}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
