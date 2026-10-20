import { CorporateShell, ProjectCTA } from "./CorporateShell";
import { SpaceScene } from "./SpaceScene";
import { businessAreas } from "./content";
import s from "./corporate.module.css";
import v from "./spatial.module.css";
import { SpatialExperience } from "./SpatialExperience";
import { SpatialWorkflow } from "./SpatialWorkflow";

export function CorporateHome({ userLabel }: { userLabel?: string | null }) {
  return (
    <CorporateShell userLabel={userLabel ?? null}>
      <section
        className={v.hero}
        aria-label="Space design and furniture selection"
      >
        <SpatialExperience />
        <div className={v.copy}>
          <p className={s.eyebrow}>SPACE DESIGN · FURNITURE · PEOPLE</p>
          <h1>
            Your space.
            <br />
            <em>Thoughtfully furnished.</em>
          </h1>
          <p className={s.lead}>
            We design your space, find furniture for your budget and bring it
            all together in 3D.
          </p>
          <div className={s.actions}>
            <a className={s.button} href="/contact?type=commercial">
              Discuss your project ↗
            </a>
            <a
              className={s.textLink}
              href={
                userLabel
                  ? "/account/canvas"
                  : "/login?next=%2Faccount%2Fcanvas"
              }
            >
              Enter your 3D workspace ↗
            </a>
          </div>
          <p className={v.copyNote}>
            WORKPLACES & SHARED SPACES · HOMES
            <br />
            3D workspace requires sign-in ·{" "}
            <a href="/workspace">See how it works ↗</a>
          </p>
        </div>
      </section>
      <div className={s.introStrip}>
        <span>SINGAPORE / ASIA</span>
        <p>Clear specifications. Coordinated selections.</p>
        <a href="/contact">Let’s talk ↗</a>
      </div>
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
            <p className={s.eyebrow}>01 / PROJECT EVIDENCE</p>
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
      <section className={s.section} id="how-it-works">
        <div className={s.sectionHeading}>
          <div>
            <p className={s.eyebrow}>02 / FROM YOUR BRIEF TO YOUR SPACE</p>
            <h2>
              A clear process.
              <br />
              <em>A space you can see.</em>
            </h2>
          </div>
          <a className={s.textLink} href="/how-it-works">
            Explore the process ↗
          </a>
        </div>
        <SpatialWorkflow />
      </section>
      <section className={s.section} id="business-areas">
        <div className={s.sectionHeading}>
          <div>
            <p className={s.eyebrow}>03 / SOLUTIONS FOR YOUR PROJECT</p>
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
      <section className={v.workspace}>
        <div>
          <p className={s.eyebrow}>YOUR 3D WORKSPACE</p>
          <h2>
            A place to explore.
            <br />
            <em>And make it yours.</em>
          </h2>
          <p>
            Review your space, try layout changes and discuss ideas with an AI
            assistant in the project workspace.
          </p>
          <div className={s.actions}>
            <a
              className={s.button}
              href={
                userLabel
                  ? "/account/canvas"
                  : "/login?next=%2Faccount%2Fcanvas"
              }
            >
              Open workspace ↗
            </a>
            <a className={s.textLink} href="/workspace">
              Explore the tools ↗
            </a>
          </div>
          <small>
            Sign-in required. AI and project saving need connected services.
          </small>
        </div>
        <ul>
          <li>
            01 / Your space in 3D
            <span>Explore the layout from different viewpoints.</span>
          </li>
          <li>
            02 / Try a change
            <span>Adjust furniture placement as you develop your ideas.</span>
          </li>
          <li>
            03 / Talk it through
            <span>
              Use the AI assistant to explore your brief and design questions.
            </span>
          </li>
        </ul>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}
