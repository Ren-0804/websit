"use client"

import { Check, MapPinned, ShieldCheck, Waypoints } from "lucide-react"
import { useLanguage } from "@/components/language-selector"
import { getCopy } from "@/lib/i18n"

export default function AboutClient() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const points = [{ icon: Waypoints, title: t.detail.routeLabel, text: t.home.networkIntro }, { icon: ShieldCheck, title: t.detail.execution, text: t.home.servicesIntro }, { icon: MapPinned, title: t.nav.regions, text: t.pages.regionsIntro }]
  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <section className="border-b border-[#d8d1c5] bg-[#101820] py-20 text-white md:py-24"><div className="container"><div className="max-w-4xl"><div className="site-eyebrow text-[#e05a62]">{t.nav.about}</div><h1 className="mt-5">{t.pages.aboutTitle}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{t.pages.aboutIntro}</p></div></div></section>
      <section className="site-section"><div className="container"><div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-3">{points.map(({ icon: Icon, title, text }) => <article key={title} className="bg-[#fbfaf7] p-7"><Icon className="h-7 w-7 text-[#b3262f]" /><h2 className="mt-7 text-2xl font-semibold text-[#101820]">{title}</h2><p className="mt-4 text-sm leading-7 text-[#5b6266]">{text}</p></article>)}</div></div></section>
      <section className="site-section route-grid border-y border-[#d8d1c5] bg-[#efe8dc]"><div className="container"><div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div className="industrial-rule"><div className="site-eyebrow">{t.nav.services}</div><h2 className="mt-4">{t.pages.servicesTitle}</h2></div><div className="grid gap-4">{t.home.proof.map((item) => <div key={item} className="flex gap-3 border border-[#d8d1c5] bg-[#fbfaf7] p-4 text-sm font-semibold text-[#101820]"><Check className="mt-0.5 h-4 w-4 flex-none text-[#b3262f]" />{item}</div>)}</div></div></div></section>
    </main>
  )
}
