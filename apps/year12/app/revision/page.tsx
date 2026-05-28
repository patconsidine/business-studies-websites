import { Callout, ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

export default function RevisionPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading
        title="HSC Revision Hub"
        subtitle="Use high-yield revision cycles aligned to exam performance."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <ContentCard title="Topical Flash Revision" description="Condense each topic into one page and review daily." />
        <ContentCard title="Case Study Drill" description="Link one business case to at least three syllabus concepts." />
        <ContentCard title="Timed Response Practice" description="Write 10-mark and 20-mark responses to strict time limits." />
      </div>
      <div className="mt-6">
        <Callout title="Weekly HSC Routine">
          Tuesday: 10-mark response. Thursday: case study links. Sunday: 20-mark timed response and self-mark.
        </Callout>
      </div>
    </SiteLayout>
  );
}
