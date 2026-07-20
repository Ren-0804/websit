import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import AboutClient from "./AboutClient"

export const metadata: Metadata = createPageMetadata({
  title: "关于我们",
  description: "丰吉国际位于江苏连云港，业务围绕中国至中亚、俄罗斯、欧洲部分线路的跨境物流执行服务。",
  path: "/about",
})

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutClient />
    </main>
  )
}
