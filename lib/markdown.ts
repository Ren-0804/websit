import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface PostData {
  slug: string
  title: string
  date: string
  summary: string
  content: string
  category?: string
  coverImage?: string
  seoTitle?: string
  seoDescription?: string
  status?: "draft" | "published"
  sourceUrl?: string
  sourceName?: string
}

export type PostSummary = Pick<PostData, "slug" | "title" | "date" | "summary" | "category" | "coverImage">

function listPostFiles() {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"))
}

export function getPostSlugs(includeDrafts = false) {
  if (includeDrafts) return listPostFiles()
  return readAllPosts(false).map((post) => `${post.slug}.md`)
}

export function getPostBySlug(slug: string, includeDrafts = false): PostData | null {
  try {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, `${realSlug}.md`)
    if (!fs.existsSync(fullPath)) return null

    const { data, content } = matter(fs.readFileSync(fullPath, "utf8"))
    const status = data.status === "draft" ? "draft" : "published"
    if (status === "draft" && !includeDrafts) return null

    return {
      slug: realSlug,
      title: data.title || "Untitled",
      date: data.date || new Date(0).toISOString(),
      summary: data.summary || "",
      content,
      category: data.category || "",
      coverImage: data.coverImage || "",
      seoTitle: data.seoTitle || "",
      seoDescription: data.seoDescription || "",
      status,
      sourceUrl: data.sourceUrl || "",
      sourceName: data.sourceName || "",
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

function readAllPosts(includeDrafts: boolean) {
  return listPostFiles()
    .map((slug) => getPostBySlug(slug, includeDrafts))
    .filter((post): post is PostData => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllPosts(): PostData[] {
  return readAllPosts(false)
}

export function getAllPostSummaries(): PostSummary[] {
  return getAllPosts().map(({ slug, title, date, summary, category, coverImage }) => ({
    slug,
    title,
    date,
    summary,
    category,
    coverImage,
  }))
}

export function getAllPostsForAdmin(): PostData[] {
  return readAllPosts(true)
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function serializePost(data: Omit<PostData, "slug"> & { slug?: string }) {
  const slug = createSlug(data.slug || data.title) || `post-${Date.now()}`
  const content = matter.stringify(data.content, {
    title: data.title,
    date: data.date,
    summary: data.summary,
    category: data.category || "",
    coverImage: data.coverImage || "",
    seoTitle: data.seoTitle || "",
    seoDescription: data.seoDescription || "",
    status: data.status || "published",
    sourceUrl: data.sourceUrl || "",
    sourceName: data.sourceName || "",
  })
  return { slug, content }
}

export function savePost(data: Omit<PostData, "slug"> & { slug?: string }): string {
  const serialized = serializePost(data)
  fs.mkdirSync(postsDirectory, { recursive: true })
  fs.writeFileSync(path.join(postsDirectory, `${serialized.slug}.md`), serialized.content, "utf8")
  return serialized.slug
}
