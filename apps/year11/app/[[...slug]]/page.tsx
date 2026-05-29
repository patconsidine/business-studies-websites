import { notFound } from "next/navigation";
import { LessonView } from "../../components/lesson-view";
import { getPageBySlugParts, getStaticSlugParams } from "../../lib/pages";

type Params = { slug?: string[] };

export async function generateStaticParams() {
  return getStaticSlugParams();
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  try {
    const page = await getPageBySlugParts(slug ?? []);

    return (
      <LessonView
        title={page.meta.title}
        subtitle={[page.meta.summary, page.meta.updated ? `Updated ${page.meta.updated}` : ""].filter(Boolean).join(" • ")}
        content={page.content}
        meta={page.meta}
      />
    );
  } catch {
    notFound();
  }
}
