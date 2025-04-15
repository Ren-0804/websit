"use client"

import { Building2, Globe, Users, Target, Award, Handshake } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-selector"

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
  },
  ru: {
    title: "О нас",
    subtitle: "Профессиональный поставщик логистических услуг, соединяющий мировые рынки",
    mission: {
      title: "Наша миссия",
      content: "Обеспечивать эффективные, надежные и экономически эффективные международные транспортные услуги с помощью инновационных логистических решений, способствуя развитию мировой торговли."
    },
    vision: {
      title: "Наше видение",
      content: "Стать ведущим поставщиком логистических услуг в Центральной Азии, построив логистический мост, соединяющий Восток и Запад."
    },
    values: {
      title: "Ключевые ценности",
      items: [
        {
          title: "Профессионализм и надежность",
          description: "С профессиональной командой и богатым опытом мы гарантируем качество и надежность услуг."
        },
        {
          title: "Клиент прежде всего",
          description: "Всегда ориентируемся на потребности клиентов, предоставляя индивидуальные решения."
        },
        {
          title: "Инновации и развитие",
          description: "Постоянные инновации, оптимизация процессов обслуживания, повышение операционной эффективности."
        },
        {
          title: "Взаимовыгодное сотрудничество",
          description: "Установление долгосрочных стабильных партнерских отношений для взаимного развития."
        }
      ]
    },
    team: {
      title: "Профессиональная команда",
      content: "У нас есть опытная профессиональная команда с глубокими знаниями и богатым практическим опытом в области логистики, торговли, таможенного оформления и других сферах."
    },
    achievements: {
      title: "Наши достижения",
      items: [
        "Годовой объем перевозок превышает 10 000 стандартных контейнеров",
        "Сеть обслуживания охватывает основные города Центральной Азии",
        "Установлены долгосрочные партнерские отношения с несколькими международно признанными предприятиями",
        "Получены многочисленные отраслевые сертификаты и награды"
      ]
    }
  },
  uz: {
    title: "Biz haqimizda",
    subtitle: "Global bozorlarni bog'lovchi professional logistika xizmati provayderi",
    mission: {
      title: "Bizning missiyamiz",
      content: "Innovatsion logistika yechimlari orqali samarali, ishonchli va arzon xalqaro transport xizmatlarini taqdim etish, global savdo rivojiga hissa qo'shish."
    },
    vision: {
      title: "Bizning ko'rinishimiz",
      content: "Markaziy Osiyoda yetakchi logistika xizmati provayderiga aylanish, Sharq va G'arbni bog'lovchi logistika ko'prigini qurish."
    },
    values: {
      title: "Asosiy qadriyatlar",
      items: [
        {
          title: "Professional va ishonchli",
          description: "Professional jamoa va boy tajriba bilan xizmat sifatini va ishonchliligini ta'minlash."
        },
        {
          title: "Mijoz birinchi o'rinda",
          description: "Har doim mijozlar ehtiyojlariga qaratilgan holda, shaxsiylashtirilgan yechimlarni taqdim etish."
        },
        {
          title: "Innovatsiya va rivojlanish",
          description: "Doimiy innovatsiyalar, xizmat jarayonlarini optimallashtirish, operatsion samaradorlikni oshirish."
        },
        {
          title: "O'zaro manfaatli hamkorlik",
          description: "O'zaro rivojlanish uchun uzoq muddatli barqaror hamkorlik munosabatlarini o'rnatish."
        }
      ]
    },
    team: {
      title: "Professional jamoa",
      content: "Bizda logistika, savdo, bojxona rasmiylashtirish va boshqa sohalarda chuqur bilim va boy amaliy tajribaga ega bo'lgan tajribali professional jamoa mavjud."
    },
    achievements: {
      title: "Bizning yutuqlarimiz",
      items: [
        "Yillik tashish hajmi 10 000 standart konteynerdan oshadi",
        "Xizmat ko'rsatish tarmog'i Markaziy Osiyoning asosiy shaharlarini qamrab oladi",
        "Bir qancha xalqaro miqyosda tan olingan korxonalar bilan uzoq muddatli hamkorlik aloqalari o'rnatilgan",
        "Ko'plab sanoat sertifikatlari va mukofotlari qo'lga kiritilgan"
      ]
    }
  }
}

export default function AboutPage() {
  const { currentLanguage } = useLanguage()
  const t = translations[currentLanguage.code as keyof typeof translations] || translations.en

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.title}</h1>
            <p className="text-xl text-gray-600">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.mission.title}</h2>
              <p className="text-gray-600">{t.mission.content}</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.vision.title}</h2>
              <p className="text-gray-600">{t.vision.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.values.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {t.values.items.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {index === 0 && <Building2 className="h-6 w-6 text-blue-600" />}
                  {index === 1 && <Users className="h-6 w-6 text-blue-600" />}
                  {index === 2 && <Award className="h-6 w-6 text-blue-600" />}
                  {index === 3 && <Handshake className="h-6 w-6 text-blue-600" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.team.title}</h2>
            <p className="text-gray-600">{t.team.content}</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.achievements.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.achievements.items.map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-gray-600">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}