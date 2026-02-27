"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, ShieldCheck, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (code.length !== 6) {
            setError("Please enter a 6-digit code")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            })

            const data = await response.json()

            if (response.ok) {
                router.push("/admin/publish")
                router.refresh() // important to refresh the middleware cache state
            } else {
                setError(data.error || "Invalid authentication code")
                setCode("")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f1c2d] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0,100 L100,0 L100,100 Z" fill="#e3000f" />
                </svg>
            </div>

            <div className="bg-white p-10 md:p-14 rounded-md shadow-2xl max-w-md w-full relative z-10 border-t-[6px] border-[#e3000f]">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f4f4f4] rounded-sm mb-6">
                        <ShieldCheck className="h-8 w-8 text-[#0f1c2d]" />
                    </div>
                    <h1 className="text-3xl font-black text-[#0f1c2d] mb-2 tracking-tight">Admin Gateway</h1>
                    <p className="text-gray-500 font-medium">Google Authenticator verification required</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="code" className="block text-sm font-bold text-[#0f1c2d] mb-3 uppercase tracking-wider text-center">
                            Enter 6-Digit Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                            className="w-full px-4 py-4 rounded-sm border-2 border-gray-200 focus:border-[#e3000f] focus:outline-none transition-colors bg-[#f4f4f4] text-center text-3xl font-mono tracking-[0.5em] font-black text-[#0f1c2d]"
                            placeholder="000000"
                            autoComplete="off"
                            autoFocus
                        />
                        {error && <p className="mt-3 text-[#e3000f] text-sm font-bold text-center animate-fade-in-up">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || code.length !== 6}
                        className="w-full bg-[#0f1c2d] hover:bg-[#e3000f] text-white px-8 py-5 text-lg font-bold rounded-sm transition-all duration-300 shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <>
                                Verify & Login
                                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <a href="/admin/setup" className="text-xs text-gray-400 hover:text-[#e3000f] font-bold uppercase tracking-wider transition-colors">
                        First time setup? Need a QR code?
                    </a>
                </div>
            </div>
        </div>
    )
}
