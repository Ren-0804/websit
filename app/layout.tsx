import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/components/language-selector"
import "./globals.css"

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
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'