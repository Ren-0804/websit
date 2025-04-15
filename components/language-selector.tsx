"use client"

import { useState, createContext, useContext, useEffect } from "react"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const languages = [
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
]

type LanguageContextType = {
  currentLanguage: typeof languages[0]
  setLanguage: (code: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[1], // 默认中文
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[1]) // 默认中文

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      const language = languages.find((lang) => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
        return
      }
    }
    
    // IP检测逻辑
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryCode = data.country_code?.toLowerCase()
        let detectedLang = languages.find(lang => lang.code === countryCode)
        
        if (!detectedLang) {
          // 根据国家代码映射到支持的语言
          const countryToLang = {
            'ru': 'ru', // 俄罗斯
            'cn': 'zh', // 中国
            'uz': 'uz', // 乌兹别克斯坦
          }
          const mappedCode = countryToLang[countryCode]
          detectedLang = languages.find(lang => lang.code === mappedCode)
        }
        
        // 如果没有匹配的语言，使用英语
        if (!detectedLang) {
          detectedLang = languages.find(lang => lang.code === 'en')
        }
        
        if (detectedLang) {
          setCurrentLanguage(detectedLang)
        }
      })
      .catch(() => {
        // 如果IP检测失败，使用英语
        const englishLang = languages.find(lang => lang.code === 'en')
        if (englishLang) {
          setCurrentLanguage(englishLang)
        }
      })
  }, [])

  const setLanguage = (code: string) => {
    const language = languages.find((lang) => lang.code === code)
    if (language) {
      setCurrentLanguage(language)
      localStorage.setItem("language", code)
      // 强制重新加载页面以应用语言更改
      window.location.href = window.location.href
    }
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">切换语言</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={currentLanguage.code === language.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

