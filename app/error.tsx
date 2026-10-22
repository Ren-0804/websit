"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-selector";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage.code === "zh";
  return (
    <main id="main-content" className="site-main">
      <div className="container py-24">
        <h1>{zh ? "页面暂时无法加载" : "This page could not load"}</h1>
        <p className="mt-5">
          {zh
            ? "请重新尝试，或返回首页继续浏览。"
            : "Try loading the page again, or return to the home page."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button type="button" onClick={reset} className="button-link">
            {zh ? "重新加载" : "Try again"}
          </button>
          <Link href="/" className="button-link button-outline">
            {zh ? "返回首页" : "Back to home"}
          </Link>
        </div>
      </div>
    </main>
  );
}
