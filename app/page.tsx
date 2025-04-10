"use client"

import { ArrowRight, ChevronRight, Globe, MapPin, Truck, Phone, Mail, Container, Train, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-selector"
import Email from "smtpjs";
import { toast } from "@/components/ui/use-toast"; 
import { ContactForm } from "@/components/contact-form"

const translations = {
  zh: {
    hero: {
      title: "欢迎来到 LandSea",
      subtitle: "您值得信赖的国际运输合作伙伴",
      cta: "开始",
    },
    services: {
      title: "我们的服务",
      subtitle: "我们提供连接亚洲与欧洲、中亚及其他地区的端到端供应链管理服务，高效可靠。",
      items: [
        {
          title: "国际班列",
          description: "连接中国与欧洲、中亚和俄罗斯的专列运输服务，定期发车。",
          icon: "train",
        },
        {
          title: "集装箱运输",
          description: "连接东南亚、日本、韩国与中亚和欧洲的集装箱运输解决方案。",
          icon: "container",
        },
        {
          title: "供应链咨询",
          description: "优化国际供应链运营和物流的专业咨询服务。",
          icon: "consulting",
        },
      ],
    },
    network: {
      title: "全球战略布局",
      subtitle: "我们在关键物流枢纽战略性布局办事处，提供跨大陆的无缝服务。",
    },
    contact: {
      title: "联系我们",
      subtitle: "与我们的团队联系，讨论您的国际物流需求，了解我们如何帮助优化您的供应链。",
    },
  },
  en: {
    hero: {
      title: "Welcome to LandSea",
      subtitle: "Your Trusted Partner in International Transportation",
      cta: "Get Started",
    },
    services: {
      title: "Our Services",
      subtitle: "We provide end-to-end supply chain management services connecting Asia with Europe, Central Asia, and beyond with efficiency and reliability.",
      items: [
        {
          title: "International Blocktrain",
          description: "Specialized rail transport connecting China with Europe, Central Asia and Russia with regular scheduled departures.",
          icon: "train",
        },
        {
          title: "Container Transport",
          description: "Comprehensive container solutions connecting Southeast Asia, Japan, South Korea with Central Asia and Europe.",
          icon: "container",
        },
        {
          title: "Supply Chain Consulting",
          description: "Expert consulting services to optimize your international supply chain operations and logistics.",
          icon: "consulting",
        },
      ],
    },
    network: {
      title: "Strategic Presence Worldwide",
      subtitle: "With offices strategically located across key logistics hubs, we provide seamless service across continents.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team to discuss your international logistics needs and discover how we can help optimize your supply chain.",
    },
  },
  uz: {
    hero: {
      title: "LandSea ga xush kelibsiz",
      subtitle: "Xalqaro yuk tashishda ishonchli hamkoringiz",
      cta: "Boshlash",
    },
    services: {
      title: "Bizning xizmatlar",
      subtitle: "Biz Osiyoni Yevropa, Markaziy Osiyo va undan tashqari hududlar bilan bog'lovchi samarali va ishonchli ta'minot zanjiri boshqaruvi xizmatlarini taqdim etamiz.",
      items: [
        {
          title: "Xalqaro bloktreyn",
          description: "Xitoyni Yevropa, Markaziy Osiyo va Rossiya bilan bog'lovchi maxsus temir yo'l transporti, muntazam rejalashtirilgan jo'nashlar bilan.",
          icon: "train",
        },
        {
          title: "Konteyner transporti",
          description: "Janubiy Osiyo, Yaponiya, Janubiy Koreyani Markaziy Osiyo va Yevropa bilan bog'lovchi keng qamrovli konteyner yechimlari.",
          icon: "container",
        },
        {
          title: "Ta'minot zanjiri konsaltingi",
          description: "Xalqaro ta'minot zanjiri operatsiyalari va logistikasini optimallashtirish uchun mutaxassis konsalting xizmatlari.",
          icon: "consulting",
        },
      ],
    },
    network: {
      title: "Dunyo bo'ylab strategik mavjudlik",
      subtitle: "Asosiy logistika markazlarida strategik joylashgan ofislarimiz bilan biz qit'alar bo'ylab uzluksiz xizmat ko'rsatamiz.",
    },
    contact: {
      title: "Biz bilan bog'laning",
      subtitle: "Xalqaro logistika ehtiyojlaringizni muhokama qilish va ta'minot zanjiringizni optimallashtirishda qanday yordam bera olishimizni bilish uchun jamoamiz bilan bog'laning.",
    },
  },
  ru: {
    hero: {
      title: "Добро пожаловать в LandSea",
      subtitle: "Ваш надежный партнер в международных перевозках",
      cta: "Начать",
    },
    services: {
      title: "Наши услуги",
      subtitle: "Мы предоставляем комплексные услуги по управлению цепочками поставок, соединяющие Азию с Европой, Центральной Азией и другими регионами, эффективно и надежно.",
      items: [
        {
          title: "Международный блок-поезд",
          description: "Специализированные железнодорожные перевозки, соединяющие Китай с Европой, Центральной Азией и Россией, с регулярными отправлениями.",
          icon: "train",
        },
        {
          title: "Контейнерные перевозки",
          description: "Комплексные контейнерные решения, соединяющие Юго-Восточную Азию, Японию, Южную Корею с Центральной Азией и Европой.",
          icon: "container",
        },
        {
          title: "Консалтинг по цепочкам поставок",
          description: "Экспертные консультационные услуги по оптимизации международных операций цепочки поставок и логистики.",
          icon: "consulting",
        },
      ],
    },
    network: {
      title: "Стратегическое присутствие по всему миру",
      subtitle: "Благодаря стратегически расположенным офисам в ключевых логистических центрах, мы обеспечиваем бесперебойное обслуживание на разных континентах.",
    },
    contact: {
      title: "Связаться с нами",
      subtitle: "Свяжитесь с нашей командой, чтобы обсудить ваши потребности в международной логистике и узнать, как мы можем помочь оптимизировать вашу цепочку поставок.",
    },
  },
}

export default function Home() {
  const { currentLanguage } = useLanguage()
  const t = translations[currentLanguage.code as keyof typeof translations]

  // 结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LandSea",
    "url": "https://landsea.cc",
    "logo": "https://landsea.cc/placeholder-logo.png",
    "description": "LandSea提供专业的国际物流服务，包括中亚集装箱回程班列、跨境多式联运、清关仓储一体化等服务。",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room 2403, Building C, Sunshine International",
      "addressLocality": "Lianyungang",
      "addressRegion": "Jiangsu",
      "addressCountry": "CN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86 17374932331",
      "contactType": "customer service",
      "email": "renyizheng@landsea.cc",
      "availableLanguage": ["Chinese", "English", "Russian", "Uzbek"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/landsea",
      "https://twitter.com/landsea"
    ]
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section with Logistics Background */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/logistics-background.jpg"
            alt="International logistics and transportation network"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
        </div>

        {/* Animated train tracks */}
        <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden z-10">
          <div className="absolute inset-x-0 h-2 bg-white/20 bottom-0"></div>
          <div className="absolute inset-x-0 h-2 bg-white/20 bottom-4"></div>
          <div className="absolute inset-x-0 bottom-0 flex">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-8 w-8 border-l-2 border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium mb-6 border border-white/10">
              <Train className="h-3.5 w-3.5 mr-2" />
              <span className="mr-2">{t.services.items[0].title}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>

            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-blue-600 font-bold text-3xl">丰</div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{t.hero.title}</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t.hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                  {t.hero.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="mailto:renyizheng@landsea.cc">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  {t.contact.title}
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.services.items.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-white hover:bg-white/20 transition duration-300">
                <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {service.icon === "train" && <Train className="h-6 w-6 text-blue-100" />}
                  {service.icon === "container" && <Container className="h-6 w-6 text-blue-100" />}
                  {service.icon === "consulting" && <BarChart3 className="h-6 w-6 text-blue-100" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-blue-100 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
              <Truck className="h-4 w-4 mr-2" />
              {t.services.title}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.services.title}</h2>
            <p className="text-gray-600">{t.services.subtitle}</p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <div key={index} className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-xl">
                <div className="h-2 bg-blue-600 w-full"></div>
                <div className="h-48 relative">
                  <Image 
                    src={`/service-${index + 1}.jpg`} 
                    alt={service.title}
                    fill 
                    className="object-cover rounded-t-xl"
                    quality={90}
                  />
                </div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white">
                    {service.icon === "train" && <Train className="h-6 w-6 text-blue-600" />}
                    {service.icon === "container" && <Container className="h-6 w-6 text-blue-600" />}
                    {service.icon === "consulting" && <BarChart3 className="h-6 w-6 text-blue-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href="/services"
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      {t.hero.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
              <Globe className="h-4 w-4 mr-2" />
              {t.network.title}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.network.title}</h2>
            <p className="text-gray-600">{t.network.subtitle}</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative mb-16">
              <div className="aspect-[21/9] w-full bg-blue-50 rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600/5 to-blue-100/50 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src="/route-map.jpg"
                        alt="Global network map"
                        fill
                        className="object-cover opacity-30"
                        quality={90}
                      />

                      {/* Map dots */}
                      {[
                        { name: "塔什干", left: "45%", top: "35%" },
                        { name: "撒马尔罕", left: "48%", top: "38%" },
                        { name: "阿拉木图", left: "55%", top: "32%" },
                        { name: "连云港", left: "75%", top: "42%" },
                        { name: "西安", left: "70%", top: "45%" },
                        { name: "义乌", left: "78%", top: "48%" },
                        { name: "青岛", left: "80%", top: "40%" },
                      ].map((location) => (
                        <div
                          key={location.name}
                          className="absolute"
                          style={{ left: location.left, top: location.top }}
                        >
                          <div className="relative">
                            <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping"></div>
                            <div className="relative h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <div className="h-2 w-2 bg-white rounded-full"></div>
                            </div>
                            <div className="absolute mt-2 -ml-10 w-20 text-center">
                              <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow-sm text-blue-800">
                                {location.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 p-12 text-white">
                  <div className="h-12 w-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 mb-8">
                    <div className="text-white font-bold text-2xl">丰</div>
                  </div>

                  <h2 className="text-3xl font-bold mb-6">{t.contact.title}</h2>
                  <p className="text-blue-100 mb-12">{t.contact.subtitle}</p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mt-1 mr-4 h-8 w-8 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Phone / WeChat</p>
                        <p className="font-medium">+86 17374932331</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mt-1 mr-4 h-8 w-8 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Headquarters</p>
                        <p className="font-medium">Room 2403, Building C, Sunshine International</p>
                        <p className="text-sm text-blue-100">Lianyungang District, China (Jiangsu)</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mt-1 mr-4 h-8 w-8 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Email</p>
                        <p className="font-medium">renyizheng@landsea.cc</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 p-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.contact.title}</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

