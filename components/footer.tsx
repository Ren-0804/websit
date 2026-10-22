"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-selector";
import { contact, getCopy } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="site-footer border-t">
      <div className="container">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/brand-mark.svg" alt="" width={42} height={42} />
              <span className="text-xl font-semibold">{t.brand}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm">{t.footerLine}</p>
            <div className="mt-5 text-xs font-medium tracking-wide text-primary">
              FENGJI INTERNATIONAL SUPPLY CHAIN
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold">
              {zh ? "探索丰吉" : "Explore"}
            </h2>
            <nav
              aria-label={zh ? "页脚导航" : "Footer navigation"}
              className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground"
            >
              {[
                { href: "/services", label: t.nav.services },
                { href: "/regions", label: t.nav.regions },
                { href: "/about", label: t.nav.about },
                { href: "/news", label: t.nav.news },
              ].map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="w-fit hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2 className="text-base font-semibold">{t.nav.services}</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              {t.services.map((service) => (
                <Link
                  key={service.slug}
                  href={"/services/" + service.slug}
                  className="hover:text-primary"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold">{t.nav.contact}</h2>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href={"tel:" + contact.phoneHref}
                className="block w-fit text-primary"
              >
                {contact.phone}
              </a>
              <a
                href={"mailto:" + contact.email}
                className="block w-fit break-all text-primary"
              >
                {contact.email}
              </a>
              <p className="text-sm">
                {zh ? contact.addressZh : contact.addressEn}
              </p>
              <Link href="/contact" className="text-link">
                {t.cta.route}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t py-6 text-xs text-muted-foreground md:flex-row md:justify-between">
          <span>
            © {new Date().getFullYear()} {t.company} · {t.rights}
          </span>
          <div className="flex gap-5">
            <Link href="/sitemap.xml" className="hover:text-primary">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-primary">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
