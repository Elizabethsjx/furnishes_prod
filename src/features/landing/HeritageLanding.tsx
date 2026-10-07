"use client";

import { useLayoutEffect } from "react";
import { clearLandingFreezePaint } from "./landing-freeze";
import {
  FurnitureIllustration,
  FurnitureStory,
  CaseJourney,
} from "./ScrollStories";
import { SelectionStudio } from "./SelectionStudio";
import s from "./heritage.module.css";

export function HeritageLanding({
  userLabel = null,
}: {
  userLabel?: string | null;
}) {
  useLayoutEffect(() => {
    clearLandingFreezePaint();
  }, []);
  return (
    <div className={s.root} data-landing-root="" data-route-path="/">
      <a href="#main-content" className={s.skip}>
        Skip to content
      </a>
      <header className={s.header}>
        <a className={s.brand} href="/" aria-label="Furnishes home">
          furnishes<span>空间 · 生活</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#modules">Furniture & modules</a>
          <a href="#approach">Space planning</a>
          <a href="#real-case">Our work</a>
          <a href="#our-story">Our story</a>
        </nav>
        <div className={s.headerActions}>
          <a href={userLabel ? "/account" : "/login"}>
            {userLabel ? "Workspace" : "Log in"}
          </a>
          <a href="/contact" className={s.smallButton}>
            Start a project ↗
          </a>
        </div>
      </header>
      <main id="main-content">
        <section className={s.hero}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>FURNITURE, SPACE & THE LIVES BETWEEN</p>
            <h1>
              A home that
              <br />
              grows <em>with you.</em>
            </h1>
            <p className={s.chinese} lang="zh">
              让空间随生活一起变化。
            </p>
            <p className={s.lead}>
              Thoughtful furniture. Adaptable spaces. From a single corner to a
              family home, make room for the way you live.
            </p>
            <div className={s.actions}>
              <a className={s.button} href="#modules">
                Explore the possibilities ↓
              </a>
              <a className={s.textLink} href="/contact">
                Discuss your project ↗
              </a>
            </div>
            <div className={s.heroNote}>
              <span>ROOTED IN DESIGN</span>
              <span>MADE FOR EVERYDAY LIFE</span>
            </div>
          </div>
          <figure className={s.heroArt}>
            <FurnitureIllustration hero />
            <figcaption>
              <span>STUDY NO. 01 / ROOM TO EVOLVE</span>
              <span>Concept illustration</span>
            </figcaption>
            <span className={s.verticalNote} lang="zh">
              一件家具 · 多种生活
            </span>
          </figure>
        </section>
        <div className={s.introLine}>
          <span>SINGAPORE / ASIA</span>
          <p>A considered beginning. An open-ended future.</p>
          <a href="#modules" aria-label="Scroll to the furniture story">
            SCROLL TO DISCOVER ↓
          </a>
        </div>
        <FurnitureStory />
        <section
          id="our-story"
          className={s.culture}
          aria-labelledby="culture-title"
        >
          <div className={s.culturePattern} aria-hidden="true">
            <div className={s.lattice}>
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <span lang="zh">之间</span>
            <p>BETWEEN STRUCTURE & EVERYDAY LIFE</p>
          </div>
          <div>
            <p className={s.eyebrow}>02 / A DESIGN DIALOGUE</p>
            <h2 id="culture-title">
              Rooted in structure.
              <br />
              <em>Open to life.</em>
            </h2>
            <p className={s.chinese} lang="zh">
              从中国的设计线索，到新加坡的日常。
            </p>
            <p>
              We look to the rhythm of Chinese screens and framed spaces: what
              is held, what is open, and how parts come together.
            </p>
            <p>
              In Singapore, that thinking meets the everyday needs of apartment
              living — room to work, gather, store and make a little space your
              own.
            </p>
            <a className={s.textLink} href="#real-case">
              See how a real brief takes shape ↓
            </a>
          </div>
        </section>
        <CaseJourney />
        <section
          className={s.scenarios}
          id="spaces"
          aria-labelledby="spaces-title"
        >
          <div className={s.sectionTop}>
            <div>
              <p className={s.eyebrow}>04 / WHERE LIFE HAPPENS</p>
              <h2 id="spaces-title">
                Start with <em>your corner.</em>
              </h2>
            </div>
            <p>
              Small routines give a space its purpose.
              <br />
              Tell us what yours needs to do.
            </p>
          </div>
          <div className={s.scenarioGrid}>
            {[
              [
                "01",
                "The arrival",
                "A place for the things you bring home.",
                "玄关",
                "entry",
              ],
              [
                "02",
                "The working corner",
                "Space to focus, with everything in reach.",
                "工作角",
                "work",
              ],
              [
                "03",
                "The quiet retreat",
                "Thoughtful storage around your daily rest.",
                "床边",
                "rest",
              ],
              [
                "04",
                "The shared space",
                "Room to gather. Flexibility to make it yours.",
                "共享空间",
                "shared",
              ],
            ].map(([n, title, copy, cn, kind]) => (
              <a key={n} className={s.scenario} href="/contact">
                <div
                  className={`${s.scenarioDrawing} ${s[kind ?? "entry"]}`}
                  aria-hidden="true"
                >
                  <i />
                  <b />
                  <span />
                </div>
                <div className={s.scenarioMeta}>
                  <span>
                    {n} / {cn}
                  </span>
                  <span>↗</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </a>
            ))}
          </div>
        </section>
        <div className={s.selectionWrap}>
          <SelectionStudio />
        </div>
        <section
          id="approach"
          className={s.approach}
          aria-labelledby="approach-title"
        >
          <div className={s.sectionTop}>
            <div>
              <p className={s.eyebrow}>05 / LET’S MAKE A START</p>
              <h2 id="approach-title">
                Your space.
                <br />
                <em>Your starting point.</em>
              </h2>
            </div>
            <p>
              Come with a whole floor plan or one small question.
              <br />
              We’ll work through the next step together.
            </p>
          </div>
          <div className={s.paths}>
            {[
              [
                "01",
                "Find a starting combination",
                "Explore furniture references and discuss a combination for your routine.",
                "Explore the selection",
                "#selection",
              ],
              [
                "02",
                "Refine the details",
                "Talk through dimensions, finishes and functional needs before making your choices.",
                "Discuss your requirements",
                "/contact",
              ],
              [
                "03",
                "Plan the whole space",
                "Bring your floor plan, wish list and budget. Connect furniture decisions with the way you live.",
                "Start a space plan",
                "/contact",
              ],
            ].map(([n, title, text, label, url]) => (
              <article key={n}>
                <span className={s.eyebrow}>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href={url} className={s.textLink}>
                  {label} ↗
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className={s.faq}>
          <p className={s.eyebrow}>A FEW PRACTICAL DETAILS</p>
          <details>
            <summary>What should I bring to a first conversation?</summary>
            <p>
              A floor plan, furniture references, your budget and timing are
              useful. You can also begin with one room and a few questions.
            </p>
          </details>
          <details>
            <summary>Are the displayed furniture prices final?</summary>
            <p>
              No. The sample selections show prices recorded in a client
              shortlist. Current availability, quantities, shipping, tax,
              installation and final specifications require confirmation.
            </p>
          </details>
          <details>
            <summary>Can I order the animated modular design?</summary>
            <p>
              The animation is a design study showing the modular concept.
              Contact us to discuss available products and confirm compatible
              combinations.
            </p>
          </details>
        </section>
        <section className={s.cta}>
          <p className={s.eyebrow}>A LITTLE SPACE. A NEW POSSIBILITY.</p>
          <h2>
            What would you like
            <br />
            to make <em>room for?</em>
          </h2>
          <p lang="zh">从你生活里的一个角落开始。</p>
          <a className={s.button} href="/contact">
            Let’s plan your space ↗
          </a>
        </section>
      </main>
      <footer className={s.footer}>
        <div>
          <a className={s.brand} href="/">
            furnishes
          </a>
          <p>
            Furniture & spatial planning.
            <br />
            Singapore / Asia
          </p>
        </div>
        <div>
          <a href="/projects/bto-family">Our work</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
        <span>LET’S BUILD WHAT EVOLVES.</span>
      </footer>
    </div>
  );
}
