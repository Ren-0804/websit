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
}

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) return []
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'))
}

export function getPostBySlug(slug: string): PostData | null {
    try {
        const realSlug = slug.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, `${realSlug}.md`)

        if (!fs.existsSync(fullPath)) return null

        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
            slug: realSlug,
            title: data.title || "Untitled",
            date: data.date || new Date().toISOString(),
            summary: data.summary || "",
            content,
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

export function savePost(data: Omit<PostData, "slug"> & { slug?: string }): string {
    // Generate slug from title if not provided
    const slug = data.slug || data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
        || `post-${Date.now()}`

    const fullPath = path.join(postsDirectory, `${slug}.md`)

    const fileContent = matter.stringify(data.content, {
        title: data.title,
        date: data.date,
        summary: data.summary,
    })

    fs.writeFileSync(fullPath, fileContent, "utf8")

    return slug
}
