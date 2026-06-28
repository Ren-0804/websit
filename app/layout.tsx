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
  metadataBase: new URL("https://landsea.cc"),
  title: {
    default: "LandSea | Central Asia Logistics Execution",
    template: "%s | LandSea",
  },
  description:
    "LandSea provides Central Asia block train, multimodal freight, customs, warehousing and destination logistics execution between China, Central Asia, Russia and Europe.",
  applicationName: "LandSea",
  authors: [{ name: "LandSea" }],
  creator: "LandSea",
  publisher: "LandSea",
  category: "Logistics",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LandSea Central Asia Logistics",
    description: "Cross-border logistics execution for China, Central Asia, Russia and Europe.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LandSea Central Asia Logistics",
    description: "Block train, multimodal freight, customs and warehousing for Central Asia corridors.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${plex.variable} ${notoSansSc.variable} antialiased`}>
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
