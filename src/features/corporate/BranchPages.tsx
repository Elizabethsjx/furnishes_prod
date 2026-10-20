import { CorporateShell, ProjectCTA } from "./CorporateShell";
import { SpaceScene } from "./SpaceScene";
import { branchContent, workflow } from "./content";
import s from "./corporate.module.css";

export function ServicePage({ area }: { area: keyof typeof branchContent }) {
  const page = branchContent[area];
  return (
    <CorporateShell path={`/${area}`}>
      <section className={s.hero}>
        <div>
          <a className={s.breadcrumb} href="/">
            Furnishes / Services
          </a>
          <p className={s.eyebrow}>{page.eyebrow}</p>
          <h1>
            {page.title}
            <br />
            <em>{page.accent}</em>
          </h1>
          <p className={s.lead}>{page.intro}</p>
          <a className={s.button} href={`/contact?type=${area}`}>
            Discuss your project ↗
          </a>
        </div>
        <figure className={s.heroArt}>
          <SpaceScene kind={page.kind} />
          <figcaption>
            Concept illustration · Discuss your own space with us
          </figcaption>
        </figure>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>WHAT WE CAN EXPLORE</p>
        <h2>{page.heading}</h2>
        <div className={s.threeGrid}>
          {page.cards.map(([title, text]) => (
            <article className={s.detailCard} key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.softBand}>
        <div className={s.split}>
          <div>
            <p className={s.eyebrow}>WHAT YOU RECEIVE</p>
            <h2>
              Details you can
              <br />
              <em>make decisions with.</em>
            </h2>
            <a className={s.textLink} href="/how-it-works">
              Our process ↗
            </a>
          </div>
          <div>
            <ul className={s.deliverables}>
              {page.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={s.note}>{page.note}</p>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>TAKE A CLOSER LOOK</p>
        <h2>See the thinking in context.</h2>
        <div className={s.actions}>
          <a className={s.button} href={page.next}>
            {page.nextLabel} ↗
          </a>
          <a className={s.textLink} href="/collections">
            Browse the collections ↗
          </a>
        </div>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}

export function ProcessPage() {
  const details = [
    "Tell us who will use the space, what furniture you need, your budget range and target timing. A floor plan, dimensions and reference images help us make the brief specific.",
    "We compare supplier options against the brief, organising product references, dimensions, finish choices and quoted prices. You review the shortlist before we refine it.",
    "We use your plan to prepare a 3D spatial reference, then place selected or representative furniture models. Discuss room proportions, circulation and alternative arrangements together.",
    "Your feedback guides changes to the furniture selection and layout. We clarify the final specifications and quotation scope, including any agreed delivery and installation arrangements.",
  ];
  return (
    <CorporateShell path="/how-it-works">
      <section className={s.pageIntro}>
        <a className={s.breadcrumb} href="/">
          Furnishes / How it works
        </a>
        <p className={s.eyebrow}>A SHARED PROCESS</p>
        <h1>
          From a first brief
          <br />
          to <em>informed choices.</em>
        </h1>
        <p className={s.lead}>
          Four clear stages, with something concrete to review at each step.
        </p>
      </section>
      <section className={s.section}>
        <ol className={s.processList}>
          {workflow.map((step, index) => (
            <li key={step.title}>
              <span className={s.number}>0{index + 1}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{details[index]}</p>
                <p className={s.output}>You receive: {step.output}.</p>
                {index === 2 && (
                  <p className={s.note}>
                    Exact supplier models are used where available.
                    Representative geometry is identified as such; a visual
                    proposal is not a construction drawing.
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className={s.caseBand}>
        <div className={s.split}>
          <div>
            <p className={s.eyebrow}>THE PROCESS IN PRACTICE</p>
            <h2>
              A real family.
              <br />
              <em>A clear starting point.</em>
            </h2>
          </div>
          <div>
            <p>
              See how a Singapore BTO brief became a furniture shortlist and
              spatial planning proposal.
            </p>
            <a className={s.textLink} href="/projects/bto-family">
              Read the project notes ↗
            </a>
          </div>
        </div>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}

export function ProjectsPage() {
  return (
    <CorporateShell path="/projects">
      <section className={s.pageIntro}>
        <p className={s.eyebrow}>OUR WORK / PROJECT NOTES</p>
        <h1>
          Real briefs.
          <br />
          <em>Thoughtful decisions.</em>
        </h1>
        <p className={s.lead}>
          A closer look at the requirements, selections and spatial proposals
          behind our work.
        </p>
      </section>
      <section className={s.section}>
        <a className={s.projectCard} href="/projects/bto-family">
          <img
            src="/cases/bto-family/space-reference.png"
            alt="BTO apartment planning visualisation"
            width="1200"
            height="900"
            loading="lazy"
          />
          <div>
            <p className={s.eyebrow}>SINGAPORE / RESIDENTIAL</p>
            <h2>A family home, planned before the keys.</h2>
            <p>
              Storage, study spaces and shared living for a family with three
              daughters.
            </p>
            <p className={s.status}>
              Proposal delivered · Furniture not yet received
            </p>
            <span className={s.textLink}>Read the case study ↗</span>
          </div>
        </a>
        <p className={s.note}>
          This is a Furnishes planning and sourcing case. Supplier project
          references, when available, are presented separately with their own
          attribution.
        </p>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}

const models = [
  ["趣系列 / Qu", "SA303", "SA507", "X913 合集"],
  ["雅系列 / Ya", "X907", "X928", "X921"],
  ["智系列 / Zhi", "X901", "X902", "SA111"],
  ["轩系列 / Xuan", "X958", "X959", "X976"],
];
export function CollectionsPage() {
  return (
    <CorporateShell path="/collections">
      <section className={s.pageIntro}>
        <p className={s.eyebrow}>FURNITURE / SOURCING REFERENCES</p>
        <h1>
          Start with a collection.
          <br />
          <em>Make it fit your brief.</em>
        </h1>
        <p className={s.lead}>
          Explore the model series shared by Huagui and discuss the pieces that
          suit your project. Specifications, finishes and current supply are
          confirmed during sourcing.
        </p>
      </section>
      <section className={s.section}>
        <div className={s.sectionHeading}>
          <div>
            <p className={s.eyebrow}>HUAGUI / MODEL LIBRARY</p>
            <h2>Four series to explore.</h2>
          </div>
          <a className={s.textLink} href="/partners/huagui">
            About the collaboration ↗
          </a>
        </div>
        <div className={s.twoGrid}>
          {models.map(([series, ...references], index) => (
            <article className={s.collectionCard} key={series}>
              <span className={s.number}>0{index + 1} / MODEL REFERENCES</span>
              <h3>{series}</h3>
              <p>Available model references in the shared library:</p>
              <ul>
                {references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
              <a
                className={s.textLink}
                href={`/contact?type=commercial&collection=${encodeURIComponent(series!)}`}
              >
                Request images & specifications ↗
              </a>
            </article>
          ))}
        </div>
        <p className={s.note}>
          These are model-library references, not a live stock catalogue.
          Product images, dimensions, materials and quotations are supplied
          against your requirements.
        </p>
      </section>
      <section className={s.softBand}>
        <div className={s.split}>
          <div>
            <p className={s.eyebrow}>EXTEND THE SELECTION</p>
            <h2>
              Tables, office series
              <br />
              <em>and acoustic pods.</em>
            </h2>
          </div>
          <div>
            <p>
              The shared materials also include a tables collection, links to
              office-furniture series and acoustic-pod engineering files. Ask us
              to confirm the relevant supplier, model details and availability
              for your project.
            </p>
            <a className={s.textLink} href="/contact?type=commercial">
              Discuss additional requirements ↗
            </a>
          </div>
        </div>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}

export function PartnerPage() {
  return (
    <CorporateShell path="/partners/huagui">
      <section className={s.pageIntro}>
        <a className={s.breadcrumb} href="/commercial">
          Furnishes / Commercial projects
        </a>
        <p className={s.eyebrow}>OUR SUPPLY COLLABORATION</p>
        <h1>
          Tongxiang Huagui
          <br />
          <em>Furniture.</em>
        </h1>
        <p className={s.chinese} lang="zh">
          桐乡华桂家具
        </p>
        <p className={s.lead}>
          Connecting a supplier’s product knowledge with your project
          requirements. Our collaboration starts with furniture references and a
          shared model library for selection and spatial planning.
        </p>
      </section>
      <section className={s.softBand}>
        <div className={s.split}>
          <div>
            <p className={s.eyebrow}>WORKING TOGETHER</p>
            <h2>
              Product knowledge.
              <br />
              <em>Project context.</em>
            </h2>
          </div>
          <div>
            <h3>Huagui’s contribution</h3>
            <p>
              Furniture and model references to support selection discussions,
              with product specifications and supply details confirmed for each
              enquiry.
            </p>
            <h3>Furnishes’ contribution</h3>
            <p>
              Your brief, furniture shortlist and spatial proposal, organised
              into a shared reference for project decisions.
            </p>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>THE SHARED LIBRARY</p>
        <h2>A starting point for selection.</h2>
        <div className={s.threeGrid}>
          <article className={s.detailCard}>
            <h3>Furniture series</h3>
            <p>
              Qu, Ya, Zhi and Xuan model series, alongside a tables collection.
            </p>
          </article>
          <article className={s.detailCard}>
            <h3>Planning references</h3>
            <p>
              3D furniture files and office-series references to help discuss
              suitable products.
            </p>
          </article>
          <article className={s.detailCard}>
            <h3>Project specifications</h3>
            <p>
              Request relevant product images, dimensions, materials, current
              quotations and lead times.
            </p>
          </article>
        </div>
        <div className={s.actions}>
          <a className={s.button} href="/collections">
            Explore model collections ↗
          </a>
          <a className={s.textLink} href="/contact?type=commercial">
            Discuss a commercial brief ↗
          </a>
        </div>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}
