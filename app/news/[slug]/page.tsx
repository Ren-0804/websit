import type { Metadata } from "next"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getPostBySlug, getPostSlugs } from "@/lib/markdown"

interface PostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "文章不存在",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.summary || post.content.slice(0, 150),
    alternates: {
      canonical: `/news/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.summary || post.content.slice(0, 150),
      url: `/news/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const minutes = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 220))
  const imageUrl = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `https://landsea.cc${post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`}`
    : undefined
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.summary,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "LandSea",
    },
    publisher: {
      "@type": "Organization",
      name: "LandSea",
      logo: {
        "@type": "ImageObject",
        url: "https://landsea.cc/brand-mark.svg",
      },
    },
    mainEntityOfPage: `https://landsea.cc/news/${post.slug}`,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://landsea.cc" },
      { "@type": "ListItem", position: 2, name: "News", item: "https://landsea.cc/news" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://landsea.cc/news/${post.slug}` },
    ],
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article>
        <header className="bg-slate-950 py-16 text-white md:py-20">
          <div className="container max-w-5xl">
            <Link href="/news" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to insights
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.date), "MMMM d, yyyy")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {minutes} min read
              </span>
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {post.title}
            </h1>
            {post.summary && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{post.summary}</p>
            )}
            {post.category && (
              <div className="mt-7 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                {post.category}
              </div>
            )}
          </div>
        </header>

        <div className="container max-w-5xl py-12 md:py-16">
          {post.coverImage && (
            <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
          <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-12">
              <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-normal prose-a:text-[#c91f28] prose-strong:text-slate-950 prose-img:rounded-2xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Need a route plan?</div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Share origin, destination, cargo type, and timing. Our team will review the route.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-[#c91f28]"
              >
                Contact LandSea
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </main>
  )
}
