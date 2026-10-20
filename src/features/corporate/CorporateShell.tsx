import type { ReactNode } from "react";
import { ResetLanding } from "./ResetLanding";
import s from "./corporate.module.css";

const navigation = [
  ["/commercial", "Business"],
  ["/residential", "Homes"],
  ["/space-planning", "Space planning"],
  ["/collections", "Collections"],
  ["/projects", "Our work"],
];
export function CorporateShell({
  children,
  path = "/",
  userLabel,
}: {
  children: ReactNode;
  path?: string;
  userLabel?: string | null;
}) {
  return (
    <div
      className={s.root}
      data-route-paint="public"
      data-route-path={path}
      data-corporate-root=""
      data-landing-root={path === "/" ? "" : undefined}
    >
      <ResetLanding />
      <a className={s.skip} href="#main-content">
        Skip to content
      </a>
      <header className={s.header}>
        <a className={s.brand} href="/" aria-label="Furnishes home">
          furnishes<span lang="zh">空间 · 生活</span>
        </a>
        <nav className={s.desktopNav} aria-label="Main navigation">
          {navigation.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className={s.headerActions}>
          <a className={s.accountLink} href={userLabel ? "/account" : "/login"}>
            {userLabel ? "Workspace" : "Log in"}
          </a>
          <a className={s.smallButton} href="/contact">
            Get a project quote ↗
          </a>
        </div>
        <details className={s.mobileNav}>
          <summary>
            Explore Furnishes <span aria-hidden="true">＋</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map(([href, label]) => (
              <a
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
              >
                {label} ↗
              </a>
            ))}
            <a href="/how-it-works">How it works ↗</a>
            <a href="/partners/huagui">Our supply partner ↗</a>
            <a href={userLabel ? "/account" : "/login"}>
              {userLabel ? "Workspace" : "Log in"} ↗
            </a>
          </nav>
        </details>
      </header>
      <main id="main-content">{children}</main>
      <footer className={s.footer}>
        <div>
          <a className={s.brand} href="/">
            furnishes<span>FURNITURE · SPACE · PEOPLE</span>
          </a>
          <p>
            Furniture sourcing and spatial planning.
            <br />
            Considered together.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/how-it-works">How it works</a>
          <a href="/partners/huagui">Our supply partner</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
        <small>© {new Date().getFullYear()} Furnishes · Singapore / Asia</small>
      </footer>
    </div>
  );
}
export function ProjectCTA() {
  return (
    <section className={s.cta}>
      <p className={s.eyebrow}>YOUR NEXT PROJECT STARTS HERE</p>
      <h2>
        Your brief. Our next step.
        <br />
        <em>Let’s build your furniture plan.</em>
      </h2>
      <p>
        Share your requirements, budget and floor plan. Start with a furniture
        shortlist and a clear project scope.
      </p>
      <a className={s.button} href="/contact">
        Request a project consultation ↗
      </a>
    </section>
  );
}
