"use client";

import Image from "next/image";
import {
  PageIntro,
  InquiryCallout,
  ProcessList,
  SceneCaption,
} from "@/components/site-sections";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";
import { logisticsScenes } from "@/lib/visual-assets";

export default function AboutClient() {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  return (
    <main id="main-content" className="site-main">
      <PageIntro
        title={zh ? "关于丰吉国际" : "About Fengji International"}
        description={t.pages.aboutIntro}
        trail={[{ label: t.nav.about }]}
        scene="train"
      />
      <section className="site-section">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <figure className="company-scene">
            <Image
              src={logisticsScenes.warehouse.src}
              alt={
                zh
                  ? logisticsScenes.warehouse.altZh
                  : logisticsScenes.warehouse.altEn
              }
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption>
              <SceneCaption />
            </figcaption>
          </figure>
          <div>
            <h2>
              {zh ? "从货物与线路条件出发" : "A route starts with the cargo."}
            </h2>
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
