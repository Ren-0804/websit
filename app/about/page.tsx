import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "关于我们 | 专业物流服务提供商 | 丰吉国际供应链",
  description: "通过创新物流方案，提供高效、可靠、经济的国际运输服务，致力于成为中亚领先的物流服务提供商。",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutClient />
    </main>
  )
}