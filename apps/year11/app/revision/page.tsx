import { Callout, ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

export default function RevisionPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading
        title="Preliminary Revision Hub"
        subtitle="Course order: Nature of business → Business planning → Business management."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <ContentCard
          title="Nature of Business"
          description="Role of business, types, life cycle, influences."
          cta={<a className="text-sm font-semibold text-indigo-700" href="/nature-of-business">Open section</a>}
        />
        <ContentCard
          title="Business Planning"
          description="SMEs, planning process, success and failure."
          cta={<a className="text-sm font-semibold text-indigo-700" href="/business-planning">Open section</a>}
        />
        <ContentCard
          title="Business Management"
          description="Management approaches, functions, change."
          cta={<a className="text-sm font-semibold text-indigo-700" href="/business-management">Open section</a>}
        />
      </div>
      <div className="mt-6">
        <Callout title="Weekly Revision Routine">
          Monday: key terms (legal structures, life cycle). Wednesday: business plan sections and SME influences. Friday: management approaches or short answer practice.
        </Callout>
      </div>
    </SiteLayout>
  );
}
