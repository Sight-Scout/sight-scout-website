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
  { label: 'Eye Exams', href: 'eye-exams/' },
  { label: 'Glossary', href: 'glossary/' },
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

/**
 * Launch-updates signup. With no backend on this static site, signup works by
 * opening a pre-written email to the contact address; the sender's address is the
 * signup. If the project later adopts a newsletter service (e.g. Buttondown), swap
 * the home-page signup section to POST there and update the Privacy Policy to name
 * the processor.
 */
export const SIGNUP_MAILTO =
  `mailto:${CONTACT_EMAIL}` +
  `?subject=${encodeURIComponent('Sight Scout launch updates')}` +
  `&body=${encodeURIComponent(
    'Please send me one email when Sight Scout launches.\n\n(Sent from the signup on the Sight Scout website.)'
  )}`;
