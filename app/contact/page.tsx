import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "联系我们 | 24/7客服 | 电话微信+86 17374932331 | 丰吉国际供应链",
  description: "与我们的专业团队联系，获取国际物流解决方案与报价支持。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "联系我们 | 丰吉国际供应链",
    description: "24/7 客服支持与专业咨询。",
    url: "https://landsea.cc/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "联系我们 | 丰吉国际供应链",
    description: "24/7 客服支持与专业咨询。",
  },
}

export default function ContactPage() {
  return (
    <div className="container py-12 mx-auto">
      <nav className="px-4 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li>联系我们</li>
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
              { "@type": "ListItem", "position": 2, "name": "联系我们", "item": "https://landsea.cc/contact" }
            ]
          })
        }}
      />
      <main className="container mx-auto py-12 bg-gray-100 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">联系我们</h1>
        <p className="text-gray-700 mb-4">有意者请联系：</p>
        <p className="text-gray-700 mb-4">Telegram: @akoozh</p>
        <p className="text-gray-700 mb-4">13776598380（微信同号）</p>
        <p className="text-gray-700 mb-4">17374032331（微信同号）</p>
      </main>
      <p className="mt-4 text-muted-foreground">请填写下表获取专属报价</p>
    </div>
  )
}