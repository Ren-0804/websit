"use client"

import { ArrowLeft, Calendar, Clock3 } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useLanguage } from "@/components/language-selector"
import { getCopy } from "@/lib/i18n"
import type { PostData } from "@/lib/markdown"

export default function PostClient({ post }: { post: PostData }) {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const minutes = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 220))

  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <article>
        <header className="border-b border-[#d8d1c5] bg-[#101820] py-16 text-white md:py-20">
          <div className="container max-w-5xl">
            <Link href="/news" className="inline-flex items-center text-sm font-semibold text-white/70 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.cta.backNews}
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/55">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.date), "MMMM d, yyyy")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {minutes} {t.detail.minRead}
              </span>
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{post.title}</h1>
            {post.summary && <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{post.summary}</p>}
            {post.category && (
              <div className="mt-7 inline-flex border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                {post.category}
              </div>
            )}
          </div>
        </header>

        <div className="container max-w-5xl py-12 md:py-16">
          {post.coverImage && (
            <div className="relative mb-8 aspect-[16/7] overflow-hidden border border-[#d8d1c5] bg-[#101820]">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
          <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
            <div className="border border-[#d8d1c5] bg-[#fbfaf7] px-6 py-8 md:px-10 md:py-12">
              <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-normal prose-a:text-[#b3262f] prose-strong:text-[#101820]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </div>
            </div>

            <aside className="h-fit border border-[#d8d1c5] bg-[#fbfaf7] p-6 lg:sticky lg:top-28">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d7478]">{t.cta.route}</div>
              <p className="mt-4 text-sm leading-7 text-[#5b6266]">{t.pages.contactIntro}</p>
              <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center bg-[#101820] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b3262f]">
                {t.cta.contact}
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </main>
  )
}
