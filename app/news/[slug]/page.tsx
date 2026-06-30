import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PostClient from "@/app/news/[slug]/PostClient"
import { companyName, primaryBrand, siteUrl } from "@/lib/i18n"
import { getPostBySlug, getPostSlugs } from "@/lib/markdown"

interface PostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "文章不存在",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.summary || post.content.slice(0, 150),
    alternates: {
      canonical: `/news/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.summary || post.content.slice(0, 150),
      url: `/news/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const imageUrl = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteUrl}${post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`}`
    : undefined
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.summary,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: companyName,
    },
    publisher: {
      "@type": "Organization",
      name: companyName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand-mark.svg`,
      },
    },
    mainEntityOfPage: `${siteUrl}/news/${post.slug}`,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: primaryBrand, item: siteUrl },
      { "@type": "ListItem", position: 2, name: "业务笔记", item: `${siteUrl}/news` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/news/${post.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PostClient post={post} />
    </>
  )
}
