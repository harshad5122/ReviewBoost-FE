import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Business {
  id: string;
  businessName: string;
  slug: string;
  category?: string;
  city?: string;
  rating?: number;
  totalRatings?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Business
  businesses: Business[];
  selectedBusiness: Business | null;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  hydrate: () => void;
  setBusinesses: (businesses: Business[]) => void;
  setSelectedBusiness: (business: Business | null) => void;
  addBusiness: (business: Business) => void;
  removeBusiness: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      businesses: [],
      selectedBusiness: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      login: (user, token, refreshToken) =>
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          error: null,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
          businesses: [],
          selectedBusiness: null,
        }),

      hydrate: () => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const businesses = localStorage.getItem("businesses");

        if (token && user) {
          set({
            token,
            user: JSON.parse(user),
            isAuthenticated: true,
            businesses: businesses ? JSON.parse(businesses) : [],
          });
        }
      },

      setBusinesses: (businesses) => {
        set({ businesses });
        localStorage.setItem("businesses", JSON.stringify(businesses));
      },

      setSelectedBusiness: (business) => set({ selectedBusiness: business }),

      addBusiness: (business) =>
        set((state) => {
          const updated = [...state.businesses, business];
          localStorage.setItem("businesses", JSON.stringify(updated));
          return { businesses: updated };
        }),

      removeBusiness: (id) =>
        set((state) => {
          const updated = state.businesses.filter((b) => b.id !== id);
          localStorage.setItem("businesses", JSON.stringify(updated));
          return { businesses: updated };
        }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        businesses: state.businesses,
      }),
    }
  )
);

export default useAuthStore;
