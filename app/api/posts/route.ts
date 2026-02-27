import { NextResponse } from "next/server"
import { savePost } from "@/lib/markdown"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { title, summary, content } = body

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            )
        }

        const slug = savePost({
            title,
            summary: summary || "",
            content,
            date: new Date().toISOString(),
        })

        return NextResponse.json(
            { message: "Post saved successfully", slug },
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
