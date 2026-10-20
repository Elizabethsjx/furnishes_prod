import { CorporateShell, ProjectCTA } from "./CorporateShell";
import s from "./corporate.module.css";
export function FamilyCase() {
  return (
    <CorporateShell path="/projects/bto-family">
      <section className={s.pageIntro}>
        <a className={s.breadcrumb} href="/projects">
          Furnishes / Our work
        </a>
        <p className={s.eyebrow}>PROJECT NOTES / SINGAPORE BTO</p>
        <h1>
          A family home,
          <br />
          <em>planned before the keys.</em>
        </h1>
        <p className={s.lead}>
          Furniture sourcing and spatial planning for a family with three
          daughters, a new home and a clear wish list.
        </p>
        <p className={s.status}>
          Shortlist & planning proposal delivered. Furniture has not yet
          arrived.
        </p>
      </section>
      <section className={s.softBand}>
        <div className={s.split}>
          <div>
            <p className={s.eyebrow}>01 / THE BRIEF</p>
            <h2>
              Daily routines.
              <br />
              <em>Personal choices.</em>
            </h2>
          </div>
          <div>
            <p>
              The family wanted help finding furniture that reflected their
              reference styles, storage needs and budget before collecting the
              keys.
            </p>
            <p>
              The brief included gas-lift storage beds, individual study
              furniture for three daughters, dining furniture and practical
              storage. Product quality was an important requirement.
            </p>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>02 / THE FURNITURE SHORTLIST</p>
        <h2>From requirements to references.</h2>
        <div className={s.threeGrid}>
          {[
            [
              "product-0-0.png",
              "Storage that works harder",
              "Gas-lift bed frames selected around the family’s storage needs.",
            ],
            [
              "product-1-0.png",
              "Room to make it their own",
              "Individual study furniture, with colour choices for three daughters.",
            ],
            [
              "product-0-1.png",
              "A place to gather",
              "Dining furniture selected around the family’s preferred style.",
            ],
          ].map(([image, title, text]) => (
            <article key={title}>
              <img
                src={`/cases/bto-family/${image}`}
                alt={title}
                width="600"
                height="600"
                loading="lazy"
                style={{
                  aspectRatio: "1",
                  objectFit: "contain",
                  background: "#fffaf0",
                }}
              />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className={s.note}>
          Product reference images from the sourcing shortlist. Final
          specifications, availability, quality checks and landed costs require
          confirmation. This case is not attributed to Huagui.
        </p>
      </section>
      <section className={s.caseBand}>
        <div className={s.caseGrid}>
          <figure>
            <img
              src="/cases/bto-family/floor-plan.png"
              alt="Source two-dimensional floor plan for the family apartment"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>Source floor plan used for planning</figcaption>
          </figure>
          <div>
            <p className={s.eyebrow}>03 / THE SPACE</p>
            <h2>
              See the possibilities.
              <br />
              <em>Discuss the details.</em>
            </h2>
            <p>
              A prepared apartment model gives the family a shared reference for
              discussing arrangements, materials and placement.
            </p>
            <p className={s.note}>
              The model is illustrative and includes alternative children’s room
              arrangements. It does not exactly reproduce the procurement
              shortlist.
            </p>
            <a className={s.button} href="/examples/family-apartment.html">
              Explore the 3D example ↗
            </a>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>04 / DELIVERED SO FAR</p>
        <h2>A clearer plan for the next step.</h2>
        <div className={s.threeGrid}>
          <article className={s.detailCard}>
            <h3>Furniture shortlist</h3>
            <p>
              Product references, options and specifications organised around
              the brief.
            </p>
          </article>
          <article className={s.detailCard}>
            <h3>Pricing information</h3>
            <p>
              A sourcing document to support discussion and comparison before
              purchasing.
            </p>
          </article>
          <article className={s.detailCard}>
            <h3>Spatial proposal</h3>
            <p>
              A visual reference to explore the home ahead of key collection.
            </p>
          </article>
        </div>
        <p className={s.status}>
          Furniture delivery and installation are not complete.
        </p>
        <a className={s.textLink} href="/how-it-works">
          Explore the project process ↗
        </a>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}
