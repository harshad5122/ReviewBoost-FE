import { publicApi, handleApiError } from "@/lib/api";

export interface PublicBusiness {
  _id: string;
  businessName: string;
  slug: string;
  category: string;
  city: string;
  description?: string;
  googleReviewUrl?: string;
  placeId?: string;
  address?: string;
  phoneNumber?: string;
  website?: string;
  qrCodeUrl?: string;
  rating?: number;
  totalRatings?: number;
}

/**
 * Get public business data by slug (no auth required)
 */
export const getPublicBusiness = async (slug: string): Promise<PublicBusiness> => {
  try {
    const response = await publicApi.business.getBySlug(slug);
    return response.data.data as PublicBusiness;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Track analytics event publicly
 */
export const trackPublicEvent = async (
  eventType: string,
  businessSlug: string,
  metadata?: Record<string, any>
) => {
  try {
    const response = await publicApi.analytics.trackEvent({
      eventType,
      businessSlug,
      metadata,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    });
    return response.data.data as { success: boolean };
  } catch (error) {
    console.error("Failed to track event:", error);
    return { success: false };
  }
};
