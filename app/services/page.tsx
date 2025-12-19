import type { Metadata } from "next"
import ServicesClient from "./ServicesClient"

export const metadata: Metadata = {
  title: "物流服务 | 中亚班列 | 跨境多式联运 | 清关仓储 | 丰吉国际供应链",
  description: "提供塔什干、阿拉木图、莫斯科等地的集装箱班列、汽运及清关仓储服务。",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://landsea.cc" },
              { "@type": "ListItem", "position": 2, "name": "服务", "item": "https://landsea.cc/services" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "国际物流与供应链服务",
            "provider": { "@type": "Organization", "name": "丰吉国际供应链管理(江苏)有限公司", "url": "https://landsea.cc" },
            "areaServed": ["中国", "乌兹别克斯坦", "哈萨克斯坦", "俄罗斯", "欧洲"],
            "serviceType": ["中亚集装箱回程班列", "跨境多式联运", "清关仓储一体化"],
            "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
          })
        }}
      />
      <ServicesClient />
    </main>
  )
}