import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(80),
  contactMethod: z.string().trim().min(3).max(120),
  company: z.string().trim().max(120).optional().default(""),
  origin: z.string().trim().min(1).max(120),
  destination: z.string().trim().min(1).max(120),
  cargoInfo: z.string().trim().min(1).max(3000),
  shippingTime: z.string().trim().max(120).optional().default(""),
})

type Attempt = { count: number; resetAt: number }
const attempts = new Map<string, Attempt>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

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
  return current.count > MAX_REQUESTS
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP configuration is incomplete")
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_PORT === "465",
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })
}

export async function POST(request: Request) {
  try {
    const key = clientKey(request)
    if (isRateLimited(key)) {
      return NextResponse.json({ error: "请求过于频繁，请稍后再试" }, { status: 429 })
    }

    const parsed = inquirySchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "提交内容不完整或格式不正确" }, { status: 400 })
    }

    if (!process.env.CONTACT_EMAIL || !process.env.SMTP_USER) {
      throw new Error("Mail recipient configuration is incomplete")
    }

    const data = parsed.data
    const safe = Object.fromEntries(
      Object.entries(data).map(([keyName, value]) => [keyName, escapeHtml(value)]),
    ) as Record<keyof typeof data, string>

    const info = await getTransporter().sendMail({
      from: `"丰吉国际" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `新物流询价: ${data.origin} → ${data.destination}`,
      text: `姓名: ${data.name}\n联系方式: ${data.contactMethod}\n公司: ${data.company}\n起运地: ${data.origin}\n目的地: ${data.destination}\n预计发运时间: ${data.shippingTime}\n货物信息:\n${data.cargoInfo}`,
      html: `<h2>新物流询价</h2><p><strong>姓名:</strong> ${safe.name}</p><p><strong>联系方式:</strong> ${safe.contactMethod}</p><p><strong>公司:</strong> ${safe.company}</p><p><strong>起运地:</strong> ${safe.origin}</p><p><strong>目的地:</strong> ${safe.destination}</p><p><strong>预计发运时间:</strong> ${safe.shippingTime || "未填写"}</p><p><strong>货物信息:</strong></p><p>${safe.cargoInfo.replace(/\n/g, "<br>")}</p>`,
    })

    console.log("Inquiry email sent:", info.messageId)
    return NextResponse.json({ message: "邮件发送成功" })
  } catch (error) {
    console.error("Inquiry email failed:", error)
    return NextResponse.json({ error: "邮件发送失败，请稍后再试" }, { status: 500 })
  }
}
