import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Inter } from "next/font/google"
import "./globals.css"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from "@/components/language-selector"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fengji International - Supply Chain Management",
  description:
    "Global connections and smooth supply chain solutions by Fengji International Supply Chain Management (Jiangsu) Co., Ltd.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
          <SpeedInsights />
          <Analytics />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

import './globals.css'