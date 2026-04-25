"use client"

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock3,
  Container,
  Globe2,
  MapPin,
  Phone,
  Ship,
  Train,
  Warehouse,
} from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import type { PostData } from "@/lib/markdown"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { type LanguageCode, useLanguage } from "@/components/language-selector"

const copy = {
  zh: {
    heroEyebrow: "China to Central Asia and Europe",
    heroTitle: "把跨境物流做得更稳、更清晰、更可控",
    heroText: "丰吉国际为铁路班列、多式联运、清关仓储和供应链项目提供端到端执行。重点覆盖中国、中亚、俄罗斯和欧洲方向。",
    quote: "获取运输方案",
    explore: "查看服务能力",
    metrics: [
      { value: "10-12", label: "天可达中亚核心节点" },
      { value: "50+", label: "覆盖城市与口岸" },
      { value: "24h", label: "项目响应机制" },
    ],
    servicesEyebrow: "Service Portfolio",
    servicesTitle: "更适合跨境项目的执行型服务",
    servicesText: "从单票运输到长期供应链项目，重点处理时效、成本、清关和异常响应。",
    services: [
      {
        title: "中亚铁路班列",
        text: "围绕连云港、西安、喀什、塔什干、阿拉木图等节点组织稳定铁路运输。",
        icon: Train,
      },
      {
        title: "跨境多式联运",
        text: "铁路、公路、海运组合执行，适合设备、车辆、集装箱和项目货。",
        icon: Container,
      },
      {
        title: "清关与仓储",
        text: "对接目的国清关、临时仓储、分拨和本地化交付。",
        icon: Warehouse,
      },
    ],
    networkTitle: "从港口、铁路节点到目的国团队",
    networkText: "用可追踪的线路和本地服务，把跨境运输的不确定性拆解到每个节点。",
    networkItems: ["中国主要港口与铁路集结点", "中亚口岸及目的国清关资源", "俄罗斯及欧洲方向联运通道"],
    newsEyebrow: "Company Insights",
    newsTitle: "近期动态",
    readMore: "阅读全文",
    allNews: "全部新闻",
    emptyNews: "暂无文章。",
    contactEyebrow: "Contact",
    contactTitle: "让我们看一下你的运输计划",
    contactText: "告诉我们货物类型、起运地、目的地和时效要求，我们会给出可执行的路线建议。",
    phone: "电话 / 微信",
    office: "办公室",
    address: "江苏连云港阳光国际大厦 C 座 2403",
  },
  en: {
    heroEyebrow: "China to Central Asia and Europe",
    heroTitle: "Cross-border logistics with tighter control and clearer execution",
    heroText: "LandSea runs block train, multimodal, customs, warehousing, and supply chain projects across China, Central Asia, Russia, and Europe.",
    quote: "Request a Route Plan",
    explore: "Explore Services",
    metrics: [
      { value: "10-12", label: "days to key Central Asia nodes" },
      { value: "50+", label: "cities and gateways covered" },
      { value: "24h", label: "project response mechanism" },
    ],
    servicesEyebrow: "Service Portfolio",
    servicesTitle: "Execution-led services for cross-border projects",
    servicesText: "From single shipments to long-term supply chain programs, we focus on timing, cost, customs, and exception response.",
    services: [
      {
        title: "Central Asia Block Train",
        text: "Stable rail services through Lianyungang, Xi'an, Kashgar, Tashkent, Almaty, and other key nodes.",
        icon: Train,
      },
      {
        title: "Cross-border Multimodal",
        text: "Rail, road, and ocean combinations for equipment, vehicles, containers, and project cargo.",
        icon: Container,
      },
      {
        title: "Customs and Warehousing",
        text: "Destination customs, bonded storage, distribution, and local delivery coordination.",
        icon: Warehouse,
      },
    ],
    networkTitle: "From ports and rail hubs to destination teams",
    networkText: "Trackable corridors and local execution help turn cross-border uncertainty into controlled milestones.",
    networkItems: ["Major Chinese ports and rail consolidation hubs", "Central Asia border gateways and customs resources", "Russia and Europe multimodal corridors"],
    newsEyebrow: "Company Insights",
    newsTitle: "Recent Updates",
    readMore: "Read Article",
    allNews: "All News",
    emptyNews: "No posts yet.",
    contactEyebrow: "Contact",
    contactTitle: "Let us review your transport plan",
    contactText: "Share cargo type, origin, destination, and timing. We will return with a workable route recommendation.",
    phone: "Phone / WeChat",
    office: "Office",
    address: "Room 2403, Building C, Sunshine International, Lianyungang, Jiangsu",
  },
  ru: {
    heroEyebrow: "China to Central Asia and Europe",
    heroTitle: "Контролируемая логистика между Китаем, Центральной Азией и Европой",
    heroText: "LandSea ведет железнодорожные, мультимодальные, таможенные, складские и цепочечные проекты по направлениям Китай, Центральная Азия, Россия и Европа.",
    quote: "Получить маршрут",
    explore: "Смотреть услуги",
    metrics: [
      { value: "10-12", label: "дней до ключевых узлов Центральной Азии" },
      { value: "50+", label: "городов и погранпереходов" },
      { value: "24h", label: "реакция проектной команды" },
    ],
    servicesEyebrow: "Service Portfolio",
    servicesTitle: "Услуги для стабильного исполнения международных перевозок",
    servicesText: "От разовой отправки до долгих программ поставок. Мы держим под контролем сроки, стоимость, таможню и работу с отклонениями.",
    services: [
      {
        title: "Поезда в Центральную Азию",
        text: "Стабильные маршруты через Ляньюньган, Сиань, Кашгар, Ташкент, Алматы и другие узлы.",
        icon: Train,
      },
      {
        title: "Мультимодальные перевозки",
        text: "Комбинации железной дороги, автодоставки и моря для оборудования, автомобилей, контейнеров и проектных грузов.",
        icon: Container,
      },
      {
        title: "Таможня и склад",
        text: "Таможенное оформление в стране назначения, временное хранение, распределение и локальная доставка.",
        icon: Warehouse,
      },
    ],
    networkTitle: "От портов и ж/д узлов до местных команд",
    networkText: "Отслеживаемые коридоры и локальное исполнение помогают переводить риски перевозки в понятные этапы.",
    networkItems: ["Основные порты Китая и ж/д центры консолидации", "Пограничные переходы Центральной Азии и таможенные ресурсы", "Мультимодальные коридоры России и Европы"],
    newsEyebrow: "Company Insights",
    newsTitle: "Последние материалы",
    readMore: "Читать",
    allNews: "Все новости",
    emptyNews: "Публикаций пока нет.",
    contactEyebrow: "Contact",
    contactTitle: "Давайте проверим ваш план перевозки",
    contactText: "Укажите груз, пункт отправления, назначение и сроки. Мы подготовим рабочий вариант маршрута.",
    phone: "Телефон / WeChat",
    office: "Офис",
    address: "Китай, Цзянсу, Ляньюньган, Sunshine International, корпус C, офис 2403",
  },
  uz: {
    heroEyebrow: "China to Central Asia and Europe",
    heroTitle: "Xitoy, Markaziy Osiyo va Yevropa bo'ylab aniq boshqariladigan logistika",
    heroText: "LandSea temir yo'l, multimodal tashuv, bojxona, ombor va ta'minot zanjiri loyihalarini Xitoy, Markaziy Osiyo, Rossiya va Yevropa yo'nalishlarida olib boradi.",
    quote: "Yo'nalish rejasi",
    explore: "Xizmatlarni ko'rish",
    metrics: [
      { value: "10-12", label: "kunda Markaziy Osiyo tugunlariga" },
      { value: "50+", label: "shahar va chegara nuqtalari" },
      { value: "24h", label: "loyiha javob vaqti" },
    ],
    servicesEyebrow: "Service Portfolio",
    servicesTitle: "Transchegaraviy loyihalar uchun ijroga yo'naltirilgan xizmatlar",
    servicesText: "Yakka jo'natmadan uzoq muddatli ta'minot zanjirigacha. Biz muddat, xarajat, bojxona va istisno holatlarini nazorat qilamiz.",
    services: [
      {
        title: "Markaziy Osiyo poyezdlari",
        text: "Lianyungang, Xi'an, Kashgar, Toshkent, Olmaota va boshqa asosiy tugunlar orqali barqaror temir yo'l tashuvi.",
        icon: Train,
      },
      {
        title: "Multimodal tashuv",
        text: "Uskuna, avtomobil, konteyner va loyiha yuklari uchun temir yo'l, avtomobil va dengiz tashuvi kombinatsiyasi.",
        icon: Container,
      },
      {
        title: "Bojxona va ombor",
        text: "Manzil davlatida bojxona, vaqtincha saqlash, taqsimlash va mahalliy yetkazib berish.",
        icon: Warehouse,
      },
    ],
    networkTitle: "Portlar va temir yo'l tugunlaridan mahalliy jamoalargacha",
    networkText: "Kuzatiladigan yo'nalishlar va mahalliy ijro transchegaraviy xatarlarni aniq bosqichlarga ajratadi.",
    networkItems: ["Xitoyning asosiy portlari va temir yo'l yig'ish markazlari", "Markaziy Osiyo chegara o'tishlari va bojxona resurslari", "Rossiya va Yevropa multimodal koridorlari"],
    newsEyebrow: "Company Insights",
    newsTitle: "So'nggi yangiliklar",
    readMore: "To'liq o'qish",
    allNews: "Barcha yangiliklar",
    emptyNews: "Hozircha maqola yo'q.",
    contactEyebrow: "Contact",
    contactTitle: "Tashuv rejangizni ko'rib chiqamiz",
    contactText: "Yuk turi, jo'nash joyi, manzil va muddatni yuboring. Biz amaliy yo'nalish tavsiyasini tayyorlaymiz.",
    phone: "Telefon / WeChat",
    office: "Ofis",
    address: "Room 2403, Building C, Sunshine International, Lianyungang, Jiangsu",
  },
} as const satisfies Record<LanguageCode, object>

export default function HomeClient({ recentPosts }: { recentPosts: PostData[] }) {
  const { currentLanguage } = useLanguage()
  const t = copy[currentLanguage.code]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LandSea International Supply Chain Management",
    alternateName: "丰吉国际供应链管理（江苏）有限公司",
    url: "https://landsea.cc",
    logo: "https://landsea.cc/brand-mark.svg",
    email: "renyizheng@landsea.cc",
    telephone: "+86 17374932331",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room 2403, Building C, Sunshine International",
      addressLocality: "Lianyungang",
      addressRegion: "Jiangsu",
      addressCountry: "CN",
    },
    areaServed: ["China", "Central Asia", "Russia", "Europe"],
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[92vh] overflow-hidden bg-slate-950 pt-20 text-white">
        <Image
          src="/logistics-background.jpg"
          alt="Rail and ocean freight logistics"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.78)_44%,rgba(2,6,23,0.24)_100%)]" />

        <div className="container relative flex min-h-[calc(92vh-5rem)] items-center py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.08fr_0.78fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                {t.heroEyebrow}
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal md:text-7xl">
                {t.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
                {t.heroText}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full bg-[#c91f28] px-7 py-6 text-base font-semibold text-white hover:bg-[#a71921]">
                  <Link href="/#contact">
                    {t.quote}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/5 px-7 py-6 text-base font-semibold text-white hover:bg-white hover:text-slate-950">
                  <Link href="/services">{t.explore}</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
              <div className="grid gap-3">
                {t.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-white/10 bg-slate-950/35 p-5">
                    <div className="text-4xl font-semibold text-white">{metric.value}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c91f28]">
                {t.servicesEyebrow}
              </div>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                {t.servicesTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{t.servicesText}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {t.services.map((service) => (
                <Link
                  key={service.title}
                  href="/services"
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl"
                >
                  <service.icon className="h-7 w-7 text-[#c91f28]" />
                  <h3 className="mt-7 text-lg font-semibold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                  <span className="mt-7 inline-flex items-center text-sm font-semibold text-slate-950">
                    {t.explore}
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
              <Image src="/route-map.jpg" alt="Central Asia logistics route map" fill className="object-cover opacity-72" />
              <div className="absolute inset-0 bg-slate-950/20" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-white/90 p-4 backdrop-blur">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-950">
                  <Globe2 className="h-5 w-5 text-[#c91f28]" />
                  Lianyungang / Xi'an / Kashgar / Tashkent / Almaty
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                {t.networkTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{t.networkText}</p>
              <div className="mt-8 space-y-4">
                {t.networkItems.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#c91f28]" />
                    <span className="text-sm leading-6 text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c91f28]">
                {t.newsEyebrow}
              </div>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">{t.newsTitle}</h2>
            </div>
            <Button asChild variant="outline" className="w-fit rounded-full border-slate-300 px-5 font-semibold">
              <Link href="/news">
                {t.allNews}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <article key={post.slug} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:bg-white hover:shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </div>
                  <h3 className="mt-5 line-clamp-2 text-xl font-semibold leading-tight text-slate-950">
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                    {post.summary || post.content.slice(0, 150)}
                  </p>
                  <Link href={`/news/${post.slug}`} className="mt-6 inline-flex items-center text-sm font-semibold text-[#c91f28]">
                    {t.readMore}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-500 md:col-span-3">
                {t.emptyNews}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-950 py-24 text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e44b52]">
                {t.contactEyebrow}
              </div>
              <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">{t.contactTitle}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">{t.contactText}</p>

              <div className="mt-10 grid gap-4">
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Phone className="mt-1 h-5 w-5 text-[#e44b52]" />
                  <div>
                    <div className="text-sm text-slate-400">{t.phone}</div>
                    <a href="tel:+8617374932331" className="mt-1 block text-lg font-semibold text-white">
                      +86 173 7493 2331
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <MapPin className="mt-1 h-5 w-5 text-[#e44b52]" />
                  <div>
                    <div className="text-sm text-slate-400">{t.office}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{t.address}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[Ship, Train, Clock3].map((Icon, index) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <Icon className="h-5 w-5 text-[#e44b52]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 text-slate-950 shadow-2xl md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
