import { getAllPosts } from "@/lib/markdown"
import HomeClient from "@/components/home-client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "丰吉国际供应链管理(江苏)有限公司 - 国际物流与供应链解决方案 | LandSea International",
    description: "丰吉国际为您提供连接亚洲与欧洲、中亚及其他地区的端到端供应链管理服务。了解最新的国际班列、集装箱运输与供应链咨询资讯。Your Trusted International Transport Partner.",
    keywords: ["国际物流", "供应链管理", "中亚班列", "集装箱运输", "丰吉国际", "LandSea Supply Chain", "Logistics", "Block Train"]
}

export default function Page() {
    const posts = getAllPosts().slice(0, 3)
    return <HomeClient recentPosts={posts} />
}
