import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type TopicMeta = {
  slug: string;
  title: string;
  term: string;
  order?: number;
  indicativeTime?: string;
  outcomes: string[];
  difficulty: "foundation" | "core" | "extension";
  updated: string;
  summary: string;
};

const topicsDir = path.join(process.cwd(), "content/topics");

export async function getAllTopicMeta(): Promise<TopicMeta[]> {
  const files = await fs.readdir(topicsDir);
  const topics = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const source = await fs.readFile(path.join(topicsDir, file), "utf8");
        const { data } = matter(source);
        return { slug, ...(data as Omit<TopicMeta, "slug">) };
      })
  );

  return topics.sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));
}

export async function getTopicBySlug(slug: string) {
  const source = await fs.readFile(path.join(topicsDir, `${slug}.mdx`), "utf8");
  const { content, data } = matter(source);
  return {
    content,
    meta: { slug, ...(data as Omit<TopicMeta, "slug">) }
  };
}
