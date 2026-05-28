import { Callout, ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

export default function RevisionPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading
        title="Revision Hub"
        subtitle="Use short, active revision cycles instead of passive rereading."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <ContentCard title="Retrieval Grid" description="Spend 10 minutes recalling key terms and examples without notes." />
        <ContentCard title="Case Study Sprint" description="Summarize one case in 5 bullet points and one strategy recommendation." />
        <ContentCard title="Exam Tips" description="Focus on command words and include business examples in every paragraph." />
      </div>
      <div className="mt-6">
        <Callout title="Weekly Revision Routine">
          Monday: retrieval quiz. Wednesday: case study summary. Friday: timed paragraph response.
        </Callout>
      </div>
    </SiteLayout>
  );
}
