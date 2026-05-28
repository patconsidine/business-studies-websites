import Link from "next/link";
import { ContentCard, SectionHeading, SiteLayout } from "@ui/index";
import { ProgressChecklist } from "../components/progress-checklist";
import { SelfCheckQuiz } from "../components/self-check-quiz";
import { getAllTopicMeta } from "../lib/mdx";
import { siteConfig } from "../lib/site";

export default async function HomePage() {
  const topics = await getAllTopicMeta();

  return (
    <SiteLayout {...siteConfig}>
      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div>
          <SectionHeading
            title="Term Learning Pathway"
            subtitle="Navigate each topic with summary notes, examples and syllabus outcomes."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {topics.slice(0, 3).map((topic) => (
              <ContentCard
                key={topic.slug}
                title={topic.title}
                description={`${topic.summary} (${topic.term})`}
                cta={
                  <Link className="text-sm font-semibold text-indigo-700 hover:text-indigo-900" href={`/topics/${topic.slug}`}>
                    Open topic
                  </Link>
                }
              />
            ))}
          </div>
        </div>
        <ProgressChecklist
          storageKey="year11-topic-progress"
          title="Topic Progress Checklist"
          items={topics.map((topic) => `${topic.term}: ${topic.title}`)}
        />
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <SelfCheckQuiz />
        <div className="space-y-4">
          <ContentCard
            title="Assessment Prep"
            description="Structure your short-answer and extended-response writing with examiner-friendly templates."
            cta={<Link href="/assessment-prep" className="text-sm font-semibold text-indigo-700">Go to assessment prep</Link>}
          />
          <ContentCard
            title="Revision Hub"
            description="Use retrieval grids, quick checks and exam tips to revise efficiently each week."
            cta={<Link href="/revision" className="text-sm font-semibold text-indigo-700">Open revision hub</Link>}
          />
          <ContentCard
            title="Downloadable Resources"
            description="Access scaffold sheets, glossary packs and case study templates."
            cta={<Link href="/resources" className="text-sm font-semibold text-indigo-700">View resources</Link>}
          />
        </div>
      </section>
    </SiteLayout>
  );
}
