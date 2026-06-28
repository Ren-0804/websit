"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { useLanguage } from "@/components/language-selector"
import { contact, getCopy } from "@/lib/i18n"

export default function ContactClient() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  return (
    <main className="min-h-screen bg-[#f7f2e8] pt-20 text-[#101820]">
      <section className="border-b border-[#d8d1c5] bg-[#101820] py-20 text-white md:py-24"><div className="container"><div className="max-w-4xl"><div className="site-eyebrow text-[#e05a62]">{t.nav.contact}</div><h1 className="mt-5">{t.pages.contactTitle}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{t.pages.contactIntro}</p></div></div></section>
      <section className="site-section"><div className="container"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div className="space-y-4"><a href={`tel:${contact.phoneHref}`} className="flex gap-4 border border-[#d8d1c5] bg-[#fbfaf7] p-5 font-semibold text-[#101820] hover:bg-white"><Phone className="mt-0.5 h-5 w-5 text-[#b3262f]" />{contact.phone}</a><a href={`mailto:${contact.email}`} className="flex gap-4 border border-[#d8d1c5] bg-[#fbfaf7] p-5 font-semibold text-[#101820] hover:bg-white"><Mail className="mt-0.5 h-5 w-5 text-[#b3262f]" />{contact.email}</a><div className="flex gap-4 border border-[#d8d1c5] bg-[#fbfaf7] p-5 text-[#5b6266]"><MapPin className="mt-0.5 h-5 w-5 flex-none text-[#b3262f]" />{currentLanguage.code === "zh" ? contact.addressZh : contact.addressEn}</div></div><div className="border border-[#d8d1c5] bg-[#fbfaf7] p-5 md:p-8"><ContactForm /></div></div></div></section>
    </main>
  )
}
