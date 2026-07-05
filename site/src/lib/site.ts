export const BASE = import.meta.env.BASE_URL;

/** Joins a site-relative path onto the configured base path (handles GitHub Pages subpaths). */
export function url(path: string): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `${BASE}${clean}` : BASE;
}

export const SITE_NAME = 'Sight Scout';

export const MAIN_NAV = [
  { label: 'How It Works', href: 'how-it-works/' },
  { label: 'The Science', href: 'science/' },
  { label: 'About Amblyopia', href: 'about-amblyopia/' },
  { label: 'Demo', href: 'demo/' },
  { label: 'Journey', href: 'journey/' },
  { label: 'FAQ', href: 'faq/' },
] as const;

export const LEGAL_NAV = [
  { label: 'Terms of Use', href: 'legal/terms/' },
  { label: 'Privacy Policy', href: 'legal/privacy/' },
  { label: "Children's Privacy", href: 'legal/childrens-privacy/' },
  { label: 'Medical & Regulatory Disclosure', href: 'legal/medical-disclosure/' },
  { label: 'Accessibility Statement', href: 'legal/accessibility/' },
] as const;

export const EXPLORE_NAV = [
  { label: 'Home', href: '' },
  ...MAIN_NAV,
  { label: 'About', href: 'about/' },
] as const;

/** The single global disclosure sentence (SPEC.md §2.5 item 1). Must be identical everywhere. */
export const FOOTER_DISCLOSURE =
  'Sight Scout is a wellness and education tool for families. It is not a medical device, ' +
  'has not been reviewed or cleared by the U.S. Food and Drug Administration, does not ' +
  'provide medical advice or diagnosis, and is not a substitute for a comprehensive eye ' +
  'examination by an eye care professional.';

export const CONTACT_EMAIL = 'investicord@gmail.com';
export const OPERATOR_LEGAL_NAME = 'Sight Scout';
