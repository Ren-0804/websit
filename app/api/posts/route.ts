import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyToken } from "@/lib/auth"
import { publishPost } from "@/lib/content-publisher"
import { getAllPostsForAdmin } from "@/lib/markdown"

const postSchema = z.object({
  title: z.string().trim().min(1).max(180),
  summary: z.string().trim().max(500).optional().default(""),
  content: z.string().trim().min(1).max(100_000),
  slug: z.string().trim().max(120).optional().default(""),
  category: z.string().trim().max(80).optional().default(""),
  coverImage: z.string().trim().max(500).optional().default(""),
  seoTitle: z.string().trim().max(180).optional().default(""),
  seoDescription: z.string().trim().max(500).optional().default(""),
  status: z.enum(["draft", "published"]),
})

function getAdminToken(request: Request) {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("admin_token="))
    ?.split("=")
    .slice(1)
    .join("=")
}

async function requireAdmin(request: Request) {
  const token = getAdminToken(request)
  if (!token) return false
  return Boolean(await verifyToken(decodeURIComponent(token)))
}

export async function GET(request: Request) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }
    return NextResponse.json({ posts: getAllPostsForAdmin() })
  } catch (error) {
    console.error("Error loading posts:", error)
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const parsed = postSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid post data" }, { status: 400 })
    }

    const data = parsed.data
    const savedSlug = await publishPost({
      title: data.title,
      summary: data.summary,
      content: data.content,
      slug: data.slug,
      category: data.category,
      coverImage: data.coverImage,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      status: data.status,
      date: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        message: "Post accepted. Git-backed production publishing may require a deployment to become visible.",
        slug: savedSlug,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error publishing post:", error)
    return NextResponse.json({ error: "Failed to publish post" }, { status: 500 })
  }
}
