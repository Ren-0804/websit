"use client"

import { ArrowRight, Train, Container, Globe, CheckCircle2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-selector"
import ServicesDashboardClient from "./ServicesDashboardClient"

const translations = {
  zh: {
    breadcrumbs: { home: "首页", current: "服务" },
    hero: {
      title: "我们的服务",
      subtitle: "提供专业、高效、可靠的国际物流解决方案，连接中国与中亚市场"
    },
    core: {
      title: "核心业务",
      subtitle: "我们专注于中亚地区的物流服务，提供全方位的运输解决方案",
      cards: [
        {
          title: "中亚集装箱回程班列",
          desc: "提供高效、稳定的中亚回程班列服务，连接中国与中亚市场",
          items: ["塔什干→中国：10-12天极速达", "北哈地区→西部枢纽：12天时效", "全程控箱，减少甩柜风险"],
          link: "/services/central-asia-rail",
          icon: "train"
        },
        {
          title: "跨境多式联运",
          desc: "灵活的多式联运解决方案，满足不同运输需求",
          items: ["中吉乌黄金通道：7-9天门到门", "新能源车笼车专线", "大件工程机械运输"],
          link: "/services/multimodal",
          icon: "globe"
        },
        {
          title: "清关仓储一体化",
          desc: "提供专业的清关服务和仓储解决方案",
          items: ["乌兹别克斯坦本土化服务", "清关误差率<0.5%", "喀什自贸区保税仓储"],
          link: "/services/customs-warehousing",
          icon: "container"
        }
      ],
      button: "了解详情"
    },
    chooseUs: {
      title: "选择我们的理由",
      subtitle: "我们致力于为客户提供最优质的服务和最可靠的解决方案",
      boxes: [
        {
          title: "驻外保障",
          items: ["乌兹别克斯坦/哈萨克斯坦常驻团队", "7×24小时应急响应", "专业的本地化服务"]
        },
        {
          title: "成本优势",
          items: ["中亚回程班列空箱利用率达92%", "运价低于市场15%", "提供最优的运输方案"]
        }
      ]
    },
    cta: {
      title: "准备好开始合作了吗？",
      subtitle: "联系我们，获取专业的物流解决方案",
      button: "联系我们"
    },
    dashboard: {
      title: "数据看板",
      subtitle: "近月运输量趋势与服务占比，助力运营决策。"
    }
  },
  en: {
    breadcrumbs: { home: "Home", current: "Services" },
    hero: {
      title: "Our Services",
      subtitle: "Professional, efficient, and reliable international logistics solutions connecting China and Central Asia markets"
    },
    core: {
      title: "Core Business",
      subtitle: "Focusing on Central Asia logistics services, providing comprehensive transport solutions",
      cards: [
        {
          title: "Central Asia Block Train",
          desc: "Efficient and stable return block train services connecting China and Central Asia",
          items: ["Tashkent→China: 10-12 days express", "North Kazakhstan→West Hub: 12 days", "Full container control, reduced risk"],
          link: "/services/central-asia-rail",
          icon: "train"
        },
        {
          title: "Cross-border Multimodal",
          desc: "Flexible multimodal solutions meeting various transport needs",
          items: ["China-Kyrgyzstan-Uzbekistan corridor: 7-9 days door-to-door", "New energy vehicle cage line", "Heavy machinery transport"],
          link: "/services/multimodal",
          icon: "globe"
        },
        {
          title: "Integrated Customs & Warehousing",
          desc: "Professional customs clearance and warehousing solutions",
          items: ["Uzbekistan localization service", "Customs clearance error rate <0.5%", "Kashgar Free Trade Zone bonded storage"],
          link: "/services/customs-warehousing",
          icon: "container"
        }
      ],
      button: "Learn More"
    },
    chooseUs: {
      title: "Why Choose Us",
      subtitle: "Dedicated to providing customers with top-quality service and reliable solutions",
      boxes: [
        {
          title: "Overseas Support",
          items: ["Resident teams in Uzbekistan/Kazakhstan", "7×24 hour emergency response", "Professional localized service"]
        },
        {
          title: "Cost Advantage",
          items: ["Central Asia return train empty container utilization 92%", "Rates 15% lower than market", "Optimal transport schemes"]
        }
      ]
    },
    cta: {
      title: "Ready to Start?",
      subtitle: "Contact us for professional logistics solutions",
      button: "Contact Us"
    },
    dashboard: {
      title: "Data Dashboard",
      subtitle: "Recent transport volume trends and service share, aiding operational decisions."
    }
  },
  ru: {
    breadcrumbs: { home: "Главная", current: "Услуги" },
    hero: {
      title: "Наши Услуги",
      subtitle: "Профессиональные, эффективные и надежные логистические решения, соединяющие рынки Китая и Центральной Азии"
    },
    core: {
      title: "Основные направления",
      subtitle: "Фокус на логистике в Центральной Азии, предоставление комплексных транспортных решений",
      cards: [
        {
          title: "Контейнерные поезда",
          desc: "Эффективные и стабильные обратные поезда, соединяющие Китай и Центральную Азию",
          items: ["Ташкент→Китай: 10-12 дней экспресс", "Северный Казахстан→Западный хаб: 12 дней", "Полный контроль контейнеров"],
          link: "/services/central-asia-rail",
          icon: "train"
        },
        {
          title: "Мультимодальные перевозки",
          desc: "Гибкие мультимодальные решения для различных транспортных нужд",
          items: ["Коридор Китай-Кыргызстан-Узбекистан: 7-9 дней от двери до двери", "Перевозка автовозами", "Перевозка спецтехники"],
          link: "/services/multimodal",
          icon: "globe"
        },
        {
          title: "Таможня и Склад",
          desc: "Профессиональные решения по таможенному оформлению и складированию",
          items: ["Локализация в Узбекистане", "Ошибка оформления <0.5%", "Бондовый склад в Кашгаре"],
          link: "/services/customs-warehousing",
          icon: "container"
        }
      ],
      button: "Подробнее"
    },
    chooseUs: {
      title: "Почему мы",
      subtitle: "Мы стремимся предоставлять клиентам услуги высочайшего качества и надежные решения",
      boxes: [
        {
          title: "Поддержка за рубежом",
          items: ["Команды в Узбекистане/Казахстане", "24/7 реагирование", "Профессиональный локальный сервис"]
        },
        {
          title: "Преимущество в цене",
          items: ["Утилизация пустых контейнеров 92%", "Тарифы на 15% ниже рыночных", "Оптимальные схемы перевозки"]
        }
      ]
    },
    cta: {
      title: "Готовы начать?",
      subtitle: "Свяжитесь с нами для профессионального логистического решения",
      button: "Связаться"
    },
    dashboard: {
      title: "Панель данных",
      subtitle: "Тенденции объемов перевозок и доли услуг."
    }
  },
  uz: {
    breadcrumbs: { home: "Asosiy", current: "Xizmatlar" },
    hero: {
      title: "Bizning xizmatlar",
      subtitle: "Xitoy va Markaziy Osiyo bozorlarini bog'laydigan professional, samarali va ishonchli xalqaro logistika yechimlari"
    },
    core: {
      title: "Asosiy faoliyat",
      subtitle: "Markaziy Osiyo logistika xizmatlariga ixtisoslashgan holda, kompleks transport yechimlarini taqdim etamiz",
      cards: [
        {
          title: "Konteyner poyezdlari",
          desc: "Xitoy va Markaziy Osiyoni bog'laydigan samarali va barqaror qaytish poyezdlari xizmati",
          items: ["Toshkent→Xitoy: 10-12 kun tezkor", "Shimoliy Qozog'iston→G'arbiy markaz: 12 kun", "Konteyner nazorati"],
          link: "/services/central-asia-rail",
          icon: "train"
        },
        {
          title: "Multimodal tashish",
          desc: "Turli tashish ehtiyojlarini qondiradigan moslashuvchan multimodal yechimlar",
          items: ["Xitoy-Qirg'iziston-O'zbekiston yo'lagi: 7-9 kun eshikdan eshikgacha", "Yangi energiya avtomobillari liniyasi", "Maxsus texnika tashish"],
          link: "/services/multimodal",
          icon: "globe"
        },
        {
          title: "Bojxona va ombor",
          desc: "Professional bojxona rasmiylashtiruvi va ombor yechimlari",
          items: ["O'zbekistonda mahalliylashtirish xizmati", "Rasmiylashtirish xatosi <0.5%", "Qashqar erkin savdo zonasida bojxona ombori"],
          link: "/services/customs-warehousing",
          icon: "container"
        }
      ],
      button: "Batafsil"
    },
    chooseUs: {
      title: "Nega bizni tanlaysiz",
      subtitle: "Mijozlarga eng yuqori sifatli xizmat va ishonchli yechimlarni taqdim etishga sodiqmiz",
      boxes: [
        {
          title: "Chet elda qo'llab-quvvatlash",
          items: ["O'zbekiston/Qozog'istonda doimiy jamoalar", "7×24 soat favqulodda javob", "Professional mahalliy xizmat"]
        },
        {
          title: "Narx ustunligi",
          items: ["Bo'sh konteynerdan foydalanish 92%", "Tariflar bozordan 15% past", "Optimal tashish sxemalari"]
        }
      ]
    },
    cta: {
      title: "Hamkorlikni boshlaysizmi?",
      subtitle: "Professional logistika yechimlari uchun biz bilan bog'laning",
      button: "Biz bilan bog'laning"
    },
    dashboard: {
      title: "Ma'lumotlar paneli",
      subtitle: "Tashish hajmi tendentsiyalari va xizmat ulushi."
    }
  }
} as const

export default function ServicesClient() {
  const { currentLanguage } = useLanguage()
  const langCode = currentLanguage.code as keyof typeof translations
  const t = translations[langCode] || translations.en

  return (
    <>
      <nav className="container mx-auto px-4 pt-6 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">{t.breadcrumbs.home}</Link></li>
          <li>/</li>
          <li>{t.breadcrumbs.current}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 mt-6 rounded-3xl mx-4">
        <div className="absolute inset-0 z-0 bg-[url('/services-hero.jpg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.hero.title}</h1>
            <p className="text-xl text-blue-100">{t.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.core.title}</h2>
            <p className="text-gray-600">{t.core.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.core.cards.map((card, idx) => (
              <Card key={idx} className="bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-blue-600/40 transition-all duration-300 rounded-xl">
                <div className="h-2 bg-blue-600 w-full"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white shadow-sm">
                    {card.icon === "train" && <Train className="h-6 w-6 text-blue-600" />}
                    {card.icon === "globe" && <Globe className="h-6 w-6 text-blue-600" />}
                    {card.icon === "container" && <Container className="h-6 w-6 text-blue-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-6">{card.desc}</p>
                  <ul className="space-y-3 mb-6">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start group">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={card.link}>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md">{t.core.button}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.chooseUs.title}</h2>
            <p className="text-gray-600">{t.chooseUs.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {t.chooseUs.boxes.map((box, idx) => (
              <div key={idx} className="bg-blue-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{box.title}</h3>
                <ul className="space-y-3">
                  {box.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-blue-100 mb-8">{t.cta.subtitle}</p>
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                {t.cta.button} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.dashboard.title}</h2>
            <p className="text-gray-600 mb-8">{t.dashboard.subtitle}</p>
            <ServicesDashboardClient />
          </div>
        </div>
      </section>
    </>
  )
}