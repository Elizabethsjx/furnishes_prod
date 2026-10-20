"use client";
import { useEffect, useState } from "react";
import { LandingHero } from "@/features/landing/LandingHero";
import s from "./spatial.module.css";

const INTRO_FADE_AT = 1450;
const INTRO_END_AT = 1700;

export function SpatialExperience() {
  const [intro, setIntro] = useState(false);
  const [leaving, setLeaving] = useState(false);
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
    let endTimer = 0;
    const finish = () => {
      window.clearTimeout(endTimer);
      setIntro(false);
      try {
        sessionStorage.setItem("furnishes-assembly-seen", "1");
      } catch {
        /* Storage may be unavailable; the intro still completes. */
      }
    };
    const fadeTimer = window.setTimeout(() => setLeaving(true), INTRO_FADE_AT);
    endTimer = window.setTimeout(finish, INTRO_END_AT);
    const changed = () => {
      if (media.matches) finish();
    };
    media.addEventListener("change", changed);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
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
          data-leaving={leaving ? "true" : undefined}
          aria-label="Furniture assembly introduction"
        >
          <span className={s.introBrand}>
            furnishes<span lang="zh">空间 · 生活</span>
          </span>
          <div className={s.introChair} aria-hidden="true">
            <svg viewBox="0 0 260 220" role="presentation">
              <g className={s.part}>
                <line x1="42" y1="198" x2="218" y2="198" />
                <path d="M82 198 L91 140 L99 141 L93 198 Z" />
                <path d="M170 141 L178 198 L186 198 L180 140 Z" />
                <line x1="99" y1="173" x2="171" y2="173" />
              </g>
              <g className={s.part}>
                <path d="M89 131 H181 V141 H89 Z" />
              </g>
              <g className={s.part}>
                <path d="M92 136 L71 50 L83 46 L103 132 Z" />
                <path className={s.fill} d="M78 64 L90 61 L99 119 L89 121 Z" />
              </g>
              <g className={s.part}>
                <path d="M84 95 C116 85 152 85 183 95 L183 101 C152 92 116 92 86 101 Z" />
                <line x1="177" y1="101" x2="177" y2="136" />
              </g>
              <g className={s.part}>
                <path
                  className={s.fill}
                  d="M93 116 H177 Q183 116 183 122 V128 Q183 134 177 134 H93 Q87 134 87 128 V122 Q87 116 93 116 Z"
                />
                <path d="M93 121 H177" opacity="0.45" />
              </g>
            </svg>
          </div>
          <p className={s.introCaption}>SPACE · FURNITURE · 3D</p>
          <div className={s.introProgress} aria-hidden="true">
            <i />
          </div>
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
