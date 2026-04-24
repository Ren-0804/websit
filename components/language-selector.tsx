"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "zh", name: "中文", shortName: "ZH" },
  { code: "en", name: "English", shortName: "EN" },
  { code: "ru", name: "Русский", shortName: "RU" },
  { code: "uz", name: "O'zbek", shortName: "UZ" },
]

type Language = (typeof languages)[number]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (code: string) => void
}

const defaultLanguage = languages[0]

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const savedLanguage = localStorage.getItem("language")
    const language = languages.find((item) => item.code === savedLanguage)
    if (language) {
      setCurrentLanguage(language)
    }
  }, [])

  const setLanguage = (code: string) => {
    const language = languages.find((item) => item.code === code)
    if (!language) return

    setCurrentLanguage(language)
    localStorage.setItem("language", code)
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: isHydrated ? currentLanguage : defaultLanguage,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageSelector({ className }: { className?: string }) {
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-10 gap-2 rounded-full px-3 text-xs font-semibold tracking-wide ${className || ""}`}
        >
          <Globe2 className="h-4 w-4" />
          {currentLanguage.shortName}
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[60] min-w-40">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={currentLanguage.code === language.code ? "bg-accent text-accent-foreground" : ""}
          >
            <span className="mr-3 w-6 text-xs font-semibold text-muted-foreground">
              {language.shortName}
            </span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LanguageSelectorCompact({ className }: { className?: string }) {
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-9 w-11 rounded-full px-0 text-xs font-semibold ${className || ""}`}
        >
          {currentLanguage.shortName}
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[60] min-w-40">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={currentLanguage.code === language.code ? "bg-accent text-accent-foreground" : ""}
          >
            <span className="mr-3 w-6 text-xs font-semibold text-muted-foreground">
              {language.shortName}
            </span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
