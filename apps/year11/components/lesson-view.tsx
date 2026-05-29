import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SectionHeading, SiteLayout } from "@ui/index";
import { mdxComponents } from "./mdx-components";
import { getAllPages, type PageMeta } from "../lib/pages";
import { siteConfig } from "../lib/site";

type LessonViewProps = {
  title: string;
  subtitle: string;
  content: string;
  meta: PageMeta;
};

function breadcrumbParts(slug: string) {
  if (!slug || slug === "home") return [];
  return slug.split("/");
}

export async function LessonView({ title, subtitle, content, meta }: LessonViewProps) {
  const allPages = await getAllPages();
  const crumbs = breadcrumbParts(meta.slug);
  const depth = crumbs.length;
  const parentSlug = depth > 1 ? crumbs.slice(0, -1).join("/") : depth === 1 ? "" : "";

  const childPages =
    meta.slug === "home"
      ? allPages.filter((p) => p.slug !== "home" && !p.slug.includes("/"))
      : allPages.filter((p) => {
          const prefix = meta.slug + "/";
          return p.slug.startsWith(prefix) && p.slug.slice(prefix.length).split("/").length === 1;
        });

  const siblings = allPages.filter((p) => {
    if (p.slug === meta.slug || p.slug === "home") return false;
    const parts = p.slug.split("/");
    if (depth === 0) return false;
    if (depth === 1) return parts.length === 1;
    return parts.length === depth && p.slug.startsWith(parentSlug + "/");
  });

  return (
    <SiteLayout {...siteConfig}>
      {crumbs.length > 0 ? (
        <nav className="mb-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-indigo-700">
            Home
          </Link>
          {crumbs.map((part, i) => {
            const path = crumbs.slice(0, i + 1).join("/");
            const label = allPages.find((p) => p.slug === path)?.title ?? part.replace(/-/g, " ");
            return (
              <span key={path}>
                {" / "}
                <Link href={`/${path}`} className="hover:text-indigo-700">
                  {label}
                </Link>
              </span>
            );
          })}
        </nav>
      ) : null}

      <SectionHeading title={title} subtitle={subtitle} />

      {childPages.length > 0 ? (
        <ul className="mb-6 flex flex-wrap gap-2">
          {childPages.map((p) => (
            <li key={p.slug}>
              <Link
                href={p.slug === "home" ? "/" : `/${p.slug}`}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-800 hover:bg-indigo-100"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <article className="prose prose-slate mt-4 max-w-none rounded-2xl border border-slate-200 bg-white p-6 prose-headings:text-slate-900 prose-p:leading-7">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      {siblings.length > 0 && crumbs.length > 0 ? (
        <aside className="mt-8">
          <h3 className="text-sm font-semibold text-slate-700">Related pages</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {siblings.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="text-sm text-indigo-700 hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </SiteLayout>
  );
}
