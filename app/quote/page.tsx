import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "获取报价 | 国际物流即时报价 | 丰吉国际供应链",
  description: "填写信息获取国际物流精准报价与方案建议。",
  alternates: { canonical: "/quote" },
}

export default function QuotePage() {
  return (
    <div className="container py-12">
      <nav className="px-4 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li>获取报价</li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://landsea.cc" },
              { "@type": "ListItem", "position": 2, "name": "获取报价", "item": "https://landsea.cc/quote" }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold">获取报价</h1>
      <p className="mt-4 text-muted-foreground">请填写以下信息获取精准报价</p>
    </div>
  )
}