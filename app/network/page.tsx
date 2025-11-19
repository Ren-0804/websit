import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "全球物流网络布局 | 中亚枢纽与中国城市联通 | 丰吉国际供应链",
  description: "物流网络覆盖全国与中亚关键节点，保障快速、准确的国际物流服务。",
  alternates: { canonical: "/network" },
  openGraph: {
    title: "物流网络 | 丰吉国际供应链",
    description: "全国与中亚关键节点联通，保障高效运输。",
    url: "https://landsea.cc/network",
    images: [{ url: "/route-map.jpg", width: 1200, height: 630, alt: "全球网络地图" }],
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
    <main className="container py-12 mx-auto">
      <nav className="px-4 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li>全球网络</li>
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
              { "@type": "ListItem", "position": 2, "name": "全球网络", "item": "https://landsea.cc/network" }
            ]
          })
        }}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">物流网络</h1>
        <p className="text-gray-700 mb-4">物流网络布局：我们的物流网络覆盖了全国各地，能够为客户提供快速、准确的物流服务。</p>
        <p className="text-gray-700 mb-4">主要节点：包含多个重要城市，如北京、上海、广州等，确保货物能够高效流转。</p>
        <p className="text-gray-700 mb-4">合作关系：与多家知名企业建立了长期稳定的合作关系，共同提升物流服务质量。</p>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">中亚核心城市直达</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { slug: "tashkent", name: "塔什干（乌兹别克斯坦）" },
              { slug: "samarkand", name: "撒马尔罕（乌兹别克斯坦）" },
              { slug: "almaty", name: "阿拉木图（哈萨克斯坦）" },
              { slug: "astana", name: "阿斯塔纳（哈萨克斯坦）" },
              { slug: "bishkek", name: "比什凯克（吉尔吉斯斯坦）" },
              { slug: "dushanbe", name: "杜尚别（塔吉克斯坦）" },
            ].map((c) => (
              <Link key={c.slug} href={`/regions/${c.slug}`} className="p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-sm transition-all">
                <div className="font-medium text-gray-900">{c.name}</div>
                <div className="text-sm text-gray-600">查看本地化服务与FAQ</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}