import type { Metadata } from "next"
import NetworkClient from "./NetworkClient"

export const metadata: Metadata = {
  title: "全球物流网络布局 | 中亚枢纽与中国城市联通 | 丰吉国际供应链",
  description: "物流网络覆盖全国与中亚关键节点，保障快速、准确的国际物流服务。",
  alternates: { canonical: "/network" },
  openGraph: {
    title: "物流网络 | 丰吉国际供应链",
    description: "全国与中亚关键节点联通，保障高效运输。",
    url: "https://landsea.cc/network",
    images: [{ url: "/route-map.jpg", width: 1200, height: 630, alt: "Global Network Map" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "物流网络 | 丰吉国际供应链",
    description: "全国与中亚关键节点联通，保障高效运输。",
    images: ["/route-map.jpg"],
  },
}

export default function NetworkPage() {
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
              { "@type": "ListItem", "position": 2, "name": "全球网络", "item": "https://landsea.cc/network" }
            ]
          })
        }}
      />
      <NetworkClient />
    </main>
  )
}