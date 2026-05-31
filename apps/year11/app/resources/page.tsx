import Link from "next/link";
import { ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { downloadableResources, resourceCatalog, type ResourceTopic } from "../../lib/resources-catalog";
import { siteConfig } from "../../lib/site";

const topicOrder: { id: ResourceTopic; label: string }[] = [
  { id: "nature", label: "Nature of Business" },
  { id: "planning", label: "Business Planning" },
  { id: "management", label: "Business Management" },
  { id: "exam", label: "Exam Preparation" }
];

function kindLabel(kind: string) {
  return kind.toUpperCase();
}

export default function ResourcesPage() {
  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading
        title="Resources"
        subtitle="Download PDFs and find class worksheets by topic."
      />

      <section className="mb-10">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">PDF downloads</h3>
        <p className="mb-4 text-sm text-slate-600">
          These files are exported from your class resource folder and hosted on the site.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {downloadableResources.map((resource) => (
            <ContentCard
              key={resource.id}
              title={resource.title}
              description={`${resource.topicLabel} · PDF`}
              cta={
                <a
                  className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                  href={resource.href}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  Download PDF
                </a>
              }
            />
          ))}
        </div>
      </section>

      {topicOrder.map(({ id, label }) => {
        const items = resourceCatalog.filter((r) => r.topic === id && !r.href);
        if (items.length === 0) return null;
        return (
          <section key={id} className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">{label} — class worksheets</h3>
            <p className="mb-3 text-sm text-slate-600">
              Available in class as Word/Excel files. Ask your teacher if you need a copy.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  <span className="mr-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {kindLabel(item.kind)}
                  </span>
                  {item.title}
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="mt-6 text-sm text-slate-500">
        Revision activities:{" "}
        <Link href="/exam-preparation" className="font-medium text-indigo-700 hover:underline">
          Exam Preparation
        </Link>
        {" · "}
        <Link href="/revision" className="font-medium text-indigo-700 hover:underline">
          Revision hub
        </Link>
      </p>
    </SiteLayout>
  );
}
