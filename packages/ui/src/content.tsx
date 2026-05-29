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

type StudySectionVariant = "reading" | "workbook" | "activity";

const sectionStyles: Record<
  StudySectionVariant,
  { label: string; hint: string; shell: string; bar: string; badge: string; title: string }
> = {
  reading: {
    label: "Read & summarise",
    hint: "Reading and self-directed notes",
    shell: "border-teal-200/90 bg-gradient-to-br from-teal-50/90 via-white to-white shadow-sm",
    bar: "border-teal-100/80 bg-teal-50/80",
    badge: "bg-teal-500",
    title: "text-teal-950"
  },
  workbook: {
    label: "Workbook",
    hint: "Write key terms and syllabus points word for word",
    shell: "border-amber-200/90 bg-gradient-to-br from-amber-50/90 via-white to-white shadow-sm",
    bar: "border-amber-100/80 bg-amber-50/80",
    badge: "bg-amber-500",
    title: "text-amber-950"
  },
  activity: {
    label: "Activity",
    hint: "Tasks to complete in class or at home",
    shell: "border-violet-200/90 bg-gradient-to-br from-violet-50/90 via-white to-white shadow-sm",
    bar: "border-violet-100/80 bg-violet-50/80",
    badge: "bg-violet-500",
    title: "text-violet-950"
  }
};

function StudySection({
  variant,
  title,
  children
}: {
  variant: StudySectionVariant;
  title?: string;
  children: ReactNode;
}) {
  const s = sectionStyles[variant];

  return (
    <section className={`my-6 overflow-hidden rounded-2xl border ${s.shell}`}>
      <div className={`flex flex-wrap items-center gap-2 border-b px-5 py-2.5 ${s.bar}`}>
        <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${s.badge}`} aria-hidden />
        <p className={`text-xs font-semibold uppercase tracking-wide ${s.title}`}>{s.label}</p>
        <span className={`text-xs ${s.title} opacity-70`}>— {s.hint}</span>
      </div>
      <div className="p-5">
        {title ? <h3 className={`mb-3 text-base font-semibold ${s.title}`}>{title}</h3> : null}
        <div className="prose prose-slate max-w-none text-sm leading-7 text-slate-800">{children}</div>
      </div>
    </section>
  );
}

/** Calm teal — reading and self-directed summarising */
export function ReadingSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <StudySection variant="reading" title={title}>
      {children}
    </StudySection>
  );
}

/** Warm amber — definitions and syllabus points for the workbook */
export function WorkbookSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <StudySection variant="workbook" title={title}>
      {children}
    </StudySection>
  );
}

/** Soft violet — class activities and tasks */
export function ActivitySection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <StudySection variant="activity" title={title}>
      {children}
    </StudySection>
  );
}

/** Legend for the three study section types (home / orientation) */
export function StudySectionLegend() {
  const items: { variant: StudySectionVariant; description: string }[] = [
    {
      variant: "reading",
      description: "Read the material and summarise in your own words."
    },
    {
      variant: "workbook",
      description: "Copy definitions and syllabus points into your workbook."
    },
    {
      variant: "activity",
      description: "Complete the task — in class, with a partner, or for homework."
    }
  ];

  return (
    <div className="not-prose grid gap-3 sm:grid-cols-3">
      {items.map(({ variant, description }) => {
        const s = sectionStyles[variant];
        return (
          <div key={variant} className={`rounded-xl border p-4 ${s.shell}`}>
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${s.badge}`} aria-hidden />
              <span className={`text-xs font-semibold uppercase tracking-wide ${s.title}`}>{s.label}</span>
            </div>
            <p className="text-sm leading-6 text-slate-700">{description}</p>
          </div>
        );
      })}
    </div>
  );
}
