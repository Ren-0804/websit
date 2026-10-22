"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/site-sections";
import { useLanguage } from "@/components/language-selector";
import { contact, getCopy } from "@/lib/i18n";

export default function ContactClient() {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage.code === "zh";
  const t = getCopy(currentLanguage.code);
  const details = [
    {
      icon: Phone,
      label: zh ? "电话" : "Phone",
      value: contact.phone,
      href: "tel:" + contact.phoneHref,
    },
    {
      icon: Mail,
      label: zh ? "邮箱" : "Email",
      value: contact.email,
      href: "mailto:" + contact.email,
    },
    {
      icon: MapPin,
      label: zh ? "地址" : "Address",
      value: zh ? contact.addressZh : contact.addressEn,
      href: undefined,
    },
  ];
  return (
    <main id="main-content" className="site-main">
      <PageIntro
        title={t.pages.contactTitle}
        description={t.pages.contactIntro}
      />
      <section className="site-section">
        <div className="container mb-6 flex flex-wrap gap-x-6 gap-y-1 lg:hidden">
          <a
            href={"tel:" + contact.phoneHref}
            className="text-link min-h-11 text-sm"
          >
            <Phone aria-hidden="true" />
            {zh ? "电话咨询" : "Call our team"}
          </a>
          <a
            href={"mailto:" + contact.email}
            className="text-link min-h-11 text-sm"
          >
            <Mail aria-hidden="true" />
            {zh ? "邮件联系" : "Email our team"}
          </a>
        </div>
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="info-panel lg:order-last">
            <h2 className="mb-5 border-b pb-4 text-2xl">
              {zh ? "填写基础货物信息" : "Tell us about your cargo"}
            </h2>
            <ContactForm />
          </div>
          <aside>
            <h2 className="text-2xl">
              {zh ? "直接与我们联系" : "Talk to our team"}
            </h2>
            <div className="mt-6 divide-y border-y">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4 py-5">
                    <Icon
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-primary"
                    />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block break-all font-medium text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="mt-1 text-sm leading-7">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <h3 className="mt-10 text-lg">
              {zh ? "收到信息后，如何推进？" : "What happens next?"}
            </h3>
            <ol className="mt-5 space-y-4">
              {t.home.metrics.map((item, index) => (
                <li key={item.value} className="flex gap-3 text-sm">
                  <span className="font-semibold text-primary">
                    {index + 1}.
                  </span>
                  <div>
                    <strong>{item.value}</strong>
                    <p className="mt-1 text-sm">{item.label}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}
