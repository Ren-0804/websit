import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const cities = {
  tashkent: {
    zhName: "塔什干",
    country: "乌兹别克斯坦",
    heroAlt: "塔什干物流区域页",
    summary: "塔什干至中国西部枢纽约10-12天，支持班列与公路联运，覆盖清关与分拨。",
    faqs: [
      { q: "塔什干到中国时效？", a: "常规班列约10-12天，公路联运7-10天视口岸与里程不同。" },
      { q: "是否有本地团队？", a: "驻塔什干本地化团队，负责清关、仓储与分拨协同。" },
      { q: "支持哪些货品？", a: "工业品、汽车与零部件、电商货与快消品等。" },
    ],
  },
  samarkand: {
    zhName: "撒马尔罕",
    country: "乌兹别克斯坦",
    heroAlt: "撒马尔罕物流区域页",
    summary: "撒马尔罕面向乌国中部市场，公路与班列联动，时效7-12天。",
    faqs: [
      { q: "如何选择路线？", a: "按货型与时效选择公路直达或班列中转，提供方案评估。" },
      { q: "是否提供仓储？", a: "可提供中转仓储与分拨，支持贴标与包装。" },
    ],
  },
  almaty: {
    zhName: "阿拉木图",
    country: "哈萨克斯坦",
    heroAlt: "阿拉木图物流区域页",
    summary: "阿拉木图至中国西部枢纽约12天左右，连接北哈与中亚腹地。",
    faqs: [
      { q: "是否支持大件？", a: "支持工程机械与超限设备，提供吊装与加固。" },
      { q: "价格优势？", a: "回程通道成本优势明显，综合运价优于市场约15%。" },
    ],
  },
  astana: {
    zhName: "阿斯塔纳",
    country: "哈萨克斯坦",
    heroAlt: "阿斯塔纳物流区域页",
    summary: "面向哈萨克斯坦中北部市场，公铁联运覆盖主要工业与能源项目。",
    faqs: [
      { q: "项目物流是否可定制？", a: "支持项目制统筹，提供路线规划与许可证办理。" },
    ],
  },
  bishkek: {
    zhName: "比什凯克",
    country: "吉尔吉斯斯坦",
    heroAlt: "比什凯克物流区域页",
    summary: "中吉乌黄金通道枢纽，门到门7-9天，适配电商与快消品。",
    faqs: [
      { q: "是否支持门到门？", a: "提供门到门服务，含清关、配送与逆向物流。" },
    ],
  },
  dushanbe: {
    zhName: "杜尚别",
    country: "塔吉克斯坦",
    heroAlt: "杜尚别物流区域页",
    summary: "连通塔吉克斯坦市场，公路为主，结合班列与友邻口岸中转。",
    faqs: [
      { q: "安全保障？", a: "提供安保护送与定位监控，保障运输安全。" },
    ],
  },
} as const

type CityKey = keyof typeof cities

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }))
}

export function generateMetadata({ params }: { params: { city: CityKey } }): Metadata {
  const data = cities[params.city]
  const title = `${data.zhName}物流服务 | ${data.country}区域覆盖 | 丰吉国际供应链`
  const description = data.summary
  const url = `https://landsea.cc/regions/${params.city}`
  return {
    title,
    description,
    alternates: { canonical: `/regions/${params.city}` },
    openGraph: { title, description, url, images: [{ url: "/route-map.jpg", width: 1200, height: 630, alt: data.heroAlt }], type: "article" },
    twitter: { card: "summary_large_image", title, description, images: ["/route-map.jpg"] },
  }
}

export default function RegionPage({ params }: { params: { city: CityKey } }) {
  const data = cities[params.city]
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://landsea.cc" },
      { "@type": "ListItem", position: 2, name: "区域", item: "https://landsea.cc/regions" },
      { "@type": "ListItem", position: 3, name: `${data.zhName}（${data.country}）`, item: `https://landsea.cc/regions/${params.city}` },
    ],
  }

  return (
    <main className="min-h-screen">
      <nav className="container mx-auto px-4 pt-6 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li><Link href="/regions">区域</Link></li>
          <li>/</li>
          <li>{data.zhName}</li>
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="absolute inset-0 z-0">
          <Image src="/route-map.jpg" alt={data.heroAlt} fill className="object-cover opacity-20" />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{data.zhName}（{data.country}）</h1>
            <p className="text-xl text-blue-100">{data.summary}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">可提供服务</h2>
              <ul className="space-y-3 text-gray-700">
                <li>中亚回程班列直达</li>
                <li>跨境公路与公铁联运</li>
                <li>本地清关与仓储分拨</li>
              </ul>
              <div className="mt-6">
                <Link href="/services/central-asia-rail" className="text-blue-600">了解回程班列</Link>
                <span className="mx-3 text-gray-300">|</span>
                <Link href="/services/multimodal" className="text-blue-600">了解多式联运</Link>
                <span className="mx-3 text-gray-300">|</span>
                <Link href="/services/customs-warehousing" className="text-blue-600">了解清关仓储</Link>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">参考时效</h2>
              <ul className="space-y-3 text-gray-700">
                <li>至中国西部枢纽：约7-12天（视通道与模式）</li>
                <li>门到门：7-10天（中吉乌黄金通道）</li>
                <li>项目货：按方案评估与批复执行</li>
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/#contact"><Button className="bg-blue-600 text-white hover:bg-blue-700">获取方案与报价</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}