import { ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

const resources = [
  { title: "Model 20-Mark Response", description: "Annotated high-band sample response with examiner notes." },
  { title: "Command Words Sheet", description: "Quick-reference list for exam wording and expected depth." },
  { title: "Case Study Bank", description: "Reusable contemporary business examples linked to key syllabus areas." }
];

export default function ResourcesPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading title="Resources" subtitle="Keep these close during weekly revision and exam prep." />
      <div className="grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <ContentCard key={resource.title} title={resource.title} description={resource.description} />
        ))}
      </div>
    </SiteLayout>
  );
}
