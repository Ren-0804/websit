"use client";

import { ArrowRight, Menu, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LanguageSelector,
  LanguageSelectorCompact,
  useLanguage,
} from "@/components/language-selector";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contact, getCopy } from "@/lib/i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  const admin = pathname.startsWith("/admin");
  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/regions", label: t.nav.regions },
    { href: "/about", label: t.nav.about },
    { href: "/news", label: t.nav.news },
  ];
  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-28 rounded-md bg-primary px-5 py-3 text-white focus:translate-y-0"
      >
        {zh ? "跳到主要内容" : "Skip to content"}
      </a>
      <header className="fixed inset-x-0 top-0 z-40 border-b bg-white">
        <div className="container flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label={zh ? "丰吉国际首页" : "Fengji International home"}
          >
            <Image
              src="/brand-mark.svg"
              alt=""
              width={42}
              height={42}
              priority
            />
            <span className="min-w-0">
              <span className="block text-lg font-semibold leading-tight tracking-wide">
                {t.brand}
              </span>
              <span className="mt-1 block text-[10px] font-semibold tracking-[0.12em] text-primary sm:text-[11px]">
                FENGJI INTERNATIONAL
              </span>
            </span>
          </Link>
          {admin ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-muted-foreground sm:block">
                {zh ? "内容管理" : "Content management"}
              </span>
              <Link href="/news" className="text-link text-sm">
                {zh ? "返回网站" : "Back to site"}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <>
              <nav
                className="hidden h-full items-center gap-6 xl:gap-8 lg:flex"
                aria-label={zh ? "主导航" : "Primary navigation"}
              >
                {nav.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    aria-current={active(item.href) ? "page" : undefined}
                    className={
                      "flex h-full items-center border-b-2 pt-0.5 text-sm font-medium transition-colors " +
                      (active(item.href)
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-primary")
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="hidden items-center gap-4 lg:flex">
                <LanguageSelector />
                <Link href="/contact" className="button-link min-h-10 px-4">
                  {t.cta.contact}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                <LanguageSelectorCompact />
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-md border"
                      aria-label={zh ? "打开导航" : "Open navigation"}
                    >
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </SheetTrigger>
                  <SheetContent className="flex w-[min(88vw,360px)] flex-col bg-white pt-12">
                    <SheetTitle>{t.brand}</SheetTitle>
                    <SheetDescription>{t.descriptor}</SheetDescription>
                    <nav
                      className="mt-5 flex flex-col"
                      aria-label={zh ? "移动导航" : "Mobile navigation"}
                    >
                      {[...nav, { href: "/contact", label: t.nav.contact }].map(
                        (item) => (
                          <Link
                            href={item.href}
                            key={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={
                              active(item.href) ? "page" : undefined
                            }
                            className={
                              "border-b py-4 text-lg font-medium " +
                              (active(item.href)
                                ? "text-primary"
                                : "text-foreground")
                            }
                          >
                            {item.label}
                          </Link>
                        ),
                      )}
                    </nav>
                    <a
                      className="mt-auto flex items-center gap-3 py-5 text-sm"
                      href={"tel:" + contact.phoneHref}
                    >
                      <Phone
                        aria-hidden="true"
                        className="h-4 w-4 text-primary"
                      />
                      {contact.phone}
                    </a>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
