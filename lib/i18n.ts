export const languages = [
  { code: "en", name: "English", nativeName: "English", shortName: "EN" },
  { code: "zh", name: "Chinese", nativeName: "中文", shortName: "ZH" },
  { code: "ru", name: "Russian", nativeName: "Русский", shortName: "RU" },
  { code: "uz", name: "Uzbek", nativeName: "O'zbek", shortName: "UZ" },
] as const

export type LanguageCode = (typeof languages)[number]["code"]
export type Language = (typeof languages)[number]

export const defaultLanguageCode: LanguageCode = "en"

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return Boolean(value && languages.some((language) => language.code === value))
}

export function getLanguage(code: string | null | undefined): Language {
  return languages.find((language) => language.code === code) || languages[0]
}

export function normalizeLanguageCode(value: string | null | undefined): LanguageCode | null {
  if (!value) return null
  const normalized = value.toLowerCase()
  if (normalized.startsWith("zh")) return "zh"
  if (normalized.startsWith("ru")) return "ru"
  if (normalized.startsWith("uz")) return "uz"
  if (normalized.startsWith("en")) return "en"
  return null
}

export function languageFromRegion(value: string | null | undefined): LanguageCode | null {
  if (!value) return null
  const region = value.toUpperCase()
  if (["CN", "HK", "MO", "TW", "SG"].includes(region)) return "zh"
  if (["RU", "BY", "KZ", "KG", "TJ"].includes(region)) return "ru"
  if (["UZ"].includes(region)) return "uz"
  return null
}

export const serviceSlugs = ["central-asia-rail", "multimodal", "customs-warehousing"] as const
export type ServiceSlug = (typeof serviceSlugs)[number]

export const citySlugs = ["tashkent", "samarkand", "almaty", "astana", "bishkek", "dushanbe"] as const
export type CitySlug = (typeof citySlugs)[number]

export const contact = {
  phone: "+86 173 7493 2331",
  phoneHref: "+8617374932331",
  email: "renyizheng@landsea.cc",
  telegram: "@akoozh",
  addressEn: "Room 2403, Building C, Sunshine International, Lianyungang, Jiangsu",
  addressZh: "江苏连云港阳光国际大厦 C 座 2403",
}

const sharedServices = {
  en: [
    {
      slug: "central-asia-rail",
      icon: "train",
      title: "Central Asia block train",
      short: "Scheduled container rail service for China, Uzbekistan, Kazakhstan and nearby nodes.",
      summary: "A steadier rail option for container cargo that needs predictable timing, controlled handover and practical cost.",
      bullets: ["10-12 days to key hubs", "Container status follow-up", "Rail node coordination"],
      scenarios: ["Industrial goods", "Auto parts", "E-commerce consolidation", "Time-sensitive replenishment"],
      faqs: [
        { q: "What is the typical transit time?", a: "Core Central Asia rail nodes are usually planned around 10-12 days, subject to route, border and loading windows." },
        { q: "Can you coordinate customs and delivery?", a: "Yes. We coordinate document review, destination customs resources and local delivery where available." },
        { q: "Which cargo fits rail best?", a: "Container cargo that needs more stability than road and faster timing than ocean is usually the best fit." },
      ],
    },
    {
      slug: "multimodal",
      icon: "route",
      title: "Cross-border multimodal",
      short: "Rail, road and ocean combinations for project cargo, vehicles, machinery and regular freight.",
      summary: "Route design across rail, road, sea and border resources, built around cargo profile and delivery risk.",
      bullets: ["Door-to-door route design", "Road and rail combinations", "Exception response by node"],
      scenarios: ["New energy vehicles", "Machinery", "Oversized cargo", "Multi-origin shipments"],
      faqs: [
        { q: "How is a route selected?", a: "We compare cargo profile, timing, border pressure, permit needs and destination handling before recommending a route." },
        { q: "Can you handle vehicles or machinery?", a: "Yes. Vehicle carrier, lashing, permit and project handling can be coordinated by shipment type." },
        { q: "Is door-to-door available?", a: "Door-to-door is available on selected corridors where local customs and delivery resources are confirmed." },
      ],
    },
    {
      slug: "customs-warehousing",
      icon: "warehouse",
      title: "Customs and warehousing",
      short: "Destination customs, bonded handling, temporary storage, distribution and delivery coordination.",
      summary: "A practical landing layer for cross-border cargo: documents, customs, storage and local distribution.",
      bullets: ["Document discipline", "Local customs coordination", "Storage and distribution"],
      scenarios: ["Consumer goods", "Project batches", "Spare parts", "Local distribution"],
      faqs: [
        { q: "What documents should be prepared?", a: "Invoice, packing list, HS information, origin details and cargo-specific certificates are reviewed before execution." },
        { q: "Can warehousing include value-added work?", a: "Yes. Labeling, sorting, repacking and staged dispatch can be arranged case by case." },
        { q: "How do you reduce customs risk?", a: "We rely on early document review, local partner checks and clear exception ownership." },
      ],
    },
  ],
  zh: [
    {
      slug: "central-asia-rail",
      icon: "train",
      title: "中亚铁路班列",
      short: "面向中国、乌兹别克斯坦、哈萨克斯坦等节点的集装箱铁路运输。",
      summary: "适合需要稳定时效、可控交接和合理成本的集装箱货物。",
      bullets: ["核心节点 10-12 天", "集装箱状态跟踪", "铁路节点协同"],
      scenarios: ["工业品", "汽车零部件", "电商集货", "补货型货物"],
      faqs: [
        { q: "典型时效是多少？", a: "中亚核心铁路节点通常按 10-12 天规划，实际受路线、口岸和装箱窗口影响。" },
        { q: "能否配合清关和派送？", a: "可以。我们会协调资料审核、目的国清关资源和可覆盖区域的本地派送。" },
        { q: "什么货更适合铁路？", a: "需要比公路更稳定、比海运更快的集装箱货物通常更适合。" },
      ],
    },
    {
      slug: "multimodal",
      icon: "route",
      title: "跨境多式联运",
      short: "铁路、公路、海运组合，适配项目货、车辆、机械设备和常规货。",
      summary: "围绕货型和交付风险，把铁路、公路、海运与口岸资源组合成可执行线路。",
      bullets: ["门到门线路设计", "公铁/海铁组合", "异常节点响应"],
      scenarios: ["新能源车", "工程机械", "大件货物", "多起运地货物"],
      faqs: [
        { q: "路线怎么选择？", a: "我们会结合货型、时效、口岸压力、许可证和目的地处理条件后给出方案。" },
        { q: "能否操作车辆或机械？", a: "可以按货型协调笼车、加固、许可证和项目制执行。" },
        { q: "是否支持门到门？", a: "在清关和本地派送资源确认的线路上支持门到门。" },
      ],
    },
    {
      slug: "customs-warehousing",
      icon: "warehouse",
      title: "清关与仓储",
      short: "目的国清关、保税操作、临时仓储、分拨和本地交付协同。",
      summary: "为跨境货物提供落地执行层：单证、清关、仓储和分拨。",
      bullets: ["单证纪律", "本地清关协调", "仓储与分拨"],
      scenarios: ["快消品", "项目批次货", "备件", "目的国分拨"],
      faqs: [
        { q: "需要准备哪些资料？", a: "发票、箱单、HS 信息、产地信息及货物所需证书会在执行前审核。" },
        { q: "仓储能做增值服务吗？", a: "可按实际情况安排贴标、分拣、换包装和分批派送。" },
        { q: "如何降低清关风险？", a: "通过提前审单、本地资源复核和异常责任到节点来降低风险。" },
      ],
    },
  ],
  ru: [
    {
      slug: "central-asia-rail",
      icon: "train",
      title: "Поезда в Центральную Азию",
      short: "Контейнерные ж/д перевозки между Китаем, Узбекистаном, Казахстаном и соседними узлами.",
      summary: "Более стабильный вариант для контейнерных грузов с понятными сроками и контролируемой передачей.",
      bullets: ["10-12 дней до ключевых узлов", "Контроль статуса контейнера", "Координация ж/д узлов"],
      scenarios: ["Промышленные товары", "Автозапчасти", "E-commerce партии", "Срочное пополнение"],
      faqs: [
        { q: "Какой типичный срок?", a: "Ключевые узлы Центральной Азии обычно планируются в пределах 10-12 дней с учетом маршрута и погранпереходов." },
        { q: "Вы помогаете с таможней?", a: "Да, координируем проверку документов, ресурсы таможни в стране назначения и локальную доставку." },
        { q: "Какие грузы подходят?", a: "Контейнерные грузы, которым нужна стабильность выше автодоставки и скорость выше моря." },
      ],
    },
    {
      slug: "multimodal",
      icon: "route",
      title: "Мультимодальные перевозки",
      short: "Комбинации железной дороги, авто и моря для проектов, автомобилей, техники и обычных грузов.",
      summary: "Маршрут строится вокруг профиля груза, сроков, погранпереходов и рисков доставки.",
      bullets: ["Маршрут до двери", "Комбинации авто и ж/д", "Реакция на отклонения"],
      scenarios: ["Электромобили", "Техника", "Негабарит", "Сборные проекты"],
      faqs: [
        { q: "Как выбирается маршрут?", a: "Сравниваем груз, сроки, нагрузку на границе, разрешения и обработку в пункте назначения." },
        { q: "Можно перевозить авто и технику?", a: "Да, организуем автовозы, крепление, разрешения и проектное сопровождение." },
        { q: "Есть доставка до двери?", a: "Да, на коридорах с подтвержденной таможней и локальной доставкой." },
      ],
    },
    {
      slug: "customs-warehousing",
      icon: "warehouse",
      title: "Таможня и склад",
      short: "Таможенное оформление, временное хранение, склад, распределение и локальная доставка.",
      summary: "Практический слой исполнения после границы: документы, таможня, склад и распределение.",
      bullets: ["Дисциплина документов", "Локальная таможня", "Склад и распределение"],
      scenarios: ["FMCG", "Проектные партии", "Запчасти", "Локальная дистрибуция"],
      faqs: [
        { q: "Какие документы нужны?", a: "Инвойс, упаковочный лист, HS-код, происхождение и специальные сертификаты проверяются заранее." },
        { q: "Есть складские услуги?", a: "Да, возможны маркировка, сортировка, переупаковка и поэтапная отправка." },
        { q: "Как снижаете риск на таможне?", a: "За счет ранней проверки документов, локальной сверки и понятной ответственности по узлам." },
      ],
    },
  ],
  uz: [
    {
      slug: "central-asia-rail",
      icon: "train",
      title: "Markaziy Osiyo poyezdlari",
      short: "Xitoy, O'zbekiston, Qozog'iston va qo'shni tugunlar uchun konteyner temir yo'l tashuvi.",
      summary: "Aniq muddat, nazoratli topshirish va maqbul xarajat kerak bo'lgan konteyner yuklari uchun.",
      bullets: ["Asosiy tugunlarga 10-12 kun", "Konteyner holati kuzatuvi", "Temir yo'l tugunlari muvofiqligi"],
      scenarios: ["Sanoat tovarlari", "Avto ehtiyot qismlar", "E-commerce yuklari", "Tezkor to'ldirish"],
      faqs: [
        { q: "Odatdagi muddat qancha?", a: "Markaziy Osiyo asosiy tugunlari odatda 10-12 kun atrofida rejalashtiriladi." },
        { q: "Bojxona va yetkazishni muvofiqlashtirasizmi?", a: "Ha, hujjat tekshiruvi, manzil bojxonasi va mahalliy yetkazishni muvofiqlashtiramiz." },
        { q: "Qaysi yuk mos?", a: "Yo'l tashuvidan barqarorroq, dengizdan tezroq yechim kerak bo'lgan konteyner yuklari." },
      ],
    },
    {
      slug: "multimodal",
      icon: "route",
      title: "Multimodal tashuv",
      short: "Loyiha yuklari, avtomobillar, texnika va oddiy yuklar uchun temir yo'l, avto va dengiz kombinatsiyasi.",
      summary: "Yo'nalish yuk turi, muddat, chegara sharoiti va yetkazish xavfiga qarab tuziladi.",
      bullets: ["Eshikdan eshikkacha reja", "Avto va temir yo'l kombinatsiyasi", "Muammo tuguniga javob"],
      scenarios: ["Elektromobillar", "Texnika", "Katta o'lchamli yuk", "Ko'p manbali jo'natmalar"],
      faqs: [
        { q: "Yo'nalish qanday tanlanadi?", a: "Yuk turi, muddat, chegara bosimi, ruxsatnomalar va manzil ishlovi solishtiriladi." },
        { q: "Avto yoki texnika tashish mumkinmi?", a: "Ha, avtotashuvchi, mahkamlash, ruxsatnoma va loyiha boshqaruvi ko'rib chiqiladi." },
        { q: "Eshikdan eshikkacha bormi?", a: "Mahalliy bojxona va yetkazish tasdiqlangan koridorlarda mavjud." },
      ],
    },
    {
      slug: "customs-warehousing",
      icon: "warehouse",
      title: "Bojxona va ombor",
      short: "Manzil bojxonasi, vaqtincha saqlash, ombor, taqsimlash va mahalliy yetkazish.",
      summary: "Chegaradan keyingi ijro qatlami: hujjatlar, bojxona, ombor va taqsimlash.",
      bullets: ["Hujjat intizomi", "Mahalliy bojxona", "Ombor va taqsimlash"],
      scenarios: ["FMCG", "Loyiha partiyalari", "Ehtiyot qismlar", "Mahalliy distribyutsiya"],
      faqs: [
        { q: "Qanday hujjatlar kerak?", a: "Invoys, packing list, HS ma'lumoti, kelib chiqish va kerakli sertifikatlar oldindan tekshiriladi." },
        { q: "Qo'shimcha ombor xizmati bormi?", a: "Yorliqlash, saralash, qayta qadoqlash va bosqichli jo'natish kelishiladi." },
        { q: "Bojxona xavfi qanday kamayadi?", a: "Erta hujjat tekshiruvi, mahalliy qayta tekshiruv va aniq javobgarlik orqali." },
      ],
    },
  ],
} as const

const sharedCities = {
  en: [
    { slug: "tashkent", name: "Tashkent", country: "Uzbekistan", time: "10-12 days", summary: "Rail and road options with customs, storage and distribution support around Uzbekistan's main commercial hub." },
    { slug: "samarkand", name: "Samarkand", country: "Uzbekistan", time: "7-12 days", summary: "Central Uzbekistan coverage for retail, industrial and project cargo moving through road and rail corridors." },
    { slug: "almaty", name: "Almaty", country: "Kazakhstan", time: "about 12 days", summary: "A key Kazakhstan gateway for western China connections, northern routes and Central Asia inland delivery." },
    { slug: "astana", name: "Astana", country: "Kazakhstan", time: "12-15 days", summary: "Project logistics coverage for central and northern Kazakhstan industrial and energy markets." },
    { slug: "bishkek", name: "Bishkek", country: "Kyrgyzstan", time: "7-9 days", summary: "China-Kyrgyzstan-Uzbekistan corridor support for road, e-commerce, FMCG and local delivery." },
    { slug: "dushanbe", name: "Dushanbe", country: "Tajikistan", time: "10-14 days", summary: "Road-led routing into Tajikistan with rail handover and border coordination where suitable." },
  ],
  zh: [
    { slug: "tashkent", name: "塔什干", country: "乌兹别克斯坦", time: "10-12 天", summary: "围绕乌兹别克斯坦主要商业枢纽，提供班列、公路、清关、仓储和分拨支持。" },
    { slug: "samarkand", name: "撒马尔罕", country: "乌兹别克斯坦", time: "7-12 天", summary: "覆盖乌国中部市场，适合零售、工业品和项目货的公路/铁路组合。" },
    { slug: "almaty", name: "阿拉木图", country: "哈萨克斯坦", time: "约 12 天", summary: "连接中国西部、北哈线路和中亚腹地交付的重要门户。" },
    { slug: "astana", name: "阿斯塔纳", country: "哈萨克斯坦", time: "12-15 天", summary: "面向哈萨克斯坦中北部工业、能源和项目物流市场。" },
    { slug: "bishkek", name: "比什凯克", country: "吉尔吉斯斯坦", time: "7-9 天", summary: "支持中吉乌通道、公路运输、电商、快消品和本地派送。" },
    { slug: "dushanbe", name: "杜尚别", country: "塔吉克斯坦", time: "10-14 天", summary: "以公路为主，按货物情况结合铁路中转和口岸协调进入塔吉克斯坦。" },
  ],
  ru: [
    { slug: "tashkent", name: "Ташкент", country: "Узбекистан", time: "10-12 дней", summary: "Ж/д и авто решения с таможней, складом и распределением вокруг главного коммерческого узла Узбекистана." },
    { slug: "samarkand", name: "Самарканд", country: "Узбекистан", time: "7-12 дней", summary: "Покрытие центрального Узбекистана для розницы, промышленности и проектных грузов." },
    { slug: "almaty", name: "Алматы", country: "Казахстан", time: "около 12 дней", summary: "Ключевой казахстанский узел для связей с западным Китаем и внутренней доставкой." },
    { slug: "astana", name: "Астана", country: "Казахстан", time: "12-15 дней", summary: "Проектная логистика для центрального и северного Казахстана, промышленности и энергетики." },
    { slug: "bishkek", name: "Бишкек", country: "Кыргызстан", time: "7-9 дней", summary: "Поддержка коридора Китай-Кыргызстан-Узбекистан, авто, e-commerce и FMCG." },
    { slug: "dushanbe", name: "Душанбе", country: "Таджикистан", time: "10-14 дней", summary: "Автомобильные маршруты в Таджикистан с ж/д передачей и пограничной координацией." },
  ],
  uz: [
    { slug: "tashkent", name: "Toshkent", country: "O'zbekiston", time: "10-12 kun", summary: "O'zbekistonning asosiy savdo tuguni atrofida temir yo'l, avto, bojxona, ombor va taqsimlash." },
    { slug: "samarkand", name: "Samarqand", country: "O'zbekiston", time: "7-12 kun", summary: "Markaziy O'zbekiston uchun chakana, sanoat va loyiha yuklariga yo'l/temir yo'l yechimlari." },
    { slug: "almaty", name: "Olmaota", country: "Qozog'iston", time: "taxminan 12 kun", summary: "G'arbiy Xitoy, shimoliy yo'nalishlar va ichki yetkazish uchun muhim Qozog'iston tuguni." },
    { slug: "astana", name: "Ostona", country: "Qozog'iston", time: "12-15 kun", summary: "Markaziy va shimoliy Qozog'iston sanoat va energetika bozorlari uchun loyiha logistikasi." },
    { slug: "bishkek", name: "Bishkek", country: "Qirg'iziston", time: "7-9 kun", summary: "Xitoy-Qirg'iziston-O'zbekiston koridori, avto, e-commerce va FMCG uchun." },
    { slug: "dushanbe", name: "Dushanbe", country: "Tojikiston", time: "10-14 kun", summary: "Tojikistonga asosan avto yo'nalish, kerak bo'lsa temir yo'l topshirish va chegara muvofiqligi." },
  ],
} as const

export const copy = {
  en: {
    brand: "LandSea",
    company: "LandSea International Supply Chain Management",
    descriptor: "Central Asia logistics execution",
    nav: { home: "Home", services: "Services", regions: "Regions", about: "About", news: "Insights", contact: "Contact" },
    cta: { route: "Request a route plan", services: "View service lines", contact: "Contact the team", read: "Read more", allNews: "All insights", backNews: "Back to insights" },
    home: {
      eyebrow: "China - Central Asia - Europe",
      title: "Logistics execution for the corridors where delay gets expensive.",
      intro: "Rail, road, customs and destination handling for cargo moving between China, Central Asia, Russia and Europe.",
      proof: ["Rail schedules checked by node", "Documents reviewed before handover", "Local resources assigned by destination"],
      metrics: [{ value: "10-12", label: "days to core Central Asia rail hubs" }, { value: "6", label: "priority destination cities" }, { value: "24h", label: "response window for route review" }],
      servicesTitle: "Service lines built around execution risk",
      servicesIntro: "We turn corridor choice, documents, border handling and local delivery into one controlled project flow.",
      networkTitle: "One corridor, many accountable nodes",
      networkIntro: "From Lianyungang and western China rail hubs to Tashkent, Almaty and Bishkek, every handover needs an owner.",
      newsTitle: "Market and project notes",
      contactTitle: "Send the shipment details. We will map the route.",
      contactIntro: "Cargo type, origin, destination and timing are enough for a first review.",
    },
    pages: {
      servicesTitle: "Services for controlled cross-border execution",
      servicesIntro: "Three practical layers: line-haul movement, multimodal design and destination landing.",
      processTitle: "Project flow",
      process: ["Cargo review", "Route and quote", "Booking and loading", "In-transit tracking", "Customs and delivery", "Review"],
      regionsTitle: "Central Asia coverage",
      regionsIntro: "Core cities, indicative timing and local execution points for China-Central Asia cargo.",
      aboutTitle: "A logistics team for corridor work, not presentation work",
      aboutIntro: "LandSea focuses on practical route execution across China, Central Asia, Russia and Europe: fewer vague promises, more node-level ownership.",
      contactTitle: "Contact LandSea",
      contactIntro: "Send your cargo details or call directly. The first answer should be a route, not a brochure.",
      newsTitle: "Insights",
      newsIntro: "Updates on Central Asia corridors, multimodal freight and supply chain execution.",
    },
    detail: { overview: "Overview", scenarios: "Best for", execution: "Execution points", faq: "Frequently asked questions", timing: "Reference timing", available: "Available services", emptyNews: "No posts yet.", minRead: "min read", routeLabel: "Route nodes" },
    form: {
      name: "Name", email: "Email", company: "Company", subject: "Subject", message: "Shipment details",
      namePlaceholder: "Your name", emailPlaceholder: "name@company.com", companyPlaceholder: "Company name", subjectPlaceholder: "Cargo and destination", messagePlaceholder: "Cargo type, origin, destination, timing...",
      submit: "Send route request", sending: "Sending...", promise: "We usually reply within 24 hours.",
      successTitle: "Request sent", successText: "Thanks. We will review the route and reply soon.", errorTitle: "Send failed", errorText: "Please try again later.",
    },
    footerLine: "Cross-border logistics execution for China, Central Asia, Russia and Europe.",
    rights: "All rights reserved",
    services: sharedServices.en,
    cities: sharedCities.en,
  },
  zh: {
    brand: "丰吉国际",
    company: "丰吉国际供应链管理（江苏）有限公司",
    descriptor: "中亚物流执行",
    nav: { home: "首页", services: "服务", regions: "区域", about: "关于", news: "洞察", contact: "联系" },
    cta: { route: "获取线路方案", services: "查看服务", contact: "联系团队", read: "阅读全文", allNews: "全部洞察", backNews: "返回洞察" },
    home: {
      eyebrow: "中国 - 中亚 - 欧洲",
      title: "为延误成本很高的通道，做可控的物流执行。",
      intro: "覆盖中国、中亚、俄罗斯和欧洲方向的铁路、公路、清关和目的国落地服务。",
      proof: ["按节点核对班列计划", "交接前审核单证资料", "按目的地匹配本地资源"],
      metrics: [{ value: "10-12", label: "天可达中亚核心铁路节点" }, { value: "6", label: "重点目的城市覆盖" }, { value: "24h", label: "线路初审响应窗口" }],
      servicesTitle: "围绕执行风险设计服务",
      servicesIntro: "把线路选择、单证、口岸处理和本地交付组织成一个可控项目流程。",
      networkTitle: "一条通道，多个需要负责的节点",
      networkIntro: "从连云港和中国西部铁路节点到塔什干、阿拉木图、比什凯克，每次交接都需要责任人。",
      newsTitle: "市场与项目笔记",
      contactTitle: "发来货物信息，我们来拆线路。",
      contactIntro: "货物类型、起运地、目的地和时效要求，足够做第一轮判断。",
    },
    pages: {
      servicesTitle: "面向跨境执行结果的服务",
      servicesIntro: "三层能力：干线运输、多式联运设计、目的国落地。",
      processTitle: "项目流程",
      process: ["货物确认", "线路与报价", "订舱装箱", "在途跟踪", "清关交付", "复盘优化"],
      regionsTitle: "中亚区域覆盖",
      regionsIntro: "中国至中亚货物的核心城市、参考时效与落地执行节点。",
      aboutTitle: "我们做的是通道执行，不是漂亮方案书",
      aboutIntro: "丰吉国际聚焦中国、中亚、俄罗斯和欧洲方向的实际线路执行：少一点空泛承诺，多一点节点责任。",
      contactTitle: "联系丰吉国际",
      contactIntro: "发送货物信息或直接电话联系。第一轮回复应该是一条线路，而不是一份泛泛介绍。",
      newsTitle: "新闻洞察",
      newsIntro: "关注中亚通道、多式联运和供应链执行经验。",
    },
    detail: { overview: "概览", scenarios: "适用场景", execution: "执行要点", faq: "常见问题", timing: "参考时效", available: "可提供服务", emptyNews: "暂无文章。", minRead: "分钟阅读", routeLabel: "线路节点" },
    form: {
      name: "姓名", email: "邮箱", company: "公司", subject: "主题", message: "货物信息",
      namePlaceholder: "您的姓名", emailPlaceholder: "name@company.com", companyPlaceholder: "公司名称", subjectPlaceholder: "货物和目的地", messagePlaceholder: "货物类型、起运地、目的地、时效要求...",
      submit: "发送线路需求", sending: "发送中...", promise: "通常 24 小时内回复。",
      successTitle: "已发送", successText: "感谢留言，我们会尽快审核线路并回复。", errorTitle: "发送失败", errorText: "请稍后重试。",
    },
    footerLine: "连接中国、中亚、俄罗斯和欧洲的跨境物流执行伙伴。",
    rights: "保留所有权利",
    services: sharedServices.zh,
    cities: sharedCities.zh,
  },
  ru: {
    brand: "LandSea",
    company: "LandSea International Supply Chain Management",
    descriptor: "Логистика Центральной Азии",
    nav: { home: "Главная", services: "Услуги", regions: "Регионы", about: "О нас", news: "Новости", contact: "Контакты" },
    cta: { route: "Запросить маршрут", services: "Смотреть услуги", contact: "Связаться", read: "Читать", allNews: "Все материалы", backNews: "Назад к материалам" },
    home: {
      eyebrow: "Китай - Центральная Азия - Европа",
      title: "Исполнение логистики на коридорах, где задержка стоит дорого.",
      intro: "Ж/д, авто, таможня и обработка в пункте назначения между Китаем, Центральной Азией, Россией и Европой.",
      proof: ["Проверка графика по узлам", "Документы до передачи груза", "Локальные ресурсы по назначению"],
      metrics: [{ value: "10-12", label: "дней до ключевых ж/д узлов" }, { value: "6", label: "приоритетных городов" }, { value: "24h", label: "окно ответа по маршруту" }],
      servicesTitle: "Услуги вокруг рисков исполнения",
      servicesIntro: "Маршрут, документы, граница и локальная доставка собираются в один управляемый процесс.",
      networkTitle: "Один коридор, много ответственных узлов",
      networkIntro: "От Ляньюньгана и западных ж/д узлов Китая до Ташкента, Алматы и Бишкека каждая передача имеет владельца.",
      newsTitle: "Рынок и проекты",
      contactTitle: "Отправьте данные груза. Мы разложим маршрут.",
      contactIntro: "Тип груза, отправление, назначение и сроки достаточны для первой оценки.",
    },
    pages: {
      servicesTitle: "Услуги для контролируемого трансграничного исполнения",
      servicesIntro: "Три слоя: магистраль, мультимодальный дизайн и обработка в назначении.",
      processTitle: "Процесс проекта",
      process: ["Проверка груза", "Маршрут и ставка", "Бронирование", "Отслеживание", "Таможня и доставка", "Разбор"],
      regionsTitle: "Покрытие Центральной Азии",
      regionsIntro: "Ключевые города, ориентировочные сроки и локальные точки исполнения.",
      aboutTitle: "Команда для работы с коридорами, а не презентациями",
      aboutIntro: "LandSea фокусируется на практическом исполнении маршрутов между Китаем, Центральной Азией, Россией и Европой.",
      contactTitle: "Связаться с LandSea",
      contactIntro: "Отправьте данные груза или позвоните напрямую. Первый ответ должен быть маршрутом.",
      newsTitle: "Материалы",
      newsIntro: "Обновления по коридорам Центральной Азии, мультимодальным перевозкам и исполнению цепочек поставок.",
    },
    detail: { overview: "Обзор", scenarios: "Подходит для", execution: "Точки исполнения", faq: "Вопросы", timing: "Ориентир по срокам", available: "Доступные услуги", emptyNews: "Пока нет публикаций.", minRead: "мин чтения", routeLabel: "Узлы маршрута" },
    form: {
      name: "Имя", email: "Email", company: "Компания", subject: "Тема", message: "Данные груза",
      namePlaceholder: "Ваше имя", emailPlaceholder: "name@company.com", companyPlaceholder: "Компания", subjectPlaceholder: "Груз и направление", messagePlaceholder: "Тип груза, отправление, назначение, сроки...",
      submit: "Отправить запрос", sending: "Отправка...", promise: "Обычно отвечаем в течение 24 часов.",
      successTitle: "Запрос отправлен", successText: "Спасибо. Мы проверим маршрут и ответим.", errorTitle: "Ошибка отправки", errorText: "Попробуйте позже.",
    },
    footerLine: "Исполнение трансграничной логистики между Китаем, Центральной Азией, Россией и Европой.",
    rights: "Все права защищены",
    services: sharedServices.ru,
    cities: sharedCities.ru,
  },
  uz: {
    brand: "LandSea",
    company: "LandSea International Supply Chain Management",
    descriptor: "Markaziy Osiyo logistikasi",
    nav: { home: "Bosh sahifa", services: "Xizmatlar", regions: "Hududlar", about: "Biz haqimizda", news: "Yangiliklar", contact: "Aloqa" },
    cta: { route: "Yo'nalish so'rash", services: "Xizmatlarni ko'rish", contact: "Jamoa bilan aloqa", read: "O'qish", allNews: "Barcha materiallar", backNews: "Materiallarga qaytish" },
    home: {
      eyebrow: "Xitoy - Markaziy Osiyo - Yevropa",
      title: "Kechikish qimmatga tushadigan koridorlar uchun nazoratli logistika.",
      intro: "Xitoy, Markaziy Osiyo, Rossiya va Yevropa o'rtasida temir yo'l, avto, bojxona va manzil ishlovi.",
      proof: ["Grafik tugun bo'yicha tekshiriladi", "Hujjatlar topshirishdan oldin ko'riladi", "Mahalliy resurslar manzilga qarab tanlanadi"],
      metrics: [{ value: "10-12", label: "kun asosiy temir yo'l tugunlariga" }, { value: "6", label: "ustuvor shahar" }, { value: "24h", label: "yo'nalish javob oynasi" }],
      servicesTitle: "Ijro xavfiga qarab qurilgan xizmatlar",
      servicesIntro: "Yo'nalish, hujjat, chegara va mahalliy yetkazish bitta boshqariladigan jarayonga yig'iladi.",
      networkTitle: "Bitta koridor, ko'p javobgar tugun",
      networkIntro: "Lianyungang va Xitoy g'arbiy temir yo'l tugunlaridan Toshkent, Olmaota va Bishkekkacha har bir topshirishning egasi bor.",
      newsTitle: "Bozor va loyiha qaydlari",
      contactTitle: "Yuk ma'lumotlarini yuboring. Yo'nalishni tuzamiz.",
      contactIntro: "Yuk turi, jo'nash joyi, manzil va muddat birinchi ko'rib chiqish uchun yetarli.",
    },
    pages: {
      servicesTitle: "Nazoratli transchegaraviy ijro uchun xizmatlar",
      servicesIntro: "Uch qatlam: magistral tashuv, multimodal dizayn va manzil ijrosi.",
      processTitle: "Loyiha jarayoni",
      process: ["Yuk tekshiruvi", "Yo'nalish va narx", "Bron va yuklash", "Yo'lda kuzatuv", "Bojxona va yetkazish", "Tahlil"],
      regionsTitle: "Markaziy Osiyo qamrovi",
      regionsIntro: "Xitoy-Markaziy Osiyo yuklari uchun asosiy shaharlar, muddatlar va mahalliy ijro nuqtalari.",
      aboutTitle: "Koridor ishi uchun jamoa, taqdimot uchun emas",
      aboutIntro: "LandSea Xitoy, Markaziy Osiyo, Rossiya va Yevropa bo'ylab amaliy yo'nalish ijrosiga e'tibor beradi.",
      contactTitle: "LandSea bilan aloqa",
      contactIntro: "Yuk ma'lumotlarini yuboring yoki bevosita qo'ng'iroq qiling. Birinchi javob yo'nalish bo'lishi kerak.",
      newsTitle: "Materiallar",
      newsIntro: "Markaziy Osiyo koridorlari, multimodal yuk va ta'minot zanjiri ijrosi bo'yicha yangiliklar.",
    },
    detail: { overview: "Umumiy", scenarios: "Mos yuklar", execution: "Ijro nuqtalari", faq: "Savollar", timing: "Taxminiy muddat", available: "Mavjud xizmatlar", emptyNews: "Hozircha maqola yo'q.", minRead: "daq. o'qish", routeLabel: "Yo'nalish tugunlari" },
    form: {
      name: "Ism", email: "Email", company: "Kompaniya", subject: "Mavzu", message: "Yuk ma'lumotlari",
      namePlaceholder: "Ismingiz", emailPlaceholder: "name@company.com", companyPlaceholder: "Kompaniya", subjectPlaceholder: "Yuk va manzil", messagePlaceholder: "Yuk turi, jo'nash joyi, manzil, muddat...",
      submit: "Yo'nalish so'rovini yuborish", sending: "Yuborilmoqda...", promise: "Odatda 24 soat ichida javob beramiz.",
      successTitle: "So'rov yuborildi", successText: "Rahmat. Yo'nalishni ko'rib chiqib javob beramiz.", errorTitle: "Yuborilmadi", errorText: "Keyinroq qayta urinib ko'ring.",
    },
    footerLine: "Xitoy, Markaziy Osiyo, Rossiya va Yevropa uchun transchegaraviy logistika ijrosi.",
    rights: "Barcha huquqlar himoyalangan",
    services: sharedServices.uz,
    cities: sharedCities.uz,
  },
} as const

export type Copy = (typeof copy)[LanguageCode]

export function getCopy(language: LanguageCode) {
  return copy[language] || copy.en
}

export function getService(language: LanguageCode, slug: string) {
  return getCopy(language).services.find((service) => service.slug === slug)
}

export function getCity(language: LanguageCode, slug: string) {
  return getCopy(language).cities.find((city) => city.slug === slug)
}
