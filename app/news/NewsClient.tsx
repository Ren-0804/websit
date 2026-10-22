"use client";

import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { PageIntro } from "@/components/site-sections";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";
import type { PostSummary } from "@/lib/markdown";

const pageSize = 12;
export default function NewsClient({ posts }: { posts: PostSummary[] }) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(pageSize);
  const id = useId();
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean)),
  );
  const filtered = posts.filter(
    (post) =>
      (!category || post.category === category) &&
      (post.title + " " + post.summary + " " + (post.category || ""))
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const featured = !query && !category ? filtered[0] : undefined;
  const remaining = featured ? filtered.slice(1) : filtered;
  const visible = remaining.slice(0, limit);
  const date = (value: string) =>
    new Date(value).toLocaleDateString(zh ? "zh-CN" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  return (
    <main id="main-content" className="site-main">
      <PageIntro title={t.pages.newsTitle} description={t.pages.newsIntro} />
      <section className="site-section">
        <div className="container">
          <div className="grid gap-5 border-b pb-7 md:grid-cols-[1fr_16rem]">
            <div>
              <label className="field-label" htmlFor={id + "search"}>
                {zh ? "查找物流资料" : "Find logistics notes"}
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-4 h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  className="field pl-12"
                  id={id + "search"}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setLimit(pageSize);
                  }}
                  placeholder={
                    zh
                      ? "搜索标题、摘要或关键词"
                      : "Search titles, summaries or keywords"
                  }
                />
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor={id + "category"}>
                {zh ? "文章分类" : "Category"}
              </label>
              <select
                className="field"
                id={id + "category"}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setLimit(pageSize);
                }}
              >
                <option value="">{zh ? "全部分类" : "All categories"}</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="py-5 text-sm" role="status">
            {zh
              ? "共 " + filtered.length + " 篇业务笔记"
              : filtered.length + " notes found"}
          </p>
          {featured && (
            <article className="mb-7 grid gap-5 rounded-xl bg-[#173b84] p-6 text-white md:p-8 lg:grid-cols-[9rem_minmax(0,1fr)_auto] lg:gap-8">
              <div>
                <time
                  dateTime={featured.date}
                  className="text-sm text-[#d6e4fa]"
                >
                  {date(featured.date)}
                </time>
                {featured.category && (
                  <div className="mt-3 text-sm text-[#d6e4fa]">
                    {featured.category}
                  </div>
                )}
              </div>
              <div>
                <h2 className="max-w-3xl text-xl leading-relaxed md:text-2xl">
                  <Link
                    href={"/news/" + featured.slug}
                    className="hover:underline"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-2 max-w-3xl text-sm text-[#d6e4fa]">
                  {featured.summary}
                </p>
              </div>
              <Link
                href={"/news/" + featured.slug}
                className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-white hover:underline"
              >
                {t.cta.read}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          )}
          {visible.map((post) => (
            <article className="article-row" key={post.slug}>
              <div>
                <time dateTime={post.date}>{date(post.date)}</time>
                {post.category && (
                  <div className="mt-2 text-sm text-primary">
                    {post.category}
                  </div>
                )}
              </div>
              <div>
                <h2>
                  <Link
                    href={"/news/" + post.slug}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p>{post.summary}</p>
              </div>
              <Link
                href={"/news/" + post.slug}
                className="text-link self-start"
                aria-label={t.cta.read + ": " + post.title}
              >
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
          {!filtered.length && (
            <div className="rounded-xl bg-white px-6 py-12 text-center">
              <h2 className="text-xl">
                {posts.length
                  ? zh
                    ? "没有匹配的业务笔记"
                    : "No matching notes"
                  : t.detail.emptyNews}
              </h2>
              {posts.length > 0 && (
                <button
                  type="button"
                  className="text-link mt-5"
                  onClick={() => {
                    setQuery("");
                    setCategory("");
                    setLimit(pageSize);
                  }}
                >
                  {zh ? "清除筛选" : "Clear filters"}
                </button>
              )}
            </div>
          )}
          {remaining.length > limit && (
            <div className="mt-8 text-center">
              <button
                type="button"
                className="button-link button-outline"
                onClick={() => setLimit((current) => current + pageSize)}
              >
                {zh ? "加载更多业务笔记" : "Load more notes"}
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
