import { useState, useEffect } from 'react';

export interface WpSettings {
  heroTitle: string;
  heroSubtitle: string;
  announcement: string;
  address: string;
  phone: string;
  email: string;
  livestreamUrl: string;
  upiId: string;
  bankName: string;
  bankAccount: string;
  bankIfsc: string;
}

export interface WpPage {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
}

const DEFAULT_SETTINGS: WpSettings = {
  heroTitle: "Welcome to The Salvation Army Tamil Church, Sion",
  heroSubtitle: "A vibrant community rooted in Christ's love, worshiping together and serving Mumbai.",
  announcement: "Sunday Divine Worship Service every Sunday at 9:00 AM.",
  address: "95-A, Sion West, Sion, Mumbai, Maharashtra 400022",
  phone: "+91 98765 43210",
  email: "contact@tsasion.org",
  livestreamUrl: "https://youtube.com/@salvationarmytamilchurchsion",
  upiId: "tsasion@upi",
  bankName: "State Bank of India",
  bankAccount: "1234567890",
  bankIfsc: "SBIN0001234",
};

export function useWpSettings(): WpSettings {
  const [settings, setSettings] = useState<WpSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const restUrl = window.TSA_WP?.restUrl || '/wp-json/tsa/v1/';
    const settingsEndpoint = `${restUrl.replace(/\/$/, '')}/settings`;

    fetch(settingsEndpoint)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {
        // Silently fall back to default settings
      });
  }, []);

  return settings;
}

export function useWpPage(slug: string): { page: WpPage | null; loading: boolean } {
  const [page, setPage] = useState<WpPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const restUrl = window.TSA_WP?.restUrl || '/wp-json/tsa/v1/';
    const pageEndpoint = `${restUrl.replace(/\/$/, '')}/page/${slug}`;

    let isMounted = true;

    fetch(pageEndpoint)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && data.title) {
          setPage(data);
        }
      })
      .catch(() => {
        // Fall back gracefully
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { page, loading };
}
