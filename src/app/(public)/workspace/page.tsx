import { CorporateShell } from "@/features/corporate/CorporateShell";
import { SpaceScene } from "@/features/corporate/SpaceScene";
import { getOptionalCurrentSession } from "@/server/auth/session";
import { publicPageMetadata } from "@/lib/seo";
import s from "@/features/corporate/corporate.module.css";
export const dynamic = "force-dynamic";
export const metadata = publicPageMetadata({
  title: "Your 3D workspace",
  description:
    "Explore 3D space planning, furniture adjustments and an AI design assistant in Furnishes Studio.",
  path: "/workspace",
});
export default async function Page() {
  const session = await getOptionalCurrentSession();
  return (
    <CorporateShell
      path="/workspace"
      userLabel={session?.user.displayName || null}
    >
      <section className={s.pageIntro}>
        <p className={s.eyebrow}>FURNISHES STUDIO / 3D + AI</p>
        <h1>
          Explore your space.
          <br />
          <em>Make room for your ideas.</em>
        </h1>
        <p className={s.lead}>
          A project workspace for exploring a 3D layout, adjusting furniture and
          talking through design ideas with an AI assistant.
        </p>
        <div className={s.actions}>
          <a
            className={s.button}
            href={
              session ? "/account/canvas" : "/login?next=%2Faccount%2Fcanvas"
            }
          >
            Enter your 3D workspace ↗
          </a>
          <a className={s.textLink} href="/contact">
            Get help with your floor plan ↗
          </a>
        </div>
        <p className={s.note}>
          Sign in to access your workspace. AI assistance and saved projects
          require the service to be available.
        </p>
      </section>
      <section className={s.softBand}>
        <div className={s.split}>
          <SpaceScene kind="plan" />
          <div>
            <p className={s.eyebrow}>ONE WORKSPACE, THREE WAYS TO EXPLORE</p>
            <h2>See. Adjust. Discuss.</h2>
            <h3>Explore a 3D space</h3>
            <p>
              Review furniture in context and understand how a layout fits
              together.
            </p>
            <h3>Try a layout change</h3>
            <p>Use the space editor to explore placement and compare ideas.</p>
            <h3>Talk with the assistant</h3>
            <p>
              Ask design questions and work through possibilities. Confirm
              dimensions, specifications and final selections with the Furnishes
              team.
            </p>
          </div>
        </div>
      </section>
    </CorporateShell>
  );
}
