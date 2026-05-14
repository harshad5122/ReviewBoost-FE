"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/services/authService";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-5xl font-bold text-white leading-tight">
              Welcome Back
            </h2>
            <p className="text-xl text-gray-400 mt-4">
              Sign in to access your ReviewBoost AI dashboard and manage your business reviews.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { title: "AI-Powered Reviews", desc: "Generate polished Google reviews automatically" },
              { title: "QR Code Management", desc: "Create and track QR codes for your business" },
              { title: "Real-Time Analytics", desc: "Monitor review metrics and conversions" },
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xl font-bold text-white">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full max-w-sm">
          <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-gray-400 mb-8">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800/50 text-gray-400">New to ReviewBoost?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link
                href="/register"
                className="w-full px-4 py-3 border border-white/10 text-white hover:bg-white/5 rounded-lg transition font-medium text-center"
              >
                Create Account
              </Link>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-400 hover:text-blue-300">
              Terms
            </Link>
            {" "}and{" "}
            <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
