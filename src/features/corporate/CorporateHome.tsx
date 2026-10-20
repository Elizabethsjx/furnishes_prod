import { CorporateShell, ProjectCTA } from "./CorporateShell";
import { SpaceScene } from "./SpaceScene";
import { businessAreas, workflow } from "./content";
import s from "./corporate.module.css";

export function CorporateHome({ userLabel }: { userLabel?: string | null }) {
  return (
    <CorporateShell userLabel={userLabel ?? null}>
      <div className={s.heroBand}>
        <section className={s.hero}>
          <div>
            <p className={s.eyebrow}>FURNITURE SOURCING · SPATIAL PLANNING</p>
            <h1>
              Furniture selected.
              <br />
              <em>Projects moving.</em>
            </h1>
            <p className={s.chinese} lang="zh">
              从需求与预算，到可落地的家具方案。
            </p>
            <p className={s.lead}>
              Furniture sourcing and spatial planning for workplaces, shared
              spaces and homes. Compare the products, see the layout and clarify
              the project cost.
            </p>
            <div className={s.actions}>
              <a className={s.button} href="/contact?type=commercial">
                Discuss a commercial project ↗
              </a>
              <a className={s.textLink} href="/collections">
                Explore furniture collections ↗
              </a>
            </div>
            <p className={s.heroNote}>
              WORKPLACES · RECEPTION & LOUNGE · HOMES
            </p>
          </div>
          <figure className={s.heroArt}>
            <SpaceScene kind="work" animated />
            <figcaption>
              <span>YOUR BRIEF → FURNITURE → SPACE</span>
              <span>Concept illustration</span>
            </figcaption>
          </figure>
        </section>
      </div>
      <div className={s.introStrip}>
        <span>SINGAPORE / ASIA</span>
        <p>Clear specifications. Coordinated selections.</p>
        <a href="/contact">Let’s talk ↗</a>
      </div>
      <section className={s.section} id="business-areas">
        <div className={s.sectionHeading}>
          <div>
            <p className={s.eyebrow}>01 / SOLUTIONS FOR YOUR PROJECT</p>
            <h2>
              Built around your brief.
              <br />
              <em>Choose your project type.</em>
            </h2>
          </div>
          <p>
            Workplace fit-outs, shared spaces or a family home.
            <br />
            Find the right service and start with a clear scope.
          </p>
        </div>
        <div className={s.businessGrid}>
          {[businessAreas[1], businessAreas[0], businessAreas[2]].map(
            (area, index) => (
              <a className={s.businessCard} href={area.href} key={area.href}>
                <SpaceScene kind={area.kind} />
                <div className={s.cardMeta}>
                  <span>
                    0{index + 1} / {area.name}
                  </span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </a>
            ),
          )}
        </div>
        <a className={s.textLink} href="/collections">
          Explore furniture & model collections ↗
        </a>
      </section>
      <section className={s.section} id="how-it-works">
        <div className={s.sectionHeading}>
          <div>
            <p className={s.eyebrow}>02 / FROM BRIEF TO PROPOSAL</p>
            <h2>
              From your brief
              <br />
              to <em>a priced furniture plan.</em>
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
              <p className={s.stepOutput}>Deliverable: {step.output}</p>
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
            <p className={s.eyebrow}>03 / PROJECT EVIDENCE</p>
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
      <section className={s.partnerBand}>
        <div className={s.partnerInner}>
          <div className={s.supplierPanel}>
            <p className={s.eyebrow}>SUPPLY PARTNER / TONGXIANG, CHINA</p>
            <h3>Huagui Furniture</h3>
            <p lang="zh">桐乡华桂家具</p>
            <dl>
              <div>
                <dt>Product selection</dt>
                <dd>Furniture series & model references</dd>
              </div>
              <div>
                <dt>Project enquiries</dt>
                <dd>Specifications, finishes & quantities</dd>
              </div>
              <div>
                <dt>Supply scope</dt>
                <dd>Confirmed against your project brief</dd>
              </div>
            </dl>
            <a className={s.textLink} href="/collections">
              View the model series ↗
            </a>
          </div>
          <div>
            <p className={s.eyebrow}>04 / SUPPLY COLLABORATION</p>
            <h2>
              Product knowledge,
              <br />
              <em>connected to your project.</em>
            </h2>
            <p>
              Working with Tongxiang Huagui Furniture, we connect supplier model
              references with your selection brief. Product specifications,
              quantities, finishes and supply terms are confirmed for each
              project.
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
