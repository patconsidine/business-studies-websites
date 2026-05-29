# Content Authoring Guide

## NESA course structure (reference)

**Preliminary (Year 11)** — 120 indicative hours:

1. Nature of business (20%)
2. Business management (40%)
3. Business planning (40%)

**HSC (Year 12)** — 120 indicative hours:

1. Operations (25%)
2. Marketing (25%)
3. Finance (25%)
4. Human resources (25%)

Topic order in class is **not prescriptive** in the syllabus; use `order` in frontmatter to control display sequence on the site.

### Study section colours (Year 11 site)

| Component | Colour | Purpose |
|-----------|--------|---------|
| `<ReadingSection>` | Teal | Read and self-directed summarising |
| `<WorkbookSection>` | Amber | Key terms / syllabus points to copy into workbook |
| `<ActivitySection>` | Violet | Class or homework tasks |

Example in MDX:

```mdx
<ReadingSection title="Introduction">...</ReadingSection>
<WorkbookSection title="Definitions">...</WorkbookSection>
<ActivitySection title="Case study task">...</ActivitySection>
```

---


Each lesson page is authored as an MDX file in:

- `apps/year11/content/pages/` (mirrors Google Site URLs, e.g. `nature-of-business.mdx`, `business-management/management-approaches.mdx`)
- `apps/year12/content/topics/` (HSC topics — to be migrated similarly)

## Frontmatter convention

Every topic file must include:

```md
---
title: "Topic title"
term: "Preliminary Topic 1"
order: 1
indicativeTime: "20% (~24 hours)"
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
