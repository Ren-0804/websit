import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Inter } from "next/font/google"
import "./globals.css"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from "@/components/language-selector"
import { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "丰吉国际供应链管理(江苏)有限公司 - 国际物流与供应链解决方案",
    template: "%s | LandSea"
  },
  description: "丰吉国际供应链管理(江苏)有限公司提供专业的国际物流服务，包括中亚集装箱回程班列、跨境多式联运、清关仓储一体化等服务。连接中国与中亚、欧洲的可靠物流合作伙伴。",
  keywords: ["国际物流", "中亚班列", "多式联运", "清关服务", "仓储物流", "供应链管理", "跨境运输", "集装箱运输", "物流解决方案"],
  authors: [{ name: "LandSea" }],
  creator: "LandSea",
  publisher: "LandSea",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://landsea.cc'),
  alternates: {
    canonical: '/',
    languages: {
      'zh': '/',
      'en': '/en',
      'ru': '/ru',
      'uz': '/uz',
    },
  },
  openGraph: {
    title: "丰吉国际供应链管理(江苏)有限公司 - 国际物流与供应链解决方案",
    description: "丰吉国际供应链管理(江苏)有限公司提供专业的国际物流服务，包括中亚集装箱回程班列、跨境多式联运、清关仓储一体化等服务。连接中国与中亚、欧洲的可靠物流合作伙伴。",
    url: 'https://landsea.cc',
    siteName: '丰吉国际供应链管理(江苏)有限公司',
    images: [
      {
        url: '/logistics-background.jpg',
        width: 1200,
        height: 630,
        alt: 'LandSea国际物流服务',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "丰吉国际供应链管理(江苏)有限公司 - 国际物流与供应链解决方案",
    description: "丰吉国际供应链管理(江苏)有限公司提供专业的国际物流服务，包括中亚集装箱回程班列、跨境多式联运、清关仓储一体化等服务。",
    images: ['/logistics-background.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <SpeedInsights />
          <Analytics />
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}