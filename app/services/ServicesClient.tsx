"use client";

import {
  PageIntro,
  ServiceList,
  ProcessList,
  InquiryCallout,
} from "@/components/site-sections";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";

export default function ServicesClient() {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  return (
    <main id="main-content" className="site-main">
      <PageIntro
        title={t.pages.servicesTitle}
        scene="train"
        description={t.pages.servicesIntro}
      />
      <section className="site-section bg-white">
        <div className="container">
          <h2 className="sr-only">{t.detail.available}</h2>
          <ServiceList detailed />
        </div>
      </section>
      <section className="site-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>{t.pages.processTitle}</h2>
              <p>{t.home.servicesIntro}</p>
            </div>
          </div>
          <ProcessList />
        </div>
      </section>
      <InquiryCallout />
    </main>
  );
}
