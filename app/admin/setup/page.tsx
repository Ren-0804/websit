import QRCode from "react-qr-code"

export default function SetupPage() {
    const secret = process.env.TOTP_SECRET

    if (!secret) {
        return (
            <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-md shadow-lg border-l-4 border-[#e3000f] max-w-md w-full text-center">
                    <h1 className="text-2xl font-black text-[#0f1c2d] mb-4">Setup Error</h1>
                    <p className="text-gray-600 font-medium">TOTP_SECRET is not defined in your environment variables.</p>
                </div>
            </div>
        )
    }

    const issuer = encodeURIComponent("LandSea CMS")
    const account = encodeURIComponent("admin")
    const otpauth = `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}`

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-6 pt-24 pb-24">
            <div className="bg-white p-10 md:p-14 rounded-md shadow-2xl border-t-[6px] border-[#0f1c2d] max-w-lg w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0f1c2d] text-white font-bold text-2xl rounded-sm mb-6 shadow-md">
                        <span>丰</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#0f1c2d] mb-3">Admin Setup</h1>
                    <p className="text-gray-600 font-medium">Scan this QR code with Google Authenticator or Authy to bind your device.</p>
                </div>

                <div className="flex justify-center mb-10 p-6 bg-white border-2 border-dashed border-gray-200 rounded-sm">
                    <div className="bg-white p-4">
                        <QRCode value={otpauth} size={256} className="h-full w-full max-w-[200px]" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-2">Or enter manual key:</p>
                    <code className="bg-gray-100 px-4 py-2 rounded-sm text-[#e3000f] font-mono font-bold tracking-widest text-lg">
                        {secret}
                    </code>
                </div>

                <div className="border-t-2 border-gray-100 pt-8 mt-4 text-center">
                    <a href="/admin/login" className="inline-block bg-[#0f1c2d] hover:bg-[#e3000f] text-white px-8 py-4 font-bold rounded-sm transition-colors duration-300 w-full shadow-md">
                        Proceed to Login
                    </a>
                </div>
            </div>
        </div>
    )
}
