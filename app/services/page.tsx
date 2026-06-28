import type { Metadata } from "next"
import ServicesClient from "./ServicesClient"

export const metadata: Metadata = {
  title: "Services | Central Asia Rail, Multimodal Freight, Customs",
  description:
    "Central Asia block train, cross-border multimodal freight, customs, warehousing and supply chain execution for China, Central Asia, Russia and Europe.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | LandSea",
    description: "Block train, multimodal freight, customs and warehousing for Central Asia corridors.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesClient />
    </>
  )
}
