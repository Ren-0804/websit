import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { primaryBrand } from "@/lib/i18n"
import { getAllPosts } from "@/lib/markdown"

export const metadata: Metadata = {
  title: `${primaryBrand} | 中国至中亚跨境物流执行服务`,
  description:
    "丰吉国际围绕中亚铁路班列、跨境公路、多式联运、清关协同、仓储分拨和目的国派送，为货主、贸易商和项目客户提供可落地的物流执行方案。",
  keywords: ["丰吉国际", "中亚物流", "中亚铁路班列", "跨境公路运输", "多式联运", "清关协同", "仓储分拨"],
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  const posts = getAllPosts().slice(0, 3)
  return <HomeClient recentPosts={posts} />
}
