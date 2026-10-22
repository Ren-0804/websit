"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-selector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageIntro, InquiryCallout } from "@/components/site-sections";
import { getCopy, type ServiceSlug } from "@/lib/i18n";

export default function ServiceDetailClient({ slug }: { slug: ServiceSlug }) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const service = t.services.find((item) => item.slug === slug);
  if (!service) return null;
  return (
    <main id="main-content" className="site-main">
      <PageIntro
        title={service.title}
        description={service.summary}
        trail={[
          { label: t.nav.services, href: "/services" },
          { label: service.title },
        ]}
      >
        <Link href="/contact" className="text-link mt-5">
          {t.cta.route}
          <ArrowRight aria-hidden="true" />
        </Link>
      </PageIntro>
      <section className="site-section">
        <div className="container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <h2>{t.detail.execution}</h2>
            <p className="mt-5">{service.short}</p>
          </div>
          <ul className="divide-y border-y">
            {service.bullets.map((point) => (
              <li key={point} className="flex gap-4 py-6 text-lg font-medium">
                <Check
                  className="mt-1 h-5 w-5 flex-none text-primary"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="site-section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <h2>{t.detail.scenarios}</h2>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {service.scenarios.map((item) => (
              <li key={item} className="border-t py-5 font-medium">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="site-section">
        <div className="container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <h2>{t.detail.faq}</h2>
          <Accordion type="single" collapsible className="border-t">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={"faq-" + index}>
                <AccordionTrigger className="py-6 text-left text-base font-medium hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-base leading-8 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <InquiryCallout />
    </main>
  );
}
