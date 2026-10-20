import { ProcessPage } from "@/features/corporate/BranchPages";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "How Furnishes works",
  description:
    "From your brief and budget to a furniture shortlist, spatial proposal and refined quotation.",
  path: "/how-it-works",
});
export default function Page() {
  return <ProcessPage />;
}
