"use client";

import { useLayoutEffect } from "react";
import { clearLandingFreezePaint } from "./landing-freeze";
import s from "./commercial.module.css";

const caseUrl = "/projects/bto-family";
const plannerUrl = "/examples/family-apartment.html";
const products = [
  {
    image: "product-0-0.png",
    title: "Storage that works harder",
    category: "BEDROOM",
    text: "Gas-lift bed frames shortlisted around the family's storage needs.",
    className: s.bed,
  },
  {
    image: "product-1-0.png",
    title: "A place to make it their own",
    category: "STUDY",
    text: "Individual study furniture, with colour choices for three daughters.",
    className: s.desk,
  },
  {
    image: "product-0-1.png",
    title: "Room to come together",
    category: "LIVING & DINING",
    text: "A dining table and seating selected around the family's preferred style.",
    className: s.dining,
  },
];

export function CommercialLanding({
  userLabel = null,
  caseStudy = false,
}: {
  userLabel?: string | null;
  caseStudy?: boolean;
}) {
  useLayoutEffect(() => {
    clearLandingFreezePaint();
  }, []);
  return (
    <div
      className={s.root}
      data-landing-root=""
      data-route-path={caseStudy ? caseUrl : "/"}
    >
      <a className={s.skip} href="#main-content">
        Skip to content
      </a>
      <header className={s.header}>
        <a className={s.brand} href="/" aria-label="Furnishes home">
          furnishes
        </a>
        <nav aria-label="Main navigation">
          <a href="/#approach">How it works</a>
          <a href="/#spaces">Who we help</a>
          <a href={caseUrl}>Our work</a>
        </nav>
        <div className={s.headerActions}>
          <a className={s.login} href={userLabel ? "/account" : "/login"}>
            {userLabel ? "Workspace" : "Log in"}
          </a>
          <a className={s.smallButton} href="/contact">
            Start a project <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <main id="main-content">
        {caseStudy ? (
          <>
            <section className={`${s.section} ${s.caseHeading}`}>
              <a className={s.back} href="/">
                ← Back to Furnishes
              </a>
              <p className={s.eyebrow}>PROJECT NOTES / SINGAPORE BTO</p>
              <h1>
                A family home,
                <br />
                <em>planned before the keys.</em>
              </h1>
              <p className={s.lead}>
                Furniture sourcing and spatial planning for a family preparing
                for their new home, with three daughters and a clear wish list.
              </p>
              <div className={s.tags}>
                <span>Residential</span>
                <span>Furniture sourcing</span>
                <span>Spatial planning</span>
              </div>
              <div className={s.status}>
                <span aria-hidden="true">●</span> Shortlist & planning proposal
                delivered. Furniture has not yet arrived.
              </div>
            </section>
            <figure className={`${s.section} ${s.caseImage}`}>
              <img
                src="/cases/bto-family/space-reference.png"
                alt="Generated planning reference showing the family apartment layout"
              />
              <figcaption>
                Generated planning reference — not a completed interior or an
                exact product visualisation.
              </figcaption>
            </figure>
            <section className={`${s.section} ${s.storyGrid}`}>
              <div>
                <p className={s.eyebrow}>01 / THE BRIEF</p>
                <h2>
                  Ahead of the move.
                  <br />
                  Closer to a decision.
                </h2>
              </div>
              <div>
                <p>
                  Before collecting the keys to their BTO home, the family
                  wanted help finding furniture that reflected their reference
                  styles, storage needs and budget.
                </p>
                <p>
                  The brief included gas-lift storage beds, individual study
                  furniture for the three daughters, dining furniture and
                  practical storage. Product quality was an important
                  requirement in the search.
                </p>
              </div>
            </section>
            <section className={`${s.section} ${s.products}`}>
              <p className={s.eyebrow}>02 / THE FURNITURE SHORTLIST</p>
              <h2>From a wish list to considered choices.</h2>
              <div className={s.productGrid}>
                {products.map((p) => (
                  <article key={p.title}>
                    <div className={`${s.productImage} ${p.className}`}>
                      <img
                        src={`/cases/bto-family/${p.image}`}
                        alt={p.title}
                        loading="lazy"
                      />
                    </div>
                    <p className={s.eyebrow}>{p.category}</p>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </article>
                ))}
              </div>
              <p className={s.note}>
                Product reference images from the sourcing shortlist. Final
                specifications, availability, quality checks and landed costs
                require confirmation.
              </p>
            </section>
            <section className={`${s.section} ${s.planGrid}`}>
              <div>
                <p className={s.eyebrow}>03 / THE SPACE</p>
                <h2>
                  See the possibilities.
                  <br />
                  Discuss the details.
                </h2>
                <p>
                  The floor plan and interactive model give the family a shared
                  reference for discussing room arrangements, materials and
                  furniture placement.
                </p>
                <p className={s.note}>
                  This is a prepared model of one apartment. The layouts and
                  furniture are illustrative, including alternative children's
                  room arrangements; they do not exactly reproduce the
                  procurement shortlist.
                </p>
                <a
                  className={s.button}
                  href={plannerUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the 3D example <span aria-hidden="true">↗</span>
                </a>
              </div>
              <figure>
                <img
                  src="/cases/bto-family/floor-plan.png"
                  alt="Source two-dimensional floor plan of the apartment"
                  loading="lazy"
                />
                <figcaption>
                  Source floor plan used for the planning reference.
                </figcaption>
              </figure>
            </section>
            <section className={`${s.section} ${s.deliverables}`}>
              <p className={s.eyebrow}>04 / DELIVERED SO FAR</p>
              <h2>A clearer plan for the next step.</h2>
              <div className={s.steps}>
                <article>
                  <span>01</span>
                  <h3>Furniture shortlist</h3>
                  <p>
                    Product references, options and specifications organised
                    around the family's brief.
                  </p>
                </article>
                <article>
                  <span>02</span>
                  <h3>Pricing information</h3>
                  <p>
                    A sourcing document to support discussion and comparison
                    before purchasing.
                  </p>
                </article>
                <article>
                  <span>03</span>
                  <h3>Spatial planning proposal</h3>
                  <p>
                    A visual reference to explore the home ahead of key
                    collection.
                  </p>
                </article>
              </div>
              <p className={s.note}>
                This case documents planning and sourcing services. Furniture
                delivery and installation are not complete.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className={`${s.section} ${s.hero}`}>
              <div className={s.heroCopy}>
                <p className={s.eyebrow}>
                  <span className={s.dot} /> FURNITURE SOURCING & SPATIAL
                  PLANNING
                </p>
                <h1>
                  Your space.
                  <br />
                  Your needs.
                  <br />
                  <em>Better considered.</em>
                </h1>
                <p className={s.lead}>
                  Find furniture that fits your brief. Explore supplier options,
                  build a considered shortlist, and see the possibilities in
                  your space.
                </p>
                <div className={s.actions}>
                  <a className={s.button} href="/contact">
                    Tell us about your project <span aria-hidden="true">↗</span>
                  </a>
                  <a className={s.textLink} href={caseUrl}>
                    Explore a real project <span aria-hidden="true">→</span>
                  </a>
                </div>
                <p className={s.heroFoot}>
                  For homes, workplaces and the people furnishing them.
                </p>
              </div>
              <div className={s.heroVisual}>
                <div className={s.visualTop}>
                  <span>FROM BRIEF TO SPACE</span>
                  <span>01 / RESIDENTIAL</span>
                </div>
                <img
                  src="/cases/bto-family/space-reference.png"
                  alt="Planning visualisation of a Singapore family apartment"
                  fetchPriority="high"
                />
                <div className={s.visualBottom}>
                  <div>
                    <span className={s.eyebrow}>A PROJECT IN FOCUS</span>
                    <strong>A home, before the keys.</strong>
                    <small>Singapore BTO · Planning reference</small>
                  </div>
                  <a href={caseUrl} aria-label="View the BTO family case study">
                    ↗
                  </a>
                </div>
              </div>
            </section>
            <div className={s.serviceStrip}>
              <span>ONE CONNECTED PROCESS</span>
              <p>Understand your brief</p>
              <i aria-hidden="true">→</i>
              <p>Source & shortlist</p>
              <i aria-hidden="true">→</i>
              <p>Visualise & refine</p>
            </div>
            <section className={`${s.section} ${s.approach}`} id="approach">
              <div className={s.sectionHeading}>
                <div>
                  <p className={s.eyebrow}>LESS SEARCHING. MORE CLARITY.</p>
                  <h2>
                    From an idea
                    <br />
                    to a considered plan.
                  </h2>
                </div>
                <p>
                  A practical way to connect what you need, what suppliers
                  offer, and how it could work in your space.
                </p>
              </div>
              <div className={s.steps}>
                <article>
                  <span>01 / UNDERSTAND</span>
                  <h3>Start with your space.</h3>
                  <p>
                    Share your needs, budget, inspiration and floor plan. We
                    help turn them into a clear furniture brief.
                  </p>
                </article>
                <article>
                  <span>02 / SOURCE</span>
                  <h3>Find the right options.</h3>
                  <p>
                    Explore supplier options and compare styles, dimensions and
                    quoted costs in an organised shortlist.
                  </p>
                </article>
                <article>
                  <span>03 / VISUALISE</span>
                  <h3>Bring the plan into view.</h3>
                  <p>
                    Use spatial planning references to discuss layouts and
                    refine choices before moving forward.
                  </p>
                </article>
              </div>
            </section>
            <section className={s.caseBand}>
              <div className={`${s.section} ${s.featured}`}>
                <div className={s.featuredImage}>
                  <img
                    src="/cases/bto-family/space-reference.png"
                    alt="BTO family apartment planning reference"
                    loading="lazy"
                  />
                  <span>PLANNING VISUALISATION · NOT A COMPLETED INTERIOR</span>
                </div>
                <div>
                  <p className={s.eyebrow}>SELECTED WORK / SINGAPORE</p>
                  <h2>
                    A family home,
                    <br />
                    <em>planned before the keys.</em>
                  </h2>
                  <p>
                    Three daughters. A new BTO home. A brief shaped by storage,
                    personal style and budget. See how we brought the furniture
                    options and spatial planning together.
                  </p>
                  <div className={s.tags}>
                    <span>Furniture shortlist</span>
                    <span>Space planning</span>
                  </div>
                  <p className={s.note}>
                    Proposal delivered · Furniture not yet received
                  </p>
                  <a className={s.textLink} href={caseUrl}>
                    View the case study <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </section>
            <section className={`${s.section} ${s.spaces}`} id="spaces">
              <div className={s.sectionHeading}>
                <div>
                  <p className={s.eyebrow}>
                    DIFFERENT SPACES. A SHARED APPROACH.
                  </p>
                  <h2>Built around your brief.</h2>
                </div>
                <p>
                  From a family's first home to a team’s next workspace, the
                  starting point is always how a space needs to work.
                </p>
              </div>
              <div className={s.audiences}>
                <article>
                  <span className={s.audienceIcon} aria-hidden="true">
                    ⌂
                  </span>
                  <h3>For your home</h3>
                  <p>
                    Furniture choices shaped by everyday routines, personal
                    preferences and the space you have.
                  </p>
                  <a href={caseUrl}>See a residential project →</a>
                </article>
                <article>
                  <span className={s.audienceIcon} aria-hidden="true">
                    ▤
                  </span>
                  <h3>For your workplace</h3>
                  <p>
                    Bring your office furniture brief, team requirements and
                    floor plan to a project discussion.
                  </p>
                  <a href="/contact">Discuss a commercial brief →</a>
                </article>
                <article>
                  <span className={s.audienceIcon} aria-hidden="true">
                    ↗
                  </span>
                  <h3>For suppliers & designers</h3>
                  <p>
                    Connect product knowledge and project needs. Talk to us
                    about sourcing and collaboration.
                  </p>
                  <a href="/contact">Explore working together →</a>
                </article>
              </div>
            </section>
          </>
        )}
        <section className={s.cta}>
          <div className={s.section}>
            <p className={s.eyebrow}>LET'S START WITH YOUR SPACE</p>
            <h2>
              A clearer path to
              <br />
              <em>furnishing it well.</em>
            </h2>
            <a className={s.lightButton} href="/contact">
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
            <p>Bring a floor plan, a wish list, or simply an idea.</p>
          </div>
        </section>
      </main>
      <footer className={`${s.section} ${s.footer}`}>
        <div>
          <a className={s.brand} href="/">
            furnishes
          </a>
          <p>
            Furniture sourcing. Spatial planning.
            <br />
            Considered together.
          </p>
        </div>
        <div>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms">Terms</a>
          <small>© {new Date().getFullYear()} Furnishes</small>
        </div>
      </footer>
    </div>
  );
}
