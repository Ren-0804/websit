"use client"

import { ArrowRight, ChevronRight, Globe, MapPin, Truck, Phone, Mail, Container, Train, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Email from "smtpjs";
import { toast } from "@/components/ui/use-toast";
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  // Use original translations for now
  const translations = {
    zh: {
      hero: {
        title: "丰吉国际供应链管理有限公司",
        subtitle: "您值得信赖的国际运输合作伙伴",
        cta: "开始",
        contactUs: "联系我们"
      },
      services: {
        title: "我们的服务",
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
        ]
      },
      network: {
        title: "全球战略布局",
        subtitle: "我们在关键物流枢纽战略性布局办事处，提供跨大陆的无缝服务。"
      },
      contact: {
        title: "联系我们",
        subtitle: "与我们的团队联系，讨论您的国际物流需求，了解我们如何帮助优化您的供应链。"
      }
    }
  }

  const t = translations.zh

  // 结构化数据
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
      {/* Hero Section - Enhanced Modern Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0 z-0">
          {/* Main background image */}
          <Image
            src="/logistics-background.jpg"
            alt="国际物流与运输网络"
            fill
            className="object-cover"
            priority
            quality={100}
          />

          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/85 to-indigo-900/95"></div>

          {/* Animated overlay pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 z-10 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 py-32 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full text-blue-100 text-sm font-medium mb-8 border border-white/20 shadow-2xl animate-fade-in-up">
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-md"></div>
                <Train className="relative h-4 w-4 mr-3" />
              </div>
              <span className="mr-3">{t.services.items[0].title}</span>
              <ChevronRight className="h-4 w-4 animate-bounce" />
            </div>

            {/* Enhanced logo */}
            <div className="flex justify-center mb-8 animate-fade-in-up delay-100">
              <div className="relative group">
                <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-xl group-hover:bg-white/30 transition-all duration-500"></div>
                <div className="relative h-20 w-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <div className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-700 font-black text-4xl">丰</div>
                </div>
              </div>
            </div>

            {/* Main heading with enhanced typography */}
            <div className="animate-fade-in-up delay-200">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                <span className="block">{t.hero.title.split('国际')[0]}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                  {t.hero.title.includes('国际') ? '国际' : ''}{t.hero.title.split('国际')[1] || ''}
                </span>
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl text-blue-100/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-300">
              <Link href="/services">
                <Button size="lg" className="group bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                  <span className="mr-3">{t.hero.cta}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="mailto:renyizheng@landsea.cc">
                <Button
                  size="lg"
                  variant="outline"
                  className="group bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300"
                >
                  <span className="mr-3">{t.contact.title}</span>
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 animate-fade-in-up delay-500">
            {t.services.items.map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-lg group-hover:from-blue-600/40 group-hover:to-indigo-600/40 transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-white hover:bg-white/15 transition-all duration-500 group-hover:scale-105">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-white/10 rounded-xl blur-md group-hover:bg-white/20 transition-colors duration-300"></div>
                    <div className="relative bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                      {service.icon === "train" && <Train className="h-7 w-7 text-blue-100" />}
                      {service.icon === "container" && <Container className="h-7 w-7 text-blue-100" />}
                      {service.icon === "consulting" && <BarChart3 className="h-7 w-7 text-blue-100" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-100 transition-colors duration-300">{service.title}</h3>
                  <p className="text-blue-100/80 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Services Section - Modern Design */}
      <section className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-blue-700 mb-8 border border-blue-200/50 backdrop-blur-sm">
              <div className="relative mr-3">
                <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"></div>
                <Truck className="relative h-5 w-5" />
              </div>
              {t.services.title}
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              <span className="block">{t.services.title.split('服务')[0]}</span>
              <span className="block text-gradient">{t.services.title.includes('服务') ? '服务' : ''}</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t.services.subtitle}
            </p>
          </div>

          {/* Modern service cards */}
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <div key={index} className="group relative animate-fade-in-up delay-100">
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-lg group-hover:from-blue-600/40 group-hover:via-indigo-600/40 group-hover:to-purple-600/40 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 hover:bg-white transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
                  </div>

                  {/* Top accent line */}
                  <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  {/* Image container */}
                  <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
                    <Image
                      src={`/service-${index + 1}.jpg`}
                      alt={service.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      quality={90}
                    />
                  </div>

                  {/* Floating icon */}
                  <div className="relative mb-8">
                    <div className="absolute -inset-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {service.icon === "train" && <Train className="h-8 w-8 text-white" />}
                      {service.icon === "container" && <Container className="h-8 w-8 text-white" />}
                      {service.icon === "consulting" && <BarChart3 className="h-8 w-8 text-white" />}
                    </div>
                  </div>

                  <div className="relative">
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-gradient transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-8 min-h-[4rem]">
                      {service.description}
                    </p>

                    {/* Enhanced CTA */}
                    <div className="pt-6 border-t border-gray-100">
                      <Link
                        href="/services"
                        className="group/link inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300"
                      >
                        <span className="mr-3">{t.hero.cta}</span>
                        <div className="relative">
                          <ArrowRight className="h-5 w-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                          <div className="absolute -inset-2 bg-blue-600/20 rounded-full scale-0 group-hover/link:scale-100 transition-transform duration-300"></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 animate-fade-in-up delay-300">
            <Link href="/services">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                查看全部服务
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Network Section - Interactive Design */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-blue-700 mb-8 border border-blue-200/50 backdrop-blur-sm">
              <div className="relative mr-3">
                <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"></div>
                <Globe className="relative h-5 w-5" />
              </div>
              {t.network.title}
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              <span className="block">全球战略</span>
              <span className="block text-gradient">布局网络</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t.network.subtitle}
            </p>
          </div>

          {/* Interactive Map */}
          <div className="max-w-6xl mx-auto animate-fade-in-up delay-200">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:from-blue-600/30 group-hover:via-indigo-600/30 group-hover:to-purple-600/30 transition-all duration-500"></div>

              <div className="relative bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl overflow-hidden">
                {/* Map container */}
                <div className="relative aspect-[21/9] w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl overflow-hidden">
                  {/* Map background image */}
                  <Image
                    src="/route-map.jpg"
                    alt="全球网络地图"
                    fill
                    className="object-cover opacity-20"
                    quality={90}
                  />

                  {/* Animated route lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#6366F1" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>

                    {/* Route lines with animation */}
                    <path
                      d="M 75 42 Q 60 38 45 35"
                      stroke="url(#routeGradient)"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,1"
                      className="animate-pulse"
                    />
                    <path
                      d="M 70 45 L 55 32"
                      stroke="url(#routeGradient)"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,1"
                      className="animate-pulse delay-500"
                    />
                  </svg>

                  {/* Enhanced location markers */}
                  {[
                    {
                      name: "塔什干",
                      nameEn: "Tashkent",
                      left: "45%",
                      top: "35%",
                      delay: "delay-0",
                      status: "active"
                    },
                    {
                      name: "撒马尔罕",
                      nameEn: "Samarkand",
                      left: "48%",
                      top: "38%",
                      delay: "delay-100",
                      status: "active"
                    },
                    {
                      name: "阿拉木图",
                      nameEn: "Almaty",
                      left: "55%",
                      top: "32%",
                      delay: "delay-200",
                      status: "active"
                    },
                    {
                      name: "连云港",
                      nameEn: "Lianyungang",
                      left: "75%",
                      top: "42%",
                      delay: "delay-300",
                      status: "hub"
                    },
                    {
                      name: "西安",
                      nameEn: "Xi'an",
                      left: "70%",
                      top: "45%",
                      delay: "delay-400",
                      status: "active"
                    },
                    {
                      name: "义乌",
                      nameEn: "Yiwu",
                      left: "78%",
                      top: "48%",
                      delay: "delay-500",
                      status: "active"
                    },
                    {
                      name: "青岛",
                      nameEn: "Qingdao",
                      left: "80%",
                      top: "40%",
                      delay: "delay-700",
                      status: "active"
                    },
                  ].map((location, index) => (
                    <div
                      key={location.name}
                      className={`absolute ${location.delay} animate-fade-in-up`}
                      style={{ left: location.left, top: location.top }}
                    >
                      <div className="group relative">
                        {/* Animated ping for hub locations */}
                        {location.status === 'hub' && (
                          <div className="absolute -inset-3 bg-blue-500/30 rounded-full animate-ping"></div>
                        )}

                        {/* Marker */}
                        <div className={`relative h-5 w-5 rounded-full flex items-center justify-center transform group-hover:scale-125 transition-all duration-300 cursor-pointer ${
                          location.status === 'hub'
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/50'
                            : 'bg-blue-500 shadow-md shadow-blue-500/30'
                        }`}>
                          <div className="h-2 w-2 bg-white rounded-full"></div>

                          {/* Hover effect */}
                          <div className="absolute -inset-2 bg-blue-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        </div>

                        {/* Enhanced tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl border border-blue-100 min-w-[120px] text-center">
                            <div className="font-bold text-gray-900 text-sm">{location.name}</div>
                            <div className="text-xs text-blue-600 font-medium">{location.nameEn}</div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/95 backdrop-blur-sm border-l border-b border-blue-100 rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-3 h-3 bg-indigo-400/30 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute bottom-6 left-12 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
                </div>

                {/* Map legend */}
                <div className="mt-8 flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg"></div>
                    <span className="text-sm text-gray-600 font-medium">主要枢纽</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 bg-blue-500 rounded-full shadow-md"></div>
                    <span className="text-sm text-gray-600 font-medium">运营站点</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-0.5 w-6 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    <span className="text-sm text-gray-600 font-medium">运输路线</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { number: "50+", label: "覆盖城市", en: "Cities Covered" },
                { number: "7", label: "运营国家", en: "Countries" },
                { number: "24/7", label: "全天候服务", en: "Service" }
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fade-in-up delay-100">
                  <div className="text-5xl font-black text-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Modern Design */}
      <section id="contact" className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                <span className="block">联系</span>
                <span className="block text-gradient">我们</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                {t.contact.subtitle}
              </p>
            </div>

            {/* Modern contact card */}
            <div className="relative group animate-fade-in-up delay-200">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:from-blue-600/20 group-hover:via-indigo-600/20 group-hover:to-purple-600/20 transition-all duration-500"></div>

              <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-5">
                  {/* Left side - Contact info */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 text-white relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
                      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
                    </div>

                    <div className="relative z-10">
                      {/* Logo */}
                      <div className="h-16 w-16 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                        <div className="text-white font-black text-3xl">丰</div>
                      </div>

                      <h3 className="text-3xl font-black mb-4">立即联系</h3>
                      <p className="text-blue-100 mb-12 leading-relaxed">
                        我们的专业团队随时准备为您提供国际物流解决方案
                      </p>

                      {/* Contact items */}
                      <div className="space-y-8">
                        <div className="group/item">
                          <div className="flex items-start">
                            <div className="mt-1 mr-5 h-12 w-12 flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover/item:bg-white/20 group-hover/item:scale-110 transition-all duration-300">
                              <Phone className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-blue-100 mb-2 font-medium">电话 / 微信</p>
                              <p className="font-bold text-lg group-hover/item:text-blue-100 transition-colors duration-300">
                                +86 17374932331
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group/item">
                          <div className="flex items-start">
                            <div className="mt-1 mr-5 h-12 w-12 flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover/item:bg-white/20 group-hover/item:scale-110 transition-all duration-300">
                              <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-blue-100 mb-2 font-medium">总部地址</p>
                              <p className="font-bold group-hover/item:text-blue-100 transition-colors duration-300">
                                中国江苏省连云港市
                              </p>
                              <p className="text-sm text-blue-200 mt-1">
                                阳光国际大厦C座2403室
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group/item">
                          <div className="flex items-start">
                            <div className="mt-1 mr-5 h-12 w-12 flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover/item:bg-white/20 group-hover/item:scale-110 transition-all duration-300">
                              <Mail className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-blue-100 mb-2 font-medium">邮箱地址</p>
                              <p className="font-bold text-lg group-hover/item:text-blue-100 transition-colors duration-300">
                                renyizheng@landsea.cc
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Business hours */}
                      <div className="mt-12 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                        <p className="text-sm text-blue-100 mb-1">营业时间</p>
                        <p className="font-bold">周一至周日 24小时</p>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Contact form */}
                  <div className="lg:col-span-3 p-12">
                    <div className="mb-8">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">发送消息</h4>
                      <p className="text-gray-600">填写下方表单，我们将在24小时内回复您</p>
                    </div>

                    <ContactForm />

                    {/* Additional info */}
                    <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>我们通常在2小时内回复</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>支持多语言服务</span>
                        <div className="flex space-x-1">
                          <span className="text-xs">🇨🇳</span>
                          <span className="text-xs">🇺🇸</span>
                          <span className="text-xs">🇷🇺</span>
                          <span className="text-xs">🇺🇿</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick contact buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Phone,
                  label: "电话咨询",
                  value: "+86 17374932331",
                  href: "tel:+8617374932331",
                  gradient: "from-blue-600 to-blue-700"
                },
                {
                  icon: Mail,
                  label: "邮件联系",
                  value: "发送邮件",
                  href: "mailto:renyizheng@landsea.cc",
                  gradient: "from-indigo-600 to-purple-600"
                },
                {
                  icon: MapPin,
                  label: "总部地址",
                  value: "江苏连云港",
                  href: "#",
                  gradient: "from-purple-600 to-pink-600"
                }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group relative block animate-fade-in-up delay-100"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur-lg group-hover:from-blue-600/40 group-hover:to-indigo-600/40 transition-all duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 border border-gray-200 group-hover:border-transparent transition-all duration-300 group-hover:shadow-xl">
                    <div className={`h-12 w-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">{item.label}</div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

