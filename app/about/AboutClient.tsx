"use client";

import Image from "next/image";
import {
  PageIntro,
  InquiryCallout,
  ProcessList,
} from "@/components/site-sections";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";

export default function AboutClient() {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  return (
    <main id="main-content" className="site-main">
      <PageIntro
        title={t.pages.aboutTitle}
        description={t.pages.aboutIntro}
        trail={[{ label: t.nav.about }]}
      />
      <section className="site-section">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/service-1.jpg"
              alt={zh ? "仓储作业场景" : "Warehouse operations"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2>{t.home.servicesTitle}</h2>
            <p className="mt-5">{t.home.servicesIntro}</p>
            <dl className="mt-8 divide-y border-y">
              {t.home.metrics.map((item) => (
                <div key={item.value} className="py-5">
                  <dt className="font-semibold text-primary">{item.value}</dt>
                  <dd className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section className="site-section bg-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>{t.pages.processTitle}</h2>
              <p>{t.home.contactIntro}</p>
            </div>
          </div>
          <ProcessList />
        </div>
      </section>
      <InquiryCallout />
    </main>
  );
}
