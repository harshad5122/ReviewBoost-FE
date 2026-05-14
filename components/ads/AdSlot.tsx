"use client";

import { useEffect, useRef } from "react";

import { ADSENSE_CLIENT } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSlotProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  layoutKey?: string;
}

export default function AdSlot({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className,
  style,
  layoutKey,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !adRef.current || renderedRef.current) {
      return;
    }

    const element = adRef.current;

    const renderAd = () => {
      if (renderedRef.current) {
        return;
      }

      if (element.getAttribute("data-adsbygoogle-status") === "done") {
        renderedRef.current = true;
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        renderedRef.current = true;
      } catch {
        // AdSense script can be blocked by browser settings; keep placeholder visible.
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            renderAd();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={className} aria-label="Sponsored content">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </div>
  );
}
