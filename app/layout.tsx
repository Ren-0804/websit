import type React from "react"
import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans, Noto_Sans_SC } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/components/language-selector"
import { Toaster } from "@/components/ui/toaster"
import { companyName, contact, englishName, primaryBrand, siteUrl } from "@/lib/i18n"
import "./globals.css"

const plex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex",
})

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sc",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "丰吉国际 | 中亚跨境物流与供应链执行服务",
    template: `%s | ${primaryBrand}`,
  },
  description:
    "丰吉国际供应链管理（江苏）有限公司提供中国至中亚、俄罗斯、欧洲部分线路的铁路班列、跨境公路、多式联运、清关协同、仓储分拨和目的国派送服务。",
  applicationName: primaryBrand,
  authors: [{ name: companyName }],
  creator: companyName,
  publisher: companyName,
  category: "Logistics",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "丰吉国际供应链管理（江苏）有限公司",
    description: "中国至中亚、俄罗斯、欧洲部分线路的跨境物流执行服务。",
    url: siteUrl,
    siteName: primaryBrand,
    images: [
      {
        url: "/logistics-background.jpg",
        width: 1200,
        height: 630,
        alt: "丰吉国际跨境物流服务",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "丰吉国际供应链管理",
    description: "中亚铁路班列、跨境公路、多式联运、清关协同和目的国派送。",
    images: ["/logistics-background.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: "#101820",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${plex.variable} ${notoSansSc.variable} antialiased`}>
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: companyName,
                alternateName: englishName,
                url: siteUrl,
                logo: `${siteUrl}/brand-mark.svg`,
                email: contact.email,
                telephone: contact.phone,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "江苏连云港阳光国际大厦 C 座 2403",
                  addressLocality: "连云港",
                  addressRegion: "江苏",
                  addressCountry: "CN",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: contact.phone,
                  email: contact.email,
                  contactType: "customer service",
                  areaServed: ["CN", "KZ", "UZ", "KG", "RU"],
                  availableLanguage: ["zh-CN", "en"],
                },
              }),
            }}
          />
          <Navbar />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
              <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
              </Script>
            </>
          )}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
