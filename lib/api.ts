import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300/api";

// API Error Type
export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

// API Response Type
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors & refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle token refresh on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });

          const { token } = response.data.data;
          localStorage.setItem("token", token);

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// API Methods
export const apiClient = {
  // Auth
  auth: {
    register: (data: { name: string; email: string; password: string }) =>
      api.post<ApiResponse>("/auth/register", data),
    login: (data: { email: string; password: string }) =>
      api.post<ApiResponse>("/auth/login", data),
    logout: () => api.post<ApiResponse>("/auth/logout"),
    refresh: (refreshToken: string) =>
      api.post<ApiResponse>("/auth/refresh", { refreshToken }),
  },

  // Business
  business: {
    create: (data: any) => api.post<ApiResponse>("/business", data),
    getAll: () => api.get<ApiResponse>("/business"),
    getById: (id: string) => api.get<ApiResponse>(`/business/${id}`),
    update: (id: string, data: any) =>
      api.put<ApiResponse>(`/business/${id}`, data),
    delete: (id: string) => api.delete<ApiResponse>(`/business/${id}`),
    search: (query: string) =>
      api.get<ApiResponse>("/business/search", { params: { q: query } }),
  },

  // Review
  review: {
    generate: (businessId: string, feedback: string) =>
      api.post<ApiResponse>("/review/generate", { businessId, feedback }),
    getReview: (slug: string) =>
      api.get<ApiResponse>(`/review/${slug}`),
  },

  // QR Code
  qr: {
    generate: (businessId: string) =>
      api.post<ApiResponse>("/qr/generate", { businessId }),
    download: (qrId: string) =>
      api.get<Blob>(`/qr/download/${qrId}`, { responseType: "blob" }),
  },

  // Analytics
  analytics: {
    getBusinessAnalytics: (businessId: string) =>
      api.get<ApiResponse>(`/analytics/business/${businessId}`),
    trackEvent: (data: any) =>
      api.post<ApiResponse>("/analytics/track", data),
  },

  // Google Places
  googlePlaces: {
    search: (query: string) =>
      api.get<ApiResponse>("/google-places/search", { params: { q: query } }),
    getDetails: (placeId: string) =>
      api.get<ApiResponse>(`/google-places/details/${placeId}`),
  },
};

// Error handler
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || "An error occurred",
      status: error.response.status,
      data: error.response.data,
    };
  }

  if (error.request) {
    return {
      message: "No response from server. Please check your connection.",
      status: 0,
    };
  }

  return {
    message: error.message || "An unexpected error occurred",
    status: 0,
  };
};

export default api;

// Public API methods (no auth required)
export const publicApi = {
  // Business
  business: {
    getBySlug: (slug: string) =>
      api.get<ApiResponse>(`/public/business/${slug}`),
  },

  // Analytics
  analytics: {
    trackEvent: (data: any) =>
      api.post<ApiResponse>("/public/track-event", data),
  },
};
