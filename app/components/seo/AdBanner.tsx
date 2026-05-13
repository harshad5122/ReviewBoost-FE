"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
      }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
