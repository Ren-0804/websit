import type { Metadata } from "next"
import { notFound } from "next/navigation"
import RegionDetailClient from "@/app/regions/[city]/RegionDetailClient"
import { citySlugs, getCopy, type CitySlug } from "@/lib/i18n"

type RegionPageProps = { params: Promise<{ city: CitySlug }> }

export async function generateStaticParams() {
  return citySlugs.map((city) => ({ city }))
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { city } = await params
  const data = getCopy("en").cities.find((item) => item.slug === city)
  if (!data) return { title: "Region not found", robots: { index: false, follow: false } }
  return {
    title: `${data.name} logistics services | LandSea`,
    description: data.summary,
    alternates: { canonical: `/regions/${city}` },
    openGraph: { title: `${data.name} logistics services | LandSea`, description: data.summary, url: `/regions/${city}`, images: [{ url: "/route-map.jpg", width: 1200, height: 630, alt: `${data.name} logistics route` }], type: "article" },
  }
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { city } = await params
  if (!citySlugs.includes(city)) notFound()
  return <RegionDetailClient citySlug={city} />
}
