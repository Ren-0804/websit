import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ServiceDetailClient from "@/app/services/[slug]/ServiceDetailClient"
import { getCopy, primaryBrand, serviceSlugs, type ServiceSlug } from "@/lib/i18n"

type ServicePageProps = { params: Promise<{ slug: ServiceSlug }> }

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getCopy("zh").services.find((item) => item.slug === slug)
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } }
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${service.title} | ${primaryBrand}`, description: service.summary, url: `/services/${slug}`, type: "article", images: [{ url: "/route-map.jpg", width: 1200, height: 630, alt: service.title }] },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  if (!serviceSlugs.includes(slug)) notFound()
  const service = getCopy("zh").services.find((item) => item.slug === slug)
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service?.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /><ServiceDetailClient slug={slug} /></>
}
