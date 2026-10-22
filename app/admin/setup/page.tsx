import Link from "next/link";
import QRCode from "react-qr-code";

export const dynamic = "force-dynamic";

export default function SetupPage() {
  const secret = process.env.TOTP_SECRET;
  if (!secret)
    return (
      <main
        id="main-content"
        className="site-main flex min-h-screen items-center justify-center px-5"
      >
        <section className="info-panel max-w-lg">
          <h1 className="text-2xl">身份验证器尚未配置</h1>
          <p className="mt-4">
            请先在服务器环境中配置 TOTP_SECRET，然后重新打开此页面。
          </p>
        </section>
      </main>
    );
  const issuer = encodeURIComponent("丰吉国际 CMS");
  const account = encodeURIComponent("admin");
  const otpauth =
    "otpauth://totp/" +
    issuer +
    ":" +
    account +
    "?secret=" +
    secret +
    "&issuer=" +
    issuer;
  return (
    <main
      id="main-content"
      className="site-main flex min-h-screen items-center justify-center px-5 py-28"
    >
      <section className="info-panel w-full max-w-lg">
        <h1 className="text-3xl">绑定身份验证器</h1>
        <p className="mt-4 text-sm">
          使用 Google Authenticator 或 Authy 扫描二维码，绑定内容管理账号。
        </p>
        <div className="my-8 flex justify-center rounded-xl border bg-white p-6">
          <QRCode value={otpauth} size={220} className="h-auto max-w-full" />
        </div>
        <h2 className="text-base">无法扫描时，手动输入密钥</h2>
        <code className="mt-3 block break-all rounded-md bg-secondary px-4 py-3 font-mono text-sm text-primary">
          {secret}
        </code>
        <Link href="/admin/login" className="button-link mt-8 w-full">
          前往登录
        </Link>
      </section>
    </main>
  );
}
