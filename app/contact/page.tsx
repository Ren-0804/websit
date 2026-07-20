import type { Metadata } from "next"
import { siteUrl } from "@/lib/i18n"
import { createPageMetadata } from "@/lib/seo"
import ContactClient from "./ContactClient"

export const metadata: Metadata = createPageMetadata({
  title: "联系咨询",
  description: "联系丰吉国际，咨询中国至中亚、俄罗斯、欧洲部分线路的铁路、公路、多式联运、清关和派送方案。",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首页", "item": siteUrl },
              { "@type": "ListItem", "position": 2, "name": "联系咨询", "item": `${siteUrl}/contact` }
            ]
          })
        }}
      />
      <ContactClient />
    </>
  )
}
