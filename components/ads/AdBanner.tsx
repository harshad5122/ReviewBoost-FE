import AdSlot from "@/components/ads/AdSlot";

interface AdBannerProps {
  adSlot: string;
  className?: string;
}

export default function AdBanner({ adSlot, className }: AdBannerProps) {
  return (
    <AdSlot
      adSlot={adSlot}
      adFormat="horizontal"
      className={className}
      style={{ minHeight: 90 }}
    />
  );
}
