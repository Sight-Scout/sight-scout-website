#!/usr/bin/env node
// SPEC.md §11 — claims lint. Scans page/component source for prohibited medical-claim
// language (SPEC.md §2.4) and fails unless the exact sentence is on the allowlist below.
// Every allowlisted sentence is either a *denial* of a claim ("does not diagnose"), an
// *education* reference (citation titles, quoted guideline text), or a direct question in
// a FAQ ("Is Sight Scout FDA approved?"). Adding a new sentence to this list is a deliberate,
// reviewable act — that's the point.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'src');

const PROHIBITED_PATTERNS = [
  /\bdiagnos\w*/i,
  /\bdetect\w*/i,
  // Deliberately "screening"/"screens for", not bare "screen(s)" — this is a website full of
  // legitimate on-screen/calibration-screen/UI-screen language that isn't a medical claim.
  /\bscreening\b/i,
  /\bscreens?\s+for\b/i,
  /FDA[\s-]?(cleared|approved|registered|compliant)/i,
  /HIPAA[\s-]?compliant/i,
  /clinically[\s-]?(proven|validated)/i,
  /doctor[\s-]?recommended/i,
  /medical[\s-]?grade/i,
  /early detection/i,
];

// Normalize whitespace only — do not alter wording — before comparing against ALLOWLIST.
const norm = (s) => s.replace(/\s+/g, ' ').trim();

// Each entry below is the exact (whitespace-normalized) string the sentence-splitter above
// produces today for a known-good passage — confirmed by running `npm run lint:claims` and
// reviewing every match. Code punctuation sometimes bleeds into these ("], { title:" etc.);
// that's fine, it's still a stable, reviewable fingerprint of a specific known-safe spot.
const ALLOWLIST = new Set(
  [
    // components/HonestyTable.astro
    `[string, string][] = [ ['A playful vision activity you run at home', 'A medical device or medical test'], ["A way to stay engaged with your child's vision", 'A diagnosis of any condition'], ['A nudge toward professional care when it counts', 'A substitute for a comprehensive eye exam'], ['Built on transparent, published math', 'FDA reviewed, cleared, or approved'], ];`,
    // layouts/Layout.astro (default meta description)
    `It is not a medical device and does not diagnose or screen for any condition.', };`,
    // lib/site.ts (footer disclosure)
    `Food and Drug Administration, does not ' + 'provide medical advice or diagnosis, and is not a substitute for a comprehensive eye ' + 'examination by an eye care professional.';`,
    // pages/about/index.astro
    `It started in March 2024 with a simple frustration: amblyopia is the most common cause of preventable vision loss in children, it responds well to early treatment, and it still gets missed all the time because kids don't complain and screening between checkups is patchy.`,
    // pages/about-amblyopia/index.astro
    `Preventive Services Task Force recommends vision screening for all children at least once between ages 3 and 5 to detect amblyopia or its risk factors.`,
    `'when the USPSTF recommends at least one vision screening' }, ];`,
    // pages/eye-exams/index.astro
    `One important distinction: the quick vision check at school or at a well-child visit is a screening, not an exam.`,
    `[string, string, string][] = [ [ 'School or well-child vision screening', 'A nurse, teacher, or pediatric staff', 'A quick pass/refer flag.`,
    `The only place amblyopia is diagnosed or ruled out.', ], [ 'Sight Scout', 'You and your child, at home', 'A wellness activity with plain-language observations and encouragement to seek professional care.`,
    `Not a screening, not a medical result.', ], ];`,
    `Preventive Services Task Force recommends vision screening for all children at least once between ages 3 and 5, and professional groups support regular vision assessment through childhood.`,
    `You do not need a failed screening, a referral, or an app's permission.`,
    // pages/glossary/index.astro
    `The only way amblyopia is actually diagnosed or ruled out.`,
    `'An FDA-regulated instrument used in clinics and screening programs that photographs the eyes to flag risk factors like refractive differences and misalignment.`,
    // pages/demo/index.astro
    `One reminder: this demo measured nothing, and Sight Scout itself doesn't diagnose anything.`,
    // pages/faq/index.astro
    `You never get a diagnosis, a prescription, or a pass/fail verdict.`,
    `'Is Sight Scout FDA approved?', a:`,
    `It is a wellness and education tool, not a medical device, and it doesn\\'t diagnose or rule out any condition.`,
    `Amblyopia is diagnosed through a comprehensive exam by an eye care professional.`,
    `'Is Sight Scout HIPAA compliant?', a:`,
    `Saying "HIPAA compliant" would be marketing theater.`,
    // pages/index.astro
    `Not a diagnosis.', }, ];`,
    `Never a diagnosis Sight Scout points you toward eye care professionals.`,
    `Why vision check-ins matter {whyCards.map((c) => ( {c.title} {c.source && {c.source} } ))} Sight Scout doesn't diagnose amblyopia.`,
    // pages/journey/index.astro
    `'Started digging into a frustrating gap: amblyopia is common and treatable, but screening between checkups is patchy, so kids slip through.`,
    // pages/legal/medical-disclosure.md
    `- **Not a medical device.** Sight Scout is not intended to diagnose, treat, cure, mitigate, or prevent any disease or condition, including amblyopia. - **Not FDA reviewed.** Sight Scout has not been reviewed, cleared, or approved by the U.S.`,
    `It is offered as a low-risk general wellness product consistent with FDA's published policy for such products. - **Not a vision test or screening.** Sight Scout does not screen for, detect, or rule out amblyopia or any other condition.`,
    `Reassuring activity sessions are not a clean bill of health, and no output of the App is a diagnosis or a medical result. - **Not a substitute for professional care.** Only a comprehensive examination by an optometrist or ophthalmologist can assess a child's eye health.`,
    `Follow the professional screening and examination schedule recommended by your pediatrician and eye care providers regardless of anything in the App.`,
    // pages/legal/privacy.md
    `We are none of those, so claiming to be "HIPAA compliant" would be misleading, and we won't do it. - **What does apply.** As a consumer service, we are subject to the Federal Trade Commission Act's prohibition on unfair and deceptive practices.`,
    // pages/legal/terms.md
    `It is not medical advice, and it is not a substitute for the advice, diagnosis, or treatment of a physician, optometrist, ophthalmologist, or other qualified health professional.`,
    `- **No medical advice.** Nothing on the Site should be used to diagnose, treat, or make medical decisions about any condition.`,
    `Food and Drug Administration, and it is not intended to diagnose, treat, cure, mitigate, or prevent any disease or condition.`,
    `It is not a vision test or screening of any kind: it does not adapt to the user, does not measure anything, produces no results, and stores no data.`,
    // pages/science/index.astro
    `const references = [ 'American Academy of Ophthalmology, Vision Screening for Infants and Children (2022)', 'AAPOS uniform guidelines for instrument-based pediatric vision screen validation (2021, JAAPOS)', 'US Preventive Services Task Force, Vision in Children Ages 6 Months to 5 Years:`,
    `Screening', 'Levitt H. (1971), Transformed up-down methods in psychoacoustics, JASA', 'Pediatric Eye Disease Investigator Group (PEDIG) amblyopia treatment studies', 'ISO/IEC 7810 (ID-1 card dimensions)', ];`,
    `It doesn't make Sight Scout a diagnostic test, and it isn't one.)`,
    `Sight Scout's per-eye design exists so its plain-language observations can reflect the same kind of asymmetry professionals care about, always as a reason to visit a professional and never as a diagnosis.`,
  ].map(norm)
);

function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, files);
    else if (exts.includes(path.extname(full))) files.push(full);
  }
  return files;
}

// Code isn't prose, so before sentence-splitting we drop the lines that are clearly source
// code rather than visible copy (imports, single-line declarations, comments), and strip
// HTML/JSX tags (which removes id="…"/class="…" attributes along with the tag itself). We
// deliberately do NOT strip {} JSX expressions or object literals — that's exactly where a
// lot of this site's real copy (FAQ/card/timeline arrays) lives.
function stripCodeNoise(text) {
  return text
    .split('\n')
    .filter((line) => !/^\s*(import\s|export\s|interface\s|type\s\w+|function\s|---\s*$|\/\/|\/\*|\*\/|<\/?script|<\/?style)/.test(line))
    .join('\n')
    .replace(/<[^>]+>/g, ' ');
}

function splitSentences(text) {
  return stripCodeNoise(text)
    .split(/(?<=[.!?:])\s+(?=[A-Z0-9"'\[])|\n{2,}/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

const files = walk(SRC_DIR, ['.astro', '.md', '.ts']);
const violations = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  for (const sentence of splitSentences(content)) {
    const normSentence = norm(sentence);
    for (const pattern of PROHIBITED_PATTERNS) {
      if (pattern.test(sentence) && !ALLOWLIST.has(normSentence)) {
        violations.push({ file: path.relative(process.cwd(), file), pattern: pattern.source, sentence: normSentence });
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`\n✗ claims-lint failed — ${violations.length} unreviewed claim-language match(es):\n`);
  for (const v of violations) {
    console.error(`  [${v.file}] matched /${v.pattern}/`);
    console.error(`    "${v.sentence}"\n`);
  }
  console.error(
    'If this sentence is legitimate (a denial or an education citation, per SPEC.md §2.4),\n' +
      'add its exact normalized text to ALLOWLIST in scripts/claims-lint.mjs. Otherwise, rewrite\n' +
      'it using only the approved claim language.\n'
  );
  process.exit(1);
} else {
  console.log(`✓ claims-lint passed — scanned ${files.length} files, no unreviewed claim language found.`);
}
