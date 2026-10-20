"use client";
import { useRef, useState, type FormEvent } from "react";
import s from "./corporate.module.css";

export function ProjectEnquiry({
  initialType = "",
  collection = "",
}: {
  initialType?: string;
  collection?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  function brief(form: HTMLFormElement) {
    const data = new FormData(form);
    const rows = [
      ["Name", "name"],
      ["Email", "email"],
      ["Company", "company"],
      ["Project type", "type"],
      ["Project location", "location"],
      ["Budget & currency", "budget"],
      ["Target timing", "timing"],
      ["Area / quantities", "quantity"],
      ["Requirements", "requirements"],
    ];
    return (
      rows
        .map(
          ([label, key]) =>
            `${label}: ${String(data.get(key!) || "Not specified").trim()}`,
        )
        .join("\n") +
      "\n\nFloor plan / reference images: attach to this email if available."
    );
  }
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = brief(event.currentTarget);
    window.location.href = `mailto:hello@furnish-es.com?subject=${encodeURIComponent("Furnishes project enquiry")}&body=${encodeURIComponent(text)}`;
    setStatus(
      "Email draft requested. Please attach any plans and send it from your email app. Nothing has been submitted on this website. If your email app did not open, copy the brief below.",
    );
  }
  async function copyBrief() {
    if (!formRef.current) return;
    try {
      await navigator.clipboard.writeText(brief(formRef.current));
      setStatus(
        "Brief copied. Paste it into an email to hello@furnish-es.com and attach your plans.",
      );
    } catch {
      setStatus(
        "Copy is unavailable in this browser. Please email your requirements directly to hello@furnish-es.com.",
      );
    }
  }
  return (
    <form ref={formRef} className={s.form} onSubmit={prepareEmail}>
      <label>
        Your name *
        <input name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        Email *
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
        />
      </label>
      <label>
        Company <span>(optional)</span>
        <input name="company" autoComplete="organization" maxLength={120} />
      </label>
      <label>
        Project type *
        <select
          name="type"
          required
          defaultValue={
            [
              "residential",
              "commercial",
              "space-planning",
              "partnership",
            ].includes(initialType)
              ? initialType
              : ""
          }
        >
          <option value="" disabled>
            Select a project type
          </option>
          <option value="residential">Home furniture</option>
          <option value="commercial">Commercial furniture</option>
          <option value="space-planning">Spatial planning</option>
          <option value="partnership">Supplier / designer collaboration</option>
        </select>
      </label>
      <label>
        Project location
        <input
          name="location"
          placeholder="City / neighbourhood"
          maxLength={160}
        />
      </label>
      <label>
        Budget & currency
        <input
          name="budget"
          placeholder="e.g. SGD 15,000–25,000"
          maxLength={80}
        />
      </label>
      <label>
        Target timing
        <input name="timing" placeholder="e.g. March 2027" maxLength={80} />
      </label>
      <label>
        Area / quantities
        <input
          name="quantity"
          placeholder="e.g. 120 m² / 20 workstations"
          maxLength={100}
        />
      </label>
      <label className={s.fullWidth}>
        What would you like help with? *
        <textarea
          name="requirements"
          required
          maxLength={1500}
          defaultValue={
            collection
              ? `I would like images and specifications for ${collection}.`
              : ""
          }
          placeholder="Furniture needs, style references, dimensions or questions…"
        />
      </label>
      <p className={`${s.note} ${s.fullWidth}`}>
        This form prepares an email in your email app. Attach your floor plan
        there. Your enquiry is sent only when you send that email.{" "}
        <a className={s.textLink} href="/privacy-policy">
          Privacy notice ↗
        </a>
      </p>
      <div className={`${s.actions} ${s.fullWidth}`}>
        <button className={s.button} type="submit">
          Prepare project email ↗
        </button>
        <button className={s.textLink} type="button" onClick={copyBrief}>
          Copy project brief
        </button>
      </div>
      <p
        className={`${s.formStatus} ${s.fullWidth}`}
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}
