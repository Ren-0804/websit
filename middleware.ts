import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
    // Only the login screen is public. Setup exposes the authenticator seed.
    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (request.nextUrl.pathname.startsWith("/admin/login")) {
            return NextResponse.next()
        }

        if (
            request.nextUrl.pathname.startsWith("/admin/setup") &&
            process.env.ADMIN_SETUP_OPEN === "true"
        ) {
            return NextResponse.next()
        }

        // Require token for other /admin paths like /admin/publish
        const token = request.cookies.get("admin_token")?.value

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }

        const verified = await verifyToken(token)

        if (!verified) {
            // Token exists but is invalid/expired
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/admin/:path*',
    ],
}
