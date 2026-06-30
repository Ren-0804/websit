"use client"

import { ArrowRight, ClipboardCheck, Mail, MapPin, Phone, Route, Warehouse } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { useLanguage } from "@/components/language-selector"
import { contact, getCopy } from "@/lib/i18n"

export default function ContactClient() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code)
  const isZh = currentLanguage.code === "zh"
  const deskItems = [
    { icon: Phone, label: isZh ? "电话" : "Phone", value: contact.phone, href: `tel:${contact.phoneHref}` },
    { icon: Mail, label: isZh ? "邮箱" : "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: isZh ? "地址" : "Address", value: isZh ? contact.addressZh : contact.addressEn },
  ]
  const handoff = isZh
    ? [
        { icon: ClipboardCheck, title: "先核对货物信息", text: "品名、件数、重量体积、包装和是否需要清关派送。" },
        { icon: Route, title: "再判断线路方向", text: "按起运地、目的地、口岸和货型确认铁路、公路或组合方案。" },
        { icon: Warehouse, title: "说明落地条件", text: "涉及仓储、分拨、派送的，先把目的国执行边界说清楚。" },
      ]
    : [
        { icon: ClipboardCheck, title: "Check cargo details", text: "Cargo name, pieces, weight, volume, packing and customs or delivery needs." },
        { icon: Route, title: "Review route direction", text: "Rail, road or combined route is reviewed by origin, destination and cargo type." },
        { icon: Warehouse, title: "Confirm delivery conditions", text: "Storage, distribution and destination delivery need local resource confirmation." },
      ]

  return (
    <main className="min-h-screen bg-[#f4efe5] pt-20 text-[#101820]">
      <section className="border-b border-[#d8d1c5] bg-[#f4efe5]">
        <div className="container py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="site-eyebrow">{t.nav.contact}</div>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">{t.pages.contactTitle}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#4f565a]">{t.pages.contactIntro}</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#d8d1c5] bg-[#d8d1c5] md:grid-cols-3">
              {handoff.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="bg-[#fbfaf7] p-5">
                    <Icon className="h-5 w-5 text-[#b3262f]" />
                    <div className="mt-4 text-sm font-semibold text-[#101820]">{item.title}</div>
                    <p className="mt-2 text-sm leading-6 text-[#5b6266]">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="border border-[#d8d1c5] bg-[#101820] p-6 text-white md:p-7">
              <div className="site-eyebrow text-[#e05a62]">{isZh ? "联系窗口" : "Operations desk"}</div>
              <h2 className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">
                {isZh ? "先发货物信息，再判断怎么走。" : "Send cargo details first, then review the route."}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/62">{t.home.contactIntro}</p>
              <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
                {deskItems.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <span className="grid grid-cols-[1.5rem_1fr] gap-3 py-4">
                      <Icon className="mt-0.5 h-5 w-5 text-[#e05a62]" />
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/38">{item.label}</span>
                        <span className="mt-1 block break-words text-sm font-semibold leading-6 text-white">{item.value}</span>
                      </span>
                    </span>
                  )
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block hover:bg-white/[0.04]">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  )
                })}
              </div>
              <div className="mt-7 border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/65">
                {isZh ? "首次咨询不需要写长方案，把起运地、目的地、货物名称、重量体积和期望时间发来即可。" : "For a first inquiry, origin, destination, cargo name, weight, volume and expected timing are enough to start."}
              </div>
            </aside>

            <div className="border border-[#d8d1c5] bg-[#fbfaf7] p-5 md:p-7">
              <div className="mb-6 flex flex-col gap-3 border-b border-[#d8d1c5] pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="site-eyebrow">{isZh ? "线路询价" : "Route inquiry"}</div>
                  <h2 className="mt-2 text-2xl font-semibold leading-snug md:text-3xl">{isZh ? "填写基础货物信息" : "Basic cargo information"}</h2>
                </div>
                <div className="hidden items-center gap-2 text-sm font-semibold text-[#b3262f] md:flex">
                  {isZh ? "收到后按线路反馈" : "Reviewed by route"}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
