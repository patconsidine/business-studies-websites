import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { formatLessonContent } from "./format-lesson-content";

export type PageMeta = {
  slug: string;
  slugParts: string[];
  title: string;
  summary: string;
  order: number;
  updated: string;
};

const pagesDir = path.join(process.cwd(), "content/pages");

async function walkMdx(dir: string, parts: string[] = []): Promise<{ parts: string[]; file: string }[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: { parts: string[]; file: string }[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMdx(full, [...parts, entry.name])));
    } else if (entry.name.endsWith(".mdx")) {
      files.push({ parts: [...parts, entry.name.replace(/\.mdx$/, "")], file: full });
    }
  }

  return files;
}

function toMeta(parts: string[], data: Record<string, unknown>): PageMeta {
  const isHome = parts.length === 1 && parts[0] === "home";
  const slug = isHome ? "home" : parts.join("/");
  const slugParts = isHome ? [] : parts;

  return {
    slug,
    slugParts,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    order: Number(data.order ?? 99),
    updated: String(data.updated ?? "")
  };
}

export async function getAllPages(): Promise<PageMeta[]> {
  const files = await walkMdx(pagesDir);
  const pages = await Promise.all(
    files.map(async ({ parts, file }) => {
      const source = await fs.readFile(file, "utf8");
      const { data } = matter(source);
      return toMeta(parts, data as Record<string, unknown>);
    })
  );

  return pages.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getPageBySlugParts(slugParts: string[]) {
  const slugPath =
    slugParts.length === 0 || (slugParts.length === 1 && slugParts[0] === "home")
      ? "home"
      : slugParts.join("/");
  const file = path.join(pagesDir, `${slugPath}.mdx`);

  const source = await fs.readFile(file, "utf8");
  const { content, data } = matter(source);
  const fileParts = slugPath === "home" ? ["home"] : slugPath.split("/");

  return {
    content: formatLessonContent(content),
    meta: toMeta(fileParts, data as Record<string, unknown>)
  };
}

export async function getStaticSlugParams(): Promise<{ slug: string[] }[]> {
  const pages = await getAllPages();
  return pages
    .filter((p) => p.slug !== "home")
    .map((p) => ({ slug: p.slugParts.length ? p.slugParts : p.slug.split("/") }));
}
