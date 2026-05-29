#!/usr/bin/env python3
"""Rewrite lesson MDX bodies using format rules (Python batch; mirrors format-lesson-content.ts)."""
import re
from pathlib import Path

PAGES = Path(__file__).resolve().parent.parent / "content" / "pages"

OUTCOME_SPLIT = re.compile(r"\s+(?=P\d+\s)")
SPLIT_LONG = re.compile(
    r"\s+(?=(?:P\d+\s|Outcomes\b|Definitions\b|Syllabus\b|Activity\b|Task\b|CLASSROOM|BOOKLET|WORK BOOK|"
    r"Role of Business|The role of business|Goods & Services|Types of Businesses|"
    r"Profit\b|Employment\b|Incomes\b|Innovation\b|Entrepeneurship|Choice\b|Wealth\b|Quality of Life\b|"
    r"External Influences|Internal Influences|Business Growth|Establishment stage|Growth Second|MERGER occurs|"
    r"Maturity Third|Students learn|Small to Medium|Large Businesses|Reach \(Geographical|Classification by|"
    r"## Task))",
    re.I,
)

ACTIVITY_START = re.compile(
    r"^(Activity|Task|CLASSROOM|BOOKLET|Booklet|WORK BOOK|Research Choose|Textbook |Complete the|Create a |List an example|Choose a |Click the|Watch |Outline the|Define the|Go to Chapter|Develop a )",
    re.I,
)
WORKBOOK_START = re.compile(
    r"^(Definitions|Syllabus|Copy the|Write this down|Add at least|Fill it in)",
    re.I,
)


def split_long(para):
    rest = para.strip()
    parts = []
    while rest:
        m = SPLIT_LONG.search(rest)
        if not m or m.start() < 40:
            parts.append(rest)
            break
        parts.append(rest[: m.start()].strip())
        rest = rest[m.start() :].strip()
    return [p for p in parts if p]


def classify(text: str) -> str:
    t = text.strip()
    if t.startswith("Outcomes") or re.match(r"^P\d+\s", t) or len(re.findall(r"\bP\d+\s", t)) >= 2:
        return "outcomes"
    if re.match(r"^(Activity|Task)\b", t, re.I) and len(t) < 500:
        return "activity"
    if WORKBOOK_START.match(t) or (t.count(" : ") >= 2 and len(t) < 500):
        return "workbook"
    if len(t) < 70 and t[0].isupper() and "." not in t:
        return "heading"
    return "reading"


def outcomes_md(text: str) -> str:
    items = []
    for s in OUTCOME_SPLIT.split(text):
        s = s.strip()
        if not re.match(r"^P\d+", s):
            continue
        # trim trailing non-outcome text glued to last item
        if " What do you think" in s:
            s = s.split(" What do you think")[0].strip()
        items.append(s)
    if len(items) < 2:
        return text
    body = "\n".join(f"- {i}" for i in items)
    return f'<Callout title="Syllabus outcomes">\n\n{body}\n\n</Callout>'


def wrap(tag, body, title=None):
    title_attr = f' title="{title}"' if title else ""
    return f"<{tag}{title_attr}>\n\n{body.strip()}\n\n</{tag}>"


def block_md(text: str, kind: str) -> str:
    t = text.strip()
    if not t:
        return ""
    if kind == "heading":
        return f"## {t}\n"
    if kind == "outcomes" or t.startswith("Outcomes") or len(re.findall(r"\bP\d+\s", t)) >= 2:
        return outcomes_md(t.replace("Outcomes:", "").strip())
    if t.startswith("http"):
        return f"[Open link]({t})\n"
    if kind == "workbook":
        tag = "WorkbookSection"
        title = "Definitions" if "Definitions" in t[:40] else ("Syllabus points" if "Syllabus" in t[:30] else None)
    elif kind == "activity":
        tag = "ActivitySection"
        title = "Task" if re.match(r"^Task\b", t, re.I) else ("Activity" if re.match(r"^Activity", t, re.I) else None)
    else:
        tag = "ReadingSection"
        title = None
        if t.startswith("Role of Business"):
            title = "Role of business"
        elif t.startswith("The role of business"):
            title = "Contributions of business"
    body = t
    return wrap(tag, body, title)


def strip_markup(raw: str) -> str:
    text = re.sub(r"</?(?:Reading|Workbook|Activity)Section[^>]*>", "\n", raw)
    text = re.sub(r"</?Callout[^>]*>", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def normalize_paragraphs(raw):
    """Collapse single line breaks (scraped HTML) into real paragraphs."""
    text = strip_markup(raw)
    text = text.replace("\r\n", "\n")
    # preserve intentional breaks around headings/outcomes
    text = re.sub(r"\n(?!\n)", " ", text)
    text = re.sub(r" +", " ", text)
    # restore breaks before major markers
    text = re.sub(r"\s+(?=Outcomes:)", "\n\nOutcomes:\n\n", text, flags=re.I)
    text = re.sub(
        r"\s+(?=(?:P\d+\s|Role of Business|The role of business|Types of Businesses|"
        r"External Influences|Internal Influences|Definitions\b|CLASSROOM|BOOKLET))",
        "\n\n",
        text,
        flags=re.I,
    )
    # Keep outcomes block together — don't split between P# lines
    text = re.sub(r"\n\n+(?=P\d+\s)", " ", text)
    return [p.strip() for p in re.split(r"\n\n+", text) if p.strip()]


def format_body(raw: str) -> str:
    out = []
    for para in normalize_paragraphs(raw):
        para = para.strip()
        if not para:
            continue
        threshold = 900
        for piece in split_long(para) if len(para) > threshold else [para]:
            out.append(block_md(piece, classify(piece)))
    return "\n\n".join(x for x in out if x)


def fetch_and_format(path_slug: str) -> str:
    import urllib.request

    base = "https://sites.google.com/cg.catholic.edu.au/miss-h-business-studies"
    url = f"{base}/{path_slug}"
    html = urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30
    ).read().decode("utf-8", errors="ignore")
    text = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.S | re.I)
    text = re.sub(r"<style[^>]*>.*?</style>", "", text, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", "\n", text)
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    NAV = {
        "Search this site", "Embedded Files", "Skip to main content", "Skip to navigation",
        "Miss H Prelim Business", "Home", "More", "Report abuse", "Page details", "Page updated",
        "Nature of Business", "Influences in the Business Environment", "Business Planning",
        "Critical Issues in Success & Failure", "Business Management", "Nature of Management",
        "Management Approaches", "Management Processes", "Operations Y11", "Marketing Y11",
        "Human Resources Y11", "Finance Y11", "Management & Change", "Exam Preparation",
        "Multiple Choice", "Short Answer", "Extended Response", "Business Report",
    }
    start = 0
    for i, l in enumerate(lines):
        if "The focus of this topic" in l:
            start = i
            break
    else:
        for i, l in enumerate(lines):
            if any(
                m in l
                for m in ("Students learn", "Y11 Operations", "Y11 Marketing", "Exam Preparation", "WORK BOOK", "No business —")
            ):
                start = i
                break
    end = len(lines)
    for i in range(len(lines) - 1, start, -1):
        if lines[i] == "Report abuse":
            end = i
            break
    body = " ".join(l for l in lines[start:end] if l not in NAV and not l.startswith("Miss H"))
    return format_body(body)


def process_file(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return
    end = text.index("---", 3)
    fm = text[: end + 3]
    slug = str(path.relative_to(PAGES)).replace(".mdx", "").replace("\\", "/")
    try:
        new_body = fetch_and_format(slug)
    except Exception as e:
        print(f"  fallback format for {slug}: {e}")
        new_body = format_body(text[end + 3 :].lstrip())
    path.write_text(fm + "\n" + new_body + "\n", encoding="utf-8")
    n = new_body.count("Section>")
    print(f"Formatted {slug} ({n} sections)")


def main():
    for mdx in sorted(PAGES.rglob("*.mdx")):
        if mdx.name == "home.mdx":
            continue
        process_file(mdx)


if __name__ == "__main__":
    main()
