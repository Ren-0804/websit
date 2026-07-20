import type { Metadata } from "next"
import { notFound } from "next/navigation"
import RegionDetailClient from "@/app/regions/[city]/RegionDetailClient"
import { citySlugs, getCopy, type CitySlug } from "@/lib/i18n"
import { createPageMetadata } from "@/lib/seo"

type RegionPageProps = { params: Promise<{ city: CitySlug }> }

export async function generateStaticParams() {
  return citySlugs.map((city) => ({ city }))
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { city } = await params
  const data = getCopy("zh").cities.find((item) => item.slug === city)
  if (!data) return { title: "Region not found", robots: { index: false, follow: false } }
  return createPageMetadata({
    title: `${data.name}物流方向`,
    description: data.summary,
    path: `/regions/${city}`,
    image: "/route-map.jpg",
  })
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { city } = await params
  if (!citySlugs.includes(city)) notFound()
  return <RegionDetailClient citySlug={city} />
}
