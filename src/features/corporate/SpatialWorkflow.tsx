"use client";
import { useEffect, useRef, useState } from "react";
import { workflow } from "./content";
import { SpaceScene } from "./SpaceScene";
import s from "./spatial.module.css";
export function SpatialWorkflow() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible)
          setActive(Number((visible.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-20% 0px -25% 0px", threshold: [0, 0.4, 0.7] },
    );
    rows.current.forEach((row) => {
      if (row) observer.observe(row);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className={s.workflow}>
      <div className={s.workflowVisual} aria-hidden="true">
        <span>YOUR SPACE, TAKING SHAPE / 0{active + 1}</span>
        {active === 0 ? (
          <div className={s.brief}>
            <p>THE PROJECT BRIEF</p>
            <strong>
              Your people.
              <br />
              Your budget.
              <br />
              Your floor plan.
            </strong>
            <hr />
            <p>Workplace / Shared space / Home</p>
          </div>
        ) : active === 1 ? (
          <img src="/suppliers/huagui/1266-sofa.jpg" alt="" />
        ) : (
          <SpaceScene kind={active === 2 ? "plan" : "home"} />
        )}
        <p>{workflow[active]!.output}</p>
      </div>
      <ol className={s.workflowSteps}>
        {workflow.map((step, i) => (
          <li
            key={step.title}
            ref={(el) => {
              rows.current[i] = el;
            }}
            data-step={i}
            data-active={active === i}
          >
            <span>
              0{i + 1} /{" "}
              {i === 0
                ? "UNDERSTAND"
                : i === 1
                  ? "SELECT"
                  : i === 2
                    ? "BUILD"
                    : "VISUALISE"}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <small>{step.output}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
