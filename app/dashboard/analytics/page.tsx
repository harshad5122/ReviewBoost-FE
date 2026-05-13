"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getBusinesses } from "@/lib/services/businessService";
import { getBusinessAnalytics } from "@/lib/services/analyticsService";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar, TrendingUp, Users, Zap } from "lucide-react";
import toast from "react-hot-toast";

interface Business {
  _id: string;
  businessName: string;
  slug: string;
}

interface AnalyticsData {
  totalBusinesses: number;
  totalQRScans: number;
  totalReviewsGenerated: number;
  totalConversions: number;
  conversionRate: number;
  averageRating: number;
}

export default function AnalyticsPage() {
  const searchParams = useSearchParams();
  const businessId = searchParams.get("business");

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string>(businessId || "");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    if (selectedBusiness) {
      fetchAnalytics();
    }
  }, [selectedBusiness, dateRange]);

  const fetchBusinesses = async () => {
    try {
      const data = await getBusinesses();
      setBusinesses(data);
      if (data.length > 0 && !businessId) {
        setSelectedBusiness(data[0]._id);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load businesses");
    }
  };

  const fetchAnalytics = async () => {
    if (!selectedBusiness) return;

    try {
      setIsLoading(true);
      const data = await getBusinessAnalytics(selectedBusiness);
      setAnalytics(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load analytics");
      setAnalytics(null);
    } finally {
      setIsLoading(false);
    }
  };

  const mockChartData = [
    { date: "Mon", scans: 12, reviews: 8, conversions: 3 },
    { date: "Tue", scans: 19, reviews: 12, conversions: 5 },
    { date: "Wed", scans: 15, reviews: 10, conversions: 4 },
    { date: "Thu", scans: 25, reviews: 18, conversions: 7 },
    { date: "Fri", scans: 32, reviews: 22, conversions: 9 },
    { date: "Sat", scans: 28, reviews: 20, conversions: 8 },
    { date: "Sun", scans: 18, reviews: 14, conversions: 5 },
  ];

  const conversionData = analytics
    ? [
        {
          name: "Conversions",
          value: analytics.totalConversions,
          fill: "#3b82f6",
        },
        {
          name: "Non-conversions",
          value: Math.max(0, analytics.totalQRScans - analytics.totalConversions),
          fill: "#64748b",
        },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400 mt-2">Track your business performance</p>
          </div>

          {businesses.length > 0 && (
            <div className="w-full sm:w-auto">
              <select
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 text-white rounded-lg focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">Select Business</option>
                {businesses.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.businessName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Analytics Cards */}
        {!selectedBusiness ? (
          <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-12 text-center">
            <Zap className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Select a business to view analytics</p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading analytics...</p>
            </div>
          </div>
        ) : analytics ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "QR Scans",
                  value: analytics.totalQRScans,
                  icon: "📱",
                  color: "from-blue-500/20 to-blue-600/20",
                  textColor: "text-blue-400",
                },
                {
                  label: "Reviews Generated",
                  value: analytics.totalReviewsGenerated,
                  icon: "⭐",
                  color: "from-amber-500/20 to-orange-600/20",
                  textColor: "text-amber-400",
                },
                {
                  label: "Conversions",
                  value: analytics.totalConversions,
                  icon: "✓",
                  color: "from-green-500/20 to-emerald-600/20",
                  textColor: "text-green-400",
                },
                {
                  label: "Conversion Rate",
                  value: `${(analytics.conversionRate * 100).toFixed(1)}%`,
                  icon: "📈",
                  color: "from-purple-500/20 to-pink-600/20",
                  textColor: "text-purple-400",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-gradient-to-br ${card.color} backdrop-blur-md border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300`}
                >
                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">{card.label}</p>
                        <p className={`text-3xl font-bold mt-2 ${card.textColor}`}>
                          {typeof card.value === "number"
                            ? card.value.toLocaleString()
                            : card.value}
                        </p>
                      </div>
                      <div className="text-3xl">{card.icon}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Weekly Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                      cursor={{ stroke: "rgba(59, 130, 246, 0.5)" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="scans"
                      stroke="#3b82f6"
                      name="QR Scans"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="reviews"
                      stroke="#f59e0b"
                      name="Reviews"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#10b981"
                      name="Conversions"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Conversion Rate</h3>
                {conversionData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-gray-400">No conversion data</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Daily Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="scans" fill="#3b82f6" name="QR Scans" />
                  <Bar dataKey="reviews" fill="#f59e0b" name="Reviews" />
                  <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-lg p-12 text-center">
            <p className="text-gray-400">No analytics data available</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
