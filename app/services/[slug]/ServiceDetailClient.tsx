"use client"

import { ArrowRight, Check, Route, Train, Warehouse } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getCopy, type ServiceSlug } from "@/lib/i18n"

const iconMap = {
  train: Train,
  route: Route,
  warehouse: Warehouse,
}

export default function ServiceDetailClient({ slug }: { slug: ServiceSlug }) {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const service = t.services.find((item) => item.slug === slug)

  if (!service) return null

  const Icon = iconMap[service.icon]

  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <section className="border-b border-[#d8d1c5] bg-[#101820] py-20 text-white md:py-24">
        <div className="container">
          <div className="max-w-4xl">
            <div className="site-eyebrow text-[#e05a62]">{t.nav.services}</div>
            <h1 className="mt-5">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{service.summary}</p>
            <Button asChild className="mt-9 h-12 rounded-none bg-[#b3262f] px-6 font-semibold text-white hover:bg-[#941f27]">
              <Link href="/contact">
                {t.cta.route}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="site-panel p-7">
              <Icon className="h-8 w-8 text-[#b3262f]" />
              <h2 className="mt-6 text-3xl">{t.detail.overview}</h2>
              <p className="mt-4">{service.short}</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-3">
              {service.bullets.map((bullet) => (
                <div key={bullet} className="bg-[#fbfaf7] p-5">
                  <Check className="h-5 w-5 text-[#b3262f]" />
                  <div className="mt-5 font-semibold text-[#101820]">{bullet}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section route-grid border-y border-[#d8d1c5] bg-[#efe8dc]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="site-eyebrow">{t.detail.scenarios}</div>
              <h2 className="mt-4">{t.detail.scenarios}</h2>
            </div>
            <div className="grid gap-3">
              {service.scenarios.map((scenario) => (
                <div key={scenario} className="border border-[#d8d1c5] bg-[#fbfaf7] p-4 font-semibold text-[#101820]">
                  {scenario}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container max-w-4xl">
          <div className="site-eyebrow">{t.detail.faq}</div>
          <h2 className="mt-4">{t.detail.faq}</h2>
          <Accordion type="single" collapsible className="mt-8 border-t border-[#d8d1c5]">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-[#d8d1c5]">
                <AccordionTrigger className="text-left text-base font-semibold text-[#101820] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#5b6266]">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}
