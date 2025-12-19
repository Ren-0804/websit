"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-selector"

const translations = {
    zh: {
        breadcrumbs: { home: "首页", current: "区域" },
        title: "中亚区域覆盖",
        subtitle: "选择城市查看本地化物流服务、参考时效与常见问题。",
        cardDesc: "物流服务、参考时效与FAQ"
    },
    en: {
        breadcrumbs: { home: "Home", current: "Regions" },
        title: "Central Asia Region Coverage",
        subtitle: "Select a city to view localized logistics services, reference transit times and FAQs.",
        cardDesc: "Logistics Services, Transit Times and FAQ"
    },
    ru: {
        breadcrumbs: { home: "Главная", current: "Регионы" },
        title: "Покрытие в Центральной Азии",
        subtitle: "Выберите город для просмотра локализованных логистических услуг, сроков доставки и часто задаваемых вопросов.",
        cardDesc: "Логистические услуги, Сроки пересылки и FAQ"
    },
    uz: {
        breadcrumbs: { home: "Asosiy", current: "Hududlar" },
        title: "Markaziy Osiyo hududi qamrovi",
        subtitle: "Mahalliylashtirilgan logistika xizmatlari, tranzit vaqtlari va FAQ'ni ko'rish uchun shaharni tanlang.",
        cardDesc: "Logistika xizmatlari, Tranzit vaqtlari va FAQ"
    }
} as const

// City names usually need separate translation or just English/Local variations
const cityTranslations = {
    zh: {
        tashkent: "塔什干（乌兹别克斯坦）",
        samarkand: "撒马尔罕（乌兹别克斯坦）",
        almaty: "阿拉木图（哈萨克斯坦）",
        astana: "阿斯塔纳（哈萨克斯坦）",
        bishkek: "比什凯克（吉尔吉斯斯坦）",
        dushanbe: "杜尚别（塔吉克斯坦）"
    },
    en: {
        tashkent: "Tashkent (Uzbekistan)",
        samarkand: "Samarkand (Uzbekistan)",
        almaty: "Almaty (Kazakhstan)",
        astana: "Astana (Kazakhstan)",
        bishkek: "Bishkek (Kyrgyzstan)",
        dushanbe: "Dushanbe (Tajikistan)"
    },
    ru: {
        tashkent: "Ташкент (Узбекистан)",
        samarkand: "Самарканд (Узбекистан)",
        almaty: "Алматы (Казахстан)",
        astana: "Астана (Казахстан)",
        bishkek: "Бишкек (Кыргызстан)",
        dushanbe: "Душанбе (Таджикистан)"
    },
    uz: {
        tashkent: "Toshkent (O'zbekiston)",
        samarkand: "Samarqand (O'zbekiston)",
        almaty: "Olmaota (Qozog'iston)",
        astana: "Ostona (Qozog'iston)",
        bishkek: "Bishkek (Qirg'iziston)",
        dushanbe: "Dushanbe (Tojikiston)"
    }
} as const

const citySlugs = ["tashkent", "samarkand", "almaty", "astana", "bishkek", "dushanbe"] as const

export default function RegionsClient() {
    const { currentLanguage } = useLanguage()
    const langCode = currentLanguage.code as keyof typeof translations
    const t = translations[langCode] || translations.en
    const cities = cityTranslations[langCode] || cityTranslations.en

    return (
        <div className="min-h-screen">
            <nav className="container mx-auto px-4 pt-6 text-sm text-gray-600">
                <ol className="flex items-center space-x-2">
                    <li><Link href="/">{t.breadcrumbs.home}</Link></li>
                    <li>/</li>
                    <li>{t.breadcrumbs.current}</li>
                </ol>
            </nav>

            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">{t.title}</h1>
                    <p className="text-gray-600 mb-12">{t.subtitle}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {citySlugs.map((slug) => (
                            <Link key={slug} href={`/regions/${slug}`} className="p-6 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all">
                                <div className="font-bold text-gray-900">{cities[slug]}</div>
                                <div className="text-gray-600 mt-2">{t.cardDesc}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
