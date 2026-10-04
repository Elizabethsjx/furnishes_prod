"use client";

import { useLayoutEffect } from "react";
import { SelectionStudio } from "./SelectionStudio";
import { CozyRoom } from "./CozyRoom";
import { WorkflowExplainer } from "./WorkflowExplainer";
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
          <a href="/#selection">Furniture selection</a>
          <a href="/#spaces">For professionals</a>
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
                  <span className={s.dot} /> FURNITURE SOURCING · SPATIAL
                  PLANNING
                </p>
                <h1>
                  Furniture, considered.
                  <br />
                  Your space,
                  <br />
                  <em>resolved.</em>
                </h1>
                <p className={s.lead}>
                  From the first brief to a priced shortlist and spatial
                  proposal. Make furniture decisions with the details, options
                  and context in one place.
                </p>
                <div className={s.actions}>
                  <a className={s.button} href="/contact">
                    Discuss your project <span aria-hidden="true">↗</span>
                  </a>
                  <a className={s.textLink} href={caseUrl}>
                    Explore a real project <span aria-hidden="true">→</span>
                  </a>
                </div>
                <p className={s.heroFoot}>
                  RESIDENTIAL · WORKPLACES · DESIGN & SUPPLY PARTNERS
                </p>
              </div>
              <CozyRoom />
            </section>
            <div className={s.serviceStrip}>
              <span>[ FOUR CONCRETE STEPS ]</span>
              <p>Share your requirements</p>
              <i aria-hidden="true">→</i>
              <p>Get a priced furniture list</p>
              <i aria-hidden="true">→</i>
              <p>Turn the plan into 3D</p>
              <i aria-hidden="true">→</i>
              <p>Place furniture &amp; review prices</p>
            </div>
            <section
              className={`${s.section} ${s.workflowSection}`}
              id="walkthrough"
            >
              <div>
                <p className={s.eyebrow}>THE PROJECT WORKFLOW</p>
                <h2>
                  Define the brief.
                  <br />
                  Review the selection.
                  <br />
                  <em>Plan the space.</em>
                </h2>
                <p className={s.lead}>
                  Send us the things you love and the space you have. We bring
                  the options, the prices and the layout together — so you can
                  decide with a little more confidence.
                </p>
                <a className={s.textLink} href={caseUrl}>
                  View the planning case <span aria-hidden="true">↗</span>
                </a>
              </div>
              <WorkflowExplainer />
            </section>
            <section className={`${s.section} ${s.approach}`} id="approach">
              <div className={s.sectionHeading}>
                <div>
                  <p className={s.eyebrow}>[ WHAT WE DO / WHAT YOU RECEIVE ]</p>
                  <h2>
                    From your wish list
                    <br />
                    to your furniture plan.
                  </h2>
                </div>
                <p>
                  Four steps from your requirements to a furniture selection you
                  can review in context.
                </p>
              </div>
              <div className={`${s.steps} ${s.serviceSteps}`}>
                <article>
                  <span>01 / REQUIREMENTS</span>
                  <h3>Collect your furniture requirements</h3>
                  <p>
                    Tell us who uses the space, your budget, preferred styles
                    and storage needs. Share reference images and a floor plan.
                  </p>
                  <strong className={s.deliverable}>
                    You receive: a structured furniture brief.
                  </strong>
                </article>
                <article>
                  <span>02 / SOURCING & PRICES</span>
                  <h3>Build a priced furniture list</h3>
                  <p>
                    We source supplier options and organise product images,
                    dimensions, finishes and quoted prices so you can compare
                    your choices.
                  </p>
                  <strong className={s.deliverable}>
                    You receive: a shortlist with specifications and reference
                    quotes.
                  </strong>
                </article>
                <article>
                  <span>03 / FLOOR PLAN TO SPACE</span>
                  <h3>Prepare a 3D spatial proposal</h3>
                  <p>
                    We use your 2D floor plan as a reference for a 3D planning
                    proposal, helping you discuss room proportions and layout
                    before committing.
                  </p>
                  <strong className={s.deliverable}>
                    You receive: a visual layout for review.
                  </strong>
                </article>
                <article>
                  <span>04 / FURNITURE & LAYOUT</span>
                  <h3>Review furniture in the space</h3>
                  <p>
                    Discuss placement and alternative arrangements alongside
                    your furniture list and prices. Available models may
                    represent, rather than exactly match, selected products.
                  </p>
                  <strong className={s.deliverable}>
                    You receive: a layout reference and a shortlist to refine
                    before purchasing.
                  </strong>
                </article>
              </div>
            </section>
            <SelectionStudio />
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
                  <p className={s.eyebrow}>[ WHO WE WORK WITH ]</p>
                  <h2>Homes, offices & sourcing partners.</h2>
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
        {!caseStudy && (
          <section className={`${s.section} ${s.faq}`}>
            <div>
              <p className={s.eyebrow}>BEFORE YOU START</p>
              <h2>Project essentials.</h2>
              <p>
                Understand the scope, the information we need and what the
                planning references represent.
              </p>
            </div>
            <div>
              <details>
                <summary>What should I prepare for a project?</summary>
                <p>
                  Bring a floor plan if available, reference images, the
                  furniture you need, your budget and target timing. We can
                  discuss the brief before you have all of these ready.
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
                <summary>Do the 3D models show the exact products?</summary>
                <p>
                  The public examples are illustrative planning models.
                  Available geometry may represent the selected furniture rather
                  than reproduce an exact supplier model. Confirm dimensions and
                  model availability during the project.
                </p>
              </details>
              <details>
                <summary>
                  Can I discuss an office or supplier collaboration?
                </summary>
                <p>
                  Yes. Use the project contact page to share workplace
                  requirements or your product range. We can then discuss an
                  appropriate sourcing and planning scope.
                </p>
              </details>
            </div>
          </section>
        )}
        <section className={s.cta}>
          <div className={s.section}>
            <p className={s.eyebrow}>LET'S START WITH YOUR SPACE</p>
            <h2>
              A better-informed brief.
              <br />
              <em>A considered result.</em>
            </h2>
            <a className={s.lightButton} href="/contact">
              Discuss a project <span aria-hidden="true">↗</span>
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
