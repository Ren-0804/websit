"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function PublishPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        content: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Failed to publish post")
            }

            const { slug } = await response.json()

            toast({
                title: "Success",
                description: "Article published successfully!",
                className: "bg-white border border-green-200 shadow-lg",
                duration: 3000,
            })

            // Redirect to the newly created post
            router.push(`/news/${slug}`)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to publish article",
                className: "bg-white border border-red-200 shadow-lg",
                variant: "destructive",
                duration: 3000,
            })
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen pt-24 pb-16 bg-[#f4f4f4]">
            {/* Header Banner */}
            <div className="bg-[#0f1c2d] py-12 mb-12 border-t-4 border-[#e3000f]">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link href="/news" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to News
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-white">Publish <span className="text-[#e3000f]">Article</span></h1>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-lg border-t-4 border-[#e3000f] rounded-sm">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-[#0f1c2d] mb-2 uppercase tracking-wider">
                                Article Title <span className="text-[#e3000f]">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4] font-bold text-lg"
                                placeholder="e.g. New Block Train Route Opened to Europe"
                            />
                        </div>

                        <div>
                            <label htmlFor="summary" className="block text-sm font-bold text-[#0f1c2d] mb-2 uppercase tracking-wider">
                                Short Summary (Optional)
                            </label>
                            <textarea
                                id="summary"
                                name="summary"
                                value={formData.summary}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4] resize-y"
                                placeholder="Brief description of the article..."
                            ></textarea>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label htmlFor="content" className="block text-sm font-bold text-[#0f1c2d] uppercase tracking-wider">
                                    Markdown Content <span className="text-[#e3000f]">*</span>
                                </label>
                                <span className="text-xs text-gray-500 font-medium tracking-wider">Supports GitHub Flavored Markdown</span>
                            </div>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                required
                                rows={15}
                                className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#0f1c2d] text-gray-100 font-mono text-sm resize-y leading-relaxed"
                                placeholder="## Introduction&#10;&#10;Write your article content here..."
                            ></textarea>
                        </div>

                        <div className="pt-4 border-t-2 border-gray-100 flex justify-end">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-[#0f1c2d] hover:bg-[#e3000f] text-white px-10 py-6 text-lg font-bold rounded-sm transition-all duration-300 shadow-md"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    "Publish Article"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
