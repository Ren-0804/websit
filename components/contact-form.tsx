"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("发送失败")
      }

      // 清空表单
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })

      // 显示成功提示
      toast({
        title: "发送成功",
        description: "感谢您的留言，我们会尽快回复您",
        className: "bg-white border border-green-200 shadow-lg",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "发送失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        className: "bg-white border border-red-200 shadow-lg",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#0f1c2d] mb-2 uppercase tracking-wider">
            姓名
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4]"
            placeholder="您的姓名"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-[#0f1c2d] mb-2 uppercase tracking-wider">
            邮箱
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4]"
            placeholder="您的邮箱地址"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-bold text-[#0f1c2d] mb-2 uppercase tracking-wider">
          公司
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4]"
          placeholder="您的公司名称"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-[#0f1c2d] mb-2 uppercase tracking-wider">
          主题
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4]"
          placeholder="我们可以如何帮助您？"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-[#0f1c2d] mb-2 uppercase tracking-wider">
          消息
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4] resize-y"
          placeholder="请输入您的消息..."
        ></textarea>
      </div>

      <Button
        size="lg"
        className="w-full bg-[#0f1c2d] hover:bg-[#e3000f] text-white rounded-sm py-6 text-lg font-bold transition-colors border-none"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            发送中...
          </>
        ) : (
          "发送消息"
        )}
      </Button>

      <p className="text-sm font-bold text-gray-500 text-center uppercase tracking-wider">我们会在24小时内回复您</p>
    </form>
  )
} 