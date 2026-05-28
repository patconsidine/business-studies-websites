import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  title: string;
  subtitle: string;
  yearLabel: string;
  navItems: { href: string; label: string }[];
  children: ReactNode;
};

export function SiteLayout({ title, subtitle, yearLabel, navItems, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">{yearLabel}</p>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-600">{subtitle}</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-8">
          <p>Built for NSW Business Studies students.</p>
          <p>Designed for quick class updates.</p>
        </div>
      </footer>
    </div>
  );
}
