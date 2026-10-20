"use client";
import { useEffect, useState } from "react";
import { LandingHero } from "@/features/landing/LandingHero";
import s from "./spatial.module.css";

export function SpatialExperience() {
  const [intro, setIntro] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let seen = false;
    try {
      seen = sessionStorage.getItem("furnishes-assembly-seen") === "1";
    } catch {
      /* Storage may be unavailable; the intro still completes. */
    }
    if (media.matches || seen) return;
    setIntro(true);
    const start = performance.now();
    const timer = window.setInterval(
      () =>
        setProgress(
          Math.min(100, Math.round((performance.now() - start) / 16)),
        ),
      80,
    );
    const finish = () => {
      clearInterval(timer);
      setProgress(100);
      setIntro(false);
      try {
        sessionStorage.setItem("furnishes-assembly-seen", "1");
      } catch {
        /* Storage may be unavailable; the intro still completes. */
      }
    };
    const timeout = window.setTimeout(finish, 1700);
    const changed = () => {
      if (media.matches) finish();
    };
    media.addEventListener("change", changed);
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
      media.removeEventListener("change", changed);
    };
  }, []);
  return (
    <>
      <div className={s.world}>
        <LandingHero skipIntro overviewZoom={2.8} captureSnapshot={false} />
        <p className={s.worldLabel}>A SPACE FOR PEOPLE · INTERACTIVE CONCEPT</p>
      </div>
      {intro && (
        <div
          className={s.intro}
          data-assembly-intro=""
          aria-label="Furniture assembly introduction"
        >
          <span className={s.introBrand}>furnishes.</span>
          <div className={s.chair} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>Making room for you.</p>
          <span className={s.percent}>
            ASSEMBLY / {String(progress).padStart(2, "0")}%
          </span>
          <button
            onClick={() => {
              setIntro(false);
              try {
                sessionStorage.setItem("furnishes-assembly-seen", "1");
              } catch {
                /* Storage may be unavailable; the intro still completes. */
              }
            }}
          >
            Skip introduction ↗
          </button>
        </div>
      )}
    </>
  );
}
