"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPublicBusiness, trackPublicEvent } from "@/lib/services/publicService";
import { apiClient, handleApiError } from "@/lib/api";
import { Star, Copy, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Head from "next/head";

interface Business {
  _id: string;
  businessName: string;
  slug: string;
  category: string;
  city: string;
  description?: string;
  googleReviewUrl?: string;
  address?: string;
  rating?: number;
  totalRatings?: number;
}

export default function ReviewPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchBusiness();
    trackPageView();
  }, [slug]);

  const fetchBusiness = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPublicBusiness(slug);
      setBusiness(data);
    } catch (err: any) {
      setError(err.message || "Failed to load business");
    } finally {
      setIsLoading(false);
    }
  };

  const trackPageView = async () => {
    await trackPublicEvent("page_view", slug);
  };

  const handleGenerateReview = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please provide feedback");
      return;
    }

    try {
      setIsGenerating(true);
      const response = await apiClient.review.generate(business?._id || "", feedback);
      const review = response.data.data as { review: string };
      setGeneratedReview(review.review);
      await trackPublicEvent("review_generated", slug, { rating, feedbackLength: feedback.length });
      toast.success("Review generated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate review");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyReview = async () => {
    if (!generatedReview) return;
    try {
      await navigator.clipboard.writeText(generatedReview);
      await trackPublicEvent("copy_review", slug);
      toast.success("Review copied to clipboard!");
    } catch {
      toast.error("Failed to copy review");
    }
  };

  const handleRedirectToGoogle = () => {
    if (business?.googleReviewUrl) {
      window.open(business.googleReviewUrl, "_blank");
      trackPublicEvent("google_redirect", slug);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading business information...</p>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 border border-red-500/50 rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Business Not Found</h1>
          <p className="text-gray-400">{error || "The business you're looking for doesn't exist"}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{business.businessName} - ReviewBoost</title>
        <meta name="description" content={`Leave a review for ${business.businessName}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Business Header */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-white/10 rounded-lg p-8 mb-6 text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <span className="text-4xl">🏢</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {business.businessName}
            </h1>
            <p className="text-gray-400 mb-1">{business.category}</p>
            <p className="text-gray-500 text-sm">{business.city}</p>

            {business.rating && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(business.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {business.rating} ({business.totalRatings || 0} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {business.description && (
            <div className="bg-slate-800/20 backdrop-blur-md border border-white/10 rounded-lg p-6 mb-6">
              <p className="text-gray-300">{business.description}</p>
            </div>
          )}

          {/* Review Form */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-white/10 rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white">Leave a Review</h2>

            {/* Rating Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                How would you rate your experience?
              </label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600 hover:text-yellow-400"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Feedback (Required)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {feedback.length} characters
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateReview}
              disabled={isGenerating || !rating || !feedback.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition font-semibold"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating AI Review...
                </>
              ) : (
                <>
                  ✨ Generate AI Review
                </>
              )}
            </button>

            {/* Generated Review */}
            {generatedReview && (
              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Your Generated Review</h3>
                <div className="bg-slate-700/30 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-gray-200 whitespace-pre-wrap">{generatedReview}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCopyReview}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition font-medium"
                  >
                    <Copy size={18} />
                    Copy Review
                  </button>
                  {business.googleReviewUrl && (
                    <button
                      onClick={handleRedirectToGoogle}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 rounded-lg transition font-medium"
                    >
                      <ExternalLink size={18} />
                      Post on Google
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Business Info */}
          {(business.address || business.phoneNumber) && (
            <div className="mt-6 bg-slate-800/20 backdrop-blur-md border border-white/10 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">Business Information</h3>
              {business.address && (
                <p className="text-gray-400 text-sm">
                  <span className="text-gray-500">Address:</span> {business.address}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
