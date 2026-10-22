"use client";

import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";
import { logisticsScenes, type LogisticsScene } from "@/lib/visual-assets";

export function SceneCaption() {
  const { currentLanguage } = useLanguage();
  return (
    <span className="scene-caption">
      {currentLanguage.code === "zh"
        ? "AI 生成 · 场景示意"
        : "AI-generated illustrative scene"}
    </span>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const { currentLanguage } = useLanguage();
  return (
    <nav
      className="breadcrumb"
      aria-label={currentLanguage.code === "zh" ? "面包屑导航" : "Breadcrumb"}
    >
      <Link href="/">{getCopy(currentLanguage.code).nav.home}</Link>
      {items.map((item, index) => (
        <span
          key={item.label + index}
          className="inline-flex items-center gap-2"
        >
          <ChevronRight aria-hidden="true" />
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageIntro({
  title,
  description,
  trail,
  children,
  scene,
}: {
  title: string;
  description?: string;
  trail?: { label: string; href?: string }[];
  children?: React.ReactNode;
  scene?: LogisticsScene;
}) {
  const { currentLanguage } = useLanguage();
  const image = scene ? logisticsScenes[scene] : undefined;
  return (
    <section className={"page-intro " + (image ? "page-intro-visual" : "")}>
      {image && (
        <>
          <Image
            src={image.src}
            alt={currentLanguage.code === "zh" ? image.altZh : image.altEn}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="page-intro-image"
          />
          <div className="page-intro-shade" />
        </>
      )}
      <div className="container relative">
        <div className={image ? "page-intro-copy" : ""}>
          <Breadcrumbs items={trail || [{ label: title }]} />
          <h1>{title}</h1>
          {description && <p>{description}</p>}
          {children}
        </div>
        {image && (
          <div className="mt-8 flex justify-end">
            <SceneCaption />
          </div>
        )}
      </div>
    </section>
  );
}

export function RouteInquiry() {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const id = useId();
  return (
    <div className="container route-console">
      <h2>{t.cta.route}</h2>
      <form action="/contact" method="get" aria-label={t.cta.route}>
        <div>
          <label className="field-label" htmlFor={id + "-origin"}>
            {t.form.origin}
          </label>
          <input
            className="field"
            id={id + "-origin"}
            name="origin"
            placeholder={
              currentLanguage.code === "zh"
                ? "例如：连云港"
                : "e.g. Lianyungang"
            }
            maxLength={120}
          />
        </div>
        <div>
          <label className="field-label" htmlFor={id + "-destination"}>
            {t.form.destination}
          </label>
          <input
            className="field"
            id={id + "-destination"}
            name="destination"
            placeholder={
              currentLanguage.code === "zh" ? "例如：塔什干" : "e.g. Tashkent"
            }
            maxLength={120}
          />
        </div>
        <button type="submit" className="button-link min-h-[50px]">
          {currentLanguage.code === "zh"
            ? "继续填写货物信息"
            : "Continue with cargo details"}
          <ArrowRight aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

export function ServiceList({ detailed = false }: { detailed?: boolean }) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  return (
    <div className={detailed ? "service-features" : "service-gallery"}>
      {t.services.map((service) => {
        const scene = logisticsScenes[service.icon];
        return (
          <article
            className={detailed ? "service-feature" : "service-gallery-item"}
            key={service.slug}
          >
            <Link
              href={"/services/" + service.slug}
              className="service-photograph group"
              aria-label={service.title}
            >
              <Image
                src={scene.src}
                alt={zh ? scene.altZh : scene.altEn}
                fill
                quality={85}
                sizes={
                  detailed
                    ? "(max-width: 1024px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none"
              />
              {!detailed && (
                <div className="service-photo-title">
                  <h3>{service.title}</h3>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              )}
              <div className="service-photo-disclosure">
                <SceneCaption />
              </div>
            </Link>
            <div className="service-description">
              {detailed && (
                <h2>
                  <Link href={"/services/" + service.slug}>
                    {service.title}
                  </Link>
                </h2>
              )}
              <p>{detailed ? service.summary : service.short}</p>
              {detailed && (
                <ul className="mt-6 space-y-3">
                  {service.bullets.map((point) => (
                    <li key={point} className="flex gap-3">
                      <Check
                        className="mt-1 h-4 w-4 flex-none text-primary"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={"/services/" + service.slug}
                className="text-link mt-4 text-sm"
              >
                {t.cta.read}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function InquiryCallout({ destination }: { destination?: string }) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  return (
    <section className="on-dark site-section">
      <div className="container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2>{t.home.contactTitle}</h2>
          <p className="mt-4 max-w-2xl">{t.home.contactIntro}</p>
        </div>
        <Link
          href={
            destination
              ? "/contact?destination=" + encodeURIComponent(destination)
              : "/contact"
          }
          className="button-link w-fit flex-none bg-white text-[#173b84] hover:bg-[#dbe8fc]"
        >
          {t.cta.route}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ProcessList() {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  return (
    <ol className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
      {t.pages.process.map((step, i) => (
        <li key={step} className="flex items-center gap-4 border-t py-6">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
            {i + 1}
          </span>
          <span className="font-medium">{step}</span>
        </li>
      ))}
    </ol>
  );
}
