import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "关于我们 | 专业物流服务提供商 | 丰吉国际供应链",
  description: "通过创新物流方案，提供高效、可靠、经济的国际运输服务，致力于成为中亚领先的物流服务提供商。",
  alternates: { canonical: "/about" },
}

const translations = {
  zh: {
    title: "关于我们",
    subtitle: "连接全球市场的专业物流服务提供商",
    mission: {
      title: "我们的使命",
      content: "通过创新的物流解决方案，为客户提供高效、可靠、经济的国际运输服务，促进全球贸易发展。"
    },
    vision: {
      title: "我们的愿景",
      content: "成为中亚地区领先的物流服务提供商，打造连接东西方的物流桥梁。"
    },
    values: {
      title: "核心价值观",
      items: [
        {
          title: "专业可靠",
          description: "拥有专业的团队和丰富的经验，确保服务质量和可靠性。"
        },
        {
          title: "客户至上",
          description: "始终以客户需求为中心，提供个性化解决方案。"
        },
        {
          title: "创新发展",
          description: "持续创新，优化服务流程，提升运营效率。"
        },
        {
          title: "合作共赢",
          description: "与合作伙伴建立长期稳定的合作关系，实现共同发展。"
        }
      ]
    },
    team: {
      title: "专业团队",
      content: "我们拥有一支经验丰富的专业团队，在物流、贸易、清关等领域具有深厚的专业知识和丰富的实践经验。"
    },
    achievements: {
      title: "我们的成就",
      items: [
        "年运输量超过10000个标准集装箱",
        "服务网络覆盖中亚主要城市",
        "与多家国际知名企业建立长期合作关系",
        "获得多项行业认证和荣誉"
      ]
    }
  },
  en: {
    title: "About Us",
    subtitle: "Professional Logistics Service Provider Connecting Global Markets",
    mission: {
      title: "Our Mission",
      content: "To provide efficient, reliable, and cost-effective international transportation services through innovative logistics solutions, promoting global trade development."
    },
    vision: {
      title: "Our Vision",
      content: "To become a leading logistics service provider in Central Asia, building a logistics bridge connecting East and West."
    },
    values: {
      title: "Core Values",
      items: [
        {
          title: "Professional & Reliable",
          description: "With a professional team and rich experience, ensuring service quality and reliability."
        },
        {
          title: "Customer First",
          description: "Always focusing on customer needs, providing personalized solutions."
        },
        {
          title: "Innovation & Development",
          description: "Continuous innovation, optimizing service processes, improving operational efficiency."
        },
        {
          title: "Win-Win Cooperation",
          description: "Establishing long-term stable cooperative relationships with partners for mutual development."
        }
      ]
    },
    team: {
      title: "Professional Team",
      content: "We have an experienced professional team with deep expertise and rich practical experience in logistics, trade, customs clearance, and other fields."
    },
    achievements: {
      title: "Our Achievements",
      items: [
        "Annual transportation volume exceeding 10,000 standard containers",
        "Service network covering major cities in Central Asia",
        "Established long-term cooperative relationships with multiple internationally renowned enterprises",
        "Received multiple industry certifications and honors"
      ]
    }
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <nav className="container mx-auto px-4 pt-6 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li><Link href="/">首页</Link></li>
          <li>/</li>
          <li>关于我们</li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://landsea.cc" },
              { "@type": "ListItem", "position": 2, "name": "关于我们", "item": "https://landsea.cc/about" }
            ]
          })
        }}
      />
      <AboutClient />
    </main>
  )
}