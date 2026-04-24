import type { Metadata } from "next"
import ServicesClient from "./ServicesClient"

export const metadata: Metadata = {
  title: "服务能力 | 中亚铁路班列、跨境多式联运、清关仓储",
  description:
    "丰吉国际提供中亚铁路班列、跨境多式联运、清关仓储和供应链咨询服务，覆盖中国、中亚、俄罗斯和欧洲方向。",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "服务能力 | LandSea",
    description: "中亚铁路班列、跨境多式联运、清关仓储和供应链项目执行。",
    url: "/services",
  },
}

export default function ServicesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cross-border logistics and supply chain execution",
    provider: {
      "@type": "Organization",
      name: "LandSea International Supply Chain Management",
      url: "https://landsea.cc",
    },
    areaServed: ["China", "Central Asia", "Russia", "Europe"],
    serviceType: ["Block train", "Multimodal transport", "Customs clearance", "Warehousing"],
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesClient />
    </main>
  )
}
