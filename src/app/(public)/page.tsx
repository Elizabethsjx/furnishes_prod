import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CorporateHome } from "@/features/corporate/CorporateHome";
import { publicPageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { getOptionalCurrentSession } from "@/server/auth/session";
export const dynamic = "force-dynamic";
export const metadata: Metadata = publicPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ experience?: string | string[] }>;
}) {
  const params = await searchParams;
  const experience = Array.isArray(params.experience)
    ? params.experience[0]
    : params.experience;
  if (experience === "commercial") redirect("/commercial");
  if (experience === "original") redirect("/");
  const session = await getOptionalCurrentSession();
  const userLabel =
    session?.user.displayName?.trim() ||
    session?.user.email?.split("@")[0] ||
    null;
  return <CorporateHome userLabel={userLabel} />;
}
