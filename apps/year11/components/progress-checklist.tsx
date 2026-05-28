"use client";

import { useEffect, useMemo, useState } from "react";

type ProgressChecklistProps = {
  storageKey: string;
  title: string;
  items: string[];
};

export function ProgressChecklist({ storageKey, title, items }: ProgressChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      setChecked(JSON.parse(raw));
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  const completed = useMemo(() => items.filter((item) => checked[item]).length, [checked, items]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="text-sm font-medium text-indigo-700">{completed}/{items.length} done</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 transition hover:border-indigo-200">
              <input
                type="checkbox"
                checked={Boolean(checked[item])}
                onChange={(event) => setChecked((prev) => ({ ...prev, [item]: event.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
