import { ReactNode } from "react";

type CardProps = {
  title: string;
  description: string;
  cta?: ReactNode;
};

export function ContentCard({ title, description, cta }: CardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {cta ? <div className="mt-4">{cta}</div> : null}
    </article>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <h3 className="text-base font-semibold text-indigo-900">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-indigo-900/90">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-5">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
    </header>
  );
}
