"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { getCopy } from "@/lib/i18n"

type ContactFormData = {
  name: string
  contactMethod: string
  company: string
  origin: string
  destination: string
  cargoInfo: string
  shippingTime: string
}

export function ContactForm() {
  const { currentLanguage } = useLanguage()
  const t = getCopy(currentLanguage.code).form
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    contactMethod: "",
    company: "",
    origin: "",
    destination: "",
    cargoInfo: "",
    shippingTime: "",
  })

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
      setFormData({ name: "", contactMethod: "", company: "", origin: "", destination: "", cargoInfo: "", shippingTime: "" })
      toast({ title: t.successTitle, description: t.successText, className: "border border-[#d8d1c5] bg-[#fbfaf7] text-[#101820] shadow-lg", duration: 3000 })
    } catch (error) {
      toast({ title: t.errorTitle, description: error instanceof Error ? error.message : t.errorText, className: "border border-[#d84650]/30 bg-[#fbfaf7] text-[#101820] shadow-lg", variant: "destructive", duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = "w-full border border-[#d8d1c5] bg-[#f8f4ec] px-4 py-3 text-sm text-[#101820] transition placeholder:text-[#8a8f91] focus:border-[#b3262f] focus:bg-white"
  const labelClass = "mb-2 block text-sm font-semibold text-[#40474b]"

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div><label htmlFor="name" className={labelClass}>{t.name}</label><input id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder={t.namePlaceholder} /></div>
        <div><label htmlFor="contactMethod" className={labelClass}>{t.contactMethod}</label><input id="contactMethod" name="contactMethod" value={formData.contactMethod} onChange={handleInputChange} required className={inputClass} placeholder={t.contactPlaceholder} /></div>
      </div>
      <div><label htmlFor="company" className={labelClass}>{t.company}</label><input id="company" name="company" value={formData.company} onChange={handleInputChange} className={inputClass} placeholder={t.companyPlaceholder} /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div><label htmlFor="origin" className={labelClass}>{t.origin}</label><input id="origin" name="origin" value={formData.origin} onChange={handleInputChange} required className={inputClass} placeholder={t.originPlaceholder} /></div>
        <div><label htmlFor="destination" className={labelClass}>{t.destination}</label><input id="destination" name="destination" value={formData.destination} onChange={handleInputChange} required className={inputClass} placeholder={t.destinationPlaceholder} /></div>
      </div>
      <div><label htmlFor="cargoInfo" className={labelClass}>{t.cargoInfo}</label><textarea id="cargoInfo" name="cargoInfo" value={formData.cargoInfo} onChange={handleInputChange} required rows={4} className={`${inputClass} resize-y`} placeholder={t.cargoPlaceholder} /></div>
      <div><label htmlFor="shippingTime" className={labelClass}>{t.shippingTime}</label><input id="shippingTime" name="shippingTime" value={formData.shippingTime} onChange={handleInputChange} className={inputClass} placeholder={t.shippingTimePlaceholder} /></div>
      <Button className="h-12 w-full rounded-none bg-[#101820] text-sm font-semibold text-white hover:bg-[#b3262f]" type="submit" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.sending}</> : t.submit}</Button>
      <p className="border-l-2 border-[#b3262f] bg-[#f4efe5] px-3 py-2 text-sm leading-6 text-[#5b6266]">{t.promise}</p>
    </form>
  )
}
