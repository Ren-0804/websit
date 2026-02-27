"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-selector"

const translations = {
  zh: {
    company: "丰吉国际",
    slogan: "连接全球 · 畅通供应链",
    quickLinks: "快速链接",
    services: "我们的服务",
    contact: "联系方式",
    copyright: "丰吉国际。保留所有权利。",
    links: {
      home: "首页",
      services: "服务",
      about: "关于我们",
      network: "全球网络",
      contact: "联系我们"
    },
    serviceList: [
      "中亚班列",
      "过境运输",
      "供应链咨询",
      "清关服务",
      "仓储配送"
    ],
    address: [
      "江苏自由贸易试验区",
      "连云港片区阳光国际C座2403室"
    ],
    legal: {
      terms: "条款",
      privacy: "隐私",
      cookies: "Cookie"
    }
  },
  en: {
    company: "FENGJI INTERNATIONAL",
    slogan: "Global Connections · Smooth Supply Chain",
    quickLinks: "Quick Links",
    services: "Our Services",
    contact: "Contact Information",
    copyright: "Fengji International. All rights reserved.",
    links: {
      home: "Home",
      services: "Services",
      about: "About Us",
      network: "Network",
      contact: "Contact"
    },
    serviceList: [
      "International Blocktrain",
      "Transit Transport",
      "Supply Chain Consulting",
      "Customs Clearance",
      "Warehousing & Distribution"
    ],
    address: [
      "Room 2403, Building C, Sunshine International,",
      "Lianyungang District, China (Jiangsu)",
      "Pilot Free Trade Zone"
    ],
    legal: {
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies"
    }
  },
  ru: {
    company: "Фэнцзи Интернешнл",
    slogan: "Глобальные связи · Гладкая цепочка поставок",
    quickLinks: "Быстрые ссылки",
    services: "Наши услуги",
    contact: "Контакты",
    copyright: "Fengji International. Все права защищены.",
    links: {
      home: "Главная",
      services: "Услуги",
      about: "О нас",
      network: "Сеть",
      contact: "Контакты"
    },
    serviceList: [
      "Международный блок-поезд",
      "Транзитные перевозки",
      "Консалтинг по цепочке поставок",
      "Таможенное оформление",
      "Складирование и дистрибуция"
    ],
    address: [
      "Комната 2403, Здание C, Sunshine International,",
      "Район Ляньюньган, Китай (Цзянсу)",
      "Пилотная зона свободной торговли"
    ],
    legal: {
      terms: "Условия",
      privacy: "Конфиденциальность",
      cookies: "Cookies"
    }
  },
  uz: {
    company: "Fengji International",
    slogan: "Global aloqalar · Ravon ta'minot zanjiri",
    quickLinks: "Tezkor havolalar",
    services: "Bizning xizmatlar",
    contact: "Bog'lanish ma'lumotlari",
    copyright: "Fengji International. Barcha huquqlar himoyalangan.",
    links: {
      home: "Asosiy",
      services: "Xizmatlar",
      about: "Biz haqimizda",
      network: "Tarmoq",
      contact: "Aloqa"
    },
    serviceList: [
      "Xalqaro blok poyezdi",
      "Tranzit tashish",
      "Ta'minot zanjiri bo'yicha maslahat",
      "Bojxona rasmiylashtiruvi",
      "Ombor va tarqatish"
    ],
    address: [
      "Xona 2403, Bino C, Sunshine International,",
      "Lianyungang tumani, Xitoy (Jiangsu)",
      "Erkin savdo tajriba zonasi"
    ],
    legal: {
      terms: "Shartlar",
      privacy: "Maxfiylik",
      cookies: "Cookie"
    }
  }
} as const

export default function Footer() {
  const { currentLanguage } = useLanguage()
  const t = translations[currentLanguage.code as keyof typeof translations] || translations.en

  const navLinks = [
    { name: t.links.home, href: "/" },
    { name: t.links.services, href: "/news" }, // repurposed for CMS
    { name: t.links.about, href: "/#" },
    { name: t.links.network, href: "/#" },
    { name: t.links.contact, href: "/#contact" },
  ]

  return (
    <footer className="bg-[#0f1c2d]">
      <div className="container mx-auto px-4">
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-[#e3000f] flex items-center justify-center mr-3">
                <div className="text-white font-bold text-xl">丰</div>
              </div>
              <span className="text-white font-bold text-xl">{t.company}</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              FENGJI INTERNATIONAL SUPPLY CHAIN MANAGEMENT (JIANGSU) CO., LTD.
            </p>
            <p className="text-gray-400 text-sm">{t.slogan}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">{t.quickLinks}</h3>
            <nav aria-label="Quick Links">
              <ul className="space-y-4">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">{t.services}</h3>
            <nav aria-label="Services">
              <ul className="space-y-4">
                {t.serviceList.map((item) => (
                  <li key={item}>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">{t.contact}</h3>
            <ul className="space-y-4">
              <li className="flex">
                <Phone aria-hidden="true" className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a
                  href="tel:+8617374932331"
                  className="text-gray-400 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                >
                  +86 17374932331 (China/WeChat)
                </a>
              </li>
              <li className="flex">
                <Mail aria-hidden="true" className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:renyizheng@landsea.cc"
                  className="text-gray-400 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                >
                  renyizheng@landsea.cc
                </a>
              </li>
              <li className="flex">
                <MapPin aria-hidden="true" className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  {t.address.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {t.copyright}
            </p>
            <nav aria-label="Legal" className="flex space-x-6">
              {[t.legal.terms, t.legal.privacy, t.legal.cookies].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-gray-300 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
