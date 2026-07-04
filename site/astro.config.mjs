// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Defaults target GitHub Pages project-site hosting (doctor-ra/sight-scout).
// Once a custom domain is live (see public/CNAME), set SITE_URL to it and
// SITE_BASE to '/' — e.g. SITE_URL=https://sightscout.app SITE_BASE=/ npm run build
const site = process.env.SITE_URL ?? 'https://doctor-ra.github.io/sight-scout';
const base = process.env.SITE_BASE ?? '/sight-scout/';

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
