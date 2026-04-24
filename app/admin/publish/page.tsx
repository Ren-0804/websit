"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, Loader2, Save, Send } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

type PostStatus = "published" | "draft"

const initialForm = {
  title: "",
  slug: "",
  category: "Company News",
  summary: "",
  coverImage: "",
  seoTitle: "",
  seoDescription: "",
  content: "",
  status: "published" as PostStatus,
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export default function PublishPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [showPreview, setShowPreview] = useState(true)

  const effectiveSlug = useMemo(() => createSlug(formData.slug || formData.title), [formData.slug, formData.title])
  const seoTitle = formData.seoTitle || formData.title
  const seoDescription = formData.seoDescription || formData.summary

  const updateField = (name: keyof typeof initialForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      slug: name === "title" && !prev.slug ? createSlug(value) : prev.slug,
    }))
  }

  const handleSubmit = async (status: PostStatus) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "内容不完整",
        description: "标题和正文是必填项。",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug: effectiveSlug,
          status,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save post")
      }

      toast({
        title: status === "draft" ? "草稿已保存" : "文章已发布",
        description: status === "draft" ? "草稿不会出现在公开新闻列表。" : "文章已经进入公开新闻列表。",
        className: "bg-white border border-slate-200 shadow-lg",
      })

      if (status === "published") {
        router.push(`/news/${data.slug}`)
      } else {
        setFormData(initialForm)
      }
    } catch (error) {
      toast({
        title: "保存失败",
        description: error instanceof Error ? error.message : "请稍后再试。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-24">
      <section className="border-b border-slate-200 bg-white">
        <div className="container py-8">
          <Link href="/news" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-950">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回新闻列表
          </Link>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c91f28]">Admin CMS</div>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950">发布文章</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                填写正文、SEO 信息和发布状态。公开页面只展示已发布文章。
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-fit rounded-full border-slate-300"
              onClick={() => setShowPreview((value) => !value)}
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "收起预览" : "打开预览"}
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className={`grid gap-6 ${showPreview ? "xl:grid-cols-[1fr_0.86fr]" : ""}`}>
          <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">标题</span>
                <input
                  value={formData.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  placeholder="例如 Central Asia block train capacity update"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-slate-700">Slug</span>
                <input
                  value={formData.slug}
                  onChange={(event) => updateField("slug", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  placeholder={effectiveSlug || "auto-generated-slug"}
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-slate-700">分类</span>
                <input
                  value={formData.category}
                  onChange={(event) => updateField("category", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  placeholder="Company News"
                />
              </label>

              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">摘要</span>
                <textarea
                  value={formData.summary}
                  onChange={(event) => updateField("summary", event.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  placeholder="用于新闻列表和文章页开头。"
                />
              </label>

              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">封面图地址</span>
                <input
                  value={formData.coverImage}
                  onChange={(event) => updateField("coverImage", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  placeholder="/logistics-background.jpg 或 https://example.com/image.jpg"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-slate-700">SEO 标题</span>
                <input
                  value={formData.seoTitle}
                  onChange={(event) => updateField("seoTitle", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  placeholder="留空则使用文章标题"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-slate-700">SEO 描述</span>
                <input
                  value={formData.seoDescription}
                  onChange={(event) => updateField("seoDescription", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  placeholder="留空则使用摘要"
                />
              </label>

              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Markdown 正文</span>
                <textarea
                  value={formData.content}
                  onChange={(event) => updateField("content", event.target.value)}
                  rows={18}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-4 font-mono text-sm leading-7 text-slate-100 outline-none transition focus:border-slate-500"
                  placeholder={"## Overview\n\nWrite the article here..."}
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-slate-300 px-6"
                disabled={isLoading}
                onClick={() => handleSubmit("draft")}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                保存草稿
              </Button>
              <Button
                type="button"
                className="rounded-full bg-[#c91f28] px-6 text-white hover:bg-[#a71921]"
                disabled={isLoading}
                onClick={() => handleSubmit("published")}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                发布文章
              </Button>
            </div>
          </form>

          {showPreview && (
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-24">
              <div className="mb-5 rounded-2xl bg-slate-950 p-5 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Preview
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">
                  {formData.title || "文章标题预览"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {formData.summary || "摘要会显示在新闻列表和文章开头。"}
                </p>
              </div>

              <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <div>
                  <span className="text-slate-500">URL</span>
                  <div className="mt-1 font-mono text-slate-950">/news/{effectiveSlug || "article-slug"}</div>
                </div>
                <div>
                  <span className="text-slate-500">SEO title</span>
                  <div className="mt-1 text-slate-950">{seoTitle || "SEO 标题预览"}</div>
                </div>
                <div>
                  <span className="text-slate-500">SEO description</span>
                  <div className="mt-1 text-slate-950">{seoDescription || "SEO 描述预览"}</div>
                </div>
              </div>

              <div className="prose prose-slate mt-6 max-w-none rounded-2xl border border-slate-200 p-5 prose-headings:font-semibold prose-a:text-[#c91f28]">
                {formData.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{formData.content}</ReactMarkdown>
                ) : (
                  <p>Markdown 预览会显示在这里。</p>
                )}
              </div>
            </aside>
          )}
        </div>
      </section>
    </main>
  )
}
