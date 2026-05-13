import { apiClient, handleApiError, ApiError, ApiResponse } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterData) => {
  try {
    const response = await apiClient.auth.register(data);
    const authData = response.data.data as AuthResponse;

    // Store tokens and user info
    localStorage.setItem("token", authData.token);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify(authData.data));

    // Update store
    const store = useAuthStore.getState();
    store.login(authData.data, authData.token, authData.refreshToken);

    return authData;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Login user
 */
export const loginUser = async (data: LoginData) => {
  try {
    const response = await apiClient.auth.login(data);
    const authData = response.data.data as AuthResponse;

    // Store tokens and user info
    localStorage.setItem("token", authData.token);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify(authData.data));

    // Update store
    const store = useAuthStore.getState();
    store.login(authData.data, authData.token, authData.refreshToken);

    return authData;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await apiClient.auth.logout();
  } catch (error) {
    // Logout errors are not critical
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    const store = useAuthStore.getState();
    store.logout();
  }
};

/**
 * Refresh authentication token
 */
export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.auth.refresh(refreshToken);
    const authData = response.data.data as AuthResponse;

    localStorage.setItem("token", authData.token);
    localStorage.setItem("refreshToken", authData.refreshToken);

    const store = useAuthStore.getState();
    store.setToken(authData.token);
    store.setRefreshToken(authData.refreshToken);

    return authData;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    throw handleApiError(error);
  }
};

/**
 * Get current user (if stored)
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isUserAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
