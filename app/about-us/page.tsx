import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于我们 | 使命愿景与核心价值 | 丰吉国际供应链",
  description: "连接全球市场的专业物流服务提供商，聚焦中亚与中国的国际运输与供应链解决方案。",
  alternates: { canonical: "/about-us" },
}

export default function AboutUsPage() {
  return (
    <div className="container py-12">
      <nav className="px-4 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li>关于我们</li>
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
              { "@type": "ListItem", "position": 2, "name": "关于我们", "item": "https://landsea.cc/about-us" }
            ]
          })
        }}
      />
      <h1 className="text-4xl font-bold mb-8 text-blue-600">关于我们</h1>
      <p className="text-gray-700 mb-4">公司背景：我们是一家专注于物流服务的企业，拥有多年的行业经验和专业团队。</p>
      <p className="text-gray-700 mb-4">服务优势：我们的物流网络覆盖全国各地，能够为客户提供快速、准确的物流服务。与多家知名企业建立了长期稳定的合作关系，共同提升物流服务质量。</p>
      <p className="text-gray-700 mb-4">发展历程：经过多年的发展，我们不断扩大业务范围，提升服务质量，逐渐成为行业内的领先企业。</p>
    </div>
  )
}