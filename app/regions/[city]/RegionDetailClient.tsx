"use client"

import { ArrowRight, Check, Clock3, MapPin } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getCopy, type CitySlug } from "@/lib/i18n"

export default function RegionDetailClient({ citySlug }: { citySlug: CitySlug }) {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const city = t.cities.find((item) => item.slug === citySlug)

  if (!city) return null

  const cityFaqs = [
    { q: `${city.name} - ${t.detail.timing}?`, a: city.summary },
    { q: t.detail.available, a: t.services.map((service) => service.title).join(" / ") },
  ]

  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <section className="border-b border-[#d8d1c5] bg-[#101820] py-20 text-white md:py-24">
        <div className="container">
          <div className="max-w-4xl">
            <div className="site-eyebrow text-[#e05a62]">{t.nav.regions}</div>
            <h1 className="mt-5">{city.name}, {city.country}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{city.summary}</p>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="site-panel p-7">
              <MapPin className="h-7 w-7 text-[#b3262f]" />
              <h2 className="mt-6 text-3xl">{t.detail.timing}</h2>
              <div className="mt-4 text-4xl font-semibold text-[#101820]">{city.time}</div>
              <p className="mt-4">{city.summary}</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-3">
              {t.services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="bg-[#fbfaf7] p-5 hover:bg-white">
                  <Check className="h-5 w-5 text-[#b3262f]" />
                  <div className="mt-5 font-semibold text-[#101820]">{service.title}</div>
                  <p className="mt-3 text-sm leading-6 text-[#5b6266]">{service.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section route-grid border-y border-[#d8d1c5] bg-[#efe8dc]">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {[t.detail.routeLabel, t.detail.execution, t.detail.timing].map((label, index) => (
              <div key={label} className="border border-[#d8d1c5] bg-[#fbfaf7] p-6">
                <Clock3 className="h-5 w-5 text-[#b3262f]" />
                <div className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#6d7478]">{label}</div>
                <div className="mt-2 text-lg font-semibold text-[#101820]">
                  {index === 2 ? city.time : index === 1 ? city.country : "China / Central Asia"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container max-w-4xl">
          <div className="site-eyebrow">{t.detail.faq}</div>
          <h2 className="mt-4">{t.detail.faq}</h2>
          <Accordion type="single" collapsible className="mt-8 border-t border-[#d8d1c5]">
            {cityFaqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-[#d8d1c5]">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-[#5b6266]">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button asChild className="mt-9 h-12 rounded-none bg-[#b3262f] px-6 font-semibold text-white hover:bg-[#941f27]">
            <Link href="/contact">
              {t.cta.route}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
