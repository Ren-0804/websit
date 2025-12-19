import type { Metadata } from "next"
import RegionsClient from "./RegionsClient"

export const metadata: Metadata = {
  title: "中亚区域覆盖 | 城市落地页索引 | 丰吉国际供应链",
  description: "覆盖塔什干、撒马尔罕、阿拉木图、阿斯塔纳、比什凯克、杜尚别等中亚核心城市的物流服务与FAQ。",
  alternates: { canonical: "/regions" },
}

export default function RegionsIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://landsea.cc" },
      { "@type": "ListItem", position: 2, name: "区域", item: "https://landsea.cc/regions" },
    ],
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RegionsClient />
    </main>
  )
}