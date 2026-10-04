import type { Metadata } from "next";
import { CommercialLanding } from "@/features/landing/CommercialLanding";
import { LandingEntry } from "@/features/landing/LandingEntry";
import {
  firstSearchParam,
  isLandingIntroReplayQuery,
  shouldSkipLandingLoader,
} from "@/features/landing/landing-intro";
import { PUBLIC_PAGE_SEO, publicPageMetadata } from "@/lib/seo";
import { getOptionalCurrentSession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = publicPageMetadata({
  title: "Furnishes | Furniture Sourcing & Spatial Planning",
  description:
    "Furniture sourcing and spatial planning for homes and workplaces. Explore supplier options, build your shortlist, and plan your space with Furnishes.",
  path: PUBLIC_PAGE_SEO.home.path,
  absoluteTitle: true,
});

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    experience?: string | string[];
    intro?: string | string[];
    e2e?: string | string[];
  }>;
}) {
  const session = await getOptionalCurrentSession();
  const userLabel =
    session?.user.displayName?.trim() ||
    session?.user.email?.split("@")[0] ||
    null;

  const params = await searchParams;
  if (firstSearchParam(params.experience) !== "original") {
    return <CommercialLanding userLabel={userLabel} />;
  }
  const introQuery = firstSearchParam(params.intro);
  const skipFromQuery = shouldSkipLandingLoader({ introQuery });
  const e2eMode =
    process.env.NEXT_PUBLIC_E2E === "1" && firstSearchParam(params.e2e) === "1";

  return (
    <LandingEntry
      userLabel={userLabel}
      skipLoader={skipFromQuery}
      skipIntro={skipFromQuery}
      replay={isLandingIntroReplayQuery(introQuery)}
      e2eMode={e2eMode}
    />
  );
}
