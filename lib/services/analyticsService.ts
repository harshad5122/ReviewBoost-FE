import { apiClient, handleApiError } from "@/lib/api";

export interface AnalyticsMetrics {
  totalQRScans: number;
  totalPageViews: number;
  totalReviewsGenerated: number;
  totalConversions: number;
  conversionRate: number;
}

export interface ChartDataPoint {
  date: string;
  scans: number;
  reviews: number;
  conversions: number;
  pageViews: number;
}

export interface AggregatedAnalyticsResponse {
  chartData: ChartDataPoint[];

  summary: {
    totalScans: number;
    totalPageViews: number;
    totalReviews: number;
    totalConversions: number;
  };
}

export interface AnalyticsEvent {
  type:
    | "qr_scan"
    | "page_view"
    | "review_generated"
    | "google_redirect"
    | "copy_review";

  businessId?: string;

  businessSlug?: string;

  metadata?: Record<string, any>;
}

/**
 * Get business analytics
 */
export const getBusinessAnalytics = async (
  businessId: string,
): Promise<AnalyticsMetrics> => {
  try {
    const response = await apiClient.analytics.getBusinessAnalytics(businessId);

    return response.data.data.metrics as AnalyticsMetrics;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Track analytics event
 */
export const trackAnalyticsEvent = async (
  event: AnalyticsEvent,
): Promise<{
  success: boolean;
}> => {
  try {
    const response = await apiClient.analytics.trackEvent({
      eventType: event.type,

      businessId: event.businessId,

      businessSlug: event.businessSlug,

      metadata: event.metadata,

      timestamp: new Date().toISOString(),

      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    });

    return response.data.data as {
      success: boolean;
    };
  } catch (error) {
    console.error("Failed to track analytics:", error);

    return {
      success: false,
    };
  }
};

/**
 * QR Scan
 */
export const trackQRScan = async (businessSlug: string) => {
  return trackAnalyticsEvent({
    type: "qr_scan",
    businessSlug,
  });
};

/**
 * Page View
 */
export const trackPageView = async (businessSlug: string) => {
  return trackAnalyticsEvent({
    type: "page_view",
    businessSlug,
  });
};

/**
 * Review Generated
 */
export const trackReviewGenerated = async (
  businessId: string,
  feedback: string,
) => {
  return trackAnalyticsEvent({
    type: "review_generated",

    businessId,

    metadata: {
      feedbackLength: feedback.length,
    },
  });
};

/**
 * Google Redirect
 */
export const trackGoogleRedirect = async (
  businessId: string,
  googleReviewUrl: string,
) => {
  return trackAnalyticsEvent({
    type: "google_redirect",

    businessId,

    metadata: {
      url: googleReviewUrl,
    },
  });
};

/**
 * Copy Review
 */
export const trackCopyReview = async (businessId: string) => {
  return trackAnalyticsEvent({
    type: "copy_review",

    businessId,
  });
};
