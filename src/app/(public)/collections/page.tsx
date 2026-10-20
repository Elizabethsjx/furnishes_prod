import { CollectionsPage } from "@/features/corporate/BranchPages";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Furniture & model collections",
  description:
    "Explore Huagui furniture model references and request product images and specifications.",
  path: "/collections",
});
export default function Page() {
  return <CollectionsPage />;
}
