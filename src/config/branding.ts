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

export interface Brand {
  appName: string;
  churchName: string;
  shortCode: string;
  logoPath: string;
  websiteUrl: string;
}

const APP_SETTINGS_KEY = 'hkm_app_settings';

function shortCodeFor(churchName: string, shortName: string): string {
  if (shortName) return shortName;
  const initials = churchName
    .split(/\s+/)
    .map((w) => w[0] || '')
    .join('')
    .slice(0, 4)
    .toUpperCase();
  return initials || 'CMS';
}

function readRuntimeChurchInfo(): { name?: string; logoUrl?: string; website?: string } {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed?.churchInfo ?? {};
  } catch {
    return {};
  }
}

export function resolveBrand(): Brand {
  const runtime = readRuntimeChurchInfo();
  const churchName = (runtime.name && runtime.name.trim()) || branding.churchName;
  return {
    appName: branding.appName,
    churchName,
    shortCode: shortCodeFor(churchName, branding.shortName),
    logoPath: (runtime.logoUrl && runtime.logoUrl.trim()) || branding.logoPath,
    websiteUrl: (runtime.website && runtime.website.trim()) || branding.websiteUrl,
  };
}

const listeners = new Set<() => void>();
let snapshot: Brand = resolveBrand();

function recomputeSnapshot(): void {
  const next = resolveBrand();
  if (
    next.appName === snapshot.appName &&
    next.churchName === snapshot.churchName &&
    next.shortCode === snapshot.shortCode &&
    next.logoPath === snapshot.logoPath &&
    next.websiteUrl === snapshot.websiteUrl
  ) {
    return;
  }
  snapshot = next;
  listeners.forEach((l) => l());
}

export function subscribeBrand(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function getBrand(): Brand {
  return snapshot;
}

export function refreshBrand(): void {
  recomputeSnapshot();
}

export function portalUrlFallback(): string {
  if (typeof window === 'undefined') return '/portal/login';
  return `${window.location.origin}/portal/login`;
}

if (typeof window !== 'undefined') {
  window.addEventListener('hkm_app_settings_saved', recomputeSnapshot);
  window.addEventListener('storage', recomputeSnapshot);
}

if (typeof document !== 'undefined') {
  document.title = getBrand().appName;
}
