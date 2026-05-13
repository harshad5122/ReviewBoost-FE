"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getBusinesses } from "@/lib/services/businessService";
import { TrendingUp, Users, Zap, Activity } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalBusinesses: number;
  totalQRScans: number;
  totalReviewsGenerated: number;
  totalConversions: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBusinesses: 0,
    totalQRScans: 0,
    totalReviewsGenerated: 0,
    totalConversions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businesses = await getBusinesses();
        
        // Calculate stats from businesses
        const totalQRScans = businesses.reduce((sum, b: any) => sum + (b.qrScans || 0), 0);
        const totalReviews = businesses.reduce((sum, b: any) => sum + (b.reviewsGenerated || 0), 0);
        const totalConversions = businesses.reduce((sum, b: any) => sum + (b.conversions || 0), 0);

        setStats({
          totalBusinesses: businesses.length,
          totalQRScans,
          totalReviewsGenerated: totalReviews,
          totalConversions,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Businesses",
      value: stats.totalBusinesses,
      icon: "🏢",
      color: "from-blue-500/20 to-blue-600/20",
      textColor: "text-blue-400",
      trend: "+12% this month",
    },
    {
      label: "QR Scans",
      value: stats.totalQRScans,
      icon: "📲",
      color: "from-green-500/20 to-emerald-600/20",
      textColor: "text-green-400",
      trend: "+8% this week",
    },
    {
      label: "Reviews Generated",
      value: stats.totalReviewsGenerated,
      icon: "⭐",
      color: "from-amber-500/20 to-orange-600/20",
      textColor: "text-amber-400",
      trend: "+15% this month",
    },
    {
      label: "Conversions",
      value: stats.totalConversions,
      icon: "✓",
      color: "from-purple-500/20 to-pink-600/20",
      textColor: "text-purple-400",
      trend: "+5% this week",
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-gray-400">Here's your business performance overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className={`group relative bg-gradient-to-br ${card.color} backdrop-blur-md border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300`}
            >
              {/* Background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl rounded-lg transition-opacity duration-300" />

              <div className="relative space-y-4">
                {/* Icon and Label */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{card.label}</p>
                    <p className={`text-3xl font-bold mt-2 ${card.textColor}`}>
                      {card.value.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-3xl">{card.icon}</div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-green-400">{card.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/businesses"
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-white/10 hover:border-blue-500/50 rounded-lg p-6 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition">
                <Users size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                  Manage Businesses
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Create and manage your business profiles
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/qr"
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-white/10 hover:border-purple-500/50 rounded-lg p-6 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition">
                <Activity size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition">
                  QR Codes
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Generate and manage QR codes
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-white/10 hover:border-green-500/50 rounded-lg p-6 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition">
                <Zap size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
                  Analytics
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  View detailed performance metrics
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No activity yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Start by{" "}
              <Link href="/dashboard/businesses" className="text-blue-400 hover:text-blue-300">
                creating a business
              </Link>{" "}
              or{" "}
              <Link href="/dashboard/qr" className="text-blue-400 hover:text-blue-300">
                generating a QR code
              </Link>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
