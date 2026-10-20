import { ServicePage } from "@/features/corporate/BranchPages";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Home furniture sourcing",
  description: "Furniture selection for your home, budget and daily routines.",
  path: "/residential",
});
export default function Page() {
  return <ServicePage area="residential" />;
}
