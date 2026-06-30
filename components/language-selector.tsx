"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  defaultLanguageCode,
  getLanguage,
  languages,
  type Language,
  type LanguageCode,
} from "@/lib/i18n"

export { languages, type LanguageCode }

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (code: LanguageCode) => void
}

const defaultLanguage = getLanguage(defaultLanguageCode)

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
})

function detectInitialLanguage(): Language {
  const saved = localStorage.getItem("language")
  return getLanguage(saved || defaultLanguageCode)
}

function htmlLang(code: LanguageCode) {
  return code === "zh" ? "zh-CN" : "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setCurrentLanguage(detectInitialLanguage())
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLang(currentLanguage.code)
    document.documentElement.dir = "ltr"
  }, [currentLanguage.code])

  const value = useMemo<LanguageContextType>(
    () => ({
      currentLanguage: isHydrated ? currentLanguage : defaultLanguage,
      setLanguage: (code) => {
        const language = getLanguage(code)
        setCurrentLanguage(language)
        localStorage.setItem("language", language.code)
        document.documentElement.lang = htmlLang(language.code)
        document.documentElement.dir = "ltr"
      },
    }),
    [currentLanguage, isHydrated],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
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
            {language.nativeName}
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
            <span className="text-sm">{language.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
