import type { Metadata } from "next"
import NewsClient from "@/app/news/NewsClient"
import { getAllPosts } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Insights",
  description: "Updates on Central Asia corridors, multimodal freight and supply chain execution.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "Insights | LandSea",
    description: "Central Asia block train, cross-border logistics and supply chain project notes.",
    url: "/news",
  },
}

export default function NewsPage() {
  const posts = getAllPosts()
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://landsea.cc/news/${post.slug}`,
      name: post.title,
    })),
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} /><NewsClient posts={posts} /></>
}
