import AdSlot from "@/components/ads/AdSlot";

interface ResponsiveAdProps {
  adSlot: string;
  className?: string;
}

export default function ResponsiveAd({ adSlot, className }: ResponsiveAdProps) {
  return (
    <AdSlot
      adSlot={adSlot}
      adFormat="auto"
      className={className}
      style={{ minHeight: 120 }}
    />
  );
}
