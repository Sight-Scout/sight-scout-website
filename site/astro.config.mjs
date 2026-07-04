// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Defaults target GitHub Pages project-site hosting (Sight-Scout/sight-scout-website).
// Once a custom domain is live (see public/CNAME), set SITE_URL to it and
// SITE_BASE to '/' — e.g. SITE_URL=https://sightscout.app SITE_BASE=/ npm run build
const site = process.env.SITE_URL ?? 'https://sight-scout.github.io/sight-scout-website';
const base = process.env.SITE_BASE ?? '/sight-scout-website/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
