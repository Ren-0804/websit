"use client";

import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-selector";
import { ContactForm } from "@/components/contact-form";
import { RouteInquiry, ServiceList } from "@/components/site-sections";
import { contact, getCopy } from "@/lib/i18n";
import type { PostSummary } from "@/lib/markdown";

export default function HomeClient({
  recentPosts,
}: {
  recentPosts: PostSummary[];
}) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  return (
    <main id="main-content" className="site-main">
      <section className="relative bg-[#112b54] text-white">
        <Image
          src="/logistics-background.jpg"
          alt={zh ? "物流作业场景" : "Logistics operations"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-shade absolute inset-0" />
        <div className="container relative pb-7 pt-10 md:pb-9 md:pt-14">
          <div className="hero-entry">
            <h1 className={"hero-title " + (zh ? "hero-title-zh" : "")}>
              {zh
                ? t.home.title.split("，").map((line, index, lines) => (
                    <span className="block" key={line}>
                      {line}
                      {index < lines.length - 1 ? "，" : ""}
                    </span>
                  ))
                : t.home.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#e0eaf9] md:text-lg">
              {t.home.intro}
            </p>
          </div>
          <div className="mt-7 md:mt-9">
            <RouteInquiry showServiceLink />
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>{t.pages.servicesTitle}</h2>
              <p>{t.home.servicesIntro}</p>
            </div>
            <Link href="/services" className="text-link flex-none text-sm">
              {t.cta.services}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ServiceList />
        </div>
      </section>

      <section className="site-section bg-secondary/60">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <h2>{t.home.networkTitle}</h2>
              <p className="mt-5">{t.home.networkIntro}</p>
              <Link href="/regions" className="text-link mt-5">
                {t.nav.regions}
                <ArrowRight aria-hidden="true" />
              </Link>
              <div className="mt-10 flex items-center gap-4 border-t border-[#bccce2] pt-6 text-sm text-primary">
                <span>{zh ? "中国" : "China"}</span>
                <span className="h-px flex-1 bg-[#8ba9d4]" aria-hidden="true" />
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span>{zh ? "中亚及俄罗斯方向" : "Central Asia & Russia"}</span>
              </div>
            </div>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {t.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={"/regions/" + city.slug}
                  className="region-item border-[#c7d5e8]"
                >
                  <div>
                    <span className="region-country">{city.country}</span>
                    <h3>{city.name}</h3>
                    <p>{city.summary}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>{t.home.newsTitle}</h2>
              <p>{t.pages.newsIntro}</p>
            </div>
            <Link href="/news" className="text-link flex-none text-sm">
              {t.cta.allNews}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {recentPosts.length ? (
            recentPosts.map((post) => (
              <article className="article-row" key={post.slug}>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(
                    zh ? "zh-CN" : "en-GB",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    },
                  )}
                </time>
                <div>
                  <h3>
                    <Link
                      href={"/news/" + post.slug}
                      className="hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p>{post.summary}</p>
                </div>
                <Link
                  href={"/news/" + post.slug}
                  aria-label={t.cta.read + ": " + post.title}
                  className="text-link self-start"
                >
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            ))
          ) : (
            <p className="border-t py-8">{t.detail.emptyNews}</p>
          )}
        </div>
      </section>

      <section id="contact" className="site-section bg-secondary/60">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2>{t.home.contactTitle}</h2>
            <p className="mt-5">{t.home.contactIntro}</p>
            <a
              href={"tel:" + contact.phoneHref}
              className="text-link mt-6 text-lg"
            >
              <Phone aria-hidden="true" />
              {contact.phone}
            </a>
            <p className="mt-3 text-sm">
              {zh ? contact.addressZh : contact.addressEn}
            </p>
            <ul className="mt-9 space-y-3 border-t pt-6 text-sm text-muted-foreground">
              {t.home.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="info-panel">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
