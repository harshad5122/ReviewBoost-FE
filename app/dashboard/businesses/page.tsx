"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { createBusiness, getBusinesses, deleteBusiness } from "@/lib/services/businessService";
import { generateGoogleReviewUrl } from "@/lib/services/googlePlacesService";
import { Plus, Trash2, Edit2, QrCode, BarChart3, X } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface Business {
  _id: string;
  businessName: string;
  slug: string;
  category?: string;
  city?: string;
  rating?: number;
  totalRatings?: number;
  description?: string;
  googleReviewUrl?: string;
  placeId?: string;
  address?: string;
  phoneNumber?: string;
  website?: string;
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    city: "",
    description: "",
    googleReviewUrl: "",
    placeId: "",
    address: "",
    phoneNumber: "",
    website: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.businessName.trim()) {
      toast.error("Business name is required");
      return;
    }

    if (!formData.category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("City is required");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Auto-generate Google Review URL if placeId is provided
      let googleReviewUrl = formData.googleReviewUrl;
      if (formData.placeId && !googleReviewUrl) {
        googleReviewUrl = generateGoogleReviewUrl(formData.placeId);
      }

      const businessData = {
        businessName: formData.businessName,
        category: formData.category,
        city: formData.city,
        description: formData.description,
        googleReviewUrl,
        placeId: formData.placeId,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        website: formData.website,
      };

      const newBusiness = await createBusiness(businessData);
      setBusinesses([...businesses, newBusiness]);
      
      toast.success("Business created successfully!");
      setShowModal(false);
      setFormData({
        businessName: "",
        category: "",
        city: "",
        description: "",
        googleReviewUrl: "",
        placeId: "",
        address: "",
        phoneNumber: "",
        website: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create business");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBusiness = async (id: string) => {
    if (!confirm("Are you sure you want to delete this business?")) return;

    try {
      await deleteBusiness(id);
      const updated = businesses.filter((b) => b._id !== id);
      setBusinesses(updated);
      toast.success("Business deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete business");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading businesses...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Businesses</h1>
            <p className="text-gray-400 mt-2">Manage and track your business profiles</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            New Business
          </button>
        </div>

        {/* Businesses Grid */}
        {businesses.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">No businesses yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Create your first business →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div
                key={business._id}
                className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition-all group"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                      {business.businessName}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{business.slug}</p>
                  </div>

                  <div className="space-y-2">
                    {business.category && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Category:</span> {business.category}
                      </p>
                    )}
                    {business.city && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Location:</span> {business.city}
                      </p>
                    )}
                    {business.rating && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Rating:</span> ⭐ {business.rating}
                      </p>
                    )}
                  </div>

                  {business.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {business.description}
                    </p>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <Link
                      href={`/dashboard/qr?business=${business._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition text-sm font-medium"
                    >
                      <QrCode size={16} />
                      QR Code
                    </Link>
                    <Link
                      href={`/dashboard/analytics?business=${business._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 rounded-lg transition text-sm font-medium"
                    >
                      <BarChart3 size={16} />
                      Analytics
                    </Link>
                    <button
                      onClick={() => handleDeleteBusiness(business._id)}
                      className="px-3 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Business Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-slate-800 border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-800">
                <h2 className="text-2xl font-bold text-white">Create New Business</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleCreateBusiness} className="p-6 space-y-4">
                {/* Required Fields */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g., Harshad Physio Clinic"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Physiotherapy"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Rajkot"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of your business"
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Google Place ID
                    </label>
                    <input
                      type="text"
                      name="placeId"
                      value={formData.placeId}
                      onChange={handleInputChange}
                      placeholder="Google Places ID"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Business address"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Google Review URL
                  </label>
                  <input
                    type="url"
                    name="googleReviewUrl"
                    value={formData.googleReviewUrl}
                    onChange={handleInputChange}
                    placeholder="https://search.google.com/local/writereview?placeid=..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white hover:bg-slate-600 rounded-lg transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 rounded-lg transition font-medium"
                  >
                    {isSubmitting ? "Creating..." : "Create Business"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
