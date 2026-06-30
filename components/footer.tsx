"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"
import { contact, getCopy } from "@/lib/i18n"

export default function Footer() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/regions", label: t.nav.regions },
    { href: "/about", label: t.nav.about },
    { href: "/news", label: t.nav.news },
  ]

  return (
    <footer className="border-t border-[#26313a] bg-[#101820] text-white">
      <div className="container">
        <div className="grid gap-10 py-14 md:grid-cols-[1.35fr_0.7fr_0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center bg-white">
                <Image src="/brand-mark.svg" alt="丰吉国际标识" width={34} height={34} />
              </span>
              <div>
                <div className="max-w-xs text-sm font-semibold md:text-base">{t.company}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">{t.englishName}</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">{t.footerLine}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{t.nav.about}</h2>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Footer links">
              {links.map((item) => <Link key={item.href} href={item.href} className="text-sm text-white/60 hover:text-white">{item.label}</Link>)}
            </nav>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{t.nav.services}</h2>
            <div className="mt-5 flex flex-col gap-3">
              {t.services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="text-sm text-white/60 hover:text-white">{service.title}</Link>)}
            </div>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{t.nav.contact}</h2>
            <div className="mt-5 space-y-4 text-sm text-white/60">
              <a href={`tel:${contact.phoneHref}`} className="flex gap-3 hover:text-white"><Phone className="mt-0.5 h-4 w-4 flex-none text-[#d84650]" />{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="flex gap-3 hover:text-white"><Mail className="mt-0.5 h-4 w-4 flex-none text-[#d84650]" />{contact.email}</a>
              <div className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 flex-none text-[#d84650]" /><span>{currentLanguage.code === "zh" ? contact.addressZh : contact.addressEn}</span></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {t.company}. {t.rights}.</p>
          <div className="flex gap-4"><Link href="/sitemap.xml" className="hover:text-white/70">Sitemap</Link><Link href="/robots.txt" className="hover:text-white/70">Robots</Link></div>
        </div>
      </div>
    </footer>
  )
}
