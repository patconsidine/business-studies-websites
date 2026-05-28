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
            title="HSC Priority Topics"
            subtitle="Master high-value syllabus areas with concise notes and exam-focused prompts."
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
          storageKey="year12-topic-progress"
          title="HSC Topic Checklist"
          items={topics.map((topic) => `${topic.term}: ${topic.title}`)}
        />
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <SelfCheckQuiz />
        <div className="space-y-4">
          <ContentCard
            title="HSC Assessment Prep"
            description="Practice exam-style writing with high-scoring response structures."
            cta={<Link href="/assessment-prep" className="text-sm font-semibold text-indigo-700">Open HSC prep</Link>}
          />
          <ContentCard
            title="Revision Hub"
            description="Plan efficient revision blocks and track your confidence by topic."
            cta={<Link href="/revision" className="text-sm font-semibold text-indigo-700">Open revision hub</Link>}
          />
          <ContentCard
            title="Downloadable Resources"
            description="Use model paragraphs, command-word guides and case study banks."
            cta={<Link href="/resources" className="text-sm font-semibold text-indigo-700">View resources</Link>}
          />
        </div>
      </section>
    </SiteLayout>
  );
}
