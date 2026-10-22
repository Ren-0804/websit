"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Loader2, LogOut, Save, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/components/language-selector";

type PostStatus = "published" | "draft";
type PublishForm = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
};
const initialForm: PublishForm = {
  title: "",
  slug: "",
  category: "Company News",
  summary: "",
  coverImage: "",
  seoTitle: "",
  seoDescription: "",
  content: "",
};
function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function PublishPage() {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage.code === "zh";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PublishForm>(initialForm);
  const [preview, setPreview] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const effectiveSlug = useMemo(
    () => createSlug(data.slug || data.title),
    [data.slug, data.title],
  );
  function update(name: keyof PublishForm, value: string) {
    setData((current) => {
      const next = { ...current, [name]: value };
      if (name === "title" && !current.slug) next.slug = createSlug(value);
      return next;
    });
  }
  async function submit(status: PostStatus) {
    if (!data.title.trim() || !data.content.trim()) {
      toast({
        title: zh ? "内容不完整" : "Missing content",
        description: zh
          ? "标题和正文是必填项。"
          : "Title and body are required.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slug: effectiveSlug, status }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || (zh ? "保存失败" : "Save failed"));
      toast({
        title:
          status === "draft"
            ? zh
              ? "草稿已提交"
              : "Draft submitted"
            : zh
              ? "文章已提交发布"
              : "Article submitted",
        description:
          status === "draft"
            ? zh
              ? "草稿已写入内容仓库。"
              : "The draft was saved to the content repository."
            : zh
              ? "内容已经提交到 Git 仓库，部署完成后会出现在公开站点。"
              : "Content was committed to Git and will appear after deployment.",
      });
      setData(initialForm);
    } catch (error) {
      toast({
        title: zh ? "保存失败" : "Save failed",
        description:
          error instanceof Error
            ? error.message
            : zh
              ? "请稍后再试。"
              : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    setLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      window.location.href = "/admin/login";
    } catch {
      setLoggingOut(false);
      toast({
        title: zh ? "退出失败，请重试" : "Unable to sign out. Try again.",
        variant: "destructive",
      });
    }
  }
  function field(
    name: keyof PublishForm,
    label: string,
    placeholder?: string,
    rows?: number,
  ) {
    return (
      <label className="block">
        <span className="field-label">{label}</span>
        {rows ? (
          <textarea
            className="field"
            value={data[name]}
            onChange={(event) => update(name, event.target.value)}
            rows={rows}
            placeholder={placeholder}
          />
        ) : (
          <input
            className="field"
            value={data[name]}
            onChange={(event) => update(name, event.target.value)}
            placeholder={placeholder}
          />
        )}
      </label>
    );
  }
  return (
    <main id="main-content" className="site-main">
      <header className="border-b bg-white py-8">
        <div className="container">
          <Link href="/news" className="text-link text-sm">
            <ArrowLeft aria-hidden="true" />
            {zh ? "返回业务笔记" : "Back to notes"}
          </Link>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl">
                {zh ? "发布文章" : "Publish an article"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm">
                {zh
                  ? "生产环境会把 Markdown 提交到 Git 仓库，再由 Vercel 完成部署。"
                  : "Markdown is committed to Git; the article becomes public after Vercel deploys it."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="button-link button-outline min-h-10 px-4"
                type="button"
                onClick={() => setPreview((value) => !value)}
                aria-expanded={preview}
                aria-controls="article-preview"
              >
                <Eye aria-hidden="true" />
                {preview
                  ? zh
                    ? "收起预览"
                    : "Hide preview"
                  : zh
                    ? "打开预览"
                    : "Show preview"}
              </button>
              <button
                type="button"
                className="text-link text-sm"
                onClick={logout}
                disabled={loggingOut}
              >
                <LogOut aria-hidden="true" />
                {zh ? "退出登录" : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="container py-8">
        <div
          className={
            "grid items-start gap-8 " +
            (preview ? "xl:grid-cols-[1fr_0.9fr]" : "")
          }
        >
          <form
            className="info-panel space-y-6"
            onSubmit={(event) => event.preventDefault()}
            aria-busy={loading}
          >
            <fieldset disabled={loading} className="space-y-6">
              <legend className="sr-only">
                {zh ? "文章编辑" : "Article editor"}
              </legend>
              {field("title", zh ? "标题（必填）" : "Title (required)")}
              <div className="grid gap-5 md:grid-cols-2">
                {field(
                  "slug",
                  zh ? "网址标识 Slug" : "URL slug",
                  effectiveSlug || "article-slug",
                )}
                {field("category", zh ? "分类" : "Category")}
              </div>
              {field("summary", zh ? "摘要" : "Summary", undefined, 3)}
              <label className="block">
                <span className="field-label">
                  {zh ? "Markdown 正文（必填）" : "Markdown body (required)"}
                </span>
                <textarea
                  className="field min-h-[24rem] font-mono text-sm leading-7"
                  value={data.content}
                  onChange={(event) => update("content", event.target.value)}
                  rows={18}
                />
              </label>
              <details className="border-y py-5">
                <summary className="cursor-pointer font-medium">
                  {zh ? "封面与搜索设置" : "Cover and search settings"}
                </summary>
                <div className="mt-5 space-y-5">
                  {field("coverImage", zh ? "封面图地址" : "Cover image URL")}
                  {field("seoTitle", zh ? "SEO 标题" : "SEO title")}
                  {field(
                    "seoDescription",
                    zh ? "SEO 描述" : "SEO description",
                    undefined,
                    3,
                  )}
                </div>
              </details>
            </fieldset>
            <div className="flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                className="button-link button-outline"
                disabled={loading}
                onClick={() => submit("draft")}
              >
                {loading ? (
                  <Loader2 className="animate-spin" aria-hidden="true" />
                ) : (
                  <Save aria-hidden="true" />
                )}
                {zh ? "保存草稿" : "Save draft"}
              </button>
              <button
                type="button"
                className="button-link"
                disabled={loading}
                onClick={() => submit("published")}
              >
                {loading ? (
                  <Loader2 className="animate-spin" aria-hidden="true" />
                ) : (
                  <Send aria-hidden="true" />
                )}
                {zh ? "发布文章" : "Publish article"}
              </button>
            </div>
          </form>
          {preview && (
            <aside
              id="article-preview"
              className="info-panel min-w-0 xl:sticky xl:top-28"
            >
              <h2 className="text-base text-primary">
                {zh ? "文章预览" : "Article preview"}
              </h2>
              <h3 className="mt-5 break-words text-2xl leading-relaxed">
                {data.title || (zh ? "文章标题预览" : "Article title")}
              </h3>
              <p className="mt-4 text-sm">
                {data.summary ||
                  (zh
                    ? "摘要会显示在业务笔记列表和文章开头。"
                    : "The summary appears in the notes list and article header.")}
              </p>
              <div className="mt-5 break-all border-y py-4 text-sm text-muted-foreground">
                /news/{effectiveSlug || "article-slug"}
              </div>
              <div className="reading-content prose prose-slate mt-6 max-w-none">
                {data.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {data.content}
                  </ReactMarkdown>
                ) : (
                  <p>
                    {zh
                      ? "Markdown 预览会显示在这里。"
                      : "The Markdown preview will appear here."}
                  </p>
                )}
              </div>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}
