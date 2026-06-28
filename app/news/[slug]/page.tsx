import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PostClient from "@/app/news/[slug]/PostClient"
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
      : `https://landsea.cc${post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`}`
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
      name: "LandSea",
    },
    publisher: {
      "@type": "Organization",
      name: "LandSea",
      logo: {
        "@type": "ImageObject",
        url: "https://landsea.cc/brand-mark.svg",
      },
    },
    mainEntityOfPage: `https://landsea.cc/news/${post.slug}`,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://landsea.cc" },
      { "@type": "ListItem", position: 2, name: "News", item: "https://landsea.cc/news" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://landsea.cc/news/${post.slug}` },
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
