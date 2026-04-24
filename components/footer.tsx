"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"

const copy = {
  zh: {
    company: "丰吉国际供应链管理（江苏）有限公司",
    line: "连接中国、中亚和欧洲的跨境物流伙伴。",
    columns: {
      company: "公司",
      services: "服务",
      contact: "联系",
    },
    links: [
      { href: "/", label: "首页" },
      { href: "/services", label: "服务能力" },
      { href: "/regions", label: "网络覆盖" },
      { href: "/about", label: "关于我们" },
      { href: "/news", label: "新闻洞察" },
    ],
    services: ["中亚铁路班列", "跨境多式联运", "清关与仓储", "供应链咨询"],
    address: "江苏连云港阳光国际大厦 C 座 2403",
    rights: "保留所有权利",
  },
  en: {
    company: "LandSea International Supply Chain Management",
    line: "A cross-border logistics partner for China, Central Asia, and Europe.",
    columns: {
      company: "Company",
      services: "Services",
      contact: "Contact",
    },
    links: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/regions", label: "Network" },
      { href: "/about", label: "About" },
      { href: "/news", label: "Insights" },
    ],
    services: ["Central Asia block train", "Cross-border multimodal", "Customs and warehousing", "Supply chain advisory"],
    address: "Room 2403, Building C, Sunshine International, Lianyungang, Jiangsu",
    rights: "All rights reserved",
  },
} as const

export default function Footer() {
  const { currentLanguage } = useLanguage()
  const t = currentLanguage.code === "zh" ? copy.zh : copy.en

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="container">
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white">
                <Image src="/brand-mark.svg" alt="LandSea brand mark" width={34} height={34} />
              </span>
              <div>
                <div className="font-semibold tracking-wide">{t.company}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">LandSea</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">{t.line}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t.columns.company}</h2>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Footer company links">
              {t.links.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-slate-400 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t.columns.services}</h2>
            <div className="mt-5 flex flex-col gap-3">
              {t.services.map((item) => (
                <Link key={item} href="/services" className="text-sm text-slate-400 hover:text-white">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t.columns.contact}</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-400">
              <a href="tel:+8617374932331" className="flex gap-3 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 text-[#e44b52]" />
                +86 173 7493 2331
              </a>
              <a href="mailto:renyizheng@landsea.cc" className="flex gap-3 hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 text-[#e44b52]" />
                renyizheng@landsea.cc
              </a>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-[#e44b52]" />
                <span>{t.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {t.company}. {t.rights}.
          </p>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-slate-300">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
