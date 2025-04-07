"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type Language = {
  code: string
  name: string
  nativeName: string
}

export const languages: Language[] = [
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "uz", name: "Uzbek", nativeName: "O'zbek" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[0],
  setLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>{children}</LanguageContext.Provider>
}

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
          <Languages className="h-4 w-4 mr-1" />
          <span>{currentLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language)}
            className={currentLanguage.code === language.code ? "bg-blue-50 text-blue-600" : ""}
          >
            <span className="mr-2">{language.nativeName}</span>
            <span className="text-gray-500 text-xs">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

