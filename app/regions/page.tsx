import type { Metadata } from "next"
import { siteUrl } from "@/lib/i18n"
import RegionsClient from "./RegionsClient"

export const metadata: Metadata = {
  title: "线路区域 | 中亚、俄罗斯方向物流节点",
  description: "丰吉国际常见咨询方向包括塔什干、阿拉木图、比什凯克、俄罗斯方向等，具体线路需按口岸、货型和清关情况确认。",
  alternates: { canonical: "/regions" },
}

export default function RegionsIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "线路区域", item: `${siteUrl}/regions` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RegionsClient />
    </>
  )
}
