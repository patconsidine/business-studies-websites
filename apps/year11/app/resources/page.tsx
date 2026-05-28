import { ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { siteConfig } from "../../lib/site";

const resources = [
  { title: "Business Report Scaffold", description: "Sentence starters and structure guide for report tasks." },
  { title: "Key Terms Glossary", description: "Core Year 11 terms and concise definitions." },
  { title: "Case Study Template", description: "One-page template for building class case studies." }
];

export default function ResourcesPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading title="Resources" subtitle="Download and use these in class or at home." />
      <div className="grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <ContentCard key={resource.title} title={resource.title} description={resource.description} />
        ))}
      </div>
    </SiteLayout>
  );
}
