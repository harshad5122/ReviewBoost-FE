"use client";

import Script from "next/script";

import { ADSENSE_CLIENT } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle: any[];
    __adsenseAutoAdsInitialized?: boolean;
  }
}

export default function AdsenseScript() {
  if (!ADSENSE_CLIENT) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      async
      onLoad={() => {
        if (window.__adsenseAutoAdsInitialized) {
          return;
        }

        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: ADSENSE_CLIENT,
            enable_page_level_ads: true,
          });
          window.__adsenseAutoAdsInitialized = true;
        } catch {
          // Ignore blocked script errors.
        }
      }}
    />
  );
}
