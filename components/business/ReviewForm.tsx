"use client";

import { useState } from "react";

import { Copy, ExternalLink, Sparkles } from "lucide-react";

import toast from "react-hot-toast";

import StarRating from "@/components/review/StarRating";

import ReviewSuccess from "@/components/review/ReviewSuccess";

export default function ReviewForm({ business }: any) {
  const [rating, setRating] = useState(5);

  const [feedback, setFeedback] = useState("");

  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);

  const generateReview = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            text: feedback,
            rating,
          }),
        },
      );

      const data = await res.json();

      setReview(data.review);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyReview = () => {
    navigator.clipboard.writeText(review);

    toast.success("Review copied");
  };

  return (
    <div className="bg-white rounded-[32px] shadow-xl border p-8 md:p-12">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full">
          <Sparkles className="w-5 h-5" />
          AI Review Generator
        </div>

        <h2 className="text-4xl font-bold mt-8">Rate Your Experience</h2>

        <p className="text-gray-600 mt-4 text-lg">
          Share a quick feedback and let AI generate a polished Google review
          for you.
        </p>
      </div>

      <div className="mt-12">
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div className="mt-12">
        <textarea
          placeholder="Tell us about your experience..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full h-40 border rounded-3xl p-6 bg-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button
        onClick={generateReview}
        disabled={loading}
        className="w-full bg-black text-white rounded-3xl py-5 text-lg mt-8 hover:opacity-90 transition"
      >
        {loading ? "Generating AI Review..." : "Generate AI Review"}
      </button>

      {review && (
        <div className="mt-12">
          <ReviewSuccess />

          <div className="bg-gray-50 border rounded-3xl p-8 mt-8">
            <p className="text-lg leading-relaxed">{review}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <button
              onClick={copyReview}
              className="border rounded-2xl py-4 flex items-center justify-center gap-3 text-lg"
            >
              <Copy className="w-5 h-5" />
              Copy Review
            </button>

            <a
              href={business.googleReviewUrl}
              target="_blank"
              className="bg-black text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Open Google Review
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
