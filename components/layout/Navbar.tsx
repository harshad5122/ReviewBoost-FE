"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser, useAuthHydration } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const user = useUser();
  const isHydrated = useAuthHydration();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setMobileMenuOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Premium gradient background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-800/95 backdrop-blur-md"></div>

      {/* Border gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">RB</span>
            </div>
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              ReviewBoost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {!isHydrated || !user ? (
              <>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about-us"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact-us"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <div className="flex items-center gap-3 border-l border-white/10 pl-8 ml-4">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 border-l border-white/10 pl-8 ml-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-white font-medium">{user.name}</span>
                    <span className="text-xs text-gray-400">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-3 pb-4">
            {!isHydrated || !user ? (
              <>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about-us"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact-us"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-center text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <div className="px-4 py-2 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-white font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
