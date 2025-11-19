import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = {
  "central-asia-rail": {
    title: "中亚集装箱回程班列",
    hero: {
      img: "/services-hero.jpg",
      alt: "中亚回程班列",
      heading: "中亚集装箱回程班列",
      sub: "塔什干、阿拉木图等枢纽至中国，10-12天稳定时效",
    },
    bullets: [
      "塔什干→中国：10-12天",
      "北哈→中国西部枢纽：约12天",
      "控箱直达，减少甩柜与延误",
    ],
    faqs: [
      { q: "回程班列的典型时效是多少？", a: "从塔什干至中国西部枢纽约10-12天，北哈地区约12天。" },
      { q: "是否支持全程控箱？", a: "支持控箱直达，减少甩柜风险并提升准点率。" },
      { q: "是否提供报关与目的港服务？", a: "提供清关与落地服务，配合国内分拨与仓储。" },
      { q: "哪些货物更适合班列运输？", a: "适合时效稳定、价值较高且体积重量适中的工业品与电商货。" },
    ],
    slug: "central-asia-rail",
    description: "提供稳定高效的中亚回程班列解决方案，控箱直达，覆盖塔什干与北哈等枢纽。",
  },
  multimodal: {
    title: "跨境多式联运",
    hero: {
      img: "/route-map.jpg",
      alt: "跨境多式联运",
      heading: "跨境多式联运",
      sub: "公铁联运与公路专线组合，中吉乌黄金通道7-9天门到门",
    },
    bullets: [
      "中吉乌通道：7-9天门到门",
      "新能源车笼车专线",
      "大件工程机械运输",
    ],
    faqs: [
      { q: "路线如何选择？", a: "根据货型与时效目标选择公路直达或公铁联运组合。" },
      { q: "是否支持车辆运输？", a: "支持新能源车与乘用车笼车运输，提供安保与轨迹监控。" },
      { q: "大件设备如何操作？", a: "提供吊装、加固与超限许可办理，按项目定制方案。" },
      { q: "价格如何核算？", a: "依据里程、货型、重量与通关费用综合核定，提供最优解。" },
    ],
    slug: "multimodal",
    description: "灵活组合的跨境多式联运解决方案，覆盖中吉乌黄金通道与大件运输。",
  },
  "customs-warehousing": {
    title: "清关仓储一体化",
    hero: {
      img: "/services-hero.jpg",
      alt: "清关与仓储",
      heading: "清关仓储一体化",
      sub: "乌兹别克斯坦本土化团队，喀什自贸区保税仓储，误差率<0.5%",
    },
    bullets: [
      "本土化清关团队",
      "保税仓储与分拨",
      "误差率<0.5%",
    ],
    faqs: [
      { q: "可支持哪些通关模式？", a: "一般贸易、电商、工程项目等多种模式，按货物与资质匹配。" },
      { q: "仓储是否提供增值服务？", a: "提供贴标、分拣、包装与二次分拨等增值服务。" },
      { q: "报关资料如何准备？", a: "按产品HS编码、产地、发票与箱单等准备，我们提供规范模板。" },
      { q: "风控如何保障？", a: "实行双人复核与系统校验，降低申报误差与合规风险。" },
    ],
    slug: "customs-warehousing",
    description: "清关与仓储一体化服务，提供保税操作与分拨，保障合规与效率。",
  },
} as const

type ServiceKey = keyof typeof services

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: ServiceKey } }): Metadata {
  const data = services[params.slug]
  const url = `https://landsea.cc/services/${params.slug}`
  return {
    title: `${data.title} | 丰吉国际供应链`,
    description: data.description,
    alternates: { canonical: `/services/${params.slug}` },
    openGraph: {
      title: `${data.title} | 丰吉国际供应链`,
      description: data.description,
      url,
      images: [{ url: data.hero.img, width: 1200, height: 630, alt: data.hero.alt }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | 丰吉国际供应链`,
      description: data.description,
      images: [data.hero.img],
    },
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: ServiceKey } }) {
  const data = services[params.slug]
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://landsea.cc" },
      { "@type": "ListItem", position: 2, name: "服务", item: "https://landsea.cc/services" },
      { "@type": "ListItem", position: 3, name: data.title, item: `https://landsea.cc/services/${data.slug}` },
    ],
  }

  return (
    <main className="min-h-screen">
      <nav className="container mx-auto px-4 pt-6 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li><Link href="/services">服务</Link></li>
          <li>/</li>
          <li>{data.title}</li>
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="absolute inset-0 z-0">
          <Image src={data.hero.img} alt={data.hero.alt} fill className="object-cover opacity-20" />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{data.hero.heading}</h1>
            <p className="text-xl text-blue-100">{data.hero.sub}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.bullets.map((b) => (
              <Card key={b} className="bg-white border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="text-gray-900 font-bold mb-2">要点</div>
                  <div className="text-gray-600">{b}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/#contact"><Button className="bg-blue-600 text-white hover:bg-blue-700">获取方案与报价</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
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