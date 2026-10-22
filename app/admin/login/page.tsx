"use client";

import { useState } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/language-selector";

export default function LoginPage() {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage.code === "zh";
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^\d{6}$/.test(code) || loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (response.ok) window.location.href = "/admin/publish";
      else {
        setError(
          data.error ||
            (zh
              ? "验证码无效，请使用最新验证码重试。"
              : "Invalid code. Try the latest code."),
        );
        setCode("");
      }
    } catch {
      setError(
        zh
          ? "暂时无法连接，请稍后重试。"
          : "Unable to connect. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main
      id="main-content"
      className="site-main flex min-h-screen items-center justify-center px-5 py-28"
    >
      <section className="w-full max-w-md rounded-xl border bg-white p-7 md:p-10">
        <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
        <h1 className="mt-5 text-3xl">
          {zh ? "内容管理登录" : "Content management"}
        </h1>
        <p className="mt-4 text-sm">
          {zh
            ? "请输入已绑定的身份验证器中当前显示的六位验证码。"
            : "Enter the current six-digit code from your linked authenticator."}
        </p>
        <form onSubmit={submit} className="mt-8 space-y-5" aria-busy={loading}>
          <div>
            <label htmlFor="code" className="field-label">
              {zh ? "六位验证码" : "Six-digit code"}
            </label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(event) => {
                setCode(event.target.value.replace(/\D/g, ""));
                setError("");
              }}
              className="field text-center text-3xl font-semibold tabular-nums tracking-[0.35em]"
              placeholder="000000"
              aria-describedby={error ? "login-error" : undefined}
              aria-invalid={!!error}
              required
            />
          </div>
          {error && (
            <p
              id="login-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}
          <button
            className="button-link w-full"
            type="submit"
            disabled={loading || code.length !== 6}
          >
            {loading ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight aria-hidden="true" />
            )}
            {loading
              ? zh
                ? "正在验证"
                : "Verifying"
              : zh
                ? "验证并登录"
                : "Verify and sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
