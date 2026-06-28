"use client"

import { ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"
import { getCopy } from "@/lib/i18n"

export default function RegionsClient() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <section className="border-b border-[#d8d1c5] bg-[#101820] py-20 text-white md:py-24"><div className="container"><div className="max-w-4xl"><div className="site-eyebrow text-[#e05a62]">{t.nav.regions}</div><h1 className="mt-5">{t.pages.regionsTitle}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{t.pages.regionsIntro}</p></div></div></section>
      <section className="site-section route-grid"><div className="container"><div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-2 lg:grid-cols-3">{t.cities.map((city) => <Link key={city.slug} href={`/regions/${city.slug}`} className="group bg-[#fbfaf7] p-6 transition hover:bg-white"><MapPin className="h-6 w-6 text-[#b3262f]" /><div className="mt-7 flex items-start justify-between gap-4"><div><h2 className="text-2xl font-semibold text-[#101820]">{city.name}</h2><div className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-[#6d7478]">{city.country}</div></div><div className="text-right text-sm font-semibold text-[#b3262f]">{city.time}</div></div><p className="mt-5 text-sm leading-7 text-[#5b6266]">{city.summary}</p><span className="mt-7 inline-flex items-center text-sm font-semibold text-[#101820]">{t.cta.read}<ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>
    </main>
  )
}
