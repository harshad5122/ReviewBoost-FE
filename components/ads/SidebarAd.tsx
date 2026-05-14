import AdSlot from "@/components/ads/AdSlot";

interface SidebarAdProps {
  adSlot: string;
  className?: string;
}

export default function SidebarAd({ adSlot, className }: SidebarAdProps) {
  return (
    <AdSlot
      adSlot={adSlot}
      adFormat="vertical"
      fullWidthResponsive={false}
      className={className}
      style={{ minHeight: 300, maxWidth: 320, marginInline: "auto" }}
    />
  );
}
