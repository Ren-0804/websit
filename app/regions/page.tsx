import type { Metadata } from "next"
import RegionsClient from "./RegionsClient"

export const metadata: Metadata = {
  title: "Regions | Central Asia Logistics Coverage",
  description: "Logistics coverage for Tashkent, Samarkand, Almaty, Astana, Bishkek, Dushanbe and core Central Asia cities.",
  alternates: { canonical: "/regions" },
}

export default function RegionsIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://landsea.cc" },
      { "@type": "ListItem", position: 2, name: "Regions", item: "https://landsea.cc/regions" },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RegionsClient />
    </>
  )
}
