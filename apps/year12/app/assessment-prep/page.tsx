import { ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

export default function AssessmentPrepPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading
        title="HSC Assessment Prep"
        subtitle="Build confidence with structure, evidence and clear evaluation."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <ContentCard title="20-Mark Blueprint" description="Plan intro, 3 analytical body paragraphs and evaluative conclusion." />
        <ContentCard title="Case Study Integration" description="Embed business examples naturally to strengthen marks." />
        <ContentCard title="Command Word Strategy" description="Adjust depth when prompted to explain, analyze, discuss or evaluate." />
        <ContentCard title="Self-Marking Checklist" description="Check judgment, evidence, terminology and direct question focus." />
      </div>
    </SiteLayout>
  );
}
