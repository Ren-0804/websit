"use client"

import { ArrowRight, Calendar, Check, Clock3, MapPin, Phone, Route, Ship, Train, Warehouse } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-selector"
import { contact, getCopy } from "@/lib/i18n"
import type { PostData } from "@/lib/markdown"

const iconMap = { train: Train, route: Route, warehouse: Warehouse }

export default function HomeClient({ recentPosts }: { recentPosts: PostData[] }) {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LandSea International Supply Chain Management",
    alternateName: "丰吉国际供应链管理（江苏）有限公司",
    url: "https://landsea.cc",
    logo: "https://landsea.cc/brand-mark.svg",
    email: contact.email,
    telephone: contact.phone,
    address: { "@type": "PostalAddress", streetAddress: contact.addressEn, addressLocality: "Lianyungang", addressRegion: "Jiangsu", addressCountry: "CN" },
    areaServed: ["China", "Central Asia", "Russia", "Europe"],
  }

  return (
    <main className="min-h-screen bg-[#f7f2e8] text-[#101820]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative min-h-[92vh] overflow-hidden bg-[#101820] pt-24 text-white">
        <Image src="/logistics-background.jpg" alt="Rail and ocean freight logistics" fill priority className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,32,0.96)_0%,rgba(16,24,32,0.82)_48%,rgba(16,24,32,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#101820] to-transparent" />
        <div className="container relative flex min-h-[calc(92vh-6rem)] items-center py-14">
          <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.72fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="site-eyebrow text-[#e05a62]">{t.home.eyebrow}</div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">{t.home.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">{t.home.intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-none bg-[#b3262f] px-6 text-base font-semibold text-white hover:bg-[#941f27]"><Link href="/contact">{t.cta.route}<ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" className="h-12 rounded-none border-white/30 bg-transparent px-6 text-base font-semibold text-white hover:bg-white hover:text-[#101820]"><Link href="/services">{t.cta.services}</Link></Button>
              </div>
            </div>
            <div className="border border-white/15 bg-[#101820]/70 p-5 backdrop-blur">
              <div className="grid gap-4">
                {t.home.metrics.map((metric) => <div key={metric.label} className="border-l border-[#d84650] pl-4"><div className="text-4xl font-semibold text-white">{metric.value}</div><div className="mt-1 text-sm leading-6 text-white/60">{metric.label}</div></div>)}
              </div>
              <div className="mt-6 border-t border-white/10 pt-5">
                {t.home.proof.map((item) => <div key={item} className="flex gap-3 py-2 text-sm text-white/70"><Check className="mt-0.5 h-4 w-4 flex-none text-[#e05a62]" />{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-[#f7f2e8]">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="industrial-rule"><div className="site-eyebrow">{t.nav.services}</div><h2 className="mt-4 max-w-xl">{t.home.servicesTitle}</h2><p className="mt-5 max-w-xl text-pretty">{t.home.servicesIntro}</p></div>
            <div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-3">
              {t.services.map((service) => {
                const Icon = iconMap[service.icon]
                return <Link key={service.slug} href={`/services/${service.slug}`} className="group bg-[#fbfaf7] p-6 transition hover:bg-white"><Icon className="h-7 w-7 text-[#b3262f]" /><h3 className="mt-8 text-xl font-semibold text-[#101820]">{service.title}</h3><p className="mt-4 text-sm leading-7 text-[#5b6266]">{service.short}</p><span className="mt-7 inline-flex items-center text-sm font-semibold text-[#101820]">{t.cta.services}<ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" /></span></Link>
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section route-grid border-y border-[#d8d1c5] bg-[#efe8dc]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
            <div className="relative min-h-[420px] overflow-hidden border border-[#cfc6b7] bg-[#101820]">
              <Image src="/route-map.jpg" alt="Central Asia logistics route map" fill className="object-cover opacity-65" />
              <div className="absolute inset-0 bg-[#101820]/20" />
              <div className="absolute left-6 top-6 border border-white/20 bg-[#101820]/80 px-4 py-3 text-sm font-semibold text-white backdrop-blur">{t.detail.routeLabel}</div>
              <div className="absolute bottom-6 left-6 right-6 grid gap-2 md:grid-cols-3">{["Lianyungang", "Kashgar", "Tashkent"].map((node) => <div key={node} className="border border-white/15 bg-white/90 px-3 py-3 text-sm font-semibold text-[#101820]">{node}</div>)}</div>
            </div>
            <div>
              <div className="site-eyebrow">{t.nav.regions}</div><h2 className="mt-4">{t.home.networkTitle}</h2><p className="mt-5">{t.home.networkIntro}</p>
              <div className="mt-8 grid gap-3">
                {t.cities.slice(0, 4).map((city) => <Link key={city.slug} href={`/regions/${city.slug}`} className="grid grid-cols-[1fr_auto] gap-4 border border-[#d8d1c5] bg-[#fbfaf7] p-4 hover:bg-white"><div><div className="font-semibold text-[#101820]">{city.name}, {city.country}</div><div className="mt-1 text-sm text-[#6d7478]">{city.summary}</div></div><div className="text-sm font-semibold text-[#b3262f]">{city.time}</div></Link>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-[#f7f2e8]">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><div className="site-eyebrow">{t.nav.news}</div><h2 className="mt-4">{t.home.newsTitle}</h2></div><Button asChild variant="outline" className="w-fit rounded-none border-[#101820] bg-transparent px-5 font-semibold text-[#101820] hover:bg-[#101820] hover:text-white"><Link href="/news">{t.cta.allNews}<ArrowRight className="h-4 w-4" /></Link></Button></div>
          <div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-3">
            {recentPosts.length > 0 ? recentPosts.map((post) => <article key={post.slug} className="bg-[#fbfaf7] p-6"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d7478]"><Calendar className="h-4 w-4" />{format(new Date(post.date), "MMM d, yyyy")}</div><h3 className="mt-5 line-clamp-2 text-xl font-semibold leading-tight text-[#101820]"><Link href={`/news/${post.slug}`}>{post.title}</Link></h3><p className="mt-4 line-clamp-3 text-sm leading-7 text-[#5b6266]">{post.summary || post.content.slice(0, 150)}</p><Link href={`/news/${post.slug}`} className="mt-6 inline-flex items-center text-sm font-semibold text-[#b3262f]">{t.cta.read}<ArrowRight className="ml-2 h-4 w-4" /></Link></article>) : <div className="bg-[#fbfaf7] p-8 text-sm text-[#6d7478] md:col-span-3">{t.detail.emptyNews}</div>}
          </div>
        </div>
      </section>

      <section id="contact" className="site-section bg-[#101820] text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1fr]">
            <div><div className="site-eyebrow text-[#e05a62]">{t.nav.contact}</div><h2 className="mt-4">{t.home.contactTitle}</h2><p className="mt-5 max-w-xl text-white/60">{t.home.contactIntro}</p><div className="mt-10 grid gap-4 text-sm"><a href={`tel:${contact.phoneHref}`} className="flex gap-4 border border-white/10 p-5 text-white hover:bg-white/5"><Phone className="mt-0.5 h-5 w-5 flex-none text-[#e05a62]" /><span>{contact.phone}</span></a><div className="flex gap-4 border border-white/10 p-5 text-white/70"><MapPin className="mt-0.5 h-5 w-5 flex-none text-[#e05a62]" /><span>{currentLanguage.code === "zh" ? contact.addressZh : contact.addressEn}</span></div><div className="grid grid-cols-3 gap-3">{[Ship, Train, Clock3].map((Icon, index) => <div key={index} className="border border-white/10 p-4"><Icon className="h-5 w-5 text-[#e05a62]" /></div>)}</div></div></div>
            <div className="border border-[#d8d1c5] bg-[#fbfaf7] p-5 text-[#101820] md:p-8"><ContactForm /></div>
          </div>
        </div>
      </section>
    </main>
  )
}
