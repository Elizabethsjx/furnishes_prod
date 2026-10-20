import { ServicePage } from "@/features/corporate/BranchPages";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Commercial furniture & workplace planning",
  description:
    "Furniture sourcing and spatial proposals for workplaces, reception areas and shared spaces.",
  path: "/commercial",
});
export default function Page() {
  return <ServicePage area="commercial" />;
}
