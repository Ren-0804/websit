"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "./language-selector"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                <div className="text-white font-bold text-xl">丰</div>
              </div>
              <span className={`font-bold text-xl ${scrolled ? "text-blue-600" : "text-blue-600"}`}>丰吉国际</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium hover:text-blue-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`font-medium hover:text-blue-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`font-medium hover:text-blue-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/network"
              className={`font-medium hover:text-blue-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Network
            </Link>
            <Link
              href="/contact"
              className={`font-medium hover:text-blue-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
          
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
            <Button className="bg-blue-600 hover:bg-blue-700">Get a Quote</Button>
          </div>

          <div className="md:hidden flex items-center">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`ml-2 ${scrolled ? "text-gray-700" : "text-gray-700"} hover:text-blue-600`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-6 space-y-6">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/network"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Network
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

