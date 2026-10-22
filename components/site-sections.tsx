"use client";

import {
  ArrowRight,
  ChevronRight,
  Route,
  Train,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";

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
}: {
  title: string;
  description?: string;
  trail?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <Breadcrumbs items={trail || [{ label: title }]} />
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  );
}

export function RouteInquiry({
  showServiceLink = false,
}: {
  showServiceLink?: boolean;
}) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const id = useId();
  return (
    <div className="inquiry-strip">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-1">
        <h2 className="text-base">{t.cta.route}</h2>
        {showServiceLink && (
          <Link href="/services" className="text-link text-sm">
            {t.cta.services}
            <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </div>
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
        <button type="submit" className="button-link md:min-h-[50px]">
          {currentLanguage.code === "zh"
            ? "继续填写货物信息"
            : "Continue with cargo details"}
          <ArrowRight aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

const icons = { train: Train, route: Route, warehouse: Warehouse };
export function ServiceList({ detailed = false }: { detailed?: boolean }) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  return (
    <div>
      {t.services.map((service) => {
        const Icon = icons[service.icon];
        return (
          <article className="service-row" key={service.slug}>
            <Icon aria-hidden="true" />
            <h3>
              <Link
                href={"/services/" + service.slug}
                className="hover:text-primary"
              >
                {service.title}
              </Link>
            </h3>
            <div>
              <p>{detailed ? service.summary : service.short}</p>
              {detailed && (
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {service.bullets.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              href={"/services/" + service.slug}
              className="text-link text-sm"
            >
              {t.cta.read}
              <ArrowRight aria-hidden="true" />
            </Link>
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
