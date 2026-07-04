# SIGHT SCOUT — Website Specification

**Version:** 1.0 · **Date:** 2026-07-04 · **Status:** Ready for implementation
**Companion file:** [`LEGAL.md`](LEGAL.md) (verbatim legal copy — required)

---

## Table of contents

- [§0 — Instructions to the implementing model (READ FIRST)](#0--instructions-to-the-implementing-model-read-first)
- [§1 — Project overview](#1--project-overview)
- [§2 — Regulatory positioning (the load-bearing section)](#2--regulatory-positioning-the-load-bearing-section)
- [§3 — Information architecture & sitemap](#3--information-architecture--sitemap)
- [§4 — Page-by-page specification with copy](#4--page-by-page-specification-with-copy)
- [§5 — The Science page: math content](#5--the-science-page-math-content)
- [§6 — Interactive demo activity](#6--interactive-demo-activity)
- [§7 — Design system](#7--design-system)
- [§8 — Technical requirements](#8--technical-requirements)
- [§9 — SEO & metadata](#9--seo--metadata)
- [§10 — Accessibility requirements](#10--accessibility-requirements)
- [§11 — QA & acceptance checklist](#11--qa--acceptance-checklist)
- [§12 — Placeholder index (human input required)](#12--placeholder-index-human-input-required)

---

## §0 — Instructions to the implementing model (READ FIRST)

You are building a static marketing/informational website from this spec. These rules are
**non-negotiable** and override any instinct to "improve" the copy:

1. **Never add medical claims.** Do not write, anywhere, that Sight Scout *screens for*,
   *detects*, *diagnoses*, *identifies*, *finds*, *catches*, or *tests for* amblyopia or any
   disease/condition. Use only the approved claim language in §2.4. If you're unsure whether a
   sentence is a claim, don't write it.
2. **Legal copy is verbatim.** All text on the Terms of Use, Privacy Policy, Children's Privacy,
   Medical & Regulatory Disclosure, and Accessibility pages comes from `LEGAL.md`, copied exactly.
   Never paraphrase, shorten, "modernize," or reformat the substance. Markdown → HTML conversion
   of headings/lists is fine; changing words is not.
3. **The demo never measures.** The interactive demo (§6) must not output any score, acuity
   value, pass/fail, percentile, or statement about the user's or a child's vision. Its end
   screen is fixed copy (§6.6).
4. **Disclaimers appear exactly where §2.5 says** — no more, no less. Do not sprinkle extra
   disclaimers into every paragraph (that reads as either panic or boilerplate), and do not drop
   the required ones.
5. **Placeholders stay visible.** Tokens like `[OPERATOR LEGAL NAME]` must render as-is in the
   built site so a human can find and replace them. Never invent a value for a placeholder.
   The full list is in §12.
6. **Accessibility is a feature, not a checklist.** This is a website about children's vision;
   it must meet WCAG 2.2 AA (§10). Failing contrast on a vision-health site is an unacceptable
   irony.
7. **No third-party trackers.** No Google Analytics, no ad pixels, no social embeds that set
   cookies, no external fonts fetched at runtime (self-host fonts). §8.5 lists what's allowed.
8. **Cite, don't assert.** Statistics on educational pages carry the source given in this spec.
   Do not add statistics from your own knowledge.
9. **Stack:** follow §8.1. If a listed choice is impossible in your environment, choose the
   nearest static-output equivalent and note the substitution in your handoff summary.
10. **When this spec and your judgment conflict, the spec wins.** If the spec is genuinely
    ambiguous, choose the more conservative (fewer-claims, more-disclosure) option and note it.

---

## §1 — Project overview

### 1.1 What Sight Scout is

Sight Scout is a mobile/tablet app that turns evidence-based visual acuity activity design —
calibrated optotypes, per-eye testing, adaptive staircases — into a playful "scouting adventure"
a parent can run with their child at home in a few minutes. It gives parents structured,
easy-to-understand observations about how their child engaged with the activity, and clear
guidance on when a comprehensive professional eye exam is a good idea.

Sight Scout is **not** a medical device, is **not** FDA reviewed/cleared/approved, and does
**not** diagnose anything. The entire purpose of this website is to communicate what the app
does honestly and warmly — giving the project a credible public face — without ever confusing a
visitor into thinking it replaces professional eye care.

### 1.2 Why it exists (background for tone, not copy to paste)

Amblyopia ("lazy eye") affects roughly 2–3% of children and is the most common cause of
preventable vision loss in kids. It's treatable — most effectively when caught young — but it's
easy to miss because an affected child usually doesn't complain: the brain quietly favors the
stronger eye. Many children don't receive vision screening between well-child visits, and
access to pediatric eye care is uneven. Sight Scout exists to help parents stay engaged with
their child's vision between professional checkups and to lower the barrier to seeking a real
exam.

### 1.3 Audience

- **Primary:** Parents/guardians of children roughly ages 3–8. Reading level: aim for
  US grade 7–8 on marketing pages. Warm, plain, non-alarmist.
- **Secondary:** Pediatricians, school nurses, early-childhood educators who might recommend
  the app; potential partners/advisors; regulators or journalists checking whether the project
  is honest. The Science page can be technical; everything else stays plain.

### 1.4 Website goals (in priority order)

1. Explain clearly what Sight Scout does and does not do.
2. Educate about amblyopia and the value of professional eye exams.
3. Demonstrate scientific seriousness (the math, the design decisions, the timeline).
4. Let visitors try a **non-diagnostic** demo of the activity style.
5. Collect nothing more than an optional email for launch updates.

### 1.5 Explicit non-goals

- No app functionality on the website (no accounts, no data storage about children, no results).
- No sales/checkout (app distribution is via app stores; link out with `[APP_STORE_URL]` /
  `[PLAY_STORE_URL]` placeholders).
- No blog at launch (IA leaves room for one later).

---

## §2 — Regulatory positioning (the load-bearing section)

> This section explains *why* the copy rules exist, so the implementing model doesn't
> "helpfully" break them. It is background; it does not appear on the website except where
> §4 explicitly places it.

### 2.1 FDA — why the wording matters

Under the FD&C Act, a product **intended to diagnose or screen for a disease** is a medical
device — and intent is established largely by *claims*: website copy, app-store text, social
posts. Instrument-based pediatric vision screeners (e.g., photoscreeners) that make screening
claims have gone through FDA 510(k) premarket review as Class II devices.

FDA's **General Wellness: Policy for Low-Risk Devices** guidance (updated January 2026)
preserves an enforcement-discretion safe harbor for low-risk products that make only general
wellness claims — promoting healthy habits and awareness — and that do **not** claim to
diagnose, treat, mitigate, prevent, or screen for a specific disease, and do not substitute
for a cleared device or guide clinical management.

**Consequences for this website:**

- The word "screening" and phrases like "detects amblyopia" **must not appear as claims about
  the product**. The site describes Sight Scout as a vision *awareness and activity* tool that
  helps parents decide when to seek professional care.
- The site may freely *educate* about amblyopia and about professional screening — education
  is not a product claim. E.g., "The USPSTF recommends vision screening for all children at
  least once between ages 3 and 5" is fine on the education page; "Sight Scout screens your
  child" is prohibited everywhere.
- The site states plainly, in the designated places (§2.5), that Sight Scout has not been
  reviewed, cleared, or approved by the FDA and is not a medical device.

> **Note to the project owner (not website copy):** if you later want to market Sight Scout
> *as* an amblyopia screener, that is a legitimate path — via 510(k) premarket notification
> (there are predicate pediatric vision screeners) or as an investigational device in an
> IRB-approved study. Until then, the general-wellness posture above is the only safe way to
> market. Have regulatory counsel review the built site before launch. This spec is careful,
> but it is not legal advice.

### 2.2 HIPAA — what's true and what we say

HIPAA applies to covered entities (providers, plans, clearinghouses) and their business
associates. A direct-to-consumer app used by parents, with no health-plan or provider
relationship, is generally **not** covered by HIPAA. Therefore:

- The website must **never** say "HIPAA compliant" (untrue as a legal category and a classic
  false-comfort claim).
- The Privacy Policy (in `LEGAL.md`) says honestly: we are not a HIPAA covered entity; instead,
  consumer-health data in the app is protected under the **FTC Act** and the **FTC Health
  Breach Notification Rule** (which since 2024 explicitly covers health apps not under HIPAA),
  plus applicable state privacy laws.

### 2.3 COPPA — children's data

The FTC's amended COPPA Rule (effective June 23, 2025; full compliance required since
April 22, 2026) governs online services directed to children under 13. Notable for Sight Scout:
"personal information" now explicitly includes **biometric identifiers**, and disclosing
children's data to third parties (e.g., for advertising) requires **separate** verifiable
parental consent.

- **The website** is directed to adults. It collects no information from children. The demo
  stores nothing and sends nothing (§6.7). The optional email signup states it's for adults.
- **The app's** privacy posture is summarized on the website truthfully: parent-managed,
  data minimization, no third-party advertising, no sale of data. The app's own in-product
  policy governs the app; the website's Children's Privacy page (`LEGAL.md` §C) summarizes
  and links to it via `[APP_PRIVACY_POLICY_URL]`.

### 2.4 Claims matrix — the only approved product language

**Approved phrases (use these and close variants):**

- "helps you check in on your child's vision at home"
- "a fun, structured vision activity you do together"
- "built on the same visual-acuity math used in professional eye charts"
- "helps you notice things worth mentioning to an eye doctor"
- "helps you decide when a comprehensive eye exam is a good idea"
- "supports vision awareness between professional checkups"
- "encourages regular professional eye exams"
- "tracks how your child engages with the activity over time"

**Prohibited phrases (never, in any form, including headings, alt text, and metadata):**

- "screens / screening for [anything]" *(as a product claim)*
- "detects / diagnoses / identifies / catches / finds amblyopia (or lazy eye, or any condition)"
- "tests your child's vision" *(use "vision activity" / "check in on")*
- "measures visual acuity" *(as a product claim on marketing pages; the Science page may
  describe the underlying math of acuity measurement as a discipline)*
- "FDA cleared / approved / registered / compliant"
- "HIPAA compliant"
- "clinically proven / validated / doctor recommended / medical-grade"
- any sensitivity/specificity/accuracy percentage for the product
- "replaces / as good as an eye exam", "know if your child has…"
- "early detection" *(as a product benefit; fine in education copy about professional care)*

**Litmus test:** if a sentence could end with "…so you don't need an eye doctor," it's wrong.
Every product statement should point *toward* professional care, not away from it.

### 2.5 Disclosure placement — clear, not carpet-bombed

The user-facing FDA/medical disclosure appears in exactly these places:

1. **Global footer (every page), one sentence:**
   > Sight Scout is a wellness and education tool for families. It is not a medical device,
   > has not been reviewed or cleared by the U.S. Food and Drug Administration, does not
   > provide medical advice or diagnosis, and is not a substitute for a comprehensive eye
   > examination by an eye care professional.
2. **Medical & Regulatory Disclosure page** (`LEGAL.md` §D) — the full treatment, linked from
   the footer as "Medical & Regulatory Disclosure."
3. **How It Works page** — one contextual callout (§4.3).
4. **Demo** — intro screen and end screen (§6).
5. **FAQ** — the two regulatory questions (§4.8).

Nowhere else. The hero does not carry a disclaimer; the footer is already on that page. This
achieves the brief: *clear but not excessive*.

---

## §3 — Information architecture & sitemap

```
/                       Home
/how-it-works           How It Works
/science                The Science & Math
/about-amblyopia        Understanding Amblyopia (education)
/demo                   Try a Demo Activity (non-diagnostic)
/journey                Our Journey (timeline, Mar 2024 →)
/faq                    FAQ
/about                  About the Project
/legal/terms            Terms of Use            (LEGAL.md §A, verbatim)
/legal/privacy          Privacy Policy          (LEGAL.md §B, verbatim)
/legal/childrens-privacy Children's Privacy     (LEGAL.md §C, verbatim)
/legal/medical-disclosure Medical & Regulatory Disclosure (LEGAL.md §D, verbatim)
/legal/accessibility    Accessibility Statement (LEGAL.md §E, verbatim)
/404                    Friendly 404
```

**Header nav (desktop):** How It Works · The Science · About Amblyopia · Demo · Journey · FAQ
— plus a subdued "Get updates" button (scrolls to footer signup). Logo links home.
**Mobile:** hamburger → full-screen menu, same order, legal links at bottom.
**Footer (global):** the §2.5 sentence; link columns — Explore (all main pages), Legal (all
five legal pages), Contact (`[CONTACT_EMAIL]` placeholder as a mailto); copyright line
`© 2024–2026 [OPERATOR LEGAL NAME]`; "Made with care for little eyes."

---

## §4 — Page-by-page specification with copy

Copy below is final unless marked `[PLACEHOLDER]`. Headings map to `<h1>/<h2>` semantics.
Where copy is given in quotes or blockquotes, use it verbatim (minus the quote marks).

### 4.1 Home (`/`)

**Purpose:** in 30 seconds, a parent understands what this is, feels the warmth, and trusts
the honesty.

**Section order:**

1. **Hero.**
   - H1: `Little eyes, big adventures.`
   - Sub: `Sight Scout turns a proven vision-activity design into a playful scouting game you
     and your child do together — so you can stay in tune with their vision and know when it's
     time for a professional eye exam.`
   - Primary CTA: `See how it works` → `/how-it-works`. Secondary CTA: `Try the demo` → `/demo`.
   - Visual: illustrated child with a spyglass/binoculars scouting a landscape of friendly
     shapes (see §7.5). No eye-anatomy imagery, no medical settings.

2. **"Why vision check-ins matter" — three cards** (education framing, cited):
   - Card 1: `About 2–3 in 100 children develop amblyopia — often with no obvious signs.`
     (source line: American Academy of Ophthalmology)
   - Card 2: `Kids rarely complain. When one eye is weaker, the brain quietly favors the
     stronger one, so children usually don't notice anything is wrong.`
   - Card 3: `Earlier professional care works better. Vision develops through childhood, and
     eye doctors can do the most when concerns are found young.`
   - Card row caption (small text): `Sight Scout doesn't diagnose amblyopia — it helps you
     stay engaged and seek professional care with confidence.`

3. **"What Sight Scout does" — split section**, illustration left, copy right:
   - H2: `A scouting mission, not a doctor's visit.`
   - Bullets (verbatim):
     - `A few minutes of play. Your child goes on a short scouting mission, spotting shapes
       that get trickier as they succeed.`
     - `One eye at a time. A fun "pirate patch" moment lets each eye take its own turn.`
     - `Grounded in real math. Shape sizes come from the same visual-angle geometry used in
       professional eye charts.` (link: `The Science →`)
     - `Clear next steps. You get plain-language observations and guidance on when a
       comprehensive eye exam makes sense — not a diagnosis.`

4. **"What Sight Scout is / isn't" — two-column honesty table.** This table is a signature
   trust element; style it warmly, not like a warning label.

   | Sight Scout is… | Sight Scout is not… |
   |---|---|
   | A playful vision activity you run at home | A medical device or medical test |
   | A way to stay engaged with your child's vision | A diagnosis of any condition |
   | A nudge toward professional care when it counts | A substitute for a comprehensive eye exam |
   | Built on transparent, published math | FDA reviewed, cleared, or approved |

5. **Demo teaser.** H2: `Curious what your child would see?` One line: `Try a hands-on demo of
   the activity style — for grown-ups' curiosity, not for checking anyone's vision.` CTA:
   `Try the demo`.

6. **Journey teaser.** `Building carefully since March 2024.` + 3 milestone chips + `See the
   full journey →`.

7. **Email signup (footer-adjacent).** H3: `Get launch updates.` Copy: `One email when Sight
   Scout reaches your app store. No spam, no sharing, unsubscribe anytime. For adults 18+.`
   Single email field + button `Notify me`. (Mechanics: §8.6.)

### 4.2 How It Works (`/how-it-works`)

**Purpose:** walk through the parent + child experience honestly.

1. H1: `How Sight Scout works.` Sub: `A few minutes, a quiet room, and a curious kid.`
2. **Step walkthrough** (numbered, illustrated):
   1. `Set the stage.` — Calibrate the screen with a bank-card-sized object and set up at the
      activity distance. `Why? Sizes on screen only mean something if the app knows exactly
      how big a centimeter is on your device — and how far away your scout is sitting.`
   2. `Patch up, Scout.` — One eye rests under a child-friendly patch (or a held occluder)
      while the other takes its turn. `Why? Each eye can tell a different story; together
      they can mask each other.`
   3. `Play the mission.` — Friendly shapes appear; your child points, taps, or says what
      they see. The activity adapts: right answers bring trickier shapes, tricky moments
      bring easier ones.
   4. `Swap and repeat.` — The other eye gets its own mission.
   5. `Read the trail notes.` — You get plain-language observations (how your child engaged,
      how the two eyes' activities compared) and guidance on whether a professional,
      comprehensive eye exam is a sensible next step.
3. **Contextual disclosure callout** (required by §2.5; styled as a friendly note card):
   > **The honest fine print, up front:** Sight Scout is a wellness activity, not a medical
   > test. It has not been reviewed or cleared by the FDA, and it can't tell you whether your
   > child has amblyopia or any other condition — only a comprehensive exam by an eye care
   > professional can. What it *can* do is help you notice things worth acting on, sooner.
4. **"Designed for wiggly humans" section** — 3 short cards on child-centered design:
   attention-span-sized sessions; rewards for effort, not "right answers"; nothing scary,
   nothing pass/fail shown to the child.
5. CTA band: `See the math behind the mission → /science` and `Try the demo → /demo`.

### 4.3 The Science & Math (`/science`)

Full content in §5. This page is allowed to be technical and to discuss visual-acuity
measurement *as a discipline* (charts, logMAR, staircases). It must still never claim Sight
Scout diagnoses or screens; frame as "the math our activity design is built on."

### 4.4 Understanding Amblyopia (`/about-amblyopia`)

**Purpose:** genuinely useful education page; the most-cited page on the site.

1. H1: `Understanding amblyopia.` Sub: `The most common cause of preventable vision loss in
   children — and one of the most treatable, when found early.`
2. **What it is.** Plain-language explanation: amblyopia ("lazy eye") is reduced vision in one
   or both eyes because eye and brain aren't working together during visual development; the
   brain learns to favor one eye. The eye usually *looks* normal — that's why it hides.
3. **How common.** `About 2–3 in 100 children.` (cite AAO / NIH National Eye Institute.)
4. **The main causes** (three cards): strabismus (eye misalignment); refractive differences
   (one eye much more far/near-sighted than the other — anisometropia); deprivation (something
   blocking vision, e.g., congenital cataract — rare but urgent).
5. **Why early matters.** The visual system is most adaptable in early childhood; treatment
   (prescribed by professionals — e.g., glasses, patching, atropine drops) tends to work best
   when started young, though older children can still benefit. No promises, no percentages.
6. **What professionals recommend.** `The U.S. Preventive Services Task Force recommends
   vision screening for all children at least once between ages 3 and 5 to detect amblyopia
   or its risk factors.` Plus: AAP/AAPOS/AAO support regular vision assessment through
   childhood. **This is education about professional care — do not connect these sentences to
   Sight Scout's capabilities.**
7. **Signs worth a prompt professional visit** (bulleted; sourced from AAO patient guidance):
   an eye that drifts or turns; squinting or closing one eye habitually; head tilting;
   sitting unusually close to screens; complaints of blurry/double vision; a white or unusual
   glow in the pupil in photos (`see a doctor promptly`); any parental gut feeling that
   something's off. Callout: `When in doubt, book the exam. A comprehensive eye exam is
   painless and definitive; parental instinct is a legitimate reason to go.`
8. **References block:** American Academy of Ophthalmology (aao.org); National Eye Institute
   (nei.nih.gov); U.S. Preventive Services Task Force (uspreventiveservicestaskforce.org);
   AAPOS (aapos.org). Link to organization homepages or stable condition pages only.

### 4.5 Try a Demo Activity (`/demo`)

Full spec in §6.

### 4.6 Our Journey (`/journey`)

**Purpose:** credibility through transparency; show the project has been built carefully over
time.

- H1: `Building Sight Scout.` Sub: `Started March 2024. Built slowly, on purpose.`
- Vertical timeline component (§7.4). **Every milestone below is a placeholder the project
  owner must confirm or edit — render them, but keep the `[CONFIRM]` marker visible until
  replaced:**

| Date | Milestone (copy) |
|---|---|
| March 2024 | `The spark. [CONFIRM] Research begins into the gap between how treatable amblyopia is and how inconsistently kids' vision gets checked.` |
| May 2024 | `First prototype. [CONFIRM] A bare-bones acuity activity engine in the browser: visual-angle math, screen calibration, adaptive sizing.` |
| August 2024 | `Kid-tested design. [CONFIRM] The engine becomes a scouting game — symbol shapes, missions, rewards for effort.` |
| November 2024 | `Smarter adaptivity. [CONFIRM] Adaptive staircase tuned for short attention spans: fewer trials, friendlier pacing.` |
| February 2025 | `Family feedback round. [CONFIRM] Informal at-home trials with volunteer families; major usability rework.` |
| June 2025 | `Privacy, rebuilt. [CONFIRM] Data architecture redesigned around the FTC's amended COPPA rule: minimize, keep local, never sell.` |
| October 2025 | `Two eyes, two stories. [CONFIRM] Per-eye protocol refined; the "pirate patch" moment becomes kids' favorite part.` |
| March 2026 | `Two years in. [CONFIRM] Refinement, advisor conversations, and groundwork for launch.` |
| July 2026 | `This website. The public face goes live; app release next. [CONFIRM]` |

- Closing note: `We'd rather ship carefully than quickly — it's kids' vision.`

### 4.7 About (`/about`)

- H1: `About the project.`
- Founder/team blurb: `[FOUNDER_BIO — 2–4 sentences, first person welcome]`
- Mission paragraph: `Sight Scout exists because amblyopia is common, treatable, and easy to
  miss. We believe parents deserve friendly, honest tools that make it easier to stay engaged
  with their child's vision — and that the job of such a tool is to lead families toward
  eye care professionals, never to stand in for them.`
- Contact: `[CONTACT_EMAIL]` mailto + note `We read everything.`
- Optional advisors block: `[ADVISORS — omit section entirely if empty]`.

### 4.8 FAQ (`/faq`)

Accordion; one `<h2>` per group. Answers verbatim:

**About the app**
1. **What ages is Sight Scout for?** `It's designed around children roughly 3–8 years old —
   old enough to play a matching game, young enough that vision is still actively developing.
   Grown-ups are welcome to play too.`
2. **How long does a session take?** `A few minutes per eye. It's built for real attention
   spans; you can pause and resume anytime.`
3. **Does my child need to know letters?** `No. The activity uses simple shapes and matching,
   so pre-readers can play.`
4. **What do I get at the end?** `Plain-language observations about how the session went and
   how the two eyes' activities compared, plus guidance on whether a comprehensive professional
   eye exam is a sensible next step. You never get a diagnosis, a prescription, or a
   pass/fail verdict — those belong to professionals.`

**The important questions**
5. **Is Sight Scout FDA approved?** `No. Sight Scout has not been reviewed, cleared, or
   approved by the U.S. Food and Drug Administration. It is a wellness and education tool,
   not a medical device, and it doesn't diagnose or rule out any condition. If you have any
   concern about your child's vision, please see an eye care professional — with or without
   the app's nudge.`
6. **Can Sight Scout tell me if my child has amblyopia?** `No — and be wary of any consumer
   app that says it can. Amblyopia is diagnosed through a comprehensive exam by an eye care
   professional. Sight Scout's job is to help you stay engaged and get to that exam when it
   matters.`
7. **Should we still go to eye exams if the app "seems fine"?** `Yes, absolutely. Reassuring
   sessions are not a clean bill of health. Follow your pediatrician's and eye doctor's
   schedule for professional care regardless of anything in the app.`

**Privacy**
8. **What data do you collect about my child?** `As little as possible. The app is designed
   around data minimization: parent-managed profiles, no advertising, no selling of data, and
   no third-party ad trackers. The details live in our Children's Privacy page and the app's
   privacy policy.`
9. **Is Sight Scout HIPAA compliant?** `HIPAA doesn't actually apply to consumer apps like
   Sight Scout — it covers healthcare providers, insurers, and their partners. Saying
   "HIPAA compliant" would be marketing theater. What does apply: the FTC Act, the FTC's
   Health Breach Notification Rule for health apps, and children's-privacy law (COPPA). We
   built for those. See our Privacy Policy for the specifics.`
10. **This demo on the website — is it storing anything?** `No. The demo runs entirely in
    your browser and sends nothing to us. When you close the tab, it's gone.`

**Practical**
11. **When can I download it?** `[LAUNCH_STATUS — e.g., "We're in final testing; leave your
    email for one launch announcement."]`
12. **Does it work on any device?** `The app targets recent phones and tablets
    [SUPPORTED_PLATFORMS]. Screen calibration in the app adapts to your specific device.`

### 4.9 Legal pages

Render `LEGAL.md` §A–§E verbatim, one route each (§3). Shared layout: narrow measure
(~70ch), sticky in-page table of contents on desktop, "Last updated: 2026-07-04" from the
file, footer as everywhere.

### 4.10 404

Illustrated lost scout + `This trail doesn't exist.` + button `Back to base camp` → `/`.
Footer disclosure still present.

---

## §5 — The Science page: math content

**Route:** `/science`. **H1:** `The science and math behind Sight Scout.`
**Intro (verbatim):** `Sight Scout's activity design borrows from a century of visual-acuity
science — the same geometry, scales, and statistics behind professional eye charts. This page
shows the actual math. It's here because we think transparency is a feature: you shouldn't
have to trust a tool for your child that won't show its work. (As always: this describes our
activity design — it doesn't make Sight Scout a diagnostic test, and it isn't one.)`

Render math with KaTeX (build-time render preferred, §8.4). Every subsection below is a page
section with the given heading. Include the worked examples as styled "Worked example" cards.

### 5.1 Visual angle — why size only matters with distance

Vision science measures detail not in millimeters but in **visual angle** — how large
something appears from where you stand. A shape's visual angle θ depends on its physical
height *h* and viewing distance *d*:

```latex
\theta = 2\arctan\!\left(\frac{h}{2d}\right) \approx \frac{h}{d}\ \text{(radians, for small angles)}
```

The standard reference: a person with "20/20" vision can just resolve detail spanning
**1 arcminute** (1/60 of a degree). Standard optotypes (the shapes on eye charts) are built
on a 5×5 grid: the whole shape spans **5 arcminutes** at threshold, and its critical detail —
a stroke or a gap — spans **1 arcminute**.

> **Worked example.** How big is a "20/20-sized" optotype on a screen 60 cm away?
> θ = 5 arcmin = 5/60 degree = 0.001454 rad. h ≈ d·θ = 600 mm × 0.001454 ≈ **0.87 mm** —
> about the thickness of a credit card. Its critical gap is a fifth of that: ~0.17 mm,
> smaller than a single pixel on many screens. This is exactly why calibration and honest
> engineering limits matter (see 5.5).

### 5.2 Snellen and logMAR — the scales

"20/40" means: this person resolves at 20 feet what a reference eye resolves at 40. The ratio
gives the **minimum angle of resolution** (MAR) in arcminutes, and research settings use its
log — **logMAR**:

```latex
\text{MAR} = \frac{\text{denominator}}{\text{numerator}}\ \text{arcmin}, \qquad
\text{logMAR} = \log_{10}(\text{MAR})
```

| Snellen | MAR (arcmin) | logMAR |
|---|---|---|
| 20/20 | 1.0 | 0.0 |
| 20/25 | 1.25 | 0.1 |
| 20/32 | 1.6 | 0.2 |
| 20/40 | 2.0 | 0.3 |
| 20/50 | 2.5 | 0.4 |
| 20/63 | 3.15 | 0.5 |
| 20/80 | 4.0 | 0.6 |
| 20/100 | 5.0 | 0.7 |
| 20/200 | 10.0 | 1.0 |

logMAR is the scale modern charts (ETDRS) use because it makes lines evenly spaced: each line
is 0.1 logMAR, and with five optotypes per line, each optotype is worth 0.02 — so progress
can be scored per-shape, not per-line. Sight Scout's activity engine works in logMAR
internally for the same reason.

### 5.3 Putting shapes on a screen — calibration

A screen only knows pixels; the math needs millimeters. Two calibrations bridge the gap:

**Physical scale.** The user matches an on-screen rectangle to a standard bank card
(ISO/IEC 7810 ID-1: **85.60 mm × 53.98 mm**). If the matched rectangle is *p* pixels wide:

```latex
s = \frac{85.60\ \text{mm}}{p}\ \text{mm/px}
\qquad\Rightarrow\qquad
h_{px} = \frac{d \cdot 2\tan(\theta/2)}{s}
```

**Distance.** The activity assumes a set distance; the app guides setup and
`[APP_DISTANCE_METHOD — e.g., "uses the front camera's face geometry to sanity-check
distance during play"; confirm before publishing]`.

> **Worked example.** Tablet with s = 0.096 mm/px (a common ~264 ppi panel), child at
> 1.5 m, target size 20/40 (MAR 2 arcmin → shape 10 arcmin = 0.002909 rad):
> h = 1500 × 0.002909 ≈ **4.36 mm** → 4.36 / 0.096 ≈ **45 px**. Comfortably renderable —
> at sensible distances the geometry works out.

### 5.4 Why distance honesty matters — the error budget

If the child sits closer than the math assumes, every shape is effectively bigger than
intended, and the session flatters. The distortion is beautifully simple in logMAR:

```latex
\Delta\text{logMAR} = \log_{10}\!\left(\frac{d_{\text{assumed}}}{d_{\text{actual}}}\right)
```

> **Worked example.** Assumed 150 cm, actual 120 cm:
> Δ = log₁₀(150/120) ≈ **0.097 ≈ one full chart line** of flattery. This single equation is
> why the app is strict about setup and distance checks — and why casual "hold the phone
> wherever" vision apps should make you skeptical.

### 5.5 Engineering limits — what a screen can and can't render

The critical detail of an optotype is 1/5 of its height. For the detail to be trustworthy we
require it to span at least ~2 device pixels; below that, anti-aliasing is deciding what your
child sees, not you. So each device/distance combination has a **smallest honest size**:

```latex
h_{\min} = 5 \times 2 \times s
\qquad
\theta_{\min} \approx \frac{h_{\min}}{d}
```

> **Worked example.** Phone with s = 0.06 mm/px at 1.5 m: h_min = 0.6 mm → θ_min ≈ 0.0004 rad
> ≈ 1.4 arcmin ≈ logMAR 0.13 — sizes near 20/25 and finer aren't honestly renderable, and the
> activity refuses to pretend otherwise. Sight Scout computes this limit per device and stays
> above it.

### 5.6 Shapes for pre-readers

Letter charts assume literacy. For young children, established optotype families use a small
set of symbols or a single rotatable shape, answered by **matching** (point at the same shape
on a card or screen) rather than naming — a 4-alternative choice with a known 25% guess rate,
which the statistics account for. Crucially, mature pediatric optotypes are designed to blur
equally — no shape is "easier" — and Sight Scout's shape set follows the same design
principles `[OPTOTYPE_SET — confirm final shape set name/description]`.

Amblyopia research adds one more wrinkle: **crowding**. An amblyopic visual system struggles
disproportionately when shapes are flanked by neighbors. Professional pediatric charts
therefore surround optotypes with crowding bars; Sight Scout's activity presents its shapes
with playful flanking elements for the same reason.

### 5.7 The adaptive staircase — finding the "just tricky enough" zone

Instead of marching through a fixed chart, the activity adapts. A classic **transformed
up-down staircase** makes the shape smaller after two consecutive correct answers and larger
after one miss ("2-down-1-up"), which converges near the size a player gets right **70.7%**
of the time:

```latex
\text{2-down-1-up} \Rightarrow p_{\text{target}} = \sqrt{0.5} \approx 0.707
```

Under the hood, performance at any size is modeled by a psychometric function — the
probability of a correct answer rises smoothly from guess-rate to (almost) certain as shapes
get larger. A standard form is the Weibull:

```latex
\psi(x) = \gamma + (1 - \gamma - \lambda)\left(1 - e^{-(x/\alpha)^{\beta}}\right)
```

where γ is the guess rate (0.25 for a 4-choice task), λ a small lapse rate (kids get
distracted; the model forgives), α the threshold and β the slope. The staircase's reversal
points estimate α with far fewer trials than a full chart — which matters enormously when
your participant is four years old.

For the child, all of this math disappears into a game that feels *just tricky enough* —
never boringly easy, never dishearteningly hard.

### 5.8 Two eyes, one comparison

Amblyopia is usually a story about **asymmetry**, which is why each eye plays separately
(the other rests under the patch). Clinical referral criteria — used by professionals, cited
here for education — illustrate why: commonly used pediatric guidelines treat both an
age-referenced acuity level (e.g., roughly 20/50 at age 3, 20/40 at age 4, 20/32 at 5+) and
an **interocular difference of two or more lines** as reasons for a comprehensive exam, per
AAPOS/AAO guidance. Sight Scout's per-eye design exists so that the app's plain-language
observations can reflect the same *kind* of asymmetry professionals care about — as a reason
to visit a professional, never as a diagnosis.

### 5.9 References

American Academy of Ophthalmology — Vision Screening for Infants and Children (2022);
AAPOS uniform guidelines for instrument-based pediatric vision screen validation (2021,
JAAPOS); US Preventive Services Task Force — Vision in Children Ages 6 Months to 5 Years:
Screening; Levitt H. (1971), Transformed up-down methods in psychoacoustics, JASA;
Pediatric Eye Disease Investigator Group (PEDIG) amblyopia treatment studies;
ISO/IEC 7810 (ID-1 card dimensions). *(Render as a plain list, org names linked to org
homepages only.)*

---

## §6 — Interactive demo activity

**Route:** `/demo`. **The single most sensitive component on the site.** Its job: let a
curious adult *feel* the activity style. Its non-job: measure anything.

### 6.1 Hard rules

- **No output that characterizes vision.** No score, no acuity value, no pass/fail, no
  "you got 7/10," no adaptive narrowing toward a threshold, no per-eye anything.
- **No data leaves the browser.** No network calls, no localStorage/cookies; state lives in
  JS memory only.
- **Fixed, comfortable sizes.** The demo does **not** run a staircase and does not push
  toward small sizes (that would make it a de facto test). It presents a short fixed
  sequence at generous sizes (§6.4).
- Framed for adults: the intro addresses the parent, not the child.

### 6.2 Intro screen (gate; verbatim copy)

> **Try the activity style — a demo for grown-ups.**
> This is a hands-on demonstration of how Sight Scout's activity *feels*: the shape-matching,
> the pacing, the encouragement. It is **not** a vision test. It uses fixed, comfortable
> shape sizes, adapts to nothing, measures nothing, and stores nothing. Please don't use it
> to check anyone's eyesight — that job belongs to a comprehensive exam by an eye care
> professional.
> `[Button: Got it — show me]`

### 6.3 Optional calibration vignette

One screen demonstrating the calibration idea *as education*: a draggable on-screen
rectangle labeled `Match me to a bank card` with live readout `1 cm on your screen =
N pixels`. Copy: `In the real app, this is step one — it's how shapes get exactly the right
physical size on any device.` Skippable via `Skip — just play`. The value is used only to
size the demo shapes sensibly; it is never described as accurate and never stored.

### 6.4 The activity (5 rounds)

- A Landolt-C-style ring (an SVG circle with a gap: stroke width = size/5, gap = size/5)
  appears center-screen with playful flankers (crowding bars styled as leaves/twigs, ~1 shape
  away). Rounds use fixed sizes equivalent to roughly logMAR 1.0, 0.9, 0.8, 0.8, 0.7 **at
  60 cm** given the calibration (or safe pixel fallbacks of 88, 70, 56, 56, 44 px if
  calibration was skipped) — generous sizes, deliberately far from anyone's threshold.
- Four large arrow buttons (up/down/left/right); also keyboard arrows. Question text:
  `Which way does the ring open?`
- Feedback: correct → a star sparkle + `Nice scouting!`; incorrect → gentle
  `The gap was that way → onward!` (no streaks, no tally shown).
- A small persistent banner throughout: `Demo — not a vision test.`

### 6.5 The "aha" panel (after round 3)

Interstitial card: `In the real app, the sizes would now be adapting to the player — two
right answers make the next ring a bit smaller, a miss makes it bigger. That "staircase" is
how a handful of playful rounds can home in on the just-tricky-enough zone.` Link:
`The math → /science#the-adaptive-staircase`.

### 6.6 End screen (verbatim copy)

> **That's the feel of it! 🎉**
> You've seen the shape-matching, the pacing, and the encouragement. In Sight Scout itself,
> each eye takes its own turn (pirate patch and all), sizes adapt using the staircase math,
> and parents get plain-language observations afterward.
> **A reminder from the honest-scout code:** this demo measured nothing, and Sight Scout
> itself doesn't diagnose anything. For real answers about a child's vision, see an eye care
> professional.
> `[Button: How the full activity works]` → /how-it-works · `[Button: Play the demo again]`

### 6.7 Implementation notes

Self-contained TypeScript island (~300 lines), SVG rendering, no dependencies. Ring
orientation random per round (never repeating 3× consecutively). Buttons min 64×64 px
touch targets. Fully keyboard-operable; each round announces via `aria-live="polite"`
(`Ring three of five`); feedback also announced. Respect `prefers-reduced-motion` (sparkle →
simple fade). No timers that pressure the user; rounds advance only on answer.

---

## §7 — Design system

### 7.1 Brand personality

Warm scout/naturalist adventure — field guides, badges, spyglasses — executed with modern
softness. Honest, calm, a little playful. **Never:** clinical white-coat imagery, fear appeals
(no crossed-out eyes, no crying children), sterile medical blue-on-white.

### 7.2 Color tokens

| Token | Hex | Use |
|---|---|---|
| `--ss-ink` | `#1D3140` | Body text, headings (deep blue-slate) |
| `--ss-teal` | `#0F766E` | Primary brand, links, primary buttons |
| `--ss-teal-dark` | `#115E59` | Hover/active |
| `--ss-coral` | `#E8604C` | Accent, secondary CTAs (AA on cream only at large sizes; pair with ink text) |
| `--ss-sun` | `#F2B84B` | Stars/rewards, timeline dots, sparing highlights |
| `--ss-cream` | `#FBF7F0` | Page background |
| `--ss-card` | `#FFFFFF` | Card surfaces |
| `--ss-sky` | `#DCEDE9` | Section tint bands, callout backgrounds |
| `--ss-line` | `#D8D2C7` | Hairlines/borders |

All text/background pairs must pass WCAG AA (≥4.5:1 body, ≥3:1 large text) — verify
programmatically in the build; adjust lightness, not hue, if a pair fails.

### 7.3 Typography

- Display/headings: **Fraunces** (self-hosted, weights 600/700) — warm, bookish, field-guide.
- Body/UI: **Nunito Sans** (self-hosted, 400/600/700). Base 18px/1.6; fluid type scale
  (`clamp()`), h1 ≈ 44–64px. Max measure 70ch.

### 7.4 Components

Buttons (primary teal / secondary outline / quiet text-link; 12px radius; visible focus ring
`3px --ss-sun offset 2px`); Cards (white, 16px radius, 1px `--ss-line`, soft shadow);
Callout note-card (used for the §4.2 disclosure; `--ss-sky` background, teal left rule,
compass icon — friendly, not warning-triangle); Honesty table (§4.1.4, two tinted columns);
Vertical timeline (sun-colored dots, connecting rule, date chips); Accordion (FAQ,
`<details>`-based); Math "worked example" card (cream on sky, `KaTeX` block, small
"Worked example" eyebrow label); Footer (ink background, cream text, disclosure sentence
set at ≥14px, never below).

### 7.5 Illustration

Flat vector, rounded geometry, 2px ink outlines, palette from §7.2 (+ soft greens
`#7FB79A`). Recurring motifs: child scout with spyglass, forest/hill landscapes with
hideable friendly shapes, badges, pirate patch as a fun accessory. Implement as inline SVG
(hand-built simple compositions are fine); every illustration has meaningful `alt` or
`aria-hidden="true"` if decorative. **No stock photos, no photorealistic eyes, no anatomy.**

### 7.6 Motion

Subtle only: fade/slide-up on scroll-in (≤300ms), star sparkle in demo. Everything behind
`prefers-reduced-motion` checks.

---

## §8 — Technical requirements

### 8.1 Stack

- **Astro** (latest stable) + **Tailwind CSS**, static output (`output: 'static'`).
  The demo (§6) and accordion are islands/vanilla TS. If Astro is unavailable, Next.js
  static export is the approved fallback.
- TypeScript throughout. No UI framework needed beyond Astro components.
- Repo layout: `site/` at repo root (keep `SPEC.md`/`LEGAL.md` at root), standard Astro
  structure, `src/content/legal/*.md` generated **verbatim** from `LEGAL.md` sections.

### 8.2 Hosting & deployment

Target **GitHub Pages** via Actions workflow (`.github/workflows/deploy.yml`, build on push
to `main`). Custom domain `[DOMAIN — e.g., sightscout.app]` as CNAME placeholder file with
the token, plus README note. Site must also work at a repo-subpath (`base` configurable).

### 8.3 Performance budget

Lighthouse ≥95 all categories on mobile emulation. Total JS shipped to a marketing page
< 30 KB gz (demo page may add its island). Fonts: 2 families × subsetted woff2,
`font-display: swap`. Images: inline SVG or AVIF/WebP with dimensions set.

### 8.4 Math rendering

KaTeX rendered **at build time** (e.g., remark/rehype-katex or server-side `katex.render`)
— no client-side KaTeX JS. Include KaTeX CSS subset. Every formula also gets an
`aria-label` with a plain-English reading (e.g., "log MAR error equals log base ten of
assumed distance over actual distance").

### 8.5 Privacy engineering (website)

- **Zero third-party requests at runtime.** No analytics at launch. If the owner later wants
  metrics, the approved option is a cookieless, self-hosted or EU-hosted privacy-first
  counter `[ANALYTICS_DECISION]` — do not add one now.
- No cookies at all. No localStorage except none — the demo keeps state in memory (§6.1).
- This makes the Privacy Policy's promises true; if any implementation detail would
  contradict `LEGAL.md`, the implementation must change, not the policy.

### 8.6 Email signup mechanics

Static site → no backend. Implement as a form POSTing to `[EMAIL_SIGNUP_ENDPOINT]`
(placeholder). Until the placeholder is filled, render the form with the button disabled
and a small note `Signups open at launch.` Do **not** wire a third-party form service by
default (would violate §8.5); note Buttondown/Formspark as owner options in code comments.

### 8.7 Repo hygiene

`.gitignore` (node_modules, dist, .astro, .DS_Store, .claude). MIT license file **not**
included by default (site copy is not open-license) — add `LICENSE-CONTENT.md` note:
`Website copy and illustrations © [OPERATOR LEGAL NAME]. Code may be reused; content may not.`
CI: build + linkcheck + the §11 automated checks.

---

## §9 — SEO & metadata

- Title pattern: `{Page} · Sight Scout` ; home: `Sight Scout — playful vision check-ins for
  families`.
- Meta description (home): `Sight Scout is a playful, math-grounded vision activity app that
  helps parents stay engaged with their child's vision and know when it's time for a
  professional eye exam. Not a medical device — and honest about it.`
- **Claims rules apply to all metadata, OG tags, alt text, and JSON-LD.** JSON-LD: use
  `WebSite` + `Organization` only. **Do not** use `MedicalWebPage`/`MedicalDevice` schema
  (wrong signal); `FAQPage` schema on /faq is fine, sourced verbatim from §4.8.
- OG image: illustrated card (scout + spyglass + wordmark), 1200×630, generated as static
  asset. `robots.txt` allow all; `sitemap.xml` generated.

---

## §10 — Accessibility requirements

WCAG 2.2 AA minimum, and specifically:

- Semantic landmarks (`header/nav/main/footer`), one `h1` per page, logical heading order.
- Full keyboard operability incl. demo (§6.7); skip-to-content link; visible focus (§7.4).
- Contrast verified for every token pair used (§7.2), including text over tint bands.
- Font sizes in rem; layout survives 200% zoom and 320px width; no horizontal scroll.
- `prefers-reduced-motion` respected everywhere (§7.6).
- All formulas have plain-English `aria-label`s (§8.4); tables have proper `<th>` scope.
- Accordion uses native `<details>/<summary>` or correct ARIA disclosure pattern.
- Alt text policy: informative images described; decorative `aria-hidden`. **Alt text must
  also obey §2.4 claims rules.**
- Target: Lighthouse a11y 100 + manual keyboard/screen-reader pass (§11).

---

## §11 — QA & acceptance checklist

Automatable checks (add to CI where practical):

- [ ] **Claims lint:** repo-wide grep of built HTML for prohibited strings (case-insensitive):
      `diagnos`, `detect`, `screening`*, `screens for`, `FDA cleared`, `FDA approved`,
      `HIPAA compliant`, `clinically proven`, `doctor recommended`, `medical-grade`,
      `early detection`. *Allowed exceptions, exact strings only: the FAQ/education sentences
      in §4.4.6, §4.8.5–7 and `LEGAL.md` (which discuss professional screening/diagnosis or
      deny capability). Implement as an allowlist of exact sentences; anything else fails CI.
- [ ] Footer disclosure sentence present and identical on every page incl. 404.
- [ ] `LEGAL.md` §A–E diffed against rendered legal pages → text-identical.
- [ ] Demo: zero network requests after page load (assert in a Playwright test); no
      cookies/storage written; end screen contains the §6.6 copy verbatim.
- [ ] All `[PLACEHOLDER]` tokens render visibly; CI job lists them (§12) and fails only if
      one was silently *replaced with invented content* (heuristic: list must match §12).
- [ ] Lighthouse ≥95×4 on mobile; a11y 100.
- [ ] Keyboard-only walkthrough of every page and full demo run.
- [ ] All external links: education orgs only (§4.4.8, §5.9), `rel="noopener"`,
      no link shorteners.
- [ ] Build works at subpath and custom domain configs.
- [ ] No console errors; valid HTML (w3c check on key pages).

Human checks before launch (owner):

- [ ] Replace/confirm every §12 placeholder, especially timeline `[CONFIRM]`s.
- [ ] Regulatory counsel review of built site (see §2.1 note).
- [ ] Read every page aloud once — anything that sounds like a medical promise, cut.

---

## §12 — Placeholder index (human input required)

| Token | Where | What's needed |
|---|---|---|
| `[OPERATOR LEGAL NAME]` | footer, LEGAL.md throughout | Legal entity or individual operating the site |
| `[CONTACT_EMAIL]` | footer, /about, LEGAL.md | Public contact address (consider a domain address, not a personal inbox) |
| `[DOMAIN]` | §8.2 | Final domain |
| `[GOVERNING_STATE]` | LEGAL.md §A | Governing-law state |
| `[APP_STORE_URL]` / `[PLAY_STORE_URL]` | CTAs when live | Store links |
| `[APP_PRIVACY_POLICY_URL]` | LEGAL.md §C | The app's own privacy policy |
| `[APP_DISTANCE_METHOD]` | §5.3 | Confirm how the app verifies distance |
| `[OPTOTYPE_SET]` | §5.6 | Confirm final shape-set description |
| `[FOUNDER_BIO]`, `[ADVISORS]` | /about | Bio & advisor list (or omit) |
| `[LAUNCH_STATUS]`, `[SUPPORTED_PLATFORMS]` | /faq | Current truth at build time |
| `[EMAIL_SIGNUP_ENDPOINT]`, `[ANALYTICS_DECISION]` | §8.5–8.6 | Owner decisions |
| Timeline `[CONFIRM]` × 9 | /journey | Real milestones & dates (Mar 2024 start confirmed by owner; the rest are drafted placeholders) |

---

*End of SPEC.md. Legal copy follows in `LEGAL.md` — verbatim use only.*
