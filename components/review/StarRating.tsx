"use client";

import { Star } from "lucide-react";

export default function StarRating({ rating, setRating }: any) {
  return (
    <div className="flex items-center justify-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className="transition hover:scale-110"
        >
          <Star
            className={`w-12 h-12 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
