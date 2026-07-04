# Sight Scout — Website

Marketing / informational website for **Sight Scout**, a family-friendly app that helps parents
check in on their children's vision at home and know when to seek a professional eye exam.

## What's in this repo

| Path | Purpose |
|---|---|
| [`SPEC.md`](SPEC.md) | **Master build specification.** Complete page-by-page spec, copy, design system, demo activity, math content, and hard compliance rules. This is the source of truth for the site. |
| [`LEGAL.md`](LEGAL.md) | Verbatim legal page copy: Terms of Use, Privacy Policy, Children's Privacy, Medical & Regulatory Disclosure, Accessibility Statement. Rendered byte-for-byte in `site/src/pages/legal/*.md`. |
| [`site/`](site/) | The Astro + Tailwind implementation of the spec. |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | Builds `site/` and deploys to GitHub Pages on push to `main`. |

## Working on the site

```sh
cd site
npm install
npm run dev      # http://localhost:4321/sight-scout-website/
npm run build    # static output in site/dist/
npm run preview  # serve the production build locally
```

The dev/build base path defaults to `/sight-scout-website/` (GitHub Pages project-site hosting). Once a
custom domain is live, update `site/public/CNAME` and build with:

```sh
SITE_URL=https://yourdomain.example SITE_BASE=/ npm run build
```

## Before launch — placeholders to fill in

Every `[BRACKETED_TOKEN]` in the built site is a spot that needs a human decision — legal entity
name, contact email, governing state, app store links, and the draft `[CONFIRM]` milestones on
the Journey page. The full index is in `SPEC.md` §12. Search the codebase for `[` to find them
all:

```sh
grep -rn '\[[A-Z_]' site/src
```

Also recommended before launch: a lawyer's pass over the legal pages (`LEGAL.md` was drafted
carefully against FDA/FTC/COPPA guidance, but it isn't legal advice), and a run through
`SPEC.md` §11's QA checklist.

## For anyone extending the site

Read `SPEC.md` §0 ("Instructions to the implementing model") first. The non-negotiable rules
live there. In short: no diagnostic claims anywhere (§2.4 has the approved/prohibited claims
matrix), legal copy stays verbatim from `LEGAL.md`, the demo never outputs a vision measurement
or calls the network, and placeholder tokens stay visible rather than being invented around.
