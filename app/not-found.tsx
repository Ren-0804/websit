"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-selector";

export default function NotFound() {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage.code === "zh";
  return (
    <main id="main-content" className="site-main">
      <div className="container py-24">
        <h1>{zh ? "没有找到这个页面" : "This page could not be found"}</h1>
        <p className="mt-5 max-w-xl">
          {zh
            ? "页面可能已移动，或链接地址有误。可以从首页、服务范围或线路区域继续查阅。"
            : "The page may have moved or the address may be incorrect. Continue from the home page, services or route regions."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="button-link">
            {zh ? "返回首页" : "Back to home"}
          </Link>
          <Link href="/services" className="button-link button-outline">
            {zh ? "查看服务" : "View services"}
          </Link>
        </div>
      </div>
    </main>
  );
}
