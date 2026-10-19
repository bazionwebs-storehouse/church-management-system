type ViteEnv = Record<string, string | undefined>;

const env = (typeof import.meta !== 'undefined' ? import.meta.env : {}) as ViteEnv;

export const branding = {
  appName: env.VITE_APP_NAME || 'Church Management System',
  churchName: env.VITE_CHURCH_NAME || 'Your Church',
  shortName: env.VITE_CHURCH_SHORT_NAME || '',
  logoPath: env.VITE_LOGO_PATH || '/church-logo.png',
  websiteUrl: env.VITE_CHURCH_WEBSITE || '',
  orgEmailDomain: env.VITE_ORG_EMAIL_DOMAIN || 'example.org',
  smsSenderId: env.VITE_SMS_SENDER_ID || 'CHMS',
  memberIdPrefix: env.VITE_MEMBER_ID_PREFIX || '',
} as const;

export function brandShortCode(): string {
  if (branding.shortName) return branding.shortName;
  return branding.churchName
    .split(/\s+/)
    .map((w) => w[0] || '')
    .join('')
    .slice(0, 4)
    .toUpperCase() || 'CMS';
}

export function portalUrlFallback(): string {
  if (typeof window === 'undefined') return '/portal/login';
  return `${window.location.origin}/portal/login`;
}

if (typeof document !== 'undefined') {
  document.title = branding.appName;
}
