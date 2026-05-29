import { Callout, ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

export default function RevisionPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading
        title="Preliminary Revision Hub"
        subtitle="Revise by NESA topic: Nature of business (20%), Business management (40%), Business planning (40%)."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <ContentCard title="Outcomes P1–P10" description="Match practice answers to Preliminary outcomes (e.g. P4 = interdependence of business functions)." />
        <ContentCard title="Case Study Sprint" description="One Australian + one global business: life cycle stage, stakeholders, one external influence each." />
        <ContentCard title="Business Plan Check" description="Rehearse plan sections: vision, forecasting, break-even, monitoring and competitive advantage." />
      </div>
      <div className="mt-6">
        <Callout title="Weekly Revision Routine">
          Monday: key terms (legal structures, life cycle). Wednesday: management approaches + functions. Friday: business plan section draft or short answer.
        </Callout>
      </div>
    </SiteLayout>
  );
}
