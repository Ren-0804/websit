"use client"

import { ArrowRight, Train, Container, Globe, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesClient() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services-hero.jpg"
            alt="物流服务"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">我们的服务</h1>
            <p className="text-xl text-blue-100">
              提供专业、高效、可靠的国际物流解决方案，连接中国与中亚市场
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">核心业务</h2>
            <p className="text-gray-600">
              我们专注于中亚地区的物流服务，提供全方位的运输解决方案
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-2 bg-blue-600 w-full"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white">
                  <Train className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">中亚集装箱回程班列</h3>
                <p className="text-gray-600 mb-6">
                  提供高效、稳定的中亚回程班列服务，连接中国与中亚市场
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "塔什干→中国：10-12天极速达",
                    "北哈地区→西部枢纽：12天时效",
                    "全程控箱，减少甩柜风险",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/services/central-asia-rail">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">了解详情</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-2 bg-blue-600 w-full"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">跨境多式联运</h3>
                <p className="text-gray-600 mb-6">
                  灵活的多式联运解决方案，满足不同运输需求
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "中吉乌黄金通道：7-9天门到门",
                    "新能源车笼车专线",
                    "大件工程机械运输",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/services/multimodal">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">了解详情</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-2 bg-blue-600 w-full"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 -mt-10 border-4 border-white">
                  <Container className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">清关仓储一体化</h3>
                <p className="text-gray-600 mb-6">
                  提供专业的清关服务和仓储解决方案
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "乌兹别克斯坦本土化服务",
                    "清关误差率<0.5%",
                    "喀什自贸区保税仓储",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/services/customs-warehousing">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">了解详情</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">选择我们的理由</h2>
            <p className="text-gray-600">
              我们致力于为客户提供最优质的服务和最可靠的解决方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">驻外保障</h3>
              <ul className="space-y-3">
                {[
                  "乌兹别克斯坦/哈萨克斯坦常驻团队",
                  "7×24小时应急响应",
                  "专业的本地化服务",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">成本优势</h3>
              <ul className="space-y-3">
                {[
                  "中亚回程班列空箱利用率达92%",
                  "运价低于市场15%",
                  "提供最优的运输方案",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">准备好开始合作了吗？</h2>
            <p className="text-blue-100 mb-8">
              联系我们，获取专业的物流解决方案
            </p>
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                联系我们 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}