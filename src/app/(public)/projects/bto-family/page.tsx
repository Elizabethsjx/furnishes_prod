import type { Metadata } from "next";
import { CommercialLanding } from "@/features/landing/CommercialLanding";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "A family home, planned before the keys",
  description:
    "A Singapore BTO furniture sourcing and spatial planning case. Shortlist and planning proposal delivered; furniture has not yet arrived.",
  path: "/projects/bto-family",
});
export default function FamilyCasePage() {
  return <CommercialLanding caseStudy />;
}
