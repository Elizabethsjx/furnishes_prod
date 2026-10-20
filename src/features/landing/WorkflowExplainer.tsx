"use client";

import { useEffect, useState } from "react";
import s from "./workflow-explainer.module.css";

const steps = [
  {
    label: "Customer brief",
    title: "Tell us what you need.",
    detail:
      "Room use, preferred styles, storage needs and budget — collected in one brief.",
  },
  {
    label: "Furniture list",
    title: "Get a furniture shortlist with prices.",
    detail:
      "Review product references, dimensions and supplier quotes before selecting.",
  },
  {
    label: "2D → 3D",
    title: "See the floor plan as a space.",
    detail:
      "Use a prepared 3D planning model to discuss the layout and room proportions.",
  },
  {
    label: "Furniture in space",
    title: "Place furniture. Review the cost.",
    detail:
      "Illustrative placement connects a furniture selection with its position and reference price.",
  },
];
const items = [
  {
    image: "product-0-0.png",
    name: "Gas-lift storage bed",
    specification: "1.5 / 1.8 m options",
    price: "Confirm quote",
  },
  {
    image: "product-1-0.png",
    name: "Study desk",
    specification: "Individual colour options",
    price: "S$156",
  },
  {
    image: "product-0-1.png",
    name: "Dining table + 6 chairs",
    specification: "1.8 × 0.8 m table",
    price: "S$683",
  },
];

export function WorkflowExplainer() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(preference.matches);
      setPlaying(!preference.matches);
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setStep((value) => (value + 1) % steps.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [playing, step]);
  const current = steps[step]!;
  return (
    <section
      className={s.explainer}
      aria-label="Furniture planning workflow example"
      data-reduced-motion={reducedMotion}
    >
      <div className={s.top}>
        <span>[ HOW FURNISHES WORKS ]</span>
        <span>0{step + 1} / 04</span>
      </div>
      <div
        className={s.stage}
        data-testid="workflow-scene"
        data-step={step + 1}
      >
        <div key={step} className={s.scene}>
          {step === 0 && (
            <div className={s.brief}>
              <span className={s.sheetLabel}>PROJECT BRIEF / FAMILY BTO</span>
              <div className={s.message}>
                “We want storage beds and a study space for each of our three
                daughters.”
              </div>
              <div className={s.briefRow}>
                <span>SPACE</span>
                <strong>New BTO apartment</strong>
              </div>
              <div className={s.briefRow}>
                <span>PRIORITIES</span>
                <strong>Storage · personal styles · budget</strong>
              </div>
              <div className={s.attached}>
                <img
                  src="/cases/bto-family/floor-plan.png"
                  alt="Example customer floor plan"
                />
                <div>
                  <strong>Floor plan attached</strong>
                  <small>Reference styles + furniture requirements</small>
                </div>
                <span>✓</span>
              </div>
              <div className={s.outcome}>
                ✓ A clear brief for furniture sourcing
              </div>
            </div>
          )}
          {step === 1 && (
            <div className={s.shortlist}>
              <div className={s.sheetLabel}>
                FURNITURE SHORTLIST <span>REFERENCE PRICES / SGD</span>
              </div>
              {items.map((item) => (
                <div className={s.item} key={item.name}>
                  <img
                    src={`/cases/bto-family/${item.image}`}
                    alt={item.name}
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.specification}</small>
                  </div>
                  <b>{item.price}</b>
                </div>
              ))}
              <div className={s.outcome}>
                Compare specifications and quotes in one list.
              </div>
            </div>
          )}
          {step === 2 && (
            <div className={s.conversion}>
              <figure>
                <span>01 / SOURCE FLOOR PLAN</span>
                <img
                  className={s.plan}
                  src="/cases/bto-family/floor-plan.png"
                  alt="Two-dimensional source floor plan"
                />
              </figure>
              <div className={s.arrow} aria-hidden="true">
                ↓
              </div>
              <figure>
                <span>02 / 3D PLANNING REFERENCE</span>
                <img
                  src="/cases/bto-family/space-reference.png"
                  alt="Prepared three-dimensional apartment reference"
                />
              </figure>
            </div>
          )}
          {step === 3 && (
            <div className={s.placement}>
              <span className={s.sheetLabel}>
                FURNITURE PLACEMENT / ILLUSTRATIVE
              </span>
              <img
                className={s.room}
                src="/cases/bto-family/space-reference.png"
                alt="Apartment planning reference with an illustrative dining furniture selection"
              />
              <div className={s.target} aria-hidden="true">
                <span>+</span>
              </div>
              <div className={s.placedCard}>
                <img
                  src="/cases/bto-family/product-0-1.png"
                  alt="Selected dining table and six chairs"
                />
                <div>
                  <small>SELECTED FURNITURE</small>
                  <strong>Dining set</strong>
                  <b>
                    S$683 <span>reference</span>
                  </b>
                </div>
              </div>
              <div className={s.placementNote}>
                Dining zone · 1.8 × 0.8 m table
                <br />
                Model furniture is illustrative, not an exact SKU.
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={s.caption}>
        <h2>{current.title}</h2>
        <p>{current.detail}</p>
      </div>
      <div className={s.controls}>
        <div className={s.stepButtons} aria-label="Choose an explanation step">
          {steps.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={step === i}
              onClick={() => {
                setStep(i);
                setPlaying(false);
              }}
            >
              <span>0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <button
          className={s.play}
          type="button"
          aria-label={playing ? "Pause explanation" : "Play explanation"}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? "Ⅱ Pause" : "▶ Play"}
        </button>
      </div>
      <p className={s.disclosure}>
        Workflow illustration using a prepared case; not a live automatic
        conversion. Prices from the case shortlist, not final landed quotes.
        Shipping, tax and installation inclusion remain unconfirmed.
      </p>
    </section>
  );
}
