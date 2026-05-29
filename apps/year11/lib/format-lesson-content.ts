/**
 * Converts migrated Google Site text blobs into structured MDX with study sections.
 */

const OUTCOME_SPLIT = /\s+(?=P\d+\s)/;

const ACTIVITY_START =
  /^(Activity|Task|CLASSROOM|BOOKLET|Booklet|WORK BOOK|Research Choose|Textbook |Complete the|Create a |List an example|Choose a |Click the|Watch |Outline the|Define the|Go to Chapter|Develop a |Explain how|Investigate |Discuss |Assess |Compare )/i;

const WORKBOOK_START =
  /^(Definitions|Syllabus|Copy the|Write this down|Add at least|Fill it in|Key [Vv]ocabulary|:\s*the organised effort|:\s*items that can be seen|:\s*money received|:\s*small to medium)/i;

const HEADING_LINE = /^[A-Z][A-Za-z0-9 &'/-]{2,60}$/;

function splitLongParagraph(text: string): string[] {
  const parts: string[] = [];
  let rest = text.trim();

  while (rest.length > 0) {
  const match = rest.match(
      /\s+(?=(?:P\d+\s|Outcomes\b|Definitions\b|Syllabus\b|Activity\b|Task\b|CLASSROOM|BOOKLET|WORK BOOK|Role of Business|The role of business|Types of Businesses|External Influences|Internal Influences|Business Growth|Establishment stage|Growth Second|MERGER occurs|Maturity Third|Students learn))/
    );

    if (!match || match.index === undefined || match.index < 40) {
      parts.push(rest);
      break;
    }

    parts.push(rest.slice(0, match.index).trim());
    rest = rest.slice(match.index).trim();
  }

  return parts.filter((p) => p.length > 0);
}

function splitOutcomesBlock(text: string): string {
  const items = text
    .split(OUTCOME_SPLIT)
    .map((s) => s.trim())
    .filter((s) => /^P\d+/.test(s));

  if (items.length < 2) return text;

  return items.map((item) => `- ${item}`).join("\n");
}

function classifyBlock(text: string): "outcomes" | "activity" | "workbook" | "heading" | "reading" {
  const t = text.trim();
  if (!t) return "reading";
  if (/^P\d+\s/.test(t) || t === "Outcomes" || t.startsWith("Outcomes ")) return "outcomes";
  if (ACTIVITY_START.test(t)) return "activity";
  if (WORKBOOK_START.test(t) || /\b:\s*[a-z]/.test(t) && t.length < 400 && (t.match(/\b:\s/g)?.length ?? 0) >= 2)) {
    return "workbook";
  }
  if (t.length < 70 && HEADING_LINE.test(t) && !t.includes(".")) return "heading";
  return "reading";
}

function wrapSection(type: "reading" | "workbook" | "activity", body: string, title?: string): string {
  const tag =
    type === "reading" ? "ReadingSection" : type === "workbook" ? "WorkbookSection" : "ActivitySection";
  const titleAttr = title ? ` title="${title.replace(/"/g, '\\"')}"` : "";
  return `<${tag}${titleAttr}>\n\n${body.trim()}\n\n</${tag}>`;
}

function blockToMarkdown(text: string, type: ReturnType<typeof classifyBlock>): string {
  const t = text.trim();
  if (!t) return "";

  if (type === "heading") {
    return `## ${t}\n`;
  }

  if (type === "outcomes") {
    const list = splitOutcomesBlock(t);
    return `<Callout title="Syllabus outcomes">\n\n${list}\n\n</Callout>\n`;
  }

  // Break definition-style "term : definition" chains into bullets
  if (type === "workbook" && (t.match(/\s[a-z]+ :\s/g)?.length ?? 0) >= 2) {
    const defs = t.split(/\s+(?=[a-z][a-z\s]* : )/i);
    const body = defs.map((d) => `- **${d.trim()}**`).join("\n");
    return wrapSection("workbook", body, t.startsWith("Definitions") ? "Definitions" : undefined);
  }

  // URLs on their own
  if (/^https?:\/\//.test(t)) {
    return `[Open link](${t})\n`;
  }

  const paras = t.split(/\.\s+(?=[A-Z])/).map((s, i, arr) => {
    const seg = s.trim();
    if (!seg) return "";
    return i < arr.length - 1 && !seg.endsWith(".") ? `${seg}.` : seg;
  });

  const body = paras.filter(Boolean).join("\n\n");

  return wrapSection(type === "workbook" ? "workbook" : type === "activity" ? "activity" : "reading", body);
}

export function formatLessonContent(raw: string): string {
  let text = raw.trim();
  if (text.startsWith("<ReadingSection") || text.startsWith("<WorkbookSection")) {
    return text;
  }

  // Already has multiple headings — light pass only
  const chunks: string[] = [];

  for (const para of text.split(/\n\n+/)) {
    const pieces = para.length > 600 ? splitLongParagraph(para) : [para];

    for (const piece of pieces) {
      const type = classifyBlock(piece);
      chunks.push(blockToMarkdown(piece, type));
    }
  }

  return chunks.filter(Boolean).join("\n\n");
}
