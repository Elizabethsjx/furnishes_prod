import { CorporateShell } from "@/features/corporate/CorporateShell";
import { ProjectEnquiry } from "@/features/corporate/ProjectEnquiry";
import s from "@/features/corporate/corporate.module.css";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Discuss your project",
  description:
    "Share your furniture requirements, budget and floor plan with Furnishes.",
  path: "/contact",
});
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string | string[];
    collection?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : "";
  const collection =
    typeof params.collection === "string"
      ? params.collection.slice(0, 120)
      : "";
  return (
    <CorporateShell path="/contact">
      <section className={s.pageIntro}>
        <p className={s.eyebrow}>LET’S MAKE A START</p>
        <h1>
          Your space.
          <br />
          <em>Your next step.</em>
        </h1>
        <p className={s.lead}>
          Tell us about the project you have in mind. A few details help us
          start a useful conversation.
        </p>
      </section>
      <section className={`${s.section} ${s.contactGrid}`}>
        <aside className={s.contactAside}>
          <h2>Bring your brief.</h2>
          <p>
            Share a floor plan, reference images, furniture needs, budget and
            target timing. It’s fine if some details are still taking shape.
          </p>
          <a className={s.textLink} href="mailto:hello@furnish-es.com">
            hello@furnish-es.com ↗
          </a>
          <p className={s.note}>
            For account or order support, email us with the relevant reference.
            Do not include payment card details.
          </p>
          <a className={s.textLink} href="/how-it-works">
            See how we work ↗
          </a>
        </aside>
        <ProjectEnquiry initialType={type} collection={collection} />
      </section>
    </CorporateShell>
  );
}
