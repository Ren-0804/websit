"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-selector"

const translations = {
    zh: {
        breadcrumbs: { home: "首页", current: "全球网络" },
        title: "物流网络",
        content: [
            "物流网络布局：我们的物流网络覆盖了全国各地，能够为客户提供快速、准确的物流服务。",
            "主要节点：包含多个重要城市与口岸，确保货物能够高效流转。",
            "合作关系：与多家知名企业建立了长期稳定的合作关系，共同提升物流服务质量。"
        ],
        subHeading: "中亚核心城市直达",
        cardText: "查看本地化服务与FAQ"
    },
    en: {
        breadcrumbs: { home: "Home", current: "Global Network" },
        title: "Logistics Network",
        content: [
            "Network Layout: Our logistics network covers key nodes in China and Central Asia, providing fast and accurate services.",
            "Key Nodes: Including major cities and ports, ensuring efficient cargo flow.",
            "Partnerships: Established long-term stable partnerships with many renowned enterprises to improve service quality."
        ],
        subHeading: "Direct to Central Asia Core Cities",
        cardText: "View localized services and FAQ"
    },
    ru: {
        breadcrumbs: { home: "Главная", current: "Глобальная сеть" },
        title: "Логистическая сеть",
        content: [
            "Структура сети: Наша логистическая сеть охватывает ключевые узлы в Китае и Центральной Азии.",
            "Ключевые узлы: Включая крупные города и порты, обеспечивая эффективный грузопоток.",
            "Партнерство: Установлены долгосрочные стабильные партнерские отношения с многими известными предприятиями."
        ],
        subHeading: "Прямые рейсы в города Центральной Азии",
        cardText: "Смотреть услуги и FAQ"
    },
    uz: {
        breadcrumbs: { home: "Asosiy", current: "Global Tarmoq" },
        title: "Logistika Tarmog'i",
        content: [
            "Tarmoq tuzilishi: Bizning logistika tarmog'imiz Xitoy va Markaziy Osiyodagi asosiy tugunlarni qamrab oladi.",
            "Asosiy tugunlar: Yirik shaharlar va portlarni o'z ichiga oladi, yuk oqimini ta'minlaydi.",
            "Hamkorlik: Ko'plab taniqli korxonalar bilan uzoq muddatli barqaror hamkorlik aloqalari o'rnatilgan."
        ],
        subHeading: "Markaziy Osiyo shaharlariga to'g'ridan-to'g'ri",
        cardText: "Xizmatlar va FAQni ko'rish"
    }
} as const

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

export default function NetworkClient() {
    const { currentLanguage } = useLanguage()
    const langCode = currentLanguage.code as keyof typeof translations
    const t = translations[langCode] || translations.en
    const cities = cityTranslations[langCode] || cityTranslations.en

    const cityList = [
        "tashkent", "samarkand", "almaty", "astana", "bishkek", "dushanbe"
    ] as const

    return (
        <div className="container py-12 mx-auto">
            <nav className="px-4 text-sm text-gray-600">
                <ol className="flex items-center space-x-2">
                    <li><Link href="/">{t.breadcrumbs.home}</Link></li>
                    <li>/</li>
                    <li>{t.breadcrumbs.current}</li>
                </ol>
            </nav>

            <div className="text-center mt-8">
                <h1 className="text-4xl font-bold mb-8 text-blue-600">{t.title}</h1>
                {t.content.map((p, i) => (
                    <p key={i} className="text-gray-700 mb-4">{p}</p>
                ))}

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.subHeading}</h2>
                    <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {cityList.map((slug) => (
                            <Link key={slug} href={`/regions/${slug}`} className="p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-sm transition-all">
                                <div className="font-medium text-gray-900">{cities[slug]}</div>
                                <div className="text-sm text-gray-600">{t.cardText}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
