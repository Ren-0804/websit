import type { Metadata } from "next"
import { companyName, siteUrl } from "@/lib/i18n"
import ServicesClient from "./ServicesClient"

export const metadata: Metadata = {
  title: "服务范围 | 中亚铁路班列、跨境公路与多式联运",
  description:
    "丰吉国际提供中国至中亚、俄罗斯、欧洲部分线路的铁路班列、跨境公路、多式联运、清关协同、仓储分拨和目的国派送服务。",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "服务范围 | 丰吉国际",
    description: "中亚铁路班列、跨境公路、多式联运、清关协同和目的国派送。",
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
      name: companyName,
      url: siteUrl,
    },
    areaServed: ["China", "Central Asia", "Russia", "Europe"],
    serviceType: ["Block train", "Multimodal transport", "Customs clearance", "Warehousing"],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesClient />
    </>
  )
}
