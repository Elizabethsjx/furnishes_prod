import { CorporateShell, ProjectCTA } from "./CorporateShell";
import { SpaceScene } from "./SpaceScene";
import { businessAreas, workflow } from "./content";
import s from "./corporate.module.css";

export function CorporateHome({ userLabel }: { userLabel?: string | null }) {
  return (
    <CorporateShell userLabel={userLabel ?? null}>
      <section className={s.hero}>
        <div>
          <p className={s.eyebrow}>FURNITURE SOURCING · SPATIAL PLANNING</p>
          <h1>
            Considered furniture.
            <br />
            <em>Spaces with purpose.</em>
          </h1>
          <p className={s.chinese} lang="zh">
            从家的日常，到工作的空间。
          </p>
          <p className={s.lead}>
            For homes, workplaces and the people within. We bring your brief,
            furniture choices and spatial plan together.
          </p>
          <div className={s.actions}>
            <a className={s.button} href="#business-areas">
              Find your starting point ↓
            </a>
            <a className={s.textLink} href="/how-it-works">
              How it works ↗
            </a>
          </div>
          <p className={s.heroNote}>ROOTED IN DESIGN · CONNECTED TO MAKING</p>
        </div>
        <figure className={s.heroArt}>
          <SpaceScene animated />
          <figcaption>
            <span>FROM PLAN TO POSSIBILITY</span>
            <span>Concept illustration</span>
          </figcaption>
        </figure>
      </section>
      <div className={s.introStrip}>
        <span>SINGAPORE / ASIA</span>
        <p>One thoughtful process. Different kinds of space.</p>
        <a href="/contact">Let’s talk ↗</a>
      </div>
      <section className={s.section} id="how-it-works">
        <div className={s.sectionHeading}>
          <div>
            <p className={s.eyebrow}>01 / HOW WE WORK</p>
            <h2>
              From your brief
              <br />
              to <em>a clearer picture.</em>
            </h2>
          </div>
          <a className={s.textLink} href="/how-it-works">
            Explore the full process ↗
          </a>
        </div>
        <ol className={s.steps}>
          {workflow.map((step, i) => (
            <li key={step.title}>
              <span className={s.number}>0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={s.caseBand}>
        <div className={s.caseGrid}>
          <figure>
            <img
              src="/cases/bto-family/space-reference.png"
              alt="Spatial planning reference for a Singapore family apartment"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>
              PLANNING VISUALISATION · NOT A COMPLETED INTERIOR
            </figcaption>
          </figure>
          <div>
            <p className={s.eyebrow}>02 / A REAL BRIEF</p>
            <h2>
              A family home,
              <br />
              <em>planned before the keys.</em>
            </h2>
            <p>
              Three daughters. A new BTO home. Furniture choices shaped by
              storage, personal style and a shared budget.
            </p>
            <p className={s.status}>
              Proposal delivered · Furniture not yet received
            </p>
            <a className={s.textLink} href="/projects/bto-family">
              Follow the project ↗
            </a>
          </div>
        </div>
      </section>
      <section className={s.section} id="business-areas">
        <div className={s.sectionHeading}>
          <div>
            <p className={s.eyebrow}>03 / FIND YOUR STARTING POINT</p>
            <h2>
              Different spaces.
              <br />
              <em>The same care.</em>
            </h2>
          </div>
          <p>
            Choose the service that fits your brief.
            <br />
            We’ll help connect the details.
          </p>
        </div>
        <div className={s.businessGrid}>
          {businessAreas.map((area) => (
            <a className={s.businessCard} href={area.href} key={area.href}>
              <SpaceScene kind={area.kind} />
              <div className={s.cardMeta}>
                <span>
                  {area.number} / {area.name}
                </span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </a>
          ))}
        </div>
        <a className={s.textLink} href="/collections">
          Explore furniture & model collections ↗
        </a>
      </section>
      <section className={s.partnerBand}>
        <div className={s.partnerInner}>
          <div className={s.partnerMark} aria-hidden="true">
            <span lang="zh">华桂</span>
            <p>
              HUAGUI
              <br />
              TONGXIANG · CHINA
            </p>
          </div>
          <div>
            <p className={s.eyebrow}>04 / CONNECTED TO MAKING</p>
            <h2>
              Meet the people
              <br />
              <em>behind the products.</em>
            </h2>
            <p>
              Our supply collaboration with Tongxiang Huagui Furniture brings a
              furniture model library into the sourcing conversation — a
              starting point for product selection and spatial planning.
            </p>
            <a className={s.textLink} href="/partners/huagui">
              Explore the Huagui collaboration ↗
            </a>
          </div>
        </div>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}
