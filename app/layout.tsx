import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/components/language-selector"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://landsea.cc"),
  title: {
    default: "丰吉国际供应链管理 | 中亚铁路班列与跨境物流",
    template: "%s | LandSea",
  },
  description:
    "丰吉国际供应链管理（江苏）有限公司提供中亚铁路班列、跨境多式联运、清关仓储和供应链项目执行服务。",
  applicationName: "LandSea",
  authors: [{ name: "LandSea" }],
  creator: "LandSea",
  publisher: "LandSea",
  category: "Logistics",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "丰吉国际供应链管理",
    description: "连接中国、中亚、俄罗斯和欧洲的跨境物流与供应链执行伙伴。",
    url: "https://landsea.cc",
    siteName: "LandSea",
    images: [
      {
        url: "/logistics-background.jpg",
        width: 1200,
        height: 630,
        alt: "LandSea cross-border logistics services",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "丰吉国际供应链管理",
    description: "中亚铁路班列、跨境多式联运、清关仓储和供应链项目执行服务。",
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
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
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
