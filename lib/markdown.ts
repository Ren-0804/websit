import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

// Ensure directory exists
if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
}

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

export function getPostSlugs(includeDrafts = false) {
    if (!fs.existsSync(postsDirectory)) return []
    const slugs = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'))

    if (includeDrafts) return slugs

    return slugs.filter((slug) => {
        const post = getPostBySlug(slug, true)
        return post?.status !== "draft"
    })
}

export function getPostBySlug(slug: string, includeDrafts = false): PostData | null {
    try {
        const realSlug = slug.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, `${realSlug}.md`)

        if (!fs.existsSync(fullPath)) return null

        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)
        const status = data.status === "draft" ? "draft" : "published"

        if (status === "draft" && !includeDrafts) return null

        return {
            slug: realSlug,
            title: data.title || "Untitled",
            date: data.date || new Date().toISOString(),
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

export function getAllPosts(): PostData[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is PostData => post !== null)
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}

export function getAllPostsForAdmin(): PostData[] {
    const slugs = getPostSlugs(true)
    return slugs
        .map((slug) => getPostBySlug(slug, true))
        .filter((post): post is PostData => post !== null)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

function createSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
}

export function savePost(data: Omit<PostData, "slug"> & { slug?: string }): string {
    const slug = createSlug(data.slug || data.title) || `post-${Date.now()}`

    const fullPath = path.join(postsDirectory, `${slug}.md`)

    const fileContent = matter.stringify(data.content, {
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

    fs.writeFileSync(fullPath, fileContent, "utf8")

    return slug
}
