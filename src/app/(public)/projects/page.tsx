import { ProjectsPage } from "@/features/corporate/BranchPages";
import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({
  title: "Projects & case studies",
  description:
    "Explore real Furnishes furniture sourcing and spatial planning projects.",
  path: "/projects",
});
export default function Page() {
  return <ProjectsPage />;
}
