"use client"

import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSelector, LanguageSelectorCompact } from "./language-selector"
import { useLanguage } from "./language-selector"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentLanguage } = useLanguage()

  // Simple translations for navigation
  const translations = {
    zh: { home: '首页', services: '服务', about: '关于我们', network: '全球网络', contact: '联系我们', getQuote: '获取报价' },
    en: { home: 'Home', services: 'Services', about: 'About', network: 'Network', contact: 'Contact', getQuote: 'Get Quote' },
    ru: { home: 'Главная', services: 'Услуги', about: 'О нас', network: 'Сеть', contact: 'Контакты', getQuote: 'Получить предложение' },
    uz: { home: 'Asosiy', services: 'Xizmatlar', about: 'Biz haqimizda', network: 'Tarmoq', contact: 'Aloqa', getQuote: 'Taklif olish' }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="group flex items-center transition-transform duration-300 hover:scale-105">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mr-3 transition-all duration-500 ${
                scrolled
                  ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/25"
                  : "bg-white/20 backdrop-blur-md border border-white/30 shadow-xl"
              }`}>
                <div className={`font-bold text-2xl transition-colors duration-300 ${
                  scrolled ? "text-white" : "text-white"
                }`}>丰</div>
              </div>
              <div>
                <span className={`font-bold text-xl transition-colors duration-300 block ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}>丰吉国际</span>
                <span className={`text-xs transition-colors duration-300 ${
                  scrolled ? "text-blue-600" : "text-blue-100"
                }`}>LandSea</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { href: "/", key: "home" },
                { href: "/services", key: "services" },
                { href: "/about", key: "about" },
                { href: "/network", key: "network" },
                { href: "/contact", key: "contact" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    scrolled
                      ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10">{t[item.key as keyof typeof t]}</span>
                  <div className="absolute inset-0 rounded-xl bg-blue-600/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSelector />
              <Button
                className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105`}
              >
                {t.getQuote}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <LanguageSelectorCompact />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <div className={`w-6 h-6 relative transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : ""
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
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
        isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isMenuOpen ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="h-full flex flex-col">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3">
                  <div className="text-white font-bold text-lg">丰</div>
                </div>
                <div>
                  <span className="font-bold text-lg text-gray-900">丰吉国际</span>
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
            <nav className="flex-1 p-6 space-y-2">
              {[
                { href: "/", key: "home" },
                { href: "/services", key: "services" },
                { href: "/about", key: "about" },
                { href: "/network", key: "network" },
                { href: "/contact", key: "contact" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between p-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div>
                    <div className="font-medium">{t[item.key as keyof typeof t]}</div>
                    <div className="text-sm text-gray-500 capitalize">{item.key}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform duration-300 rotate-270" />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="p-6 border-t border-gray-100">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium shadow-lg"
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

