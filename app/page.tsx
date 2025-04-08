"use client"

import { ArrowRight, ChevronRight, Globe, MapPin, Truck, Phone, Mail, Container, Train, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-selector"

// Translations for key elements
const translations = {
  zh: {
    hero: {
      title: "丰吉国际",
      subtitle: "连接全球市场，畅通供应链管理和国际物流解决方案",
      services: "我们的服务",
      contact: "联系我们",
    },
    services: {
      title: "综合物流解决方案",
      subtitle: "我们提供连接亚洲与欧洲、中亚及其他地区的端到端供应链管理服务，高效可靠。",
      blocktrain: "国际班列",
      container: "集装箱运输",
      consulting: "供应链咨询",
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
      title: "Fengji International",
      subtitle: "Connecting global markets with seamless supply chain management and international logistics solutions",
      services: "Our Services",
      contact: "Contact Us",
    },
    services: {
      title: "Comprehensive Logistics Solutions",
      subtitle:
        "We provide end-to-end supply chain management services connecting Asia with Europe, Central Asia, and beyond with efficiency and reliability.",
      blocktrain: "International Blocktrain",
      container: "Container Transport",
      consulting: "Supply Chain Consulting",
    },
    network: {
      title: "Strategic Presence Worldwide",
      subtitle:
        "With offices strategically located across key logistics hubs, we provide seamless service across continents.",
    },
    contact: {
      title: "Contact Us",
      subtitle:
        "Get in touch with our team to discuss your international logistics needs and discover how we can help optimize your supply chain.",
    },
  },
  uz: {
    hero: {
      title: "Fengji International",
      subtitle: "Global bozorlarni uzluksiz ta'minot zanjiri boshqaruvi va xalqaro logistika yechimlari bilan bog'lash",
      services: "Bizning xizmatlar",
      contact: "Biz bilan bog'laning",
    },
    services: {
      title: "Keng qamrovli logistika yechimlari",
      subtitle:
        "Biz Osiyoni Yevropa, Markaziy Osiyo va undan tashqari hududlar bilan bog'lovchi samarali va ishonchli ta'minot zanjiri boshqaruvi xizmatlarini taqdim etamiz.",
      blocktrain: "Xalqaro bloktreyn",
      container: "Konteyner transporti",
      consulting: "Ta'minot zanjiri konsaltingi",
    },
    network: {
      title: "Dunyo bo'ylab strategik mavjudlik",
      subtitle:
        "Asosiy logistika markazlarida strategik joylashgan ofislarimiz bilan biz qit'alar bo'ylab uzluksiz xizmat ko'rsatamiz.",
    },
    contact: {
      title: "Biz bilan bog'laning",
      subtitle:
        "Xalqaro logistika ehtiyojlaringizni muhokama qilish va ta'minot zanjiringizni optimallashtirishda qanday yordam bera olishimizni bilish uchun jamoamiz bilan bog'laning.",
    },
  },
  ru: {
    hero: {
      title: "Fengji International",
      subtitle:
        "Соединяем глобальные рынки с бесперебойным управлением цепочками поставок и международными логистическими решениями",
      services: "Наши услуги",
      contact: "Связаться с нами",
    },
    services: {
      title: "Комплексные логистические решения",
      subtitle:
        "Мы предоставляем комплексные услуги по управлению цепочками поставок, соединяющие Азию с Европой, Центральной Азией и другими регионами, эффективно и надежно.",
      blocktrain: "Международный блок-поезд",
      container: "Контейнерные перевозки",
      consulting: "Консалтинг по цепочкам поставок",
    },
    network: {
      title: "Стратегическое присутствие по всему миру",
      subtitle:
        "Благодаря стратегически расположенным офисам в ключевых логистических центрах, мы обеспечиваем бесперебойное обслуживание на разных континентах.",
    },
    contact: {
      title: "Связаться с нами",
      subtitle:
        "Свяжитесь с нашей командой, чтобы обсудить ваши потребности в международной логистике и узнать, как мы можем помочь оптимизировать вашу цепочку поставок.",
    },
  },
}

export default function Home() {
  const { currentLanguage } = useLanguage()
  const t = translations[currentLanguage.code as keyof typeof translations] || translations.en

  return (
    <main className="min-h-screen">
      {/* Hero Section with Logistics Background */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/logistics-background.jpg"
            alt="International logistics and rail freight"
            fill
            className="object-cover"
            priority
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
              <span className="mr-2">International Blocktrain Services</span>
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
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                {t.hero.services} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                {t.hero.contact}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-white hover:bg-white/20 transition duration-300">
              <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Train className="h-6 w-6 text-blue-100" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.services.blocktrain}</h3>
              <p className="text-blue-100 text-sm">
                Specialized rail transport connecting China with Europe, Central Asia and Russia
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-white hover:bg-white/20 transition duration-300">
              <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Container className="h-6 w-6 text-blue-100" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.services.container}</h3>
              <p className="text-blue-100 text-sm">
                Efficient container transport solutions for your international cargo needs
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-white hover:bg-white/20 transition duration-300">
              <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-100" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Network</h3>
              <p className="text-blue-100 text-sm">Strategic presence across key logistics hubs in Asia and beyond</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
              <Truck className="h-4 w-4 mr-2" />
              {t.hero.services}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.services.title}</h2>
            <p className="text-gray-600">{t.services.subtitle}</p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-xl">
              <div className="h-2 bg-blue-600 w-full"></div>
              <div className="h-48 relative">
                <Image src="/service-blocktrain.jpg" alt="International Blocktrain" fill className="object-cover rounded-t-xl" />
              </div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white">
                  <Train className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.services.blocktrain}</h3>
                <p className="text-gray-600 mb-6">
                  Specialized rail transport services connecting China with Europe, Central Asia and Russia with regular
                  scheduled departures.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Regular scheduled routes", "Customs clearance", "Door-to-door delivery"].map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="mr-3 mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="h-2 bg-blue-600 w-full"></div>
              <div className="h-48 relative">
                <Image src="/service-container.jpg" alt="Container Transport" fill className="object-cover" />
              </div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white">
                  <Container className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.services.container}</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive container solutions connecting Southeast Asia, Japan, South Korea with Central Asia and
                  Europe.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Multimodal transportation", "Route optimization", "Real-time tracking"].map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="mr-3 mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="h-2 bg-blue-600 w-full"></div>
              <div className="h-48 relative">
                <Image src="/service-consulting.jpg" alt="Supply Chain Consulting" fill className="object-cover" />
              </div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.services.consulting}</h3>
                <p className="text-gray-600 mb-6">
                  Expert consulting services to optimize your international supply chain operations and logistics.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Supply chain optimization", "Logistics planning", "Cost reduction strategies"].map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="mr-3 mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
              <Globe className="h-4 w-4 mr-2" />
              Global Network
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
                      />

                      {/* Map dots */}
                      {[
                        { name: "塔什干", left: "30%", top: "40%" },
                        { name: "撒马尔罕", left: "32%", top: "42%" },
                        { name: "阿拉木图", left: "35%", top: "38%" },
                        { name: "连云港", left: "70%", top: "40%" },
                        { name: "西安", left: "65%", top: "42%" },
                        { name: "义乌", left: "72%", top: "45%" },
                        { name: "青岛", left: "73%", top: "38%" },
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
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
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

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Your message..."
                      ></textarea>
                    </div>

                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      Send Message
                    </Button>

                    <p className="text-sm text-gray-500 text-center">We'll get back to you within 24 hours</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

