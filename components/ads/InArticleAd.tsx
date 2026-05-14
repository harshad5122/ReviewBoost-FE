import AdSlot from "@/components/ads/AdSlot";

interface InArticleAdProps {
  adSlot: string;
  className?: string;
}

export default function InArticleAd({ adSlot, className }: InArticleAdProps) {
  return (
    <AdSlot
      adSlot={adSlot}
      adFormat="fluid"
      className={className}
      style={{ minHeight: 280 }}
      layoutKey="-fg+5n+6t-e7+2k"
    />
  );
}
