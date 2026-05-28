# Content Authoring Guide

Each topic page is authored as an MDX file in:

- `apps/year11/content/topics`
- `apps/year12/content/topics`

## Frontmatter convention

Every topic file must include:

```md
---
title: "Topic title"
term: "Term 1"
outcomes:
  - "Syllabus outcome 1"
  - "Syllabus outcome 2"
difficulty: "foundation"
updated: "2026-05-28"
summary: "One sentence summary for cards and previews."
---
```

### Field notes

- `difficulty` must be one of: `foundation`, `core`, `extension`
- `updated` format: `YYYY-MM-DD`
- `summary` should be concise and student-friendly

## Workflow for adding a new topic

1. Create a new `.mdx` file in the relevant year folder.
2. Use a slug-style filename, e.g. `operations-strategy.mdx`.
3. Add full frontmatter and body content.
4. Start with:
   - Why this topic matters
   - Key terms/concepts
   - One exam-style practice prompt
5. Save and preview in local dev server.

## Update cadence

- Weekly: refresh examples/case studies
- Fortnightly: add one new revision prompt
- Per assessment block: add scaffolds and exam tips
