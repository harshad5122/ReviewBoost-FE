"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getBusinesses } from "@/lib/services/businessService";
import {
  generateQRCode,
  copyReviewUrl,
  downloadQRCode,
} from "@/lib/services/qrService";
import { Download, Copy, Eye, Zap } from "lucide-react";
import toast from "react-hot-toast";

interface Business {
  _id: string;
  businessName: string;
  slug: string;
  qrCodeUrl?: string;
}

interface QRCode {
  businessId: string;
  businessName: string;
  googleReviewUrl: string;
  qrCodeUrl?: string;
  isGenerating?: boolean;
}

export default function QRCodesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [qrCodes, setQrCodes] = useState<Record<string, QRCode>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQRId, setSelectedQRId] = useState<string | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      const data = await getBusinesses();
      setBusinesses(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load businesses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQR = async (businessId: string) => {
    const business = businesses.find((b) => b._id === businessId);
    if (!business) return;

    try {
      setQrCodes((prev) => ({
        ...prev,
        [businessId]: {
          ...prev[businessId],
          businessId,
          businessName: business.businessName,
          googleReviewUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/r/${business.slug}`,
          isGenerating: true,
        },
      }));

      const result = await generateQRCode(businessId);

      setQrCodes((prev) => ({
        ...prev,
        [businessId]: {
          businessId,
          businessName: business.businessName,
          googleReviewUrl: result.googleReviewUrl,
          qrCodeUrl: result.qrCode,
          isGenerating: false,
        },
      }));

      toast.success("QR code generated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate QR code");
      setQrCodes((prev) => ({
        ...prev,
        [businessId]: {
          ...prev[businessId],
          businessId,
          businessName: business.businessName,
          googleReviewUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/r/${business.slug}`,
          isGenerating: false,
        },
      }));
    }
  };

  const handleCopyURL = async (googleReviewUrl: string) => {
    const success = await copyReviewUrl(googleReviewUrl);
    if (success) {
      toast.success("Review URL copied to clipboard!");
    } else {
      toast.error("Failed to copy URL");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading QR codes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">QR Codes</h1>
          <p className="text-gray-400 mt-2">
            Generate and manage QR codes for your businesses
          </p>
        </div>

        {/* QR Codes Grid */}
        {businesses.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-12 text-center">
            <Zap className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No businesses found</p>
            <p className="text-sm text-gray-500">
              Create a business first to generate QR codes
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => {
              const qr = qrCodes[business._id];
              const googleReviewUrl =
                qr?.googleReviewUrl ||
                `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/r/${business.slug}`;

              return (
                <div
                  key={business._id}
                  className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all group"
                >
                  {/* QR Code Display */}
                  <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-center min-h-64">
                    {qr?.qrCodeUrl ? (
                      <div className="relative group/img">
                        <img
                          src={qr.qrCodeUrl}
                          alt={`QR code for ${business.businessName}`}
                          className="w-48 h-48 object-contain"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 rounded-lg transition-all flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                          <Eye size={32} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg flex items-center justify-center mb-4 border border-white/10">
                          <Zap className="w-12 h-12 text-gray-600" />
                        </div>
                        <p className="text-gray-400 text-sm">
                          QR code not generated
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Business Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                        {business.businessName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {business._id}
                      </p>
                    </div>

                    {/* Review URL */}
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Review URL:</p>
                      <p className="text-xs text-gray-300 break-all font-mono">
                        {googleReviewUrl}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {!qr?.qrCodeUrl ? (
                        <button
                          onClick={() => handleGenerateQR(business._id)}
                          disabled={qr?.isGenerating}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 rounded-lg transition font-medium text-sm"
                        >
                          {qr?.isGenerating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Zap size={16} />
                              Generate
                            </>
                          )}
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleCopyURL(googleReviewUrl)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition text-sm font-medium"
                          >
                            <Copy size={16} />
                            Copy URL
                          </button>
                          <button
                            onClick={() => setSelectedQRId(business._id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 rounded-lg transition text-sm font-medium"
                          >
                            <Eye size={16} />
                            Preview
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QR Preview Modal */}
      {selectedQRId && qrCodes[selectedQRId]?.qrCodeUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-800 border border-white/10 rounded-lg max-w-md w-full p-8">
            <div className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={qrCodes[selectedQRId].qrCodeUrl}
                    alt="QR Preview"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white">
                  {qrCodes[selectedQRId].businessName}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Scan this QR code to open the review page
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const qr = qrCodes[selectedQRId];

                    if (!qr?.qrCodeUrl) {
                      toast.error("QR code not found");
                      return;
                    }

                    const link = document.createElement("a");

                    link.href = qr.qrCodeUrl;

                    link.download = `${qr.businessName}-qr.png`;

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    toast.success("QR code downloaded!");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 rounded-lg transition font-medium"
                >
                  <Download size={18} />
                  Download QR Code
                </button>

                <button
                  onClick={() =>
                    handleCopyURL(qrCodes[selectedQRId].googleReviewUrl)
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 text-white hover:bg-slate-600 rounded-lg transition font-medium"
                >
                  <Copy size={18} />
                  Copy Review URL
                </button>

                <button
                  onClick={() => setSelectedQRId(null)}
                  className="w-full px-4 py-3 bg-slate-700/50 text-white hover:bg-slate-700 rounded-lg transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
