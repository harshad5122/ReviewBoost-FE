"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, useAuthHydration, useLogout } from "@/lib/hooks";
import { Menu, X, LogOut, BarChart3, Home, Building2, QrCode } from "lucide-react";
import toast from "react-hot-toast";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useLogout();
  const user = useUser();
  const isHydrated = useAuthHydration();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/login");
    }
  }, [isHydrated, user, router]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const sidebarItems: SidebarItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { href: "/dashboard/businesses", label: "Businesses", icon: <Building2 size={20} /> },
    { href: "/dashboard/qr", label: "QR Codes", icon: <QrCode size={20} /> },
    { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative w-64 h-screen bg-slate-800/50 backdrop-blur-md border-r border-white/10 transition-transform duration-300 z-30`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/10">
              <Link href="/dashboard" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
                  <span className="text-white font-bold text-sm">RB</span>
                </div>
                <span className="font-bold text-white">ReviewBoost</span>
              </Link>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/30 to-purple-600/30 text-white border border-blue-500/50"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-slate-800/30 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div>
                <p className="text-gray-400 text-sm">Welcome back</p>
                <p className="text-white font-semibold">{user.name}</p>
              </div>
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="text-right">
                <p className="text-white font-medium text-sm">{user.name}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
