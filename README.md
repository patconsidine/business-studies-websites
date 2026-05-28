# Business Studies Websites

Two modern, engaging websites for NSW Business Studies:

- `apps/year11` for Year 11
- `apps/year12` for Year 12

Both apps share reusable UI components in `packages/ui`.

## Stack

- Next.js (App Router)
- Tailwind CSS
- MDX content files
- Vercel deployment

## Local development

1. Install dependencies:

```bash
npm install
```

2. Run Year 11:

```bash
npm run dev:year11
```

3. Run Year 12:

```bash
npm run dev:year12
```

## Deployment (Vercel)

Create two separate Vercel projects from this same repository:

- Project 1 root directory: `apps/year11`
- Project 2 root directory: `apps/year12`

Recommended:

- Framework preset: Next.js
- Build command: default (`next build`)
- Output: default

## Performance and usability checks

Before publishing each update:

- Confirm all key pages are reachable in <= 3 clicks.
- Check mobile layout on a narrow viewport.
- Run Lighthouse and keep mobile performance high.
- Confirm updated topic pages render correctly from MDX.

## Term rollover checklist

- Archive outdated assessment announcements.
- Add new topic MDX files for the upcoming term.
- Update homepage spotlight cards.
- Refresh case study examples with current businesses.
