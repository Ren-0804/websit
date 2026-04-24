import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { getAllPosts } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "丰吉国际供应链管理 | 中亚铁路班列与跨境物流",
  description:
    "丰吉国际供应链管理（江苏）有限公司提供中亚铁路班列、跨境多式联运、清关仓储和供应链项目执行服务，连接中国、中亚、俄罗斯和欧洲。",
  keywords: ["中亚铁路班列", "跨境物流", "多式联运", "清关仓储", "供应链管理", "LandSea logistics"],
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  const posts = getAllPosts().slice(0, 3)
  return <HomeClient recentPosts={posts} />
}
