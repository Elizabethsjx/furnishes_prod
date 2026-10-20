import { PartnerPage } from "@/features/corporate/BranchPages";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Tongxiang Huagui Furniture collaboration",
  description:
    "Learn about the Huagui supply collaboration and shared furniture model library.",
  path: "/partners/huagui",
});
export default function Page() {
  return <PartnerPage />;
}
