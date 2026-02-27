"use client"

import { ArrowRight, ChevronRight, Globe, MapPin, Truck, Phone, Mail, Container, Train, BarChart3, Calendar } from "lucide-react"
import { format } from "date-fns"
import type { PostData } from "@/lib/markdown"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-selector"
import { ContactForm } from "@/components/contact-form"

export default function HomeClient({ recentPosts }: { recentPosts: PostData[] }) {
  const { currentLanguage } = useLanguage()

  const translations = {
    zh: {
      hero: {
        titleNormal: "丰吉",
        titleHighlight: "国际供应链管理有限公司",
        subtitle: "您值得信赖的国际运输合作伙伴",
        cta: "开始",
        contactUs: "联系我们"
      },
      services: {
        sectionTitleNormal: "我们的",
        sectionTitleHighlight: "服务",
        subtitle: "我们提供连接亚洲与欧洲、中亚及其他地区的端到端供应链管理服务，高效可靠。",
        items: [
          {
            title: "国际班列",
            description: "连接中国与欧洲、中亚和俄罗斯的专列运输服务，定期发车。",
            icon: "train"
          },
          {
            title: "集装箱运输",
            description: "连接东南亚、日本、韩国与中亚和欧洲的集装箱运输解决方案。",
            icon: "container"
          },
          {
            title: "供应链咨询",
            description: "优化国际供应链运营和物流的专业咨询服务。",
            icon: "consulting"
          }
        ],
        viewAll: "查看全部服务"
      },
      network: {
        titleNormal: "全球战略",
        titleHighlight: "布局网络",
        title: "全球战略布局", // keep for compatibility if needed elsewhere
        subtitle: "我们在关键物流枢纽战略性布局办事处，提供跨大陆的无缝服务。",
        mapLegend: {
          hub: "主要枢纽",
          station: "运营站点",
          route: "运输路线"
        },
        stats: {
          cities: "覆盖城市",
          countries: "运营国家",
          service: "全天候服务"
        }
      },
      news: {
        titleNormal: "最新",
        titleHighlight: "动态",
        subtitle: "了解丰吉国际的最新资讯、行业动态与货运进展。",
        readMore: "阅读全文",
        viewAll: "查看所有新闻"
      },
      contact: {
        title: "联系我们",
        titleNormal: "联系",
        titleHighlight: "我们",
        subtitle: "与我们的团队联系，讨论您的国际物流需求，了解我们如何帮助优化您的供应链。",
        contactNow: "立即联系",
        contactDesc: "我们的专业团队随时准备为您提供国际物流解决方案",
        phoneWechat: "电话 / 微信",
        address: "总部地址",
        addressValue: "中国江苏省连云港市",
        addressDetail: "阳光国际大厦C座2403室",
        email: "邮箱地址",
        businessHours: "营业时间",
        businessHoursValue: "周一至周日 24小时",
        sendMessage: "发送消息",
        formDesc: "填写下方表单，我们将在24小时内回复您",
        replyTime: "我们通常在2小时内回复",
        multiLang: "支持多语言服务",
        quick: {
          phone: "电话咨询",
          email: "邮件联系",
          sendEmail: "发送邮件",
          location: "江苏连云港"
        }
      }
    },
    en: {
      hero: {
        titleNormal: "LandSea",
        titleHighlight: "International Supply Chain Management",
        subtitle: "Your Trusted International Transport Partner",
        cta: "Get Started",
        contactUs: "Contact Us"
      },
      services: {
        sectionTitleNormal: "Our",
        sectionTitleHighlight: "Services",
        subtitle: "We provide efficient and reliable end-to-end supply chain management services connecting Asia with Europe, Central Asia and beyond.",
        items: [
          {
            title: "International Block Train",
            description: "Dedicated train services connecting China with Europe, Central Asia and Russia, with regular departures.",
            icon: "train"
          },
          {
            title: "Container Shipping",
            description: "Container shipping solutions connecting Southeast Asia, Japan, South Korea with Central Asia and Europe.",
            icon: "container"
          },
          {
            title: "Supply Chain Consulting",
            description: "Professional consulting services to optimize international supply chain operations and logistics.",
            icon: "consulting"
          }
        ],
        viewAll: "View All Services"
      },
      network: {
        titleNormal: "Global Strategic",
        titleHighlight: "Network",
        title: "Global Strategic Network",
        subtitle: "Strategically located offices in key logistics hubs providing seamless cross-continental services.",
        mapLegend: {
          hub: "Major Hubs",
          station: "Operational Sites",
          route: "Transport Routes"
        },
        stats: {
          cities: "Cities Covered",
          countries: "Countries",
          service: "24/7 Service"
        }
      },
      news: {
        titleNormal: "Latest",
        titleHighlight: "News",
        subtitle: "Stay updated with our latest logistics news, block train updates, and industry insights.",
        readMore: "Read More",
        viewAll: "View All News"
      },
      contact: {
        title: "Contact Us",
        titleNormal: "Contact",
        titleHighlight: "Us",
        subtitle: "Connect with our team to discuss your international logistics needs and how we can optimize your supply chain.",
        contactNow: "Contact Now",
        contactDesc: "Our professional team is ready to provide international logistics solutions.",
        phoneWechat: "Phone / WeChat",
        address: "Headquarters",
        addressValue: "Lianyungang, Jiangsu, China",
        addressDetail: "Room 2403, Building C, Sunshine International",
        email: "Email Address",
        businessHours: "Business Hours",
        businessHoursValue: "Mon-Sun 24 Hours",
        sendMessage: "Send Message",
        formDesc: "Fill out the form below, we will reply within 24 hours.",
        replyTime: "We usually reply within 2 hours",
        multiLang: "Multi-language Support",
        quick: {
          phone: "Phone Consultation",
          email: "Email Contact",
          sendEmail: "Send Email",
          location: "Lianyungang, CN"
        }
      }
    },
    ru: {
      hero: {
        titleNormal: "LandSea",
        titleHighlight: "International Supply Chain Management",
        subtitle: "Ваш надежный партнер в международных перевозках",
        cta: "Начать",
        contactUs: "Связаться"
      },
      services: {
        sectionTitleNormal: "Наши",
        sectionTitleHighlight: "Услуги",
        subtitle: "Мы предоставляем эффективные и надежные услуги по управлению цепочками поставок, соединяющие Азию с Европой и Центральной Азией.",
        items: [
          {
            title: "Контейнерные поезда",
            description: "Регулярные железнодорожные перевозки, соединяющие Китай с Европой, Центральной Азией и Россией.",
            icon: "train"
          },
          {
            title: "Контейнерные перевозки",
            description: "Решения по контейнерным перевозкам, соединяющие Юго-Восточную Азию, Японию, Корею с Центральной Азией и Европой.",
            icon: "container"
          },
          {
            title: "Логистический консалтинг",
            description: "Профессиональные консультационные услуги по оптимизации международных цепочек поставок и логистики.",
            icon: "consulting"
          }
        ],
        viewAll: "Все услуги"
      },
      network: {
        titleNormal: "Глобальная",
        titleHighlight: "Сеть",
        title: "Глобальная сеть",
        subtitle: "Стратегически расположенные офисы в ключевых логистических узлах для бесперебойных трансконтинентальных перевозок.",
        mapLegend: {
          hub: "Хабы",
          station: "Станции",
          route: "Маршруты"
        },
        stats: {
          cities: "Городов",
          countries: "Стран",
          service: "24/7 Сервис"
        }
      },
      news: {
        titleNormal: "Последние",
        titleHighlight: "Новости",
        subtitle: "Будьте в курсе последних новостей логистики и отрасли.",
        readMore: "Читать далее",
        viewAll: "Все новости"
      },
      contact: {
        title: "Контакты",
        titleNormal: "Свяжитесь с",
        titleHighlight: "Нами",
        subtitle: "Свяжитесь с нашей командой, чтобы обсудить ваши потребности в международной логистике.",
        contactNow: "Связаться сейчас",
        contactDesc: "Наша профессиональная команда готова предложить логистические решения.",
        phoneWechat: "Телефон / WeChat",
        address: "Адрес штаб-квартиры",
        addressValue: "Ляньюньган, Цзянсу, Китай",
        addressDetail: "Sunshine International, Корпус C, Офис 2403",
        email: "Электронная почта",
        businessHours: "Часы работы",
        businessHoursValue: "Пн-Вс 24 часа",
        sendMessage: "Отправить сообщение",
        formDesc: "Заполните форму ниже, мы ответим в течение 24 часов.",
        replyTime: "Обычно отвечаем за 2 часа",
        multiLang: "Поддержка языков",
        quick: {
          phone: "Позвонить",
          email: "Написать",
          sendEmail: "Отправить письмо",
          location: "Ляньюньган, Китай"
        }
      }
    },
    uz: {
      hero: {
        titleNormal: "LandSea",
        titleHighlight: "International Supply Chain Management",
        subtitle: "Sizning ishonchli xalqaro transport hamkoringiz",
        cta: "Boshlash",
        contactUs: "Biz bilan bog'laning"
      },
      services: {
        sectionTitleNormal: "Bizning",
        sectionTitleHighlight: "Xizmatlar",
        subtitle: "Biz Osiyo bilan Yevropa va Markaziy Osiyo o'rtasida samarali va ishonchli ta'minot zanjiri xizmatlarini taqdim etamiz.",
        items: [
          {
            title: "Xalqaro poyezdlar",
            description: "Xitoyni Yevropa, Markaziy Osiyo va Rossiya bilan bog'laydigan muntazam temir yo'l xizmatlari.",
            icon: "train"
          },
          {
            title: "Konteyner tashish",
            description: "Janubi-Sharqiy Osiyo, Yaponiya va Koreyani Markaziy Osiyo va Yevropa bilan bog'laydigan yechimlar.",
            icon: "container"
          },
          {
            title: "Logistika konsaltingi",
            description: "Xalqaro ta'minot zanjiri va logistikani optimallashtirish bo'yicha professional maslahat xizmatlari.",
            icon: "consulting"
          }
        ],
        viewAll: "Barcha xizmatlar"
      },
      network: {
        titleNormal: "Global",
        titleHighlight: "Tarmoq",
        title: "Global Strategik Tarmoq",
        subtitle: "Qit'alararo uzluksiz xizmat ko'rsatish uchun asosiy logistika markazlarida strategik joylashgan ofislar.",
        mapLegend: {
          hub: "Asosiy markazlar",
          station: "Operatsion bekatlar",
          route: "Transport yo'nalishlari"
        },
        stats: {
          cities: "Qamralgan shaharlar",
          countries: "Mamlakatlar",
          service: "24/7 Xizmat"
        }
      },
      news: {
        titleNormal: "So'nggi",
        titleHighlight: "Yangiliklar",
        subtitle: "Eng so'nggi logistika yangiliklari va sanoat tushunchalaridan xabardor bo'ling.",
        readMore: "Ko'proq o'qish",
        viewAll: "Barcha yangiliklar"
      },
      contact: {
        title: "Bog'lanish",
        titleNormal: "Biz bilan",
        titleHighlight: "Bog'laning",
        subtitle: "Xalqaro logistika ehtiyojlaringizni muhokama qilish uchun jamoamiz bilan bog'laning.",
        contactNow: "Hozir bog'laning",
        contactDesc: "Bizning professional jamoamiz logistika yechimlarini taqdim etishga tayyor.",
        phoneWechat: "Telefon / WeChat",
        address: "Bosh ofis manzili",
        addressValue: "Lianyungang, Jiangsu, Xitoy",
        addressDetail: "Sunshine International, C binosi, 2403-xona",
        email: "Email manzil",
        businessHours: "Ish vaqti",
        businessHoursValue: "Dush-Yak 24 soat",
        sendMessage: "Xabar yuborish",
        formDesc: "Quyidagi shaklni to'ldiring, biz 24 soat ichida javob beramiz.",
        replyTime: "Odatda 2 soat ichida javob beramiz",
        multiLang: "Ko'p tilli yordam",
        quick: {
          phone: "Telefon orqali",
          email: "Email orqali",
          sendEmail: "Email yuborish",
          location: "Lianyungang, Xitoy"
        }
      }
    }
  }

  // Fallback to English if translation is missing, or Chinese if that's preferred as base
  const t = translations[currentLanguage.code as keyof typeof translations] || translations.zh

  // 结构化数据 - Static for now, could be dynamic but JSON-LD is usually fine in one lang or multiple blocks
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LandSea",
    "url": "https://landsea.cc",
    "logo": "https://landsea.cc/placeholder-logo.png",
    "description": "丰吉国际供应链管理(江苏)有限公司提供专业的国际物流服务，包括中亚集装箱回程班列、跨境多式联运、清关仓储一体化等服务。",
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
      {/* Hero Section - Corporate Design */}
      <section className="relative min-h-[85vh] flex items-center bg-[#0f1c2d] pt-20">
        {/* Main background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/logistics-background.jpg"
            alt="International Logistics"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-16">
          <div className="max-w-2xl bg-white p-10 md:p-14 shadow-xl border-l-[6px] border-[#e3000f] rounded-sm animate-fade-in-up">
            <div className="mb-6 flex items-center space-x-3">
              <div className="h-10 w-10 bg-[#0f1c2d] flex items-center justify-center rounded-sm">
                <span className="text-white font-bold text-xl">丰</span>
              </div>
              <span className="text-[#0f1c2d] font-bold text-xl tracking-wider">LandSea</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f1c2d] mb-6 tracking-tight leading-tight">
              {t.hero.titleNormal} <br />
              <span className="text-[#e3000f]">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed font-medium">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/news">
                <Button size="lg" className="w-full sm:w-auto bg-[#e3000f] hover:bg-[#c8000d] text-white px-8 py-6 text-lg font-bold rounded-sm transition-colors duration-300">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:renyizheng@landsea.cc">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-[#0f1c2d] text-[#0f1c2d] hover:bg-[#0f1c2d] hover:text-white px-8 py-6 text-lg font-bold rounded-sm transition-all duration-300"
                >
                  {t.hero.contactUs}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Corporate Design */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="max-w-4xl mb-16 animate-fade-in-up">
            <div className="inline-flex items-center text-[#e3000f] font-bold text-sm tracking-widest uppercase mb-4">
              <Truck className="h-5 w-5 mr-2" />
              {t.services.sectionTitleNormal} {t.services.sectionTitleHighlight}
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-[#0f1c2d] mb-6 leading-tight">
              {t.services.sectionTitleNormal} <span className="text-[#e3000f]">{t.services.sectionTitleHighlight}</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-medium">
              {t.services.subtitle}
            </p>
          </div>

          {/* Corporate service cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <div key={index} className="group flex flex-col bg-white rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up delay-100 border-b-[3px] border-transparent hover:border-[#e3000f]">
                {/* Image container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`/service-${index + 1}.jpg`}
                    alt={service.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0f1c2d]/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                <div className="flex-1 p-8 flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 bg-[#f4f4f4] w-14 h-14 rounded-sm flex items-center justify-center text-[#0f1c2d]">
                    {service.icon === "train" && <Train className="h-7 w-7" />}
                    {service.icon === "container" && <Container className="h-7 w-7" />}
                    {service.icon === "consulting" && <BarChart3 className="h-7 w-7" />}
                  </div>

                  <h3 className="text-2xl font-bold text-[#0f1c2d] mb-4 group-hover:text-[#e3000f] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                    {service.description}
                  </p>

                  <Link
                    href="/news"
                    className="group/link inline-flex items-center text-[#0f1c2d] font-bold mt-auto hover:text-[#e3000f] transition-all duration-300 uppercase tracking-wider text-sm"
                  >
                    <span>{t.hero.cta}</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center animate-fade-in-up delay-300">
            <Link href="/news">
              <Button size="lg" className="bg-[#0f1c2d] hover:bg-[#e3000f] text-white px-10 py-6 text-lg font-bold rounded-sm transition-all duration-300 shadow-md">
                {t.services.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Network Section - Corporate Design */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="max-w-4xl mb-16 animate-fade-in-up">
            <div className="inline-flex items-center text-[#e3000f] font-bold text-sm tracking-widest uppercase mb-4">
              <Globe className="h-5 w-5 mr-2" />
              {t.network.titleNormal}
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-[#0f1c2d] mb-6 leading-tight">
              {t.network.titleNormal} <span className="text-[#e3000f]">{t.network.titleHighlight}</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-medium">
              {t.network.subtitle}
            </p>
          </div>

          {/* Map Area */}
          <div className="max-w-6xl mx-auto animate-fade-in-up delay-200">
            <div className="bg-[#f4f4f4] border border-gray-200 p-8 shadow-sm">
              <div className="relative aspect-[21/9] w-full bg-white border border-gray-200 overflow-hidden">
                <Image
                  src="/route-map.jpg"
                  alt="Global Network Map"
                  fill
                  className="object-cover opacity-30 grayscale"
                />

                {/* Simplified Route lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 75 42 Q 60 38 45 35"
                    stroke="#0f1c2d"
                    strokeWidth="0.4"
                    fill="none"
                    strokeDasharray="2,2"
                  />
                  <path
                    d="M 70 45 L 55 32"
                    stroke="#e3000f"
                    strokeWidth="0.4"
                    fill="none"
                    strokeDasharray="2,2"
                  />
                </svg>

                {/* Corporate location markers */}
                {[
                  { name: "塔什干", nameEn: "Tashkent", left: "45%", top: "35%", delay: "delay-0", status: "active" },
                  { name: "撒马尔罕", nameEn: "Samarkand", left: "48%", top: "38%", delay: "delay-100", status: "active" },
                  { name: "阿拉木图", nameEn: "Almaty", left: "55%", top: "32%", delay: "delay-200", status: "active" },
                  { name: "连云港", nameEn: "Lianyungang", left: "75%", top: "42%", delay: "delay-300", status: "hub" },
                  { name: "西安", nameEn: "Xi'an", left: "70%", top: "45%", delay: "delay-400", status: "active" },
                  { name: "义乌", nameEn: "Yiwu", left: "78%", top: "48%", delay: "delay-500", status: "active" },
                  { name: "青岛", nameEn: "Qingdao", left: "80%", top: "40%", delay: "delay-700", status: "active" },
                ].map((location) => (
                  <div key={location.name} className={`absolute ${location.delay}`} style={{ left: location.left, top: location.top }}>
                    <div className="group relative">
                      <div className={`relative h-4 w-4 rounded-sm flex items-center justify-center cursor-pointer border-2 border-white shadow-sm ${location.status === 'hub' ? 'bg-[#e3000f]' : 'bg-[#0f1c2d]'}`}>
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <div className="bg-[#0f1c2d] text-white px-3 py-2 text-center text-sm font-bold whitespace-nowrap shadow-lg">
                          <div>{location.name}</div>
                          <div className="text-xs text-gray-300 font-normal">{location.nameEn}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-200">
                {[
                  { number: "50+", label: t.network.stats.cities },
                  { number: "7", label: t.network.stats.countries },
                  { number: "24/7", label: t.network.stats.service }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl font-black text-[#0f1c2d] mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-bold uppercase tracking-wider text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section - Corporate Design */}
      <section className="py-24 bg-[#f4f4f4] relative border-t-4 border-[#e3000f]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f1c2d] mb-6 leading-tight">
              {t.news?.titleNormal} <span className="text-[#e3000f]">{t.news?.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-medium">
              {t.news?.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts && recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-b-[3px] border-transparent hover:border-[#e3000f] flex flex-col group">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center text-xs font-bold text-gray-400 mb-4 tracking-wider uppercase">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </div>
                    <Link href={`/news/${post.slug}`}>
                      <h3 className="text-xl font-black text-[#0f1c2d] mb-3 group-hover:text-[#e3000f] transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-6 font-medium leading-relaxed flex-grow text-sm line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link
                        href={`/news/${post.slug}`}
                        className="inline-flex items-center text-[#0f1c2d] font-bold uppercase tracking-wider text-xs hover:text-[#e3000f] transition-colors"
                      >
                        {t.news?.readMore}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-10 font-medium">No recent news available.</div>
            )}
          </div>
          <div className="mt-16 text-center animate-fade-in-up delay-200">
            <Link href="/news">
              <Button size="lg" variant="outline" className="border-2 border-[#0f1c2d] text-[#0f1c2d] hover:bg-[#0f1c2d] hover:text-white px-10 py-6 text-lg font-bold rounded-sm transition-all duration-300">
                {t.news?.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section - Corporate Design */}
      <section id="contact" className="py-24 bg-[#0f1c2d] relative border-t-4 border-[#0f1c2d]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">

              <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  <span className="block">{t.contact.titleNormal}</span>
                  <span className="block text-[#e3000f]">{t.contact.titleHighlight}</span>
                </h2>
                <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
                  {t.contact.subtitle}
                </p>

                <div className="space-y-8 mb-12">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="mt-1 mr-5 h-12 w-12 flex-shrink-0 bg-[#e3000f] flex items-center justify-center shadow-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-bold uppercase tracking-wider">{t.contact.phoneWechat}</p>
                      <p className="font-bold text-2xl text-white">+86 17374932331</p>
                    </div>
                  </div>
                  {/* MapPin */}
                  <div className="flex items-start">
                    <div className="mt-1 mr-5 h-12 w-12 flex-shrink-0 bg-white/10 flex items-center justify-center border border-gray-700">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-bold uppercase tracking-wider">{t.contact.address}</p>
                      <p className="font-bold text-white text-lg">{t.contact.addressValue}</p>
                      <p className="text-gray-400 mt-1">{t.contact.addressDetail}</p>
                    </div>
                  </div>
                  {/* Mail */}
                  <div className="flex items-start">
                    <div className="mt-1 mr-5 h-12 w-12 flex-shrink-0 bg-white/10 flex items-center justify-center border border-gray-700">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-bold uppercase tracking-wider">{t.contact.email}</p>
                      <p className="font-bold text-white text-lg">renyizheng@landsea.cc</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-wider">{t.contact.businessHours}</p>
                  <p className="font-bold text-lg">{t.contact.businessHoursValue}</p>
                </div>
              </div>

              {/* Contact form side */}
              <div className="bg-white p-10 md:p-12 shadow-2xl relative">
                <div className="mb-8">
                  <h4 className="text-2xl font-black text-[#0f1c2d] mb-3">{t.contact.sendMessage}</h4>
                  <p className="text-gray-600 font-medium">{t.contact.formDesc}</p>
                </div>
                <ContactForm />

                {/* Additional info */}
                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-none animate-pulse"></div>
                    <span>{t.contact.replyTime}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span>{t.contact.multiLang}</span>
                    <div className="flex space-x-2 tracking-widest opacity-80">
                      <span>🇨🇳</span>
                      <span>🇺🇸</span>
                      <span>🇷🇺</span>
                      <span>🇺🇿</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
