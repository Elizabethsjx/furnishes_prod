"use client";

import { useEffect, useId, useRef, useState } from "react";
import s from "./heritage.module.css";

const clamp = (n: number) => Math.max(0, Math.min(1, n));

// Native scrolling remains in control; measure only once per animation frame.
function useStory(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const measure = () => {
      frame = 0;
      const steps =
        ref.current?.querySelectorAll<HTMLElement>("[data-story-step]");
      if (!steps?.length) return;
      const firstStep = steps[0];
      const lastStep = steps[steps.length - 1];
      if (!firstStep || !lastStep) return;
      const first = firstStep.getBoundingClientRect();
      const last = lastStep.getBoundingClientRect();
      setProgress(
        clamp(
          (innerHeight * 0.65 - first.top - first.height / 2) /
            Math.max(1, last.top - first.top),
        ),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const preference = () => {
      setReduced(query.matches);
      schedule();
    };
    preference();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    query.addEventListener("change", preference);
    const observer = new ResizeObserver(schedule);
    if (ref.current) observer.observe(ref.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      query.removeEventListener("change", preference);
    };
  }, []);
  const active = Math.round(progress * (count - 1));
  function select(index: number) {
    const step =
      ref.current?.querySelectorAll<HTMLElement>("[data-story-step]")[index];
    if (!step) return;
    const box = step.getBoundingClientRect();
    window.scrollTo({
      top: scrollY + box.top + box.height / 2 - innerHeight * 0.65,
      behavior: reduced ? "instant" : "smooth",
    });
  }
  return { ref, progress, active, reduced, select };
}

function Block({
  x,
  y,
  w,
  h,
  depth,
  fill,
  side,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  fill: string;
  side: string;
}) {
  const dx = depth,
    dy = depth * -0.48;
  return (
    <g stroke="#493b2d" strokeWidth="0.7" strokeLinejoin="round">
      <path
        d={`M${x},${y} l${dx},${dy} h${w} l${-dx},${-dy}Z`}
        fill="#d2b48c"
      />
      <path
        d={`M${x + w},${y} l${dx},${dy} v${h} l${-dx},${-dy}Z`}
        fill={side}
      />
      <rect x={x} y={y} width={w} height={h} fill={fill} />
    </g>
  );
}

export function FurnitureIllustration({
  progress = 0.74,
  hero = false,
}: {
  progress?: number;
  hero?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const build = clamp(progress * 4);
  const finish = clamp((progress - 0.25) * 4);
  const accessories = clamp((progress - 0.48) * 5);
  const regroup = clamp((progress - 0.76) / 0.24);
  const depth = build * 55;
  return (
    <svg
      viewBox="0 0 680 550"
      role="img"
      aria-label={
        hero
          ? "Illustrated modular furniture in a sunlit room; a design concept"
          : "Modular furniture concept progressing from a flat outline to assembled and rearranged storage"
      }
      className={s.furniture}
    >
      <defs>
        <linearGradient id={`${uid}-room`} x2="0.9" y2="1">
          <stop stopColor="#efe5d2" />
          <stop offset="1" stopColor="#ddd4bb" />
        </linearGradient>
        <pattern
          id={`${uid}-grain`}
          width="8"
          height="70"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M2 0 Q7 25 2 70 M6 0 Q2 30 6 70"
            fill="none"
            stroke="#705139"
            strokeOpacity=".12"
            strokeWidth=".5"
          />
        </pattern>
      </defs>
      <rect width="680" height="550" fill={`url(#${uid}-room)`} />
      <path d="M0 420H680V550H0Z" fill="#c6b897" opacity=".35" />
      <g opacity={hero ? 1 : finish}>
        <path d="M405 0H580V344H405Z" fill="#f7edcc" />
        <path
          d="M415 0V344M470 0V344M525 0V344M580 0V344M405 95H580M405 215H580"
          stroke="#b3b098"
          strokeWidth="6"
        />
        <path d="M405 344L245 550H510L580 344" fill="#fff5d2" opacity=".45" />
        <ellipse
          cx="335"
          cy="455"
          rx="240"
          ry="33"
          fill="#665c43"
          opacity=".13"
        />
      </g>
      {[0, 1, 2].map((i) => {
        const x = 118 + i * 135 - (i === 2 ? regroup * 145 : 0);
        const y =
          282 -
          (i === 2 ? regroup * 138 : 0) -
          (1 - build) * (i === 1 ? 20 : -20);
        return (
          <g key={i}>
            <Block
              x={x}
              y={y}
              w={124}
              h={132}
              depth={depth}
              fill={
                finish > 0
                  ? `rgb(${Math.round(211 - finish * 62)},${Math.round(204 - finish * 53)},${Math.round(182 - finish * 67)})`
                  : "#e8dfcd"
              }
              side="#6c745e"
            />
            <rect
              x={x + 9}
              y={y + 11}
              width="106"
              height="110"
              fill="#514d39"
              opacity={build * 0.9}
            />
            <path
              d={`M${x + 10} ${y + 12}h105v95l-105 13Z`}
              fill="#a99a77"
              opacity={build}
            />
            <Block
              x={x - 3}
              y={y - 8}
              w={130}
              h={9}
              depth={depth + build * 3}
              fill="#ae855a"
              side="#7c593d"
            />
            <Block
              x={x + 9}
              y={y + 69}
              w={106}
              h={5}
              depth={depth * 0.2}
              fill="#c5a276"
              side="#776546"
            />
            <rect
              x={x - 3}
              y={y - 8}
              width="130"
              height="9"
              fill={`url(#${uid}-grain)`}
              opacity={finish}
            />
            {i !== 2 && (
              <g opacity={accessories}>
                {[0, 1, 2, 3].map((j) => (
                  <rect
                    key={j}
                    x={x + 18 + j * 13}
                    y={y + 25 + (j % 2) * 8}
                    width="10"
                    height={42 - (j % 2) * 8}
                    fill={["#b26c50", "#e4d8b8", "#777c67", "#c7ac78"][j]}
                  />
                ))}
                <rect
                  x={x + 23}
                  y={y + 88}
                  width="67"
                  height="26"
                  rx="2"
                  fill="#bd986d"
                />
                <path
                  d={`M${x + 23} ${y + 97}h67m-67 9h67`}
                  stroke="#8a6d4e"
                  strokeWidth="1"
                />
              </g>
            )}
            <g opacity={build}>
              <path
                d={`M${x + 8} ${y + 133}v21m105-21v21`}
                stroke="#655440"
                strokeWidth="7"
              />
            </g>
          </g>
        );
      })}
      <g opacity={accessories} transform={`translate(${-regroup * 12},0)`}>
        <path d="M156 267l-6-35h34l-6 35Z" fill="#b87353" />
        <path
          d="M167 233v-50m0 31q-40-35-35-46 36 0 35 46m0-17q33-38 37-25-4 27-37 25"
          fill="#647761"
          stroke="#647761"
          strokeWidth="2"
        />
        <ellipse cx="167" cy="233" rx="17" ry="4" fill="#97573f" />
      </g>
      <path
        d="M90 481h475m-475-5v10m475-10v10"
        stroke="#8c836c"
        strokeWidth=".7"
      />
      <text
        x="327"
        y="507"
        textAnchor="middle"
        fill="#6e6857"
        fontSize="9"
        letterSpacing="3"
      >
        {hero
          ? "ROOM FOR WHAT COMES NEXT"
          : "SAME ELEMENTS · NEW POSSIBILITIES"}
      </text>
    </svg>
  );
}

const furnitureSteps = [
  [
    "A simple beginning.",
    "Start with a frame. A quiet outline, ready to take on a purpose.",
  ],
  [
    "Give the idea structure.",
    "Depth, surfaces and connections turn a drawing into something you can imagine living with.",
  ],
  [
    "Make room for your routine.",
    "Shelves and storage bring function to the frame. Materials bring warmth to the room.",
  ],
  [
    "Let the arrangement change.",
    "Explore the idea of keeping the core elements while changing the arrangement. Final combinations depend on the product system.",
  ],
];

export function FurnitureStory() {
  const story = useStory(4);
  return (
    <section className={s.chapter} id="modules" aria-labelledby="modules-title">
      <div className={s.chapterHeading}>
        <p className={s.eyebrow}>01 / THE MAKING OF A PIECE</p>
        <h2 id="modules-title">
          A little structure.
          <br />
          <em>So much possibility.</em>
        </h2>
        <p>
          Scroll to build, then rearrange.
          <br />
          从一件家具，到更多可能。
        </p>
      </div>
      <div
        ref={story.ref}
        className={s.story}
        data-story="furniture"
        data-reduced-motion={story.reduced}
      >
        <div className={s.stickyVisual}>
          <FurnitureIllustration
            progress={story.reduced ? 1 : story.progress}
          />
          <div className={s.visualFooter}>
            <span>MODULAR DESIGN STUDY</span>
            <span>0{story.active + 1} / 04</span>
          </div>
          <p className={s.caption}>
            Concept illustration · not a purchasable configuration.
          </p>
          <div className={s.stepControls} aria-label="Furniture story chapters">
            {furnitureSteps.map(([title], i) => (
              <button
                key={title}
                aria-label={`Furniture chapter ${i + 1}: ${title}`}
                aria-current={story.active === i ? "step" : undefined}
                onClick={() => story.select(i)}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
        <div>
          {furnitureSteps.map(([title, text], i) => (
            <article
              key={title}
              className={s.storyStep}
              data-story-step=""
              data-active={story.active === i}
            >
              <span className={s.eyebrow}>
                0{i + 1} / {i === 3 ? "RECONFIGURE" : "COMPOSE"}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              {i === 3 && (
                <a className={s.textLink} href="/contact">
                  Discuss a modular brief ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const caseSteps = [
  [
    "Begin with the people.",
    "Two parents. Three daughters. Before collecting the keys, the family wanted to bring storage, individual preferences and budget into one furniture plan.",
  ],
  [
    "Give the brief a place.",
    "The source floor plan provides a shared starting point for discussing room arrangements and where furniture needs to work.",
  ],
  [
    "Bring the choices together.",
    "Storage beds, individual study furniture and dining pieces form the sourcing shortlist. A generated spatial reference supports the layout discussion.",
  ],
  [
    "A clearer next step.",
    "The furniture shortlist and planning proposal have been delivered. Furniture delivery and installation are not complete.",
  ],
];

export function CaseJourney() {
  const story = useStory(4);
  const reveal = story.reduced ? 1 : clamp((story.progress - 0.34) * 2.8);
  return (
    <section
      className={`${s.chapter} ${s.caseChapter}`}
      id="real-case"
      aria-labelledby="case-journey-title"
    >
      <div className={s.chapterHeading}>
        <p className={s.eyebrow}>03 / A REAL FAMILY, A SHARED PROCESS</p>
        <h2 id="case-journey-title">
          Before the keys.
          <br />
          <em>Already a home in mind.</em>
        </h2>
        <p>
          Singapore BTO · A family of five
          <br />
          一个真实的家，一起推敲的方案。
        </p>
      </div>
      <div
        ref={story.ref}
        className={s.story}
        data-story="case"
        data-reduced-motion={story.reduced}
      >
        <div className={s.stickyVisual}>
          <div className={s.caseCanvas}>
            <img
              src="/cases/bto-family/floor-plan.png"
              alt="Source floor plan used for the family planning discussion"
              loading="lazy"
              width="1200"
              height="850"
            />
            <div
              className={s.caseReveal}
              style={{ clipPath: `inset(0 ${100 - reveal * 100}% 0 0)` }}
            >
              <img
                src="/cases/bto-family/space-reference.png"
                alt="Generated spatial planning reference, not a completed interior or exact furniture model"
                loading="lazy"
                width="1672"
                height="941"
              />
            </div>
            <span className={s.imageBadge}>
              {reveal > 0.5
                ? "GENERATED PLANNING REFERENCE"
                : "SOURCE FLOOR PLAN"}
            </span>
          </div>
          <div className={s.caseFacts}>
            <span>5 people</span>
            <span>One shared brief</span>
            <span>Before key collection</span>
          </div>
          <p className={s.caption}>
            Source plan → generated reference. Illustrative layouts; not a
            measured transformation or completed interior.
          </p>
          <div className={s.stepControls} aria-label="Family case chapters">
            {caseSteps.map(([title], i) => (
              <button
                key={title}
                aria-label={`Case chapter ${i + 1}: ${title}`}
                aria-current={story.active === i ? "step" : undefined}
                onClick={() => story.select(i)}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
        <div>
          {caseSteps.map(([title, text], i) => (
            <article
              key={title}
              className={s.storyStep}
              data-story-step=""
              data-active={story.active === i}
            >
              <span className={s.eyebrow}>0{i + 1} / PROJECT NOTES</span>
              <h3>{title}</h3>
              <p>{text}</p>
              {i === 2 && (
                <div className={s.miniProducts}>
                  {[
                    "product-0-0.png",
                    "product-1-0.png",
                    "product-0-1.png",
                  ].map((image, i) => (
                    <img
                      key={image}
                      src={`/cases/bto-family/${image}`}
                      alt={
                        [
                          "Storage bed shortlist reference",
                          "Study desk shortlist reference",
                          "Dining furniture shortlist reference",
                        ][i]
                      }
                      loading="lazy"
                      width="160"
                      height="120"
                    />
                  ))}
                </div>
              )}
              {i === 3 && (
                <a className={s.textLink} href="/projects/bto-family">
                  View the case study ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
