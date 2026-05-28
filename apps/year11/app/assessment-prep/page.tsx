import { ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

export default function AssessmentPrepPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading
        title="Assessment Preparation"
        subtitle="Build exam-ready responses with clear structure and evidence."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <ContentCard title="Short Answer Structure" description="Define, explain and apply to a real business scenario in 3-4 sentences." />
        <ContentCard title="Extended Response Framework" description="Use PEEL paragraphs with one business case reference in each body paragraph." />
        <ContentCard title="Command Words Guide" description="Differentiate between explain, analyze and evaluate before writing." />
        <ContentCard title="Examiner Checklist" description="Answer the question directly, integrate terminology, and conclude with judgment." />
      </div>
    </SiteLayout>
  );
}
