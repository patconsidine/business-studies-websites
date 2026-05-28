"use client";

import { useState } from "react";

type Question = {
  prompt: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    prompt: "When evaluating a strategy, what should your conclusion include?",
    options: [
      "Only one definition",
      "A clear judgment based on evidence",
      "A rewritten question with no answer",
      "A list of unrelated topics"
    ],
    answer: 1
  },
  {
    prompt: "Which response style best suits a 20-mark extended response?",
    options: ["Single paragraph", "Bullet list only", "Structured argument with examples", "One-sentence answer"],
    answer: 2
  }
];

export function SelfCheckQuiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const score = questions.reduce((total, question, idx) => total + (selected[idx] === question.answer ? 1 : 0), 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">HSC Quick Self-Check</h3>
      <p className="mt-1 text-sm text-slate-600">Use these to warm up before timed practice.</p>
      <div className="mt-4 space-y-4">
        {questions.map((question, idx) => (
          <article key={question.prompt} className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-900">{idx + 1}. {question.prompt}</p>
            <div className="mt-3 grid gap-2">
              {question.options.map((option, optIdx) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelected((prev) => ({ ...prev, [idx]: optIdx }))}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                    selected[idx] === optIdx
                      ? "border-indigo-400 bg-indigo-50 text-indigo-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-indigo-700">Current score: {score}/{questions.length}</p>
    </section>
  );
}
