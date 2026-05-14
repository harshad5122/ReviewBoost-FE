import { apiClient, handleApiError } from "@/lib/api";

export interface GooglePlace {
  placeId: string;
  name: string;
  address: string;
  phoneNumber?: string;
  website?: string;
  rating?: number;
  totalRatings?: number;
  types?: string[];
  formattedAddress?: string;
  latitude?: number;
  longitude?: number;
}

export interface GooglePlaceDetails extends GooglePlace {
  description?: string;
  openingHours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  photos?: string[];
}

/**
 * Search for businesses on Google Places
 */
export const searchGooglePlaces = async (
  query: string,
  location?: { latitude: number; longitude: number },
  radius?: number
): Promise<GooglePlace[]> => {
  try {
    const params = new URLSearchParams({
      q: query,
      ...(location && {
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        radius: (radius || 50000).toString(),
      }),
    });

    const response = await apiClient.googlePlaces.search(query);
    return response.data.data as GooglePlace[];
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get detailed information about a place
 */
export const getPlaceDetails = async (
  placeId: string
): Promise<GooglePlaceDetails> => {
  try {
    const response = await apiClient.googlePlaces.getDetails(placeId);
    return response.data.data as GooglePlaceDetails;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Extract category from place types
 */
export const extractCategory = (types?: string[]): string => {
  if (!types || types.length === 0) return "Business";

  // Map Google place types to readable categories
  const categoryMap: Record<string, string> = {
    restaurant: "Restaurant",
    cafe: "Café",
    bar: "Bar",
    hotel: "Hotel",
    hospital: "Hospital",
    pharmacy: "Pharmacy",
    doctor: "Doctor",
    dentist: "Dentist",
    clinic: "Clinic",
    gym: "Gym",
    spa: "Spa",
    salon: "Salon",
    barber: "Barber",
    beauty_salon: "Beauty Salon",
    car_repair: "Car Repair",
    gas_station: "Gas Station",
    parking: "Parking",
    bank: "Bank",
    atm: "ATM",
    school: "School",
    university: "University",
    library: "Library",
    museum: "Museum",
    shopping_mall: "Shopping Mall",
    store: "Store",
    supermarket: "Supermarket",
    bakery: "Bakery",
  };

  for (const type of types) {
    if (categoryMap[type]) {
      return categoryMap[type];
    }
  }

  return types[0] || "Business";
};

/**
 * Generate Google Review URL from place ID
 */
export const generateGoogleReviewUrl = (placeId: string): string => {
  return `https://search.google.com/local/writereview?placeid=${placeId}`;
};
