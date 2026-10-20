import { ServicePage } from "@/features/corporate/BranchPages";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Spatial planning & visualisation",
  description:
    "Explore your floor plan and furniture choices in a visual spatial proposal.",
  path: "/space-planning",
});
export default function Page() {
  return <ServicePage area="space-planning" />;
}
