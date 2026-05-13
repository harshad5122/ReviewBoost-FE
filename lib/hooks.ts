"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "./store";

// Hook to hydrate auth store on mount
export function useAuthHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
    setIsHydrated(true);
  }, [hydrate]);

  return isHydrated;
}

// Hook for checking if user is authenticated
export function useIsAuthenticated() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthHydration();
  return isHydrated && isAuthenticated;
}

// Hook for getting current user
export function useUser() {
  const user = useAuthStore((state) => state.user);
  useAuthHydration();
  return user;
}

// Hook for logout
export function useLogout() {
  const logout = useAuthStore((state) => state.logout);

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    logout();
  };
}

export default useAuthHydration;
