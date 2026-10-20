import {
  CorporateShell,
  ProjectCTA,
} from "@/features/corporate/CorporateShell";
import { businessAreas } from "@/features/corporate/content";
import { SpaceScene } from "@/features/corporate/SpaceScene";
import s from "@/features/corporate/corporate.module.css";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Space design & furniture services",
  description:
    "Furniture selection and spatial design for workplaces, shared spaces and homes.",
  path: "/services",
});
export default function Page() {
  return (
    <CorporateShell path="/services">
      <section className={s.pageIntro}>
        <p className={s.eyebrow}>FURNITURE · SPACE · PEOPLE</p>
        <h1>
          A considered space.
          <br />
          <em>From brief to visual proposal.</em>
        </h1>
        <p className={s.lead}>
          Furnishes connects space design, furniture selection and 3D
          visualisation around your needs and budget.
        </p>
      </section>
      <section className={s.section}>
        <div className={s.businessGrid}>
          {[businessAreas[1], businessAreas[0], businessAreas[2]].map(
            (area) => (
              <a className={s.businessCard} href={area.href} key={area.href}>
                <SpaceScene kind={area.kind} />
                <h2>{area.name}</h2>
                <p>{area.description}</p>
                <span>Explore the service ↗</span>
              </a>
            ),
          )}
        </div>
        <a className={s.textLink} href="/how-it-works">
          How we work together ↗
        </a>
      </section>
      <ProjectCTA />
    </CorporateShell>
  );
}
