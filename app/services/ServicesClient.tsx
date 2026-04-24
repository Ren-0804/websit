"use client"

import { ArrowRight, CheckCircle2, Container, FileCheck2, Globe2, Train, Warehouse } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-selector"

const copy = {
  zh: {
    eyebrow: "Service Capabilities",
    title: "围绕跨境运输结果设计服务",
    intro: "丰吉国际的服务重点放在执行稳定性。我们把线路、清关、仓储和交付组织成可以跟踪、可以响应、可以复盘的项目流程。",
    cta: "讨论我的货物",
    cards: [
      {
        title: "中亚铁路班列",
        text: "适用于对时效和成本都有要求的集装箱货物，覆盖塔什干、阿拉木图、撒马尔罕等节点。",
        points: ["固定铁路节点", "班列计划协调", "集装箱状态跟踪"],
        icon: Train,
      },
      {
        title: "跨境多式联运",
        text: "根据起运地、目的国和货物属性组合铁路、公路、海运和口岸资源。",
        points: ["门到门方案", "项目货执行", "异常节点响应"],
        icon: Globe2,
      },
      {
        title: "清关与仓储",
        text: "协调目的国清关、本地仓储、分拨配送和客户交付。",
        points: ["资料审核", "本地团队对接", "仓储与分拨"],
        icon: Warehouse,
      },
    ],
    processTitle: "项目执行流程",
    process: ["货物信息确认", "线路和报价设计", "订舱与装箱", "在途跟踪", "清关交付", "复盘优化"],
  },
  en: {
    eyebrow: "Service Capabilities",
    title: "Services designed around transport outcomes",
    intro: "LandSea focuses on execution stability. Routes, customs, warehousing, and delivery are organized into trackable project flows.",
    cta: "Discuss My Cargo",
    cards: [
      {
        title: "Central Asia Block Train",
        text: "For container freight that needs a balanced mix of timing and cost across Tashkent, Almaty, Samarkand, and nearby nodes.",
        points: ["Fixed rail nodes", "Departure coordination", "Container status tracking"],
        icon: Train,
      },
      {
        title: "Cross-border Multimodal",
        text: "Rail, road, ocean, and border resources combined by origin, destination, cargo profile, and timing.",
        points: ["Door-to-door planning", "Project cargo execution", "Exception response"],
        icon: Globe2,
      },
      {
        title: "Customs and Warehousing",
        text: "Destination customs, local warehousing, distribution, and delivery coordination.",
        points: ["Document review", "Local team coordination", "Storage and distribution"],
        icon: Warehouse,
      },
    ],
    processTitle: "Project Flow",
    process: ["Cargo review", "Route and quote", "Booking and loading", "In-transit tracking", "Customs and delivery", "Review and improve"],
  },
} as const

export default function ServicesClient() {
  const { currentLanguage } = useLanguage()
  const t = currentLanguage.code === "zh" ? copy.zh : copy.en

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 pt-36 text-white">
        <Image src="/service-1.jpg" alt="Rail freight containers" fill className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="container relative pb-20">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e44b52]">{t.eyebrow}</div>
            <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">{t.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">{t.intro}</p>
            <Button asChild className="mt-9 rounded-full bg-[#c91f28] px-7 py-6 text-base font-semibold text-white hover:bg-[#a71921]">
              <Link href="/#contact">
                {t.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-3">
            {t.cards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <card.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-7 text-2xl font-semibold text-slate-950">{card.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.text}</p>
                <div className="mt-7 space-y-3">
                  {card.points.map((point) => (
                    <div key={point} className="flex gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#c91f28]" />
                      {point}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c91f28]">Workflow</div>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950">{t.processTitle}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {t.process.map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="font-semibold text-slate-950">{step}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Container, label: "Container visibility" },
              { icon: FileCheck2, label: "Document discipline" },
              { icon: Warehouse, label: "Destination handling" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 p-6">
                <item.icon className="h-6 w-6 text-[#c91f28]" />
                <div className="mt-4 text-lg font-semibold text-slate-950">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
