"use client"

import { Menu, Phone, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSelector, LanguageSelectorCompact, useLanguage } from "@/components/language-selector"

const copy = {
  zh: {
    brand: "丰吉国际",
    descriptor: "International Supply Chain",
    quote: "获取方案",
    call: "联系顾问",
    nav: [
      { href: "/", label: "首页" },
      { href: "/services", label: "服务" },
      { href: "/regions", label: "网络" },
      { href: "/about", label: "关于" },
      { href: "/news", label: "洞察" },
      { href: "/#contact", label: "联系" },
    ],
  },
  en: {
    brand: "LandSea",
    descriptor: "International Supply Chain",
    quote: "Get a Quote",
    call: "Talk to an Advisor",
    nav: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/regions", label: "Network" },
      { href: "/about", label: "About" },
      { href: "/news", label: "Insights" },
      { href: "/#contact", label: "Contact" },
    ],
  },
} as const

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { currentLanguage } = useLanguage()
  const t = currentLanguage.code === "zh" ? copy.zh : copy.en

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const shellClass = scrolled || isMenuOpen
    ? "border-b border-slate-200/80 bg-white/95 text-slate-950 shadow-sm backdrop-blur"
    : "border-b border-white/10 bg-slate-950/25 text-white backdrop-blur-sm"

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${shellClass}`}>
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200">
                <Image src="/brand-mark.svg" alt="LandSea brand mark" width={34} height={34} priority />
              </span>
              <span className="leading-tight">
                <span className="block text-base font-semibold tracking-wide">{t.brand}</span>
                <span className={scrolled || isMenuOpen ? "block text-xs text-slate-500" : "block text-xs text-white/70"}>
                  {t.descriptor}
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
              {t.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive(item.href)
                      ? scrolled
                        ? "bg-slate-950 text-white"
                        : "bg-white text-slate-950"
                      : scrolled
                        ? "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <LanguageSelector
                className={scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}
              />
              <Button asChild className="rounded-full bg-[#c91f28] px-5 font-semibold text-white hover:bg-[#a71921]">
                <Link href="/#contact">
                  <Phone className="mr-2 h-4 w-4" />
                  {t.quote}
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSelectorCompact
                className={scrolled || isMenuOpen ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}
              />
              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setIsMenuOpen((value) => !value)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  scrolled || isMenuOpen ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
                }`}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[min(88vw,360px)] bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <Image src="/brand-mark.svg" alt="LandSea brand mark" width={36} height={36} />
              <div>
                <div className="font-semibold text-slate-950">{t.brand}</div>
                <div className="text-xs text-slate-500">{t.descriptor}</div>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-7 flex flex-col gap-2" aria-label="Mobile navigation">
            {t.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-base font-medium ${
                  isActive(item.href)
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild className="mt-auto rounded-full bg-[#c91f28] py-6 font-semibold text-white hover:bg-[#a71921]">
            <Link href="/#contact">{t.call}</Link>
          </Button>
        </div>
      </aside>
    </>
  )
}
