"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/language-selector";
import { getCopy } from "@/lib/i18n";

type ContactFormData = {
  name: string;
  contactMethod: string;
  company: string;
  origin: string;
  destination: string;
  cargoInfo: string;
  shippingTime: string;
};
const empty: ContactFormData = {
  name: "",
  contactMethod: "",
  company: "",
  origin: "",
  destination: "",
  cargoInfo: "",
  shippingTime: "",
};

export function ContactForm() {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage.code === "zh";
  const t = getCopy(currentLanguage.code).form;
  const id = useId();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContactFormData>(empty);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  useEffect(() => {
    if (window.location.pathname !== "/contact") return;
    const query = new URLSearchParams(window.location.search);
    setData((current) => ({
      ...current,
      origin: (query.get("origin") || "").slice(0, 120),
      destination: (query.get("destination") || "").slice(0, 120),
    }));
  }, []);
  function update(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setFeedback(null);
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("send failed");
      setData(empty);
      setFeedback("success");
    } catch {
      setFeedback("error");
    } finally {
      setLoading(false);
    }
  }
  const field = (
    name: Exclude<keyof ContactFormData, "cargoInfo">,
    label: string,
    placeholder: string,
    required = false,
    autoComplete?: string,
  ) => (
    <div>
      <label className="field-label" htmlFor={id + name}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-primary">
            *
          </span>
        )}
        {!required && (
          <span className="ml-2 font-normal text-muted-foreground">
            ({zh ? "选填" : "optional"})
          </span>
        )}
      </label>
      <input
        className="field"
        id={id + name}
        name={name}
        value={data[name]}
        onChange={update}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
  return (
    <form onSubmit={submit} aria-busy={loading} className="space-y-6">
      <p className="text-sm">
        {zh
          ? "标有 * 的为必填项，其余可选填。"
          : "Fields marked * are required. All others are optional."}
      </p>
      <fieldset disabled={loading} className="space-y-4 md:space-y-5">
        <legend className="mb-4 text-lg font-semibold">
          {zh ? "线路与货物" : "Route and cargo"}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
          {field("origin", t.origin, t.originPlaceholder, true)}
          {field("destination", t.destination, t.destinationPlaceholder, true)}
        </div>
        <div>
          <label className="field-label" htmlFor={id + "cargoInfo"}>
            {t.cargoInfo}
            <span aria-hidden="true" className="ml-1 text-primary">
              *
            </span>
          </label>
          <textarea
            className="field min-h-28 resize-y"
            id={id + "cargoInfo"}
            name="cargoInfo"
            value={data.cargoInfo}
            onChange={update}
            placeholder={t.cargoPlaceholder}
            required
            aria-required="true"
            rows={3}
          />
        </div>
        {field("shippingTime", t.shippingTime, t.shippingTimePlaceholder)}
      </fieldset>
      <fieldset
        disabled={loading}
        className="space-y-4 border-t pt-5 md:space-y-5"
      >
        <legend className="float-left mb-4 w-full text-lg font-semibold">
          {zh ? "联系信息" : "Your contact details"}
        </legend>
        <div className="clear-both grid gap-4 sm:grid-cols-2 md:gap-5">
          {field("name", t.name, t.namePlaceholder, true, "name")}
          {field("contactMethod", t.contactMethod, t.contactPlaceholder, true)}
        </div>
        {field(
          "company",
          t.company,
          t.companyPlaceholder,
          false,
          "organization",
        )}
      </fieldset>
      {feedback && (
        <div
          role={feedback === "error" ? "alert" : "status"}
          className={
            "flex gap-3 rounded-md p-4 text-sm " +
            (feedback === "error"
              ? "bg-red-50 text-red-900"
              : "bg-secondary text-foreground")
          }
        >
          {feedback === "error" ? (
            <AlertCircle
              className="mt-1 h-5 w-5 flex-none"
              aria-hidden="true"
            />
          ) : (
            <CheckCircle2
              className="mt-1 h-5 w-5 flex-none"
              aria-hidden="true"
            />
          )}
          <div>
            <strong>
              {feedback === "error" ? t.errorTitle : t.successTitle}
            </strong>
            <div className="mt-1">
              {feedback === "error" ? t.errorText : t.successText}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">{t.promise}</p>
        <button
          disabled={loading}
          type="submit"
          className="button-link flex-none"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
