import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout, SectionHeading, SiteLayout } from "@ui/index";
import { getAllTopicMeta, getTopicBySlug } from "../../../lib/mdx";
import { siteConfig } from "../../../lib/site";

type Params = { slug: string };

export async function generateStaticParams() {
  const topics = await getAllTopicMeta();
  return topics.map((topic) => ({ slug: topic.slug }));
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  try {
    const topic = await getTopicBySlug(slug);
    return (
      <SiteLayout {...siteConfig}>
        <SectionHeading title={topic.meta.title} subtitle={`${topic.meta.term} • Updated ${topic.meta.updated}`} />
        <Callout title="Syllabus Outcomes">
          <ul className="ml-4 list-disc">
            {topic.meta.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </Callout>
        <article className="prose mt-6 max-w-none rounded-2xl border border-slate-200 bg-white p-6">
          <MDXRemote source={topic.content} />
        </article>
      </SiteLayout>
    );
  } catch {
    notFound();
  }
}
