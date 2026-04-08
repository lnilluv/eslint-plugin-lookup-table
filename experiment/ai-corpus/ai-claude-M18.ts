export interface TocItem {
  level: number;
  text: string;
  slug: string;
}

function normalizeHeadingText(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[\*_~]/g, "")
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateTableOfContents(markdown: string): TocItem[] {
  const slugCounts = new Map<string, number>();
  const toc: TocItem[] = [];

  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) {
      continue;
    }

    const level = match[1].length;
    const text = normalizeHeadingText(match[2]);
    const baseSlug = slugify(text) || "section";
    const currentCount = slugCounts.get(baseSlug) ?? 0;
    const slug = currentCount === 0 ? baseSlug : `${baseSlug}-${currentCount}`;

    slugCounts.set(baseSlug, currentCount + 1);
    toc.push({ level, text, slug });
  }

  return toc;
}
