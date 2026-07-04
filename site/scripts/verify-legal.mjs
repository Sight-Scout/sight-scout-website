#!/usr/bin/env node
// SPEC.md §11 — "LEGAL.md §A-E diffed against rendered legal pages → text-identical."
// Re-derives each section body from the repo-root LEGAL.md using the same extraction logic
// as scripts/extract-legal (see scratch history) and compares it byte-for-byte against the
// markdown body actually shipped in src/pages/legal/*.md.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..', '..');
const LEGAL_MD_PATH = path.join(REPO_ROOT, 'LEGAL.md');
const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages', 'legal');

const SECTIONS = [
  { letter: 'A', slug: 'terms' },
  { letter: 'B', slug: 'privacy' },
  { letter: 'C', slug: 'childrens-privacy' },
  { letter: 'D', slug: 'medical-disclosure' },
  { letter: 'E', slug: 'accessibility' },
];

const src = readFileSync(LEGAL_MD_PATH, 'utf8');
let failed = false;

for (const { letter, slug } of SECTIONS) {
  const headingRe = new RegExp(`^## §${letter} — (.+)$`, 'm');
  const headingMatch = src.match(headingRe);
  if (!headingMatch) throw new Error(`Section §${letter} heading not found in LEGAL.md`);
  const startIdx = headingMatch.index + headingMatch[0].length;

  const rest = src.slice(startIdx);
  const nextHeadingMatch = rest.match(/^## §[A-E] — /m);
  const endMarkerMatch = rest.match(/^\*End of LEGAL\.md\.\*$/m);
  let endIdx = rest.length;
  if (nextHeadingMatch) endIdx = Math.min(endIdx, nextHeadingMatch.index);
  if (endMarkerMatch) endIdx = Math.min(endIdx, endMarkerMatch.index);
  let sectionBody = rest.slice(0, endIdx).replace(/\n---\s*$/, '\n');

  const italicLineRe = /^\*Route: `[^`]+` · Page title: [^·]+· Last updated: (.+)\*$/m;
  const italicMatch = sectionBody.match(italicLineRe);
  if (!italicMatch) throw new Error(`Section §${letter} italic route line not found`);

  const expectedBody =
    sectionBody
      .slice(italicMatch.index + italicMatch[0].length)
      .replace(/^\n+/, '')
      .trimEnd() + '\n';

  const pagePath = path.join(PAGES_DIR, `${slug}.md`);
  const rendered = readFileSync(pagePath, 'utf8');
  const frontmatterEnd = rendered.indexOf('---\n', rendered.indexOf('---\n') + 4) + 4;
  const actualBody = rendered.slice(frontmatterEnd).replace(/^\n+/, '');

  if (actualBody === expectedBody) {
    console.log(`✓ ${slug}.md matches LEGAL.md §${letter} (${expectedBody.length} chars)`);
  } else {
    failed = true;
    console.error(`✗ ${slug}.md does NOT match LEGAL.md §${letter}`);
    const minLen = Math.min(actualBody.length, expectedBody.length);
    for (let i = 0; i < minLen; i++) {
      if (actualBody[i] !== expectedBody[i]) {
        console.error(`  first diff at char ${i}:`);
        console.error(`    LEGAL.md: ...${JSON.stringify(expectedBody.slice(Math.max(0, i - 30), i + 30))}`);
        console.error(`    rendered: ...${JSON.stringify(actualBody.slice(Math.max(0, i - 30), i + 30))}`);
        break;
      }
    }
  }
}

if (failed) {
  console.error('\nLegal pages must be copied verbatim from LEGAL.md (SPEC.md §0 rule 2).');
  process.exit(1);
} else {
  console.log('\nAll 5 legal pages are byte-for-byte identical to LEGAL.md.');
}
