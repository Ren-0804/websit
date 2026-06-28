"use client"

import { ArrowRight, Check, FileCheck2, Route, ShieldCheck, Train, Warehouse } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { getCopy } from "@/lib/i18n"

const iconMap = { train: Train, route: Route, warehouse: Warehouse }

export default function ServicesClient() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const riskLabel = { en: "Risk control", zh: "风险控制", ru: "Контроль рисков", uz: "Xavf nazorati" }[currentLanguage.code]

  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <section className="relative overflow-hidden border-b border-[#d8d1c5] bg-[#101820] py-20 text-white md:py-24">
        <Image src="/service-1.jpg" alt="Rail freight containers" fill className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-[#101820]/80" />
        <div className="container relative">
          <div className="max-w-4xl"><div className="site-eyebrow text-[#e05a62]">{t.nav.services}</div><h1 className="mt-5">{t.pages.servicesTitle}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{t.pages.servicesIntro}</p><Button asChild className="mt-9 h-12 rounded-none bg-[#b3262f] px-6 text-base font-semibold text-white hover:bg-[#941f27]"><Link href="/contact">{t.cta.route}<ArrowRight className="h-4 w-4" /></Link></Button></div>
        </div>
      </section>
      <section className="site-section"><div className="container"><div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] lg:grid-cols-3">{t.services.map((service) => { const Icon = iconMap[service.icon]; return <article key={service.slug} className="bg-[#fbfaf7] p-7"><Icon className="h-8 w-8 text-[#b3262f]" /><h2 className="mt-8 text-2xl font-semibold text-[#101820]">{service.title}</h2><p className="mt-4 text-sm leading-7 text-[#5b6266]">{service.summary}</p><div className="mt-7 space-y-3">{service.bullets.map((point) => <div key={point} className="flex gap-3 text-sm text-[#30383d]"><Check className="mt-0.5 h-4 w-4 flex-none text-[#b3262f]" />{point}</div>)}</div><Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center text-sm font-semibold text-[#b3262f]">{t.cta.services}<ArrowRight className="ml-2 h-4 w-4" /></Link></article> })}</div></div></section>
      <section className="site-section route-grid border-y border-[#d8d1c5] bg-[#efe8dc]"><div className="container"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div className="industrial-rule"><div className="site-eyebrow">{t.pages.processTitle}</div><h2 className="mt-4">{t.pages.processTitle}</h2><p className="mt-5">{t.home.servicesIntro}</p></div><div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-2">{t.pages.process.map((step, index) => <div key={step} className="grid grid-cols-[auto_1fr] gap-4 bg-[#fbfaf7] p-5"><div className="text-sm font-semibold text-[#b3262f]">{String(index + 1).padStart(2, "0")}</div><div className="font-semibold text-[#101820]">{step}</div></div>)}</div></div></div></section>
      <section className="site-section"><div className="container"><div className="grid gap-4 md:grid-cols-3">{[{ icon: FileCheck2, label: t.detail.execution }, { icon: ShieldCheck, label: riskLabel }, { icon: Warehouse, label: t.services[2].title }].map(({ icon: Icon, label }) => <div key={label} className="border border-[#d8d1c5] bg-[#fbfaf7] p-6"><Icon className="h-6 w-6 text-[#b3262f]" /><div className="mt-5 text-lg font-semibold text-[#101820]">{label}</div></div>)}</div></div></section>
    </main>
  )
}
