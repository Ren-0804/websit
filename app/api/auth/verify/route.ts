import { NextResponse } from "next/server"
import { authenticator } from "otplib"
import { signToken } from "@/lib/auth"

export async function POST(request: Request) {
    try {
        const { code } = await request.json()
        const normalizedCode = String(code || "").replace(/\D/g, "")
        const secret = process.env.TOTP_SECRET

        if (!secret) {
            return NextResponse.json({ error: "Server TOTP secret not configured" }, { status: 500 })
        }

        if (normalizedCode.length !== 6) {
            return NextResponse.json({ error: "Please enter a 6-digit authenticator code" }, { status: 400 })
        }

        // Allow a small amount of clock drift between the server and authenticator app.
        authenticator.options = { window: 1 }
        const isValid = authenticator.check(normalizedCode, secret)

        if (isValid) {
            const token = await signToken({ admin: true })
            const response = NextResponse.json({ success: true })

            response.cookies.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            })

            return response
        }

        return NextResponse.json({ error: "The authenticator code is incorrect or expired" }, { status: 401 })
    } catch (error) {
        console.error("Auth error:", error)
        return NextResponse.json({ error: "Authentication server error" }, { status: 500 })
    }
}
