"use client"

import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSelector, LanguageSelectorCompact } from "./language-selector"
import { useLanguage } from "./language-selector"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentLanguage } = useLanguage()

  // Simple translations for navigation
  const translations = {
    zh: { home: '首页', services: '服务', regions: '区域', about: '关于我们', network: '全球网络', contact: '联系我们', getQuote: '获取报价', siteName: '丰吉国际' },
    en: { home: 'Home', services: 'Services', regions: 'Regions', about: 'About', network: 'Network', contact: 'Contact', getQuote: 'Get Quote', siteName: 'LandSea Int.' },
    ru: { home: 'Главная', services: 'Услуги', regions: 'Регионы', about: 'О нас', network: 'Сеть', contact: 'Контакты', getQuote: 'Получить предложение', siteName: 'ЛэндСи Инт.' },
    uz: { home: 'Asosiy', services: 'Xizmatlar', regions: 'Hududlar', about: 'Biz haqimizda', network: 'Tarmoq', contact: 'Aloqa', getQuote: 'Taklif olish', siteName: 'LandSea Int.' }
  }

  const t = translations[currentLanguage.code as keyof typeof translations]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="group flex items-center transition-transform duration-300 hover:scale-105">
              <div className="h-12 w-12 rounded-2xl mr-3 overflow-hidden">
                <Image src="/brand-mark.svg" alt="丰吉国际品牌标识" width={48} height={48} priority />
              </div>
              <div>
                <span className={`font-bold text-xl transition-colors duration-300 block ${scrolled ? "text-gray-900" : "text-white"
                  }`}>{t.siteName}</span>
                <span className={`text-xs transition-colors duration-300 ${scrolled ? "text-blue-600" : "text-blue-100"
                  }`}>LandSea</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Primary">
              {[
                { href: "/", key: "home" },
                { href: "/news", key: "services" }, // repurposing Services link temporarily for News CMS before renaming
                { href: "/#", key: "regions" },
                { href: "/#", key: "about" },
                { href: "/#", key: "network" },
                { href: "/#contact", key: "contact" }
              ].map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`group relative px-4 py-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${scrolled
                    ? "text-[#0f1c2d] hover:text-[#e3000f] focus-visible:ring-offset-white"
                    : "text-white/90 hover:text-white focus-visible:ring-offset-[#0f1c2d]"
                    }`}
                >
                  <span className="relative z-10">{t[item.key as keyof typeof t]}</span>
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#e3000f] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSelector className={
                scrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              } />
              <Button
                className={`bg-[#0f1c2d] hover:bg-[#e3000f] text-white px-6 py-2.5 rounded-sm font-medium transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
              >
                {t.getQuote}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <LanguageSelectorCompact className={
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              } />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className={`relative p-2 rounded-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${scrolled
                  ? "text-[#0f1c2d] hover:bg-gray-100 focus-visible:ring-offset-white"
                  : "text-white hover:bg-white/10 focus-visible:ring-offset-[#0f1c2d]"
                  }`}
              >
                <div className={`w-6 h-6 relative transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""
                  }`}>
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${isMenuOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${isMenuOpen ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="h-full flex flex-col">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-xl overflow-hidden mr-3">
                  <Image src="/brand-mark.svg" alt="丰吉国际品牌标识" width={40} height={40} />
                </div>
                <div>
                  <span className="font-bold text-lg text-gray-900">{t.siteName}</span>
                  <div className="text-xs text-blue-600">LandSea</div>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 p-6 space-y-2" aria-label="Mobile">
              {[
                { href: "/", key: "home" },
                { href: "/news", key: "services" },
                { href: "/#", key: "regions" },
                { href: "/#", key: "about" },
                { href: "/#", key: "network" },
                { href: "/#contact", key: "contact" }
              ].map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center justify-between p-4 rounded-none text-[#0f1c2d] hover:bg-gray-50 hover:text-[#e3000f] transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1c2d] focus-visible:ring-offset-2 focus-visible:ring-offset-white border-l-4 border-transparent hover:border-[#e3000f]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div>
                    <div className="font-medium">{t[item.key as keyof typeof t]}</div>
                    <div className="text-sm text-gray-400 capitalize">{item.key}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#e3000f] transition-transform duration-300 -rotate-90" />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="p-6 border-t border-gray-100">
              <Button
                className="w-full bg-[#0f1c2d] hover:bg-[#e3000f] text-white py-3 rounded-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1c2d] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.getQuote}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

