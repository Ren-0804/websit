import type { Metadata } from "next"
import { primaryBrand } from "@/lib/i18n"

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/logistics-background.jpg",
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${primaryBrand}`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: primaryBrand,
      locale: "zh_CN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  }
}
