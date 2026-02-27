import { NextResponse } from "next/server"
import { authenticator } from "otplib"
import { signToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    try {
        const { code } = await request.json()
        const secret = process.env.TOTP_SECRET

        if (!secret) {
            return NextResponse.json({ error: "Server TOTP secret not configured" }, { status: 500 })
        }

        // Give it a bit of a window (default is usually 1 step before/after)
        authenticator.options = { window: 1 }
        const isValid = authenticator.check(code, secret)

        if (isValid) {
            const token = await signToken({ admin: true })

            const cookieStore = await cookies()
            cookieStore.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: "The authenticator code is incorrect or expired" }, { status: 401 })
    } catch (error) {
        console.error("Auth error:", error)
        return NextResponse.json({ error: "Authentication server error" }, { status: 500 })
    }
}
