export const siteUrl = "https://www.modcv.com"
export const primaryBrand = "丰吉国际"
export const companyName = "丰吉国际供应链管理（江苏）有限公司"
export const englishName = "Fengji International Supply Chain"

export const languages = [
  { code: "zh", name: "Chinese", nativeName: "中文", shortName: "中" },
  { code: "en", name: "English", nativeName: "English", shortName: "EN" },
] as const

export type LanguageCode = (typeof languages)[number]["code"]
export type Language = (typeof languages)[number]

export const defaultLanguageCode: LanguageCode = "zh"

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
  if (normalized.startsWith("en")) return "en"
  return null
}

export function languageFromRegion(value: string | null | undefined): LanguageCode | null {
  if (!value) return null
  return ["CN", "HK", "MO", "TW", "SG"].includes(value.toUpperCase()) ? "zh" : null
}

export const serviceSlugs = ["central-asia-rail", "road-multimodal", "customs-warehouse-delivery"] as const
export type ServiceSlug = (typeof serviceSlugs)[number]

export const citySlugs = ["tashkent", "almaty", "bishkek", "moscow", "samarkand", "astana"] as const
export type CitySlug = (typeof citySlugs)[number]

export const contact = {
  phone: "+86 173 7493 2331",
  phoneHref: "+8617374932331",
  email: "renyizheng@landsea.cc",
  addressZh: "江苏连云港阳光国际大厦 C 座 2403",
  addressEn: "Room 2403, Building C, Sunshine International, Lianyungang, Jiangsu",
}

const services = {
  zh: [
    {
      slug: "central-asia-rail",
      icon: "train",
      title: "中亚铁路班列",
      short: "根据起运地、目的地、货量和时效要求，匹配合适的铁路口岸与班列计划。",
      summary: "根据起运地、目的地、货量和时效要求，匹配合适的铁路口岸与班列计划，协助处理订舱、装箱、单证和节点跟进。",
      bullets: ["起运地、目的地和货量确认", "铁路口岸与班列计划匹配", "订舱、装箱、单证和节点跟进"],
      scenarios: ["普货和工业品", "设备及零部件", "建材、消费品", "需要铁路衔接的批量货物"],
      faqs: [
        { q: "铁路班列是否一定比公路合适？", a: "不一定。需要结合货量、装卸条件、口岸情况和目的地交付要求判断。" },
        { q: "询价前要准备什么？", a: "建议提供起运地、目的地、品名、重量、体积、件数、包装方式和预计发运时间。" },
        { q: "能否确认具体时效？", a: "具体时效需按口岸、班列计划、货型和清关情况确认，不建议只按固定天数判断。" },
      ],
    },
    {
      slug: "road-multimodal",
      icon: "route",
      title: "跨境公路与多式联运",
      short: "针对项目货、机械设备、车辆、普货等不同货型，组合铁路、公路、海运等运输方式。",
      summary: "针对项目货、机械设备、车辆、普货等不同货型，组合铁路、公路、海运等运输方式，平衡时效、成本和交付风险。",
      bullets: ["按货型选择公路、铁路或组合方案", "关注装卸、加固、通关和目的地交付", "异常节点及时反馈和重新协调"],
      scenarios: ["项目货", "机械设备", "车辆及汽配", "需要多段衔接的贸易货物"],
      faqs: [
        { q: "多式联运主要解决什么问题？", a: "主要解决单一运输方式无法兼顾成本、时效、口岸和目的地派送的问题。" },
        { q: "项目货是否能提前评估？", a: "可以先根据尺寸、重量、装卸条件和目的地要求判断运输方式和风险点。" },
        { q: "是否可以做到门到门？", a: "部分线路可以安排，但需要先确认清关主体、目的地地址、车辆通行和派送资源。" },
      ],
    },
    {
      slug: "customs-warehouse-delivery",
      icon: "warehouse",
      title: "清关、仓储与目的国派送",
      short: "对接目的国清关、临时仓储、分拨和本地派送资源。",
      summary: "对接目的国清关、临时仓储、分拨和本地派送资源，减少货到口岸后无人跟进、单证反复修改等问题。",
      bullets: ["清关资料提前核对", "临时仓储和分拨协调", "目的国派送资源对接"],
      scenarios: ["需要目的国清关的货物", "到港后需暂存或分拨", "收货地址不在主要口岸", "资料需要提前复核的货物"],
      faqs: [
        { q: "为什么要提前核对清关资料？", a: "品名、贸易方式、收货主体和资料完整度都会影响目的国清关准备。" },
        { q: "仓储能做哪些配合？", a: "可按实际资源确认临时存放、分批分拨、贴标、换包装等操作。" },
        { q: "派送是否覆盖所有城市？", a: "需要按目的国、城市、货量和车型确认，不能一概承诺全境覆盖。" },
      ],
    },
  ],
  en: [
    {
      slug: "central-asia-rail",
      icon: "train",
      title: "Central Asia rail service",
      short: "Rail corridor review based on origin, destination, cargo volume and delivery requirements.",
      summary: "We review origin, destination, cargo volume and timing requirements before matching suitable rail gateways and train plans.",
      bullets: ["Cargo and route information check", "Rail gateway and schedule matching", "Booking, loading, document and node follow-up"],
      scenarios: ["General cargo", "Industrial goods", "Equipment and spare parts", "Batch shipments needing rail connection"],
      faqs: [
        { q: "Is rail always better than road?", a: "No. The route should be checked against cargo volume, loading conditions, border status and final delivery needs." },
        { q: "What should be prepared before inquiry?", a: "Origin, destination, cargo name, weight, volume, package type and expected shipping time are recommended." },
        { q: "Can transit time be confirmed directly?", a: "Transit time needs to be checked by gateway, schedule, cargo type and customs status." },
      ],
    },
    {
      slug: "road-multimodal",
      icon: "route",
      title: "Road and multimodal transport",
      short: "Rail, road and sea combinations for project cargo, machinery, vehicles and general cargo.",
      summary: "For project cargo, machinery, vehicles and general cargo, we combine rail, road and sea options to balance time, cost and delivery risk.",
      bullets: ["Transport mode selected by cargo type", "Loading, lashing, customs and final delivery review", "Exception follow-up by transport node"],
      scenarios: ["Project cargo", "Machinery", "Vehicles and auto parts", "Shipments requiring multiple handovers"],
      faqs: [
        { q: "What does multimodal transport solve?", a: "It helps when one transport mode cannot balance cost, timing, border status and final delivery." },
        { q: "Can project cargo be reviewed in advance?", a: "Yes. Size, weight, loading conditions and delivery requirements should be checked first." },
        { q: "Is door-to-door available?", a: "Some routes can support it after customs party, delivery address and local resources are confirmed." },
      ],
    },
    {
      slug: "customs-warehouse-delivery",
      icon: "warehouse",
      title: "Customs, storage and delivery",
      short: "Destination customs coordination, temporary storage, distribution and local delivery follow-up.",
      summary: "We coordinate destination customs, temporary storage, distribution and local delivery resources to reduce delays after cargo reaches the border or terminal.",
      bullets: ["Customs documents reviewed early", "Temporary storage and distribution coordination", "Local delivery resources checked by destination"],
      scenarios: ["Cargo requiring destination customs", "Cargo needing temporary storage", "Cargo delivered beyond main terminals", "Shipments needing document review"],
      faqs: [
        { q: "Why check customs documents early?", a: "Cargo name, trade mode, consignee and document completeness may affect destination customs preparation." },
        { q: "What storage work can be arranged?", a: "Temporary storage, staged dispatch, labeling or repacking can be checked by local resources." },
        { q: "Can delivery cover every city?", a: "Coverage needs to be confirmed by country, city, cargo volume and vehicle requirements." },
      ],
    },
  ],
} as const

const cities = {
  zh: [
    { slug: "tashkent", name: "塔什干", country: "乌兹别克斯坦", summary: "乌兹别克斯坦主要集散节点，适合消费品、设备、建材及项目货的铁路、公路衔接。" },
    { slug: "almaty", name: "阿拉木图", country: "哈萨克斯坦", summary: "哈萨克斯坦南部核心节点，可衔接中国西部口岸及中亚内陆分拨。" },
    { slug: "bishkek", name: "比什凯克", country: "吉尔吉斯斯坦", summary: "面向吉尔吉斯斯坦及周边市场的公路运输和本地交付节点。" },
    { slug: "moscow", name: "莫斯科 / 俄罗斯方向", country: "俄罗斯", summary: "适合中俄贸易货物、设备、汽配和电商类货物的铁路、公路及清关协同。" },
    { slug: "samarkand", name: "撒马尔罕", country: "乌兹别克斯坦", summary: "面向乌兹别克斯坦中部市场，适合普货、建材和小批量项目货分拨。" },
    { slug: "astana", name: "阿斯塔纳", country: "哈萨克斯坦", summary: "面向哈萨克斯坦中北部市场，常见于设备、工业品和项目类货物咨询。" },
  ],
  en: [
    { slug: "tashkent", name: "Tashkent", country: "Uzbekistan", summary: "A main distribution node in Uzbekistan for consumer goods, equipment, building materials and project cargo." },
    { slug: "almaty", name: "Almaty", country: "Kazakhstan", summary: "A core node in southern Kazakhstan, connecting western China gateways with inland Central Asia distribution." },
    { slug: "bishkek", name: "Bishkek", country: "Kyrgyzstan", summary: "A road transport and local delivery node for Kyrgyzstan and nearby markets." },
    { slug: "moscow", name: "Moscow / Russia corridor", country: "Russia", summary: "Suitable for China-Russia trade cargo, equipment, auto parts and e-commerce cargo requiring rail, road and customs coordination." },
    { slug: "samarkand", name: "Samarkand", country: "Uzbekistan", summary: "Supports central Uzbekistan distribution for general cargo, building materials and smaller project shipments." },
    { slug: "astana", name: "Astana", country: "Kazakhstan", summary: "Often reviewed for equipment, industrial goods and project cargo moving to central and northern Kazakhstan." },
  ],
} as const

export const copy = {
  zh: {
    brand: primaryBrand,
    company: companyName,
    englishName,
    descriptor: "中亚与跨境物流执行",
    nav: { home: "首页", services: "服务范围", regions: "线路区域", about: "关于我们", news: "业务笔记", contact: "联系咨询" },
    cta: { route: "咨询线路方案", services: "查看服务范围", contact: "联系咨询", read: "查看详情", allNews: "查看业务笔记", backNews: "返回业务笔记" },
    home: {
      eyebrow: "中国至中亚、俄罗斯、欧洲部分线路",
      title: "从中国到中亚，把每一段运输交接盯紧。",
      intro: "丰吉国际围绕中亚铁路班列、跨境公路、多式联运、清关与目的国派送，为货主、贸易商和项目客户提供可落地的物流执行方案。",
      proof: ["中亚铁路与公路线路咨询", "清关、仓储、派送协同", "货物信息确认后提供初步线路判断"],
      metrics: [
        { value: "线路咨询", label: "根据起运地、目的地和货型判断运输方式" },
        { value: "资料核对", label: "提前确认单证、包装和清关注意事项" },
        { value: "节点跟进", label: "围绕订舱、装箱、口岸和目的地交付跟进" },
      ],
      servicesTitle: "先把货物情况说清楚，再谈怎么走。",
      servicesIntro: "不同货型、口岸、清关主体和派送地址，会影响线路选择。我们更愿意先把限制条件讲明白，再给出可执行方案。",
      networkTitle: "常见咨询方向",
      networkIntro: "以下区域用于初步判断线路方向。具体方案需按口岸、班列、公路车辆、货型和清关情况确认。",
      newsTitle: "业务笔记",
      contactTitle: "把货物信息发来，我们先判断线路。",
      contactIntro: "信息越完整，线路判断越准确。首次咨询建议提供起运地、目的地、货物名称、重量体积、包装方式和期望时效。",
    },
    pages: {
      servicesTitle: "服务范围",
      servicesIntro: "围绕中国至中亚、俄罗斯、欧洲部分线路，提供铁路、公路、多式联运、清关协同、仓储分拨和目的国派送咨询与执行。",
      processTitle: "询价与执行流程",
      process: ["确认货物信息", "判断线路方向", "核对单证和包装", "确认报价口径", "安排订舱或车辆", "跟进节点和异常"],
      regionsTitle: "线路区域",
      regionsIntro: "区域页面用于说明常见物流方向，不写固定时效。具体时效需按口岸、班列、货型和清关情况确认。",
      aboutTitle: "我们更关注货物能不能按方案落地。",
      aboutIntro: "丰吉国际供应链管理（江苏）有限公司位于江苏连云港，业务围绕中国至中亚、俄罗斯、欧洲部分线路的跨境物流执行。我们不把每票货都说成标准产品，而是先确认货物、线路和交付条件。",
      contactTitle: "联系丰吉国际",
      contactIntro: "请尽量一次性提供完整货物信息。我们会根据起运地、目的地、货型和清关要求，给出初步线路判断。",
      newsTitle: "业务笔记",
      newsIntro: "这里记录一些实际询价和线路判断中经常遇到的问题，便于客户提前准备资料。",
    },
    detail: { overview: "服务说明", scenarios: "适用货物", execution: "执行要点", faq: "常见问题", timing: "时效说明", available: "可配合服务", emptyNews: "暂无业务笔记。", minRead: "分钟阅读", routeLabel: "线路节点", timingNote: "具体时效需按口岸、班列、货型和清关情况确认。" },
    form: {
      name: "姓名", contactMethod: "联系方式", company: "公司名称", origin: "起运地", destination: "目的地", cargoInfo: "货物信息", shippingTime: "预计发运时间",
      namePlaceholder: "您的姓名", contactPlaceholder: "手机 / 微信 / 邮箱", companyPlaceholder: "公司名称", originPlaceholder: "例如：连云港 / 西安 / 义乌", destinationPlaceholder: "例如：塔什干 / 阿拉木图 / 莫斯科", cargoPlaceholder: "请填写品名、件数、重量、体积、包装方式、是否需要清关/派送等。", shippingTimePlaceholder: "例如：本周 / 本月 / 具体日期",
      submit: "提交询价信息", sending: "提交中...", promise: "信息越完整，线路判断越准确。",
      successTitle: "询价信息已提交", successText: "我们会根据货物信息尽快做初步线路判断。", errorTitle: "提交失败", errorText: "请稍后重试，或直接电话/邮件联系。",
    },
    footerLine: "中国至中亚、俄罗斯、欧洲部分线路的跨境物流执行服务。",
    rights: "保留所有权利",
    services: services.zh,
    cities: cities.zh,
  },
  en: {
    brand: primaryBrand,
    company: companyName,
    englishName,
    descriptor: "Central Asia logistics execution",
    nav: { home: "Home", services: "Services", regions: "Regions", about: "About", news: "Notes", contact: "Contact" },
    cta: { route: "Ask about a route", services: "View services", contact: "Contact us", read: "Read more", allNews: "View notes", backNews: "Back to notes" },
    home: {
      eyebrow: "China to Central Asia, Russia and selected Europe routes",
      title: "For China-Central Asia cargo, every handover needs follow-up.",
      intro: "Fengji International Supply Chain works on rail, road, multimodal transport, customs coordination, warehousing and destination delivery for cargo owners, traders and project customers.",
      proof: ["Rail and road route review", "Customs, storage and delivery coordination", "Initial route advice after cargo information is confirmed"],
      metrics: [
        { value: "Route review", label: "Transport mode checked by origin, destination and cargo type" },
        { value: "Document check", label: "Documents, packing and customs points reviewed early" },
        { value: "Node follow-up", label: "Booking, loading, border and destination handovers tracked" },
      ],
      servicesTitle: "First clarify the cargo, then decide the route.",
      servicesIntro: "Cargo type, gateway, customs party and delivery address all affect route choice. We prefer to explain constraints before quoting a workable plan.",
      networkTitle: "Common route directions",
      networkIntro: "These regions are used for initial route review. Timing should be confirmed by gateway, schedule, cargo type and customs status.",
      newsTitle: "Business notes",
      contactTitle: "Send the cargo information. We will review the route first.",
      contactIntro: "Complete information makes route review more accurate: origin, destination, cargo name, weight, volume, packing and expected timing.",
    },
    pages: {
      servicesTitle: "Service scope",
      servicesIntro: "Rail, road, multimodal transport, customs coordination, storage, distribution and destination delivery for China-Central Asia, Russia and selected Europe routes.",
      processTitle: "Inquiry and execution flow",
      process: ["Check cargo information", "Review route direction", "Check documents and packing", "Confirm quote basis", "Arrange booking or vehicle", "Follow transport nodes"],
      regionsTitle: "Route regions",
      regionsIntro: "Region pages describe common logistics directions. Timing needs to be confirmed by gateway, schedule, cargo type and customs status.",
      aboutTitle: "We focus on whether cargo can be executed as planned.",
      aboutIntro: "Fengji International Supply Chain is based in Lianyungang, Jiangsu. Our work covers China to Central Asia, Russia and selected Europe routes. We check cargo, route and delivery conditions before giving a plan.",
      contactTitle: "Contact Fengji",
      contactIntro: "Please provide complete cargo information where possible. We will review the route based on origin, destination, cargo type and customs requirements.",
      newsTitle: "Business notes",
      newsIntro: "Short notes based on common questions in route inquiry and cargo preparation.",
    },
    detail: { overview: "Service note", scenarios: "Suitable cargo", execution: "Execution points", faq: "Common questions", timing: "Timing note", available: "Available support", emptyNews: "No notes yet.", minRead: "min read", routeLabel: "Route nodes", timingNote: "Timing needs to be confirmed by gateway, schedule, cargo type and customs status." },
    form: {
      name: "Name", contactMethod: "Contact", company: "Company", origin: "Origin", destination: "Destination", cargoInfo: "Cargo information", shippingTime: "Expected shipping time",
      namePlaceholder: "Your name", contactPlaceholder: "Phone / WeChat / email", companyPlaceholder: "Company name", originPlaceholder: "e.g. Lianyungang / Xi'an / Yiwu", destinationPlaceholder: "e.g. Tashkent / Almaty / Moscow", cargoPlaceholder: "Cargo name, pieces, weight, volume, packing, customs/delivery needs.", shippingTimePlaceholder: "e.g. this week / this month / date",
      submit: "Submit inquiry", sending: "Submitting...", promise: "More complete information helps route review.",
      successTitle: "Inquiry submitted", successText: "We will review the cargo information and route.", errorTitle: "Submit failed", errorText: "Please try again later or contact us directly.",
    },
    footerLine: "Cross-border logistics execution for China to Central Asia, Russia and selected Europe routes.",
    rights: "All rights reserved",
    services: services.en,
    cities: cities.en,
  },
} as const

export type Copy = (typeof copy)[LanguageCode]

export function getCopy(language: LanguageCode) {
  return copy[language] || copy.zh
}

export function getService(language: LanguageCode, slug: string) {
  return getCopy(language).services.find((service) => service.slug === slug)
}

export function getCity(language: LanguageCode, slug: string) {
  return getCopy(language).cities.find((city) => city.slug === slug)
}
