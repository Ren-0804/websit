"use client"

import { Menu, Phone, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { LanguageSelector, LanguageSelectorCompact, useLanguage } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { contact, getCopy } from "@/lib/i18n"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/regions", label: t.nav.regions },
    { href: "/about", label: t.nav.about },
    { href: "/news", label: t.nav.news },
    { href: "/contact", label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => setIsMenuOpen(false), [pathname])

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
  const darkMode = !scrolled && !isMenuOpen && pathname === "/"

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${darkMode ? "border-white/10 bg-[#101820]/55 text-white backdrop-blur-md" : "border-[#d8d1c5] bg-[#f7f2e8]/95 text-[#101820] shadow-sm backdrop-blur-md"}`}>
        <div className="container">
          <div className="flex h-[4.5rem] items-center justify-between gap-4 py-4 md:h-20">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center border border-[#d8d1c5] bg-white">
                <Image src="/brand-mark.svg" alt="丰吉国际标识" width={30} height={30} priority />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-sm font-semibold md:text-base">{t.brand}</span>
                <span className={`block truncate text-[11px] uppercase tracking-[0.18em] ${darkMode ? "text-white/60" : "text-[#6d7478]"}`}>{t.descriptor}</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-medium transition ${isActive(item.href) ? darkMode ? "text-white underline decoration-[#c5313b] decoration-2 underline-offset-8" : "text-[#101820] underline decoration-[#b3262f] decoration-2 underline-offset-8" : darkMode ? "text-white/70 hover:text-white" : "text-[#5b6266] hover:text-[#101820]"}`}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <LanguageSelector className={darkMode ? "text-white hover:bg-white/10" : "text-[#101820] hover:bg-[#ebe3d5]"} />
              <Button asChild className="h-10 rounded-none bg-[#b3262f] px-4 text-sm font-semibold text-white hover:bg-[#941f27]">
                <Link href="/contact"><Phone className="mr-2 h-4 w-4" />{t.cta.route}</Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSelectorCompact className={darkMode ? "text-white hover:bg-white/10" : "text-[#101820] hover:bg-[#ebe3d5]"} />
              <button type="button" aria-label="Toggle navigation" onClick={() => setIsMenuOpen((value) => !value)} className={`flex h-10 w-10 items-center justify-center border transition ${darkMode ? "border-white/15 text-white hover:bg-white/10" : "border-[#d8d1c5] text-[#101820] hover:bg-[#ebe3d5]"}`}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-[#101820]/45 backdrop-blur-sm transition lg:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setIsMenuOpen(false)} />

      <aside className={`fixed right-0 top-0 z-50 h-full w-[min(88vw,360px)] border-l border-[#d8d1c5] bg-[#f7f2e8] shadow-2xl transition-transform duration-300 lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between border-b border-[#d8d1c5] pb-5">
            <div className="flex items-center gap-3">
              <Image src="/brand-mark.svg" alt="丰吉国际标识" width={34} height={34} />
              <div><div className="font-semibold text-[#101820]">{t.brand}</div><div className="text-xs uppercase tracking-[0.16em] text-[#6d7478]">{t.descriptor}</div></div>
            </div>
            <button type="button" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)} className="flex h-10 w-10 items-center justify-center border border-[#d8d1c5] text-[#5b6266] hover:bg-[#ebe3d5] hover:text-[#101820]"><X className="h-5 w-5" /></button>
          </div>

          <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
            {nav.map((item) => <Link key={item.href} href={item.href} className={`border-b border-[#d8d1c5] py-4 text-lg font-semibold ${isActive(item.href) ? "text-[#b3262f]" : "text-[#101820]"}`}>{item.label}</Link>)}
          </nav>

          <div className="mt-auto border-t border-[#d8d1c5] pt-5 text-sm text-[#5b6266]">
            <a href={`tel:${contact.phoneHref}`} className="font-semibold text-[#101820]">{contact.phone}</a>
            <Button asChild className="mt-4 h-11 w-full rounded-none bg-[#b3262f] font-semibold text-white hover:bg-[#941f27]"><Link href="/contact">{t.cta.contact}</Link></Button>
          </div>
        </div>
      </aside>
    </>
  )
}
