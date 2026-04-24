import { NextResponse } from "next/server"
import { getAllPostsForAdmin, savePost } from "@/lib/markdown"
import { verifyToken } from "@/lib/auth"

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
    return Boolean(token && await verifyToken(decodeURIComponent(token)))
}

export async function GET(request: Request) {
    try {
        if (!(await requireAdmin(request))) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            )
        }

        return NextResponse.json({ posts: getAllPostsForAdmin() })
    } catch (error) {
        console.error("Error loading posts:", error)
        return NextResponse.json(
            { error: "Failed to load posts" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        if (!(await requireAdmin(request))) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            )
        }

        const body = await request.json()
        const {
            title,
            summary,
            content,
            slug,
            category,
            coverImage,
            seoTitle,
            seoDescription,
            status,
        } = body

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            )
        }

        const savedSlug = savePost({
            title,
            summary: summary || "",
            content,
            slug,
            category: category || "",
            coverImage: coverImage || "",
            seoTitle: seoTitle || "",
            seoDescription: seoDescription || "",
            status: status === "draft" ? "draft" : "published",
            date: new Date().toISOString(),
        })

        return NextResponse.json(
            { message: "Post saved successfully", slug: savedSlug },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error saving post:", error)
        return NextResponse.json(
            { error: "Failed to save post" },
            { status: 500 }
        )
    }
}
