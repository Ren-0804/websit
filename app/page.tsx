import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { getAllPosts } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "LandSea | Central Asia Block Train and Cross-border Logistics",
  description:
    "LandSea provides Central Asia block train, cross-border multimodal freight, customs, warehousing and supply chain execution between China, Central Asia, Russia and Europe.",
  keywords: ["Central Asia logistics", "block train", "cross-border logistics", "multimodal freight", "中亚铁路班列", "跨境物流", "清关仓储"],
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  const posts = getAllPosts().slice(0, 3)
  return <HomeClient recentPosts={posts} />
}
