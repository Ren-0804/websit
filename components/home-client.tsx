"use client";

import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/language-selector";
import { ContactForm } from "@/components/contact-form";
import {
  RouteInquiry,
  ServiceList,
} from "@/components/site-sections";
import { contact, getCopy } from "@/lib/i18n";
import { logisticsScenes } from "@/lib/visual-assets";
import type { PostSummary } from "@/lib/markdown";

export default function HomeClient({
  recentPosts,
}: {
  recentPosts: PostSummary[];
}) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  const [countryIndex, setCountryIndex] = useState<number | null>(null);
  const countries = Array.from(new Set(t.cities.map((city) => city.country)));
  const cities = t.cities.filter(
    (city) => countryIndex === null || city.country === countries[countryIndex],
  );
  const date = (value: string) =>
    new Date(value).toLocaleDateString(zh ? "zh-CN" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  return (
    <main id="main-content" className="site-main">
      <section
        className={"corporate-hero" + (zh ? "" : " corporate-hero-en")}
        aria-label={zh ? "丰吉国际跨境物流" : "Fengji cross-border logistics"}
      >
        <Image
          src={logisticsScenes.train.src}
          alt={zh ? logisticsScenes.train.altZh : logisticsScenes.train.altEn}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="hero-photograph"
        />
        <div className="corporate-hero-shade" />
        <div className="container corporate-hero-content">
          <div className="hero-entry">
            <h1
              className={
                zh ? "corporate-title" : "corporate-title corporate-title-en"
              }
            >
              <span>{zh ? "中国至中亚" : "Connecting China."}</span>
              <span>{zh ? "跨境物流执行服务" : "With Central Asia."}</span>
            </h1>
            <p className="corporate-hero-intro">{t.home.intro}</p>
            <div className="hero-actions">
              <a href="#route-inquiry" className="button-link hero-primary">
                {t.cta.route}
                <ArrowRight aria-hidden="true" />
              </a>
              <Link href="/regions" className="button-link hero-secondary">
                {zh ? "浏览线路区域" : "Explore regions"}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="corporate-hero-bottom">
          <nav
            className="container hero-service-links"
            aria-label={zh ? "运输服务" : "Transport services"}
          >
            {t.services.map((service) => (
              <Link key={service.slug} href={"/services/" + service.slug}>
                <span>{service.title}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section id="route-inquiry" className="route-console-shell">
        <RouteInquiry />
      </section>

      <section className="site-section bg-white">
        <div className="container">
          <div className="section-heading corporate-section-heading">
            <div>
              <h2>{t.pages.servicesTitle}</h2>
              <p>{t.pages.servicesIntro}</p>
            </div>
            <Link href="/services" className="text-link flex-none text-sm">
              {t.cta.services}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ServiceList />
        </div>
      </section>

      <section className="network-explorer site-section on-dark">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <h2>{t.home.networkTitle}</h2>
            <p className="mt-6 max-w-md">{t.home.networkIntro}</p>
            <div className="network-direction">
              <span>{zh ? "中国" : "China"}</span>
              <ArrowRight aria-hidden="true" />
              <span>{zh ? "中亚及俄罗斯" : "Central Asia & Russia"}</span>
            </div>
            <Link href="/regions" className="text-link mt-6">
              {zh ? "了解目的地与线路" : "Explore destinations"}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div>
            <div
              className="network-country-filters"
              role="group"
              aria-label={
                zh ? "按国家浏览目的地" : "Browse destinations by country"
              }
            >
              <button
                type="button"
                aria-pressed={countryIndex === null}
                onClick={() => setCountryIndex(null)}
              >
                {zh ? "全部地区" : "All regions"}
              </button>
              {countries.map((country, index) => (
                <button
                  type="button"
                  key={country}
                  aria-pressed={countryIndex === index}
                  onClick={() => setCountryIndex(index)}
                >
                  {country}
                </button>
              ))}
            </div>
            <p role="status" className="sr-only">
              {zh
                ? "显示 " + cities.length + " 个目的地"
                : cities.length + " destinations shown"}
            </p>
            <div className="network-destinations">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={"/regions/" + city.slug}
                  className="network-destination"
                >
                  <div>
                    <span>{city.country}</span>
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
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <h2>
              {zh
                ? "丰吉国际，立足连云港"
                : "Fengji International. Based in Lianyungang."}
            </h2>
            <p className="mt-6">{t.pages.aboutIntro}</p>
            <dl className="company-practices">
              {t.home.metrics.map((item) => (
                <div key={item.value}>
                  <dt>{item.value}</dt>
                  <dd>{item.label}</dd>
                </div>
              ))}
            </dl>
            <Link href="/about" className="text-link mt-6">
              {zh ? "了解丰吉国际" : "About Fengji"}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <figure className="company-scene">
            <Image
              src={logisticsScenes.warehouse.src}
              alt={
                zh
                  ? logisticsScenes.warehouse.altZh
                  : logisticsScenes.warehouse.altEn
              }
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="site-section bg-secondary/50">
        <div className="container">
          <div className="section-heading corporate-section-heading">
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
            <div className="home-notes-grid">
              {recentPosts.map((post, index) => (
                <article
                  className={
                    index === 0 ? "home-note home-note-lead" : "home-note"
                  }
                  key={post.slug}
                >
                  <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{date(post.date)}</time>
                    {post.category && <span>{post.category}</span>}
                  </div>
                  <h3>
                    <Link href={"/news/" + post.slug}>{post.title}</Link>
                  </h3>
                  <p>{post.summary}</p>
                  <Link
                    href={"/news/" + post.slug}
                    aria-label={t.cta.read + ": " + post.title}
                    className="text-link mt-4 text-sm"
                  >
                    {t.cta.read}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="border-t py-8">{t.detail.emptyNews}</p>
          )}
        </div>
      </section>

      <section id="contact" className="site-section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2>{t.home.contactTitle}</h2>
            <p className="mt-6 max-w-md">{t.home.contactIntro}</p>
            <a
              href={"tel:" + contact.phoneHref}
              className="text-link mt-8 text-xl"
            >
              <Phone aria-hidden="true" />
              {contact.phone}
            </a>
            <p className="mt-3 text-sm">
              {zh ? contact.addressZh : contact.addressEn}
            </p>
            <ul className="mt-8 space-y-3 border-t pt-6 text-sm text-muted-foreground">
              {t.home.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="info-panel bg-secondary/30">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
