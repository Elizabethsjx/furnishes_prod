"use client";

import { useState } from "react";
import s from "./selection-studio.module.css";
const products = [
  {
    id: "bed",
    category: "Bedroom",
    name: "Gas-lift storage bed",
    image: "product-0-0.png",
    spec: "1.5 × 2 m / 1.8 × 2 m options",
    finish: "Upholstered · finish to confirm",
    price: null,
  },
  {
    id: "desk",
    category: "Study",
    name: "Individual study desk",
    image: "product-1-0.png",
    spec: "Dimensions to confirm with supplier",
    finish: "Grey / white reference",
    price: 156,
  },
  {
    id: "dining",
    category: "Dining",
    name: "Dining table & six chairs",
    image: "product-0-1.png",
    spec: "1.8 × 0.8 m table",
    finish: "Finish to confirm with supplier",
    price: 683,
  },
];
const money = (value: number) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0,
  }).format(value);
export function SelectionStudio() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [compare, setCompare] = useState(false);
  const chosen = products.filter((p) => selected.includes(p.id));
  const total = chosen.reduce((sum, p) => sum + (p.price ?? 0), 0);
  const quoted = chosen.filter((p) => p.price !== null).length;
  function toggle(id: string) {
    setSelected((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  }
  function download() {
    const lines = [
      "FURNISHES — SAMPLE FURNITURE SHORTLIST",
      "Reference: anonymised Singapore BTO planning case",
      "",
      ...chosen.flatMap((p) => [
        p.name,
        p.spec,
        p.finish,
        p.price === null
          ? "Price: quote to confirm"
          : `Reference price: ${money(p.price)}`,
        "",
      ]),
      `Known reference-price subtotal: ${money(total)} (${quoted} priced selection(s))`,
      "Unquoted selections excluded. One reference selection per row; quantities are not specified.",
      "Historical shortlist references only. Shipping, tax, installation, current availability and final specifications require confirmation.",
      "This is an exploratory list, not an order or a confirmed quotation.",
    ];
    const url = URL.createObjectURL(
      new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "furnishes-sample-shortlist.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section
      id="selection"
      className={s.section}
      aria-labelledby="selection-title"
    >
      <div className={s.heading}>
        <div>
          <p className={s.kicker}>FURNITURE SELECTION / CASE REFERENCES</p>
          <h2 id="selection-title">
            Compare the pieces.
            <br />
            See what adds up.
          </h2>
        </div>
        <p>
          Explore a selection from the BTO case. Review specifications, build a
          sample shortlist and export it for discussion.
        </p>
      </div>
      <div className={s.tabs} aria-label="Filter furniture">
        {["All", "Bedroom", "Study", "Dining"].map((f) => (
          <button
            type="button"
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        <span>3 reference selections · SGD</span>
      </div>
      <div className={s.layout}>
        <div className={s.grid}>
          {products
            .filter((p) => filter === "All" || p.category === filter)
            .map((p) => (
              <article className={s.product} key={p.id}>
                <div className={`${s.photo} ${p.id === "bed" ? s.bed : ""}`}>
                  <img
                    src={`/cases/bto-family/${p.image}`}
                    alt={p.name}
                    loading="lazy"
                  />
                  <span>{p.category}</span>
                </div>
                <div className={s.productCopy}>
                  <h3>{p.name}</h3>
                  <p>{p.spec}</p>
                  <div className={s.price}>
                    {p.price === null ? "Quote to confirm" : money(p.price)}
                    <small>
                      {p.price === null
                        ? "Options available"
                        : "Recorded reference price"}
                    </small>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(p.id)}
                    aria-pressed={selected.includes(p.id)}
                    aria-label={`${selected.includes(p.id) ? "Remove" : "Add"} ${p.name}`}
                  >
                    {selected.includes(p.id)
                      ? "✓ In shortlist"
                      : "+ Add to shortlist"}
                  </button>
                </div>
              </article>
            ))}
        </div>
        <aside className={s.summary} aria-label="Sample shortlist">
          <p className={s.kicker}>YOUR SAMPLE SHORTLIST</p>
          <h3>
            {chosen.length} selection{chosen.length === 1 ? "" : "s"}
          </h3>
          {chosen.length ? (
            <ul>
              {chosen.map((p) => (
                <li key={p.id}>
                  <span>{p.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${p.name} from summary`}
                    onClick={() => toggle(p.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.empty}>
              Choose pieces to review their reference prices together.
            </p>
          )}
          <div className={s.total}>
            <span>Known-price subtotal</span>
            <strong>{money(total)}</strong>
            <small>
              {quoted} priced selection(s) · unquoted items excluded
            </small>
          </div>
          <button
            className={s.primary}
            type="button"
            disabled={chosen.length === 0}
            onClick={download}
          >
            Export shortlist ↓
          </button>
          <button
            className={s.secondary}
            type="button"
            disabled={chosen.length < 2}
            aria-expanded={compare && chosen.length >= 2}
            onClick={() => setCompare(!compare)}
          >
            {compare ? "Hide comparison" : "Compare selections"}
          </button>
          <p className={s.fine}>
            Sample only, not an order. No quantities included. Shipping, tax and
            installation inclusion remain unconfirmed.
          </p>
        </aside>
      </div>
      {compare && chosen.length >= 2 && (
        <div className={s.comparison}>
          <table>
            <caption>Selected furniture comparison</caption>
            <thead>
              <tr>
                <th scope="col">Detail</th>
                {chosen.map((p) => (
                  <th scope="col" key={p.id}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Specification</th>
                {chosen.map((p) => (
                  <td key={p.id}>{p.spec}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Finish</th>
                {chosen.map((p) => (
                  <td key={p.id}>{p.finish}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Reference price</th>
                {chosen.map((p) => (
                  <td key={p.id}>
                    {p.price === null ? "Confirm quote" : money(p.price)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <p className={s.footnote}>
        Product imagery and prices are drawn from the client's sourcing
        document. This is not a live catalogue. Confirm final specifications,
        supplier availability and landed costs before purchasing.
      </p>
    </section>
  );
}
