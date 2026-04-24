import type { Metadata } from "next"
import { format } from "date-fns"
import { ArrowRight, Calendar, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "新闻洞察",
  description: "阅读丰吉国际关于中亚铁路班列、跨境多式联运、供应链项目和国际物流市场的近期动态。",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "新闻洞察 | LandSea",
    description: "中亚铁路班列、跨境物流和供应链项目动态。",
    url: "/news",
  },
}

export default function NewsPage() {
  const posts = getAllPosts()
  const featuredPost = posts[0]
  const restPosts = posts.slice(1)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://landsea.cc/news/${post.slug}`,
      name: post.title,
    })),
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="bg-slate-950 py-20 text-white">
        <div className="container">
          <div className="mb-6 flex items-center text-sm text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-white">Insights</span>
          </div>
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e44b52]">
              News and Insights
            </div>
            <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-6xl">物流项目和市场动态</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              关注中亚通道、铁路班列、多式联运、清关仓储和跨境供应链执行经验。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">暂无文章</h2>
              <p className="mt-3 text-slate-600">发布第一篇文章后，这里会自动展示。</p>
            </div>
          ) : (
            <div className="space-y-8">
              {featuredPost && (
                <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="relative flex min-h-72 items-end overflow-hidden bg-slate-950 p-8 text-white">
                    {featuredPost.coverImage && (
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover opacity-50"
                      />
                    )}
                    <div className="absolute inset-0 bg-slate-950/40" />
                    <div className="relative">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(featuredPost.date), "MMM d, yyyy")}
                      </div>
                      <div className="mt-5 text-sm uppercase tracking-[0.22em] text-[#e44b52]">
                        {featuredPost.category || "Featured"}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                      <Link href={`/news/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                      {featuredPost.summary || featuredPost.content.slice(0, 180)}
                    </p>
                    <Link
                      href={`/news/${featuredPost.slug}`}
                      className="mt-8 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-[#c91f28]"
                    >
                      阅读全文
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )}

              {restPosts.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  {restPosts.map((post) => (
                    <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </div>
                      {post.category && (
                        <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#c91f28]">
                          {post.category}
                        </div>
                      )}
                      <h2 className="mt-5 line-clamp-2 text-2xl font-semibold leading-tight text-slate-950">
                        <Link href={`/news/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                        {post.summary || post.content.slice(0, 160)}
                      </p>
                      <Link href={`/news/${post.slug}`} className="mt-6 inline-flex items-center text-sm font-semibold text-[#c91f28]">
                        阅读全文
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
