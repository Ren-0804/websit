import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "中亚区域覆盖 | 城市落地页索引 | 丰吉国际供应链",
  description: "覆盖塔什干、撒马尔罕、阿拉木图、阿斯塔纳、比什凯克、杜尚别等中亚核心城市的物流服务与FAQ。",
  alternates: { canonical: "/regions" },
}

const cityList = [
  { slug: "tashkent", name: "塔什干（乌兹别克斯坦）" },
  { slug: "samarkand", name: "撒马尔罕（乌兹别克斯坦）" },
  { slug: "almaty", name: "阿拉木图（哈萨克斯坦）" },
  { slug: "astana", name: "阿斯塔纳（哈萨克斯坦）" },
  { slug: "bishkek", name: "比什凯克（吉尔吉斯斯坦）" },
  { slug: "dushanbe", name: "杜尚别（塔吉克斯坦）" },
]

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
      <nav className="container mx-auto px-4 pt-6 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li>区域</li>
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">中亚区域覆盖</h1>
          <p className="text-gray-600 mb-12">选择城市查看本地化物流服务、参考时效与常见问题。</p>
          <div className="grid md:grid-cols-2 gap-6">
            {cityList.map((c) => (
              <Link key={c.slug} href={`/regions/${c.slug}`} className="p-6 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all">
                <div className="font-bold text-gray-900">{c.name}</div>
                <div className="text-gray-600 mt-2">物流服务、参考时效与FAQ</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}