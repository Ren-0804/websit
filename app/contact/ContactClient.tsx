"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-selector"

const translations = {
    zh: {
        breadcrumbs: { home: "首页", current: "联系我们" },
        title: "联系我们",
        inquiries: "有意者请联系：",
        wechatSame: "（微信同号）",
        quotePrompt: "请填写下表获取专属报价"
    },
    en: {
        breadcrumbs: { home: "Home", current: "Contact Us" },
        title: "Contact Us",
        inquiries: "For inquiries please contact:",
        wechatSame: " (WeChat ID same)",
        quotePrompt: "Please fill out the form below for an exclusive quote"
    },
    ru: {
        breadcrumbs: { home: "Главная", current: "Контакты" },
        title: "Контакты",
        inquiries: "Для запросов, пожалуйста, свяжитесь:",
        wechatSame: " (WeChat тот же)",
        quotePrompt: "Пожалуйста, заполните форму ниже для получения специального предложения"
    },
    uz: {
        breadcrumbs: { home: "Asosiy", current: "Aloqa" },
        title: "Aloqa",
        inquiries: "So'rovlar uchun murojaat qiling:",
        wechatSame: " (WeChat bir xil)",
        quotePrompt: "Maxsus taklif olish uchun quyidagi shaklni to'ldiring"
    }
} as const

export default function ContactClient() {
    const { currentLanguage } = useLanguage()
    const t = translations[currentLanguage.code as keyof typeof translations] || translations.en

    return (
        <div className="container py-12 mx-auto">
            <nav className="px-4 text-sm text-gray-600">
                <ol className="flex items-center space-x-2">
                    <li><Link href="/">{t.breadcrumbs.home}</Link></li>
                    <li>/</li>
                    <li>{t.breadcrumbs.current}</li>
                </ol>
            </nav>

            <main className="container mx-auto py-12 bg-gray-100 rounded-lg shadow-md p-8 mt-4">
                <h1 className="text-4xl font-bold mb-8 text-blue-600">{t.title}</h1>
                <p className="text-gray-700 mb-4">{t.inquiries}</p>
                <p className="text-gray-700 mb-4">Telegram: @akoozh</p>
                <p className="text-gray-700 mb-4">13776598380{t.wechatSame}</p>
                <p className="text-gray-700 mb-4">17374032331{t.wechatSame}</p>
            </main>
            <p className="mt-4 text-muted-foreground">{t.quotePrompt}</p>
        </div>
    )
}
