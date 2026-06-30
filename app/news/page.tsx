import type { Metadata } from "next"
import NewsClient from "@/app/news/NewsClient"
import { siteUrl } from "@/lib/i18n"
import { getAllPosts } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "业务笔记",
  description: "丰吉国际整理中亚物流询价、清关资料、铁路公路多式联运选择等常见问题，帮助客户提前准备货物信息。",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "业务笔记 | 丰吉国际",
    description: "中亚物流询价、清关资料和线路选择常见问题。",
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
      url: `${siteUrl}/news/${post.slug}`,
      name: post.title,
    })),
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} /><NewsClient posts={posts} /></>
}
