import Link from "next/link";
import {
  ContentCard,
  ReadingSection,
  SectionHeading,
  SiteLayout,
  StudySectionLegend,
  WorkbookSection,
  ActivitySection
} from "@ui/index";
import { ProgressChecklist } from "../components/progress-checklist";
import { SelfCheckQuiz } from "../components/self-check-quiz";
import { getAllPages } from "../lib/pages";
import { siteConfig } from "../lib/site";

export default async function HomePage() {
  const pages = await getAllPages();
  const topLevel = pages.filter((p) => p.slug !== "home" && !p.slug.includes("/"));

  return (
    <SiteLayout {...siteConfig}>
      <SectionHeading title="Y11 Business Studies" subtitle="Miss H — Preliminary course hub" />

      <ReadingSection title="How to use this website">
        <p className="mb-4 text-slate-700">
          Each lesson uses three colour-coded section types. The colours are chosen for readability on screen — not
          the old Google Sites white, grey and blue blocks.
        </p>
        <StudySectionLegend />
      </ReadingSection>

      <WorkbookSection title="Aim of Business Studies">
        <p>
          Business Studies aims to develop knowledge, understanding, skills and values which enable students to make
          judgements about the performance of businesses in a dynamic business environment.
        </p>
      </WorkbookSection>

      <ReadingSection title="Course sections">
        <div className="not-prose grid gap-4 md:grid-cols-2">
          {topLevel.map((page) => (
            <ContentCard
              key={page.slug}
              title={page.title}
              description={page.summary}
              cta={
                <Link className="text-sm font-semibold text-indigo-700 hover:text-indigo-900" href={`/${page.slug}`}>
                  Open section
                </Link>
              }
            />
          ))}
          <ContentCard
            title="Exam Preparation"
            description="Syllabus scaffolds, Kahoot revision and response types"
            cta={
              <Link className="text-sm font-semibold text-indigo-700 hover:text-indigo-900" href="/exam-preparation">
                Open exam prep
              </Link>
            }
          />
        </div>
      </ReadingSection>

      <section className="mt-8 grid gap-8 lg:grid-cols-[2fr,1fr]">
        <ActivitySection title="Quick links">
          <ul>
            <li>
              <Link href="/revision">Revision hub</Link>
            </li>
            <li>
              <Link href="/resources">Downloadable resources</Link>
            </li>
            <li>
              <a href="https://sites.google.com/cg.catholic.edu.au/miss-h-business-studies/home" target="_blank" rel="noreferrer">
                Original Google Site (backup)
              </a>
            </li>
          </ul>
        </ActivitySection>
        <ProgressChecklist
          storageKey="year11-topic-progress-v2"
          title="Section progress"
          items={topLevel.map((p) => p.title)}
        />
      </section>

      <section className="mt-8">
        <SelfCheckQuiz />
      </section>
    </SiteLayout>
  );
}
