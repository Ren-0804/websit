"use client";

import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { PageIntro, InquiryCallout } from "@/components/site-sections";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";

export default function RegionsClient() {
  const { currentLanguage } = useLanguage();
  const t = getCopy(currentLanguage.code);
  const zh = currentLanguage.code === "zh";
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const id = useId();
  useEffect(() => {
    setCountry("");
    setQuery("");
  }, [currentLanguage.code]);
  const countries = Array.from(new Set(t.cities.map((city) => city.country)));
  const visible = t.cities.filter(
    (city) =>
      (!country || city.country === country) &&
      (city.name + " " + city.country + " " + city.slug)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <main id="main-content" className="site-main">
      <PageIntro
        title={t.pages.regionsTitle}
        scene="train"
        description={t.pages.regionsIntro}
      />
      <section className="site-section">
        <div className="container">
          <div className="flex flex-col gap-5 border-b pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={zh ? "按国家筛选" : "Filter by country"}
            >
              {["", ...countries].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={country === item}
                  onClick={() => setCountry(item)}
                  className={
                    "min-h-11 rounded-md px-4 py-2 text-sm font-medium transition-colors " +
                    (country === item
                      ? "bg-primary text-white"
                      : "bg-white text-foreground ring-1 ring-inset ring-border hover:bg-secondary")
                  }
                >
                  {item || (zh ? "全部地区" : "All regions")}
                </button>
              ))}
            </div>
            <div className="w-full lg:max-w-xs">
              <label htmlFor={id} className="sr-only">
                {zh ? "搜索城市或国家" : "Search city or country"}
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-3 top-4 h-4 w-4 text-muted-foreground"
                />
                <input
                  id={id}
                  className="field pl-10"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={zh ? "搜索城市或国家" : "Search city or country"}
                />
              </div>
            </div>
          </div>
          <p role="status" className="py-5 text-sm">
            {zh
              ? "找到 " + visible.length + " 个目的地方向"
              : visible.length + " destinations found"}
          </p>
          <div className="grid gap-x-14 md:grid-cols-2">
            {visible.map((city) => (
              <Link
                key={city.slug}
                href={"/regions/" + city.slug}
                className="region-item"
              >
                <div>
                  <span className="region-country">{city.country}</span>
                  <h2 className="text-2xl">{city.name}</h2>
                  <p>{city.summary}</p>
                  <span className="text-link mt-3 text-sm">{t.cta.read}</span>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
          {!visible.length && (
            <div className="rounded-xl bg-white py-12 text-center">
              <h2 className="text-xl">
                {zh ? "没有匹配的地区" : "No matching region"}
              </h2>
              <p className="mt-3">
                {zh
                  ? "试试其他城市名，或清除筛选条件。"
                  : "Try another city or clear the filters."}
              </p>
              <button
                type="button"
                className="text-link mt-4"
                onClick={() => {
                  setCountry("");
                  setQuery("");
                }}
              >
                {zh ? "清除筛选" : "Clear filters"}
              </button>
            </div>
          )}
        </div>
      </section>
      <InquiryCallout />
    </main>
  );
}
