"use client";

import { ArrowLeft, ArrowRight, ChevronDown, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";
import type { PostData } from "@/lib/markdown";

export default function PostClient({ post }: { post: PostData }) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  const han = (post.content.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (
    post.content.replace(/[\u3400-\u9fff]/g, " ").match(/\S+/g) || []
  ).length;
  const minutes = Math.max(1, Math.ceil(han / 450 + words / 220));
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([]);
  useEffect(() => {
    // Use the rendered Markdown headings, including Setext and inline formatting.
    setHeadings(
      Array.from(
        contentRef.current?.querySelectorAll("h2[id], h3[id]") || [],
      ).map((node) => ({ text: node.textContent || "", id: node.id })),
    );
  }, [post.content]);
  const tocLinks = headings.map((item) => (
    <li key={item.id}>
      <a
        href={"#" + item.id}
        className="block py-1 text-sm leading-6 text-muted-foreground hover:text-primary"
      >
        {item.text}
      </a>
    </li>
  ));
  return (
    <main id="main-content" className="site-main">
      <article>
        <header className="border-b bg-white py-10 md:py-14">
          <div className="container max-w-6xl">
            <Link href="/news" className="text-link text-sm">
              <ArrowLeft aria-hidden="true" />
              {t.cta.backNews}
            </Link>
            <h1 className="mt-6 max-w-5xl text-3xl leading-[1.45] md:text-[2.75rem]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(
                  zh ? "zh-CN" : "en-GB",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  },
                )}
              </time>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                {minutes} {t.detail.minRead}
              </span>
              {post.category && (
                <span className="text-primary">{post.category}</span>
              )}
            </div>
            {post.summary && (
              <p className="mt-7 max-w-4xl text-base leading-8">
                {post.summary}
              </p>
            )}
          </div>
        </header>
        <div className="container max-w-6xl py-10 md:py-14">
          {post.coverImage && (
            <div className="relative mb-10 aspect-[16/7] overflow-hidden rounded-xl bg-secondary">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1152px"
                unoptimized={/^https?:\/\//.test(post.coverImage)}
                className="object-cover"
                priority
              />
            </div>
          )}
          {headings.length > 0 && (
            <details className="group mb-6 rounded-xl border bg-white px-5 py-4 lg:hidden">
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {zh ? "本文目录" : "On this page"}
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 flex-none transition-transform group-open:rotate-180"
                />
              </summary>
              <nav aria-label={zh ? "文章目录" : "On this page"}>
                <ol className="mt-3 space-y-1 border-t pt-3">{tocLinks}</ol>
              </nav>
            </details>
          )}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <div className="min-w-0 rounded-xl bg-white p-5 md:p-9">
              <div
                ref={contentRef}
                className="reading-content prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-normal"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children, node }) => (
                      <h2 id={"section-" + node?.position?.start.line}>
                        {children}
                      </h2>
                    ),
                    h2: ({ children, node }) => (
                      <h2 id={"section-" + node?.position?.start.line}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children, node }) => (
                      <h3 id={"section-" + node?.position?.start.line}>
                        {children}
                      </h3>
                    ),
                    table: ({ children }) => (
                      <div
                        role="region"
                        aria-label={zh ? "文章表格" : "Article table"}
                        tabIndex={0}
                        className="overflow-x-auto"
                      >
                        <table>{children}</table>
                      </div>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
            <aside className="h-fit lg:sticky lg:top-28">
              {headings.length > 0 && (
                <nav
                  className="hidden lg:block"
                  aria-label={zh ? "文章目录" : "On this page"}
                >
                  <h2 className="text-base">
                    {zh ? "本文目录" : "On this page"}
                  </h2>
                  <ol className="mt-4 space-y-1 border-t pt-4">{tocLinks}</ol>
                </nav>
              )}
              <div className="mt-8 rounded-xl bg-secondary p-5">
                <h2 className="text-lg">{t.cta.route}</h2>
                <p className="mt-3 text-sm">{t.pages.contactIntro}</p>
                <Link href="/contact" className="text-link mt-3 text-sm">
                  {t.cta.contact}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}
