import { apiClient, handleApiError } from "@/lib/api";

export interface QRResponse {
  success: boolean;
  qrCode: string; // Base64 or data URL
  googleReviewUrl: string;
}

/**
 * Generate QR code for a business
 */
export const generateQRCode = async (businessId: string): Promise<QRResponse> => {
  try {
    const response = await apiClient.qr.generate(businessId);
    return response.data as QRResponse;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Download QR code as image
 */
export const downloadQRCode = async (qrId: string, filename: string = "qrcode.png") => {
  try {
    const response = await apiClient.qr.download(qrId);
    
    // Create blob URL and trigger download
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Copy QR review URL to clipboard
 */
export const copyReviewUrl = async (googleReviewUrl: string) => {
  try {
    await navigator.clipboard.writeText(googleReviewUrl);
    return true;
  } catch (error) {
    console.error("Failed to copy URL:", error);
    return false;
  }
};

/**
 * Open review URL in new window
 */
export const openReviewPage = (googleReviewUrl: string) => {
  window.open(googleReviewUrl, "_blank");
};
