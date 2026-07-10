import { NextResponse } from "next/server"
import { authenticator } from "otplib"
import { signToken } from "@/lib/auth"

type Attempt = { count: number; resetAt: number }
const attempts = new Map<string, Attempt>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 8

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = attempts.get(key)
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > MAX_ATTEMPTS
}

export async function POST(request: Request) {
  try {
    const key = clientKey(request)
    if (isRateLimited(key)) {
      return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 })
    }

    const { code } = await request.json()
    const normalizedCode = String(code || "").replace(/\D/g, "")
    const secret = process.env.TOTP_SECRET

    if (!secret) {
      return NextResponse.json({ error: "Server TOTP secret not configured" }, { status: 500 })
    }
    if (normalizedCode.length !== 6) {
      return NextResponse.json({ error: "Please enter a 6-digit authenticator code" }, { status: 400 })
    }

    authenticator.options = { window: 1 }
    if (!authenticator.check(normalizedCode, secret)) {
      return NextResponse.json({ error: "The authenticator code is incorrect or expired" }, { status: 401 })
    }

    attempts.delete(key)
    const token = await signToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8,
      path: "/",
    })
    return response
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Authentication server error" }, { status: 500 })
  }
}
