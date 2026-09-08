declare global {
  interface Window {
    TSA_WP?: {
      restUrl: string;
      nonce: string;
      themeUri: string;
      basename: string;
    };
  }
}

/** Resolve a public media file for Vite dev and the WordPress theme build. */
export function media(path: string): string {
  const file = path.replace(/^\//, '');
  if (typeof window !== 'undefined' && window.TSA_WP?.themeUri) {
    return `${window.TSA_WP.themeUri.replace(/\/$/, '')}/${file}`;
  }
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${file}`;
}
