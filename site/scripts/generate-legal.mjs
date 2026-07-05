import fs from 'node:fs';

const src = fs.readFileSync('/Users/doctor/Documents/dev/2026/sight-scout/LEGAL.md', 'utf8');

const sections = [
  {
    letter: 'A',
    slug: 'terms',
    description:
      "The Terms of Use governing the Sight Scout website, including the interactive demonstration. Not medical advice, and not a substitute for professional eye care.",
  },
  {
    letter: 'B',
    slug: 'privacy',
    description:
      "What the Sight Scout website collects (very little), why HIPAA doesn't apply to a consumer app like this, and what does: the FTC Act and the Health Breach Notification Rule.",
  },
  {
    letter: 'C',
    slug: 'childrens-privacy',
    description:
      "How the Sight Scout website and app protect children's privacy under the FTC's amended Children's Online Privacy Protection Rule (COPPA).",
  },
  {
    letter: 'D',
    slug: 'medical-disclosure',
    description:
      "Sight Scout is not a medical device and has not been reviewed or cleared by the FDA. The full disclosure on what it is, what it isn't, and when to seek professional care.",
  },
  {
    letter: 'E',
    slug: 'accessibility',
    description:
      "Sight Scout's commitment to WCAG 2.2 Level AA accessibility across the website and its interactive demonstration.",
  },
];

for (const { letter, slug, description } of sections) {
  const headingRe = new RegExp(`^## §${letter} — (.+)$`, 'm');
  const headingMatch = src.match(headingRe);
  if (!headingMatch) throw new Error(`Section §${letter} heading not found`);
  const title = headingMatch[1].trim();
  const startIdx = headingMatch.index + headingMatch[0].length;

  // Find the next "## §" heading (or the closing "*End of LEGAL.md.*" marker) to bound this section.
  const rest = src.slice(startIdx);
  const nextHeadingMatch = rest.match(/^## §[A-E] — /m);
  const endMarkerMatch = rest.match(/^\*End of LEGAL\.md\.\*$/m);
  let endIdx = rest.length;
  if (nextHeadingMatch) endIdx = Math.min(endIdx, nextHeadingMatch.index);
  if (endMarkerMatch) endIdx = Math.min(endIdx, endMarkerMatch.index);
  let sectionBody = rest.slice(0, endIdx);

  // Strip a trailing "---" horizontal rule (and surrounding blank lines) left at the end.
  sectionBody = sectionBody.replace(/\n---\s*$/, '\n');

  const italicLineRe = /^\*Route: `[^`]+` · Page title: [^·]+· Last updated: (.+)\*$/m;
  const italicMatch = sectionBody.match(italicLineRe);
  if (!italicMatch) throw new Error(`Section §${letter} italic route line not found`);
  const updated = italicMatch[1].trim();

  // Body is everything after that italic line.
  const bodyStart = italicMatch.index + italicMatch[0].length;
  const body = sectionBody.slice(bodyStart).replace(/^\n+/, '').trimEnd() + '\n';

  const frontmatter = [
    '---',
    "layout: '../../layouts/Legal.astro'",
    `title: '${title.replace(/'/g, "''")}'`,
    `description: '${description.replace(/'/g, "''")}'`,
    `updated: '${updated}'`,
    '---',
    '',
    '',
  ].join('\n');

  const outPath = `/Users/doctor/Documents/dev/2026/sight-scout/site/src/pages/legal/${slug}.md`;
  fs.writeFileSync(outPath, frontmatter + body, 'utf8');
  console.log(`Wrote ${outPath} (${body.length} chars body)`);
}
