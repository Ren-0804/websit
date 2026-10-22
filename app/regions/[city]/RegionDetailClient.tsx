"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-selector";
import { PageIntro, InquiryCallout } from "@/components/site-sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCopy, type CitySlug } from "@/lib/i18n";

export default function RegionDetailClient({
  citySlug,
}: {
  citySlug: CitySlug;
}) {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const city = t.cities.find((item) => item.slug === citySlug);
  if (!city) return null;
  const faqs = [
    { q: city.name + " · " + t.detail.timing, a: t.detail.timingNote },
    {
      q: t.detail.available,
      a: t.services.map((service) => service.title).join(" / "),
    },
  ];
  return (
    <main id="main-content" className="site-main">
      <PageIntro
        title={city.name + " · " + city.country}
        scene="train"
        description={city.summary}
        trail={[
          { label: t.nav.regions, href: "/regions" },
          { label: city.name },
        ]}
      >
        <Link
          href={"/contact?destination=" + encodeURIComponent(city.name)}
          className="text-link mt-5"
        >
          {t.cta.route}
          <ArrowRight aria-hidden="true" />
        </Link>
      </PageIntro>
      <section className="site-section">
        <div className="container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <h2>{t.detail.available}</h2>
            <p className="mt-5">{city.summary}</p>
          </div>
          <div>
            {t.services.map((service) => (
              <Link
                href={"/services/" + service.slug}
                key={service.slug}
                className="group grid grid-cols-[1fr_auto] gap-5 border-t py-6"
              >
                <div>
                  <h3 className="group-hover:text-primary">{service.title}</h3>
                  <p className="mt-3 text-sm">{service.short}</p>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <h2>{t.detail.timing}</h2>
            <p className="mt-5">{t.detail.timingNote}</p>
          </div>
          <Accordion type="single" collapsible className="border-t">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={"faq-" + index}>
                <AccordionTrigger className="py-6 text-left text-base hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-8 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <InquiryCallout destination={city.name} />
    </main>
  );
}
