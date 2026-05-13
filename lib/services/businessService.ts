import { apiClient, handleApiError } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export interface CreateBusinessData {
  businessName: string;
  category: string;
  city: string;
  description?: string;
  googleReviewUrl?: string;
  placeId?: string;
  address?: string;
  phoneNumber?: string;
  website?: string;
}

export interface Business {
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
  createdAt: string;
  updatedAt: string;
}

/**
 * Create a new business
 */
export const createBusiness = async (
  data: CreateBusinessData
): Promise<Business> => {
  try {
    const response = await apiClient.business.create(data);
    const business = response.data.data as Business;

    // Update store
    const store = useAuthStore.getState();
    store.addBusiness({
      id: business._id,
      businessName: business.businessName,
      slug: business.slug,
      category: business.category,
      city: business.city,
      rating: business.rating,
      totalRatings: business.totalRatings,
    });

    return business;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get all businesses for current user
 */
export const getBusinesses = async (): Promise<Business[]> => {
  try {
    const response = await apiClient.business.getAll();
    const businesses = response.data.data as Business[];

    // Update store
    const store = useAuthStore.getState();
    store.setBusinesses(
      businesses.map((b) => ({
        id: b._id,
        businessName: b.businessName,
        slug: b.slug,
        category: b.category,
        city: b.city,
        rating: b.rating,
        totalRatings: b.totalRatings,
      }))
    );

    return businesses;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get single business by ID
 */
export const getBusinessById = async (id: string): Promise<Business> => {
  try {
    const response = await apiClient.business.getById(id);
    return response.data.data as Business;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get business by slug (public - no auth required)
 */
export const getBusinessBySlug = async (slug: string): Promise<Business> => {
  try {
    // Use direct API call since this is public
    const response = await apiClient.business.getAll(); // This would need a public endpoint
    return response.data.data as Business;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update a business
 */
export const updateBusiness = async (
  id: string,
  data: Partial<CreateBusinessData>
): Promise<Business> => {
  try {
    const response = await apiClient.business.update(id, data);
    return response.data.data as Business;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete a business
 */
export const deleteBusiness = async (id: string): Promise<void> => {
  try {
    await apiClient.business.delete(id);

    // Update store
    const store = useAuthStore.getState();
    store.removeBusiness(id);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Search businesses
 */
export const searchBusinesses = async (query: string): Promise<Business[]> => {
  try {
    const response = await apiClient.business.search(query);
    return response.data.data as Business[];
  } catch (error) {
    throw handleApiError(error);
  }
};
