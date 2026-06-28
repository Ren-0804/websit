"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { getCopy } from "@/lib/i18n"

type ContactFormData = {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

export function ContactForm() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code).form
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", company: "", subject: "", message: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error(t.errorText)
      setFormData({ name: "", email: "", company: "", subject: "", message: "" })
      toast({ title: t.successTitle, description: t.successText, className: "border border-[#d8d1c5] bg-[#fbfaf7] text-[#101820] shadow-lg", duration: 3000 })
    } catch (error) {
      toast({ title: t.errorTitle, description: error instanceof Error ? error.message : t.errorText, className: "border border-[#d84650]/30 bg-[#fbfaf7] text-[#101820] shadow-lg", variant: "destructive", duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = "w-full border border-[#d8d1c5] bg-[#f7f2e8] px-4 py-3 text-sm text-[#101820] transition placeholder:text-[#7a7f82] focus:border-[#b3262f]"
  const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5b6266]"

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div><label htmlFor="name" className={labelClass}>{t.name}</label><input id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder={t.namePlaceholder} /></div>
        <div><label htmlFor="email" className={labelClass}>{t.email}</label><input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className={inputClass} placeholder={t.emailPlaceholder} /></div>
      </div>
      <div><label htmlFor="company" className={labelClass}>{t.company}</label><input id="company" name="company" value={formData.company} onChange={handleInputChange} className={inputClass} placeholder={t.companyPlaceholder} /></div>
      <div><label htmlFor="subject" className={labelClass}>{t.subject}</label><input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className={inputClass} placeholder={t.subjectPlaceholder} /></div>
      <div><label htmlFor="message" className={labelClass}>{t.message}</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className={`${inputClass} resize-y`} placeholder={t.messagePlaceholder} /></div>
      <Button className="h-12 w-full rounded-none bg-[#101820] text-sm font-semibold text-white hover:bg-[#b3262f]" type="submit" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.sending}</> : t.submit}</Button>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#6d7478]">{t.promise}</p>
    </form>
  )
}
